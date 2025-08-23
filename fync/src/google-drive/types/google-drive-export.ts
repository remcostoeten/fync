export type TGoogleDriveExportFormat = {
	mimeType: string;
	extension: string;
	description: string;
};

export type TGoogleDriveMimeType =
	| "application/vnd.google-apps.audio"
	| "application/vnd.google-apps.document"
	| "application/vnd.google-apps.drive-sdk"
	| "application/vnd.google-apps.drawing"
	| "application/vnd.google-apps.file"
	| "application/vnd.google-apps.folder"
	| "application/vnd.google-apps.form"
	| "application/vnd.google-apps.fusiontable"
	| "application/vnd.google-apps.jam"
	| "application/vnd.google-apps.mail-layout"
	| "application/vnd.google-apps.map"
	| "application/vnd.google-apps.photo"
	| "application/vnd.google-apps.presentation"
	| "application/vnd.google-apps.script"
	| "application/vnd.google-apps.shortcut"
	| "application/vnd.google-apps.site"
	| "application/vnd.google-apps.spreadsheet"
	| "application/vnd.google-apps.unknown"
	| "application/vnd.google-apps.video"
	| string;

export type TGoogleDriveCommonMimeType =
	| "application/pdf"
	| "application/zip"
	| "application/json"
	| "application/xml"
	| "application/octet-stream"
	| "text/plain"
	| "text/html"
	| "text/csv"
	| "text/tab-separated-values"
	| "text/xml"
	| "image/jpeg"
	| "image/png"
	| "image/gif"
	| "image/bmp"
	| "image/svg+xml"
	| "image/tiff"
	| "image/webp"
	| "audio/mpeg"
	| "audio/wav"
	| "audio/webm"
	| "video/mp4"
	| "video/mpeg"
	| "video/quicktime"
	| "video/webm"
	| "video/x-msvideo";

export type TGoogleDriveExportMimeType =
	| "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	| "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	| "application/vnd.openxmlformats-officedocument.presentationml.presentation"
	| "application/vnd.oasis.opendocument.text"
	| "application/vnd.oasis.opendocument.spreadsheet"
	| "application/vnd.oasis.opendocument.presentation"
	| "application/rtf"
	| "application/pdf"
	| "text/plain"
	| "text/html"
	| "text/csv"
	| "text/tab-separated-values"
	| "application/zip"
	| "application/epub+zip"
	| "image/jpeg"
	| "image/png"
	| "image/svg+xml";

export type TGoogleDriveExportOptions = {
	sourceType: TGoogleDriveMimeType;
	targetType: TGoogleDriveExportMimeType;
};

export type TGoogleDriveImportOptions = {
	sourceType: TGoogleDriveCommonMimeType | string;
	targetType?: TGoogleDriveMimeType;
	ocrLanguage?: string;
	useContentAsIndexableText?: boolean;
};

export type TGoogleDriveMediaUpload = {
	mimeType: string;
	body: Buffer | ReadableStream | string;
	resumable?: boolean;
	uploadType?: "media" | "multipart" | "resumable";
};

export type TGoogleDriveResumableUpload = {
	uploadId?: string;
	uploadUri?: string;
	chunkSize?: number;
	currentByte?: number;
	totalBytes?: number;
	status?: "active" | "completed" | "failed" | "cancelled";
};

export type TGoogleDriveDownloadOptions = {
	fileId: string;
	mimeType?: string;
	acknowledgeAbuse?: boolean;
	supportsAllDrives?: boolean;
	supportsTeamDrives?: boolean;
	alt?: "media" | "json";
	revision?: string;
};

export type TGoogleDriveExportRequest = {
	fileId: string;
	mimeType: TGoogleDriveExportMimeType;
};

export type TGoogleDriveCopyRequest = {
	fileId: string;
	requestBody?: {
		name?: string;
		parents?: string[];
		description?: string;
		starred?: boolean;
		properties?: Record<string, string>;
		appProperties?: Record<string, string>;
		writersCanShare?: boolean;
		viewersCanCopyContent?: boolean;
		copyRequiresWriterPermission?: boolean;
	};
	fields?: string;
	ignoreDefaultVisibility?: boolean;
	includePermissionsForView?: string;
	includeLabels?: string;
	keepRevisionForever?: boolean;
	ocrLanguage?: string;
	supportsAllDrives?: boolean;
	supportsTeamDrives?: boolean;
};

export type TGoogleDriveBatchRequest = {
	requests: Array<{
		id: string;
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
		path: string;
		body?: unknown;
		headers?: Record<string, string>;
	}>;
};

export type TGoogleDriveBatchResponse = {
	responses: Array<{
		id: string;
		status: number;
		headers?: Record<string, string>;
		body?: unknown;
		error?: TGoogleDriveError;
	}>;
};

type TGoogleDriveError = {
	code: number;
	message: string;
	errors?: Array<{
		domain: string;
		reason: string;
		message: string;
	}>;
};

type ReadableStream = unknown;
