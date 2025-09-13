import type {
	TCalendarAttendee,
	TCalendarDateTime,
	TCalendarEventStatus,
	TCalendarEventTransparency,
	TCalendarEventVisibility,
	TCalendarRecurrence,
	TCalendarReminderOverrides,
} from "./calendar-common";

export type TCalendarEvent = {
	id: string;
	etag: string;
	status: TCalendarEventStatus;
	htmlLink: string;
	created: string;
	updated: string;
	summary: string;
	description?: string;
	location?: string;
	colorId?: string;
	creator: {
		id?: string;
		email: string;
		displayName?: string;
		self?: boolean;
	};
	organizer: {
		id?: string;
		email: string;
		displayName?: string;
		self?: boolean;
	};
	start: TCalendarDateTime;
	end: TCalendarDateTime;
	endTimeUnspecified?: boolean;
	recurrence?: TCalendarRecurrence;
	recurringEventId?: string;
	originalStartTime?: TCalendarDateTime;
	transparency?: TCalendarEventTransparency;
	visibility?: TCalendarEventVisibility;
	iCalUID: string;
	sequence: number;
	attendees?: TCalendarAttendee[];
	attendeesOmitted?: boolean;
	extendedProperties?: {
		private?: Record<string, string>;
		shared?: Record<string, string>;
	};
	hangoutLink?: string;
	conferenceData?: TConferenceData;
	gadget?: TEventGadget;
	anyoneCanAddSelf?: boolean;
	guestsCanInviteOthers?: boolean;
	guestsCanModify?: boolean;
	guestsCanSeeOtherGuests?: boolean;
	privateCopy?: boolean;
	locked?: boolean;
	reminders: TCalendarReminderOverrides;
	source?: {
		url: string;
		title: string;
	};
	workingLocationProperties?: TWorkingLocationProperties;
	outOfOfficeProperties?: TOutOfOfficeProperties;
	focusTimeProperties?: TFocusTimeProperties;
};

export type TConferenceData = {
	createRequest?: {
		requestId: string;
		conferenceSolutionKey: {
			type: string;
		};
		status: {
			statusCode: string;
		};
	};
	entryPoints?: {
		entryPointType: string;
		uri: string;
		label?: string;
		pin?: string;
		accessCode?: string;
		meetingCode?: string;
		passcode?: string;
		password?: string;
	}[];
	conferenceSolution?: {
		key: {
			type: string;
		};
		name: string;
		iconUri: string;
	};
	conferenceId?: string;
	signature?: string;
	notes?: string;
};

export type TEventGadget = {
	type: string;
	title: string;
	link: string;
	iconLink: string;
	width?: number;
	height?: number;
	display?: string;
	preferences?: Record<string, string>;
};

export type TWorkingLocationProperties = {
	type?: "homeOffice" | "officeLocation" | "customLocation";
	homeOffice?: Record<string, unknown>;
	officeLocation?: {
		buildingId?: string;
		floorId?: string;
		floorSectionId?: string;
		deskId?: string;
		label?: string;
	};
	customLocation?: {
		label: string;
	};
};

export type TOutOfOfficeProperties = {
	autoDeclineMode?:
		| "declineOnlyIfSingleAllDayEvent"
		| "declineAllConflictingInvitations";
	declineMessage?: string;
};

export type TFocusTimeProperties = {
	autoDeclineMode?:
		| "declineOnlyIfSingleAllDayEvent"
		| "declineAllConflictingInvitations";
	declineMessage?: string;
	chatStatus?: "available" | "busy" | "doNotDisturb";
};

export type TEventListParams = {
	calendarId?: string;
	alwaysIncludeEmail?: boolean;
	eventTypes?: ("default" | "focusTime" | "outOfOffice")[];
	iCalUID?: string;
	maxAttendees?: number;
	maxResults?: number;
	orderBy?: "startTime" | "updated";
	pageToken?: string;
	privateExtendedProperty?: string;
	q?: string;
	sharedExtendedProperty?: string;
	showDeleted?: boolean;
	showHiddenInvitations?: boolean;
	singleEvents?: boolean;
	syncToken?: string;
	timeMax?: string;
	timeMin?: string;
	timeZone?: string;
	updatedMin?: string;
};

export type TEventListResponse = {
	kind: "calendar#events";
	etag: string;
	summary: string;
	description?: string;
	updated: string;
	timeZone: string;
	accessRole: string;
	defaultReminders: {
		method: string;
		minutes: number;
	}[];
	nextPageToken?: string;
	nextSyncToken?: string;
	items: TCalendarEvent[];
};
