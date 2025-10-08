import type { Metadata } from 'next'
import { inter, interDisplay } from './fonts'
import './globals.css'
import '../styles/fonts.css'
import '../styles/optimized-icons.css'
import FloatingWhatsApp from '@/components/floating-whatsapp'
import ErrorBoundary from '@/components/error-boundary'
import '@/lib/error-handler'
import IntegratedNavbar from '@/components/integrated-navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'LivingTech Creative',
  description: 'We create stunning, high-performance websites that don\'t ghost you after launch. Your success is our priority, from concept to launch and beyond.',
  generator: 'Next.js',
  icons: {
    icon: '/metaicon.svg',
    shortcut: '/metaicon.svg',
    apple: '/metaicon.svg',
  },
  openGraph: {
    title: 'LivingTech Creative',
    description: 'We create stunning, high-performance websites that don\'t ghost you after launch. Your success is our priority, from concept to launch and beyond.',
    url: 'https://livingtechcreative.com',
    siteName: 'LivingTech Creative',
    images: [
      {
        url: '/images/livtechlogo.svg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivingTech Creative',
    description: 'We create stunning, high-performance websites that don\'t ghost you after launch. Your success is our priority, from concept to launch and beyond.',
    images: ['/images/livtechlogo.svg'],
  },
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
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className="min-h-screen bg-white md:pb-0 pb-24">
        <ErrorBoundary>
          <IntegratedNavbar />
          {children}
          <FloatingWhatsApp />
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}