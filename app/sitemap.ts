import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { bhkConfigs } from "@/data/bhk"
import { serviceConfigs } from "@/data/services-v2"
import { costPages } from "@/data/costPages"
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const fixed = ["", "/services", "/cost", "/tools/cost-calculator", "/areas/ghaziabad", "/areas/greater-noida", "/areas/noida", "/areas/crossings-republik", "/projects", "/projects/contemporary-family-home", "/projects/shrishti-interior-work", "/about", "/contact", "/process"]
  return [
    ...fixed.map((path, index) => ({ url: `${siteConfig.url}${path || "/"}`, lastModified: now, changeFrequency: path.startsWith("/projects") ? "weekly" as const : "monthly" as const, priority: index === 0 ? 1 : path.startsWith("/areas/") ? .9 : .7 })),
    ...bhkConfigs.map(item => ({ url: `${siteConfig.url}/interiors/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .9 })),
    ...serviceConfigs.map(item => ({ url: `${siteConfig.url}/services/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .8 })),
    ...costPages.map(item => ({ url: `${siteConfig.url}/cost/${item.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .9 })),
  ]
}
