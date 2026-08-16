import type { CostPageConfig, PriceRange } from "@/types/content"
import { bhkConfigs } from "@/data/bhk"
const UPDATED = "2026-08-16"
const range = (min: number, max: number): PriceRange => ({ min, max, unit: "total", verified: false, updatedAt: UPDATED })

export const costPages: CostPageConfig[] = bhkConfigs.map(bhk => ({
  slug: bhk.costPageSlug,
  seo: { title: `${bhk.label} Interior Cost Ghaziabad 2026 | Wallsninterior`, description: `${bhk.label} interior design cost in Ghaziabad with indicative tier pricing, room-wise tables, local price drivers and practical ways to control your budget.`, primaryKeyword: `${bhk.label.toLowerCase()} interior design cost ghaziabad` },
  h1: `${bhk.label} Interior Design Cost in Ghaziabad (2026)`,
  snippetAnswer: `A ${bhk.label} interior in Ghaziabad currently costs about ₹${bhk.headlinePrice.min / 100000}L–₹${bhk.headlinePrice.max / 100000}L. The final total depends on carpet area, modules selected, core material, shutter finish, hardware, ceiling and electrical scope. These are indicative market benchmarks until your site is measured and the business confirms its final rate card.`,
  summaryTable: bhk.tiers.map(tier => ({ label: tier.name, range: tier.range, note: tier.bestFor })),
  localityVariation: [
    { localitySlug: "crossings-republik", localityName: "Crossings Republik", range: range(bhk.headlinePrice.min, bhk.headlinePrice.max), reason: "Varied apartment sizes and finish expectations; studio coordination is local." },
    { localitySlug: "indirapuram", localityName: "Indirapuram", range: range(Math.round(bhk.headlinePrice.min * 1.05), Math.round(bhk.headlinePrice.max * 1.05)), reason: "Renovation constraints and older occupied flats can add site-preparation work." },
  ],
  roomBreakdown: bhk.roomBreakdown,
  costDrivers: [
    { factor: "Carpet area and storage volume", impact: "increases", detail: "More running feet of kitchen and wardrobe work increases material and hardware." },
    { factor: "Laminate rather than PU or veneer", impact: "decreases", detail: "A durable laminate specification controls finish cost without reducing core quality." },
    { factor: "Civil and plumbing changes", impact: "increases", detail: "Demolition, debris, waterproofing and service relocation sit outside modular work." },
  ],
  caseStudies: [],
  savingTips: [
    { tip: "Prioritise kitchen and wardrobes", savesApprox: "Avoids low-use decorative units", tradeoff: "Living spaces remain simpler initially" },
    { tip: "Use one finish family", savesApprox: "Reduces production complexity", tradeoff: "Less finish variation" },
  ],
  relatedBhk: bhk.slug, faqs: bhk.faqs.slice(0, 6), updatedAt: UPDATED,
}))
