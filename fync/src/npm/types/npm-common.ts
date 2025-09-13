type TNpmConfig = {
	baseUrl?: string;
	cache?: boolean;
	cacheTTL?: number;
	userAgent?: string;
};

type TNpmMaintainer = {
	name: string;
	email: string;
};

type TNpmDistInfo = {
	shasum: string;
	tarball: string;
	integrity?: string;
	signatures?: {
		keyid: string;
		sig: string;
	}[];
};

type TNpmRepository = {
	type: string;
	url: string;
	directory?: string;
};

type TNpmBugs = {
	url?: string;
	email?: string;
};

type TNpmPerson = {
	name: string;
	email?: string;
	url?: string;
};

type TNpmDependencies = Record<string, string>;

type TNpmEngines = {
	node?: string;
	npm?: string;
	[key: string]: string | undefined;
};

type TNpmScripts = Record<string, string>;

export type {
	TNpmConfig,
	TNpmMaintainer,
	TNpmDistInfo,
	TNpmRepository,
	TNpmBugs,
	TNpmPerson,
	TNpmDependencies,
	TNpmEngines,
	TNpmScripts,
};
