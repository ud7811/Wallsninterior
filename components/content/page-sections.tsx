import Link from "next/link"
import type { Faq } from "@/types/content"
import type { GooglePlaceReviews } from "@/lib/google-reviews"
import { siteConfig } from "@/config/site"
import WhatsAppIcon from "@/components/site/whatsapp-icon"

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) { return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, i) => <span key={item.label}>{i > 0 && <span aria-hidden> / </span>}{item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav> }
export function FaqList({ faqs }: { faqs: Faq[] }) { return <div className="faq-list">{faqs.map((faq, i) => <details key={faq.q} open={i === 0}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div> }
/**
 * Hero trust row. Every stat is conditional on real data — a Google rating we
 * actually fetched, or a count the owner confirmed in config/site.ts. Renders
 * nothing when none are available; the hero's existing proof line stands alone,
 * exactly as it did before.
 */
export function HeroStats({ reviews }: { reviews: GooglePlaceReviews | null }) {
  const stats: { value: string; label: string; href?: string }[] = []
  if (reviews) stats.push({ value: `★ ${reviews.rating.toFixed(1)}`, label: `${reviews.reviewCount} Google reviews`, href: reviews.mapsUri || undefined })
  if (siteConfig.projectsCompleted) stats.push({ value: `${siteConfig.projectsCompleted}+`, label: "homes delivered" })
  if (siteConfig.foundedYear) stats.push({ value: `Since ${siteConfig.foundedYear}`, label: "Ghaziabad & Noida" })

  if (stats.length === 0) return null
  return (
    <dl className="hero-stats">
      {stats.map(stat => (
        <div key={stat.label}>
          <dt>{stat.href ? <a href={stat.href} target="_blank" rel="noreferrer" data-cta="hero-google-rating">{stat.value}</a> : stat.value}</dt>
          <dd>{stat.label}</dd>
        </div>
      ))}
    </dl>
  )
}

export function CtaBanner({ heading, subheading }: { heading: string; subheading?: string }) {
  const message = encodeURIComponent("Hi Walls N Interior, I saw your published prices and would like an itemised estimate.")
  return <section className="cta-banner"><div><p className="eyebrow light">Clear scope. Clear price.</p><h2>{heading}</h2>{subheading && <p>{subheading}</p>}</div><div className="button-row"><Link className="button button-light" href="/contact">Get free quote</Link><a className="button button-whatsapp" href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp us</a></div></section>
}
export function ThreeDDesignSection() { const rates = [{ label: "2 BHK", price: "₹40,000" }, { label: "3 BHK", price: "₹47,000" }, { label: "4 BHK", price: "₹56,000" }]; return <section className="content-section three-d-section"><div className="section-heading"><p className="eyebrow">Optional 3D design</p><h2>See the layout before execution begins</h2><p className="lead">3D drawings are an additional paid service and are not included in the interior execution price. They help you review the complete design before materials move into production.</p></div><div className="three-d-layout"><div><h3>Why choose 3D drawings?</h3><ul className="three-d-benefits"><li>Understand room layout, circulation and furniture scale before work starts.</li><li>Compare colours, finishes, lighting and material combinations visually.</li><li>Review storage planning and resolve practical changes earlier.</li><li>Reduce misunderstandings between the homeowner, designer and execution team.</li><li>Approve a clearer design direction before the final BOQ and production drawings.</li></ul></div><div className="three-d-pricing"><p className="eyebrow">Full-home 3D design fee</p><div className="three-d-rate-grid">{rates.map(rate => <div className="three-d-rate" key={rate.label}><span>{rate.label}</span><strong>{rate.price}</strong></div>)}</div><p className="small">These fees are charged separately from execution, materials and installation.</p></div></div><div className="three-d-modules"><div><p className="eyebrow">Individual modules also available</p><h3>Commission only the drawings you need</h3></div><p>Separate 3D drawings can be prepared for a modular kitchen, wardrobe, TV unit, false ceiling, foyer, study unit, pooja unit and other custom furniture. Module pricing is quoted separately according to size, complexity and the number of views required.</p></div></section> }
export function PlaceholderImage({ label }: { label: string }) { return <div className="placeholder-image" role="img" aria-label={label}><span>Real project image pending</span><small>{label}</small></div> }
