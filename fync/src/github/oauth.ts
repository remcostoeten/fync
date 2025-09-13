import { createFyncApi } from "../core/api-factory";
import type {
	GitHubOAuthConfig,
	GitHubOAuthState,
	GitHubAuthorizationParams,
	GitHubTokenRequest,
	GitHubTokenResponse,
	GitHubUserInfo,
	GitHubEmailInfo,
	GitHubOAuthError,
	GitHubRefreshTokenRequest,
	GitHubRevokeTokenRequest,
	GitHubScope,
} from "./types/github-oauth";

const GITHUB_OAUTH_BASE_URL = "https://github.com";
const GITHUB_API_BASE_URL = "https://api.github.com";

/**
 * GitHub OAuth2 Authentication Client
 * 
 * Provides a chainable API for GitHub OAuth2 authentication flow.
 * Supports both standard OAuth2 and PKCE (Proof Key for Code Exchange) flows.
 * 
 * @example
 * ```typescript
 * const githubAuth = GitHubOAuth({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   redirectUri: 'http://localhost:3000/auth/github/callback'
 * });
 * 
 * // Generate authorization URL
 * const authUrl = githubAuth.getAuthorizationUrl({
 *   scope: ['user:email', 'repo'],
 *   state: 'random-state-string'
 * });
 * 
 * // Exchange code for token
 * const tokens = await githubAuth.exchangeCodeForToken(code, state);
 * 
 * // Get user information
 * const user = await githubAuth.withToken(tokens.access_token).getUser();
 * ```
 */
export class GitHubOAuth {
	private config: GitHubOAuthConfig;
	private token?: string;

	constructor(config: GitHubOAuthConfig) {
		this.config = config;
	}

	/**
	 * Set the access token for authenticated requests
	 */
	withToken(token: string): GitHubOAuth {
		const instance = new GitHubOAuth(this.config);
		instance.token = token;
		return instance;
	}

	/**
	 * Generate PKCE code verifier and challenge
	 */
	generatePKCE(): { codeVerifier: string; codeChallenge: string } {
		// Generate a random 43-128 character string for code_verifier
		const array = new Uint8Array(32);
		if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
			crypto.getRandomValues(array);
		} else {
			// Fallback for Node.js environments
			const cryptoNode = require('crypto');
			const bytes = cryptoNode.randomBytes(32);
			for (let i = 0; i < 32; i++) {
				array[i] = bytes[i];
			}
		}
		
		const codeVerifier = btoa(String.fromCharCode(...array))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');

		// Create code_challenge using SHA256
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		
		let codeChallenge: string;
		if (typeof crypto !== 'undefined' && crypto.subtle) {
			// Browser environment
			crypto.subtle.digest('SHA-256', data).then(hash => {
				const hashArray = new Uint8Array(hash);
				codeChallenge = btoa(String.fromCharCode(...hashArray))
					.replace(/\+/g, '-')
					.replace(/\//g, '_')
					.replace(/=/g, '');
			});
		} else {
			// Node.js environment
			const cryptoNode = require('crypto');
			const hash = cryptoNode.createHash('sha256').update(codeVerifier).digest();
			codeChallenge = hash.toString('base64url');
		}

		return { codeVerifier, codeChallenge: codeChallenge! };
	}

	/**
	 * Generate the OAuth2 authorization URL
	 * 
	 * @param options Configuration options for the authorization request
	 * @param options.scope Array of scopes to request
	 * @param options.state Random state parameter for CSRF protection
	 * @param options.allowSignup Whether to allow new user signups
	 * @param options.login Suggested username for login
	 * @param options.pkce Whether to use PKCE flow (returns code_verifier if true)
	 */
	getAuthorizationUrl(options: {
		scope?: GitHubScope[];
		state?: string;
		allowSignup?: boolean;
		login?: string;
		pkce?: boolean;
	} = {}): { url: string; codeVerifier?: string } {
		const params: GitHubAuthorizationParams = {
			client_id: this.config.clientId,
			redirect_uri: this.config.redirectUri,
		};

		if (options.scope && options.scope.length > 0) {
			params.scope = options.scope.join(' ');
		} else if (this.config.scope && this.config.scope.length > 0) {
			params.scope = this.config.scope.join(' ');
		}

		if (options.state) {
			params.state = options.state;
		}

		if (options.allowSignup !== undefined) {
			params.allow_signup = options.allowSignup;
		}

		if (options.login) {
			params.login = options.login;
		}

		let codeVerifier: string | undefined;
		if (options.pkce) {
			const pkce = this.generatePKCE();
			params.code_challenge = pkce.codeChallenge;
			params.code_challenge_method = 'S256';
			codeVerifier = pkce.codeVerifier;
		}

		const url = new URL('/login/oauth/authorize', GITHUB_OAUTH_BASE_URL);
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
	 * @param code Authorization code received from GitHub
	 * @param state State parameter (should match the one sent in authorization request)
	 * @param codeVerifier Code verifier for PKCE flow
	 */
	async exchangeCodeForToken(
		code: string,
		state?: string,
		codeVerifier?: string
	): Promise<GitHubTokenResponse> {
		const api = createFyncApi({
			baseUrl: GITHUB_OAUTH_BASE_URL,
		});

		const body: GitHubTokenRequest = {
			client_id: this.config.clientId,
			client_secret: this.config.clientSecret,
			code,
			redirect_uri: this.config.redirectUri,
		};

		if (state) {
			body.state = state;
		}

		if (codeVerifier) {
			body.code_verifier = codeVerifier;
		}

		try {
			const response = await api.post<GitHubTokenResponse>(
				'/login/oauth/access_token',
				body,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
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
	 * Refresh an existing access token (if refresh tokens are supported)
	 */
	async refreshToken(refreshToken: string): Promise<GitHubTokenResponse> {
		const api = createFyncApi({
			baseUrl: GITHUB_OAUTH_BASE_URL,
		});

		const body: GitHubRefreshTokenRequest = {
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
			client_id: this.config.clientId,
			client_secret: this.config.clientSecret,
		};

		try {
			const response = await api.post<GitHubTokenResponse>(
				'/login/oauth/access_token',
				body,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
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
	 * Revoke an access token
	 */
	async revokeToken(accessToken?: string): Promise<void> {
		const tokenToRevoke = accessToken || this.token;
		if (!tokenToRevoke) {
			throw new Error('No access token provided');
		}

		const api = createFyncApi({
			baseUrl: GITHUB_OAUTH_BASE_URL,
		});

		const body: GitHubRevokeTokenRequest = {
			access_token: tokenToRevoke,
			client_id: this.config.clientId,
			client_secret: this.config.clientSecret,
		};

		try {
			await api.post('/applications/revoke', body, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
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
	 * Get authenticated user information
	 */
	async getUser(): Promise<GitHubUserInfo> {
		if (!this.token) {
			throw new Error('Access token required. Use withToken() method first.');
		}

		const api = createFyncApi({
			baseUrl: GITHUB_API_BASE_URL,
			auth: { type: 'bearer', token: this.token },
		});

		try {
			const user = await api.get<GitHubUserInfo>('/user');
			return user;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get user info: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get authenticated user's email addresses
	 */
	async getUserEmails(): Promise<GitHubEmailInfo[]> {
		if (!this.token) {
			throw new Error('Access token required. Use withToken() method first.');
		}

		const api = createFyncApi({
			baseUrl: GITHUB_API_BASE_URL,
			auth: { type: 'bearer', token: this.token },
		});

		try {
			const emails = await api.get<GitHubEmailInfo[]>('/user/emails');
			return emails;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get user emails: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Get authenticated user's primary email
	 */
	async getPrimaryEmail(): Promise<string | null> {
		const emails = await this.getUserEmails();
		const primaryEmail = emails.find(email => email.primary);
		return primaryEmail?.email || null;
	}

	/**
	 * Check if the current token is valid
	 */
	async validateToken(): Promise<boolean> {
		if (!this.token) {
			return false;
		}

		try {
			await this.getUser();
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Get the scopes associated with the current token
	 */
	async getTokenScopes(): Promise<string[]> {
		if (!this.token) {
			throw new Error('Access token required. Use withToken() method first.');
		}

		const api = createFyncApi({
			baseUrl: GITHUB_API_BASE_URL,
			auth: { type: 'bearer', token: this.token },
		});

		try {
			const response = await fetch(`${GITHUB_API_BASE_URL}/user`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});

			const scopes = response.headers.get('X-OAuth-Scopes');
			return scopes ? scopes.split(', ').map(s => s.trim()) : [];
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Failed to get token scopes: ${error.message}`);
			}
			throw error;
		}
	}

	/**
	 * Create a complete user profile with user info and emails
	 */
	async getCompleteProfile(): Promise<{
		user: GitHubUserInfo;
		emails: GitHubEmailInfo[];
		primaryEmail: string | null;
		scopes: string[];
	}> {
		const [user, emails, scopes] = await Promise.all([
			this.getUser(),
			this.getUserEmails().catch(() => []), // Email scope might not be granted
			this.getTokenScopes(),
		]);

		const primaryEmail = emails.find(email => email.primary)?.email || null;

		return {
			user,
			emails,
			primaryEmail,
			scopes,
		};
	}
}

/**
 * Factory function to create a GitHub OAuth instance
 * 
 * @param config OAuth configuration
 * @returns GitHubOAuth instance
 */
export function createGitHubOAuth(config: GitHubOAuthConfig): GitHubOAuth {
	return new GitHubOAuth(config);
}

// Export types for external use
export type {
	GitHubOAuthConfig,
	GitHubOAuthState,
	GitHubAuthorizationParams,
	GitHubTokenRequest,
	GitHubTokenResponse,
	GitHubUserInfo,
	GitHubEmailInfo,
	GitHubOAuthError,
	GitHubRefreshTokenRequest,
	GitHubRevokeTokenRequest,
	GitHubScope,
};
