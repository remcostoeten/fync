import type { TGoogleDriveAuth, TGoogleDriveTokenResponse, TGoogleDriveScope } from "../auth";
import { refreshAccessToken, shouldRefreshToken } from "../auth";
import type { TGoogleDriveConfig } from "../types/google-drive-common";

type TGoogleDriveClientConfig = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	accessToken?: string;
	refreshToken?: string;
	apiKey?: string;
	scopes?: TGoogleDriveScope[];
	baseUrl?: string;
	timeout?: number;
	maxRetries?: number;
	retryDelay?: number;
	onTokenRefresh?: (tokens: TGoogleDriveTokenResponse) => void | Promise<void>;
};

type TRequestOptions = {
	params?: Record<string, string | number | boolean | undefined>;
	body?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
	skipAuth?: boolean;
	retries?: number;
};

type THttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type TChainableClient = any & {
	get<T = unknown>(options?: TRequestOptions): Promise<T>;
	post<T = unknown>(body?: unknown, options?: TRequestOptions): Promise<T>;
	put<T = unknown>(body?: unknown, options?: TRequestOptions): Promise<T>;
	patch<T = unknown>(body?: unknown, options?: TRequestOptions): Promise<T>;
	delete<T = unknown>(options?: TRequestOptions): Promise<T>;
	path(): string;
	setAccessToken(token: string): void;
	setRefreshToken(token: string): void;
	setTokens(tokens: TGoogleDriveTokenResponse): void;
	getAccessToken(): string | undefined;
	isAuthenticated(): boolean;
};

type TInternalAuth = {
	accessToken?: string;
	refreshToken?: string;
	tokenResponse?: TGoogleDriveTokenResponse;
};

const GOOGLE_DRIVE_API_BASE_URL = "https://www.googleapis.com/drive/v3";
const GOOGLE_DRIVE_UPLOAD_BASE_URL = "https://www.googleapis.com/upload/drive/v3";

/**
 * Creates a Google Drive client with chainable API
 */
function createGoogleDriveClient(config: TGoogleDriveClientConfig): TChainableClient {
	const baseUrl = config.baseUrl || GOOGLE_DRIVE_API_BASE_URL;
	const timeout = config.timeout || 30000;
	const maxRetries = config.maxRetries || 3;
	const retryDelay = config.retryDelay || 1000;

	// Internal auth state
	const auth: TInternalAuth = {
		accessToken: config.accessToken,
		refreshToken: config.refreshToken,
	};

	/**
	 * Refreshes the access token if needed
	 */
	async function ensureValidToken(): Promise<string> {
		if (!auth.accessToken && !auth.refreshToken) {
			throw new Error("No access token or refresh token available");
		}

		// Check if we should refresh the token
		if (auth.refreshToken && auth.tokenResponse && shouldRefreshToken(auth.tokenResponse)) {
			const authConfig: TGoogleDriveAuth = {
				config: {
					clientId: config.clientId,
					clientSecret: config.clientSecret,
					redirectUri: config.redirectUri,
					scopes: config.scopes,
				},
				tokens: auth.tokenResponse,
			};

			try {
				const newTokens = await refreshAccessToken(authConfig, auth.refreshToken);
				auth.accessToken = newTokens.access_token;
				auth.tokenResponse = newTokens;

				// Call the token refresh callback if provided
				if (config.onTokenRefresh) {
					await config.onTokenRefresh(newTokens);
				}
			} catch (error) {
				throw new Error(`Failed to refresh token: ${error}`);
			}
		}

		if (!auth.accessToken) {
			throw new Error("No valid access token available");
		}

		return auth.accessToken;
	}

	/**
	 * Handles HTTP requests with automatic retry and token refresh
	 */
	async function handleRequest<T>(
		method: THttpMethod,
		path: string,
		options?: TRequestOptions,
	): Promise<T> {
		const url = new URL(path, baseUrl);
		
		// Add query parameters if provided
		if (options?.params) {
			for (const [key, value] of Object.entries(options.params)) {
				if (value !== undefined) {
					url.searchParams.append(key, String(value));
				}
			}
		}

		// Prepare headers
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...options?.headers,
		};

		// Add authorization header unless explicitly skipped
		if (!options?.skipAuth) {
			const token = await ensureValidToken();
			headers.Authorization = `Bearer ${token}`;
		} else if (config.apiKey) {
			url.searchParams.append("key", config.apiKey);
		}

		// Prepare request options
		const requestInit: RequestInit = {
			method,
			headers,
			signal: options?.signal || AbortSignal.timeout(timeout),
		};

		// Add body for methods that support it
		if (method !== "GET" && method !== "DELETE" && options?.body !== undefined) {
			requestInit.body = typeof options.body === "string" 
				? options.body 
				: JSON.stringify(options.body);
		}

		// Execute request with retry logic
		let lastError: Error | undefined;
		const retries = options?.retries ?? maxRetries;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const response = await fetch(url.toString(), requestInit);

				// Handle 401 Unauthorized - try to refresh token
				if (response.status === 401 && auth.refreshToken && attempt < retries) {
					auth.tokenResponse = undefined; // Force token refresh
					await ensureValidToken();
					// Update the authorization header and retry
					headers.Authorization = `Bearer ${auth.accessToken}`;
					continue;
				}

				// Handle rate limiting with exponential backoff
				if (response.status === 429 && attempt < retries) {
					const retryAfter = response.headers.get("Retry-After");
					const delay = retryAfter 
						? parseInt(retryAfter) * 1000 
						: retryDelay * Math.pow(2, attempt);
					await new Promise(resolve => setTimeout(resolve, delay));
					continue;
				}

				// Handle other non-successful responses
				if (!response.ok) {
					const errorBody = await response.text();
					let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
					
					try {
						const errorJson = JSON.parse(errorBody);
						if (errorJson.error?.message) {
							errorMessage = errorJson.error.message;
						}
					} catch {
						// Use text error if not JSON
						if (errorBody) {
							errorMessage = errorBody;
						}
					}

					throw new Error(errorMessage);
				}

				// Parse response
				if (response.status === 204) {
					return undefined as T;
				}

				const contentType = response.headers.get("content-type");
				if (contentType?.includes("application/json")) {
					return await response.json() as T;
				}

				return await response.text() as T;

			} catch (error) {
				lastError = error as Error;

				// Don't retry on client errors (except 429) or if this is the last attempt
				if (attempt === retries) {
					break;
				}

				// Add delay before retry
				await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
			}
		}

		throw lastError || new Error("Request failed after all retries");
	}

	/**
	 * Creates a chainable proxy client
	 */
	function createChainableProxy(pathSegments: string[] = []): TChainableClient {
		function buildPath(): string {
			return pathSegments.length > 0 ? `/${pathSegments.join("/")}` : "";
		}

		return new Proxy({} as TChainableClient, {
			get(target, prop: string | symbol) {
				// Handle HTTP method calls
				if (prop === "get") {
					return function <T = unknown>(options?: TRequestOptions): Promise<T> {
						return handleRequest<T>("GET", buildPath(), options);
					};
				}

				if (prop === "post") {
					return function <T = unknown>(body?: unknown, options?: TRequestOptions): Promise<T> {
						return handleRequest<T>("POST", buildPath(), { ...options, body });
					};
				}

				if (prop === "put") {
					return function <T = unknown>(body?: unknown, options?: TRequestOptions): Promise<T> {
						return handleRequest<T>("PUT", buildPath(), { ...options, body });
					};
				}

				if (prop === "patch") {
					return function <T = unknown>(body?: unknown, options?: TRequestOptions): Promise<T> {
						return handleRequest<T>("PATCH", buildPath(), { ...options, body });
					};
				}

				if (prop === "delete") {
					return function <T = unknown>(options?: TRequestOptions): Promise<T> {
						return handleRequest<T>("DELETE", buildPath(), options);
					};
				}

				// Handle path getter
				if (prop === "path") {
					return buildPath;
				}

				// Handle array index access (for IDs with special characters)
				if (typeof prop === "symbol") {
					return undefined;
				}

				// Create a new chainable client with the additional path segment
				return createChainableProxy([...pathSegments, String(prop)]);
			},

			// Handle array bracket notation for dynamic segments
			has(target, prop) {
				return true;
			},
		});
	}

	// Create and return the root chainable client
	const client = createChainableProxy();

	// Add helper methods for common operations
	const enhancedClient = Object.assign(client, {
		/**
		 * Updates the access token
		 */
		setAccessToken(token: string): void {
			auth.accessToken = token;
		},

		/**
		 * Updates the refresh token
		 */
		setRefreshToken(token: string): void {
			auth.refreshToken = token;
		},

		/**
		 * Sets both tokens from a token response
		 */
		setTokens(tokens: TGoogleDriveTokenResponse): void {
			auth.accessToken = tokens.access_token;
			auth.refreshToken = tokens.refresh_token;
			auth.tokenResponse = tokens;
		},

		/**
		 * Gets the current access token
		 */
		getAccessToken(): string | undefined {
			return auth.accessToken;
		},

		/**
		 * Checks if client has valid authentication
		 */
		isAuthenticated(): boolean {
			return !!(auth.accessToken || auth.refreshToken);
		},
	});

	return enhancedClient;
}

export { createGoogleDriveClient };
export type { 
	TGoogleDriveClientConfig, 
	TChainableClient, 
	TRequestOptions,
	THttpMethod
};
