import type { Metadata } from 'next'

import { SpotifyApiView } from '@/views/spotify-api-view'

export const metadata: Metadata = {
  title: 'Spotify API',
  description: 'Full-featured Spotify Web API client with authentication and comprehensive music streaming functionality for Fync',
  keywords: [
    'spotify api',
    'spotify client',
    'typescript spotify',
    'spotify sdk',
    'spotify web api',
    'music streaming',
    'spotify oauth',
    'fync spotify'
  ],
  openGraph: {
    title: 'Spotify API Documentation | Fync',
    description: 'Complete guide to using the Spotify API client in Fync',
    type: 'article',
  }
}

export default function SpotifyApiPage() {
  return <SpotifyApiView />
}
