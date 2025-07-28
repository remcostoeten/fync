import { fetch } from "undici";

type THttpClientConfig = {
	baseUrl?: string;
	defaultHeaders?: Record<string, string>;
	timeout?: number;
};

type THttpResponse<T> = {
	data: T;
	status: number;
	headers: Record<string, string>;
};

function createHttpClient(config: THttpClientConfig = {}) {
	const {
		baseUrl = "https://registry.npmjs.org",
		defaultHeaders = {},
		timeout = 30000,
	} = config;

	async function request<T = unknown>(
		endpoint: string,
		options: {
			method?: string;
			params?: Record<string, string | number | boolean>;
			headers?: Record<string, string>;
		} = {},
	): Promise<THttpResponse<T>> {
		const { method = "GET", params, headers = {} } = options;

		let url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

		if (params) {
			const searchParams = new URLSearchParams();
			for (const [key, value] of Object.entries(params)) {
				searchParams.append(key, String(value));
			}
			if (searchParams.toString()) {
				url += `?${searchParams.toString()}`;
			}
		}

		const requestHeaders = {
			Accept: "application/json",
			"User-Agent": "npm-http-client",
			...defaultHeaders,
			...headers,
		};

		try {
			const response = await fetch(url, {
				method,
				headers: requestHeaders,
				signal: AbortSignal.timeout(timeout),
			});

			const responseHeaders: Record<string, string> = {};
			response.headers.forEach(function setResponseHeader(value, key) {
				responseHeaders[key] = value;
			});

			if (!response.ok) {
				throw new Error(
					`HTTP ${response.status}: ${response.statusText} for ${url}`,
				);
			}

			const contentType = response.headers.get("content-type") || "";
			let data: T;

			if (contentType.includes("application/json")) {
				data = (await response.json()) as T;
			} else {
				data = (await response.text()) as T;
			}

			return {
				data,
				status: response.status,
				headers: responseHeaders,
			};
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`NPM API request failed: ${error.message}`);
			}
			throw error;
		}
	}

	function get<T = unknown>(
		endpoint: string,
		params?: Record<string, string | number | boolean>,
	) {
		return request<T>(endpoint, { method: "GET", params });
	}

	function post<T = unknown>(endpoint: string, data?: unknown) {
		return request<T>(endpoint, { method: "POST" });
	}

	function put<T = unknown>(endpoint: string, data?: unknown) {
		return request<T>(endpoint, { method: "PUT" });
	}

	function patch<T = unknown>(endpoint: string, data?: unknown) {
		return request<T>(endpoint, { method: "PATCH" });
	}

	function deleteMethod<T = unknown>(endpoint: string, data?: unknown) {
		return request<T>(endpoint, { method: "DELETE" });
	}

	return {
		get,
		post,
		put,
		patch,
		delete: deleteMethod,
		request,
	};
}

export { createHttpClient };
export type { THttpClientConfig, THttpResponse };
