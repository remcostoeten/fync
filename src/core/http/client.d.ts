import type { THttpConfig, THttpResponse, TRequestConfig } from "./types";
export declare function createHttpClient(config?: THttpConfig): {
	request: <T = unknown>(
		url: string,
		requestConfig?: TRequestConfig,
	) => Promise<THttpResponse<T>>;
	get: <T = unknown>(
		url: string,
		config?: TRequestConfig,
	) => Promise<THttpResponse<T>>;
	post: <T = unknown>(
		url: string,
		data?: unknown,
		config?: TRequestConfig,
	) => Promise<THttpResponse<T>>;
	put: <T = unknown>(
		url: string,
		data?: unknown,
		config?: TRequestConfig,
	) => Promise<THttpResponse<T>>;
	patch: <T = unknown>(
		url: string,
		data?: unknown,
		config?: TRequestConfig,
	) => Promise<THttpResponse<T>>;
	delete: <T = unknown>(
		url: string,
		config?: TRequestConfig,
	) => Promise<THttpResponse<T>>;
};
//# sourceMappingURL=client.d.ts.map
