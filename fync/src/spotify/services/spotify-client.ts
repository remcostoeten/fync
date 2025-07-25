import type { TSpotifyConfig } from "../types/spotify-common";
import { createHttpClient } from "../utils/http";
import { memoize } from "../../core/http/memoize";

type TSpotifyClientConfig = {
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
	// Additional properties for specific hooks
	limit?: number;
	after?: string;
	before?: string;
	immediate?: boolean;
};

type TChainableClient = {
	[key: string]: TChainableClient;
} & {
	get<T = unknown>(options?: TRequestOptions): Promise<T>;
	post<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	put<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	patch<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	delete<T = unknown>(data?: unknown, options?: TRequestOptions): Promise<T>;
	paginate<T = unknown>(options?: TRequestOptions): Promise<T[]>;
	stream<T = unknown>(
		options?: TRequestOptions,
	): AsyncGenerator<T, void, unknown>;
	path(): string;
};

function createChainableClient(
	config: TSpotifyClientConfig,
	pathSegments: string[] = [],
): TChainableClient {
	const defaultHeaders: Record<string, string> = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"User-Agent": "spotify-api-service",
	};

	if (config.token) {
		defaultHeaders.Authorization = `Bearer ${config.token}`;
	}

	const httpClient = createHttpClient({
		clientId: "",
		clientSecret: "",
		accessToken: config.token,
		baseUrl: config.baseUrl || "https://api.spotify.com/v1",
		cache: config.cache,
		cacheTTL: config.cacheTTL,
	});

	function buildPath() {
		return "/" + pathSegments.join("/");
	}

	async function executeRequest<T = unknown>(
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
		data?: unknown,
		options?: TRequestOptions,
	): Promise<T> {
		const path = buildPath();
		const { params, cache = config.cache !== false } = options || {};

		async function requestFn() {
			let url = `${config.baseUrl || "https://api.spotify.com/v1"}${path}`;

			if (params) {
				const searchParams = new URLSearchParams();
				for (const [key, value] of Object.entries(params)) {
					searchParams.append(key, String(value));
				}
				if (searchParams.toString()) {
					url += `?${searchParams.toString()}`;
				}
			}

			switch (method) {
				case "GET":
					if (options?.paginate || options?.allPages) {
						return handlePagination<T>(url, options);
					}
					return httpClient.get<T>(url, { headers: defaultHeaders });

				case "POST":
					return httpClient.post<T>(url, data, { headers: defaultHeaders });

				case "PUT":
					return httpClient.put<T>(url, data, { headers: defaultHeaders });

				case "PATCH":
					return httpClient.put<T>(url, data, { headers: defaultHeaders });

				case "DELETE":
					return httpClient.delete<T>(url, data, { headers: defaultHeaders });

				default:
					throw new Error(`Unsupported method: ${method}`);
			}
		};

		if (cache && method === "GET") {
			const cacheKey = `${path}:${JSON.stringify(params || {})}`;
			function getCacheKey() {
				return cacheKey;
			}
			const memoizedFn = memoize(requestFn, getCacheKey, {
				ttl: options?.cacheTTL ?? config.cacheTTL ?? 300000,
			});
			return memoizedFn() as Promise<T>;
		}

		return requestFn() as Promise<T>;
	}

	async function handlePagination<T>(
		url: string,
		options?: TRequestOptions,
	): Promise<T> {
		type TPaginatedResponse = {
			items: T[];
			next: string | null;
			total: number;
		};

		const response = await httpClient.get<TPaginatedResponse>(url, {
			headers: defaultHeaders,
		});

		if (options?.allPages && response.next) {
			const allData = [...response.items];
			let nextUrl: string | null = response.next;

			while (nextUrl) {
				const nextResponse: TPaginatedResponse =
					await httpClient.get<TPaginatedResponse>(nextUrl, {
						headers: defaultHeaders,
					});
				allData.push(...nextResponse.items);
				nextUrl = nextResponse.next;
			}

			return allData as T;
		}

		return response.items as T;
	}

	async function* streamPages<T = unknown>(
		options?: TRequestOptions,
	): AsyncGenerator<T, void, unknown> {
		const path = buildPath();
		const { params } = options || {};
		let url = `${config.baseUrl || "https://api.spotify.com/v1"}${path}`;

		if (params) {
			const searchParams = new URLSearchParams();
			for (const [key, value] of Object.entries(params)) {
				searchParams.append(key, String(value));
			}
			if (searchParams.toString()) {
				url += `?${searchParams.toString()}`;
			}
		}

		type TPaginatedResponse = {
			items: T[];
			next: string | null;
		};

		let response = await httpClient.get<TPaginatedResponse>(url, {
			headers: defaultHeaders,
		});

		yield* response.items as T[];

		while (response.next) {
			response = await httpClient.get<TPaginatedResponse>(response.next, {
				headers: defaultHeaders,
			});
			yield* response.items as T[];
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
				return <T = unknown>(data?: unknown, options?: TRequestOptions) =>
					executeRequest<T>("DELETE", data, options);
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

			return createChainableClient(config, [...pathSegments, String(prop)]);
		},
	});
}

function createSpotifyClient(
	config: TSpotifyClientConfig = {},
): TChainableClient {
	return createChainableClient(config);
}

export { createSpotifyClient };
export type { TSpotifyClientConfig, TRequestOptions, TChainableClient };
