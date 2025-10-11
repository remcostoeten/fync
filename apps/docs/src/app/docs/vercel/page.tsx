import type { Metadata } from 'next'
import { VercelApiView } from '@/views/vercel-api-view'

export const metadata: Metadata = {
  title: 'Vercel API',
  description: 'Vercel API integration documentation',
}

export default function VercelApiPage() {
  return <VercelApiView />
}
