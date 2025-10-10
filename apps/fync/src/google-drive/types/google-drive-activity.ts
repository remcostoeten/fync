import type {
	TGoogleDrivePermission,
	TGoogleDriveUser,
} from "./google-drive-common";
import type { TGoogleDriveFile } from "./google-drive-file";

export type TGoogleDriveRevision = {
	id: string;
	mimeType?: string;
	kind?: string;
	modifiedTime?: string;
	keepForever?: boolean;
	published?: boolean;
	publishedLink?: string;
	publishAuto?: boolean;
	publishedOutsideDomain?: boolean;
	lastModifyingUser?: TGoogleDriveUser;
	originalFilename?: string;
	md5Checksum?: string;
	size?: string;
	exportLinks?: Record<string, string>;
};

export type TGoogleDriveRevisionList = {
	kind: string;
	nextPageToken?: string;
	revisions: TGoogleDriveRevision[];
};

export type TGoogleDriveComment = {
	id: string;
	kind?: string;
	createdTime?: string;
	modifiedTime?: string;
	author?: TGoogleDriveUser;
	htmlContent?: string;
	content: string;
	deleted?: boolean;
	resolved?: boolean;
	quotedFileContent?: {
		mimeType: string;
		value: string;
	};
	anchor?: string;
	replies?: TGoogleDriveReply[];
};

export type TGoogleDriveReply = {
	id: string;
	kind?: string;
	createdTime?: string;
	modifiedTime?: string;
	author?: TGoogleDriveUser;
	htmlContent?: string;
	content: string;
	deleted?: boolean;
	action?: "resolve" | "reopen";
};

export type TGoogleDriveCommentList = {
	kind: string;
	nextPageToken?: string;
	comments: TGoogleDriveComment[];
};

export type TGoogleDriveReplyList = {
	kind: string;
	nextPageToken?: string;
	replies: TGoogleDriveReply[];
};

export type TGoogleDriveChange = {
	kind?: string;
	changeType?: "file" | "drive";
	time?: string;
	removed?: boolean;
	fileId?: string;
	file?: TGoogleDriveFile;
	teamDriveId?: string;
	driveId?: string;
	teamDrive?: {
		id: string;
		name: string;
		kind?: string;
	};
	drive?: {
		id: string;
		name: string;
		kind?: string;
	};
	type?: "user" | "group" | "domain" | "anyone";
};

export type TGoogleDriveChangeList = {
	kind: string;
	nextPageToken?: string;
	newStartPageToken?: string;
	changes: TGoogleDriveChange[];
};

export type TGoogleDriveActivity = {
	id?: string;
	primaryActionDetail?: TGoogleDriveActionDetail;
	actors?: TGoogleDriveActor[];
	actions?: TGoogleDriveAction[];
	targets?: TGoogleDriveTarget[];
	timestamp?: string;
	timeRange?: {
		startTime?: string;
		endTime?: string;
	};
};

export type TGoogleDriveActionDetail = {
	create?: TGoogleDriveCreateAction;
	edit?: TGoogleDriveEditAction;
	move?: TGoogleDriveMoveAction;
	rename?: TGoogleDriveRenameAction;
	delete?: TGoogleDriveDeleteAction;
	restore?: TGoogleDriveRestoreAction;
	permissionChange?: TGoogleDrivePermissionChangeAction;
	comment?: TGoogleDriveCommentAction;
	dlpChange?: TGoogleDriveDlpChangeAction;
	reference?: TGoogleDriveReferenceAction;
	settingsChange?: TGoogleDriveSettingsChangeAction;
};

export type TGoogleDriveActor = {
	user?: TGoogleDriveUser;
	anonymous?: boolean;
	impersonation?: {
		impersonatedUser?: TGoogleDriveUser;
	};
	system?: {
		type?: "USER" | "ADMIN" | "SYSTEM";
	};
	administrator?: boolean;
};

export type TGoogleDriveAction = {
	detail?: TGoogleDriveActionDetail;
	actor?: TGoogleDriveActor;
	target?: TGoogleDriveTarget;
	timestamp?: string;
	timeRange?: {
		startTime?: string;
		endTime?: string;
	};
};

export type TGoogleDriveTarget = {
	driveItem?: {
		name?: string;
		title?: string;
		mimeType?: string;
		owner?: TGoogleDriveUser;
		driveFile?: TGoogleDriveFile;
		driveFolder?: {
			type?: "MY_DRIVE_ROOT" | "SHARED_DRIVE_ROOT" | "STANDARD_FOLDER";
		};
	};
	drive?: {
		name?: string;
		title?: string;
		root?: {
			driveId?: string;
		};
	};
	fileComment?: {
		legacyCommentId?: string;
		legacyDiscussionId?: string;
		linkToDiscussion?: string;
		parent?: TGoogleDriveFile;
	};
};

export type TGoogleDriveCreateAction = {
	new?: boolean;
	upload?: boolean;
	copy?: {
		originalObject?: TGoogleDriveTarget;
	};
};

export type TGoogleDriveEditAction = {};

export type TGoogleDriveMoveAction = {
	addedParents?: TGoogleDriveTarget[];
	removedParents?: TGoogleDriveTarget[];
};

export type TGoogleDriveRenameAction = {
	oldTitle?: string;
	newTitle?: string;
};

export type TGoogleDriveDeleteAction = {
	type?: "TRASH" | "PERMANENT_DELETE";
};

export type TGoogleDriveRestoreAction = {
	type?: "UNTRASH";
};

export type TGoogleDrivePermissionChangeAction = {
	addedPermissions?: TGoogleDrivePermission[];
	removedPermissions?: TGoogleDrivePermission[];
};

export type TGoogleDriveCommentAction = {
	mentionedUsers?: TGoogleDriveUser[];
	post?: {
		subtype?:
			| "ADDED"
			| "DELETED"
			| "REPLY_ADDED"
			| "REPLY_DELETED"
			| "RESOLVED"
			| "REOPENED";
	};
	assignment?: {
		subtype?:
			| "ADDED"
			| "DELETED"
			| "REPLY_ADDED"
			| "REPLY_DELETED"
			| "RESOLVED"
			| "REOPENED"
			| "REASSIGNED";
		assignedUser?: TGoogleDriveUser;
	};
	suggestion?: {
		subtype?:
			| "ADDED"
			| "DELETED"
			| "REPLY_ADDED"
			| "REPLY_DELETED"
			| "ACCEPTED"
			| "REJECTED"
			| "ACCEPT_DELETED"
			| "REJECT_DELETED";
	};
};

export type TGoogleDriveDlpChangeAction = {
	type?: "FLAGGED" | "UNFLAGGED";
};

export type TGoogleDriveReferenceAction = {
	type?: "LINK" | "UNLINK";
};

export type TGoogleDriveSettingsChangeAction = {
	restrictionChanges?: Array<{
		feature?:
			| "SHARING_OUTSIDE_DOMAIN"
			| "DIRECT_SHARING"
			| "ITEM_DUPLICATION"
			| "DRIVE_FILE_STREAM"
			| "FILE_ORGANIZER_CAN_SHARE_FOLDERS";
		newRestriction?: "UNRESTRICTED" | "FULLY_RESTRICTED";
	}>;
};

export type TGoogleDriveActivityQueryRequest = {
	ancestorName?: string;
	consolidationStrategy?: {
		none?: {};
		legacy?: {};
	};
	filter?: string;
	pageSize?: number;
	pageToken?: string;
};

export type TGoogleDriveActivityQueryResponse = {
	activities?: TGoogleDriveActivity[];
	nextPageToken?: string;
};
