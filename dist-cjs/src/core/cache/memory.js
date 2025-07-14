"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMemoryCache = createMemoryCache;
function createMemoryCache(options = {}) {
  const cache = new Map();
  const {
    ttl: defaultTTL,
    maxSize
  } = options;
  function isExpired(entry) {
    if (!entry.expiry) return false;
    return Date.now() > entry.expiry;
  }
  function evictExpired() {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (entry.expiry && now > entry.expiry) {
        cache.delete(key);
      }
    }
  }
  function evictOldest() {
    if (!maxSize || cache.size <= maxSize) return;
    const entries = globalThis.Array.from(cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toDelete = entries.slice(0, cache.size - maxSize);
    for (const [key] of toDelete) {
      cache.delete(key);
    }
  }
  function get(key) {
    const entry = cache.get(key);
    if (!entry) return undefined;
    if (isExpired(entry)) {
      cache.delete(key);
      return undefined;
    }
    return entry.value;
  }
  function set(key, value, ttl) {
    evictExpired();
    const effectiveTTL = ttl ?? defaultTTL;
    const entry = {
      value,
      timestamp: Date.now(),
      expiry: effectiveTTL ? Date.now() + effectiveTTL : undefined
    };
    cache.set(key, entry);
    evictOldest();
  }
  function deleteKey(key) {
    return cache.delete(key);
  }
  function clear() {
    cache.clear();
  }
  function has(key) {
    const entry = cache.get(key);
    if (!entry) return false;
    if (isExpired(entry)) {
      cache.delete(key);
      return false;
    }
    return true;
  }
  function size() {
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