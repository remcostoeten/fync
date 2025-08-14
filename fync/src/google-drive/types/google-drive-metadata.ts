import type { TGoogleDriveUser } from "./google-drive-common";

export type TGoogleDriveAbout = {
	kind: string;
	user?: TGoogleDriveUser;
	storageQuota?: TGoogleDriveStorageQuota;
	importFormats?: Record<string, string[]>;
	exportFormats?: Record<string, string[]>;
	maxImportSizes?: Record<string, string>;
	maxUploadSize?: string;
	appInstalled?: boolean;
	folderColorPalette?: string[];
	teamDriveThemes?: Array<{
		id: string;
		backgroundImageLink?: string;
		colorRgb?: string;
	}>;
	driveThemes?: Array<{
		id: string;
		backgroundImageLink?: string;
		colorRgb?: string;
	}>;
	canCreateTeamDrives?: boolean;
	canCreateDrives?: boolean;
};

export type TGoogleDriveStorageQuota = {
	limit?: string;
	usage?: string;
	usageInDrive?: string;
	usageInDriveTrash?: string;
};

export type TGoogleDriveTeamDrive = {
	id: string;
	name: string;
	colorRgb?: string;
	backgroundImageFile?: {
		id?: string;
		xCoordinate?: number;
		yCoordinate?: number;
		width?: number;
	};
	backgroundImageLink?: string;
	capabilities?: TGoogleDriveTeamDriveCapabilities;
	themeId?: string;
	createdTime?: string;
	hidden?: boolean;
	restrictions?: TGoogleDriveTeamDriveRestrictions;
	orgUnitId?: string;
};

export type TGoogleDriveDrive = {
	id: string;
	name: string;
	colorRgb?: string;
	backgroundImageFile?: {
		id?: string;
		xCoordinate?: number;
		yCoordinate?: number;
		width?: number;
	};
	backgroundImageLink?: string;
	capabilities?: TGoogleDriveDriveCapabilities;
	themeId?: string;
	createdTime?: string;
	hidden?: boolean;
	restrictions?: TGoogleDriveDriveRestrictions;
	orgUnitId?: string;
};

export type TGoogleDriveTeamDriveCapabilities = {
	canAddChildren?: boolean;
	canChangeCopyRequiresWriterPermissionRestriction?: boolean;
	canChangeDomainUsersOnlyRestriction?: boolean;
	canChangeDriveBackground?: boolean;
	canChangeDriveMembersOnlyRestriction?: boolean;
	canComment?: boolean;
	canCopy?: boolean;
	canDeleteChildren?: boolean;
	canDeleteDrive?: boolean;
	canDownload?: boolean;
	canEdit?: boolean;
	canListChildren?: boolean;
	canManageMembers?: boolean;
	canReadRevisions?: boolean;
	canRename?: boolean;
	canRenameDrive?: boolean;
	canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;
	canResetDriveRestrictions?: boolean;
	canShare?: boolean;
	canTrashChildren?: boolean;
};

export type TGoogleDriveDriveCapabilities = {
	canAddChildren?: boolean;
	canChangeCopyRequiresWriterPermissionRestriction?: boolean;
	canChangeDomainUsersOnlyRestriction?: boolean;
	canChangeDriveBackground?: boolean;
	canChangeDriveMembersOnlyRestriction?: boolean;
	canComment?: boolean;
	canCopy?: boolean;
	canDeleteChildren?: boolean;
	canDeleteDrive?: boolean;
	canDownload?: boolean;
	canEdit?: boolean;
	canListChildren?: boolean;
	canManageMembers?: boolean;
	canReadRevisions?: boolean;
	canRename?: boolean;
	canRenameDrive?: boolean;
	canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;
	canResetDriveRestrictions?: boolean;
	canShare?: boolean;
	canTrashChildren?: boolean;
};

export type TGoogleDriveTeamDriveRestrictions = {
	adminManagedRestrictions?: boolean;
	copyRequiresWriterPermission?: boolean;
	domainUsersOnly?: boolean;
	driveMembersOnly?: boolean;
	sharingFoldersRequiresOrganizerPermission?: boolean;
};

export type TGoogleDriveDriveRestrictions = {
	adminManagedRestrictions?: boolean;
	copyRequiresWriterPermission?: boolean;
	domainUsersOnly?: boolean;
	driveMembersOnly?: boolean;
	sharingFoldersRequiresOrganizerPermission?: boolean;
};

export type TGoogleDriveDriveList = {
	kind: string;
	nextPageToken?: string;
	drives?: TGoogleDriveDrive[];
};

export type TGoogleDriveTeamDriveList = {
	kind: string;
	nextPageToken?: string;
	teamDrives?: TGoogleDriveTeamDrive[];
};

export type TGoogleDriveStartPageToken = {
	kind: string;
	startPageToken: string;
};

export type TGoogleDriveLabel = {
	id: string;
	revisionId: string;
	kind?: string;
	fields?: Record<string, TGoogleDriveLabelField>;
};

export type TGoogleDriveLabelField = {
	id: string;
	kind?: string;
	valueType: "text" | "integer" | "date" | "user" | "selection";
	dateString?: string[];
	integer?: string[];
	selection?: string[];
	text?: string[];
	user?: TGoogleDriveUser[];
};

export type TGoogleDriveLabelList = {
	kind: string;
	nextPageToken?: string;
	labels?: TGoogleDriveLabel[];
};
