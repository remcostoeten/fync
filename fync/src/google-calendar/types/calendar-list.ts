import type { TCalendarAccessRole, TColorInfo } from "./calendar-common";

export type TCalendarListEntry = {
	kind: "calendar#calendarListEntry";
	etag: string;
	id: string;
	summary: string;
	description?: string;
	location?: string;
	timeZone: string;
	summaryOverride?: string;
	colorId?: string;
	backgroundColor?: string;
	foregroundColor?: string;
	hidden?: boolean;
	selected?: boolean;
	accessRole: TCalendarAccessRole;
	defaultReminders: {
		method: string;
		minutes: number;
	}[];
	notificationSettings?: {
		notifications: {
			type: string;
			method: string;
		}[];
	};
	primary?: boolean;
	deleted?: boolean;
	conferenceProperties?: {
		allowedConferenceSolutionTypes: string[];
	};
};

export type TCalendarListResponse = {
	kind: "calendar#calendarList";
	etag: string;
	nextPageToken?: string;
	nextSyncToken?: string;
	items: TCalendarListEntry[];
};

export type TCalendarListParams = {
	maxResults?: number;
	minAccessRole?: TCalendarAccessRole;
	pageToken?: string;
	showDeleted?: boolean;
	showHidden?: boolean;
	syncToken?: string;
};

export type TCalendarMetadata = {
	kind: "calendar#calendar";
	etag: string;
	id: string;
	summary: string;
	description?: string;
	location?: string;
	timeZone: string;
	conferenceProperties?: {
		allowedConferenceSolutionTypes: string[];
	};
};

export type TCalendarColors = {
	kind: "calendar#colors";
	updated: string;
	calendar: Record<string, TColorInfo>;
	event: Record<string, TColorInfo>;
};

export type TFreeBusy = {
	kind: "calendar#freeBusy";
	timeMin: string;
	timeMax: string;
	calendars: Record<
		string,
		{
			errors?: {
				domain: string;
				reason: string;
			}[];
			busy: {
				start: string;
				end: string;
			}[];
		}
	>;
};

export type TFreeBusyParams = {
	timeMin: string;
	timeMax: string;
	timeZone?: string;
	groupExpansionMax?: number;
	calendarExpansionMax?: number;
	items: {
		id: string;
	}[];
};
