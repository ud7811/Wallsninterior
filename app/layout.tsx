import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { siteConfig } from '@/config/site'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { StructuredData } from '@/components/seo/structured-data'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: "Interior Designers in Ghaziabad, Noida & Greater Noida | Walls N Interior",
  description: siteConfig.description,
  category: "Interior Design",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  other: { "geo.region": "IN-UP", "geo.placename": "Crossings Republik, Ghaziabad" },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN">
      <body>
        <StructuredData data={[organizationSchema(), websiteSchema()]} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
