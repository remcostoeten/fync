type TMemoizeOptions = {
	ttl?: number;
	key?: string;
};

export function memoize<T extends (...args: any[]) => any>(
	fn: T,
	getKey?: (...args: Parameters<T>) => string,
	options: TMemoizeOptions = {},
): T {
	const cache = new Map<string, { value: ReturnType<T>; timestamp: number }>();

	function memoizedFunction(...args: Parameters<T>): ReturnType<T> {
		const key = getKey ? getKey(...args) : JSON.stringify(args);
		const now = Date.now();
		const cached = cache.get(key);

		if (cached && (!options.ttl || now - cached.timestamp < options.ttl)) {
			return cached.value;
		}

		const result = fn(...args);
		cache.set(key, { value: result, timestamp: now });

		if (options.ttl) {
			setTimeout(function cleanupExpiredEntry() {
				const entry = cache.get(key);
				if (entry && options.ttl && now - entry.timestamp >= options.ttl) {
					cache.delete(key);
				}
			}, options.ttl);
		}

		return result;
	}

	return memoizedFunction as T;
}
