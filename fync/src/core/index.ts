export function createCore() {
	return {
		name: "../../core",
		version: "1.0.0",
		description: "Core functionality for the fync monorepo",
	};
}

export type TCoreConfig = {
	name: string;
	version: string;
	description: string;
};
