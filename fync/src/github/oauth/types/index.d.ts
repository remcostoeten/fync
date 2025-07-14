type TOAuth2Config = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	scopes?: readonly string[];
	baseUrl?: string;
	userAgent?: string;
};
type TOAuth2State = {
	value: string;
	codeVerifier?: string;
	metadata?: Record<string, unknown>;
};
type TOAuth2TokenResponse = {
	access_token: string;
	token_type: string;
	scope: string;
	refresh_token?: string;
	expires_in?: number;
	created_at?: number;
};
type TOAuth2RefreshResponse = {
	access_token: string;
	refresh_token?: string;
	expires_in?: number;
	token_type: string;
	scope: string;
};
type TOAuth2Error = {
	error: string;
	error_description?: string;
	error_uri?: string;
};
type TOAuth2AuthorizationUrlOptions = {
	state?: string;
	scopes?: readonly string[];
	allowSignup?: boolean;
	login?: string;
	redirectUri?: string;
};
type TOAuth2TokenOptions = {
	code: string;
	state?: string;
	redirectUri?: string;
};
type TOAuth2RefreshOptions = {
	refreshToken: string;
	scopes?: readonly string[];
};
type TOAuth2RevokeOptions = {
	token: string;
	tokenTypeHint?: "access_token" | "refresh_token";
};
type TOAuth2Flow = {
	generateState(metadata?: Record<string, unknown>): TOAuth2State;
	getAuthorizationUrl(options: TOAuth2AuthorizationUrlOptions): string;
	exchangeCodeForToken(
		options: TOAuth2TokenOptions,
	): Promise<TOAuth2TokenResponse>;
	refreshAccessToken(
		options: TOAuth2RefreshOptions,
	): Promise<TOAuth2RefreshResponse>;
	revokeToken(options: TOAuth2RevokeOptions): Promise<void>;
	validateState(receivedState: string, expectedState: string): boolean;
};
type TOAuth2Storage = {
	store(key: string, value: string, expiresIn?: number): Promise<void>;
	retrieve(key: string): Promise<string | null>;
	remove(key: string): Promise<void>;
	clear(): Promise<void>;
};
type TOAuth2SessionManager = {
	createSession(
		tokens: TOAuth2TokenResponse,
		userInfo?: unknown,
	): Promise<string>;
	getSession(sessionId: string): Promise<{
		tokens: TOAuth2TokenResponse;
		userInfo?: unknown;
		expiresAt: number;
	} | null>;
	updateSession(sessionId: string, tokens: TOAuth2TokenResponse): Promise<void>;
	destroySession(sessionId: string): Promise<void>;
	isSessionValid(sessionId: string): Promise<boolean>;
};
type TOAuth2Provider = {
	name: string;
	authorizationUrl: string;
	tokenUrl: string;
	revokeUrl?: string;
	userInfoUrl?: string;
	defaultScopes: readonly string[];
	scopeSeparator: string;
};
export type {
	TOAuth2Config,
	TOAuth2State,
	TOAuth2TokenResponse,
	TOAuth2RefreshResponse,
	TOAuth2Error,
	TOAuth2AuthorizationUrlOptions,
	TOAuth2TokenOptions,
	TOAuth2RefreshOptions,
	TOAuth2RevokeOptions,
	TOAuth2Flow,
	TOAuth2Storage,
	TOAuth2SessionManager,
	TOAuth2Provider,
};
//# sourceMappingURL=index.d.ts.map
