export interface GitHubOAuthConfig {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	scope?: string[];
}

export interface GitHubOAuthState {
	state?: string;
	codeVerifier?: string; // For PKCE flow
}

export interface GitHubAuthorizationParams {
	client_id: string;
	redirect_uri: string;
	scope?: string;
	state?: string;
	allow_signup?: boolean;
	login?: string;
	// PKCE parameters
	code_challenge?: string;
	code_challenge_method?: 'S256';
}

export interface GitHubTokenRequest {
	client_id: string;
	client_secret: string;
	code: string;
	redirect_uri: string;
	state?: string;
	// PKCE parameter
	code_verifier?: string;
}

export interface GitHubTokenResponse {
	access_token: string;
	token_type: 'bearer';
	scope: string;
	refresh_token?: string;
	expires_in?: number;
	refresh_token_expires_in?: number;
}

export interface GitHubUserInfo {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string | null;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string | null;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitter_username: string | null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
	private_gists?: number;
	total_private_repos?: number;
	owned_private_repos?: number;
	disk_usage?: number;
	collaborators?: number;
	two_factor_authentication?: boolean;
	plan?: {
		name: string;
		space: number;
		private_repos: number;
		collaborators: number;
	};
}

export interface GitHubEmailInfo {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: 'public' | 'private' | null;
}

export interface GitHubOAuthError {
	error: string;
	error_description?: string;
	error_uri?: string;
	state?: string;
}

export interface GitHubRefreshTokenRequest {
	refresh_token: string;
	grant_type: 'refresh_token';
	client_id: string;
	client_secret: string;
}

export interface GitHubRevokeTokenRequest {
	access_token: string;
	client_id: string;
	client_secret: string;
}

export type GitHubScope = 
	| 'repo'
	| 'repo:status'
	| 'repo_deployment'
	| 'public_repo'
	| 'repo:invite'
	| 'security_events'
	| 'admin:repo_hook'
	| 'write:repo_hook'
	| 'read:repo_hook'
	| 'admin:org'
	| 'write:org'
	| 'read:org'
	| 'admin:public_key'
	| 'write:public_key'
	| 'read:public_key'
	| 'admin:org_hook'
	| 'gist'
	| 'notifications'
	| 'user'
	| 'read:user'
	| 'user:email'
	| 'user:follow'
	| 'project'
	| 'read:project'
	| 'delete_repo'
	| 'write:discussion'
	| 'read:discussion'
	| 'write:packages'
	| 'read:packages'
	| 'delete:packages'
	| 'admin:gpg_key'
	| 'write:gpg_key'
	| 'read:gpg_key'
	| 'codespace'
	| 'workflow';
