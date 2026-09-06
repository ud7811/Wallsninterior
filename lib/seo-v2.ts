import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import type { ImageAsset, SeoBlock } from "@/types/content"

export function canonical(path = "/") { return new URL(path, `${siteConfig.url}/`).toString() }
export function buildMetadata({ seo, path, images, noindex = false }: { seo: SeoBlock; path: string; images?: ImageAsset[]; noindex?: boolean }): Metadata {
  const url = canonical(path)
  const image = images?.find((item) => item.isReal)?.src ?? seo.ogImage ?? "/images/hero-1.png"
  return {
    title: seo.title, description: seo.description, alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    keywords: [seo.primaryKeyword, "interior designer near me", "home interiors", "turnkey interior design"],
    category: "Interior Design",
    openGraph: { title: seo.title, description: seo.description, url, siteName: siteConfig.name, locale: "en_IN", type: "website", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [image] },
  }
}
