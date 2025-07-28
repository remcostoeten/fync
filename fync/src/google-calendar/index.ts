import { createCalendarClient } from "./services/calendar-client";
import type {
	TCalendarColors,
	TCalendarEvent,
	TCalendarListEntry,
	TCalendarListParams,
	TCalendarListResponse,
	TCalendarMetadata,
	TEventListParams,
	TEventListResponse,
	TFreeBusy,
	TFreeBusyParams,
} from "./types";

type TGoogleCalendarConfig = {
	accessToken: string;
	cache?: boolean;
	cacheTTL?: number;
};

function createCalendarService(config: TGoogleCalendarConfig) {
	const client = createCalendarClient({
		accessToken: config.accessToken,
		cache: config.cache,
		cacheTTL: config.cacheTTL,
	});

	async function getCalendars(
		params?: TCalendarListParams,
	): Promise<TCalendarListEntry[]> {
		const response =
			await client.users.me.calendarList.get<TCalendarListResponse>({
				params,
			});
		return response.items;
	}

	async function getCalendar(calendarId: string): Promise<TCalendarMetadata> {
		return client.calendars[calendarId].get<TCalendarMetadata>();
	}

	async function getEvents(
		calendarId: string = "primary",
		params?: TEventListParams,
	): Promise<TCalendarEvent[]> {
		const transformedParams = params
			? {
					...params,
					...(params.eventTypes && {
						eventTypes: params.eventTypes.join(","),
					}),
				}
			: undefined;

		const response = await client.calendars[
			calendarId
		].events.get<TEventListResponse>({
			params: transformedParams as Record<string, string | number | boolean>,
		});
		return response.items;
	}

	async function getEvent(
		calendarId: string,
		eventId: string,
	): Promise<TCalendarEvent> {
		return client.calendars[calendarId].events[eventId].get<TCalendarEvent>();
	}

	async function getUpcomingEvents(
		calendarId: string = "primary",
		maxResults: number = 10,
	): Promise<TCalendarEvent[]> {
		const now = new Date().toISOString();
		return getEvents(calendarId, {
			timeMin: now,
			maxResults,
			singleEvents: true,
			orderBy: "startTime",
		});
	}

	async function getEventsInDateRange(
		calendarId: string = "primary",
		startDate: Date,
		endDate: Date,
	): Promise<TCalendarEvent[]> {
		return getEvents(calendarId, {
			timeMin: startDate.toISOString(),
			timeMax: endDate.toISOString(),
			singleEvents: true,
			orderBy: "startTime",
		});
	}

	async function getTodaysEvents(
		calendarId: string = "primary",
	): Promise<TCalendarEvent[]> {
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

		return getEventsInDateRange(calendarId, startOfDay, endOfDay);
	}

	async function searchEvents(
		query: string,
		calendarId: string = "primary",
		maxResults: number = 25,
	): Promise<TCalendarEvent[]> {
		return getEvents(calendarId, {
			q: query,
			maxResults,
			singleEvents: true,
			orderBy: "startTime",
		});
	}

	async function getColors(): Promise<TCalendarColors> {
		return client.colors.get<TCalendarColors>();
	}

	async function getFreeBusy(params: TFreeBusyParams): Promise<TFreeBusy> {
		const transformedParams = {
			...params,
			items: JSON.stringify(params.items),
		} as Record<string, string | number | boolean>;

		return client.freebusy.query.get<TFreeBusy>({
			params: transformedParams,
		});
	}

	async function isTimeSlotBusy(
		calendarId: string,
		startTime: Date,
		endTime: Date,
	): Promise<boolean> {
		const freeBusyResult = await getFreeBusy({
			timeMin: startTime.toISOString(),
			timeMax: endTime.toISOString(),
			items: [{ id: calendarId }],
		});

		const calendarBusy = freeBusyResult.calendars[calendarId]?.busy || [];
		return calendarBusy.length > 0;
	}

	async function getAllCalendarEvents(
		maxResults?: number,
	): Promise<{ calendar: TCalendarListEntry; events: TCalendarEvent[] }[]> {
		const calendars = await getCalendars();
		const results = [];

		for (const calendar of calendars) {
			if (
				calendar.accessRole === "reader" ||
				calendar.accessRole === "writer" ||
				calendar.accessRole === "owner"
			) {
				try {
					const events = await getEvents(calendar.id, {
						maxResults,
						singleEvents: true,
						orderBy: "startTime",
					});
					results.push({ calendar, events });
				} catch {
				}
			}
		}

		return results;
	}

	return {
		getCalendars,
		getCalendar,
		getEvents,
		getEvent,
		getUpcomingEvents,
		getEventsInDateRange,
		getTodaysEvents,
		searchEvents,
		getColors,
		getFreeBusy,
		isTimeSlotBusy,
		getAllCalendarEvents,
	};
}

export { createCalendarService };
export type { TGoogleCalendarConfig };
export * from "./types";
