import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { sanityFetch } from '@/lib/sanity'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import { SiteSettings } from '@/lib/types'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Fitzroy Catering — Western Sydney',
    template: '%s | Fitzroy Catering',
  },
  description: 'Professional, reliable, restaurant-quality catering for corporate, community, and private events across Western Sydney. Based in Seven Hills.',
  keywords: ['catering Western Sydney', 'corporate catering Seven Hills', 'event catering Blacktown', 'party catering Parramatta', 'catering Bella Vista', 'Fitzroy Catering'],
  openGraph: {
    type: 'website',
    siteName: 'Fitzroy Catering',
    title: 'Fitzroy Catering — Restaurant-Quality Catering for Western Sydney',
    description: 'Professional, reliable catering for corporate, community, and private events across Western Sydney.',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    revalidate: 300,
  }).catch(() => null)

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar promoBannerText={settings?.promotionBanner} />
        <main>{children}</main>
        <Footer settings={settings} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
