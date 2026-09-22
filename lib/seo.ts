import type { Metadata } from "next"

export const siteConfig = {
  name: "Walls N Interior",
  description:
    "Interior design studio in Crossings Republik, Ghaziabad for elegant homes, offices, renovations, and turnkey interiors.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wallsninterior.com").replace(/\/$/, ""),
  ogImage: "/images/hero-1.png",
  defaultKeywords: [
    "interior designer in Ghaziabad",
    "interior designer in Crossings Republik",
    "interior designer near me",
    "interior decorators near me",
    "turnkey interior designer",
    "home interior design",
    "office interior design",
    "renovation",
    "Noida",
    "Greater Noida",
  ],
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
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteConfig.url}/#business`,
    name: brand,
    url: siteConfig.url,
    image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    logo: new URL("/logo.png", siteConfig.url).toString(),
    description: siteConfig.description,
    telephone: phone,
    email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    areaServed: cities.map((c) => ({ "@type": "Place", name: c })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "22:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior design services",
      itemListElement: ["Home interior design", "Office interior design", "Renovation", "Turnkey interiors"].map(
        (name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        }),
      ),
    },
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
