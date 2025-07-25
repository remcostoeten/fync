import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCalendarClient } from "../services/calendar-client";

vi.mock("../services/http-client");

describe("createCalendarClient", () => {
	const mockConfig = {
		accessToken: "mock-access-token",
		cache: true,
		cacheTTL: 300000,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("creates calendar client with correct configuration", () => {
		const client = createCalendarClient(mockConfig);

		expect(client).toBeDefined();
		expect(typeof client.users).toBe("object");
		expect(typeof client.calendars).toBe("object");
		expect(typeof client.colors).toBe("object");
		expect(typeof client.freebusy).toBe("object");
	});

	it("creates chainable client structure", () => {
		const client = createCalendarClient(mockConfig);

		expect(client.users.me).toBeDefined();
		expect(client.users.me.calendarList).toBeDefined();
		expect(typeof client.users.me.calendarList.get).toBe("function");
	});

	it("supports calendar-specific operations", () => {
		const client = createCalendarClient(mockConfig);

		expect(client.calendars["primary"]).toBeDefined();
		expect(client.calendars["primary"].events).toBeDefined();
		expect(typeof client.calendars["primary"].events.get).toBe("function");
	});

	it("provides free/busy query functionality", () => {
		const client = createCalendarClient(mockConfig);

		expect(client.freebusy).toBeDefined();
		expect(client.freebusy.query).toBeDefined();
		expect(typeof client.freebusy.query.get).toBe("function");
	});

	it("includes colors endpoint", () => {
		const client = createCalendarClient(mockConfig);

		expect(client.colors).toBeDefined();
		expect(typeof client.colors.get).toBe("function");
	});
});
