import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCalendarService } from "../index";

const mockCalendarClient = {
	users: {
		me: {
			calendarList: {
				get: vi.fn(),
			},
		},
	},
	calendars: {
		primary: {
			get: vi.fn(),
			events: {
				get: vi.fn(),
			},
		},
	},
	colors: {
		get: vi.fn(),
	},
	freebusy: {
		query: {
			get: vi.fn(),
		},
	},
};

vi.mock("../services/calendar-client", () => ({
	createCalendarClient: vi.fn(() => mockCalendarClient),
}));

describe("createCalendarService", () => {
	const mockConfig = {
		accessToken: "test-token",
		cache: true,
		cacheTTL: 300000,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getCalendars", () => {
		it("fetches user calendars", async () => {
			const mockResponse = {
				items: [
					{ id: "primary", summary: "Primary Calendar" },
					{ id: "calendar2", summary: "Work Calendar" },
				],
			};

			mockCalendarClient.users.me.calendarList.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			const calendars = await service.getCalendars();

			expect(mockCalendarClient.users.me.calendarList.get).toHaveBeenCalledWith(
				{
					params: undefined,
				},
			);
			expect(calendars).toEqual(mockResponse.items);
		});

		it("passes parameters correctly", async () => {
			const params = { maxResults: 50 };
			const mockResponse = { items: [] };

			mockCalendarClient.users.me.calendarList.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			await service.getCalendars(params);

			expect(mockCalendarClient.users.me.calendarList.get).toHaveBeenCalledWith(
				{
					params,
				},
			);
		});
	});

	describe("getCalendar", () => {
		it("fetches specific calendar", async () => {
			const mockCalendar = { id: "primary", summary: "Primary Calendar" };
			mockCalendarClient.calendars.primary.get.mockResolvedValue(mockCalendar);

			const service = createCalendarService(mockConfig);
			const calendar = await service.getCalendar("primary");

			expect(mockCalendarClient.calendars.primary.get).toHaveBeenCalled();
			expect(calendar).toEqual(mockCalendar);
		});
	});

	describe("getEvents", () => {
		it("fetches events from primary calendar by default", async () => {
			const mockResponse = {
				items: [
					{ id: "event1", summary: "Meeting 1" },
					{ id: "event2", summary: "Meeting 2" },
				],
			};

			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			const events = await service.getEvents();

			expect(
				mockCalendarClient.calendars.primary.events.get,
			).toHaveBeenCalledWith({
				params: undefined,
			});
			expect(events).toEqual(mockResponse.items);
		});

		it("fetches events with parameters", async () => {
			const params = { maxResults: 10, orderBy: "startTime" as const };
			const mockResponse = { items: [] };

			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			await service.getEvents("primary", params);

			expect(
				mockCalendarClient.calendars.primary.events.get,
			).toHaveBeenCalledWith({
				params,
			});
		});
	});

	describe("getUpcomingEvents", () => {
		it("fetches upcoming events with correct parameters", async () => {
			const mockResponse = { items: [] };
			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			await service.getUpcomingEvents("primary", 5);

			expect(
				mockCalendarClient.calendars.primary.events.get,
			).toHaveBeenCalledWith({
				params: {
					timeMin: expect.any(String),
					maxResults: 5,
					singleEvents: true,
					orderBy: "startTime",
				},
			});
		});
	});

	describe("getEventsInDateRange", () => {
		it("fetches events within date range", async () => {
			const startDate = new Date("2024-01-01");
			const endDate = new Date("2024-01-31");
			const mockResponse = { items: [] };

			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			await service.getEventsInDateRange("primary", startDate, endDate);

			expect(
				mockCalendarClient.calendars.primary.events.get,
			).toHaveBeenCalledWith({
				params: {
					timeMin: startDate.toISOString(),
					timeMax: endDate.toISOString(),
					singleEvents: true,
					orderBy: "startTime",
				},
			});
		});
	});

	describe("getTodaysEvents", () => {
		it("fetches events for today", async () => {
			const mockResponse = { items: [] };
			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			await service.getTodaysEvents("primary");

			expect(
				mockCalendarClient.calendars.primary.events.get,
			).toHaveBeenCalledWith({
				params: {
					timeMin: expect.any(String),
					timeMax: expect.any(String),
					singleEvents: true,
					orderBy: "startTime",
				},
			});
		});
	});

	describe("searchEvents", () => {
		it("searches events with query", async () => {
			const query = "meeting";
			const mockResponse = { items: [] };

			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockResponse,
			);

			const service = createCalendarService(mockConfig);
			await service.searchEvents(query, "primary", 25);

			expect(
				mockCalendarClient.calendars.primary.events.get,
			).toHaveBeenCalledWith({
				params: {
					q: query,
					maxResults: 25,
					singleEvents: true,
					orderBy: "startTime",
				},
			});
		});
	});

	describe("getColors", () => {
		it("fetches calendar colors", async () => {
			const mockColors = {
				calendar: { "1": { background: "#ac725e" } },
				event: { "1": { background: "#a4bdfc" } },
			};

			mockCalendarClient.colors.get.mockResolvedValue(mockColors);

			const service = createCalendarService(mockConfig);
			const colors = await service.getColors();

			expect(mockCalendarClient.colors.get).toHaveBeenCalled();
			expect(colors).toEqual(mockColors);
		});
	});

	describe("getFreeBusy", () => {
		it("queries free/busy information", async () => {
			const params = {
				timeMin: "2024-01-01T00:00:00Z",
				timeMax: "2024-01-01T23:59:59Z",
				items: [{ id: "primary" }],
			};

			const mockResponse = {
				calendars: {
					primary: { busy: [] },
				},
			};

			mockCalendarClient.freebusy.query.get.mockResolvedValue(mockResponse);

			const service = createCalendarService(mockConfig);
			const freeBusy = await service.getFreeBusy(params);

			expect(mockCalendarClient.freebusy.query.get).toHaveBeenCalledWith({
				params: {
					...params,
					items: JSON.stringify(params.items),
				},
			});
			expect(freeBusy).toEqual(mockResponse);
		});
	});

	describe("isTimeSlotBusy", () => {
		it("returns true when time slot is busy", async () => {
			const startTime = new Date("2024-01-01T10:00:00Z");
			const endTime = new Date("2024-01-01T11:00:00Z");

			const mockResponse = {
				calendars: {
					primary: {
						busy: [
							{
								start: "2024-01-01T10:30:00Z",
								end: "2024-01-01T11:30:00Z",
							},
						],
					},
				},
			};

			mockCalendarClient.freebusy.query.get.mockResolvedValue(mockResponse);

			const service = createCalendarService(mockConfig);
			const isBusy = await service.isTimeSlotBusy(
				"primary",
				startTime,
				endTime,
			);

			expect(isBusy).toBe(true);
		});

		it("returns false when time slot is free", async () => {
			const startTime = new Date("2024-01-01T10:00:00Z");
			const endTime = new Date("2024-01-01T11:00:00Z");

			const mockResponse = {
				calendars: {
					primary: { busy: [] },
				},
			};

			mockCalendarClient.freebusy.query.get.mockResolvedValue(mockResponse);

			const service = createCalendarService(mockConfig);
			const isBusy = await service.isTimeSlotBusy(
				"primary",
				startTime,
				endTime,
			);

			expect(isBusy).toBe(false);
		});
	});

	describe("getAllCalendarEvents", () => {
		it("fetches events from all calendars", async () => {
			const mockCalendars = {
				items: [
					{ id: "primary", summary: "Primary", accessRole: "owner" },
					{ id: "work", summary: "Work", accessRole: "writer" },
				],
			};

			const mockEvents = { items: [{ id: "event1", summary: "Meeting" }] };

			mockCalendarClient.users.me.calendarList.get.mockResolvedValue(
				mockCalendars,
			);
			mockCalendarClient.calendars.primary.events.get.mockResolvedValue(
				mockEvents,
			);

			const service = createCalendarService(mockConfig);
			const result = await service.getAllCalendarEvents(100);

			expect(result).toHaveLength(1);
			expect(result[0].calendar).toEqual(mockCalendars.items[0]);
			expect(result[0].events).toEqual(mockEvents.items);
		});
	});
});
