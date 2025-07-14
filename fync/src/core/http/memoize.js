import { createHttpClient } from "./client";
export function memoizeRequest(fetchFn, options) {
	const cache = {};
	return async function (url, config = {}) {
		const cacheKey = options.cacheKey || url;
		if (options.cache && cache[cacheKey]) {
			return cache[cacheKey];
		}
		const response = await fetchFn(url, config);
		if (options.cache) {
			cache[cacheKey] = response.clone();
			if (options.cacheTTL) {
				setTimeout(() => {
					delete cache[cacheKey];
				}, options.cacheTTL);
			}
		}
		return response;
	};
}
export const client = createHttpClient({
	baseURL: "https://api.example.com",
	timeout: 10000,
	retries: 3,
	retryDelay: 1000,
});
//# sourceMappingURL=memoize.js.map
