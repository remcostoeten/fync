import type { Metadata } from 'next'
import { NotionApiView } from '@/views/notion-api-view'

export const metadata: Metadata = {
  title: 'Notion API',
  description: 'Notion API integration documentation',
}

export default function NotionApiPage() {
  return <NotionApiView />
}
