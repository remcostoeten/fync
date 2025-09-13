import { createApiBuilder, defineResource, type TModule } from "../core";

const GOOGLE_CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

const calendarListResource = defineResource({
	name: "calendarList",
	basePath: "/users/me/calendarList",
	methods: {
		listCalendars: { path: "" },
		getCalendarListEntry: { path: "/{calendarId}" },
		insertCalendarListEntry: { path: "", method: "POST" },
		updateCalendarListEntry: { path: "/{calendarId}", method: "PUT" },
		patchCalendarListEntry: { path: "/{calendarId}", method: "PATCH" },
		deleteCalendarListEntry: { path: "/{calendarId}", method: "DELETE" },
	},
});

const calendarsResource = defineResource({
	name: "calendars",
	basePath: "/calendars",
	methods: {
		getCalendar: { path: "/{calendarId}" },
		insertCalendar: { path: "", method: "POST" },
		updateCalendar: { path: "/{calendarId}", method: "PUT" },
		patchCalendar: { path: "/{calendarId}", method: "PATCH" },
		deleteCalendar: { path: "/{calendarId}", method: "DELETE" },
		clearCalendar: { path: "/{calendarId}/clear", method: "POST" },
	},
});

const eventsResource = defineResource({
	name: "events",
	basePath: "/calendars/{calendarId}/events",
	methods: {
		listEvents: { path: "" },
		getEvent: { path: "/{eventId}" },
		insertEvent: { path: "", method: "POST" },
		updateEvent: { path: "/{eventId}", method: "PUT" },
		patchEvent: { path: "/{eventId}", method: "PATCH" },
		deleteEvent: { path: "/{eventId}", method: "DELETE" },
		moveEvent: { path: "/{eventId}/move", method: "POST" },
		watchEvents: { path: "/watch", method: "POST" },
		quickAddEvent: { path: "/quickAdd", method: "POST" },
		getEventInstances: { path: "/{eventId}/instances" },
	},
});

const freeBusyResource = defineResource({
	name: "freebusy",
	basePath: "/freeBusy",
	methods: {
		queryFreeBusy: { path: "", method: "POST" },
	},
});

const colorsResource = defineResource({
	name: "colors",
	basePath: "/colors",
	methods: {
		getColors: { path: "" },
	},
});

const aclResource = defineResource({
	name: "acl",
	basePath: "/calendars/{calendarId}/acl",
	methods: {
		listAcl: { path: "" },
		getAclRule: { path: "/{ruleId}" },
		insertAclRule: { path: "", method: "POST" },
		updateAclRule: { path: "/{ruleId}", method: "PUT" },
		patchAclRule: { path: "/{ruleId}", method: "PATCH" },
		deleteAclRule: { path: "/{ruleId}", method: "DELETE" },
	},
});

const settingsResource = defineResource({
	name: "settings",
	basePath: "/users/me/settings",
	methods: {
		listSettings: { path: "" },
		getSetting: { path: "/{setting}" },
		watchSettings: { path: "/watch", method: "POST" },
	},
});

const resources = {
	calendarList: calendarListResource,
	calendars: calendarsResource,
	events: eventsResource,
	freebusy: freeBusyResource,
	colors: colorsResource,
	acl: aclResource,
	settings: settingsResource,
};

const buildGoogleCalendar = createApiBuilder({
	baseUrl: GOOGLE_CALENDAR_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Content-Type": "application/json",
	},
});

type TGoogleCalendarModule = TModule<typeof resources> & {
	getCalendars: () => Promise<any>;
	getCalendar: (calendarId: string) => Promise<any>;
	getEvents: (calendarId?: string, options?: any) => Promise<any>;
	getEvent: (calendarId: string, eventId: string) => Promise<any>;
	getUpcomingEvents: (calendarId?: string, maxResults?: number) => Promise<any>;
	getEventsInDateRange: (
		calendarId: string,
		startDate: Date,
		endDate: Date,
	) => Promise<any>;
	getTodaysEvents: (calendarId?: string) => Promise<any>;
	searchEvents: (
		query: string,
		calendarId?: string,
		maxResults?: number,
	) => Promise<any>;
	getColors: () => Promise<any>;
	getFreeBusy: (params: any) => Promise<any>;
	isTimeSlotBusy: (
		calendarId: string,
		startTime: Date,
		endTime: Date,
	) => Promise<boolean>;
	getAllCalendarEvents: (
		maxResults?: number,
	) => Promise<{ calendar: any; events: any[] }[]>;
	createEvent: (calendarId: string, event: any) => Promise<any>;
	updateEvent: (calendarId: string, eventId: string, event: any) => Promise<any>;
	deleteEvent: (calendarId: string, eventId: string) => Promise<any>;
	quickAddEvent: (calendarId: string, text: string) => Promise<any>;
};

export function GoogleCalendar(config: {
	token: string;
}): TGoogleCalendarModule {
	const base = buildGoogleCalendar(config, resources);
	const calendar = base as unknown as TGoogleCalendarModule;

	calendar.getCalendars = function () {
		return base.calendarList.listCalendars();
	};

	calendar.getCalendar = function (calendarId: string) {
		return base.calendars.getCalendar({ calendarId });
	};

	calendar.getEvents = function (calendarId: string = "primary", options?: any) {
		return base.events.listEvents({ calendarId, ...options });
	};

	calendar.getEvent = function (calendarId: string, eventId: string) {
		return base.events.getEvent({ calendarId, eventId });
	};

	calendar.getUpcomingEvents = async function (
		calendarId: string = "primary",
		maxResults: number = 10,
	) {
		const now = new Date().toISOString();
		const response = await base.events.listEvents({
			calendarId,
			timeMin: now,
			maxResults,
			singleEvents: true,
			orderBy: "startTime",
		});
		return response.items || [];
	};

	calendar.getEventsInDateRange = async function (
		calendarId: string = "primary",
		startDate: Date,
		endDate: Date,
	) {
		const response = await base.events.listEvents({
			calendarId,
			timeMin: startDate.toISOString(),
			timeMax: endDate.toISOString(),
			singleEvents: true,
			orderBy: "startTime",
		});
		return response.items || [];
	};

	calendar.getTodaysEvents = async function (calendarId: string = "primary") {
		const today = new Date();
		const startOfDay = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
		const endOfDay = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 1,
		);

		return calendar.getEventsInDateRange(calendarId, startOfDay, endOfDay);
	};

	calendar.searchEvents = async function (
		query: string,
		calendarId: string = "primary",
		maxResults: number = 25,
	) {
		const response = await base.events.listEvents({
			calendarId,
			q: query,
			maxResults,
			singleEvents: true,
			orderBy: "startTime",
		});
		return response.items || [];
	};

	calendar.getColors = function () {
		return base.colors.getColors();
	};

	calendar.getFreeBusy = function (params: any) {
		return base.freebusy.queryFreeBusy(params);
	};

	calendar.isTimeSlotBusy = async function (
		calendarId: string,
		startTime: Date,
		endTime: Date,
	) {
		const freeBusyResult = await base.freebusy.queryFreeBusy({
			timeMin: startTime.toISOString(),
			timeMax: endTime.toISOString(),
			items: [{ id: calendarId }],
		});

		const calendarBusy = freeBusyResult.calendars?.[calendarId]?.busy || [];
		return calendarBusy.length > 0;
	};

	calendar.getAllCalendarEvents = async function (maxResults?: number) {
		const calendarListResponse = await base.calendarList.listCalendars();
		const calendars = calendarListResponse.items || [];
		const results = [];

		for (const cal of calendars) {
			if (
				cal.accessRole === "reader" ||
				cal.accessRole === "writer" ||
				cal.accessRole === "owner"
			) {
				try {
					const eventsResponse = await base.events.listEvents({
						calendarId: cal.id,
						maxResults,
						singleEvents: true,
						orderBy: "startTime",
					});
					results.push({ calendar: cal, events: eventsResponse.items || [] });
				} catch {}
			}
		}

		return results;
	};

	calendar.createEvent = function (calendarId: string, event: any) {
		return base.events.insertEvent({ calendarId, ...event });
	};

	calendar.updateEvent = function (
		calendarId: string,
		eventId: string,
		event: any,
	) {
		return base.events.updateEvent({ calendarId, eventId, ...event });
	};

	calendar.deleteEvent = function (calendarId: string, eventId: string) {
		return base.events.deleteEvent({ calendarId, eventId });
	};

	calendar.quickAddEvent = function (calendarId: string, text: string) {
		return base.events.quickAddEvent({ calendarId, text });
	};

	return calendar;
}

export { GoogleOAuth } from "./oauth";
export * from "./types";
