import { createCore } from "@fync/core";

export function createExample() {
	const core = createCore();

	return {
		...core,
		package: "@fync/example",
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
