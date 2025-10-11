import type { Metadata } from 'next'

import { GitlabApiView } from '@/views/gitlab-api-view'

export const metadata: Metadata = {
  title: 'GitLab API',
  description: 'Comprehensive GitLab API client for project management, CI/CD pipelines, and team collaboration for Fync',
  keywords: [
    'gitlab api',
    'gitlab client',
    'typescript gitlab',
    'gitlab sdk',
    'gitlab rest api',
    'ci/cd automation',
    'gitlab projects',
    'fync gitlab'
  ],
  openGraph: {
    title: 'GitLab API Documentation | Fync',
    description: 'Complete guide to using the GitLab API client in Fync',
    type: 'article',
  }
}

export default function GitLabApiPage() {
  return <GitlabApiView />
}
