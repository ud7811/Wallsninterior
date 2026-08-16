import type { BhkConfig, PriceRange, PriceTier, RoomCostLine } from "@/types/content"

const UPDATED = "2026-08-16"
const range = (min: number, max: number, unit: PriceRange["unit"] = "total"): PriceRange => ({ min, max, unit, verified: false, updatedAt: UPDATED })

function tiers(essential: readonly [number, number], comfort: readonly [number, number], premium: readonly [number, number]): PriceTier[] {
  const shared = {
    Essential: { tagline: "Practical, rental-ready essentials", bestFor: "First homes and cost-conscious fitouts", materials: { ply: "BWR plywood — CenturyPly / Greenply / equivalent", finish: "Matte laminate", hardware: "Standard soft-close" } },
    Comfort: { tagline: "Our balanced full-home specification", bestFor: "Families planning to stay long term", materials: { ply: "BWP plywood — CenturyPly / Greenply / Kitply", finish: "Acrylic and laminate", hardware: "Hettich soft-close" } },
    Premium: { tagline: "Detailed design and premium finishes", bestFor: "Homes where finish and customisation lead", materials: { ply: "BWP plywood / HDHMR — CenturyPly / Greenply / Action TESA", finish: "PU, veneer and glass", hardware: "Hafele / Blum" } },
  } as const
  return ([
    ["Essential", essential, ["Modular kitchen", "Bedroom wardrobes", "Living-room TV unit", "Living and dining false ceiling", "Interior painting", "Basic lighting coordination"], ["Civil or structural work", "Appliances and sanitaryware", "Loose furniture and curtains"]],
    ["Comfort", comfort, ["Enhanced modular kitchen storage", "Full-height organised wardrobes", "Designed TV and foyer units", "Multi-room false ceiling", "Feature finishes and painting", "Lighting and electrical planning"], ["Structural alterations", "Kitchen appliances", "Loose furniture and decor"]],
    ["Premium", premium, ["Premium kitchen hardware and accessories", "Custom wardrobes with organisers", "Feature wall panelling", "Designed ceilings and profile lighting", "Study or pooja unit", "Bathroom vanity and balcony details"], ["Structural alterations", "Imported appliances", "Art, decor and soft furnishings"]],
  ] as const).map(([name, values, includes, excludes]) => ({ name, ...shared[name], range: range(values[0], values[1]), includes: [...includes], excludes: [...excludes] }))
}

const roomLines = (bedrooms: number): RoomCostLine[] => [
  { room: "Modular kitchen", range: range(100000, 450000), note: "Layout and finish drive the range" },
  { room: `${bedrooms} bedroom wardrobe${bedrooms > 1 ? "s" : ""}`, range: range(120000 * bedrooms, 260000 * bedrooms) },
  { room: "Living and dining", range: range(120000, 400000), note: "TV unit, ceiling and feature finishes" },
  { room: "Painting and electrical", range: range(80000, 230000) },
]

const faq = (label: string, price: string, weeks: string) => [
  { q: `How much does ${label} interior design cost?`, a: `${label} full-home interiors currently benchmark at ${price}. The final figure depends on carpet area, scope, material and hardware choices.` },
  { q: `How long does a ${label} interior take?`, a: `Plan for ${weeks} after design sign-off. Site readiness, civil work and custom finishes can extend the programme.` },
  { q: "Are these prices final?", a: "No. They are indicative market benchmarks until we measure the site and confirm your scope. You receive an itemised quotation before work starts." },
  { q: "What is normally excluded?", a: "Structural work, plumbing relocation, appliances, sanitaryware, loose furniture, curtains and decor are excluded unless separately itemised." },
  { q: "Can the work be done in phases?", a: "Yes. Kitchen and wardrobes can be prioritised first, with living areas and decorative finishes completed later." },
  { q: "Do I receive designs before production?", a: "Yes. Layout and visual direction are approved before modular units move into production." },
  { q: "Can you work in occupied flats?", a: "Yes, with a room-by-room plan and dust controls. It usually increases the timeline." },
  { q: "How do I get an exact quote?", a: "Share your floor plan, locality and preferred scope on WhatsApp, then schedule a site measurement." },
]

const configs = [
  { slug: "2bhk-flat-interior-design", label: "2 BHK", bedrooms: 2, bathrooms: 2, area: [650, 1050], headline: [250000, 1200000], tier: [[250000, 450000], [450000, 750000], [750000, 1200000]], weeks: [5, 7], desc: "2BHK flat interior design across Ghaziabad and Noida with open indicative pricing, room-wise costs, timelines and a free site consultation." },
  { slug: "3bhk-flat-interior-design", label: "3 BHK", bedrooms: 3, bathrooms: 2, area: [1050, 1650], headline: [450000, 1800000], tier: [[450000, 700000], [700000, 1100000], [1100000, 1800000]], weeks: [6, 9], desc: "3BHK flat interior design in Ghaziabad and Noida from an indicative ₹4.5L–₹18L. Compare tiers, room costs and timelines before you enquire." },
  { slug: "4bhk-flat-interior-design", label: "4 BHK", bedrooms: 4, bathrooms: 3, area: [1600, 2600], headline: [900000, 3000000], tier: [[900000, 1400000], [1400000, 2100000], [2100000, 3000000]], weeks: [8, 12], desc: "4BHK flat interior design across Ghaziabad and Noida with indicative ₹9L–₹30L pricing, detailed inclusions and a transparent project timeline." },
] as const

export const bhkConfigs: BhkConfig[] = configs.map(item => ({
  slug: item.slug, label: item.label, bedrooms: item.bedrooms, bathrooms: item.bathrooms,
  typicalCarpetArea: { min: item.area[0], max: item.area[1] },
  seo: { title: `${item.label} Interior Design in Ghaziabad | Wallsninterior`, description: item.desc, primaryKeyword: `${item.label.toLowerCase()} interior design ghaziabad` },
  h1: `${item.label} Flat Interior Design in Ghaziabad & Noida`,
  intro: `A complete ${item.label} interior fitout currently benchmarks at ₹${item.headline[0] / 100000}L–₹${item.headline[1] / 100000}L, depending on carpet area, scope, finish and hardware. We show the range before consultation so you can compare options without a hidden-price sales process.`,
  headlinePrice: range(item.headline[0], item.headline[1]), tiers: tiers(item.tier[0], item.tier[1], item.tier[2]), roomBreakdown: roomLines(item.bedrooms),
  timeline: { weeks: { min: item.weeks[0], max: item.weeks[1] }, phases: [
    { week: "Week 0", label: "Measure and design", detail: "Site measurement, scope, layout, visual direction and itemised quotation." },
    { week: "Weeks 1–3", label: "Production and site preparation", detail: "Modular production runs alongside approved ceiling, electrical and surface preparation." },
    { week: "Final weeks", label: "Installation and handover", detail: "Installation, finishing, joint inspection, snag correction and cleaning." },
  ] },
  relatedServices: ["modular-kitchen", "wardrobes", "tv-units", "false-ceiling"], commonInSocieties: [], featuredProjects: [],
  costPageSlug: `${item.label.split(" ")[0]}bhk-interior-design-cost-ghaziabad`,
  faqs: faq(item.label, `₹${item.headline[0] / 100000}L–₹${item.headline[1] / 100000}L`, `${item.weeks[0]}–${item.weeks[1]} weeks`),
  cta: { heading: `Get an itemised range for your ${item.label}`, subheading: "Send your floor plan and scope. We will explain the price drivers before you decide.", primaryLabel: "Get Free Quote", secondaryLabel: "WhatsApp Us" },
}))
