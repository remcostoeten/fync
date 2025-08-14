import type { TGoogleDriveConfig } from "./types/google-drive-common";

/**
 * Google Drive API scopes
 * @see https://developers.google.com/identity/protocols/oauth2/scopes#drive
 */
export const GOOGLE_DRIVE_SCOPES = {
	/** Full, permissive scope to access all files in user's Drive */
	DRIVE: "https://www.googleapis.com/auth/drive",
	/** Per-file access to files created or opened by the app */
	DRIVE_FILE: "https://www.googleapis.com/auth/drive.file",
	/** View and manage Google Drive files and folders that you have opened or created with this app */
	DRIVE_APPDATA: "https://www.googleapis.com/auth/drive.appdata",
	/** View metadata for files in your Google Drive */
	DRIVE_METADATA: "https://www.googleapis.com/auth/drive.metadata",
	/** View metadata for files in your Google Drive (read-only) */
	DRIVE_METADATA_READONLY: "https://www.googleapis.com/auth/drive.metadata.readonly",
	/** View the photos, videos and albums in your Google Photos */
	DRIVE_PHOTOS_READONLY: "https://www.googleapis.com/auth/drive.photos.readonly",
	/** View files in your Google Drive (read-only) */
	DRIVE_READONLY: "https://www.googleapis.com/auth/drive.readonly",
	/** Modify your Google Apps Script scripts' behavior */
	DRIVE_SCRIPTS: "https://www.googleapis.com/auth/drive.scripts",
	/** View and manage your Google Drive activity */
	DRIVE_ACTIVITY: "https://www.googleapis.com/auth/drive.activity",
	/** View your Google Drive activity (read-only) */
	DRIVE_ACTIVITY_READONLY: "https://www.googleapis.com/auth/drive.activity.readonly",
	/** See, create, and delete its own configuration data in your Google Drive */
	DRIVE_MEET_READONLY: "https://www.googleapis.com/auth/drive.meet.readonly",
} as const;

export type TGoogleDriveScope = typeof GOOGLE_DRIVE_SCOPES[keyof typeof GOOGLE_DRIVE_SCOPES];

export type TGoogleDriveTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token?: string;
	scope?: string;
	id_token?: string;
	created_at?: number;
};

export type TGoogleDriveAuthConfig = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	scopes?: TGoogleDriveScope[];
	accessType?: "online" | "offline";
	prompt?: "none" | "consent" | "select_account";
	includeGrantedScopes?: boolean;
	loginHint?: string;
	state?: string;
};

export type TGoogleDriveAuth = {
	config: TGoogleDriveAuthConfig;
	tokens?: TGoogleDriveTokenResponse;
};

const GOOGLE_OAUTH2_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_OAUTH2_TOKEN_URL = "https://oauth2.googleapis.com/token";
const TOKEN_EXPIRY_BUFFER_SECONDS = 300; // 5 minutes buffer for token refresh

/**
 * Creates a Google Drive OAuth2 authentication handler
 */
function createGoogleDriveAuth(config: TGoogleDriveAuthConfig): TGoogleDriveAuth {
	const authInstance: TGoogleDriveAuth = {
		config: {
			...config,
			scopes: config.scopes || [GOOGLE_DRIVE_SCOPES.DRIVE_READONLY],
			accessType: config.accessType || "offline",
			prompt: config.prompt || "consent",
			includeGrantedScopes: config.includeGrantedScopes !== false,
		},
	};

	return authInstance;
}

/**
 * Generates the OAuth2 authorization URL for user consent
 */
function getAuthorizationUrl(auth: TGoogleDriveAuth): string {
	const params = new URLSearchParams({
		client_id: auth.config.clientId,
		redirect_uri: auth.config.redirectUri,
		response_type: "code",
		scope: (auth.config.scopes || []).join(" "),
		access_type: auth.config.accessType || "offline",
		prompt: auth.config.prompt || "consent",
		include_granted_scopes: String(auth.config.includeGrantedScopes !== false),
	});

	if (auth.config.state) {
		params.append("state", auth.config.state);
	}

	if (auth.config.loginHint) {
		params.append("login_hint", auth.config.loginHint);
	}

	return `${GOOGLE_OAUTH2_BASE_URL}?${params.toString()}`;
}

/**
 * Exchanges an authorization code for access and refresh tokens
 */
async function exchangeCodeForTokens(
	auth: TGoogleDriveAuth,
	code: string
): Promise<TGoogleDriveTokenResponse> {
	const params = new URLSearchParams({
		code,
		client_id: auth.config.clientId,
		client_secret: auth.config.clientSecret,
		redirect_uri: auth.config.redirectUri,
		grant_type: "authorization_code",
	});

	const response = await fetch(GOOGLE_OAUTH2_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: params.toString(),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to exchange code for tokens: ${error}`);
	}

	const tokenData: TGoogleDriveTokenResponse = await response.json();
	
	// Add created_at timestamp for expiry calculation
	tokenData.created_at = Math.floor(Date.now() / 1000);
	
	// Store tokens in auth instance
	auth.tokens = tokenData;
	
	return tokenData;
}

/**
 * Refreshes an expired access token using the refresh token
 */
async function refreshAccessToken(
	auth: TGoogleDriveAuth,
	refreshToken: string
): Promise<TGoogleDriveTokenResponse> {
	const params = new URLSearchParams({
		refresh_token: refreshToken,
		client_id: auth.config.clientId,
		client_secret: auth.config.clientSecret,
		grant_type: "refresh_token",
	});

	const response = await fetch(GOOGLE_OAUTH2_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: params.toString(),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to refresh access token: ${error}`);
	}

	const tokenData: TGoogleDriveTokenResponse = await response.json();
	
	// Add created_at timestamp for expiry calculation
	tokenData.created_at = Math.floor(Date.now() / 1000);
	
	// Preserve refresh token if not returned in response
	if (!tokenData.refresh_token && auth.tokens?.refresh_token) {
		tokenData.refresh_token = auth.tokens.refresh_token;
	}
	
	// Update tokens in auth instance
	auth.tokens = tokenData;
	
	return tokenData;
}

/**
 * Checks if the access token is expired
 */
function isTokenExpired(tokenResponse: TGoogleDriveTokenResponse): boolean {
	if (!tokenResponse.created_at || !tokenResponse.expires_in) {
		// If we don't have expiry information, assume it's expired
		return true;
	}

	const now = Math.floor(Date.now() / 1000);
	const expiryTime = tokenResponse.created_at + tokenResponse.expires_in;
	
	return now >= expiryTime;
}

/**
 * Checks if the token should be refreshed proactively
 * Returns true if the token will expire within the buffer period
 */
function shouldRefreshToken(tokenResponse: TGoogleDriveTokenResponse): boolean {
	if (!tokenResponse.created_at || !tokenResponse.expires_in) {
		// If we don't have expiry information, suggest refresh
		return true;
	}

	const now = Math.floor(Date.now() / 1000);
	const expiryTime = tokenResponse.created_at + tokenResponse.expires_in;
	const refreshTime = expiryTime - TOKEN_EXPIRY_BUFFER_SECONDS;
	
	return now >= refreshTime;
}

export {
	createGoogleDriveAuth,
	getAuthorizationUrl,
	exchangeCodeForTokens,
	refreshAccessToken,
	isTokenExpired,
	shouldRefreshToken,
};
