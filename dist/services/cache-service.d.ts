type TFetcher<T> = (...args: unknown[]) => Promise<T>;
declare function setCache(key: string, data: unknown, ttlMs: number): void;
declare function getCache(key: string): unknown;
declare function memoize<T>(fetcher: TFetcher<T>, keyGenerator: (...args: unknown[]) => string, ttlMs?: number): TFetcher<T>;
declare function clearCache(): void;
export { setCache, getCache, memoize, clearCache };
//# sourceMappingURL=cache-service.d.ts.map