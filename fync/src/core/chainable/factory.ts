import { memoize } from "../http/memoize";

type THttpClient = {
	get<T>(
		path: string,
		params?: Record<string, string | number | boolean>,
	): Promise<{ data: T }>;
	post<T>(path: string, data?: unknown): Promise<{ data: T }>;
	put<T>(path: string, data?: unknown): Promise<{ data: T }>;
	patch<T>(path: string, data?: unknown): Promise<{ data: T }>;
	delete<T>(path: string, data?: unknown): Promise<{ data: T }>;
	getPaginated?<T>(
		path: string,
		params?: Record<string, string | number | boolean>,
	): Promise<{ data: T[]; nextUrl?: string }>;
};

type TBaseConfig = {
	cache?: boolean;
	cacheTTL?: number;
	baseUrl?: string;
};

type TRequestOptions = {
	params?: Record<string, string | number | boolean>;
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

type TServiceConfig = {
	cacheKeyPrefix: string;
	supportsPagination?: boolean;
	defaultOptions?: Partial<TRequestOptions>;
};

export function createChainableClient<TConfig extends TBaseConfig>(
	config: TConfig,
	httpClient: THttpClient,
	serviceConfig: TServiceConfig,
	pathSegments: string[] = [],
): TChainableClient {
	function buildPath(): string {
		return "/" + pathSegments.join("/");
	}

	async function executeRequest<T = unknown>(
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
		data?: unknown,
		options?: TRequestOptions,
	): Promise<T> {
		const path = buildPath();
		const mergedOptions = { ...serviceConfig.defaultOptions, ...options };
		const { params, cache = config.cache !== false } = mergedOptions;

		async function requestFn(): Promise<T> {
			switch (method) {
        case "GET":
          if (mergedOptions.paginate || mergedOptions.allPages) {
            return handlePagination<T>(path, params, mergedOptions);
          }
          return (await httpClient.get<T>(path, params)).data;

        case "POST":
          return (await httpClient.post<T>(path, data)).data;

        case "PUT":
          return (await httpClient.put<T>(path, data)).data;

        case "PATCH":
          return (await httpClient.patch<T>(path, data)).data;

        case "DELETE":
          return (await httpClient.delete<T>(path, data)).data;

				default:
					throw new Error(`Unsupported method: ${method}`);
			}
		}

		if (cache && method === "GET") {
			const cacheKey = `${serviceConfig.cacheKeyPrefix}:${path}:${JSON.stringify(params || {})}`;
			function getCacheKey() {
				return cacheKey;
			}
			const memoizedFn = memoize(requestFn, getCacheKey, {
				ttl: mergedOptions.cacheTTL ?? config.cacheTTL ?? 300000,
			});
			return memoizedFn() as Promise<T>;
		}

		return requestFn();
	}

	async function handlePagination<T>(
		path: string,
		params?: Record<string, string | number | boolean>,
		options?: TRequestOptions,
	): Promise<T> {
		if (!serviceConfig.supportsPagination || !httpClient.getPaginated) {
			throw new Error("Pagination not supported for this service");
		}

		const response = await httpClient.getPaginated<T>(path, params);

		if (options?.allPages && response.nextUrl) {
			const allData = [...response.data];
			let nextUrl = response.nextUrl;

      while (nextUrl) {
        const nextResponse = await httpClient.getPaginated<T>(nextUrl);
        allData.push(...nextResponse.data);
        nextUrl = nextResponse.nextUrl || null;
      }

			return allData as T;
		}

		return response.data as T;
	}

	async function* streamPages<T = unknown>(
		options?: TRequestOptions,
	): AsyncGenerator<T, void, unknown> {
		if (!serviceConfig.supportsPagination || !httpClient.getPaginated) {
			throw new Error("Streaming not supported for this service");
		}

		const path = buildPath();
		const { params } = options || {};

		let response = await httpClient.getPaginated<T>(path, params);
		yield* response.data as T[];

		while (response.nextUrl) {
			response = await httpClient.getPaginated<T>(response.nextUrl);
			yield* response.data as T[];
		}
	}

	function createMethodHandler<T = unknown>(
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
	) {
		if (method === "GET" || method === "DELETE") {
			function getOrDeleteHandler(options?: TRequestOptions) {
				return executeRequest<T>(method, undefined, options);
			}
			return getOrDeleteHandler;
		}
		function postPutPatchHandler(data: unknown, options?: TRequestOptions) {
			return executeRequest<T>(method, data, options);
		}
		return postPutPatchHandler;
	}

	return new Proxy({} as TChainableClient, {
		get(target, prop: string | symbol) {
			if (prop === "get") {
				return createMethodHandler("GET");
			}

			if (prop === "post") {
				return createMethodHandler("POST");
			}

			if (prop === "put") {
				return createMethodHandler("PUT");
			}

			if (prop === "patch") {
				return createMethodHandler("PATCH");
			}

			if (prop === "delete") {
				return createMethodHandler("DELETE");
			}

			if (prop === "paginate") {
				function paginateHandler<T = unknown>(options?: TRequestOptions) {
					return executeRequest<T[]>("GET", undefined, {
						...options,
						paginate: true,
					});
				}
				return paginateHandler;
			}

			if (prop === "stream") {
				function streamHandler<T = unknown>(options?: TRequestOptions) {
					return streamPages<T>(options);
				}
				return streamHandler;
			}

			if (prop === "path") {
				return buildPath;
			}

			return createChainableClient(config, httpClient, serviceConfig, [
				...pathSegments,
				String(prop),
			]);
		},
	});
}

export type { TChainableClient, TRequestOptions, TBaseConfig, TServiceConfig };
