import type { THttpResponse, THttpHeaders } from "../../core/http/types";

type THttpClientConfig = {
	baseUrl: string;
	defaultHeaders?: THttpHeaders;
	timeout?: number;
};

type THttpClient = {
	get<T = unknown>(
		path: string,
		params?: Record<string, string | number | boolean>,
	): Promise<THttpResponse<T>>;
};

function createHttpClient(config: THttpClientConfig): THttpClient {
	const { baseUrl, defaultHeaders = {}, timeout = 30000 } = config;

	async function makeRequest<T = unknown>(
		path: string,
		options: RequestInit = {},
		params?: Record<string, string | number | boolean>,
	): Promise<THttpResponse<T>> {
		const url = new URL(path, baseUrl);
		
		if (params) {
			for (const [key, value] of Object.entries(params)) {
				url.searchParams.set(key, String(value));
			}
		}

		const controller = new AbortController();
		function abortRequest() {
			controller.abort();
		}
		const timeoutId = setTimeout(abortRequest, timeout);

		try {
			const response = await fetch(url.toString(), {
				...options,
				headers: {
					...defaultHeaders,
					...options.headers,
				},
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			const responseHeaders: THttpHeaders = {};
			function collectHeaders(value: string, key: string) {
				responseHeaders[key] = value;
			}
			response.headers.forEach(collectHeaders);

			let data: T;
			const contentType = response.headers.get("content-type");
			
			if (contentType?.includes("application/json")) {
				data = await response.json();
			} else {
				data = (await response.text()) as unknown as T;
			}

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			return {
				data,
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders,
				ok: response.ok,
			};
		} catch (error) {
			clearTimeout(timeoutId);
			if (error instanceof Error) {
				throw new Error(`Request failed: ${error.message}`);
			}
			throw error;
		}
	}

	return {
		async get<T = unknown>(
			path: string,
			params?: Record<string, string | number | boolean>,
		): Promise<THttpResponse<T>> {
			return makeRequest<T>(path, { method: "GET" }, params);
		},
	};
}

export { createHttpClient };
export type { THttpClient, THttpClientConfig };
