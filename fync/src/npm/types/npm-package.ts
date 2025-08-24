import type { TBaseEntity } from "../../core/types";
import type {
	TNpmBugs,
	TNpmMaintainer,
	TNpmPerson,
	TNpmRepository,
} from "./npm-common";

type TNpmPackageVersion = {
	_id: string;
	_rev: string;
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?: string;
	license?: string;
	author?: TNpmPerson;
	contributors?: TNpmPerson[];
	files: string[];
	main?: string;
	bin?: Record<string, string>;
	man?: string | string[];
	directories?: {
		lib?: string;
		bin?: string;
		man?: string;
		test?: string;
		example?: string;
	};
	repository?: TNpmRepository;
	scripts?: Record<string, string>;
	config?: Record<string, any>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
	optionalDependencies?: Record<string, string>;
	engines?: Record<string, string>;
	os?: string[];
	cpu?: string[];
	preferGlobal?: boolean;
	private?: boolean;
	publishConfig?: Record<string, any>;
	dist: {
		shasum: string;
		tarball: string;
		integrity?: string;
		unpackedSize?: number;
		npmSignature?: string;
		signatures?: Array<{
			keyid: string;
			sig: string;
		}>;
		fileCount?: number;
	};
	gitHead?: string;
	deprecated?: string;
	hasShrinkwrap?: boolean;
	bugs?: TNpmBugs;
	_shasum: string;
	_resolved?: string;
	_integrity?: string;
	_from?: string;
};

type TNpmPackageInfo = TBaseEntity<string> & {
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

type TNpmDownloadsPoint = TBaseEntity<string> & {
	downloads: number;
	day: string;
};

type TNpmDownloadsResponse = TBaseEntity<string> & {
	downloads: TNpmDownloadsPoint[];
	start: string;
	end: string;
	package: string;
};

type TNpmDownloadCount = TBaseEntity<string> & {
	downloads: number;
	start: string;
	end: string;
	package: string;
};

type TNpmUser = TBaseEntity<string> & {
	_id: string;
	_rev: string;
	name: string;
	email?: string;
	fullname?: string;
	homepage?: string;
	freenode?: string;
	twitter?: string;
	github?: string;
	created: string;
	updated: string;
};

type TNpmOrganization = TBaseEntity<string> & {
	_id: string;
	_rev: string;
	name: string;
	description?: string;
	size: number;
	created: string;
	updated: string;
};

type TNpmVulnerability = TBaseEntity<string> & {
	id: number;
	title: string;
	module_name: string;
	publish_date: string;
	update_date: string;
	author: TNpmPerson;
	vulnerable_versions: string;
	patched_versions: string;
	overview: string;
	recommendation: string;
	references: string[];
	access: string;
	severity: string;
	cwe: string;
	cves: string[];
};

type TNpmAuditResponse = {
	actions: {
		action: string;
		module: string;
		target: string;
		isMajor?: boolean;
		resolves: TNpmVulnerability[];
	}[];
	advisories: Record<string, TNpmVulnerability>;
	metas: {
		vulnerabilities: {
			info: number;
			low: number;
			moderate: number;
			high: number;
			critical: number;
		};
		dependencies: number;
		devDependencies: number;
		optionalDependencies: number;
		totalDependencies: number;
	};
	runId: string;
};

type TNpmPackageSize = {
	size: number;
	gzip: number;
	files: number;
};

type TNpmDeprecation = {
	versions: string[];
	message: string;
	time: string;
};

type TNpmDistTags = Record<string, string> & {
	latest: string;
	beta?: string;
	alpha?: string;
	canary?: string;
	next?: string;
};

type TNpmCollaborator = {
	name: string;
	email: string;
	access: "read" | "write" | "admin";
};

export type {
	TNpmPackageVersion,
	TNpmPackageInfo,
	TNpmSearchResult,
	TNpmSearchResponse,
	TNpmDownloadsPoint,
	TNpmDownloadsResponse,
	TNpmDownloadCount,
	TNpmUser,
	TNpmOrganization,
	TNpmVulnerability,
	TNpmAuditResponse,
	TNpmPackageSize,
	TNpmDeprecation,
	TNpmDistTags,
	TNpmCollaborator,
};
