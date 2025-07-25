import type {
	TNpmDistInfo,
	TNpmRepository,
	TNpmBugs,
	TNpmPerson,
	TNpmDependencies,
	TNpmEngines,
	TNpmScripts,
	TNpmMaintainer,
} from "./npm-common";

type TNpmPackageVersion = {
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?: string;
	bugs?: TNpmBugs;
	license?: string;
	author?: TNpmPerson;
	contributors?: TNpmPerson[];
	maintainers?: TNpmMaintainer[];
	repository?: TNpmRepository;
	main?: string;
	module?: string;
	types?: string;
	exports?: Record<string, any>;
	scripts?: TNpmScripts;
	dependencies?: TNpmDependencies;
	devDependencies?: TNpmDependencies;
	peerDependencies?: TNpmDependencies;
	optionalDependencies?: TNpmDependencies;
	engines?: TNpmEngines;
	os?: string[];
	cpu?: string[];
	files?: string[];
	bin?: Record<string, string> | string;
	directories?: Record<string, string>;
	publishConfig?: Record<string, any>;
	dist: TNpmDistInfo;
	_id: string;
	_nodeVersion: string;
	_npmVersion: string;
	_hasShrinkwrap?: boolean;
	_shasum: string;
	_resolved?: string;
	_integrity?: string;
	_from?: string;
};

type TNpmPackageInfo = {
	_id: string;
	_rev: string;
	name: string;
	description?: string;
	"dist-tags": Record<string, string>;
	versions: Record<string, TNpmPackageVersion>;
	maintainers: TNpmMaintainer[];
	time: Record<string, string>;
	author?: TNpmPerson;
	repository?: TNpmRepository;
	users?: Record<string, boolean>;
	homepage?: string;
	keywords?: string[];
	contributors?: TNpmPerson[];
	bugs?: TNpmBugs;
	license?: string;
	readme?: string;
	readmeFilename?: string;
};

type TNpmSearchResult = {
	package: {
		name: string;
		scope?: string;
		version: string;
		description?: string;
		keywords?: string[];
		date: string;
		links: {
			npm?: string;
			homepage?: string;
			repository?: string;
			bugs?: string;
		};
		author?: TNpmPerson;
		publisher: TNpmPerson;
		maintainers: TNpmMaintainer[];
	};
	score: {
		final: number;
		detail: {
			quality: number;
			popularity: number;
			maintenance: number;
		};
	};
	searchScore: number;
	flags?: {
		unstable?: boolean;
	};
};

type TNpmSearchResponse = {
	objects: TNpmSearchResult[];
	total: number;
	time: string;
};

type TNpmDownloadsPoint = {
	downloads: number;
	day: string;
};

type TNpmDownloadsResponse = {
	downloads: TNpmDownloadsPoint[];
	start: string;
	end: string;
	package: string;
};

type TNpmDownloadCount = {
	downloads: number;
	start: string;
	end: string;
	package: string;
};

export type {
	TNpmPackageVersion,
	TNpmPackageInfo,
	TNpmSearchResult,
	TNpmSearchResponse,
	TNpmDownloadsPoint,
	TNpmDownloadsResponse,
	TNpmDownloadCount,
};
