import type { TCacheAdapter, TCacheEntry, TCacheOptions } from "./types";

export function createMemoryCache<T = unknown>(
	options: TCacheOptions = {},
): TCacheAdapter<T> {
	const cache = new Map<string, TCacheEntry<T>>();
	const { ttl: defaultTTL, maxSize } = options;

	function isExpired(entry: TCacheEntry<T>): boolean {
		if (!entry.expiry) return false;
		return Date.now() > entry.expiry;
	}

	function evictExpired(): void {
		const now = Date.now();
		for (const [key, entry] of cache.entries()) {
			if (entry.expiry && now > entry.expiry) {
				cache.delete(key);
			}
		}
	}

	function evictOldest(): void {
		if (!maxSize || cache.size <= maxSize) return;

		const entries = globalThis.Array.from(cache.entries());
		entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

		const toDelete = entries.slice(0, cache.size - maxSize);
		for (const [key] of toDelete) {
			cache.delete(key);
		}
	}

	function get(key: string): T | undefined {
		const entry = cache.get(key);
		if (!entry) return undefined;

		if (isExpired(entry)) {
			cache.delete(key);
			return undefined;
		}

		return entry.value;
	}

	function set(key: string, value: T, ttl?: number): void {
		evictExpired();

		const effectiveTTL = ttl ?? defaultTTL;
		const entry: TCacheEntry<T> = {
			value,
			timestamp: Date.now(),
			expiry: effectiveTTL ? Date.now() + effectiveTTL : undefined,
		};

		cache.set(key, entry);
		evictOldest();
	}

	function deleteKey(key: string): boolean {
		return cache.delete(key);
	}

	function clear(): void {
		cache.clear();
	}

	function has(key: string): boolean {
		const entry = cache.get(key);
		if (!entry) return false;

		if (isExpired(entry)) {
			cache.delete(key);
			return false;
		}

		return true;
	}

	function size(): number {
		evictExpired();
		return cache.size;
	}

	return {
		get,
		set,
		delete: deleteKey,
		clear,
		has,
		size,
	};
}
