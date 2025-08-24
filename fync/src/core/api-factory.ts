import type { TBaseConfig } from "./types";

export type TApiConfig = TBaseConfig & {
	baseUrl: string;
	headers?: Record<string, string>;
	auth?: {
		type: "bearer" | "basic" | "apikey" | "oauth2";
		token?: string;
		credentials?: { username: string; password: string };
		key?: string;
	};
};

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type TRequestOptions = {
	params?: Record<string, any>;
	body?: any;
	headers?: Record<string, string>;
};

export type TApiClient = {
	request<T>(
		method: THttpMethod,
		path: string,
		options?: TRequestOptions,
	): Promise<T>;
	get<T>(path: string, options?: TRequestOptions): Promise<T>;
	post<T>(path: string, body?: any, options?: TRequestOptions): Promise<T>;
	put<T>(path: string, body?: any, options?: TRequestOptions): Promise<T>;
	delete<T>(path: string, options?: TRequestOptions): Promise<T>;
	patch<T>(path: string, body?: any, options?: TRequestOptions): Promise<T>;
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

export function createFyncApi(config: TApiConfig): TApiClient {
	const authHeaders = buildAuthHeaders(config.auth);
	const defaultHeaders = {
		"Content-Type": "application/json",
		...config.headers,
		...authHeaders,
	};

	async function request<T>(
		method: THttpMethod,
		path: string,
		options?: TRequestOptions,
	): Promise<T> {
		const url = buildUrl(config.baseUrl, path, options?.params);
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
				throw new Error(
					`API request failed: ${response.status} ${response.statusText} - ${errorText}`,
				);
			}

			const data = await response.json();
			return data as T;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error(`API request failed: ${String(error)}`);
		}
	}

	function get<T>(path: string, options?: TRequestOptions): Promise<T> {
		return request<T>("GET", path, options);
	}

	function post<T>(
		path: string,
		body?: any,
		options?: TRequestOptions,
	): Promise<T> {
		return request<T>("POST", path, { ...options, body });
	}

	function put<T>(
		path: string,
		body?: any,
		options?: TRequestOptions,
	): Promise<T> {
		return request<T>("PUT", path, { ...options, body });
	}

	function deleteRequest<T>(
		path: string,
		options?: TRequestOptions,
	): Promise<T> {
		return request<T>("DELETE", path, options);
	}

	function patch<T>(
		path: string,
		body?: any,
		options?: TRequestOptions,
	): Promise<T> {
		return request<T>("PATCH", path, { ...options, body });
	}

	return {
		request,
		get,
		post,
		put,
		delete: deleteRequest,
		patch,
	};
}
