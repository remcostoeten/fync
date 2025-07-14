export { createOAuth2Flow } from "./core/flow";
export type {
	TNextJSOAuth2Config,
	TNextJSOAuth2Handler,
} from "./frameworks/nextjs";
export {
	createNextJSAPIHandler,
	createNextJSOAuth2Handler,
} from "./frameworks/nextjs";
export type { TGitHubOAuth2Scope } from "./providers/github";
export {
	GITHUB_OAUTH2_PROVIDER,
	GITHUB_OAUTH2_SCOPES,
	getCommonScopeGroups,
	validateGitHubScopes,
} from "./providers/github";
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
import type { TOAuth2Config } from "./types";
export declare function createGitHubOAuth2Flow(config: TOAuth2Config): any;
//# sourceMappingURL=index.d.ts.map
