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


/**
 * Replace `{key}` placeholders in a path template with URL-encoded values and collect remaining params as query parameters.
 *
 * The function returns an object with `path` — the template with any `{key}` placeholders replaced by `encodeURIComponent(String(value))` for matching keys — and `queryParams` — a map of all input entries whose keys did not correspond to a placeholder in the template.
 *
 * @param template - Path template containing zero or more placeholders in the form `{key}`.
 * @param params - Key/value map used to interpolate placeholders and produce query parameters.
 * @returns An object with the interpolated `path` and a `queryParams` record of remaining params.
 */
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

/**
 * Builds a typed resource object from a resource configuration and an API client.
 *
 * Creates one function per entry in `config.methods`. Each generated method:
 * - Interpolates `config.basePath + method.path` with provided options to produce the final path and query params.
 * - For methods with HTTP verb POST/PUT/PATCH: produced function has signature `(data?: any, options?: any) => Promise<any>` and calls the corresponding `post|put|patch` client method with `(path, data, { params })`.
 * - For other verbs (GET/DELETE or undefined): produced function has signature `(options?: any) => Promise<any>` and calls the corresponding `get|delete` client method with `(path, { params })`.
 * - If a method `transform` function is provided in the method definition, its return value is used; otherwise the raw API response is returned.
 *
 * @param config - Resource configuration that defines the basePath and per-method definitions used to build the resource.
 * @returns A typed resource object whose methods match `TMethods` with the runtime implementations described above.
 */
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
