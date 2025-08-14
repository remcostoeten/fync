import type { TGoogleDriveFile, TGoogleDriveFolder } from "../types";

/**
 * Checks if a file is a folder
 */
function isFolder(file: TGoogleDriveFile): file is TGoogleDriveFolder {
	return file.mimeType === "application/vnd.google-apps.folder";
}

/**
 * Checks if a file is a Google Workspace document
 */
function isGoogleWorkspaceFile(file: TGoogleDriveFile): boolean {
	const workspaceMimeTypes = [
		"application/vnd.google-apps.document",
		"application/vnd.google-apps.spreadsheet",
		"application/vnd.google-apps.presentation",
		"application/vnd.google-apps.drawing",
		"application/vnd.google-apps.form",
		"application/vnd.google-apps.site",
		"application/vnd.google-apps.script",
		"application/vnd.google-apps.folder",
	];
	
	return workspaceMimeTypes.includes(file.mimeType);
}

/**
 * Formats file size to human-readable format
 */
function formatFileSize(bytes: string | number): string {
	const size = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
	
	if (isNaN(size) || size === 0) return "0 B";
	
	const units = ["B", "KB", "MB", "GB", "TB"];
	const index = Math.floor(Math.log(size) / Math.log(1024));
	const value = size / Math.pow(1024, index);
	
	return `${value.toFixed(2)} ${units[index]}`;
}

/**
 * Builds a Google Drive search query
 */
function buildSearchQuery(options: {
	name?: string;
	mimeType?: string;
	parentId?: string;
	ownedByMe?: boolean;
	sharedWithMe?: boolean;
	starred?: boolean;
	trashed?: boolean;
	modifiedAfter?: Date | string;
	modifiedBefore?: Date | string;
	searchContent?: string;
	visibility?: "anyoneCanFind" | "anyoneWithLink" | "domainCanFind" | "domainWithLink" | "limited";
}): string {
	const conditions: string[] = [];
	
	if (options.name) {
		conditions.push(`name contains '${options.name.replace(/'/g, "\\'")}'`);
	}
	
	if (options.mimeType) {
		conditions.push(`mimeType = '${options.mimeType}'`);
	}
	
	if (options.parentId) {
		conditions.push(`'${options.parentId}' in parents`);
	}
	
	if (options.ownedByMe !== undefined) {
		conditions.push(options.ownedByMe ? "'me' in owners" : "not 'me' in owners");
	}
	
	if (options.sharedWithMe !== undefined) {
		conditions.push(`sharedWithMe = ${options.sharedWithMe}`);
	}
	
	if (options.starred !== undefined) {
		conditions.push(`starred = ${options.starred}`);
	}
	
	if (options.trashed !== undefined) {
		conditions.push(`trashed = ${options.trashed}`);
	}
	
	if (options.modifiedAfter) {
		const date = options.modifiedAfter instanceof Date 
			? options.modifiedAfter.toISOString() 
			: options.modifiedAfter;
		conditions.push(`modifiedTime > '${date}'`);
	}
	
	if (options.modifiedBefore) {
		const date = options.modifiedBefore instanceof Date 
			? options.modifiedBefore.toISOString() 
			: options.modifiedBefore;
		conditions.push(`modifiedTime < '${date}'`);
	}
	
	if (options.searchContent) {
		conditions.push(`fullText contains '${options.searchContent.replace(/'/g, "\\'")}'`);
	}
	
	if (options.visibility) {
		conditions.push(`visibility = '${options.visibility}'`);
	}
	
	return conditions.join(" and ");
}

/**
 * Common MIME type constants
 */
const MIME_TYPES = {
	// Google Workspace
	GOOGLE_DOC: "application/vnd.google-apps.document",
	GOOGLE_SHEET: "application/vnd.google-apps.spreadsheet",
	GOOGLE_SLIDE: "application/vnd.google-apps.presentation",
	GOOGLE_DRAWING: "application/vnd.google-apps.drawing",
	GOOGLE_FORM: "application/vnd.google-apps.form",
	GOOGLE_SCRIPT: "application/vnd.google-apps.script",
	GOOGLE_SITE: "application/vnd.google-apps.site",
	GOOGLE_FOLDER: "application/vnd.google-apps.folder",
	GOOGLE_SHORTCUT: "application/vnd.google-apps.shortcut",
	
	// Documents
	PDF: "application/pdf",
	WORD: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	WORD_LEGACY: "application/msword",
	EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	EXCEL_LEGACY: "application/vnd.ms-excel",
	POWERPOINT: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	POWERPOINT_LEGACY: "application/vnd.ms-powerpoint",
	
	// Text
	PLAIN_TEXT: "text/plain",
	HTML: "text/html",
	CSV: "text/csv",
	JSON: "application/json",
	XML: "application/xml",
	MARKDOWN: "text/markdown",
	
	// Images
	JPEG: "image/jpeg",
	PNG: "image/png",
	GIF: "image/gif",
	SVG: "image/svg+xml",
	WEBP: "image/webp",
	
	// Audio
	MP3: "audio/mpeg",
	WAV: "audio/wav",
	OGG: "audio/ogg",
	
	// Video
	MP4: "video/mp4",
	WEBM: "video/webm",
	AVI: "video/x-msvideo",
	MOV: "video/quicktime",
	
	// Archives
	ZIP: "application/zip",
	RAR: "application/x-rar-compressed",
	TAR: "application/x-tar",
	GZIP: "application/gzip",
	
	// Other
	BINARY: "application/octet-stream",
} as const;

/**
 * Export format mapping for Google Workspace files
 */
const EXPORT_FORMATS = {
	[MIME_TYPES.GOOGLE_DOC]: {
		pdf: "application/pdf",
		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		txt: "text/plain",
		html: "text/html",
		rtf: "application/rtf",
		odt: "application/vnd.oasis.opendocument.text",
		epub: "application/epub+zip",
	},
	[MIME_TYPES.GOOGLE_SHEET]: {
		pdf: "application/pdf",
		xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		csv: "text/csv",
		tsv: "text/tab-separated-values",
		ods: "application/vnd.oasis.opendocument.spreadsheet",
	},
	[MIME_TYPES.GOOGLE_SLIDE]: {
		pdf: "application/pdf",
		pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		txt: "text/plain",
		odp: "application/vnd.oasis.opendocument.presentation",
	},
	[MIME_TYPES.GOOGLE_DRAWING]: {
		pdf: "application/pdf",
		jpeg: "image/jpeg",
		png: "image/png",
		svg: "image/svg+xml",
	},
} as const;

/**
 * Gets available export formats for a Google Workspace file
 */
function getExportFormats(mimeType: string): Record<string, string> | null {
	return EXPORT_FORMATS[mimeType as keyof typeof EXPORT_FORMATS] || null;
}

/**
 * Gets file extension from MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
	const mimeToExtension: Record<string, string> = {
		// Documents
		[MIME_TYPES.PDF]: "pdf",
		[MIME_TYPES.WORD]: "docx",
		[MIME_TYPES.WORD_LEGACY]: "doc",
		[MIME_TYPES.EXCEL]: "xlsx",
		[MIME_TYPES.EXCEL_LEGACY]: "xls",
		[MIME_TYPES.POWERPOINT]: "pptx",
		[MIME_TYPES.POWERPOINT_LEGACY]: "ppt",
		
		// Text
		[MIME_TYPES.PLAIN_TEXT]: "txt",
		[MIME_TYPES.HTML]: "html",
		[MIME_TYPES.CSV]: "csv",
		[MIME_TYPES.JSON]: "json",
		[MIME_TYPES.XML]: "xml",
		[MIME_TYPES.MARKDOWN]: "md",
		
		// Images
		[MIME_TYPES.JPEG]: "jpg",
		[MIME_TYPES.PNG]: "png",
		[MIME_TYPES.GIF]: "gif",
		[MIME_TYPES.SVG]: "svg",
		[MIME_TYPES.WEBP]: "webp",
		
		// Audio
		[MIME_TYPES.MP3]: "mp3",
		[MIME_TYPES.WAV]: "wav",
		[MIME_TYPES.OGG]: "ogg",
		
		// Video
		[MIME_TYPES.MP4]: "mp4",
		[MIME_TYPES.WEBM]: "webm",
		[MIME_TYPES.AVI]: "avi",
		[MIME_TYPES.MOV]: "mov",
		
		// Archives
		[MIME_TYPES.ZIP]: "zip",
		[MIME_TYPES.RAR]: "rar",
		[MIME_TYPES.TAR]: "tar",
		[MIME_TYPES.GZIP]: "gz",
		
		// Google Workspace
		[MIME_TYPES.GOOGLE_DOC]: "gdoc",
		[MIME_TYPES.GOOGLE_SHEET]: "gsheet",
		[MIME_TYPES.GOOGLE_SLIDE]: "gslide",
		[MIME_TYPES.GOOGLE_DRAWING]: "gdraw",
		[MIME_TYPES.GOOGLE_FORM]: "gform",
		[MIME_TYPES.GOOGLE_SCRIPT]: "gs",
	};
	
	return mimeToExtension[mimeType] || "bin";
}

/**
 * Gets MIME type from file extension
 */
function getMimeTypeFromExtension(extension: string): string {
	const ext = extension.toLowerCase().replace(/^\./, "");
	
	const extensionToMime: Record<string, string> = {
		// Documents
		pdf: MIME_TYPES.PDF,
		doc: MIME_TYPES.WORD_LEGACY,
		docx: MIME_TYPES.WORD,
		xls: MIME_TYPES.EXCEL_LEGACY,
		xlsx: MIME_TYPES.EXCEL,
		ppt: MIME_TYPES.POWERPOINT_LEGACY,
		pptx: MIME_TYPES.POWERPOINT,
		
		// Text
		txt: MIME_TYPES.PLAIN_TEXT,
		html: MIME_TYPES.HTML,
		htm: MIME_TYPES.HTML,
		csv: MIME_TYPES.CSV,
		json: MIME_TYPES.JSON,
		xml: MIME_TYPES.XML,
		md: MIME_TYPES.MARKDOWN,
		
		// Images
		jpg: MIME_TYPES.JPEG,
		jpeg: MIME_TYPES.JPEG,
		png: MIME_TYPES.PNG,
		gif: MIME_TYPES.GIF,
		svg: MIME_TYPES.SVG,
		webp: MIME_TYPES.WEBP,
		
		// Audio
		mp3: MIME_TYPES.MP3,
		wav: MIME_TYPES.WAV,
		ogg: MIME_TYPES.OGG,
		
		// Video
		mp4: MIME_TYPES.MP4,
		webm: MIME_TYPES.WEBM,
		avi: MIME_TYPES.AVI,
		mov: MIME_TYPES.MOV,
		
		// Archives
		zip: MIME_TYPES.ZIP,
		rar: MIME_TYPES.RAR,
		tar: MIME_TYPES.TAR,
		gz: MIME_TYPES.GZIP,
		gzip: MIME_TYPES.GZIP,
	};
	
	return extensionToMime[ext] || MIME_TYPES.BINARY;
}

/**
 * Sanitizes a filename for use in Google Drive
 */
function sanitizeFileName(fileName: string): string {
	// Remove or replace invalid characters
	return fileName
		.replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")  // Replace invalid chars with dash
		.replace(/\.+$/, "")  // Remove trailing dots
		.replace(/^\.+/, "")  // Remove leading dots
		.trim()
		.slice(0, 255);  // Limit to 255 characters
}

/**
 * Parses a Google Drive file URL to extract the file ID
 */
function parseFileIdFromUrl(url: string): string | null {
	const patterns = [
		// https://drive.google.com/file/d/{fileId}/view
		/\/file\/d\/([a-zA-Z0-9-_]+)/,
		// https://drive.google.com/open?id={fileId}
		/[?&]id=([a-zA-Z0-9-_]+)/,
		// https://docs.google.com/document/d/{fileId}/edit
		/\/document\/d\/([a-zA-Z0-9-_]+)/,
		// https://docs.google.com/spreadsheets/d/{fileId}/edit
		/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/,
		// https://docs.google.com/presentation/d/{fileId}/edit
		/\/presentation\/d\/([a-zA-Z0-9-_]+)/,
		// https://drive.google.com/drive/folders/{folderId}
		/\/folders\/([a-zA-Z0-9-_]+)/,
	];
	
	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match && match[1]) {
			return match[1];
		}
	}
	
	return null;
}

/**
 * Builds a Google Drive file URL from a file ID
 */
function buildFileUrl(fileId: string, type: "view" | "edit" | "download" = "view"): string {
	switch (type) {
		case "edit":
			return `https://drive.google.com/file/d/${fileId}/edit`;
		case "download":
			return `https://drive.google.com/uc?export=download&id=${fileId}`;
		case "view":
		default:
			return `https://drive.google.com/file/d/${fileId}/view`;
	}
}

/**
 * Calculates folder size by summing all file sizes
 */
function calculateFolderSize(files: TGoogleDriveFile[]): number {
	return files.reduce((total, file) => {
		if (file.size && !isFolder(file)) {
			return total + parseInt(file.size, 10);
		}
		return total;
	}, 0);
}

/**
 * Groups files by their parent folder
 */
function groupFilesByParent(files: TGoogleDriveFile[]): Map<string, TGoogleDriveFile[]> {
	const grouped = new Map<string, TGoogleDriveFile[]>();
	
	for (const file of files) {
		const parents = file.parents || ["root"];
		for (const parent of parents) {
			if (!grouped.has(parent)) {
				grouped.set(parent, []);
			}
			grouped.get(parent)!.push(file);
		}
	}
	
	return grouped;
}

/**
 * Sorts files by various criteria
 */
function sortFiles(
	files: TGoogleDriveFile[],
	sortBy: "name" | "size" | "modifiedTime" | "createdTime" = "name",
	order: "asc" | "desc" = "asc"
): TGoogleDriveFile[] {
	const sorted = [...files].sort((a, b) => {
		let comparison = 0;
		
		switch (sortBy) {
			case "name":
				comparison = (a.name || "").localeCompare(b.name || "");
				break;
			case "size":
				const sizeA = parseInt(a.size || "0", 10);
				const sizeB = parseInt(b.size || "0", 10);
				comparison = sizeA - sizeB;
				break;
			case "modifiedTime":
				comparison = new Date(a.modifiedTime || 0).getTime() - new Date(b.modifiedTime || 0).getTime();
				break;
			case "createdTime":
				comparison = new Date(a.createdTime || 0).getTime() - new Date(b.createdTime || 0).getTime();
				break;
		}
		
		return order === "desc" ? -comparison : comparison;
	});
	
	// Always put folders first
	return [
		...sorted.filter(isFolder),
		...sorted.filter(file => !isFolder(file)),
	];
}

export {
	isFolder,
	isGoogleWorkspaceFile,
	formatFileSize,
	buildSearchQuery,
	MIME_TYPES,
	EXPORT_FORMATS,
	getExportFormats,
	getExtensionFromMimeType,
	getMimeTypeFromExtension,
	sanitizeFileName,
	parseFileIdFromUrl,
	buildFileUrl,
	calculateFolderSize,
	groupFilesByParent,
	sortFiles,
};
