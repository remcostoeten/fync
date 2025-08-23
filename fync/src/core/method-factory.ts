import type { TApiClient } from "./api-factory";

type TMethodConfig = {
	name: string;
	args: string[];
	endpoint: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

type TFyncMethodBuilder = {
	args: (...argNames: string[]) => TFyncMethodBuilder;
	endpoint: (path: string) => TFyncMethodBuilder;
	method: (method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH") => TFyncMethodBuilder;
	build: () => TMethodConfig;
};

export function createFyncMethod(methodName: string): TFyncMethodBuilder {
	const config: TMethodConfig = {
		name: methodName,
		args: [],
		endpoint: "",
		method: "GET",
	};

	const builder: TFyncMethodBuilder = {
		args: function (...argNames: string[]) {
			config.args = argNames;
			return builder;
		},
		endpoint: function (path: string) {
			config.endpoint = path;
			return builder;
		},
		method: function (method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH") {
			config.method = method;
			return builder;
		},
		build: function () {
			return config;
		},
	};

	return builder;
}

export function buildMethodFromConfig(
	config: TMethodConfig,
	apiClient: TApiClient,
): Function {
	return function (...args: any[]) {
		// Map args to params
		const params: Record<string, any> = {};
		config.args.forEach(function (argName, index) {
			params[argName] = args[index];
		});

		// Replace placeholders in endpoint
		let endpoint = config.endpoint;
		Object.keys(params).forEach(function (key) {
			endpoint = endpoint.replace(`{${key}}`, params[key]);
		});

		// Execute the request
		if (config.method === "POST" || config.method === "PUT" || config.method === "PATCH") {
			// Last arg is body for mutation methods
			const body = args[args.length - 1];
			return apiClient[config.method.toLowerCase() as "post" | "put" | "patch"](endpoint, body);
		}
		
		return apiClient[config.method?.toLowerCase() as "get" | "delete"](endpoint, { params });
	};
}

export type { TMethodConfig, TFyncMethodBuilder };
