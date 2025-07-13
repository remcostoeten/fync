import { memoize } from "./cache-service";
import { createHttpClient } from "./http-client";
function createChainableClient(config, pathSegments = []) {
    const defaultHeaders = {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "github-api-service",
    };
    if (config.token) {
        defaultHeaders.Authorization = `Bearer ${config.token}`;
    }
    const httpClient = createHttpClient({
        baseUrl: config.baseUrl || "https://api.github.com",
        defaultHeaders,
    });
    const buildPath = () => "/" + pathSegments.join("/");
    async function executeRequest(method, data, options) {
        const path = buildPath();
        const { params, cache = config.cache !== false, cacheTTL = config.cacheTTL, } = options || {};
        const _cacheTTL = cacheTTL; // Keep for future use
        const requestFn = async () => {
            switch (method) {
                case "GET":
                    if (options?.paginate || options?.allPages) {
                        const response = await httpClient.getPaginated(path, params);
                        if (options.allPages) {
                            const allData = [...response.data];
                            let nextUrl = response.nextUrl;
                            while (nextUrl) {
                                const nextResponse = await httpClient.getPaginated(nextUrl);
                                allData.push(...nextResponse.data);
                                nextUrl = nextResponse.nextUrl;
                            }
                            return allData;
                        }
                        return response.data;
                    }
                    return (await httpClient.get(path, params)).data;
                case "POST":
                case "PUT":
                case "PATCH":
                case "DELETE":
                    // These would need to be implemented in http-client
                    throw new Error(`${method} not yet implemented in http-client`);
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
    async function* streamPages(options) {
        const path = buildPath();
        const { params } = options || {};
        let response = await httpClient.getPaginated(path, params);
        yield* response.data;
        while (response.nextUrl) {
            response = await httpClient.getPaginated(response.nextUrl);
            yield* response.data;
        }
    }
    return new Proxy({}, {
        get(target, prop) {
            if (prop === "get") {
                return (options) => executeRequest("GET", undefined, options);
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
                return (options) => executeRequest("DELETE", undefined, options);
            }
            if (prop === "paginate") {
                return (options) => executeRequest("GET", undefined, { ...options, paginate: true });
            }
            if (prop === "stream") {
                return (options) => streamPages(options);
            }
            if (prop === "path") {
                return () => buildPath();
            }
            // For any other property, create a new chainable client with the added path segment
            return createChainableClient(config, [...pathSegments, String(prop)]);
        },
    });
}
function createGitHubClient(config = {}) {
    return createChainableClient(config);
}
export { createGitHubClient };
//# sourceMappingURL=github-client.js.map