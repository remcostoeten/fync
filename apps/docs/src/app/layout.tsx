import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fync-docs.vercel.app'),
  title: {
    default: 'Fync - Unified TypeScript API Client',
    template: '%s | Fync Documentation'
  },
  description: 'Unified TypeScript library for 9 popular APIs including GitHub, Spotify, GitLab, npm, Google Calendar, Google Drive, Vercel, Discord, and Notion. Functional architecture with consistent patterns.',
  keywords: [
    'typescript',
    'api client',
    'github api',
    'spotify api',
    'gitlab api',
    'npm registry',
    'google calendar',
    'google drive',
    'vercel api',
    'discord api',
    'notion api',
    'unified api',
    'type-safe',
    'functional programming'
  ],
  authors: [
    {
      name: 'Remco Stoeten',
      url: 'https://github.com/remcostoeten'
    }
  ],
  creator: 'Remco Stoeten',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fync-docs.vercel.app',
    title: 'Fync - Unified TypeScript API Client',
    description: 'Unified TypeScript library for 9 popular APIs with consistent functional architecture',
    siteName: 'Fync Documentation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fync - Unified TypeScript API Client',
    description: 'Unified TypeScript library for 9 popular APIs with consistent functional architecture',
    creator: '@remcostoeten',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

type TProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: TProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
