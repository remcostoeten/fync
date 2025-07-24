"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpotifyClient = createSpotifyClient;
var _http = require("../utils/http");
const cache = new Map();
function memoize(fetcher, keyGenerator, ttlMs = 300000) {
  return async (...args) => {
    const key = keyGenerator(...args);
    const cachedEntry = cache.get(key);
    if (cachedEntry) {
      return cachedEntry.data;
    }
    const result = await fetcher(...args);
    const timeoutId = setTimeout(() => {
      cache.delete(key);
    }, ttlMs);
    cache.set(key, {
      data: result,
      timeoutId
    });
    return result;
  };
}
function createChainableClient(config, pathSegments = []) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "spotify-api-service"
  };
  if (config.token) {
    defaultHeaders.Authorization = `Bearer ${config.token}`;
  }
  const httpClient = (0, _http.createHttpClient)({
    clientId: "",
    clientSecret: "",
    accessToken: config.token,
    baseUrl: config.baseUrl || "https://api.spotify.com/v1",
    cache: config.cache,
    cacheTTL: config.cacheTTL
  });
  const buildPath = () => "/" + pathSegments.join("/");
  async function executeRequest(method, data, options) {
    const path = buildPath();
    const {
      params,
      cache = config.cache !== false
    } = options || {};
    const requestFn = async () => {
      let url = `${config.baseUrl || "https://api.spotify.com/v1"}${path}`;
      if (params) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          searchParams.append(key, String(value));
        }
        if (searchParams.toString()) {
          url += `?${searchParams.toString()}`;
        }
      }
      switch (method) {
        case "GET":
          if (options?.paginate || options?.allPages) {
            return handlePagination(url, options);
          }
          return httpClient.get(url, {
            headers: defaultHeaders
          });
        case "POST":
          return httpClient.post(url, data, {
            headers: defaultHeaders
          });
        case "PUT":
          return httpClient.put(url, data, {
            headers: defaultHeaders
          });
        case "PATCH":
          return httpClient.put(url, data, {
            headers: defaultHeaders
          });
        case "DELETE":
          return httpClient.delete(url, data, {
            headers: defaultHeaders
          });
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    };
    if (cache && method === "GET") {
      const cacheKey = `${path}:${JSON.stringify(params || {})}`;
      const memoizedFn = memoize(requestFn, () => cacheKey, options?.cacheTTL ?? config.cacheTTL ?? 300000);
      return memoizedFn();
    }
    return requestFn();
  }
  async function handlePagination(url, options) {
    const response = await httpClient.get(url, {
      headers: defaultHeaders
    });
    if (options?.allPages && response.next) {
      const allData = [...response.items];
      let nextUrl = response.next;
      while (nextUrl) {
        const nextResponse = await httpClient.get(nextUrl, {
          headers: defaultHeaders
        });
        allData.push(...nextResponse.items);
        nextUrl = nextResponse.next;
      }
      return allData;
    }
    return response.items;
  }
  async function* streamPages(options) {
    const path = buildPath();
    const {
      params
    } = options || {};
    let url = `${config.baseUrl || "https://api.spotify.com/v1"}${path}`;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, String(value));
      }
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }
    let response = await httpClient.get(url, {
      headers: defaultHeaders
    });
    yield* response.items;
    while (response.next) {
      response = await httpClient.get(response.next, {
        headers: defaultHeaders
      });
      yield* response.items;
    }
  }
  return new Proxy({}, {
    get(target, prop) {
      if (prop === "get") {
        return options => executeRequest("GET", undefined, options);
      }
      if (prop === "post") {
        return (data, options) => executeRequest("POST", data, options);
      }
      if (prop === "put") {
        return (data, options) => executeRequest("PUT", data, options);
      }
      if (prop === "patch") {
        return (data, options) => executeRequest("PATCH", data, options);
      }
      if (prop === "delete") {
        return (data, options) => executeRequest("DELETE", data, options);
      }
      if (prop === "paginate") {
        return options => executeRequest("GET", undefined, {
          ...options,
          paginate: true
        });
      }
      if (prop === "stream") {
        return options => streamPages(options);
      }
      if (prop === "path") {
        return () => buildPath();
      }
      return createChainableClient(config, [...pathSegments, String(prop)]);
    }
  });
}
function createSpotifyClient(config = {}) {
  return createChainableClient(config);
}