"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLruCache = createLruCache;
function createLruCache(options = {}) {
  const cache = new Map();
  const {
    ttl: defaultTTL,
    maxSize = 100
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
  function evictLru() {
    if (cache.size <= maxSize) return;
    const oldestKey = cache.keys().next().value;
    if (oldestKey) {
      cache.delete(oldestKey);
    }
  }
  function get(key) {
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
  function set(key, value, ttl) {
    evictExpired();
    const effectiveTTL = ttl ?? defaultTTL;
    const entry = {
      value,
      timestamp: Date.now(),
      expiry: effectiveTTL ? Date.now() + effectiveTTL : undefined
    };
    cache.set(key, entry);
    evictLru();
  }
  function deleteKey(key) {
    return cache.delete(key);
  }
  function clear() {
    cache.clear();
  }
  function has(key) {
    const entry = cache.get(key);
    if (!entry || isExpired(entry)) {
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