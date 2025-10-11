import type { Metadata } from 'next'
import { DiscordApiView } from '@/views/discord-api-view'

export const metadata: Metadata = {
  title: 'Discord API',
  description: 'Discord API integration documentation',
}

export default function DiscordApiPage() {
  return <DiscordApiView />
}
