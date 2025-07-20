import type { Metadata } from 'next'
import { inter, interDisplay } from './fonts'
import './globals.css'

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
    <html lang="en" className={`${inter.variable} ${interDisplay.variable} font-sans`}>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
