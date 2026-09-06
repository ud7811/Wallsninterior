import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
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
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body><StructuredData data={[organizationSchema(), websiteSchema()]} />{children}</body>
    </html>
  )
}
