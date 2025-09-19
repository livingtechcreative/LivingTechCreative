import type { Metadata } from 'next'
import { inter, interDisplay } from './fonts'
import './globals.css'
import '../styles/fonts.css'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import ErrorBoundary from '@/components/error-boundary'
import '@/lib/error-handler'

export const metadata: Metadata = {
  title: 'LivingTech Creative',
  description: 'Created with Creative Engineering',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} font-sans`} style={{ fontFamily: 'Trap, sans-serif' }}>
      <head>
        <link rel="icon" href="/metaicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/metaicon.svg" />
        <link rel="apple-touch-icon" href="/metaicon.svg" />
      </head>
      <body className="min-h-screen bg-white">
        <ErrorBoundary>
          {children}
          <FloatingWhatsApp />
        </ErrorBoundary>
      </body>
    </html>
  )
}