type THttpRequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
};
type THttpResponse<T = unknown> = {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
};
type TPaginatedResponse<T = unknown> = {
    data: T[];
    hasNext: boolean;
    nextUrl?: string;
    totalCount?: number;
};
declare function httpRequest<T = unknown>(url: string, query?: Record<string, string | number>, signal?: AbortSignal, extraHeaders?: Record<string, string>): Promise<THttpResponse<T>>;
declare function httpRequestWithPagination<T = unknown>(url: string, query?: Record<string, string | number>, signal?: AbortSignal, extraHeaders?: Record<string, string>): Promise<TPaginatedResponse<T>>;
type THttpClientConfig = {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
    timeout?: number;
};
declare function createHttpClient(config?: THttpClientConfig): {
    get: <T = unknown>(endpoint: string, query?: Record<string, string | number>, signal?: AbortSignal) => Promise<THttpResponse<T>>;
    getPaginated: <T = unknown>(endpoint: string, query?: Record<string, string | number>, signal?: AbortSignal) => Promise<TPaginatedResponse<T>>;
};
export { httpRequest, httpRequestWithPagination, createHttpClient };
export type { THttpResponse, TPaginatedResponse, THttpRequestOptions, THttpClientConfig, };
//# sourceMappingURL=http-client.d.ts.map