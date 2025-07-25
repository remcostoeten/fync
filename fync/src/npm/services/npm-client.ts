import { memoize } from "../../core/http/memoize";
import type { TNpmConfig } from "../types/npm-common";
import { createHttpClient } from "./http-client";

type TNpmClientConfig = {
	baseUrl?: string;
	cache?: boolean;
	cacheTTL?: number;
	userAgent?: string;
	timeout?: number;
};

type TRequestOptions = {
	params?: Record<string, string | number>;
	cache?: boolean;
	cacheTTL?: number;
};

type TChainableClient = {
	[key: string]: TChainableClient;
} & {
	get<T = unknown>(options?: TRequestOptions): Promise<T>;
	path(): string;
};

function createChainableClient(
	config: TNpmClientConfig,
	pathSegments: string[] = [],
): TChainableClient {
	const httpClient = createHttpClient({
		baseUrl: config.baseUrl || "https://registry.npmjs.org",
		defaultHeaders: {
			"User-Agent": config.userAgent || "@remcostoeten/fync npm-client",
		},
		timeout: config.timeout || 30000,
	});

	const buildPath = () => "/" + pathSegments.join("/");

	async function executeRequest<T = unknown>(
		options?: TRequestOptions,
	): Promise<T> {
		const path = buildPath();
		const { params, cache = config.cache !== false } = options || {};

		const requestFn = async () => {
			const response = await httpClient.get<T>(path, params);
			return response.data;
		};

		if (cache) {
			const cacheKey = `npm:${path}:${JSON.stringify(params || {})}`;
			const memoizedFn = memoize(requestFn, () => cacheKey, {
				ttl: options?.cacheTTL ?? config.cacheTTL ?? 300000,
			});
			return memoizedFn();
		}

		return requestFn();
	}

	return new Proxy({} as TChainableClient, {
		get(target, prop: string | symbol) {
			if (prop === "get") {
				return <T = unknown>(options?: TRequestOptions) =>
					executeRequest<T>(options);
			}

			if (prop === "path") {
				return () => buildPath();
			}

			// For any other property, create a new chainable client with the added path segment
			return createChainableClient(config, [...pathSegments, String(prop)]);
		},
	});
}

function createNpmClient(config: TNpmClientConfig = {}): TChainableClient {
	return createChainableClient(config);
}

export { createNpmClient };
export type { TNpmClientConfig, TRequestOptions, TChainableClient };
