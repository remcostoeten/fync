// Core OAuth2 functionality
export { createOAuth2Flow } from "./core/flow";
export type {
	TNextJSOAuth2Config,
	TNextJSOAuth2Handler,
} from "./frameworks/nextjs";
// Framework helpers
export {
	createNextJSAPIHandler,
	createNextJSOAuth2Handler,
} from "./frameworks/nextjs";
export type { TGitHubOAuth2Scope } from "./providers/github";
// GitHub provider
export {
	GITHUB_OAUTH2_PROVIDER,
	GITHUB_OAUTH2_SCOPES,
	getCommonScopeGroups,
	validateGitHubScopes,
} from "./providers/github";
// OAuth2 types
export type {
	TOAuth2AuthorizationUrlOptions,
	TOAuth2Config,
	TOAuth2Error,
	TOAuth2Flow,
	TOAuth2Provider,
	TOAuth2RefreshOptions,
	TOAuth2RefreshResponse,
	TOAuth2RevokeOptions,
	TOAuth2SessionManager,
	TOAuth2State,
	TOAuth2Storage,
	TOAuth2TokenOptions,
	TOAuth2TokenResponse,
} from "./types";

// Utility functions
export {
	buildUrlWithParams,
	createErrorFromResponse,
	decodeState,
	encodeState,
	generateCodeChallenge,
	generateCodeVerifier,
	generateRandomString,
	isTokenExpired,
	parseTokenResponse,
	sanitizeScopes,
	shouldRefreshToken,
	validateRequiredParams,
} from "./utils";

// Convenience function for GitHub OAuth2
import type { TOAuth2Config } from "./types";
export function createGitHubOAuth2Flow(config: TOAuth2Config) {
	const { createOAuth2Flow } = require("./core/flow");
	const { GITHUB_OAUTH2_PROVIDER } = require("./providers/github");
	return createOAuth2Flow(config, GITHUB_OAUTH2_PROVIDER);
}
