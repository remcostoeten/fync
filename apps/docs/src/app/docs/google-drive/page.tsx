import type { Metadata } from 'next'
import { DriveApiView } from '@/views/drive-api-view'

export const metadata: Metadata = {
  title: 'Google Drive API',
  description: 'Google Drive API integration documentation',
}

export default function GoogleDriveApiPage() {
  return <DriveApiView />
}
