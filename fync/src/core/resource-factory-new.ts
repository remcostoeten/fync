import type { TApiClient } from "./api-factory";
import type { TMethodConfig } from "./method-factory";
import { buildMethodFromConfig, createFyncMethod } from "./method-factory";

type TResourceBuilder = {
	name: string;
	methodConfigs: Record<string, TMethodConfig>;
	methods: (methodsMap: Record<string, string | TMethodConfig>) => TResourceBuilder;
	build: (apiClient: TApiClient) => any;
};

export function createFyncResource(resourceName: string): TResourceBuilder {
	const builder: TResourceBuilder = {
		name: resourceName,
		methodConfigs: {},
		methods: function (methodsMap: Record<string, string | TMethodConfig>) {
			Object.entries(methodsMap).forEach(function ([key, value]) {
				if (typeof value === "string") {
					// Reference to a method config defined elsewhere
					// For now, we'll assume it's a method name to be resolved
					builder.methodConfigs[key] = createFyncMethod(value).build();
				} else {
					builder.methodConfigs[key] = value;
				}
			});
			return builder;
		},
		build: function (apiClient: TApiClient) {
			const resource: Record<string, Function> = {};
			Object.entries(builder.methodConfigs).forEach(function ([key, config]) {
				resource[key] = buildMethodFromConfig(config, apiClient);
			});
			return resource;
		},
	};
	return builder;
}

export type { TResourceBuilder };
