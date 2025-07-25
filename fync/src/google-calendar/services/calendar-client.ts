import { memoize } from "../../core/http/memoize";
import { createHttpClient } from "./http-client";
import type { THttpResponse } from "../../core/http/types";

type TCalendarClientConfig = {
	accessToken: string;
	baseUrl?: string;
	cache?: boolean;
	cacheTTL?: number;
};

type TRequestOptions = {
	params?: Record<string, string | number | boolean>;
	cache?: boolean;
	cacheTTL?: number;
};

type TChainableCalendarClient = {
	[key: string]: TChainableCalendarClient;
} & {
	get<T = unknown>(options?: TRequestOptions): Promise<T>;
	path(): string;
};

function createChainableCalendarClient(
	config: TCalendarClientConfig,
	pathSegments: string[] = [],
): TChainableCalendarClient {
	const defaultHeaders: Record<string, string> = {
		Authorization: `Bearer ${config.accessToken}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	const httpClient = createHttpClient({
		baseUrl: config.baseUrl || "https://www.googleapis.com/calendar/v3",
		defaultHeaders,
	});

	const buildPath = () => "/" + pathSegments.join("/");

	async function executeRequest<T = unknown>(
		method: "GET",
		options?: TRequestOptions,
	): Promise<T> {
		const path = buildPath();
		const { params, cache = config.cache !== false } = options || {};

		const requestFn = async () => {
			const response = await httpClient.get(path, params);
			return response.data;
		};

		if (cache && method === "GET") {
			const cacheKey = `calendar:${path}:${JSON.stringify(params || {})}`;
			const memoizedFn = memoize(requestFn, () => cacheKey, {
				ttl: options?.cacheTTL ?? config.cacheTTL ?? 300000,
			});
			return memoizedFn() as Promise<T>;
		}

		return requestFn() as Promise<T>;
	}

	return new Proxy({} as TChainableCalendarClient, {
		get(target, prop: string | symbol) {
			if (prop === "get") {
				return <T = unknown>(options?: TRequestOptions) =>
					executeRequest<T>("GET", options);
			}

			if (prop === "path") {
				return () => buildPath();
			}

			return createChainableCalendarClient(config, [...pathSegments, String(prop)]);
		},
	});
}

function createCalendarClient(
	config: TCalendarClientConfig,
): TChainableCalendarClient {
	return createChainableCalendarClient(config);
}

export { createCalendarClient };
export type { TCalendarClientConfig, TRequestOptions, TChainableCalendarClient };
