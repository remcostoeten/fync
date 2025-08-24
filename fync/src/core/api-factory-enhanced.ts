import type { TBaseConfig } from "./types";
import { type TResult, success, failure, type TApiError } from "./result";
import { Cache, type TCacheConfig } from "./cache";
import { RateLimiter, type TRateLimitConfig, RATE_LIMIT_PRESETS } from "./rate-limiter";

type TApiConfig = TBaseConfig & {
	baseUrl: string;
	headers?: Record<string, string>;
	auth?: {
		type: "bearer" | "basic" | "apikey" | "oauth2";
		token?: string;
		credentials?: { username: string; password: string };
		key?: string;
	};
	cache?: Partial<TCacheConfig>;
	rateLimit?: Partial<TRateLimitConfig> | keyof typeof RATE_LIMIT_PRESETS;
	retryConfig?: {
		maxRetries?: number;
		retryDelay?: number;
		retryOn?: number[];
	};
};

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type TRequestOptions = {
	params?: Record<string, any>;
	body?: any;
	headers?: Record<string, string>;
	skipCache?: boolean;
	customCacheTTL?: number;
	skipRateLimit?: boolean;
};

type TEnhancedApiClient = {
	request<T>(
		method: THttpMethod,
		path: string,
		options?: TRequestOptions,
	): Promise<TResult<T, TApiError>>;
	get<T>(path: string, options?: TRequestOptions): Promise<TResult<T, TApiError>>;
	post<T>(path: string, body?: any, options?: TRequestOptions): Promise<TResult<T, TApiError>>;
	put<T>(path: string, body?: any, options?: TRequestOptions): Promise<TResult<T, TApiError>>;
	delete<T>(path: string, options?: TRequestOptions): Promise<TResult<T, TApiError>>;
	patch<T>(path: string, body?: any, options?: TRequestOptions): Promise<TResult<T, TApiError>>;
	// Cache management
	clearCache(): void;
	invalidateCache(pattern?: string): void;
	// Rate limit info
	getRateLimitInfo(): { remaining: number; resetTime: number | null };
};

function buildAuthHeaders(auth?: TApiConfig["auth"]): Record<string, string> {
	if (!auth) return {};

	switch (auth.type) {
		case "bearer":
			return { Authorization: `Bearer ${auth.token}` };
		case "basic": {
			const { username = "", password = "" } = auth.credentials || {};
			const encoded = Buffer.from(`${username}:${password}`).toString("base64");
			return { Authorization: `Basic ${encoded}` };
		}
		case "apikey":
			return { "X-API-Key": auth.key || "" };
		case "oauth2":
			return { Authorization: `Bearer ${auth.token}` };
		default:
			return {};
	}
}

function buildUrl(
	baseUrl: string,
	path: string,
	params?: Record<string, any>,
): string {
	const url = new URL(path, baseUrl);
	if (params) {
		Object.entries(params).forEach(function ([key, value]) {
			if (value !== undefined && value !== null) {
				url.searchParams.append(key, String(value));
			}
		});
	}
	return url.toString();
}

async function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function createEnhancedApi(config: TApiConfig): TEnhancedApiClient {
	const authHeaders = buildAuthHeaders(config.auth);
	const defaultHeaders = {
		"Content-Type": "application/json",
		...config.headers,
		...authHeaders,
	};

	// Initialize cache
	const cache = new Cache(config.cache);

	// Initialize rate limiter
const ratePreset = typeof config.rateLimit === "string"
	? (() => {
		const preset = RATE_LIMIT_PRESETS[config.rateLimit as keyof typeof RATE_LIMIT_PRESETS] as any;
		return preset?.default ?? preset?.authenticated ?? preset?.unauthenticated ?? undefined;
	})()
	: config.rateLimit;

	const rateLimiter = new RateLimiter(ratePreset);

	// Setup retry configuration
	const retryConfig = {
		maxRetries: config.retryConfig?.maxRetries || 3,
		retryDelay: config.retryConfig?.retryDelay || 1000,
		retryOn: config.retryConfig?.retryOn || [429, 503, 504],
	};

	async function request<T>(
		method: THttpMethod,
		path: string,
		options?: TRequestOptions,
		retryCount = 0,
	): Promise<TResult<T, TApiError>> {
		const url = buildUrl(config.baseUrl, path, options?.params);

		// Check cache for GET requests
		if (method === "GET" && !options?.skipCache) {
			const cached = cache.get<T>(method, url, options?.params);
			if (cached !== null) {
				return success(cached);
			}
		}

		// Check rate limit
		if (!options?.skipRateLimit) {
			const canProceed = await rateLimiter.checkLimit(config.baseUrl);
			if (!canProceed) {
				await rateLimiter.waitForLimit(config.baseUrl);
			}
		}

		const headers = { ...defaultHeaders, ...options?.headers };
		const fetchOptions: RequestInit = {
			method,
			headers,
		};

		if (options?.body && method !== "GET") {
			fetchOptions.body = JSON.stringify(options.body);
		}

		try {
			const response = await fetch(url, fetchOptions);

			if (!response.ok) {
				const errorText = await response.text();
				const error: TApiError = {
					message: `API request failed: ${response.status} ${response.statusText}`,
					statusCode: response.status,
					details: { response: errorText },
				};

				// Check if we should retry
				if (
					retryCount < retryConfig.maxRetries &&
					retryConfig.retryOn.includes(response.status)
				) {
					await sleep(retryConfig.retryDelay * Math.pow(2, retryCount)); // Exponential backoff
					return request(method, path, options, retryCount + 1);
				}

				return failure(error);
			}

			const data = await response.json();

			// Cache successful GET requests
			if (method === "GET" && !options?.skipCache) {
				cache.set(method, url, data, options?.params, options?.customCacheTTL);
			}

			// Invalidate cache for mutating operations
			if (method !== "GET") {
				cache.invalidateByUrl(url);
			}

			return success(data as T);
		} catch (error) {
			const apiError: TApiError = {
				message: error instanceof Error ? error.message : String(error),
				details: { error },
			};

			// Retry on network errors
			if (retryCount < retryConfig.maxRetries) {
				await sleep(retryConfig.retryDelay * Math.pow(2, retryCount));
				return request(method, path, options, retryCount + 1);
			}

			return failure(apiError);
		}
	}

	function get<T>(path: string, options?: TRequestOptions): Promise<TResult<T, TApiError>> {
		return request<T>("GET", path, options);
	}

	function post<T>(
		path: string,
		body?: any,
		options?: TRequestOptions,
	): Promise<TResult<T, TApiError>> {
		return request<T>("POST", path, { ...options, body });
	}

	function put<T>(
		path: string,
		body?: any,
		options?: TRequestOptions,
	): Promise<TResult<T, TApiError>> {
		return request<T>("PUT", path, { ...options, body });
	}

	function deleteRequest<T>(
		path: string,
		options?: TRequestOptions,
	): Promise<TResult<T, TApiError>> {
		return request<T>("DELETE", path, options);
	}

	function patch<T>(
		path: string,
		body?: any,
		options?: TRequestOptions,
	): Promise<TResult<T, TApiError>> {
		return request<T>("PATCH", path, { ...options, body });
	}

	return {
		request,
		get,
		post,
		put,
		delete: deleteRequest,
		patch,
		clearCache: () => cache.clear(),
		invalidateCache: (pattern?: string) => cache.invalidate(pattern),
		getRateLimitInfo: () => ({
			remaining: rateLimiter.getRemainingRequests(config.baseUrl),
			resetTime: rateLimiter.getResetTime(config.baseUrl),
		}),
	};
}

export type { TEnhancedApiClient, TApiConfig, THttpMethod, TRequestOptions };
