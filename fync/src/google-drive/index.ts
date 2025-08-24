import { createApiBuilder, defineResource, type TModule } from "../core";

const GOOGLE_DRIVE_API_BASE = "https://www.googleapis.com/drive/v3";

const filesResource = defineResource({
	name: "files",
	basePath: "/files",
	methods: {
		listFiles: { path: "" },
		getFile: { path: "/{fileId}" },
		createFile: { path: "", method: "POST" },
		updateFile: { path: "/{fileId}", method: "PATCH" },
		deleteFile: { path: "/{fileId}", method: "DELETE" },
		copyFile: { path: "/{fileId}/copy", method: "POST" },
		moveFile: { path: "/{fileId}", method: "PATCH" },
		exportFile: { path: "/{fileId}/export" },
		downloadFile: { path: "/{fileId}" },
		generateIds: { path: "/generateIds" },
		watchFile: { path: "/{fileId}/watch", method: "POST" },
		emptyTrash: { path: "/trash", method: "DELETE" },
		getFileMetadata: { path: "/{fileId}" },
		updateFileMetadata: { path: "/{fileId}", method: "PATCH" },
	},
});

const permissionsResource = defineResource({
	name: "permissions",
	basePath: "/files/{fileId}/permissions",
	methods: {
		listPermissions: { path: "" },
		getPermission: { path: "/{permissionId}" },
		createPermission: { path: "", method: "POST" },
		updatePermission: { path: "/{permissionId}", method: "PATCH" },
		deletePermission: { path: "/{permissionId}", method: "DELETE" },
	},
});

const commentsResource = defineResource({
	name: "comments",
	basePath: "/files/{fileId}/comments",
	methods: {
		listComments: { path: "" },
		getComment: { path: "/{commentId}" },
		createComment: { path: "", method: "POST" },
		updateComment: { path: "/{commentId}", method: "PATCH" },
		deleteComment: { path: "/{commentId}", method: "DELETE" },
	},
});

const repliesResource = defineResource({
	name: "replies",
	basePath: "/files/{fileId}/comments/{commentId}/replies",
	methods: {
		listReplies: { path: "" },
		getReply: { path: "/{replyId}" },
		createReply: { path: "", method: "POST" },
		updateReply: { path: "/{replyId}", method: "PATCH" },
		deleteReply: { path: "/{replyId}", method: "DELETE" },
	},
});

const revisionsResource = defineResource({
	name: "revisions",
	basePath: "/files/{fileId}/revisions",
	methods: {
		listRevisions: { path: "" },
		getRevision: { path: "/{revisionId}" },
		updateRevision: { path: "/{revisionId}", method: "PATCH" },
		deleteRevision: { path: "/{revisionId}", method: "DELETE" },
	},
});

const drivesResource = defineResource({
	name: "drives",
	basePath: "/drives",
	methods: {
		listDrives: { path: "" },
		getDrive: { path: "/{driveId}" },
		createDrive: { path: "", method: "POST" },
		updateDrive: { path: "/{driveId}", method: "PATCH" },
		deleteDrive: { path: "/{driveId}", method: "DELETE" },
		hideDrive: { path: "/{driveId}/hide", method: "POST" },
		unhideDrive: { path: "/{driveId}/unhide", method: "POST" },
	},
});

const changesResource = defineResource({
	name: "changes",
	basePath: "/changes",
	methods: {
		listChanges: { path: "" },
		getStartPageToken: { path: "/startPageToken" },
		watchChanges: { path: "/watch", method: "POST" },
	},
});

const channelsResource = defineResource({
	name: "channels",
	basePath: "/channels",
	methods: {
		stopChannel: { path: "/stop", method: "POST" },
	},
});

const aboutResource = defineResource({
	name: "about",
	basePath: "/about",
	methods: {
		getAbout: { path: "" },
	},
});

const resources = {
	files: filesResource,
	permissions: permissionsResource,
	comments: commentsResource,
	replies: repliesResource,
	revisions: revisionsResource,
	drives: drivesResource,
	changes: changesResource,
	channels: channelsResource,
	about: aboutResource,
};

const buildGoogleDrive = createApiBuilder({
	baseUrl: GOOGLE_DRIVE_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Content-Type": "application/json",
	},
});

type TGoogleDriveModule = TModule<typeof resources> & {
	listFiles: (options?: any) => Promise<any>;
	getFile: (fileId: string) => Promise<any>;
	createFile: (metadata: any, content?: any) => Promise<any>;
	updateFile: (fileId: string, metadata?: any, content?: any) => Promise<any>;
	deleteFile: (fileId: string) => Promise<any>;
	copyFile: (fileId: string, name?: string) => Promise<any>;
	moveFile: (fileId: string, parentId: string) => Promise<any>;
	downloadFile: (fileId: string) => Promise<any>;
	exportFile: (fileId: string, mimeType: string) => Promise<any>;
	createFolder: (name: string, parentId?: string) => Promise<any>;
	listFolders: () => Promise<any>;
	getFolderContents: (folderId: string) => Promise<any>;
	searchFiles: (query: string) => Promise<any>;
	getFilesByName: (name: string) => Promise<any>;
	getFilesByType: (mimeType: string) => Promise<any>;
	getSharedFiles: () => Promise<any>;
	getRecentFiles: (days?: number) => Promise<any>;
	getStorageQuota: () => Promise<any>;
	shareFile: (fileId: string, email: string, role?: string) => Promise<any>;
	unshareFile: (fileId: string, permissionId: string) => Promise<any>;
	getFilePermissions: (fileId: string) => Promise<any>;
	emptyTrash: () => Promise<any>;
	restoreFile: (fileId: string) => Promise<any>;
	permanentlyDeleteFile: (fileId: string) => Promise<any>;
};

/**
 * Creates a Google Drive client with low-level resource endpoints and high-level convenience methods.
 *
 * Returns an API module bound to the provided bearer token that exposes the underlying resource methods
 * (files, permissions, comments, replies, revisions, drives, changes, channels, about) and a set of
 * higher-level helper functions for common operations (listing, creating, updating, moving, downloading,
 * exporting files; folder management; searching; sharing; quota retrieval; etc.).
 *
 * @param config - Configuration object
 * @param config.token - OAuth2 bearer token used for authenticating requests
 * @returns A TGoogleDriveModule instance providing both resource-level API methods and convenience helpers
 */
export function GoogleDrive(config: { token: string }): TGoogleDriveModule {
	const base = buildGoogleDrive(config, resources);
	const drive = base as unknown as TGoogleDriveModule;

	drive.listFiles = function (options?: any) {
		return base.files.listFiles(options);
	};

	drive.getFile = function (fileId: string) {
		return base.files.getFile({ fileId });
	};

	drive.createFile = function (metadata: any, content?: any) {
		const body = content ? { ...metadata, media: content } : metadata;
		return base.files.createFile(body);
	};

	drive.updateFile = function (fileId: string, metadata?: any, content?: any) {
		const body = content ? { ...metadata, media: content } : metadata;
		return base.files.updateFile({ fileId, ...body });
	};

	drive.deleteFile = function (fileId: string) {
		return base.files.deleteFile({ fileId });
	};

	drive.copyFile = function (fileId: string, name?: string) {
		const body = name ? { name } : {};
		return base.files.copyFile({ fileId, ...body });
	};

	drive.moveFile = function (fileId: string, parentId: string) {
		return base.files.updateFile({
			fileId,
			addParents: parentId,
			removeParents: "root",
		});
	};

	drive.downloadFile = function (fileId: string) {
		return base.files.downloadFile({ fileId, alt: "media" });
	};

	drive.exportFile = function (fileId: string, mimeType: string) {
		return base.files.exportFile({ fileId, mimeType });
	};

	drive.createFolder = function (name: string, parentId?: string) {
		const metadata = {
			name,
			mimeType: "application/vnd.google-apps.folder",
			parents: parentId ? [parentId] : ["root"],
		};
		return base.files.createFile(metadata);
	};

	drive.listFolders = async function () {
		const response = await base.files.listFiles({
			q: "mimeType='application/vnd.google-apps.folder'",
			fields: "files(id, name, parents, createdTime, modifiedTime)",
		});
		return response.files || [];
	};

	drive.getFolderContents = async function (folderId: string) {
		const response = await base.files.listFiles({
			q: `'${folderId}' in parents`,
			fields: "files(id, name, mimeType, size, createdTime, modifiedTime)",
		});
		return response.files || [];
	};

	drive.searchFiles = async function (query: string) {
		const response = await base.files.listFiles({
			q: `name contains '${query}'`,
			fields: "files(id, name, mimeType, size, createdTime, modifiedTime)",
		});
		return response.files || [];
	};

	drive.getFilesByName = async function (name: string) {
		const response = await base.files.listFiles({
			q: `name = '${name}'`,
			fields: "files(id, name, mimeType, size, createdTime, modifiedTime)",
		});
		return response.files || [];
	};

	drive.getFilesByType = async function (mimeType: string) {
		const response = await base.files.listFiles({
			q: `mimeType = '${mimeType}'`,
			fields: "files(id, name, size, createdTime, modifiedTime)",
		});
		return response.files || [];
	};

	drive.getSharedFiles = async function () {
		const response = await base.files.listFiles({
			q: "sharedWithMe = true",
			fields: "files(id, name, mimeType, size, owners, sharingUser)",
		});
		return response.files || [];
	};

	drive.getRecentFiles = async function (days: number = 7) {
		const date = new Date();
		date.setDate(date.getDate() - days);
		const dateString = date.toISOString();
		
		const response = await base.files.listFiles({
			q: `modifiedTime > '${dateString}'`,
			orderBy: "modifiedTime desc",
			fields: "files(id, name, mimeType, size, modifiedTime)",
		});
		return response.files || [];
	};

	drive.getStorageQuota = async function () {
		const response = await base.about.getAbout({
			fields: "storageQuota, user",
		});
		return {
			used: response.storageQuota?.usage || 0,
			limit: response.storageQuota?.limit || 0,
			usageInDrive: response.storageQuota?.usageInDrive || 0,
			usageInDriveTrash: response.storageQuota?.usageInDriveTrash || 0,
		};
	};

	drive.shareFile = function (fileId: string, email: string, role: string = "reader") {
		return base.permissions.createPermission(
			{
				type: "user",
				role,
				emailAddress: email,
			},
			{ fileId },
		);
	};

	drive.unshareFile = function (fileId: string, permissionId: string) {
		return base.permissions.deletePermission({ fileId, permissionId });
	};

	drive.getFilePermissions = function (fileId: string) {
		return base.permissions.listPermissions({ fileId });
	};

	drive.emptyTrash = function () {
		return base.files.emptyTrash();
	};

	drive.restoreFile = function (fileId: string) {
		return base.files.updateFile({ fileId, trashed: false });
	};

	drive.permanentlyDeleteFile = function (fileId: string) {
		return base.files.deleteFile({ fileId, supportsAllDrives: true });
	};

	return drive;
}

export * from "./types";
