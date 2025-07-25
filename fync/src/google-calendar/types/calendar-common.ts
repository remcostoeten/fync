export type TCalendarDateTime = {
	dateTime?: string;
	date?: string;
	timeZone?: string;
};

export type TCalendarAttendee = {
	id?: string;
	email: string;
	displayName?: string;
	organizer?: boolean;
	self?: boolean;
	resource?: boolean;
	optional?: boolean;
	responseStatus?: "needsAction" | "declined" | "tentative" | "accepted";
	comment?: string;
	additionalGuests?: number;
};

export type TCalendarReminder = {
	method: "email" | "popup";
	minutes: number;
};

export type TCalendarReminderOverrides = {
	useDefault: boolean;
	overrides?: TCalendarReminder[];
};

export type TCalendarRecurrence = string[];

export type TCalendarAccessRole =
	| "freeBusyReader"
	| "reader"
	| "writer"
	| "owner";

export type TCalendarEventStatus = "confirmed" | "tentative" | "cancelled";

export type TCalendarEventVisibility =
	| "default"
	| "public"
	| "private"
	| "confidential";

export type TCalendarEventTransparency = "opaque" | "transparent";

export type TTimeZone = string;

export type TColorInfo = {
	background: string;
	foreground: string;
};
