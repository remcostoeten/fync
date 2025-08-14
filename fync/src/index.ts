export * from "./core/index.js";

// Google Drive exports (avoiding conflicts)
export {
	// Authentication
	createGoogleDriveAuth,
	getAuthorizationUrl,
	exchangeCodeForTokens,
	refreshAccessToken,
	isTokenExpired,
	shouldRefreshToken,
	GOOGLE_DRIVE_SCOPES,
	type TGoogleDriveScope,
	type TGoogleDriveTokenResponse,
	type TGoogleDriveAuthConfig,
	type TGoogleDriveAuth,
	// Client
	createGoogleDriveClient,
	type TGoogleDriveClientConfig,
	type TChainableClient as TGoogleDriveChainableClient,
	type TRequestOptions as TGoogleDriveRequestOptions,
	type THttpMethod as TGoogleDriveHttpMethod,
	// Service
	createGoogleDriveService,
	type TGoogleDriveService,
	type TGoogleDriveServiceConfig,
	// Types
	type TGoogleDriveFile,
	type TGoogleDriveFolder,
	type TGoogleDriveFileList,
	type TGoogleDrivePermission,
	type TGoogleDriveUser,
	type TGoogleDriveSearchParameters,
	type TGoogleDriveUploadMetadata,
	type TGoogleDriveCreateFolderRequest,
	type TGoogleDriveUpdateFileRequest,
} from "./google-drive/index.js";
