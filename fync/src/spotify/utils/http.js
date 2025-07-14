export function createHttpClient(config) {
	const cache = new Map();
	function getCacheKey(url, options = {}) {
		return `${url}:${JSON.stringify(options)}`;
	}
	function isExpired(timestamp, ttl) {
		return Date.now() - timestamp > ttl;
	}
	function getFromCache(key) {
		const cached = cache.get(key);
		if (!cached) return null;
		if (isExpired(cached.timestamp, cached.ttl)) {
			cache.delete(key);
			return null;
		}
		return cached.data;
	}
	function setCache(key, data, ttl) {
		cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl,
		});
	}
	async function makeRequest(url, method, data, options = {}) {
		const shouldCache = options.cache !== false && config.cache !== false;
		const cacheTTL = options.cacheTTL || config.cacheTTL || 300000; // 5 minutes default
		if (shouldCache && method === "GET") {
			const cacheKey = getCacheKey(url, options);
			const cached = getFromCache(cacheKey);
			if (cached) return cached;
		}
		const fetchOptions = {
			method,
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
		};
		if (
			data &&
			(method === "POST" || method === "PUT" || method === "DELETE")
		) {
			fetchOptions.body = JSON.stringify(data);
		}
		const response = await fetch(url, fetchOptions);
		if (!response.ok) {
			let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
			try {
				const errorData = await response.json();
				if (errorData.error) {
					errorMessage = errorData.error.message || errorData.error;
				}
			} catch {
				// If we can't parse the error response, use the default message
			}
			throw new Error(errorMessage);
		}
		// Handle empty responses (204 No Content)
		if (response.status === 204) {
			return undefined;
		}
		const result = await response.json();
		if (shouldCache && method === "GET") {
			const cacheKey = getCacheKey(url, options);
			setCache(cacheKey, result, cacheTTL);
		}
		return result;
	}
	return {
		get: (url, options) => makeRequest(url, "GET", undefined, options),
		post: (url, data, options) => makeRequest(url, "POST", data, options),
		put: (url, data, options) => makeRequest(url, "PUT", data, options),
		delete: (url, data, options) => makeRequest(url, "DELETE", data, options),
	};
}
//# sourceMappingURL=http.js.map
