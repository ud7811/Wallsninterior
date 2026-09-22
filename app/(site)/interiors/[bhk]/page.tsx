import { notFound } from "next/navigation"
import { bhkConfigs } from "@/data/bhk"
import { buildMetadata } from "@/lib/seo-v2"
import { breadcrumbsSchema, faqSchema, serviceSchema } from "@/lib/schema"
import { formatArea } from "@/lib/format"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs, CtaBanner, FaqList, ThreeDDesignSection } from "@/components/content/page-sections"
import { PriceHero, PriceTierCards, RoomCostTable } from "@/components/content/pricing"
import Link from "next/link"

export function generateStaticParams() { return bhkConfigs.map(item => ({ bhk: item.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ bhk: string }> }) { const { bhk } = await params; const item = bhkConfigs.find(x => x.slug === bhk); return item ? buildMetadata({ seo: item.seo, path: `/interiors/${item.slug}` }) : {} }
export default async function BhkPage({ params }: { params: Promise<{ bhk: string }> }) {
  const { bhk } = await params; const item = bhkConfigs.find(x => x.slug === bhk); if (!item) notFound()
  const crumbs = [{ label: "Home", href: "/" }, { label: "Interiors", href: "/#interiors" }, { label: item.label }]
  return <><StructuredData data={[serviceSchema(item.h1, item.intro, `/interiors/${item.slug}`, item.headlinePrice), faqSchema(item.faqs), breadcrumbsSchema(crumbs)]} />
    <article><div className="page-hero"><div className="container-narrow"><Breadcrumbs items={crumbs} /><p className="eyebrow">Full-home interiors</p><h1>{item.h1}</h1><p className="lead">{item.intro}</p><p className="small">Typical carpet area: {formatArea(item.typicalCarpetArea.min, item.typicalCarpetArea.max)}</p></div><PriceHero range={item.headlinePrice} label="Indicative full-home range" /></div>
    <section className="content-section"><div className="section-heading"><p className="eyebrow">Choose your finish level</p><h2>Three clear specifications</h2><p>Every tier states what is included and excluded, with plywood and board brands agreed before production.</p><div className="brand-options" aria-label="Available plywood and board brands"><span>CenturyPly</span><span>Greenply</span><span>Kitply</span><span>Archidply</span><span>Action TESA</span></div><p className="small brand-note">Brand, grade and thickness depend on the selected tier and application. Your final BOQ records the exact approved specification.</p></div><PriceTierCards tiers={item.tiers} flatLabel={item.label} /></section>
    <section className="content-section tint"><div className="section-heading"><p className="eyebrow">Room-wise planning</p><h2>Where the budget goes</h2></div><RoomCostTable lines={item.roomBreakdown} /></section>
    <ThreeDDesignSection />
    <section className="content-section split"><div><p className="eyebrow">Timeline</p><h2>{item.timeline.weeks.min}–{item.timeline.weeks.max} weeks after sign-off</h2><div className="timeline">{item.timeline.phases.map(p => <div key={p.week}><span>{p.week}</span><div><h3>{p.label}</h3><p>{p.detail}</p></div></div>)}</div></div><div><p className="eyebrow">Go deeper</p><h2>Compare the cost first</h2><p>Our cost guide explains locality variation, material choices and room-wise ranges.</p><Link className="text-link" href={`/cost/${item.costPageSlug}`}>Read the {item.label} cost guide →</Link></div></section>
    <section className="content-section"><div className="section-heading"><p className="eyebrow">Questions before you start</p><h2>{item.label} interior FAQs</h2></div><FaqList faqs={item.faqs} /></section>
    <CtaBanner heading={item.cta.heading} subheading={item.cta.subheading} /></article></>
}
