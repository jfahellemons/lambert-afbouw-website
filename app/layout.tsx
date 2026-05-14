import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Lambert Afbouw | Professional Renovation & Construction Services',
  description: 'Expert construction and renovation services in the Netherlands. Kitchen renovations, bathroom remodeling, commercial fit-outs, and more. Get a free consultation today.',
  keywords: ['renovation', 'construction', 'kitchen renovation', 'bathroom remodeling', 'Netherlands', 'Lambert Afbouw'],
  icons: {
    icon: '/helm.png',
    apple: '/helm.png',
  },
  openGraph: {
    title: 'Lambert Afbouw | Professional Renovation & Construction Services',
    description: 'Expert construction and renovation services in the Netherlands. Get a free consultation today.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="bg-background scroll-smooth">
      <body className={`${inter.className} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
