"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = void 0;
exports.memoizeRequest = memoizeRequest;
var _client = require("./client");
function memoizeRequest(fetchFn, options) {
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
const client = exports.client = (0, _client.createHttpClient)({
  baseURL: "https://api.example.com",
  timeout: 10000,
  retries: 3,
  retryDelay: 1000
});