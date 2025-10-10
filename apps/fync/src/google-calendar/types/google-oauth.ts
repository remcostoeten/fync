export interface GoogleOAuthConfig {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	scope?: string[];
}

export interface GoogleOAuthState {
	state?: string;
	codeVerifier?: string; // For PKCE flow
}

export interface GoogleAuthorizationParams {
	client_id: string;
	redirect_uri: string;
	response_type: 'code';
	scope?: string;
	state?: string;
	access_type?: 'online' | 'offline';
	include_granted_scopes?: boolean;
	login_hint?: string;
	prompt?: 'none' | 'consent' | 'select_account';
	// PKCE parameters
	code_challenge?: string;
	code_challenge_method?: 'S256';
}

export interface GoogleTokenRequest {
	client_id: string;
	client_secret: string;
	code: string;
	grant_type: 'authorization_code';
	redirect_uri: string;
	// PKCE parameter
	code_verifier?: string;
}

export interface GoogleTokenResponse {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token?: string;
	scope: string;
	id_token?: string; // JWT token with user info
}

export interface GoogleRefreshTokenRequest {
	client_id: string;
	client_secret: string;
	refresh_token: string;
	grant_type: 'refresh_token';
}

export interface GoogleRevokeTokenRequest {
	token: string;
}

export interface GoogleUserInfo {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
	hd?: string; // Hosted domain for G Suite users
}

export interface GoogleOAuthError {
	error: string;
	error_description?: string;
	error_uri?: string;
	state?: string;
}

export interface GoogleTokenInfo {
	azp: string; // Authorized party
	aud: string; // Audience
	sub: string; // Subject (user ID)
	scope: string;
	exp: number; // Expiration time
	expires_in: number;
	email?: string;
	email_verified?: boolean;
	access_type?: string;
}

// Common Google OAuth2 scopes
export type GoogleScope =
	// Profile and identity
	| 'openid'
	| 'email'
	| 'profile'
	// Google Calendar
	| 'https://www.googleapis.com/auth/calendar'
	| 'https://www.googleapis.com/auth/calendar.readonly'
	| 'https://www.googleapis.com/auth/calendar.events'
	| 'https://www.googleapis.com/auth/calendar.events.readonly'
	| 'https://www.googleapis.com/auth/calendar.settings.readonly'
	// Google Drive
	| 'https://www.googleapis.com/auth/drive'
	| 'https://www.googleapis.com/auth/drive.readonly'
	| 'https://www.googleapis.com/auth/drive.file'
	| 'https://www.googleapis.com/auth/drive.metadata'
	| 'https://www.googleapis.com/auth/drive.metadata.readonly'
	| 'https://www.googleapis.com/auth/drive.photos.readonly'
	| 'https://www.googleapis.com/auth/drive.scripts'
	// Gmail
	| 'https://www.googleapis.com/auth/gmail.readonly'
	| 'https://www.googleapis.com/auth/gmail.send'
	| 'https://www.googleapis.com/auth/gmail.compose'
	| 'https://www.googleapis.com/auth/gmail.modify'
	| 'https://mail.google.com/'
	// Google Sheets
	| 'https://www.googleapis.com/auth/spreadsheets'
	| 'https://www.googleapis.com/auth/spreadsheets.readonly'
	// Google Docs
	| 'https://www.googleapis.com/auth/documents'
	| 'https://www.googleapis.com/auth/documents.readonly'
	// YouTube
	| 'https://www.googleapis.com/auth/youtube'
	| 'https://www.googleapis.com/auth/youtube.readonly'
	| 'https://www.googleapis.com/auth/youtube.upload'
	// Google Photos
	| 'https://www.googleapis.com/auth/photoslibrary'
	| 'https://www.googleapis.com/auth/photoslibrary.readonly'
	// Google Analytics
	| 'https://www.googleapis.com/auth/analytics'
	| 'https://www.googleapis.com/auth/analytics.readonly'
	// Google Cloud
	| 'https://www.googleapis.com/auth/cloud-platform'
	| 'https://www.googleapis.com/auth/cloud-platform.read-only';
