import {
	createChainableClient,
	type TBaseConfig,
	type TChainableClient,
	type TRequestOptions,
} from "../../core/chainable";
import type { TSpotifyConfig } from "../types/spotify-common";
import { createHttpClient } from "../utils/http";

type TSpotifyClientConfig = TBaseConfig & {
	token?: string;
	limit?: number;
	after?: string;
	before?: string;
	immediate?: boolean;
};

function createSpotifyChainableClient(
	config: TSpotifyClientConfig,
): TChainableClient {
	const spotifyHttpClient = createHttpClient({
        clientId: "",
		clientSecret: "",
		accessToken: config.token,
		baseUrl: config.baseUrl || "https://api.spotify.com/v1",
		cache: config.cache,
		cacheTTL: config.cacheTTL,
	});

	async function getMethod<T>(
		path: string,
		params?: Record<string, string | number | boolean>,
	) {
		return { data: await spotifyHttpClient.get<T>(path) };
	}

	async function postMethod<T>(path: string, data?: unknown) {
		return { data: await spotifyHttpClient.post<T>(path, data) };
	}

	async function putMethod<T>(path: string, data?: unknown) {
		return { data: await spotifyHttpClient.put<T>(path, data) };
	}

	async function patchMethod<T>(path: string, data?: unknown) {
		return { data: await spotifyHttpClient.put<T>(path, data) };
	}

	async function deleteMethod<T>(path: string, data?: unknown) {
		return { data: await spotifyHttpClient.delete<T>(path, data) };
	}

	const adaptedHttpClient = {
		get: getMethod,
		post: postMethod,
		put: putMethod,
		patch: patchMethod,
		delete: deleteMethod,
	};

	return createChainableClient(config, adaptedHttpClient, {
		cacheKeyPrefix: "spotify",
		supportsPagination: false,
		defaultOptions: {
			params: {
				...(config.limit && { limit: config.limit }),
				...(config.after && { after: config.after }),
				...(config.before && { before: config.before }),
				...(config.immediate && { immediate: config.immediate }),
			},
		},
	});
}

function createSpotifyClient(
	config: TSpotifyClientConfig = {},
): TChainableClient {
	return createSpotifyChainableClient(config);
}

export { createSpotifyClient };
export type { TSpotifyClientConfig, TRequestOptions, TChainableClient };
