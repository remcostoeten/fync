
import type { TApiClient } from "./api-factory";

type TMethodDefinition = {
	path: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	transform?: (response: any) => any;
};

type TResourceMethods = Record<string, TMethodDefinition>;

type TResourceConfig<TMethods extends TResourceMethods = TResourceMethods> = {
	name: string;
	basePath: string;
	methods: TMethods;
};

type TResource<TMethods extends TResourceMethods> = {
	[K in keyof TMethods]: TMethods[K]["method"] extends "POST" | "PUT" | "PATCH"
		? (data?: any, options?: any) => Promise<any>
		: (options?: any) => Promise<any>;
};


function interpolatePath(
	template: string,
	params: Record<string, any>,
): { path: string; queryParams: Record<string, any> } {
	let path = template;
	const queryParams: Record<string, any> = {};

	Object.entries(params).forEach(function ([key, value]) {
		const placeholder = `{${key}}`;
		if (path.includes(placeholder)) {
			path = path.replace(placeholder, encodeURIComponent(String(value)));
		} else {
			queryParams[key] = value;
		}
	});

	return { path, queryParams };
}

export function createFyncResource<TMethods extends TResourceMethods>(
	config: TResourceConfig<TMethods>,
	apiClient: TApiClient,
): TResource<TMethods> {
	const resource = {} as TResource<TMethods>;

	Object.entries(config.methods).forEach(function ([methodName, definition]) {
		const fullPath = config.basePath
			? `${config.basePath}${definition.path}`
			: definition.path;

		function createMethod() {
			if (
				definition.method === "POST" ||
				definition.method === "PUT" ||
				definition.method === "PATCH"
			) {
				return async function (data?: any, options?: any) {
					const { path, queryParams } = interpolatePath(
						fullPath,
						options || {},
					);
					const response = await apiClient[
						(definition.method || "GET").toLowerCase() as "post" | "put" | "patch"
					](path, data, { params: queryParams });
					return definition.transform
						? definition.transform(response)
						: response;
				};
			}

			return async function (options?: any) {
				const { path, queryParams } = interpolatePath(fullPath, options || {});
				const method = definition.method || "GET";
				const response = await apiClient[
					method.toLowerCase() as "get" | "delete"
				](path, { params: queryParams });
				return definition.transform ? definition.transform(response) : response;
			};
		}

		(resource as any)[methodName] = createMethod();
	});

	return resource;
}

export function defineResource<TMethods extends TResourceMethods>(
	config: TResourceConfig<TMethods>,
): TResourceConfig<TMethods> {
	return config;
}

export type { TMethodDefinition, TResource, TResourceConfig, TResourceMethods };
