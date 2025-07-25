import {
	createChainableClient,
	type TBaseConfig,
	type TChainableClient,
} from "../../core/chainable";
import { createHttpClient } from "./http-client";

type TCalendarClientConfig = TBaseConfig & {
	accessToken: string;
};

function createCalendarChainableClient(
	config: TCalendarClientConfig,
): TChainableClient {
	const defaultHeaders: Record<string, string> = {
		Authorization: `Bearer ${config.accessToken}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	const httpClient = createHttpClient({
		baseUrl: config.baseUrl || "https://www.googleapis.com/calendar/v3",
		defaultHeaders,
	});

	return createChainableClient(config, httpClient, {
		cacheKeyPrefix: "calendar",
		supportsPagination: false,
	});
}

function createCalendarClient(config: TCalendarClientConfig): TChainableClient {
	return createCalendarChainableClient(config);
}

export { createCalendarClient };
export type { TCalendarClientConfig, TChainableClient };
