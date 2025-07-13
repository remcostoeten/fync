const cache = new Map();
const _memoizedFetchers = new Map();
function setCache(key, data, ttlMs) {
    const existingEntry = cache.get(key);
    if (existingEntry) {
        clearTimeout(existingEntry.timeoutId);
    }
    const timeoutId = setTimeout(() => {
        cache.delete(key);
    }, ttlMs);
    cache.set(key, { data, timeoutId });
}
function getCache(key) {
    const entry = cache.get(key);
    return entry ? entry.data : undefined;
}
function memoize(fetcher, keyGenerator, ttlMs = 300000) {
    const memoKey = fetcher.toString() + keyGenerator.toString();
    const existingFetcher = _memoizedFetchers.get(memoKey);
    if (existingFetcher) {
        return existingFetcher;
    }
    const memoizedFetcher = async (...args) => {
        const key = keyGenerator(...args);
        const cachedData = getCache(key);
        if (cachedData !== undefined) {
            return cachedData;
        }
        const result = await fetcher(...args);
        setCache(key, result, ttlMs);
        return result;
    };
    _memoizedFetchers.set(memoKey, memoizedFetcher);
    return memoizedFetcher;
}
function clearCache() {
    cache.clear();
    _memoizedFetchers.clear();
}
export { setCache, getCache, memoize, clearCache };
//# sourceMappingURL=cache-service.js.map