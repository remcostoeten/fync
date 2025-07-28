export type THttpMethod =
	| "GET"
	| "HEAD"
	| "OPTIONS";

export type THttpHeaders = Record<string, string>;

export type THttpConfig = {
	baseURL?: string;
	timeout?: number;
	headers?: THttpHeaders;
	retries?: number;
	retryDelay?: number;
};

export type TRequestConfig = {
	method?: THttpMethod;
	headers?: THttpHeaders;
	body?: string | FormData | URLSearchParams;
	timeout?: number;
	signal?: AbortSignal;
	params?: Record<string, string | number | boolean>;
};

export type THttpResponse<T = unknown> = {
	data: T;
	status: number;
	statusText: string;
	headers: THttpHeaders;
	ok: boolean;
};

export type THttpError = {
	message: string;
	status?: number;
	statusText?: string;
	code?: string;
};

export type TRequestOptions = {
	cache?: boolean;
	cacheKey?: string;
	cacheTTL?: number;
	retries?: number;
	retryDelay?: number;
};
