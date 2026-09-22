export type Slug = string
export type Rupees = number
export type PriceUnit = "total" | "per_sqft" | "per_rft" | "per_unit"
export interface PriceRange { min: Rupees; max: Rupees; unit: PriceUnit; verified: boolean; updatedAt: string }
export interface AreaRange { min: number; max: number }
export interface Faq { q: string; a: string; tags?: string[] }
export interface SeoBlock { title: string; description: string; primaryKeyword: string; secondaryKeywords?: string[]; ogImage?: string }
export interface ImageAsset { src: string; alt: string; width: number; height: number; caption?: string; isReal: boolean }
export interface CtaBlock { heading: string; subheading?: string; primaryLabel: string; secondaryLabel?: string }
export type TierName = "Essential" | "Comfort" | "Premium"
export interface PriceTier { name: TierName; tagline: string; range: PriceRange; bestFor: string; includes: string[]; excludes: string[]; materials: { ply: string; finish: string; hardware: string } }
export interface RoomCostLine { room: string; range: PriceRange; note?: string }
export interface BhkConfig {
  slug: Slug; label: string; bedrooms: number; bathrooms: number; typicalCarpetArea: AreaRange; seo: SeoBlock; h1: string; intro: string;
  headlinePrice: PriceRange; tiers: PriceTier[]; roomBreakdown: RoomCostLine[];
  timeline: { weeks: { min: number; max: number }; phases: { week: string; label: string; detail: string }[] };
  relatedServices: Slug[]; commonInSocieties: Slug[]; featuredProjects: Slug[]; costPageSlug: Slug; faqs: Faq[]; cta: CtaBlock;
}
export interface KitchenLayout { name: "L-Shaped" | "U-Shaped" | "Parallel" | "Straight" | "Island"; description: string; suitsFlatTypes: string[]; minWidthFt?: number; priceRange: PriceRange; image?: ImageAsset }
export interface MaterialOption { name: string; category: "core" | "finish" | "hardware"; pros: string[]; cons: string[]; priceImpact: "budget" | "mid" | "premium"; rate?: PriceRange; warrantyYears?: number }
export interface ServiceConfig {
  slug: Slug; name: string; category: "module" | "room" | "finish" | "commercial"; seo: SeoBlock; h1: string; intro: string; headlinePrice: PriceRange;
  tiers?: PriceTier[]; layouts?: KitchenLayout[]; materials: MaterialOption[]; accessories?: { name: string; description: string; price: PriceRange }[];
  process: { step: number; title: string; detail: string; days?: number }[]; careInstructions?: string[]; warranty?: { years: number; covers: string[]; excludes: string[] };
  gallery: ImageAsset[]; relatedServices: Slug[]; relatedBhk: Slug[]; costPageSlug?: Slug; designIdeasSlug?: Slug; faqs: Faq[]; cta: CtaBlock;
}
export interface CostPageConfig {
  slug: Slug; seo: SeoBlock; h1: string; snippetAnswer: string; summaryTable: { label: string; range: PriceRange; note?: string }[];
  localityVariation: { localitySlug: Slug; localityName: string; range: PriceRange; reason: string }[]; roomBreakdown: RoomCostLine[];
  costDrivers: { factor: string; impact: "increases" | "decreases"; detail: string }[];
  caseStudies: { projectSlug: Slug; summary: string; actualRange: PriceRange }[]; savingTips: { tip: string; savesApprox: string; tradeoff: string }[];
  relatedBhk?: Slug; relatedService?: Slug; faqs: Faq[]; updatedAt: string;
}
export interface City { slug: Slug; name: string; state: string; seo: SeoBlock; h1: string; intro: string; localitySlugs: Slug[]; projectSlugs: Slug[]; priceContext: string; faqs: Faq[]; geo: { lat: number; lng: number } }
export interface Locality { slug: Slug; citySlug: Slug; name: string; seo: SeoBlock; intro: string; housingProfile: string; societySlugs: Slug[]; projectSlugs: Slug[]; priceRange: PriceRange; landmarks?: string[]; geo: { lat: number; lng: number }; faqs: Faq[] }
export interface FloorPlan { config: string; carpetAreaSqft: number; superAreaSqft?: number; layoutNotes: string; kitchenType: string; wardrobeNotes: string; planImage?: ImageAsset; estimatedCost: PriceRange }
export interface SocietyConfig { slug: Slug; name: string; builder?: string; localitySlug: Slug; citySlug: Slug; seo: SeoBlock; h1: string; intro: string; floorPlans: FloorPlan[]; completedProjects: Slug[]; logistics: { workPermitRequired: boolean; permitProcess?: string; workingHours?: string; serviceLiftBooking?: string; materialMovement?: string; depositRequired?: string }; priceTable: { config: string; range: PriceRange }[]; testimonialSlugs: Slug[]; faqs: Faq[]; geo: { lat: number; lng: number } }
export interface ProjectConfig { slug: Slug; title: string; seo: SeoBlock; bhkSlug: Slug; societySlug?: Slug; localitySlug: Slug; citySlug: Slug; carpetAreaSqft: number; budgetRange?: PriceRange; durationDays?: number; completedOn?: string; servicesUsed: Slug[]; brief: string; solution: string; materials: string[]; heroImage: ImageAsset; gallery: ImageAsset[]; beforeAfter?: { before: ImageAsset; after: ImageAsset; label: string }[]; testimonialSlug?: Slug }
export interface Testimonial { slug: Slug; clientName: string; societyName?: string; localityName?: string; bhkConfig?: string; rating: 1|2|3|4|5; quote: string; date: string; projectSlug?: Slug; source: "google" | "direct" | "justdial"; verified: boolean }
export interface DesignIdeaCategory { slug: Slug; name: string; seo: SeoBlock; intro: string; images: ImageAsset[]; relatedService: Slug; faqs: Faq[] }
export interface TeamMember { slug: Slug; name: string; role: string; bio: string; yearsExperience?: number; photo?: ImageAsset }
