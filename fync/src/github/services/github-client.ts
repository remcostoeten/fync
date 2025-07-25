import {
	createChainableClient,
	type TBaseConfig,
	type TChainableClient,
} from "../../core/chainable";
import { createHttpClient } from "./http-client";

type TGitHubClientConfig = TBaseConfig & {
	token?: string;
};

function createGitHubChainableClient(
	config: TGitHubClientConfig,
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

	return createChainableClient(config, httpClient, {
		cacheKeyPrefix: "github",
		supportsPagination: true,
	});
}

function createGitHubClient(
	config: TGitHubClientConfig = {},
): TChainableClient {
	return createGitHubChainableClient(config);
}

export { createGitHubClient };
export type { TGitHubClientConfig, TChainableClient };
