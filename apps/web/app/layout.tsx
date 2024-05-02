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

const title = 'vdbs - Transform Designs to Database Schemas with AI'
const description =
  'Manage database migrations with a single click, accessing AI-generated SQL code from a database diagram and a command line script for instant local execution.'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  keywords: ['vision ai', 'supabase', 'postgress', 'sql', 'migrations'],
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'vdbs',
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

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'dark p-5 lg:p-12 min-h-dvh flex flex-col')}>
        <Header />
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
