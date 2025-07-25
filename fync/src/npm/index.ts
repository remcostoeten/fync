import type {
	TChainableClient,
	TNpmClientConfig,
	TRequestOptions,
} from "./services/npm-client";
import { createNpmClient } from "./services/npm-client";
import type {
	TNpmAuditResponse,
	TNpmCollaborator,
	TNpmDeprecation,
	TNpmDistTags,
	TNpmDownloadCount,
	TNpmDownloadsResponse,
	TNpmOrganization,
	TNpmPackageInfo,
	TNpmPackageSize,
	TNpmPackageVersion,
	TNpmSearchResponse,
	TNpmSearchResult,
	TNpmUser,
	TNpmVulnerability,
} from "./types";

type TNpm = {
	// Direct access to chainable API
	api: TChainableClient;

	// Convenience methods for common operations
	package(packageName: string): TPackageClient;
	search: TSearchClient;
	downloads: TDownloadsClient;
	user(username: string): TUserClient;
	org(orgName: string): TOrgClient;
	tag(tag: string): TTagClient;
};

type TPackageClient = {
	// Get package info
	get(): Promise<TNpmPackageInfo>;

	// Get specific version
	version(version: string): TVersionClient;

	// Get latest version info
	latest(): Promise<TNpmPackageVersion>;

	// Get all versions
	versions(): Promise<Record<string, TNpmPackageVersion>>;

	// Get package download stats
	downloads: {
		last(period: "day" | "week" | "month"): Promise<TNpmDownloadCount>;
		range(start: string, end: string): Promise<TNpmDownloadsResponse>;
	};

	// Direct chain access
	chain: TChainableClient;
};

type TVersionClient = {
	// Get version info
	get(): Promise<TNpmPackageVersion>;

	// Direct chain access
	chain: TChainableClient;
};

type TSearchClient = {
	packages(
		query: string,
		options?: TRequestOptions & {
			size?: number;
			from?: number;
			quality?: number;
			popularity?: number;
			maintenance?: number;
		},
	): Promise<TNpmSearchResponse>;

	// Direct chain access
	chain: TChainableClient;
};

type TDownloadsClient = {
	// Get download stats for a package
	package(
		packageName: string,
		period?: "last-day" | "last-week" | "last-month",
	): Promise<TNpmDownloadCount>;

	// Get download stats for multiple packages
	packages(
		packageNames: string[],
		period?: "last-day" | "last-week" | "last-month",
	): Promise<Record<string, TNpmDownloadCount>>;

	// Get download stats for a date range
	range(
		packageName: string,
		start: string,
		end: string,
	): Promise<TNpmDownloadsResponse>;

	// Direct chain access
	chain: TChainableClient;
};

type TUserClient = {
	// Get user info
	get(): Promise<TNpmUser>;

	// Get user's packages
	packages(options?: TRequestOptions): Promise<TNpmPackageInfo[]>;

	// Direct chain access
	chain: TChainableClient;
};

type TOrgClient = {
	// Get organization info
	get(): Promise<TNpmOrganization>;

	// Get organization's packages
	packages(options?: TRequestOptions): Promise<TNpmPackageInfo[]>;

	// Get organization members
	members(options?: TRequestOptions): Promise<TNpmUser[]>;

	// Direct chain access
	chain: TChainableClient;
};

type TTagClient = {
	// Get packages with specific tag
	packages(options?: TRequestOptions): Promise<TNpmPackageInfo[]>;

	// Direct chain access
	chain: TChainableClient;
};

type TAdvancedPackageClient = TPackageClient & {
	// Advanced package features
	vulnerabilities(): Promise<TNpmVulnerability[]>;
	audit(): Promise<TNpmAuditResponse>;
	size(): Promise<TNpmPackageSize>;
	deprecation(): Promise<TNpmDeprecation | null>;
	distTags(): Promise<TNpmDistTags>;
	collaborators(): Promise<TNpmCollaborator[]>;

	// Check if package is deprecated
	isDeprecated(): Promise<boolean>;

	// Get package bundled size analysis
	bundleAnalysis(): Promise<{
		size: number;
		gzip: number;
		modules: number;
		dependencies: string[];
	}>;
};

/**
 * Creates a new NPM Registry API client
 *
 * @param config - Optional configuration for the NPM client
 * @param config.cache - Enable response caching (default: false)
 * @param config.cacheTTL - Cache time-to-live in milliseconds (default: 300000)
 * @param config.baseUrl - Custom NPM registry URL (default: https://registry.npmjs.org)
 * @param config.timeout - Request timeout in milliseconds (default: 30000)
 *
 * @returns NPM client instance with access to packages, search, downloads, users, orgs, and tags
 *
 * @example
 * ```typescript
 * const npm = NPM({ cache: true, cacheTTL: 600000 });
 *
 * // Get package information
 * const reactInfo = await npm.package('react').get();
 *
 * // Search for packages
 * const results = await npm.search.packages('typescript');
 *
 * // Get download statistics
 * const downloads = await npm.downloads.package('react', 'last-week');
 * ```
 */
function NPM(config?: TNpmClientConfig): TNpm {
	const client = createNpmClient(config);

	function createPackageClient(packageName: string): TAdvancedPackageClient {
		const packageBase = client[encodeURIComponent(packageName)];

		return {
			get: () => packageBase.get<TNpmPackageInfo>(),

			version: (version: string) => createVersionClient(packageName, version),

			latest: async () => {
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				const latestVersion = packageInfo["dist-tags"]?.latest;
				if (!latestVersion) {
					throw new Error(`No latest version found for ${packageName}`);
				}
				return packageInfo.versions[latestVersion];
			},

			versions: async () => {
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				return packageInfo.versions;
			},

			downloads: {
				last: (period: "day" | "week" | "month") =>
					client.downloads.point[`last-${period}`][
						encodeURIComponent(packageName)
					].get<TNpmDownloadCount>(),

				range: (start: string, end: string) =>
					client.downloads.range[`${start}:${end}`][
						encodeURIComponent(packageName)
					].get<TNpmDownloadsResponse>(),
			},

			// Advanced features
			vulnerabilities: async () => {
				// Use npm audit API (hypothetical endpoint)
				try {
					const auditClient = createNpmClient({
						...config,
						baseUrl: "https://registry.npmjs.org/-/npm/v1/security",
					});
					return await auditClient.advisories[packageName].get<
						TNpmVulnerability[]
					>();
				} catch {
					return [];
				}
			},

			audit: async () => {
				// Use npm audit API
				const auditClient = createNpmClient({
					...config,
					baseUrl: "https://registry.npmjs.org/-/npm/v1/security",
				});
				return await auditClient.audits.quick[
					packageName
				].get<TNpmAuditResponse>();
			},

			size: async () => {
				// Get package size info (bundlephobia-like data)
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				const latestVersion = packageInfo["dist-tags"]?.latest;
				if (!latestVersion) {
					throw new Error(`No latest version found for ${packageName}`);
				}

				// Calculate size from dist info
				const version = packageInfo.versions[latestVersion];
				const files = version.files?.length || 0;

				return {
					size: 0, // Would need external service
					gzip: 0, // Would need external service
					files,
				};
			},

			deprecation: async () => {
				const packageInfo = await packageBase.get<TNpmPackageInfo>();

				// Check for deprecated versions
				const deprecatedVersions: string[] = [];
				for (const [version, versionInfo] of Object.entries(
					packageInfo.versions,
				)) {
					if ("deprecated" in versionInfo && versionInfo.deprecated) {
						deprecatedVersions.push(version);
					}
				}

				if (deprecatedVersions.length === 0) {
					return null;
				}

				return {
					versions: deprecatedVersions,
					message: "Package has deprecated versions",
					time: new Date().toISOString(),
				};
			},

			distTags: async () => {
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				return packageInfo["dist-tags"] as TNpmDistTags;
			},

			collaborators: async () => {
				// Get package maintainers/collaborators
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				return packageInfo.maintainers.map((maintainer) => ({
					name: maintainer.name,
					email: maintainer.email,
					access: "write" as const,
				}));
			},

			isDeprecated: async () => {
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				const latestVersion = packageInfo["dist-tags"]?.latest;
				if (!latestVersion) return false;

				const version = packageInfo.versions[latestVersion];
				return !!(("deprecated" in version && version.deprecated) as boolean);
			},

			bundleAnalysis: async () => {
				// Get bundle analysis (would integrate with bundlephobia API)
				const packageInfo = await packageBase.get<TNpmPackageInfo>();
				const latestVersion = packageInfo["dist-tags"]?.latest;
				if (!latestVersion) {
					throw new Error(`No latest version found for ${packageName}`);
				}

				const version = packageInfo.versions[latestVersion];
				const dependencies = Object.keys(version.dependencies || {});

				return {
					size: 0, // Would need bundlephobia integration
					gzip: 0, // Would need bundlephobia integration
					modules: dependencies.length,
					dependencies,
				};
			},

			chain: packageBase,
		};
	}

	function createVersionClient(
		packageName: string,
		version: string,
	): TVersionClient {
		const versionBase = client[encodeURIComponent(packageName)][version];

		return {
			get: () => versionBase.get<TNpmPackageVersion>(),
			chain: versionBase,
		};
	}

	const searchClient: TSearchClient = {
		packages: (
			query: string,
			options?: TRequestOptions & {
				size?: number;
				from?: number;
				quality?: number;
				popularity?: number;
				maintenance?: number;
			},
		) => {
			const params: Record<string, string | number> = {
				text: query,
				...options?.params,
			};

			if (options?.size) params.size = options.size;
			if (options?.from) params.from = options.from;
			if (options?.quality) params.quality = options.quality;
			if (options?.popularity) params.popularity = options.popularity;
			if (options?.maintenance) params.maintenance = options.maintenance;

			// NPM search uses different base URL
			const searchClient = createNpmClient({
				...config,
				baseUrl: "https://registry.npmjs.org/-/v1",
			});

			return searchClient.search.get<TNpmSearchResponse>({
				...options,
				params,
			});
		},

		chain: client["-"].v1.search,
	};

	const downloadsClient: TDownloadsClient = {
		package: (packageName: string, period = "last-week") => {
			// NPM downloads API uses different base URL
			const downloadsApiClient = createNpmClient({
				...config,
				baseUrl: "https://api.npmjs.org",
			});

			return downloadsApiClient.downloads.point[period][
				encodeURIComponent(packageName)
			].get<TNpmDownloadCount>();
		},

		packages: async (packageNames: string[], period = "last-week") => {
			const downloadsApiClient = createNpmClient({
				...config,
				baseUrl: "https://api.npmjs.org",
			});

			const packageList = packageNames.map(encodeURIComponent).join(",");
			const response =
				await downloadsApiClient.downloads.point[period][packageList].get<
					Record<string, TNpmDownloadCount>
				>();
			return response;
		},

		range: (packageName: string, start: string, end: string) => {
			const downloadsApiClient = createNpmClient({
				...config,
				baseUrl: "https://api.npmjs.org",
			});

			return downloadsApiClient.downloads.range[`${start}:${end}`][
				encodeURIComponent(packageName)
			].get<TNpmDownloadsResponse>();
		},

		chain: createNpmClient({
			...config,
			baseUrl: "https://api.npmjs.org",
		}).downloads,
	};

	function createUserClient(username: string): TUserClient {
		// NPM user API uses different base URL
		const npmApiClient = createNpmClient({
			...config,
			baseUrl: "https://registry.npmjs.org/-/user",
		});

		const userBase = npmApiClient[username];

		return {
			get: () => userBase.get<TNpmUser>(),

			packages: async (options?: TRequestOptions) => {
				// Search packages by author
				const searchClient = createNpmClient({
					...config,
					baseUrl: "https://registry.npmjs.org/-/v1",
				});

				const searchResults = await searchClient.search.get<TNpmSearchResponse>(
					{
						...options,
						params: {
							text: `author:${username}`,
							size: 250,
							...options?.params,
						},
					},
				);

				// Convert search results to package info
				const packages = await Promise.all(
					searchResults.objects.map((result) =>
						client[
							encodeURIComponent(result.package.name)
						].get<TNpmPackageInfo>(),
					),
				);

				return packages;
			},

			chain: userBase,
		};
	}

	function createOrgClient(orgName: string): TOrgClient {
		// NPM org API uses different base URL
		const npmApiClient = createNpmClient({
			...config,
			baseUrl: "https://registry.npmjs.org/-/org",
		});

		const orgBase = npmApiClient[orgName];

		return {
			get: () => orgBase.get<TNpmOrganization>(),

			packages: async (options?: TRequestOptions) => {
				// Search packages by scope
				const searchClient = createNpmClient({
					...config,
					baseUrl: "https://registry.npmjs.org/-/v1",
				});

				const searchResults = await searchClient.search.get<TNpmSearchResponse>(
					{
						...options,
						params: {
							text: `scope:${orgName}`,
							size: 250,
							...options?.params,
						},
					},
				);

				// Convert search results to package info
				const packages = await Promise.all(
					searchResults.objects.map((result) =>
						client[
							encodeURIComponent(result.package.name)
						].get<TNpmPackageInfo>(),
					),
				);

				return packages;
			},

			members: async (options?: TRequestOptions) => {
				// Get organization members
				const membersResponse = await orgBase.users.get<{
					[username: string]: string;
				}>(options);

				// Convert to user objects
				const usernames = Object.keys(membersResponse);
				const users = await Promise.all(
					usernames.map((username) => createUserClient(username).get()),
				);

				return users;
			},

			chain: orgBase,
		};
	}

	function createTagClient(tag: string): TTagClient {
		return {
			packages: async (options?: TRequestOptions) => {
				// Search packages by keyword/tag
				const searchClient = createNpmClient({
					...config,
					baseUrl: "https://registry.npmjs.org/-/v1",
				});

				const searchResults = await searchClient.search.get<TNpmSearchResponse>(
					{
						...options,
						params: {
							text: `keywords:${tag}`,
							size: 250,
							...options?.params,
						},
					},
				);

				// Convert search results to package info
				const packages = await Promise.all(
					searchResults.objects.map((result) =>
						client[
							encodeURIComponent(result.package.name)
						].get<TNpmPackageInfo>(),
					),
				);

				return packages;
			},

			chain: client,
		};
	}

	return {
		api: client,
		package: createPackageClient,
		search: searchClient,
		downloads: downloadsClient,
		user: createUserClient,
		org: createOrgClient,
		tag: createTagClient,
	};
}

export { NPM };
export type {
	TNpm,
	TPackageClient,
	TAdvancedPackageClient,
	TVersionClient,
	TSearchClient,
	TDownloadsClient,
	TUserClient,
	TOrgClient,
	TTagClient,
	// Client types
	TChainableClient,
	TRequestOptions,
	TNpmClientConfig,
	// Core types
	TNpmPackageInfo,
	TNpmPackageVersion,
	TNpmSearchResponse,
	TNpmSearchResult,
	TNpmDownloadsResponse,
	TNpmDownloadCount,
	// Advanced types
	TNpmUser,
	TNpmOrganization,
	TNpmVulnerability,
	TNpmAuditResponse,
	TNpmPackageSize,
	TNpmDeprecation,
	TNpmDistTags,
	TNpmCollaborator,
};
