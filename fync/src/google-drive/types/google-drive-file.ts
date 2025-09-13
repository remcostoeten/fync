import type {
	TGoogleDriveContentRestriction,
	TGoogleDriveLabelInfo,
	TGoogleDriveLinkShareMetadata,
	TGoogleDrivePermission,
	TGoogleDriveShortcutDetails,
	TGoogleDriveUser,
} from "./google-drive-common";

export type TGoogleDriveFile = {
	id: string;
	name: string;
	mimeType: string;
	description?: string;
	starred?: boolean;
	trashed?: boolean;
	explicitlyTrashed?: boolean;
	parents?: string[];
	properties?: Record<string, string>;
	appProperties?: Record<string, string>;
	spaces?: string[];
	version?: number;
	webContentLink?: string;
	webViewLink?: string;
	iconLink?: string;
	thumbnailLink?: string;
	viewedByMe?: boolean;
	viewedByMeTime?: string;
	createdTime?: string;
	modifiedTime?: string;
	modifiedByMeTime?: string;
	modifiedByMe?: boolean;
	sharedWithMeTime?: string;
	sharingUser?: TGoogleDriveUser;
	owners?: TGoogleDriveUser[];
	teamDriveId?: string;
	driveId?: string;
	lastModifyingUser?: TGoogleDriveUser;
	shared?: boolean;
	ownedByMe?: boolean;
	capabilities?: TGoogleDriveCapabilities;
	viewersCanCopyContent?: boolean;
	copyRequiresWriterPermission?: boolean;
	writersCanShare?: boolean;
	permissions?: TGoogleDrivePermission[];
	permissionIds?: string[];
	hasAugmentedPermissions?: boolean;
	folderColorRgb?: string;
	originalFilename?: string;
	fullFileExtension?: string;
	fileExtension?: string;
	md5Checksum?: string;
	sha1Checksum?: string;
	sha256Checksum?: string;
	size?: string;
	quotaBytesUsed?: string;
	headRevisionId?: string;
	contentHints?: {
		thumbnail?: {
			image?: string;
			mimeType?: string;
		};
		indexableText?: string;
	};
	imageMediaMetadata?: {
		width?: number;
		height?: number;
		rotation?: number;
		location?: {
			latitude?: number;
			longitude?: number;
			altitude?: number;
		};
		time?: string;
		cameraMake?: string;
		cameraModel?: string;
		exposureTime?: number;
		aperture?: number;
		flashUsed?: boolean;
		focalLength?: number;
		isoSpeed?: number;
		meteringMode?: string;
		sensor?: string;
		exposureMode?: string;
		colorSpace?: string;
		whiteBalance?: string;
		exposureBias?: number;
		maxApertureValue?: number;
		subjectDistance?: number;
		lens?: string;
	};
	videoMediaMetadata?: {
		width?: number;
		height?: number;
		durationMillis?: string;
	};
	isAppAuthorized?: boolean;
	exportLinks?: Record<string, string>;
	shortcutDetails?: TGoogleDriveShortcutDetails;
	contentRestrictions?: TGoogleDriveContentRestriction[];
	labelInfo?: TGoogleDriveLabelInfo;
	resourceKey?: string;
	linkShareMetadata?: TGoogleDriveLinkShareMetadata;
};

export type TGoogleDriveFolder = TGoogleDriveFile & {
	mimeType: "application/vnd.google-apps.folder";
};

export type TGoogleDriveFileList = {
	kind: string;
	nextPageToken?: string;
	incompleteSearch?: boolean;
	files: TGoogleDriveFile[];
};

export type TGoogleDriveCapabilities = {
	canAcceptOwnership?: boolean;
	canAddChildren?: boolean;
	canAddFolderFromAnotherDrive?: boolean;
	canAddMyDriveParent?: boolean;
	canChangeCopyRequiresWriterPermission?: boolean;
	canChangeSecurityUpdateEnabled?: boolean;
	canChangeViewersCanCopyContent?: boolean;
	canComment?: boolean;
	canCopy?: boolean;
	canDelete?: boolean;
	canDeleteChildren?: boolean;
	canDownload?: boolean;
	canEdit?: boolean;
	canListChildren?: boolean;
	canModifyContent?: boolean;
	canModifyContentRestriction?: boolean;
	canModifyLabels?: boolean;
	canMoveChildrenOutOfTeamDrive?: boolean;
	canMoveChildrenOutOfDrive?: boolean;
	canMoveChildrenWithinTeamDrive?: boolean;
	canMoveChildrenWithinDrive?: boolean;
	canMoveItemIntoTeamDrive?: boolean;
	canMoveItemOutOfTeamDrive?: boolean;
	canMoveItemOutOfDrive?: boolean;
	canMoveItemWithinTeamDrive?: boolean;
	canMoveItemWithinDrive?: boolean;
	canMoveTeamDriveItem?: boolean;
	canReadLabels?: boolean;
	canReadRevisions?: boolean;
	canReadTeamDrive?: boolean;
	canReadDrive?: boolean;
	canRemoveChildren?: boolean;
	canRemoveMyDriveParent?: boolean;
	canRename?: boolean;
	canShare?: boolean;
	canTrash?: boolean;
	canTrashChildren?: boolean;
	canUntrash?: boolean;
};

export type TGoogleDriveSearchParameters = {
	q?: string;
	spaces?: string;
	corpora?: string;
	includeItemsFromAllDrives?: boolean;
	includeTeamDriveItems?: boolean;
	supportsAllDrives?: boolean;
	supportsTeamDrives?: boolean;
	pageSize?: number;
	pageToken?: string;
	orderBy?: string;
	fields?: string;
	driveId?: string;
	includePermissionsForView?: string;
	includeLabels?: string;
};

export type TGoogleDriveUploadMetadata = {
	name: string;
	mimeType?: string;
	parents?: string[];
	description?: string;
	properties?: Record<string, string>;
	appProperties?: Record<string, string>;
	folderColorRgb?: string;
	originalFilename?: string;
	keepRevisionForever?: boolean;
	ocrLanguage?: string;
	useContentAsIndexableText?: boolean;
	contentHints?: {
		thumbnail?: {
			image?: string;
			mimeType?: string;
		};
		indexableText?: string;
	};
};

export type TGoogleDriveCreateFolderRequest = {
	name: string;
	mimeType: "application/vnd.google-apps.folder";
	parents?: string[];
	description?: string;
	folderColorRgb?: string;
	properties?: Record<string, string>;
	appProperties?: Record<string, string>;
};

export type TGoogleDriveUpdateFileRequest = {
	addParents?: string;
	removeParents?: string;
	keepRevisionForever?: boolean;
	ocrLanguage?: string;
	useContentAsIndexableText?: boolean;
	supportsAllDrives?: boolean;
	supportsTeamDrives?: boolean;
	metadata?: Partial<TGoogleDriveFile>;
};
