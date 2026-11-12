import Link from "next/link"
import { bhkConfigs } from "@/data/bhk"
import { serviceConfigs } from "@/data/services-v2"
import { buildMetadata } from "@/lib/seo-v2"
import { formatRange, formatUnit } from "@/lib/format"
import { localBusinessSchema, faqSchema } from "@/lib/schema"
import { StructuredData } from "@/components/seo/structured-data"
import { CtaBanner, HeroStats, FaqList } from "@/components/content/page-sections"
import { GoogleReviews } from "@/components/content/google-reviews"
import BeforeAfterSlider from "@/components/content/before-after-slider"
import { RecentProjects, BhkPriceGrid } from "@/components/content/home-sections"
import { siteConfig } from "@/config/site"
import { buildWhatsAppLink } from "@/lib/whatsapp"
export const metadata = buildMetadata({ seo: { title: "Interior Designers in Ghaziabad, Noida & Greater Noida", description: "Walls N Interior publishes clear home-interior price ranges for Ghaziabad, Noida and Greater Noida. Compare 2BHK, 3BHK and 4BHK options.", primaryKeyword: "interior designers in ghaziabad" }, path: "/" })
// Objection handling before the final CTA. Every answer is grounded in something
// the site already asserts elsewhere (data/bhk.ts ranges and exclusions, the 3D
// fees in ThreeDDesignSection, config/site.ts areas) — nothing here states a
// business fact the repo cannot back up. Payment staging and warranty terms are
// deliberately absent: see CONTENT-TODO.md items 7 and 9.
const weekSpan = { min: Math.min(...bhkConfigs.map(c => c.timeline.weeks.min)), max: Math.max(...bhkConfigs.map(c => c.timeline.weeks.max)) }
const HOME_FAQS = [
  { q: "Do I have to share my phone number to see prices?", a: "No. Every range on this site, and the cost calculator, works without an enquiry. Contact us only once the scope and the number make sense to you." },
  { q: "Are the prices shown here final?", a: "No. They are indicative market benchmarks until we measure your site and confirm scope. You receive an itemised quotation before any work starts, and that quotation is what you are held to." },
  { q: "What is not included in the range?", a: "Civil and structural work, plumbing relocation, appliances, sanitaryware, loose furniture, curtains and decor sit outside the quoted range unless separately itemised. Each tier page lists its own exclusions in full." },
  { q: "How long does a full-home interior take?", a: `Plan for ${weekSpan.min}–${weekSpan.max} weeks after design sign-off, depending on the size of the home. Site readiness, civil work and custom finishes can extend the programme, and occupied flats usually take longer.` },
  { q: "Are 3D designs included?", a: "No. 3D drawings are an optional paid service charged separately from execution, so you are not paying for visuals you did not ask for. Full-home 3D design starts at ₹40,000 and individual modules are quoted by size and number of views." },
  { q: "Which areas do you work in?", a: `We work across ${siteConfig.areas.join(", ")}, and our studio is at ${siteConfig.address.locality}, ${siteConfig.address.city} — so site visits and coordination are local rather than routed through a call centre.` },
]

export default function HomePage() {
  return <><StructuredData data={[localBusinessSchema(), faqSchema(HOME_FAQS)]} /><main>
  <section className="home-hero"><div><p className="eyebrow">Ghaziabad · Noida · Greater Noida</p><h1>Beautiful interiors.<br />Prices you can see.</h1><p className="lead">Full-home design and execution with published indicative ranges, clear inclusions and an itemised path from measurement to handover.</p><div className="button-row"><Link className="button button-primary" href="#interiors">See home prices</Link><Link className="button button-secondary" href="/tools/cost-calculator">Estimate my cost</Link></div><HeroStats /><div className="hero-proof"><span>Estimated prices shown before enquiry</span><a data-cta="hero-whatsapp" href={buildWhatsAppLink({ number: siteConfig.whatsapp, text: "Hi Walls N Interior, I'd like a one-tap estimate for my home interiors." })} target="_blank" rel="noreferrer">One-tap WhatsApp</a></div></div><BeforeAfterSlider /></section>
  <RecentProjects />
  <GoogleReviews />
  <section className="content-section" id="interiors"><div className="section-heading"><p className="eyebrow">Start with your floor plan</p><h2>Full-home interior price ranges</h2><p>Benchmark the whole project before comparing finishes and modules.</p></div><BhkPriceGrid ctaPrefix="home-bhk" /></section>
  <section className="content-section tint"><div className="section-heading"><p className="eyebrow">Individual modules</p><h2>Build only what you need</h2></div><div className="card-grid">{serviceConfigs.map(item => <Link className="info-card link-card" href={`/services/${item.slug}`} key={item.slug}><h3>{item.name}</h3><p>{item.intro}</p><p className="tier-price">{formatRange(item.headlinePrice)} {item.headlinePrice.unit !== "total" && <small>{formatUnit(item.headlinePrice.unit)}</small>}</p><span className="text-link">View scope →</span></Link>)}</div></section>
  <section className="content-section split"><div><p className="eyebrow">Why this site is different</p><h2>No quote wall between you and the price</h2><p className="lead">Most interior firms make you surrender your phone number before showing a number. Here, the estimate comes first. You contact us only when the scope makes sense.</p><Link className="button button-primary" href="/cost">Browse cost guides</Link></div><div className="principles"><article><strong>01</strong><h3>Published ranges</h3><p>See a realistic starting point before a sales conversation.</p></article><article><strong>02</strong><h3>Clear exclusions</h3><p>Understand what is outside each package and avoid surprise add-ons.</p></article><article><strong>03</strong><h3>Local coordination</h3><p>Meet at our Crossings Republik studio and plan around your actual site.</p></article></div></section>
  <section className="content-section" id="faq"><div className="section-heading"><p className="eyebrow">Before you enquire</p><h2>The questions we get asked most</h2></div><FaqList faqs={HOME_FAQS} /></section>
  <CtaBanner heading="Send your floor plan. Get a clearer number." subheading="No obligation and no hidden estimate gate." />
  </main></> }
