import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { APP_URL } from '@/constants'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

const title = 'Snap2SQL - Convert diagrams to SQL with AI'
const description =
  'Snap2SQL lets you instantly convert database diagrams into clean SQL schemas using AI. Support for MySQL and PostgreSQL. Try your first scan free!'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  keywords: [
    'ERD to SQL',
    'diagram to SQL',
    'convert ERD',
    'SQL schema generator',
    'AI SQL builder',
    'database diagram OCR',
    'MySQL generator',
    'PostgreSQL schema',
    'Snap2SQL',
    'ER diagram parser'
  ],
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'snap2sql',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/banner.jpg',
        width: 1835,
        height: 1000,
        type: 'image/jpeg'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={cn(inter.className, 'dark container mx-auto px-4 py-8 min-h-dvh flex flex-col')}
      >
        <main className='grow flex flex-col lg:flex-row gap-6'>
          <div className='absolute inset-0 -z-10 size-full bg-transparent bg-[radial-gradient(#e5e7eb_-4px,transparent_1px)] [background-size:16px_16px]'></div>
          {children}
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
