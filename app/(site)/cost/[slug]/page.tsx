import Link from "next/link"
import { notFound } from "next/navigation"
import { costPages } from "@/data/costPages"
import { buildMetadata } from "@/lib/seo-v2"
import { articleSchema, breadcrumbsSchema, faqSchema } from "@/lib/schema"
import { formatINR, formatRange } from "@/lib/format"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs, CtaBanner, FaqList } from "@/components/content/page-sections"
import { RoomCostTable } from "@/components/content/pricing"

export function generateStaticParams() { return costPages.map(item => ({ slug: item.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = costPages.find(x => x.slug === slug); return item ? buildMetadata({ seo: item.seo, path: `/cost/${item.slug}` }) : {} }
export default async function CostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = costPages.find(x => x.slug === slug); if (!item) notFound(); const crumbs = [{ label: "Home", href: "/" }, { label: "Cost guides", href: "/cost" }, { label: item.h1 }]
  return <><StructuredData data={[articleSchema(item.h1, item.seo.description, `/cost/${item.slug}`, item.updatedAt), faqSchema(item.faqs), breadcrumbsSchema(crumbs)]} /><article>
    <header className="editorial-hero"><Breadcrumbs items={crumbs} /><p className="eyebrow">2026 price guide</p><h1>{item.h1}</h1><p className="snippet-answer">{item.snippetAnswer}</p><p className="price-note">Prices updated August 2026 · Indicative market benchmarks</p></header>
    <section className="content-section"><h2>Price at a glance</h2><div className="table-wrap"><table><thead><tr><th>Specification</th><th>Indicative range</th><th>Best for</th></tr></thead><tbody>{item.summaryTable.map(row => <tr key={row.label}><td>{row.label}</td><td className="number">{formatINR(row.range.min)} – {formatINR(row.range.max)}</td><td>{row.note}</td></tr>)}</tbody></table></div></section>
    <section className="content-section tint"><h2>Room-wise cost breakdown</h2><RoomCostTable lines={item.roomBreakdown} /></section>
    <section className="content-section"><h2>Why the price changes by locality</h2><div className="card-grid">{item.localityVariation.map(row => <article className="info-card" key={row.localitySlug}><h3>{row.localityName}</h3><p className="tier-price">{formatRange(row.range)}</p><p>{row.reason}</p></article>)}</div></section>
    <section className="content-section split"><div><h2>Cost drivers</h2>{item.costDrivers.map(d => <div className="driver" key={d.factor}><span className={d.impact}>{d.impact === "increases" ? "↑" : "↓"}</span><div><h3>{d.factor}</h3><p>{d.detail}</p></div></div>)}</div><div><h2>Control the budget</h2>{item.savingTips.map(t => <div className="info-card" key={t.tip}><h3>{t.tip}</h3><p>{t.savesApprox}</p><p className="small">Trade-off: {t.tradeoff}</p></div>)}{item.relatedBhk && <Link className="text-link" href={`/interiors/${item.relatedBhk}`}>See the full-home specification →</Link>}</div></section>
    <section className="content-section"><h2>Frequently asked questions</h2><FaqList faqs={item.faqs} /></section><CtaBanner heading="Get a measured, itemised estimate" subheading="Send your floor plan and preferred scope. We will explain each line before you decide." />
  </article></>
}
