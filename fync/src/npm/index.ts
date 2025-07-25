import type {
	TChainableClient,
	TNpmClientConfig,
	TRequestOptions,
} from "./services/npm-client";
import { createNpmClient } from "./services/npm-client";
import type {
	TNpmPackageInfo,
	TNpmPackageVersion,
	TNpmSearchResponse,
	TNpmSearchResult,
	TNpmDownloadsResponse,
	TNpmDownloadCount,
} from "./types";

type TNpm = {
	// Direct access to chainable API
	api: TChainableClient;

	// Convenience methods for common operations
	package(packageName: string): TPackageClient;
	search: TSearchClient;
	downloads: TDownloadsClient;
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

function NPM(config?: TNpmClientConfig): TNpm {
	const client = createNpmClient(config);

	function createPackageClient(packageName: string): TPackageClient {
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
					client.downloads.point[`last-${period}`][encodeURIComponent(packageName)].get<TNpmDownloadCount>(),
				
				range: (start: string, end: string) =>
					client.downloads.range[`${start}:${end}`][encodeURIComponent(packageName)].get<TNpmDownloadsResponse>(),
			},
			
			chain: packageBase,
		};
	}

	function createVersionClient(packageName: string, version: string): TVersionClient {
		const versionBase = client[encodeURIComponent(packageName)][version];

		return {
			get: () => versionBase.get<TNpmPackageVersion>(),
			chain: versionBase,
		};
	}

	const searchClient: TSearchClient = {
		packages: (query: string, options?: TRequestOptions & {
			size?: number;
			from?: number;
			quality?: number;
			popularity?: number;
			maintenance?: number;
		}) => {
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
			
			return downloadsApiClient.downloads.point[period][encodeURIComponent(packageName)].get<TNpmDownloadCount>();
		},
		
		packages: async (packageNames: string[], period = "last-week") => {
			const downloadsApiClient = createNpmClient({
				...config,
				baseUrl: "https://api.npmjs.org",
			});
			
			const packageList = packageNames.map(encodeURIComponent).join(",");
			const response = await downloadsApiClient.downloads.point[period][packageList].get<Record<string, TNpmDownloadCount>>();
			return response;
		},
		
		range: (packageName: string, start: string, end: string) => {
			const downloadsApiClient = createNpmClient({
				...config,
				baseUrl: "https://api.npmjs.org",
			});
			
			return downloadsApiClient.downloads.range[`${start}:${end}`][encodeURIComponent(packageName)].get<TNpmDownloadsResponse>();
		},
		
		chain: createNpmClient({
			...config,
			baseUrl: "https://api.npmjs.org",
		}).downloads,
	};

	return {
		api: client,
		package: createPackageClient,
		search: searchClient,
		downloads: downloadsClient,
	};
}

export { NPM };
export type {
	TNpm,
	TPackageClient,
	TVersionClient,
	TSearchClient,
	TDownloadsClient,
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
};
