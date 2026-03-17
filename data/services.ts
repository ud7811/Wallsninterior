export type Service = {
  slug: string
  title: string
  excerpt: string
  priceFrom?: number
  duration?: string
}

export const services: Service[] = [
  {
    slug: "interior-design",
    title: "Interior Design",
    excerpt: "End-to-end interior design for homes and offices.",
    priceFrom: 50000,
    duration: "4–12 weeks",
  },
  {
    slug: "renovation",
    title: "Renovation",
    excerpt: "Space planning, upgrades, and turnkey makeovers.",
    priceFrom: 150000,
    duration: "2–8 weeks",
  },
]
