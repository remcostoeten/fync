import { createApiBuilder, defineResource, type TModule } from "../core";

const NPM_API_BASE = "https://registry.npmjs.org";
const NPM_SEARCH_BASE = "https://registry.npmjs.org/-/v1";
const NPM_DOWNLOADS_BASE = "https://api.npmjs.org";

const packageResource = defineResource({
	name: "packages",
	basePath: "",
	methods: {
		getPackage: { path: "/{packageName}" },
		getPackageVersion: { path: "/{packageName}/{version}" },
		getPackageVersions: { path: "/{packageName}" },
		getPackageTarball: { path: "/{packageName}/-/{tarball}" },
	},
});

const searchResource = defineResource({
	name: "search",
	basePath: "/-/v1/search",
	methods: {
		searchPackages: { path: "" },
	},
});

const userResource = defineResource({
	name: "users",
	basePath: "/-/user/org.couchdb.user",
	methods: {
		getUser: { path: ":{username}" },
	},
});

const resources = {
	packages: packageResource,
	search: searchResource,
	users: userResource,
};

const buildNpm = createApiBuilder({
	baseUrl: NPM_API_BASE,
	headers: {
		"Content-Type": "application/json",
	},
});

type TNpmModule = TModule<typeof resources> & {
	getPackage: (packageName: string) => Promise<any>;
	getPackageVersion: (packageName: string, version: string) => Promise<any>;
	getLatestVersion: (packageName: string) => Promise<string>;
	getPackageDownloads: (packageName: string, period?: string) => Promise<any>;
	getPackageSize: (packageName: string) => Promise<any>;
	searchPackages: (query: string, options?: any) => Promise<any>;
	getPackageDependencies: (
		packageName: string,
		version?: string,
	) => Promise<any>;
	getPackageStats: (packageName: string) => Promise<any>;
	isPackageDeprecated: (packageName: string) => Promise<boolean>;
	getPackageMaintainers: (packageName: string) => Promise<any[]>;
	getPackageKeywords: (packageName: string) => Promise<string[]>;
	getPackageReadme: (packageName: string) => Promise<string>;
};

export function NPM(config?: { registry?: string }): TNpmModule {
	const base = buildNpm(
		{
			baseUrl: config?.registry || NPM_API_BASE,
		},
		resources,
	);

	const npm = base as unknown as TNpmModule;

	npm.getPackage = function (packageName: string) {
		return base.packages.getPackage({ packageName });
	};

	npm.getPackageVersion = function (packageName: string, version: string) {
		return base.packages.getPackageVersion({ packageName, version });
	};

	npm.getLatestVersion = async function (packageName: string) {
		const pkg = await base.packages.getPackage({ packageName });
		return pkg["dist-tags"]?.latest || pkg.version;
	};

	npm.getPackageDownloads = async function (
		packageName: string,
		period: string = "last-month",
	) {
		const downloadsApi = createApiBuilder({
			baseUrl: NPM_DOWNLOADS_BASE,
		})(
			{},
			{
				downloads: defineResource({
					name: "downloads",
					basePath: "/downloads",
					methods: {
						getPoint: { path: "/point/{period}/{packageName}" },
						getRange: { path: "/range/{start}:{end}/{packageName}" },
					},
				}),
			},
		);
		return downloadsApi.downloads.getPoint({ period, packageName });
	};

	npm.getPackageSize = async function (packageName: string) {
		const pkg = await base.packages.getPackage({ packageName });
		const latest = pkg["dist-tags"]?.latest;
		if (!latest || !pkg.versions?.[latest]) return null;

		const version = pkg.versions[latest];
		return {
			unpackedSize: version.dist?.unpackedSize,
			fileCount: version.dist?.fileCount,
			tarballSize: version.dist?.size,
		};
	};

	npm.searchPackages = async function (query: string, options?: any) {
		const searchApi = createApiBuilder({
			baseUrl: NPM_SEARCH_BASE,
		})(
			{},
			{
				search: defineResource({
					name: "search",
					basePath: "/search",
					methods: {
						search: { path: "" },
					},
				}),
			},
		);
		return searchApi.search.search({
			text: query,
			size: options?.size || 20,
			from: options?.from || 0,
			...options,
		});
	};

	npm.getPackageDependencies = async function (
		packageName: string,
		version?: string,
	) {
		const pkg = await base.packages.getPackage({ packageName });
		const targetVersion = version || pkg["dist-tags"]?.latest;
		const versionData = pkg.versions?.[targetVersion];

		return {
			dependencies: versionData?.dependencies || {},
			devDependencies: versionData?.devDependencies || {},
			peerDependencies: versionData?.peerDependencies || {},
			optionalDependencies: versionData?.optionalDependencies || {},
		};
	};

	npm.getPackageStats = async function (packageName: string) {
		const [pkg, downloads] = await Promise.all([
			base.packages.getPackage({ packageName }),
			npm.getPackageDownloads(packageName, "last-month"),
		]);

		const latest = pkg["dist-tags"]?.latest;
		const versionData = pkg.versions?.[latest];

		return {
			name: pkg.name,
			version: latest,
			description: pkg.description,
			license: versionData?.license,
			homepage: pkg.homepage,
			repository: pkg.repository,
			downloads: downloads.downloads,
			maintainers: pkg.maintainers?.length || 0,
			created: pkg.time?.created,
			modified: pkg.time?.modified,
			keywords: pkg.keywords || [],
		};
	};

	npm.isPackageDeprecated = async function (packageName: string) {
		const pkg = await base.packages.getPackage({ packageName });
		const latest = pkg["dist-tags"]?.latest;
		return !!pkg.versions?.[latest]?.deprecated;
	};

	npm.getPackageMaintainers = async function (packageName: string) {
		const pkg = await base.packages.getPackage({ packageName });
		return pkg.maintainers || [];
	};

	npm.getPackageKeywords = async function (packageName: string) {
		const pkg = await base.packages.getPackage({ packageName });
		return pkg.keywords || [];
	};

	npm.getPackageReadme = async function (packageName: string) {
		const pkg = await base.packages.getPackage({ packageName });
		return pkg.readme || "";
	};

	return npm;
}
