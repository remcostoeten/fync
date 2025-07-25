import {
	createChainableClient,
	type TBaseConfig,
	type TChainableClient,
} from "../../core/chainable";
import { createHttpClient } from "./http-client";

type TNpmClientConfig = TBaseConfig & {
	userAgent?: string;
	timeout?: number;
};

function createNpmChainableClient(config: TNpmClientConfig): TChainableClient {
	const httpClient = createHttpClient({
		baseUrl: config.baseUrl || "https://registry.npmjs.org",
		defaultHeaders: {
			"User-Agent": config.userAgent || "@remcostoeten/fync npm-client",
		},
		timeout: config.timeout || 30000,
	});

	return createChainableClient(config, httpClient, {
		cacheKeyPrefix: "npm",
		supportsPagination: false,
	});
}

function createNpmClient(config: TNpmClientConfig = {}): TChainableClient {
	return createNpmChainableClient(config);
}

export { createNpmClient };
export type { TNpmClientConfig, TChainableClient };
export type { TRequestOptions } from "../../core/chainable";
