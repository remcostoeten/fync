import { createHash, randomBytes } from "crypto";

function generateRandomString(length: number = 32): string {
	return randomBytes(length).toString("hex");
}

function generateCodeVerifier(): string {
	return generateRandomString(32);
}

function generateCodeChallenge(codeVerifier: string): string {
	return createHash("sha256").update(codeVerifier).digest("base64url");
}

function encodeState(state: Record<string, unknown>): string {
	return Buffer.from(JSON.stringify(state)).toString("base64url");
}

function decodeState(encodedState: string): Record<string, unknown> {
	try {
		const decoded = Buffer.from(encodedState, "base64url").toString("utf-8");
		return JSON.parse(decoded);
	} catch {
		throw new Error("Invalid state parameter");
	}
}

function isTokenExpired(token: {
	expires_in?: number;
	created_at?: number;
}): boolean {
	if (!token.expires_in || !token.created_at) {
		return false;
	}

	const expiresAt = token.created_at + token.expires_in;
	const now = Math.floor(Date.now() / 1000);

	return now >= expiresAt;
}

function shouldRefreshToken(
	token: { expires_in?: number; created_at?: number },
	bufferSeconds: number = 300,
): boolean {
	if (!token.expires_in || !token.created_at) {
		return false;
	}

	const expiresAt = token.created_at + token.expires_in;
	const now = Math.floor(Date.now() / 1000);

	return now >= expiresAt - bufferSeconds;
}

function buildUrlWithParams(
	baseUrl: string,
	params: Record<string, string | undefined>,
): string {
	const url = new URL(baseUrl);

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			url.searchParams.append(key, value);
		}
	}

	return url.toString();
}

function validateRequiredParams(
	params: Record<string, unknown>,
	required: readonly string[],
): void {
	for (const param of required) {
		if (
			params[param] === undefined ||
			params[param] === null ||
			params[param] === ""
		) {
			throw new Error(`Missing required parameter: ${param}`);
		}
	}
}

function sanitizeScopes(
	scopes: readonly string[] | undefined,
	defaultScopes: readonly string[],
): string[] {
	if (!scopes || scopes.length === 0) {
		return [...defaultScopes];
	}

	return [...new Set([...scopes])];
}

function parseTokenResponse(response: unknown): {
	access_token: string;
	token_type: string;
	scope: string;
	refresh_token?: string;
	expires_in?: number;
} {
	if (typeof response !== "object" || response === null) {
		throw new Error("Invalid token response format");
	}

	const tokenResponse = response as Record<string, unknown>;

	validateRequiredParams(tokenResponse, ["access_token", "token_type"]);

	return {
		access_token: tokenResponse.access_token as string,
		token_type: tokenResponse.token_type as string,
		scope: (tokenResponse.scope as string) || "",
		refresh_token: tokenResponse.refresh_token as string | undefined,
		expires_in: tokenResponse.expires_in as number | undefined,
	};
}

function createErrorFromResponse(response: unknown): Error {
	if (typeof response !== "object" || response === null) {
		return new Error("OAuth2 request failed");
	}

	const errorResponse = response as Record<string, unknown>;

	if (errorResponse.error) {
		const error = errorResponse.error as string;
		const description = errorResponse.error_description as string | undefined;
		const uri = errorResponse.error_uri as string | undefined;

		let message = `OAuth2 Error: ${error}`;
		if (description) {
			message += ` - ${description}`;
		}
		if (uri) {
			message += ` (${uri})`;
		}

		return new Error(message);
	}

	return new Error("OAuth2 request failed");
}

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
