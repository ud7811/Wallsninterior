import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { posts } from "@/data/posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const now = new Date().toISOString()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/portfolio`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/areas/noida`, lastModified: now },
    { url: `${base}/areas/greater-noida`, lastModified: now },
    { url: `${base}/areas/ghaziabad`, lastModified: now },
    ...projects.map((p) => ({ url: `${base}/portfolio/${p.slug}`, lastModified: p.publishedAt || now })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.publishedAt || now })),
  ]
}
