type THttpRequestOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	headers?: Record<string, string>;
	body?: unknown;
};

type THttpResponse<T = unknown> = {
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
};

type TPaginatedResponse<T = unknown> = {
	data: T[];
	hasNext: boolean;
	nextUrl?: string;
	totalCount?: number;
};

function parseLinkHeader(linkHeader: string): Record<string, string> {
	const links: Record<string, string> = {};
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

function createAuthHeaders(): Record<string, string> {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "github-api-service",
	};

	if (process.env.GITHUB_TOKEN) {
		headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
	}

	return headers;
}

async function httpRequest<T = unknown>(
	url: string,
	query?: Record<string, string | number>,
	signal?: AbortSignal,
): Promise<THttpResponse<T>> {
	const searchParams = new URLSearchParams();

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			searchParams.append(key, String(value));
		}
	}

	const fullUrl = searchParams.toString()
		? `${url}?${searchParams.toString()}`
		: url;

	const response = await fetch(fullUrl, {
		method: "GET",
		headers: createAuthHeaders(),
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

function isArrayLike<T>(value: T | T[]): value is T[] {
	return (
		typeof value === "object" &&
		value !== null &&
		"length" in value &&
		typeof (value as unknown as { length: unknown }).length === "number"
	);
}

async function httpRequestWithPagination<T = unknown>(
	url: string,
	query?: Record<string, string | number>,
	signal?: AbortSignal,
): Promise<TPaginatedResponse<T>> {
	const searchParams = new URLSearchParams();

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			searchParams.append(key, String(value));
		}
	}

	const fullUrl = searchParams.toString()
		? `${url}?${searchParams.toString()}`
		: url;

	const response = await fetch(fullUrl, {
		method: "GET",
		headers: createAuthHeaders(),
		signal,
	});

	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	const linkHeader = response.headers.get("link");

	let hasNext = false;
	let nextUrl: string | undefined;

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

type THttpClientConfig = {
	baseUrl?: string;
	defaultHeaders?: Record<string, string>;
	timeout?: number;
};

function createHttpClient(config: THttpClientConfig = {}) {
	const {
		baseUrl = "https://api.github.com",
		defaultHeaders = {},
		timeout = 10000,
	} = config;
	const _defaultHeaders = defaultHeaders;
	const _timeout = timeout;

	return {
		get: async <T = unknown>(
			endpoint: string,
			query?: Record<string, string | number>,
			signal?: AbortSignal,
		): Promise<THttpResponse<T>> => {
			const url = endpoint.startsWith("http") ? endpoint : baseUrl + endpoint;
			return httpRequest<T>(url, query, signal);
		},
		getPaginated: async <T = unknown>(
			endpoint: string,
			query?: Record<string, string | number>,
			signal?: AbortSignal,
		): Promise<TPaginatedResponse<T>> => {
			const url = endpoint.startsWith("http") ? endpoint : baseUrl + endpoint;
			return httpRequestWithPagination<T>(url, query, signal);
		},
	};
}

export { httpRequest, httpRequestWithPagination, createHttpClient };
export type {
	THttpResponse,
	TPaginatedResponse,
	THttpRequestOptions,
	THttpClientConfig,
};
