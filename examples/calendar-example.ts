import { createCalendarService } from "../fync/src/google-calendar";

async function calendarExample() {
	const calendar = createCalendarService({
		accessToken: "YOUR_GOOGLE_ACCESS_TOKEN",
		cache: true,
		cacheTTL: 300000,
	});

	try {
		// Get all user's calendars
		const calendars = await calendar.getCalendars();
		console.log("User calendars:", calendars.map(cal => ({
			id: cal.id,
			summary: cal.summary,
			accessRole: cal.accessRole,
		})));

		// Get upcoming events from primary calendar
		const upcomingEvents = await calendar.getUpcomingEvents("primary", 5);
		console.log("Upcoming events:", upcomingEvents.map(event => ({
			summary: event.summary,
			start: event.start.dateTime || event.start.date,
			end: event.end.dateTime || event.end.date,
		})));

		// Get today's events
		const todaysEvents = await calendar.getTodaysEvents();
		console.log("Today's events:", todaysEvents.length);

		// Get events in a date range
		const startDate = new Date();
		const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Next 7 days
		const weeklyEvents = await calendar.getEventsInDateRange("primary", startDate, endDate);
		console.log("Events this week:", weeklyEvents.length);

		// Search for events
		const meetingEvents = await calendar.searchEvents("meeting");
		console.log("Meeting events:", meetingEvents.length);

		// Check if a time slot is busy
		const startTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
		const endTime = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
		const isBusy = await calendar.isTimeSlotBusy("primary", startTime, endTime);
		console.log("Time slot busy:", isBusy);

		// Get calendar colors
		const colors = await calendar.getColors();
		console.log("Available colors:", Object.keys(colors.calendar).length);

		// Get all events from all calendars
		const allEvents = await calendar.getAllCalendarEvents(10);
		console.log("Events from all calendars:", allEvents.map(({ calendar, events }) => ({
			calendarName: calendar.summary,
			eventCount: events.length,
		})));

	} catch (error) {
		console.error("Calendar API error:", error);
	}
}

export { calendarExample };
