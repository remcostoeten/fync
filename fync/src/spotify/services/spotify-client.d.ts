type TSpotifyClientConfig = {
	token?: string;
	baseUrl?: string;
	cache?: boolean;
	cacheTTL?: number;
};
type TRequestOptions = {
	params?: Record<string, string | number>;
	cache?: boolean;
	cacheTTL?: number;
	paginate?: boolean;
	allPages?: boolean;
	limit?: number;
	after?: string;
	before?: string;
	immediate?: boolean;
};
type TChainableClient = {
	[key: string]: TChainableClient;
} & {
	get<T = unknown>(options?: TRequestOptions): Promise<T>;
	post<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	put<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	patch<T = unknown>(data: unknown, options?: TRequestOptions): Promise<T>;
	delete<T = unknown>(options?: TRequestOptions): Promise<T>;
	paginate<T = unknown>(options?: TRequestOptions): Promise<T[]>;
	stream<T = unknown>(
		options?: TRequestOptions,
	): AsyncGenerator<T, void, unknown>;
	path(): string;
};
declare function createSpotifyClient(
	config?: TSpotifyClientConfig,
): TChainableClient;
export { createSpotifyClient };
export type { TSpotifyClientConfig, TRequestOptions, TChainableClient };
//# sourceMappingURL=spotify-client.d.ts.map
