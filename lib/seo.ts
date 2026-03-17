import type { Metadata } from "next"

export const siteConfig = {
  name: "Wallsninterior",
  description: "Premium interior design in Noida, Greater Noida, and Ghaziabad.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/hero-1.png",
  twitter: "@urbanluxe",
  defaultKeywords: ["interior design", "Noida", "Greater Noida", "Ghaziabad", "premium interiors"],
}

export function createSeo({
  title,
  description,
  path = "/",
  images,
}: {
  title?: string
  description?: string
  path?: string
  images?: string[]
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name}`
  const url = new URL(path || "/", siteConfig.url).toString()
  const imgList = images && images.length ? images : [siteConfig.ogImage]

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: description || siteConfig.description,
    alternates: { canonical: url },
    keywords: siteConfig.defaultKeywords,
    openGraph: {
      title: fullTitle,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      images: imgList.map((src) => ({ url: src })),
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || siteConfig.description,
      images: imgList,
      creator: siteConfig.twitter,
    },
  }
}

export function localBusinessJsonLd({
  brand,
  phone,
  email,
  address,
  cities,
}: {
  brand: string
  phone: string
  email: string
  address: { streetAddress: string; addressLocality: string; postalCode: string; addressRegion: string; addressCountry: string }
  cities: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand,
    url: siteConfig.url,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    areaServed: cities.map((c) => ({ "@type": "City", name: c })),
  }
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  authorName: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [image],
    datePublished,
    dateModified: dateModified || datePublished,
    author: [{ "@type": "Person", name: authorName }],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }
}
