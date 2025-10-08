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
  metadataBase: new URL('https://livingtechcreative.com'),
  title: {
    default: 'LivingTech Creative - Web Development & Design Agency',
    template: '%s | LivingTech Creative'
  },
  description: 'We create stunning, high-performance websites that don\'t ghost you after launch. Your success is our priority, from concept to launch and beyond.',
  keywords: ['web development', 'web design', 'digital agency', 'website creation', 'LivingTech Creative'],
  authors: [{ name: 'LivingTech Creative' }],
  creator: 'LivingTech Creative',
  publisher: 'LivingTech Creative',
  
  // Icons - sesuai struktur folder /favicon/
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Manifest
  manifest: '/favicon/site.webmanifest',
  
  // Open Graph untuk sharing (card preview)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://livingtechcreative.com',
    siteName: 'LivingTech Creative',
    title: 'LivingTech Creative - Web Development & Design Agency',
    description: 'We create stunning, high-performance websites that don\'t ghost you after launch. Your success is our priority, from concept to launch and beyond.',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary',
    title: 'LivingTech Creative - Web Development & Design Agency',
    description: 'We create stunning, high-performance websites that don\'t ghost you after launch. Your success is our priority, from concept to launch and beyond.',
  },
  
  // Robots
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} font-sans`} style={{ fontFamily: 'Trap, sans-serif' }}>
      <head>
        {/* Meta tags tambahan untuk compatibility */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" content="#000000" />
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