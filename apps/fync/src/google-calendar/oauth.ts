import { createFyncApi } from "../core/api-factory";
import type {
	GoogleOAuthConfig,
	GoogleOAuthState,
	GoogleAuthorizationParams,
	GoogleTokenRequest,
	GoogleTokenResponse,
	GoogleRefreshTokenRequest,
	GoogleRevokeTokenRequest,
	GoogleUserInfo,
	GoogleOAuthError,
	GoogleTokenInfo,
	GoogleScope,
} from "./types/google-oauth";

const GOOGLE_OAUTH_BASE_URL = "https://accounts.google.com";
const GOOGLE_API_BASE_URL = "https://www.googleapis.com";

/**
 * Google OAuth2 Authentication Client
 * 
 * Provides a chainable API for Google OAuth2 authentication flow.
 * Supports both standard OAuth2 and PKCE (Proof Key for Code Exchange) flows.
 * Works with all Google APIs including Calendar, Drive, Gmail, etc.
 * 
 * @example
 * ```typescript
 * const googleAuth = GoogleOAuth({
 *   clientId: 'your-client-id.googleusercontent.com',
 *   clientSecret: 'your-client-secret',
 *   redirectUri: 'http://localhost:3000/auth/google/callback'
 * });
 * 
 * // Generate authorization URL
 * const authUrl = googleAuth.getAuthorizationUrl({
 *   scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
 *   state: 'random-state-string',
 *   accessType: 'offline' // for refresh tokens
 * });
 * 
 * // Exchange code for token
 * const tokens = await googleAuth.exchangeCodeForToken(code);
 * 
 * // Get user information
 * const user = await googleAuth.withToken(tokens.access_token).getUser();
 * ```
 */
export class GoogleOAuth {
	private config: GoogleOAuthConfig;
	private token?: string;

	constructor(config: GoogleOAuthConfig) {
		this.config = config;
	}

	/**
	 * Set the access token for authenticated requests
	 */
	withToken(token: string): GoogleOAuth {
		const instance = new GoogleOAuth(this.config);
		instance.token = token;
		return instance;
	}

	/**
	 * Generate PKCE code verifier and challenge
	 */
	generatePKCE(): { codeVerifier: string; codeChallenge: string } {
		const nodeCrypto = require('crypto');
		const verifierBytes = nodeCrypto.randomBytes(32);
		const codeVerifier = verifierBytes.toString('base64url');
		const hash = nodeCrypto.createHash('sha256').update(codeVerifier).digest();
		const codeChallenge = hash.toString('base64url');
		return { codeVerifier, codeChallenge };
	}

	/**
	 * Generate the OAuth2 authorization URL
	 * 
	 * @param options Configuration options for the authorization request
	 * @param options.scope Array of scopes to request
	 * @param options.state Random state parameter for CSRF protection
	 * @param options.accessType 'offline' for refresh tokens, 'online' for access tokens only
	 * @param options.includeGrantedScopes Include previously granted scopes
	 * @param options.loginHint Email hint for the login screen
	 * @param options.prompt Control the OAuth flow prompts
	 * @param options.pkce Whether to use PKCE flow (returns code_verifier if true)
	 */
	getAuthorizationUrl(options: {
		scope?: GoogleScope[];
		state?: string;
		accessType?: 'online' | 'offline';
		includeGrantedScopes?: boolean;
		loginHint?: string;
		prompt?: 'none' | 'consent' | 'select_account';
		pkce?: boolean;
	} = {}): { url: string; codeVerifier?: string } {
		const params: GoogleAuthorizationParams = {
			client_id: this.config.clientId,
			redirect_uri: this.config.redirectUri,
			response_type: 'code',
		};

		if (options.scope && options.scope.length > 0) {
			params.scope = options.scope.join(' ');
		} else if (this.config.scope && this.config.scope.length > 0) {
			params.scope = this.config.scope.join(' ');
		} else {
			// Default to basic profile and email scopes
			params.scope = 'openid email profile';
		}

		if (options.state) {
			params.state = options.state;
		}

		if (options.accessType) {
			params.access_type = options.accessType;
		}

		if (options.includeGrantedScopes) {
			params.include_granted_scopes = options.includeGrantedScopes;
		}

		if (options.loginHint) {
			params.login_hint = options.loginHint;
		}

		if (options.prompt) {
			params.prompt = options.prompt;
		}

		let codeVerifier: string | undefined;
		if (options.pkce) {
			const pkce = this.generatePKCE();
			params.code_challenge = pkce.codeChallenge;
			params.code_challenge_method = 'S256';
			codeVerifier = pkce.codeVerifier;
		}

		const url = new URL('/o/oauth2/v2/auth', GOOGLE_OAUTH_BASE_URL);
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				url.searchParams.append(key, String(value));
			}
		});

		return { url: url.toString(), codeVerifier };
	}

	/**
	 * Exchange authorization code for access token
	 * 
	 * @param code Authorization code received from Google
	 * @param codeVerifier Code verifier for PKCE flow
	 */
	async exchangeCodeForToken(
		code: string,
		codeVerifier?: string
	): Promise<GoogleTokenResponse> {
		const api = createFyncApi({
			baseUrl: GOOGLE_OAUTH_BASE_URL,
		});

		const body: GoogleTokenRequest = {
			client_id: this.config.clientId,
			client_secret: this.config.clientSecret,
			code,
			grant_type: 'authorization_code',
			redirect_uri: this.config.redirectUri,
		};

		if (codeVerifier) {
			body.code_verifier = codeVerifier;
		}

		try {
			const response = await api.post<GoogleTokenResponse>(
				'/o/oauth2/token',
				body,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);

			return response;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to exchange code for token: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Refresh an existing access token using a refresh token
	 */
	async refreshToken(refreshToken: string): Promise<GoogleTokenResponse> {
		const api = createFyncApi({
			baseUrl: GOOGLE_OAUTH_BASE_URL,
		});

		const body: GoogleRefreshTokenRequest = {
			client_id: this.config.clientId,
			client_secret: this.config.clientSecret,
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
		};

		try {
			const response = await api.post<GoogleTokenResponse>(
				'/o/oauth2/token',
				body,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);

			return response;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to refresh token: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Revoke an access token or refresh token
	 */
	async revokeToken(token?: string): Promise<void> {
		const tokenToRevoke = token || this.token;
		if (!tokenToRevoke) {
			throw new Error('No token provided');
		}

		const api = createFyncApi({
			baseUrl: GOOGLE_OAUTH_BASE_URL,
		});

		const body: GoogleRevokeTokenRequest = {
			token: tokenToRevoke,
		};

		try {
			await api.post('/o/oauth2/revoke', body, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to revoke token: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get authenticated user information from Google's userinfo endpoint
	 */
	async getUser(): Promise<GoogleUserInfo> {
		if (!this.token) {
			throw new Error('Access token required. Use withToken() method first.');
		}

		const api = createFyncApi({
			baseUrl: GOOGLE_API_BASE_URL,
			auth: { type: 'bearer', token: this.token },
		});

		try {
			const user = await api.get<GoogleUserInfo>('/oauth2/v2/userinfo');
			return user;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get user info: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get information about the current access token
	 */
	async getTokenInfo(): Promise<GoogleTokenInfo> {
		if (!this.token) {
			throw new Error('Access token required. Use withToken() method first.');
		}

		const api = createFyncApi({
			baseUrl: GOOGLE_API_BASE_URL,
		});

		try {
			const tokenInfo = await api.get<GoogleTokenInfo>(
				`/oauth2/v1/tokeninfo?access_token=${this.token}`
			);
			return tokenInfo;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get token info: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Check if the current token is valid
	 */
	async validateToken(): Promise<boolean> {
		if (!this.token) {
			return false;
		}

		try {
			await this.getTokenInfo();
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Get the scopes associated with the current token
	 */
	async getTokenScopes(): Promise<string[]> {
		const tokenInfo = await this.getTokenInfo();
		return tokenInfo.scope.split(' ').filter(scope => scope.length > 0);
	}

	/**
	 * Create a complete user profile with user info and token details
	 */
	async getCompleteProfile(): Promise<{
		user: GoogleUserInfo;
		tokenInfo: GoogleTokenInfo;
		scopes: string[];
	}> {
		const [user, tokenInfo] = await Promise.all([
			this.getUser(),
			this.getTokenInfo(),
		]);

		const scopes = tokenInfo.scope.split(' ').filter(scope => scope.length > 0);

		return {
			user,
			tokenInfo,
			scopes,
		};
	}

	/**
	 * Check if the token has a specific scope
	 */
	async hasScope(scope: string): Promise<boolean> {
		const scopes = await this.getTokenScopes();
		return scopes.includes(scope);
	}

	/**
	 * Check if the token has all the required scopes
	 */
	async hasScopes(requiredScopes: string[]): Promise<boolean> {
		const scopes = await this.getTokenScopes();
		return requiredScopes.every(scope => scopes.includes(scope));
	}

	/**
	 * Get the remaining time until token expiration (in seconds)
	 */
	async getTokenExpirationTime(): Promise<number> {
		const tokenInfo = await this.getTokenInfo();
		const now = Math.floor(Date.now() / 1000);
		return Math.max(0, tokenInfo.exp - now);
	}

	/**
	 * Check if the token is expired or will expire within the given seconds
	 */
	async isTokenExpired(bufferSeconds: number = 300): Promise<boolean> {
		const remainingTime = await this.getTokenExpirationTime();
		return remainingTime <= bufferSeconds;
	}
}

/**
 * Factory function to create a Google OAuth instance
 * 
 * @param config OAuth configuration
 * @returns GoogleOAuth instance
 */
export function createGoogleOAuth(config: GoogleOAuthConfig): GoogleOAuth {
	return new GoogleOAuth(config);
}

/**
 * Functional factory for Google OAuth - preferred pattern
 * 
 * @param config OAuth configuration
 * @returns GoogleOAuth instance
 */
export function googleOAuth(config: GoogleOAuthConfig): GoogleOAuth {
	return new GoogleOAuth(config);
}

// Export types for external use
export type {
	GoogleOAuthConfig,
	GoogleOAuthState,
	GoogleAuthorizationParams,
	GoogleTokenRequest,
	GoogleTokenResponse,
	GoogleRefreshTokenRequest,
	GoogleRevokeTokenRequest,
	GoogleUserInfo,
	GoogleOAuthError,
	GoogleTokenInfo,
	GoogleScope,
};
