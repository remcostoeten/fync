import type { Metadata } from 'next'
import { DriveApiView } from '@/views/drive-api-view'

export const metadata: Metadata = {
  title: 'Drive API',
  description: 'Google Drive API integration documentation',
}

export default function DriveApiPage() {
  return <DriveApiView />
}