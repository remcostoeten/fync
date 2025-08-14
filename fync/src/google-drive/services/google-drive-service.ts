import type { TChainableClient } from "./google-drive-client";
import { createGoogleDriveClient } from "./google-drive-client";
import type {
	TGoogleDriveFile,
	TGoogleDriveFileList,
	TGoogleDriveFolder,
	TGoogleDriveSearchParameters,
	TGoogleDriveUploadMetadata,
	TGoogleDriveCreateFolderRequest,
	TGoogleDriveUpdateFileRequest,
	TGoogleDrivePermission,
} from "../types";
import type { TGoogleDriveTokenResponse } from "../auth";

type TGoogleDriveServiceConfig = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	accessToken?: string;
	refreshToken?: string;
	apiKey?: string;
	onTokenRefresh?: (tokens: TGoogleDriveTokenResponse) => void | Promise<void>;
};

type TUploadOptions = {
	metadata: TGoogleDriveUploadMetadata;
	content: Blob | ArrayBuffer | string;
	uploadType?: "media" | "multipart" | "resumable";
	onProgress?: (progress: { loaded: number; total: number }) => void;
};

type TDownloadOptions = {
	fileId: string;
	mimeType?: string;
	acknowledgeAbuse?: boolean;
	onProgress?: (progress: { loaded: number; total: number }) => void;
};

type TExportOptions = {
	fileId: string;
	mimeType: string;
};

type TCopyOptions = {
	fileId: string;
	name?: string;
	parents?: string[];
	description?: string;
	properties?: Record<string, string>;
};

type TMoveOptions = {
	fileId: string;
	addParents?: string[];
	removeParents?: string[];
};

type TShareOptions = {
	fileId: string;
	permission: Omit<TGoogleDrivePermission, "id">;
	sendNotificationEmail?: boolean;
	emailMessage?: string;
	moveToNewOwnersRoot?: boolean;
	transferOwnership?: boolean;
};

type TGoogleDriveService = {
	client: TChainableClient;
	
	// File operations
	listFiles(params?: TGoogleDriveSearchParameters): Promise<TGoogleDriveFileList>;
	getFile(fileId: string, fields?: string): Promise<TGoogleDriveFile>;
	searchFiles(query: string, params?: Omit<TGoogleDriveSearchParameters, "q">): Promise<TGoogleDriveFileList>;
	createFolder(folder: TGoogleDriveCreateFolderRequest): Promise<TGoogleDriveFolder>;
	uploadFile(options: TUploadOptions): Promise<TGoogleDriveFile>;
	updateFile(fileId: string, updates: TGoogleDriveUpdateFileRequest): Promise<TGoogleDriveFile>;
	deleteFile(fileId: string): Promise<void>;
	trashFile(fileId: string): Promise<TGoogleDriveFile>;
	untrashFile(fileId: string): Promise<TGoogleDriveFile>;
	
	// File content operations
	downloadFile(options: TDownloadOptions): Promise<Blob>;
	exportFile(options: TExportOptions): Promise<Blob>;
	copyFile(options: TCopyOptions): Promise<TGoogleDriveFile>;
	moveFile(options: TMoveOptions): Promise<TGoogleDriveFile>;
	
	// Permission operations
	shareFile(options: TShareOptions): Promise<TGoogleDrivePermission>;
	getPermissions(fileId: string): Promise<TGoogleDrivePermission[]>;
	deletePermission(fileId: string, permissionId: string): Promise<void>;
	
	// Utility operations
	emptyTrash(): Promise<void>;
	getStorageQuota(): Promise<{ limit: string; usage: string; usageInDrive: string; usageInDriveTrash: string }>;
	generateIds(count?: number): Promise<string[]>;
	
	// Folder utilities
	createFolderPath(path: string, parentId?: string): Promise<TGoogleDriveFolder>;
	listFolderContents(folderId: string, params?: TGoogleDriveSearchParameters): Promise<TGoogleDriveFileList>;
	findFileByName(name: string, parentId?: string): Promise<TGoogleDriveFile | null>;
	findFolderByName(name: string, parentId?: string): Promise<TGoogleDriveFolder | null>;
};

const GOOGLE_DRIVE_UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3";
const MULTIPART_BOUNDARY = "-------314159265358979323846";

/**
 * Creates a Google Drive service with high-level file operations
 */
function createGoogleDriveService(config: TGoogleDriveServiceConfig): TGoogleDriveService {
	const client = createGoogleDriveClient({
		...config,
		onTokenRefresh: config.onTokenRefresh,
	});

	/**
	 * Lists files in Google Drive
	 */
	async function listFiles(params?: TGoogleDriveSearchParameters): Promise<TGoogleDriveFileList> {
	return (client.files as any).get({
		params: {
			...params,
			includeItemsFromAllDrives: params?.includeItemsFromAllDrives ?? true,
			supportsAllDrives: params?.supportsAllDrives ?? true,
		},
	}) as Promise<TGoogleDriveFileList>;
	}

	/**
	 * Gets a single file by ID
	 */
	async function getFile(fileId: string, fields?: string): Promise<TGoogleDriveFile> {
		return (client.files[fileId] as any).get({
			params: {
				fields: fields || "*",
				supportsAllDrives: true,
			},
		}) as Promise<TGoogleDriveFile>;
	}

	/**
	 * Searches for files using a query
	 */
	async function searchFiles(
		query: string, 
		params?: Omit<TGoogleDriveSearchParameters, "q">
	): Promise<TGoogleDriveFileList> {
		return listFiles({ ...params, q: query });
	}

	/**
	 * Creates a new folder
	 */
	async function createFolder(folder: TGoogleDriveCreateFolderRequest): Promise<TGoogleDriveFolder> {
		return (client.files as any).post(
			{
				...folder,
				mimeType: "application/vnd.google-apps.folder",
			},
			{
				params: {
					supportsAllDrives: true,
				},
			}
		) as Promise<TGoogleDriveFolder>;
	}

	/**
	 * Uploads a file to Google Drive
	 */
	async function uploadFile(options: TUploadOptions): Promise<TGoogleDriveFile> {
		const { metadata, content, uploadType = "multipart" } = options;

		if (uploadType === "media") {
			// Simple media upload
			const response = await fetch(`${GOOGLE_DRIVE_UPLOAD_URL}/files?uploadType=media`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${client.getAccessToken()}`,
					"Content-Type": metadata.mimeType || "application/octet-stream",
				},
				body: content,
			});

			if (!response.ok) {
				throw new Error(`Upload failed: ${response.statusText}`);
			}

			return response.json();
		}

		if (uploadType === "multipart") {
			// Multipart upload (metadata + content)
			const boundary = MULTIPART_BOUNDARY;
			const delimiter = `\r\n--${boundary}\r\n`;
			const closeDelimiter = `\r\n--${boundary}--`;

			// Convert content to Blob if needed
			let blob: Blob;
			if (content instanceof Blob) {
				blob = content;
			} else if (content instanceof ArrayBuffer) {
				blob = new Blob([content], { type: metadata.mimeType || "application/octet-stream" });
			} else {
				blob = new Blob([content], { type: metadata.mimeType || "text/plain" });
			}

			// Create multipart body
			const metadataBlob = new Blob(
				[
					delimiter,
					"Content-Type: application/json; charset=UTF-8\r\n\r\n",
					JSON.stringify(metadata),
					delimiter,
					`Content-Type: ${blob.type}\r\n\r\n`,
				],
				{ type: "text/plain" }
			);

			const closeDelimiterBlob = new Blob([closeDelimiter], { type: "text/plain" });
			const requestBody = new Blob([metadataBlob, blob, closeDelimiterBlob]);

			const response = await fetch(`${GOOGLE_DRIVE_UPLOAD_URL}/files?uploadType=multipart`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${client.getAccessToken()}`,
					"Content-Type": `multipart/related; boundary=${boundary}`,
				},
				body: requestBody,
			});

			if (!response.ok) {
				const error = await response.text();
				throw new Error(`Upload failed: ${error}`);
			}

			return response.json();
		}

		// Resumable upload for large files
		if (uploadType === "resumable") {
			// Initialize resumable upload session
			const initResponse = await fetch(
				`${GOOGLE_DRIVE_UPLOAD_URL}/files?uploadType=resumable`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${client.getAccessToken()}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(metadata),
				}
			);

			if (!initResponse.ok) {
				throw new Error(`Failed to initialize upload: ${initResponse.statusText}`);
			}

			const uploadUrl = initResponse.headers.get("Location");
			if (!uploadUrl) {
				throw new Error("No upload URL returned");
			}

			// Upload the content
			const uploadResponse = await fetch(uploadUrl, {
				method: "PUT",
				headers: {
					"Content-Type": metadata.mimeType || "application/octet-stream",
				},
				body: content,
			});

			if (!uploadResponse.ok) {
				throw new Error(`Upload failed: ${uploadResponse.statusText}`);
			}

			return uploadResponse.json();
		}

		throw new Error(`Unsupported upload type: ${uploadType}`);
	}

	/**
	 * Updates a file's metadata
	 */
	async function updateFile(fileId: string, updates: TGoogleDriveUpdateFileRequest): Promise<TGoogleDriveFile> {
		const { metadata, ...params } = updates;
		
		return (client.files[fileId] as any).patch(
			metadata || {},
			{
				params: {
					...params,
					supportsAllDrives: updates.supportsAllDrives ?? true,
				},
			}
		) as Promise<TGoogleDriveFile>;
	}

	/**
	 * Permanently deletes a file
	 */
	async function deleteFile(fileId: string): Promise<void> {
		await (client.files[fileId] as any).delete({
			params: {
				supportsAllDrives: true,
			},
		});
	}

	/**
	 * Moves a file to trash
	 */
	async function trashFile(fileId: string): Promise<TGoogleDriveFile> {
		return updateFile(fileId, {
			metadata: { trashed: true },
		});
	}

	/**
	 * Restores a file from trash
	 */
	async function untrashFile(fileId: string): Promise<TGoogleDriveFile> {
		return updateFile(fileId, {
			metadata: { trashed: false },
		});
	}

	/**
	 * Downloads a file's content
	 */
	async function downloadFile(options: TDownloadOptions): Promise<Blob> {
		const { fileId, acknowledgeAbuse = false } = options;
		
		const response = await fetch(
			`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&acknowledgeAbuse=${acknowledgeAbuse}`,
			{
				headers: {
					Authorization: `Bearer ${client.getAccessToken()}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Download failed: ${response.statusText}`);
		}

		return response.blob();
	}

	/**
	 * Exports a Google Workspace file to a different format
	 */
	async function exportFile(options: TExportOptions): Promise<Blob> {
		const { fileId, mimeType } = options;
		
		const response = await fetch(
			`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(mimeType)}`,
			{
				headers: {
					Authorization: `Bearer ${client.getAccessToken()}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Export failed: ${response.statusText}`);
		}

		return response.blob();
	}

	/**
	 * Copies a file
	 */
	async function copyFile(options: TCopyOptions): Promise<TGoogleDriveFile> {
		const { fileId, ...metadata } = options;
		
		return (client.files[fileId].copy as any).post(
			metadata,
			{
				params: {
					supportsAllDrives: true,
				},
			}
		) as Promise<TGoogleDriveFile>;
	}

	/**
	 * Moves a file to different parent folders
	 */
	async function moveFile(options: TMoveOptions): Promise<TGoogleDriveFile> {
		const { fileId, addParents = [], removeParents = [] } = options;
		
		return updateFile(fileId, {
			addParents: addParents.join(","),
			removeParents: removeParents.join(","),
		});
	}

	/**
	 * Shares a file with a user or group
	 */
	async function shareFile(options: TShareOptions): Promise<TGoogleDrivePermission> {
		const { fileId, permission, ...params } = options;
		
		return (client.files[fileId].permissions as any).post(
			permission,
			{
				params: {
					...params,
					supportsAllDrives: true,
				},
			}
		) as Promise<TGoogleDrivePermission>;
	}

	/**
	 * Gets all permissions for a file
	 */
	async function getPermissions(fileId: string): Promise<TGoogleDrivePermission[]> {
		const response = await (client.files[fileId].permissions as any).get({
			params: {
				supportsAllDrives: true,
				fields: "permissions(*)",
			},
		}) as { permissions: TGoogleDrivePermission[] };
		
		return response.permissions;
	}

	/**
	 * Removes a permission from a file
	 */
	async function deletePermission(fileId: string, permissionId: string): Promise<void> {
		await (client.files[fileId].permissions[permissionId] as any).delete({
			params: {
				supportsAllDrives: true,
			},
		});
	}

	/**
	 * Empties the trash
	 */
	async function emptyTrash(): Promise<void> {
		await (client.files.trash as any).delete();
	}

	/**
	 * Gets storage quota information
	 */
	async function getStorageQuota(): Promise<{
		limit: string;
		usage: string;
		usageInDrive: string;
		usageInDriveTrash: string;
	}> {
		const response = await (client.about as any).get({
			params: {
				fields: "storageQuota",
			},
		}) as {
			storageQuota: {
				limit: string;
				usage: string;
				usageInDrive: string;
				usageInDriveTrash: string;
			};
		};
		
		return response.storageQuota;
	}

	/**
	 * Generates unique file IDs
	 */
	async function generateIds(count: number = 1): Promise<string[]> {
		const response = await (client.files.generateIds as any).get({
			params: {
				count,
			},
		}) as { ids: string[] };
		
		return response.ids;
	}

	/**
	 * Creates a folder path (nested folders)
	 */
	async function createFolderPath(path: string, parentId?: string): Promise<TGoogleDriveFolder> {
		const segments = path.split("/").filter(Boolean);
		let currentParentId = parentId;
		let folder: TGoogleDriveFolder | null = null;

		for (const segment of segments) {
			// Check if folder already exists
			const existingFolder = await findFolderByName(segment, currentParentId);
			
			if (existingFolder) {
				folder = existingFolder;
			} else {
				// Create the folder
				folder = await createFolder({
					name: segment,
					mimeType: "application/vnd.google-apps.folder",
					parents: currentParentId ? [currentParentId] : undefined,
				});
			}
			
			currentParentId = folder.id;
		}

		if (!folder) {
			throw new Error("Failed to create folder path");
		}

		return folder;
	}

	/**
	 * Lists contents of a folder
	 */
	async function listFolderContents(
		folderId: string,
		params?: TGoogleDriveSearchParameters
	): Promise<TGoogleDriveFileList> {
		return searchFiles(`'${folderId}' in parents`, params);
	}

	/**
	 * Finds a file by name
	 */
	async function findFileByName(name: string, parentId?: string): Promise<TGoogleDriveFile | null> {
		let query = `name = '${name.replace(/'/g, "\\'")}'`;
		if (parentId) {
			query += ` and '${parentId}' in parents`;
		}

		const result = await searchFiles(query, { pageSize: 1 });
		return result.files.length > 0 ? result.files[0] : null;
	}

	/**
	 * Finds a folder by name
	 */
	async function findFolderByName(name: string, parentId?: string): Promise<TGoogleDriveFolder | null> {
		let query = `name = '${name.replace(/'/g, "\\'")}'`;
		query += " and mimeType = 'application/vnd.google-apps.folder'";
		if (parentId) {
			query += ` and '${parentId}' in parents`;
		}

		const result = await searchFiles(query, { pageSize: 1 });
		return result.files.length > 0 ? (result.files[0] as TGoogleDriveFolder) : null;
	}

	return {
		client,
		
		// File operations
		listFiles,
		getFile,
		searchFiles,
		createFolder,
		uploadFile,
		updateFile,
		deleteFile,
		trashFile,
		untrashFile,
		
		// File content operations
		downloadFile,
		exportFile,
		copyFile,
		moveFile,
		
		// Permission operations
		shareFile,
		getPermissions,
		deletePermission,
		
		// Utility operations
		emptyTrash,
		getStorageQuota,
		generateIds,
		
		// Folder utilities
		createFolderPath,
		listFolderContents,
		findFileByName,
		findFolderByName,
	};
}

export { createGoogleDriveService };
export type { TGoogleDriveService, TGoogleDriveServiceConfig, TUploadOptions, TDownloadOptions };
