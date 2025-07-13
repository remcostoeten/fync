import type { TCacheAdapter, TCacheEntry, TCacheOptions } from './types';

export function createLruCache<T = unknown>(options: TCacheOptions = {}): TCacheAdapter<T> {
  const cache = new Map<string, TCacheEntry<T>>();
  const { ttl: defaultTTL, maxSize = 100 } = options;

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

  function evictLru(): void {
    if (cache.size <= maxSize) return;
    const oldestKey = cache.keys().next().value;
    if (oldestKey) {
      cache.delete(oldestKey);
    }
  }

  function get(key: string): T | undefined {
    const entry = cache.get(key);
    if (!entry || isExpired(entry)) {
      cache.delete(key);
      return undefined;
    }

    // Move accessed item to the end to mark it as most recently used
    cache.delete(key);
    cache.set(key, entry);

    return entry.value;
  }

  function set(key: string, value: T, ttl?: number): void {
    evictExpired();

    const effectiveTTL = ttl ?? defaultTTL;
    const entry: TCacheEntry<T> = {
      value,
      timestamp: Date.now(),
      expiry: effectiveTTL ? Date.now() + effectiveTTL : undefined
    };

    cache.set(key, entry);
    evictLru();
  }

  function deleteKey(key: string): boolean {
    return cache.delete(key);
  }

  function clear(): void {
    cache.clear();
  }

  function has(key: string): boolean {
    const entry = cache.get(key);
    if (!entry || isExpired(entry)) {
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
    size
  };
}
