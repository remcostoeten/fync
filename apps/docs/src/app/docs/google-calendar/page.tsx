import type { Metadata } from 'next'
import { CalendarApiView } from '@/views/calendar-api-view'

export const metadata: Metadata = {
  title: 'Google Calendar API',
  description: 'Google Calendar API integration documentation',
}

export default function GoogleCalendarApiPage() {
  return <CalendarApiView />
}
