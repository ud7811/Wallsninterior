import type { PriceRange, ServiceConfig } from "@/types/content"
const UPDATED = "2026-08-16"
const price = (min: number, max: number, unit: PriceRange["unit"]): PriceRange => ({ min, max, unit, verified: false, updatedAt: UPDATED })
const commonMaterials = [
  { name: "BWP plywood", category: "core" as const, pros: ["Moisture resistant", "Strong screw holding"], cons: ["Costs more than MDF"], priceImpact: "mid" as const },
  { name: "Laminate", category: "finish" as const, pros: ["Durable", "Wide colour range"], cons: ["Visible edge banding"], priceImpact: "budget" as const },
  { name: "Soft-close hardware", category: "hardware" as const, pros: ["Quieter use", "Reduced impact"], cons: ["Brand affects price"], priceImpact: "mid" as const },
]
const raw = [
  ["modular-kitchen", "Modular Kitchen", "module", "₹1L–₹5L", price(100000, 500000, "total"), "Plan a modular kitchen around your room width, cooking pattern, storage and appliance positions—not a catalogue image."],
  ["wardrobes", "Wardrobes", "module", "₹1,200–₹2,800/sq ft", price(1200, 2800, "per_sqft"), "Compare wardrobe cores, shutters, internal storage and hardware with a transparent rate range."],
  ["tv-units", "TV Units", "module", "₹35K–₹2L", price(35000, 200000, "total"), "Designed TV storage and feature walls that balance wiring, viewing height, display and closed storage."],
  ["false-ceiling", "False Ceiling", "finish", "₹80–₹150/sq ft", price(80, 150, "per_sqft"), "Plan ceiling levels and lighting together so the room feels considered without losing unnecessary height."],
] as const

export const serviceConfigs: ServiceConfig[] = raw.map(([slug, name, category, shownPrice, headlinePrice, intro]) => ({
  slug, name, category, headlinePrice, intro,
  seo: { title: `${name} in Ghaziabad & Noida | Wallsninterior`, description: `${name} design and execution in Ghaziabad and Noida with indicative ${shownPrice} pricing, material options, clear exclusions and a free consultation.`, primaryKeyword: `${name.toLowerCase()} ghaziabad` },
  h1: `${name} in Ghaziabad & Noida`, materials: commonMaterials,
  process: [{ step: 1, title: "Measure", detail: "We record dimensions, services and constraints." }, { step: 2, title: "Design and quote", detail: "You review the layout, finish direction and itemised scope." }, { step: 3, title: "Produce and install", detail: "Approved work moves to production and coordinated installation." }],
  gallery: [], relatedServices: raw.filter(row => row[0] !== slug).slice(0, 3).map(row => row[0]), relatedBhk: ["2bhk-flat-interior-design", "3bhk-flat-interior-design", "4bhk-flat-interior-design"],
  faqs: [
    { q: `What does ${name.toLowerCase()} cost?`, a: `The current indicative range is ${shownPrice}. Site dimensions, material, hardware and complexity determine the final quotation.` },
    { q: "Is site measurement included?", a: "Yes. A site measurement is required before a final itemised quotation." },
    { q: "Are materials shown before approval?", a: "Yes. Core, finish and hardware choices are identified before production." },
    { q: "What is excluded from the quoted range?", a: "Civil changes, appliances, plumbing relocation and work outside the agreed itemised scope are excluded unless added separately." },
  ],
  cta: { heading: `Plan your ${name.toLowerCase()} with a clear scope`, primaryLabel: "Get Free Quote", secondaryLabel: "WhatsApp Us" },
}))
