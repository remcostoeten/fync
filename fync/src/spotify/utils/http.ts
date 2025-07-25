import type { TSpotifyConfig } from "../types";

type THttpOptions = {
	headers?: Record<string, string>;
	cache?: boolean;
	cacheTTL?: number;
};

type THttpClient = {
	get: <T>(url: string, options?: THttpOptions) => Promise<T>;
	post: <T>(url: string, data?: unknown, options?: THttpOptions) => Promise<T>;
	put: <T>(url: string, data?: unknown, options?: THttpOptions) => Promise<T>;
	delete: <T>(
		url: string,
		data?: unknown,
		options?: THttpOptions,
	) => Promise<T>;
};

export function createHttpClient(config: TSpotifyConfig): THttpClient {
	const cache = new Map<
		string,
		{ data: unknown; timestamp: number; ttl: number }
	>();

	function getCacheKey(url: string, options: THttpOptions = {}): string {
		return `${url}:${JSON.stringify(options)}`;
	}

	function isExpired(timestamp: number, ttl: number): boolean {
		return Date.now() - timestamp > ttl;
	}

	function getFromCache<T>(key: string): T | null {
		const cached = cache.get(key);
		if (!cached) return null;

		if (isExpired(cached.timestamp, cached.ttl)) {
			cache.delete(key);
			return null;
		}

		return cached.data as T;
	}

	function setCache<T>(key: string, data: T, ttl: number): void {
		cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl,
		});
	}

	async function makeRequest<T>(
		url: string,
		method: "GET" | "POST" | "PUT" | "DELETE",
		data?: unknown,
		options: THttpOptions = {},
	): Promise<T> {
		const shouldCache = options.cache !== false && config.cache !== false;
		const cacheTTL = options.cacheTTL || config.cacheTTL || 300000; // 5 minutes default

		if (shouldCache && method === "GET") {
			const cacheKey = getCacheKey(url, options);
			const cached = getFromCache<T>(cacheKey);
			if (cached) return cached;
		}

		const fetchOptions: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
		};

		if (
			data &&
			(method === "POST" || method === "PUT" || method === "DELETE")
		) {
			fetchOptions.body = JSON.stringify(data);
		}

		const response = await fetch(url, fetchOptions);

		if (!response.ok) {
			let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

			try {
				const errorData = (await response.json()) as {
					error?: { message?: string } | string;
				};
				if (errorData.error) {
					if (typeof errorData.error === "string") {
						errorMessage = errorData.error;
					} else {
						errorMessage = errorData.error.message || "Unknown error";
					}
				}
			} catch {
			}

			throw new Error(errorMessage);
		}

		// Handle empty responses (204 No Content)
		if (response.status === 204) {
			return undefined as T;
		}

		const result = (await response.json()) as T;

		if (shouldCache && method === "GET") {
			const cacheKey = getCacheKey(url, options);
			setCache(cacheKey, result, cacheTTL);
		}

		return result;
	}

	function get<T>(url: string, options?: THttpOptions) {
		return makeRequest<T>(url, "GET", undefined, options);
	}

	function post<T>(url: string, data?: unknown, options?: THttpOptions) {
		return makeRequest<T>(url, "POST", data, options);
	}

	function put<T>(url: string, data?: unknown, options?: THttpOptions) {
		return makeRequest<T>(url, "PUT", data, options);
	}

	function deleteRequest<T>(url: string, data?: unknown, options?: THttpOptions) {
		return makeRequest<T>(url, "DELETE", data, options);
	}

	return {
		get,
		post,
		put,
		delete: deleteRequest,
	};
}
