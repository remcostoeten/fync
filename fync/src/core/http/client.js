function createFetchAdapter() {
	if (typeof fetch !== "undefined") {
		return fetch;
	}
	try {
		const { fetch: undici } = require("undici");
		return undici;
	} catch {
		try {
			const nodeFetch = require("node-fetch");
			return nodeFetch.default || nodeFetch;
		} catch {
			throw new Error(
				"No fetch implementation available. Please install undici or node-fetch.",
			);
		}
	}
}
export function createHttpClient(config = {}) {
	const fetchImpl = createFetchAdapter();
	async function request(url, requestConfig = {}) {
		const fullUrl = config.baseURL
			? new URL(url, config.baseURL).toString()
			: url;
		const controller = new AbortController();
		let timeoutId;
		if (config.timeout || requestConfig.timeout) {
			const timeout = requestConfig.timeout || config.timeout || 5000;
			timeoutId = setTimeout(() => controller.abort(), timeout);
		}
		const headers = {
			"Content-Type": "application/json",
			...config.headers,
			...requestConfig.headers,
		};
		const fetchConfig = {
			method: requestConfig.method || "GET",
			headers,
			body: requestConfig.body,
			signal: requestConfig.signal || controller.signal,
		};
		try {
			const response = await fetchImpl(fullUrl, fetchConfig);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			const responseHeaders = {};
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value;
			});
			let data;
			const contentType = response.headers.get("content-type");
			if (contentType?.includes("application/json")) {
				data = await response.json();
			} else {
				data = await response.text();
			}
			return {
				data,
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders,
				ok: response.ok,
			};
		} catch (error) {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			const httpError = {
				message: error instanceof Error ? error.message : "Unknown error",
				code: error instanceof Error ? error.name : "UNKNOWN_ERROR",
			};
			throw httpError;
		}
	}
	async function get(url, config) {
		return request(url, { ...config, method: "GET" });
	}
	async function post(url, data, config) {
		return request(url, {
			...config,
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}
	async function put(url, data, config) {
		return request(url, {
			...config,
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		});
	}
	async function patch(url, data, config) {
		return request(url, {
			...config,
			method: "PATCH",
			body: data ? JSON.stringify(data) : undefined,
		});
	}
	async function del(url, config) {
		return request(url, { ...config, method: "DELETE" });
	}
	return {
		request,
		get,
		post,
		put,
		patch,
		delete: del,
	};
}
//# sourceMappingURL=client.js.map
