import { memoize } from "./cache-service";
import type { THttpResponse, TPaginatedResponse } from "./http-client";
import { createHttpClient } from "./http-client";

type TGitHubClientConfig = {
	token?: string;
	baseUrl?: string;
	cache?: boolean;
	cacheTTL?: number;
};

type TRequestOptions = {
	params?: Record<string, string | number>;
	cache?: boolean;
	cacheTTL?: number;
	paginate?: boolean;
	allPages?: boolean;
};

type TChainableClient = {
	[key: string]: TChainableClient;
} & {
	get<T = unknown>(options?: TRequestOptions): Promise<T>;
	post<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	put<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	patch<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	delete<T = unknown>(options?: TRequestOptions): Promise<T>;
	paginate<T = unknown>(options?: TRequestOptions): Promise<T[]>;
	stream<T = unknown>(
		options?: TRequestOptions,
	): AsyncGenerator<T, void, unknown>;
	path(): string;
};

function createChainableClient(
	config: TGitHubClientConfig,
	pathSegments: string[] = [],
): TChainableClient {
	const defaultHeaders: Record<string, string> = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "github-api-service",
	};

	if (config.token) {
		defaultHeaders.Authorization = `Bearer ${config.token}`;
	}

	const httpClient = createHttpClient({
		baseUrl: config.baseUrl || "https://api.github.com",
		defaultHeaders,
	});

	const buildPath = () => "/" + pathSegments.join("/");

	async function executeRequest<T = unknown>(
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
		data?: unknown,
		options?: TRequestOptions,
	): Promise<T> {
		const path = buildPath();
		const {
			params,
			cache = config.cache !== false,
			cacheTTL = config.cacheTTL,
		} = options || {};
		const _cacheTTL = cacheTTL; // Keep for future use

		const requestFn = async () => {
			switch (method) {
				case "GET":
					if (options?.paginate || options?.allPages) {
						const response = await httpClient.getPaginated(path, params);

						if (options.allPages) {
							const allData = [...response.data];
							let nextUrl = response.nextUrl;

							while (nextUrl) {
								const nextResponse = await httpClient.getPaginated(nextUrl);
								allData.push(...nextResponse.data);
								nextUrl = nextResponse.nextUrl;
							}

							return allData;
						}

						return response.data;
					}
					return (await httpClient.get(path, params)).data;

				case "POST":
				case "PUT":
				case "PATCH":
				case "DELETE":
					// These would need to be implemented in http-client
					throw new Error(`${method} not yet implemented in http-client`);

				default:
					throw new Error(`Unsupported method: ${method}`);
			}
		};

		if (cache && method === "GET") {
			const cacheKey = `${path}:${JSON.stringify(params || {})}`;
			const memoizedFn = memoize(
				requestFn,
				() => cacheKey,
				options?.cacheTTL ?? config.cacheTTL ?? 300000,
			);
			return memoizedFn() as Promise<T>;
		}

		return requestFn() as Promise<T>;
	}

	async function* streamPages<T = unknown>(
		options?: TRequestOptions,
	): AsyncGenerator<T, void, unknown> {
		const path = buildPath();
		const { params } = options || {};

		let response = await httpClient.getPaginated(path, params);
		yield* response.data as Awaited<T>[];

		while (response.nextUrl) {
			response = await httpClient.getPaginated(response.nextUrl);
			yield* response.data as Awaited<T>[];
		}
	}

	return new Proxy({} as TChainableClient, {
		get(target, prop: string | symbol) {
			if (prop === "get") {
				return <T = unknown>(options?: TRequestOptions) =>
					executeRequest<T>("GET", undefined, options);
			}

			if (prop === "post") {
				return <T = unknown>(data: unknown, options?: TRequestOptions) =>
					executeRequest<T>("POST", data, options);
			}

			if (prop === "put") {
				return <T = unknown>(data: unknown, options?: TRequestOptions) =>
					executeRequest<T>("PUT", data, options);
			}

			if (prop === "patch") {
				return <T = unknown>(data: unknown, options?: TRequestOptions) =>
					executeRequest<T>("PATCH", data, options);
			}

			if (prop === "delete") {
				return <T = unknown>(options?: TRequestOptions) =>
					executeRequest<T>("DELETE", undefined, options);
			}

			if (prop === "paginate") {
				return <T = unknown>(options?: TRequestOptions) =>
					executeRequest<T[]>("GET", undefined, { ...options, paginate: true });
			}

			if (prop === "stream") {
				return <T = unknown>(options?: TRequestOptions) =>
					streamPages<T>(options);
			}

			if (prop === "path") {
				return () => buildPath();
			}

			// For any other property, create a new chainable client with the added path segment
			return createChainableClient(config, [...pathSegments, String(prop)]);
		},
	});
}

function createGitHubClient(
	config: TGitHubClientConfig = {},
): TChainableClient {
	return createChainableClient(config);
}

export { createGitHubClient };
export type { TGitHubClientConfig, TRequestOptions, TChainableClient };
