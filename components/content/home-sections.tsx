import Link from "next/link"
import Image from "next/image"
import { bhkConfigs } from "@/data/bhk"
import { formatRange } from "@/lib/format"

// Shared by the homepage and the /areas/* landing pages, so both show the same
// proof and the same prices from data/bhk.ts.

const projects = [
  { href: "/projects/contemporary-family-home", image: "/images/projects/contemporary-family-home/04.webp", alt: "Warm contemporary living room in a completed family home", tag: "Photo story · 36 images", title: "Contemporary Family Home", blurb: "A complete apartment interior balancing warm neutrals, practical storage and individual bedroom personalities.", cta: "Explore the home" },
  { href: "/projects/shrishti-interior-work", image: "/images/projects/shrishti-interior-work-poster.jpg", alt: "Shrishti completed interior walkthrough preview", tag: "Video walkthrough · 24 sec", title: "Shrishti Interior", blurb: "A candid walkthrough showing the completed finishes, fitted furniture and room-to-room flow.", cta: "Watch the walkthrough" },
  { href: "/projects/gaur-saundaryam", image: "/images/projects/gaur-saundaryam-poster.jpg", alt: "Gaur Saundaryam completed interior walkthrough preview", tag: "Video walkthrough · 38 sec", title: "Gaur Saundaryam", blurb: "A completed-home walkthrough featuring elegant wall details, bespoke storage and warm lighting.", cta: "Watch the walkthrough" },
]

export function RecentProjects() {
  return <section className="content-section"><div className="section-heading"><p className="eyebrow">Recent work</p><h2>Real homes we&rsquo;ve finished</h2><p>Photo stories and on-site walkthroughs from completed Walls N Interior projects.</p></div><div className="card-grid">{projects.map(p => <Link className="project-feature-card" href={p.href} key={p.href}><div className="project-card-media"><Image src={p.image} alt={p.alt} fill sizes="(max-width:640px) 100vw,(max-width:960px) 50vw,33vw" /></div><div className="project-card-copy"><div><p className="eyebrow">{p.tag}</p><h3>{p.title}</h3><p>{p.blurb}</p></div><span className="text-link">{p.cta} →</span></div></Link>)}</div><div className="section-cta"><Link className="button button-secondary" href="/projects">See all projects</Link></div></section>
}

/** The 2/3/4 BHK price cards. `ctaPrefix` keeps each page's cta_id distinct. */
export function BhkPriceGrid({ ctaPrefix }: { ctaPrefix: string }) {
  return <div className="bhk-grid">{bhkConfigs.map(item => <Link className="bhk-card" data-cta={`${ctaPrefix}-${item.label.split(" ")[0]}`} href={`/interiors/${item.slug}`} key={item.slug}><div><p className="eyebrow">{item.timeline.weeks.min}–{item.timeline.weeks.max} week plan</p><h3>{item.label}</h3><p>{item.bedrooms} bedrooms · {item.bathrooms} bathrooms</p></div><div><p className="tier-price">{formatRange(item.headlinePrice)}</p><p className="price-note">Indicative range</p></div><span className="text-link">Compare all three tiers →</span></Link>)}</div>
}
