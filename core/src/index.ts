export function createCore() {
	return {
		name: "@deify/core",
		version: "1.0.0",
		description: "Core functionality for the deify monorepo",
	};
}

export type TCoreConfig = {
	name: string;
	version: string;
	description: string;
};
