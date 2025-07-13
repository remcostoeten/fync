function parseLinkHeader(linkHeader) {
	const links = {};
	const parts = linkHeader.split(",");
	for (const part of parts) {
		const section = part.split(";");
		if (section.length !== 2) continue;
		const url = section[0].replace(/<(.*)>/, "$1").trim();
		const name = section[1].replace(/rel="(.*)"/, "$1").trim();
		links[name] = url;
	}
	return links;
}
function createAuthHeaders() {
	const headers = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "github-api-service",
	};
	if (process.env.GITHUB_TOKEN) {
		headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
	}
	return headers;
}
async function httpRequest(url, query, signal, extraHeaders) {
	const searchParams = new URLSearchParams();
	if (query) {
		for (const [key, value] of Object.entries(query)) {
			searchParams.append(key, String(value));
		}
	}
	const fullUrl = searchParams.toString()
		? `${url}?${searchParams.toString()}`
		: url;
	const headers = { ...createAuthHeaders(), ...extraHeaders };
	const response = await fetch(fullUrl, {
		method: "GET",
		headers,
		signal,
	});
	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
	}
	const data = await response.json();
	return {
		data,
		status: response.status,
		statusText: response.statusText,
		headers: Object.fromEntries(response.headers.entries()),
	};
}
function isArrayLike(value) {
	return (
		typeof value === "object" &&
		value !== null &&
		"length" in value &&
		typeof value.length === "number"
	);
}
async function httpRequestWithPagination(url, query, signal, extraHeaders) {
	const searchParams = new URLSearchParams();
	if (query) {
		for (const [key, value] of Object.entries(query)) {
			searchParams.append(key, String(value));
		}
	}
	const fullUrl = searchParams.toString()
		? `${url}?${searchParams.toString()}`
		: url;
	const headers = { ...createAuthHeaders(), ...extraHeaders };
	const response = await fetch(fullUrl, {
		method: "GET",
		headers,
		signal,
	});
	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
	}
	const data = await response.json();
	const linkHeader = response.headers.get("link");
	let hasNext = false;
	let nextUrl;
	if (linkHeader) {
		const links = parseLinkHeader(linkHeader);
		hasNext = Boolean(links.next);
		nextUrl = links.next;
	}
	return {
		data: isArrayLike(data) ? data : [data],
		hasNext,
		nextUrl,
		totalCount: (() => {
			const totalCountHeader = response.headers.get("x-total-count");
			return totalCountHeader ? parseInt(totalCountHeader, 10) : undefined;
		})(),
	};
}
function createHttpClient(config = {}) {
	const {
		baseUrl = "https://api.github.com",
		defaultHeaders = {},
		timeout = 10000,
	} = config;
	const _defaultHeaders = defaultHeaders;
	const _timeout = timeout;
	return {
		get: async (endpoint, query, signal) => {
			const url = endpoint.startsWith("http") ? endpoint : baseUrl + endpoint;
			return httpRequest(url, query, signal, _defaultHeaders);
		},
		getPaginated: async (endpoint, query, signal) => {
			const url = endpoint.startsWith("http") ? endpoint : baseUrl + endpoint;
			return httpRequestWithPagination(url, query, signal, _defaultHeaders);
		},
	};
}
export { httpRequest, httpRequestWithPagination, createHttpClient };
//# sourceMappingURL=http-client.js.map
