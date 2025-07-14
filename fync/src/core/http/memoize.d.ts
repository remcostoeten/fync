import type { TRequestOptions } from "./types";
export declare function memoizeRequest(
	fetchFn: typeof fetch,
	options: TRequestOptions,
): (url: string, config?: RequestInit) => Promise<Response>;
export declare const client: {
	request: <T = unknown>(
		url: string,
		requestConfig?: import("./types").TRequestConfig,
	) => Promise<import("./types").THttpResponse<T>>;
	get: <T = unknown>(
		url: string,
		config?: import("./types").TRequestConfig,
	) => Promise<import("./types").THttpResponse<T>>;
	post: <T = unknown>(
		url: string,
		data?: unknown,
		config?: import("./types").TRequestConfig,
	) => Promise<import("./types").THttpResponse<T>>;
	put: <T = unknown>(
		url: string,
		data?: unknown,
		config?: import("./types").TRequestConfig,
	) => Promise<import("./types").THttpResponse<T>>;
	patch: <T = unknown>(
		url: string,
		data?: unknown,
		config?: import("./types").TRequestConfig,
	) => Promise<import("./types").THttpResponse<T>>;
	delete: <T = unknown>(
		url: string,
		config?: import("./types").TRequestConfig,
	) => Promise<import("./types").THttpResponse<T>>;
};
//# sourceMappingURL=memoize.d.ts.map
