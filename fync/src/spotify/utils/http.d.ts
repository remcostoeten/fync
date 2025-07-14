import type { TSpotifyConfig } from "../types";
type THttpOptions = {
	headers?: Record<string, string>;
	cache?: boolean;
	cacheTTL?: number;
};
type THttpClient = {
	get: <T>(url: string, options?: THttpOptions) => Promise<T>;
	post: <T>(url: string, data?: any, options?: THttpOptions) => Promise<T>;
	put: <T>(url: string, data?: any, options?: THttpOptions) => Promise<T>;
	delete: <T>(url: string, data?: any, options?: THttpOptions) => Promise<T>;
};
export declare function createHttpClient(config: TSpotifyConfig): THttpClient;
export {};
//# sourceMappingURL=http.d.ts.map
