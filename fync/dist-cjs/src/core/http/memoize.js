"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = memoize;
// biome-ignore lint/suspicious/noExplicitAny: Generic function signature requires any types
function memoize(fn, getKey, options = {}) {
  const cache = new Map();
  return (...args) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    const now = Date.now();
    const cached = cache.get(key);
    if (cached && (!options.ttl || now - cached.timestamp < options.ttl)) {
      return cached.value;
    }
    const result = fn(...args);
    cache.set(key, {
      value: result,
      timestamp: now
    });
    // Auto-cleanup expired entries
    if (options.ttl) {
      setTimeout(() => {
        const entry = cache.get(key);
        if (entry && options.ttl && now - entry.timestamp >= options.ttl) {
          cache.delete(key);
        }
      }, options.ttl);
    }
    return result;
  };
}