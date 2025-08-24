import type { TApiClient, TApiConfig } from "./api-factory";
import { createFyncApi } from "./api-factory";
import type { TResource, TResourceConfig } from "./resource-factory";
import { createFyncResource } from "./resource-factory";

type TModuleResources = Record<string, TResourceConfig<any>>;

type TModuleConfig<TResources extends TModuleResources> = {
	name: string;
	apiConfig: TApiConfig;
	resources: TResources;
	helpers?: Record<string, Function>;
};

type TModule<TResources extends TModuleResources> = {
	[K in keyof TResources]: TResources[K] extends TResourceConfig<infer TMethods>
		? TResource<TMethods>
		: never;
} & {
	api: TApiClient;
};

/**
 * Build a typed module that bundles an API client with resource handlers and optional helpers.
 *
 * Constructs and returns a TModule whose `api` property is an API client created from `config.apiConfig`,
 * whose resource keys are handlers created from `config.resources`, and which includes any `config.helpers`
 * attached at the top level.
 *
 * @param config - Module configuration containing `name`, `apiConfig`, `resources`, and optional `helpers`.
 * @returns A fully assembled module typed as `TModule<TResources>`.
 */
export function createFyncModule<TResources extends TModuleResources>(
	config: TModuleConfig<TResources>,
): TModule<TResources> {
const apiClient = createFyncApi(config.apiConfig);
const module = { api: apiClient } as TModule<TResources>;

	Object.entries(config.resources).forEach(function ([
		resourceName,
		resourceConfig,
	]) {
		(module as any)[resourceName] = createFyncResource(
			resourceConfig,
			apiClient,
		);
	});

	if (config.helpers) {
		Object.entries(config.helpers).forEach(function ([helperName, helperFn]) {
			(module as any)[helperName] = helperFn;
		});
	}

	return module;
}

export function createApiBuilder<TResources extends TModuleResources>(
	defaultConfig: Partial<TApiConfig>,
) {
	return function buildApi(
		userConfig: Partial<TApiConfig> & { token?: string },
		resources: TResources,
	): TModule<TResources> {
		const finalConfig: TApiConfig = {
			...defaultConfig,
			...userConfig,
		} as TApiConfig;

		if (userConfig.token && finalConfig.auth?.type === "bearer") {
			finalConfig.auth.token = userConfig.token;
		}

		return createFyncModule({
			name: defaultConfig.baseUrl || "api",
			apiConfig: finalConfig,
			resources,
		});
	};
}

export type { TModule, TModuleConfig, TModuleResources };
