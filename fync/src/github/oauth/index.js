// Core OAuth2 functionality
export { createOAuth2Flow } from "./core/flow";
// Framework helpers
export {
	createNextJSAPIHandler,
	createNextJSOAuth2Handler,
} from "./frameworks/nextjs";
// GitHub provider
export {
	GITHUB_OAUTH2_PROVIDER,
	GITHUB_OAUTH2_SCOPES,
	getCommonScopeGroups,
	validateGitHubScopes,
} from "./providers/github";
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
export function createGitHubOAuth2Flow(config) {
	const { createOAuth2Flow } = require("./core/flow");
	const { GITHUB_OAUTH2_PROVIDER } = require("./providers/github");
	return createOAuth2Flow(config, GITHUB_OAUTH2_PROVIDER);
}
//# sourceMappingURL=index.js.map
