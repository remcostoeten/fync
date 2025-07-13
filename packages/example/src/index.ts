import { createCore } from "@deify/core";

export function createExample() {
	const core = createCore();
	
	return {
		...core,
		package: "@deify/example",
		features: ["example", "demo", "workspace"],
	};
}

export type TExampleConfig = {
	name: string;
	version: string;
	description: string;
	package: string;
	features: string[];
};
