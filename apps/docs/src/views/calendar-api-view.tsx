'use client'

import { Calendar } from 'lucide-react'
import { calendarContent } from '@/content/calendar'
import { ApiMethod } from '@/components/api-method'
import { TableOfContents } from '@/components/table-of-contents'
import { CodeBlock } from '@/components/code-block'
import { useToc } from '@/hooks/use-toc'

export function CalendarApiView() {
  const tocItems = useToc({ sections: calendarContent })

  return (
    <div className="flex gap-8">
      <div
        className="flex-1 space-y-12"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Google Calendar API
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive Google Calendar API client with OAuth2 authentication and event management. 
            Build powerful calendar integrations with type-safe methods for events, calendars, and scheduling.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-green-400/20 text-green-400 rounded-full">
              Stable
            </span>
            <span className="text-xs px-3 py-1.5 bg-blue-400/20 text-blue-400 rounded-full">
              OAuth2 Support
            </span>
            <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-400 rounded-full">
              Event Management
            </span>
            <span className="text-xs px-3 py-1.5 bg-purple-400/20 text-purple-400 rounded-full">
              Timezone Support
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Quick Start
          </h2>
          <CodeBlock
            code={`import { GoogleCalendar } from '@remcostoeten/fync/google-calendar'

const calendar = GoogleCalendar({ 
  token: 'your-oauth-token'
})

const todaysEvents = await calendar.getEventsInDateRange(
  'primary',
  new Date(),
  new Date(Date.now() + 86400000)
)

const newEvent = await calendar.createEvent('primary', {
  summary: 'Team Meeting',
  start: { dateTime: '2024-01-15T10:00:00-08:00' },
  end: { dateTime: '2024-01-15T11:00:00-08:00' }
})`}
            language="typescript"
            filename="calendar-example.ts"
          />
        </div>

        <div className="space-y-16">
          {calendarContent.map(function renderSection(section, sectionIndex) {
            return (
              <section
                key={section.id}
                id={section.id}
                className="space-y-8 scroll-mt-24"
              >
                <div className="space-y-3 border-l-4 border-accent pl-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {section.description}
                  </p>
                </div>

                <div className="space-y-12">
                  {section.methods.map(function renderMethod(method) {
                    return (
                      <ApiMethod key={method.id} method={method} />
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Need more examples? Check out the{' '}
                <a
                  href="https://github.com/remcostoeten/fync/tree/main/examples"
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  examples repository
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <TableOfContents items={tocItems} className="w-64" />
    </div>
  )
}