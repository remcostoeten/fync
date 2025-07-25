# Google Calendar API Methods

## Client Configuration

```typescript
import { createCalendarService } from '@remcostoeten/fync/google-calendar';

const calendar = createCalendarService({
  accessToken: process.env.GOOGLE_ACCESS_TOKEN,
  cache: true,
  cacheTTL: 300000
});
```

## Core Calendar Methods

### getCalendars(params?)
```typescript
const calendars = await calendar.getCalendars({
  maxResults: 100,
  showHidden: false
});

calendars.forEach(cal => {
  console.log(`${cal.summary} (${cal.id})`);
});
```

### getCalendar(calendarId)
```typescript
const calendarInfo = await calendar.getCalendar('primary');
console.log(`Calendar: ${calendarInfo.summary}`);
```

### getEvents(calendarId?, params?)
```typescript
const events = await calendar.getEvents('primary', {
  maxResults: 50,
  orderBy: 'startTime',
  singleEvents: true
});

events.forEach(event => {
  console.log(`${event.summary} - ${event.start?.dateTime || event.start?.date}`);
});
```

### getEvent(calendarId, eventId)
```typescript
const event = await calendar.getEvent('primary', 'event-id-123');
console.log(`Event: ${event.summary}`);
console.log(`Start: ${event.start?.dateTime || event.start?.date}`);
```

### getUpcomingEvents(calendarId?, maxResults?)
```typescript
const upcomingEvents = await calendar.getUpcomingEvents('primary', 10);

upcomingEvents.forEach(event => {
  console.log(`Upcoming: ${event.summary}`);
});
```

### getEventsInDateRange(calendarId?, startDate, endDate)
```typescript
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-31');

const eventsInRange = await calendar.getEventsInDateRange('primary', startDate, endDate);
console.log(`Found ${eventsInRange.length} events in January`);
```

### getTodaysEvents(calendarId?)
```typescript
const todaysEvents = await calendar.getTodaysEvents('primary');

if (todaysEvents.length > 0) {
  console.log("Today's events:");
  todaysEvents.forEach(event => {
    console.log(`- ${event.summary}`);
  });
} else {
  console.log('No events today');
}
```

### searchEvents(query, calendarId?, maxResults?)
```typescript
const searchResults = await calendar.searchEvents('meeting', 'primary', 25);

searchResults.forEach(event => {
  console.log(`Found: ${event.summary}`);
});
```

### getColors()
```typescript
const colors = await calendar.getColors();

console.log('Available calendar colors:');
Object.entries(colors.calendar).forEach(([id, color]) => {
  console.log(`${id}: ${color.background}`);
});

console.log('Available event colors:');
Object.entries(colors.event).forEach(([id, color]) => {
  console.log(`${id}: ${color.background}`);
});
```

### getFreeBusy(params)
```typescript
const freeBusyInfo = await calendar.getFreeBusy({
  timeMin: new Date().toISOString(),
  timeMax: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  items: [
    { id: 'primary' },
    { id: 'calendar-id-2' }
  ]
});

Object.entries(freeBusyInfo.calendars).forEach(([calId, busyInfo]) => {
  console.log(`${calId}: ${busyInfo.busy?.length || 0} busy periods`);
});
```

### isTimeSlotBusy(calendarId, startTime, endTime)
```typescript
const startTime = new Date('2024-01-15T10:00:00Z');
const endTime = new Date('2024-01-15T11:00:00Z');

const isBusy = await calendar.isTimeSlotBusy('primary', startTime, endTime);

if (isBusy) {
  console.log('Time slot is busy');
} else {
  console.log('Time slot is available');
}
```

### getAllCalendarEvents(maxResults?)
```typescript
const allCalendarEvents = await calendar.getAllCalendarEvents(100);

allCalendarEvents.forEach(({ calendar: cal, events }) => {
  console.log(`${cal.summary}: ${events.length} events`);
  
  events.forEach(event => {
    console.log(`  - ${event.summary}`);
  });
});
```

## Usage Examples

### Daily Schedule Overview
```typescript
async function getDailySchedule() {
  const todaysEvents = await calendar.getTodaysEvents('primary');
  const upcomingEvents = await calendar.getUpcomingEvents('primary', 5);
  
  console.log('=== Today\'s Schedule ===');
  if (todaysEvents.length > 0) {
    todaysEvents.forEach(event => {
      const startTime = event.start?.dateTime || event.start?.date;
      console.log(`${startTime} - ${event.summary}`);
    });
  } else {
    console.log('No events scheduled for today');
  }
  
  console.log('\n=== Next 5 Upcoming Events ===');
  upcomingEvents.forEach(event => {
    const startTime = event.start?.dateTime || event.start?.date;
    console.log(`${startTime} - ${event.summary}`);
  });
}

await getDailySchedule();
```

### Find Available Meeting Slots
```typescript
async function findAvailableSlots(date: Date, durationMinutes: number) {
  const startOfDay = new Date(date);
  startOfDay.setHours(9, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(17, 0, 0, 0);
  
  const busyEvents = await calendar.getEventsInDateRange('primary', startOfDay, endOfDay);
  
  const availableSlots: Array<{ start: Date; end: Date }> = [];
  let currentTime = new Date(startOfDay);
  
  busyEvents.sort((a, b) => {
    const aStart = new Date(a.start?.dateTime || a.start?.date || 0);
    const bStart = new Date(b.start?.dateTime || b.start?.date || 0);
    return aStart.getTime() - bStart.getTime();
  });
  
  for (const event of busyEvents) {
    const eventStart = new Date(event.start?.dateTime || event.start?.date || 0);
    
    if (currentTime < eventStart) {
      const slotDuration = eventStart.getTime() - currentTime.getTime();
      if (slotDuration >= durationMinutes * 60000) {
        availableSlots.push({
          start: new Date(currentTime),
          end: new Date(eventStart)
        });
      }
    }
    
    const eventEnd = new Date(event.end?.dateTime || event.end?.date || 0);
    currentTime = eventEnd > currentTime ? eventEnd : currentTime;
  }
  
  if (currentTime < endOfDay) {
    const remainingTime = endOfDay.getTime() - currentTime.getTime();
    if (remainingTime >= durationMinutes * 60000) {
      availableSlots.push({
        start: new Date(currentTime),
        end: new Date(endOfDay)
      });
    }
  }
  
  console.log(`Available ${durationMinutes}-minute slots:`);
  availableSlots.forEach(slot => {
    console.log(`${slot.start.toLocaleTimeString()} - ${slot.end.toLocaleTimeString()}`);
  });
  
  return availableSlots;
}

await findAvailableSlots(new Date(), 60);
```

### Weekly Schedule Summary
```typescript
async function getWeeklySchedule() {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  const weekEvents = await calendar.getEventsInDateRange('primary', startOfWeek, endOfWeek);
  
  const eventsByDay = new Map<string, typeof weekEvents>();
  
  weekEvents.forEach(event => {
    const eventDate = new Date(event.start?.dateTime || event.start?.date || 0);
    const dayKey = eventDate.toDateString();
    
    if (!eventsByDay.has(dayKey)) {
      eventsByDay.set(dayKey, []);
    }
    eventsByDay.get(dayKey)?.push(event);
  });
  
  console.log('=== Weekly Schedule ===');
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayKey = day.toDateString();
    const dayEvents = eventsByDay.get(dayKey) || [];
    
    console.log(`\n${day.toLocaleDateString()} (${dayEvents.length} events):`);
    dayEvents.forEach(event => {
      const startTime = event.start?.dateTime || event.start?.date;
      console.log(`  ${startTime} - ${event.summary}`);
    });
  }
}

await getWeeklySchedule();
```

### Calendar Conflict Checker
```typescript
async function checkForConflicts(calendarIds: string[]) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const endOfTomorrow = new Date(tomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);
  
  const allEvents: Array<{ calendarId: string; event: any }> = [];
  
  for (const calendarId of calendarIds) {
    try {
      const events = await calendar.getEventsInDateRange(calendarId, tomorrow, endOfTomorrow);
      events.forEach(event => {
        allEvents.push({ calendarId, event });
      });
    } catch (error) {
      console.warn(`Could not fetch events for calendar ${calendarId}`);
    }
  }
  
  const conflicts: Array<{ time: string; events: Array<{calendarId: string; event: any}> }> = [];
  
  allEvents.forEach((eventA, indexA) => {
    const overlapping = allEvents.slice(indexA + 1).filter(eventB => {
      const aStart = new Date(eventA.event.start?.dateTime || eventA.event.start?.date || 0);
      const aEnd = new Date(eventA.event.end?.dateTime || eventA.event.end?.date || 0);
      const bStart = new Date(eventB.event.start?.dateTime || eventB.event.start?.date || 0);
      const bEnd = new Date(eventB.event.end?.dateTime || eventB.event.end?.date || 0);
      
      return aStart < bEnd && bStart < aEnd;
    });
    
    if (overlapping.length > 0) {
      const timeSlot = `${eventA.event.start?.dateTime || eventA.event.start?.date}`;
      conflicts.push({
        time: timeSlot,
        events: [eventA, ...overlapping]
      });
    }
  });
  
  if (conflicts.length > 0) {
    console.log('=== Schedule Conflicts Found ===');
    conflicts.forEach(conflict => {
      console.log(`\nConflict at ${conflict.time}:`);
      conflict.events.forEach(({ calendarId, event }) => {
        console.log(`  - ${calendarId}: ${event.summary}`);
      });
    });
  } else {
    console.log('No conflicts found for tomorrow');
  }
}

await checkForConflicts(['primary', 'work@company.com', 'personal@gmail.com']);
```

### Multi-Calendar Event Aggregator
```typescript
async function aggregateEventsFromAllCalendars() {
  const allCalendarEvents = await calendar.getAllCalendarEvents(500);
  
  const aggregatedEvents: Array<{
    summary: string;
    start: string;
    calendar: string;
    attendeeCount: number;
  }> = [];
  
  allCalendarEvents.forEach(({ calendar: cal, events }) => {
    events.forEach(event => {
      aggregatedEvents.push({
        summary: event.summary || 'Untitled Event',
        start: event.start?.dateTime || event.start?.date || '',
        calendar: cal.summary || 'Unknown Calendar',
        attendeeCount: event.attendees?.length || 0
      });
    });
  });
  
  aggregatedEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  
  console.log('=== All Upcoming Events ===');
  aggregatedEvents.forEach(event => {
    console.log(`${event.start} | ${event.calendar} | ${event.summary} (${event.attendeeCount} attendees)`);
  });
  
  const calendarStats = allCalendarEvents.map(({ calendar: cal, events }) => ({
    name: cal.summary || 'Unknown',
    eventCount: events.length,
    totalAttendees: events.reduce((sum, event) => sum + (event.attendees?.length || 0), 0)
  }));
  
  console.log('\n=== Calendar Statistics ===');
  calendarStats.forEach(stat => {
    console.log(`${stat.name}: ${stat.eventCount} events, ${stat.totalAttendees} total attendees`);
  });
}

await aggregateEventsFromAllCalendars();
```
