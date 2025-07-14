declare function generateRandomString(length?: number): string;
declare function generateCodeVerifier(): string;
declare function generateCodeChallenge(codeVerifier: string): string;
declare function encodeState(state: Record<string, unknown>): string;
declare function decodeState(encodedState: string): Record<string, unknown>;
declare function isTokenExpired(token: {
	expires_in?: number;
	created_at?: number;
}): boolean;
declare function shouldRefreshToken(
	token: {
		expires_in?: number;
		created_at?: number;
	},
	bufferSeconds?: number,
): boolean;
declare function buildUrlWithParams(
	baseUrl: string,
	params: Record<string, string | undefined>,
): string;
declare function validateRequiredParams(
	params: Record<string, unknown>,
	required: readonly string[],
): void;
declare function sanitizeScopes(
	scopes: readonly string[] | undefined,
	defaultScopes: readonly string[],
): string[];
declare function parseTokenResponse(response: unknown): {
	access_token: string;
	token_type: string;
	scope: string;
	refresh_token?: string;
	expires_in?: number;
};
declare function createErrorFromResponse(response: unknown): Error;
export {
	generateRandomString,
	generateCodeVerifier,
	generateCodeChallenge,
	encodeState,
	decodeState,
	isTokenExpired,
	shouldRefreshToken,
	buildUrlWithParams,
	validateRequiredParams,
	sanitizeScopes,
	parseTokenResponse,
	createErrorFromResponse,
};
//# sourceMappingURL=index.d.ts.map
