import type { Metadata } from 'next'

import { NpmApiView } from '@/views/npm-api-view'

export const metadata: Metadata = {
  title: 'npm Registry API',
  description: 'Client for interacting with the npm registry to query packages, versions, and metadata for Fync',
  keywords: [
    'npm api',
    'npm registry',
    'typescript npm',
    'npm client',
    'package search',
    'npm packages',
    'dependency analysis',
    'fync npm'
  ],
  openGraph: {
    title: 'npm Registry API Documentation | Fync',
    description: 'Complete guide to using the npm Registry API client in Fync',
    type: 'article',
  }
}

export default function NpmApiPage() {
  return <NpmApiView />
}
