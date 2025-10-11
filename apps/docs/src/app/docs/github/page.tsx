import type { Metadata } from 'next'
import { GithubApiView } from '@/views/github-api-view'

export const metadata: Metadata = {
  title: 'GitHub API',
  description: 'Comprehensive GitHub API client documentation with authentication and resource management for Fync',
  keywords: [
    'github api',
    'github client',
    'typescript github',
    'github sdk',
    'github rest api',
    'github authentication',
    'fync github'
  ],
  openGraph: {
    title: 'GitHub API Documentation | Fync',
    description: 'Complete guide to using the GitHub API client in Fync',
    type: 'article',
  }
}

export default function GitHubApiPage() {
  return <GithubApiView />
}
