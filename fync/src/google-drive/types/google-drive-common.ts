export type TGoogleDriveConfig = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	refreshToken?: string;
	accessToken?: string;
	apiKey?: string;
	scopes?: string[];
	timeout?: number;
	maxRetries?: number;
	retryDelay?: number;
};

export type TGoogleDriveError = {
	code: number;
	message: string;
	errors?: Array<{
		domain: string;
		reason: string;
		message: string;
		locationType?: string;
		location?: string;
	}>;
	status?: string;
	details?: unknown;
};

export type TGoogleDriveUser = {
	kind: string;
	displayName: string;
	photoLink?: string;
	me?: boolean;
	permissionId?: string;
	emailAddress?: string;
};

export type TGoogleDrivePermission = {
	id?: string;
	type: "user" | "group" | "domain" | "anyone";
	emailAddress?: string;
	domain?: string;
	role: "owner" | "organizer" | "fileOrganizer" | "writer" | "commenter" | "reader";
	displayName?: string;
	photoLink?: string;
	deleted?: boolean;
	pendingOwner?: boolean;
	expirationTime?: string;
	teamDrivePermissionDetails?: Array<{
		teamDrivePermissionType: "file" | "member";
		role: string;
		inheritedFrom?: string;
		inherited?: boolean;
	}>;
	permissionDetails?: Array<{
		permissionType: "file" | "member";
		role: string;
		inheritedFrom?: string;
		inherited?: boolean;
	}>;
	allowFileDiscovery?: boolean;
	view?: "published";
};

export type TGoogleDriveSpace = "drive" | "appDataFolder" | "photos";

export type TGoogleDriveCorpus = "user" | "domain" | "drive" | "allDrives";

export type TGoogleDriveOrderBy = 
	| "createdTime"
	| "folder"
	| "modifiedByMeTime"
	| "modifiedTime"
	| "name"
	| "name_natural"
	| "quotaBytesUsed"
	| "recency"
	| "sharedWithMeTime"
	| "starred"
	| "viewedByMeTime";

export type TGoogleDriveFields = string;

export type TGoogleDrivePageToken = string;

export type TGoogleDriveColor = {
	rgb?: string;
};

export type TGoogleDriveContentRestriction = {
	readOnly?: boolean;
	reason?: string;
	restrictingUser?: TGoogleDriveUser;
	restrictionTime?: string;
	type?: "globalContentRestriction" | "ownerRestriction";
};

export type TGoogleDriveLabelInfo = {
	labels?: Array<{
		id: string;
		revisionId: string;
		fields?: Record<string, {
			valueType: string;
			values: Array<{
				text?: string;
				integer?: string;
				date?: string;
				selection?: string;
				user?: Array<TGoogleDriveUser>;
			}>;
		}>;
	}>;
};

export type TGoogleDriveShortcutDetails = {
	targetId: string;
	targetMimeType?: string;
	targetResourceKey?: string;
};

export type TGoogleDriveLinkShareMetadata = {
	securityUpdateEligible?: boolean;
	securityUpdateEnabled?: boolean;
};
