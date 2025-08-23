import type { TApiClient } from "./api-factory";

type TMethodDefinition = {
	path: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	transform?: (data: any) => any;
};

type TResourceMethods = Record<string, TMethodDefinition>;

type TResourceConfig<TMethods extends TResourceMethods> = {
	name: string;
	basePath?: string;
	methods: TMethods;
};

type TMethodImplementation<TDef extends TMethodDefinition> = TDef extends {
	method: "POST" | "PUT" | "PATCH";
}
	? (data?: any, options?: any) => Promise<any>
	: (options?: any) => Promise<any>;

type TResource<TMethods extends TResourceMethods> = {
	[K in keyof TMethods]: TMethodImplementation<TMethods[K]>;
};

function interpolatePath(template: string, params: Record<string, any>): string {
	let path = template;
	let queryParams: Record<string, any> = {};

	Object.entries(params).forEach(function ([key, value]) {
		const placeholder = `{${key}}`;
		if (path.includes(placeholder)) {
			path = path.replace(placeholder, encodeURIComponent(String(value)));
		} else {
			queryParams[key] = value;
		}
	});

	return { path, queryParams } as any;
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
					const response = await apiClient[definition.method.toLowerCase() as "post" | "put" | "patch"](
						path,
						data,
						{ params: queryParams },
					);
					return definition.transform
						? definition.transform(response)
						: response;
				};
			}

			return async function (options?: any) {
				const { path, queryParams } = interpolatePath(fullPath, options || {});
				const method = definition.method || "GET";
				const response = await apiClient[method.toLowerCase() as "get" | "delete"](
					path,
					{ params: queryParams },
				);
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

export type {
	TMethodDefinition,
	TResource,
	TResourceConfig,
	TResourceMethods,
};
