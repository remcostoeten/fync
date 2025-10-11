import type { TApiSection } from '@/types/content'

export const calendarContent: TApiSection[] = [
  {
    id: 'core-exports',
    title: 'Core Exports',
    description: 'Main entry points and core functionality for Google Calendar API integration',
    methods: [
      {
        id: 'main-entry-points',
        name: 'Main Entry Points',
        description: 'Primary package exports for Google Calendar API client and utilities',
        signature: 'import { ... } from "@remcostoeten/fync"',
        parameters: [],
        returnType: 'Calendar client factories and utilities',
        examples: [
          {
            id: 'core-imports',
            title: 'Core Package Imports',
            description: 'Import Google Calendar parts of the Fync library',
            code: `import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'
import { GoogleOAuth, createGoogleOAuth } from '@remcostoeten/fync/google/oauth'`,
            language: 'typescript',
            category: 'calendar',
            tags: ['imports', 'setup']
          }
        ]
      }
    ]
  },
  {
    id: 'calendar-client',
    title: 'Google Calendar API Client',
    description: 'Comprehensive Google Calendar API client with OAuth2 authentication and event management',
    methods: [
      {
        id: 'calendar-main-client',
        name: 'GoogleCalendar()',
        description: 'Main Google Calendar client factory with OAuth2 configuration',
        signature: 'GoogleCalendar(config: { token: string }): GoogleCalendarClient',
        parameters: [
          {
            name: 'config',
            type: 'TCalendarClientConfig',
            description: 'OAuth2 configuration including clientId, clientSecret, and access tokens',
            required: false
          }
        ],
        returnType: 'CalendarClient',
        examples: [
          {
            id: 'calendar-client-init',
            title: 'Initialize Calendar Client',
            description: 'Create a Google Calendar client with OAuth2 authentication',
            code: `import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'

const calendar = GoogleCalendar({
  token: 'your-oauth-access-token'
})

const events = calendar.events('primary')
const calendars = calendar.calendars`,
            language: 'typescript',
            category: 'calendar',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'calendar-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main Google Calendar client',
        signature: 'calendar.events() | calendar.calendars | calendar.settings | calendar.colors',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'calendar-client-methods-example',
            title: 'Calendar Client Methods',
            description: 'Access different Google Calendar API endpoints through specialized clients',
            code: `const calendar = GoogleCalendar({ token: 'your-token' })

const eventsClient = calendar.events('primary')
const calendarsClient = calendar.calendars
const settingsClient = calendar.settings
const colorsClient = calendar.colors
const aclClient = calendar.acl('primary')`,
            language: 'typescript',
            category: 'calendar',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'calendar-events-operations',
    title: 'Events Client Methods',
    description: 'Methods for managing Google Calendar events including creation, updates, and queries',
    methods: [
      {
        id: 'events-list',
        name: 'events().list()',
        description: 'List events from a specific calendar with optional filtering',
        signature: 'calendar.events(calendarId: string).list(options?: TEventListOptions): Promise<TCalendarEvent[]>',
        parameters: [
          {
            name: 'calendarId',
            type: 'string',
            description: 'Calendar ID or "primary" for the user\'s primary calendar',
            required: true
          },
          {
            name: 'options',
            type: 'TEventListOptions',
            description: 'Optional filtering options like timeMin, timeMax, maxResults',
            required: false
          }
        ],
        returnType: 'Promise<TCalendarEvent[]>',
        examples: [
          {
            id: 'events-list-example',
            title: 'List Calendar Events',
            description: 'Fetch events from a calendar with date range filtering',
            code: `const eventsClient = calendar.events('primary')

const todaysEvents = await eventsClient.list({
  timeMin: new Date().toISOString(),
  timeMax: new Date(Date.now() + 86400000).toISOString(),
  singleEvents: true,
  orderBy: 'startTime'
})

todaysEvents.forEach(function displayEvent(event) {
  console.log(event.summary, event.start.dateTime)
})`,
            language: 'typescript',
            category: 'calendar',
            tags: ['events', 'list']
          },
          {
            id: 'events-list-upcoming',
            title: 'List Upcoming Events',
            description: 'Get the next 10 upcoming events',
            code: `const upcomingEvents = await calendar.events('primary').list({
  timeMin: new Date().toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime'
})

const nextMeeting = upcomingEvents.find(function findMeeting(event) {
  return event.attendees && event.attendees.length > 1
})

if (nextMeeting) {
  console.log('Next meeting:', nextMeeting.summary)
  console.log('Starts at:', nextMeeting.start.dateTime)
}`,
            language: 'typescript',
            category: 'calendar',
            tags: ['events', 'upcoming']
          }
        ]
      },
      {
        id: 'events-create',
        name: 'events().create()',
        description: 'Create a new calendar event with attendees and details',
        signature: 'calendar.events(calendarId).create(eventData: TEventCreateData): Promise<TCalendarEvent>',
        parameters: [
          {
            name: 'eventData',
            type: 'TEventCreateData',
            description: 'Event details including summary, start, end, attendees',
            required: true
          }
        ],
        returnType: 'Promise<TCalendarEvent>',
        examples: [
          {
            id: 'events-create-example',
            title: 'Create Calendar Event',
            description: 'Create a new meeting with attendees and reminders',
            code: `const newEvent = await calendar.events('primary').create({
  summary: 'Team Planning Meeting',
  description: 'Monthly team planning and retrospective',
  start: {
    dateTime: '2024-01-15T10:00:00-08:00',
    timeZone: 'America/Los_Angeles'
  },
  end: {
    dateTime: '2024-01-15T11:00:00-08:00',
    timeZone: 'America/Los_Angeles'
  },
  attendees: [
    { email: 'alice@company.com' },
    { email: 'bob@company.com' },
    { email: 'charlie@company.com' }
  ],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 },
      { method: 'popup', minutes: 30 }
    ]
  }
})

console.log('Created event:', newEvent.id)
console.log('Meeting link:', newEvent.htmlLink)`,
            language: 'typescript',
            category: 'calendar',
            tags: ['events', 'create']
          },
          {
            id: 'events-create-all-day',
            title: 'Create All-Day Event',
            description: 'Create an all-day event with location',
            code: `const allDayEvent = await calendar.events('primary').create({
  summary: 'Company Offsite',
  description: 'Annual company retreat and team building',
  start: {
    date: '2024-02-10',
    timeZone: 'America/Los_Angeles'
  },
  end: {
    date: '2024-02-11',
    timeZone: 'America/Los_Angeles'
  },
  location: '123 Conference Center Way, San Francisco, CA',
  attendees: [
    { email: 'team@company.com' }
  ]
})

console.log('All-day event created:', allDayEvent.summary)`,
            language: 'typescript',
            category: 'calendar',
            tags: ['events', 'all-day']
          }
        ]
      },
      {
        id: 'events-update',
        name: 'events().update()',
        description: 'Update an existing calendar event',
        signature: 'calendar.events(calendarId).update(eventId: string, eventData: TEventUpdateData): Promise<TCalendarEvent>',
        parameters: [
          {
            name: 'eventId',
            type: 'string',
            description: 'ID of the event to update',
            required: true
          },
          {
            name: 'eventData',
            type: 'TEventUpdateData',
            description: 'Updated event data',
            required: true
          }
        ],
        returnType: 'Promise<TCalendarEvent>',
        examples: [
          {
            id: 'events-update-example',
            title: 'Update Event Details',
            description: 'Update event time and add attendees',
            code: `const updatedEvent = await calendar.events('primary').update('event-id-123', {
  summary: 'Team Planning Meeting (Updated)',
  start: {
    dateTime: '2024-01-15T11:00:00-08:00',
    timeZone: 'America/Los_Angeles'
  },
  end: {
    dateTime: '2024-01-15T12:30:00-08:00',
    timeZone: 'America/Los_Angeles'
  },
  attendees: [
    { email: 'alice@company.com' },
    { email: 'bob@company.com' },
    { email: 'charlie@company.com' },
    { email: 'dana@company.com' }
  ]
})

console.log('Event updated:', updatedEvent.summary)`,
            language: 'typescript',
            category: 'calendar',
            tags: ['events', 'update']
          }
        ]
      },
      {
        id: 'events-delete',
        name: 'events().delete()',
        description: 'Delete a calendar event',
        signature: 'calendar.events(calendarId).delete(eventId: string): Promise<void>',
        parameters: [
          {
            name: 'eventId',
            type: 'string',
            description: 'ID of the event to delete',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'events-delete-example',
            title: 'Delete Calendar Event',
            description: 'Remove an event from the calendar',
            code: `await calendar.events('primary').delete('event-id-123')

console.log('Event deleted successfully')`,
            language: 'typescript',
            category: 'calendar',
            tags: ['events', 'delete']
          }
        ]
      }
    ]
  },
  {
    id: 'calendar-management',
    title: 'Calendar Management',
    description: 'Methods for managing calendars, settings, and permissions',
    methods: [
      {
        id: 'calendars-list',
        name: 'calendars.list()',
        description: 'List all calendars accessible to the authenticated user',
        signature: 'calendar.calendars.list(): Promise<TCalendarList[]>',
        parameters: [],
        returnType: 'Promise<TCalendarList[]>',
        examples: [
          {
            id: 'calendars-list-example',
            title: 'List User Calendars',
            description: 'Get all calendars the user has access to',
            code: `const calendars = await calendar.calendars.list()

calendars.forEach(function displayCalendar(cal) {
  console.log(cal.summary, cal.id)
  console.log('Access role:', cal.accessRole)
  console.log('Primary:', cal.primary)
})

const primaryCalendar = calendars.find(function findPrimary(cal) {
  return cal.primary === true
})

console.log('Primary calendar:', primaryCalendar.summary)`,
            language: 'typescript',
            category: 'calendar',
            tags: ['calendars', 'list']
          }
        ]
      },
      {
        id: 'calendars-create',
        name: 'calendars.create()',
        description: 'Create a new secondary calendar',
        signature: 'calendar.calendars.create(calendarData: TCalendarCreateData): Promise<TCalendar>',
        parameters: [
          {
            name: 'calendarData',
            type: 'TCalendarCreateData',
            description: 'Calendar details including summary and description',
            required: true
          }
        ],
        returnType: 'Promise<TCalendar>',
        examples: [
          {
            id: 'calendars-create-example',
            title: 'Create New Calendar',
            description: 'Create a project-specific calendar',
            code: `const newCalendar = await calendar.calendars.create({
  summary: 'Project Alpha',
  description: 'Calendar for Project Alpha milestones and meetings',
  timeZone: 'America/Los_Angeles'
})

console.log('New calendar created:', newCalendar.id)
console.log('Calendar name:', newCalendar.summary)`,
            language: 'typescript',
            category: 'calendar',
            tags: ['calendars', 'create']
          }
        ]
      }
    ]
  },
  {
    id: 'calendar-oauth2',
    title: 'OAuth2 Authentication System',
    description: 'Complete OAuth2 flow implementation for Google Calendar API access',
    methods: [
      {
        id: 'oauth2-flow',
        name: 'Google Calendar OAuth2',
        description: 'Create and manage OAuth2 authentication flows for Calendar access',
        signature: 'createGoogleCalendarOAuth2Flow()',
        parameters: [],
        returnType: 'OAuth2Flow',
        examples: [
          {
            id: 'oauth2-flow-example',
            title: 'OAuth2 Flow Setup',
            description: 'Set up OAuth2 authentication for Google Calendar access',
            code: `import { GoogleOAuth, createGoogleOAuth } from '@remcostoeten/fync/google/oauth'
import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'

const oauth = createGoogleOAuth({
  clientId: 'your-google-client-id',
  clientSecret: 'your-google-client-secret',
  redirectUri: 'http://localhost:3000/api/auth/callback'
})

const authUrl = oauth.getAuthorizationUrl()
const tokens = await oauth.exchangeCodeForToken('auth-code-from-callback')

const calendar = GoogleCalendar({
  token: tokens.access_token
})`,
            language: 'typescript',
            category: 'calendar',
            tags: ['oauth2', 'authentication']
          }
        ]
      },
      {
        id: 'oauth2-nextjs',
        name: 'Next.js OAuth2 Integration',
        description: 'Next.js specific OAuth2 integration helpers for Calendar API',
        signature: 'createNextJSCalendarOAuth2Handler()',
        parameters: [],
        returnType: 'NextJS API handlers',
        examples: [
          {
            id: 'oauth2-nextjs-example',
            title: 'Next.js Calendar OAuth2 Integration',
            description: 'Integrate Google Calendar OAuth2 with Next.js API routes',
            code: `import { GoogleOAuth } from '@remcostoeten/fync/google/oauth'
import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'

const oauth = GoogleOAuth({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI
})

export async function handleCalendarAuth(req, res) {
  const { tokens } = req.session
  
  const calendar = GoogleCalendar({
    token: tokens.access_token
  })
  
  const events = await calendar.getUpcomingEvents('primary', 10)
  
  res.json({ events })
}`,
            language: 'typescript',
            category: 'calendar',
            tags: ['oauth2', 'nextjs']
          }
        ]
      }
    ]
  },
]