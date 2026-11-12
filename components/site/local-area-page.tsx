import Link from "next/link"
import { Phone } from "lucide-react"
import { StructuredData } from "@/components/seo/structured-data"
import BeforeAfterSlider from "@/components/content/before-after-slider"
import { GoogleReviews } from "@/components/content/google-reviews"
import { RecentProjects, BhkPriceGrid } from "@/components/content/home-sections"
import WhatsAppIcon from "@/components/site/whatsapp-icon"
import { breadcrumbsSchema, localBusinessSchema } from "@/lib/schema"
import { buildWhatsAppLink, areaDesignerMessage } from "@/lib/whatsapp"
import { aggregate } from "@/data/testimonials"
import { siteConfig } from "@/config/site"

type LocalAreaPageProps = {
  area: string
  intro: string
  localNote: string
}

const services = [
  {
    title: "Home interiors",
    description: "Living rooms, bedrooms, kitchens, storage, lighting, colour, and finishes planned as one cohesive home.",
  },
  {
    title: "Office interiors",
    description: "Practical, welcoming workplaces designed around your team, workflow, brand, and available floor area.",
  },
  {
    title: "Renovation",
    description: "Layout improvements and finish upgrades for spaces that need a considered refresh rather than a complete rebuild.",
  },
]

/**
 * Landing page for paid "interior designer in <city>" traffic: the location-matched
 * H1, then the homepage's proof (before/after, projects, prices, reviews). Every
 * number shown here is read from the same data the homepage uses.
 */
export function LocalAreaPage({ area, intro, localNote }: LocalAreaPageProps) {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Service areas" }, { label: area }]
  const whatsappHref = buildWhatsAppLink({ number: siteConfig.whatsapp, text: areaDesignerMessage(area) })
  const trust = [
    `${aggregate.rating.toFixed(1)}★ on Google`,
    `${aggregate.reviewCount} reviews`,
    siteConfig.projectsCompleted && `${siteConfig.projectsCompleted}+ homes delivered`,
    `Studio in ${siteConfig.address.locality}`,
  ].filter(Boolean).join(" · ")

  return (
    <><StructuredData data={[localBusinessSchema([area]), breadcrumbsSchema(crumbs)]} /><main>
      <section className="home-hero area-hero">
        <div data-cta-location="area_hero">
          <p className="eyebrow">Walls N Interior</p>
          <h1>Interior Designer in {area}</h1>
          <p className="lead">Full-home interiors and modular work for {area} apartments, with prices you can see before you book.</p>
          <p className="area-trust">{trust}</p>
          <div className="button-row">
            <a className="button button-whatsapp" data-cta="area-hero-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp us</a>
            <a className="button button-secondary" data-cta="area-hero-call" href={`tel:${siteConfig.phone}`}><Phone className="action-icon" aria-hidden="true" />Call</a>
          </div>
          <p className="area-alt-link"><Link className="text-link" href="/contact">or book a consultation</Link></p>
        </div>
        <BeforeAfterSlider />
      </section>

      <RecentProjects />

      <section className="content-section" data-cta-location="area_prices">
        <div className="section-heading"><p className="eyebrow">Indicative ranges</p><h2>What a {area} home typically costs</h2><p>Full-home price ranges by floor plan. You get an itemised quotation before any work starts.</p></div>
        <BhkPriceGrid ctaPrefix="area-bhk" />
        <div className="section-cta"><Link className="button button-secondary" data-cta="area-cost-calculator" href="/tools/cost-calculator">Estimate my cost</Link></div>
      </section>

      <GoogleReviews />

      <section className="content-section tint split area-studio">
        <div>
          <p className="eyebrow">Local studio</p>
          <h2>A nearby design studio</h2>
          <p className="lead">{localNote}</p>
        </div>
        <div className="info-card">
          <p><strong>{siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.city} {siteConfig.address.postalCode}</strong></p>
          <p className="muted">Open daily, {siteConfig.hours[0].opens}–{siteConfig.hours[0].closes}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">What we do</p><h2>Interior services for your space</h2><p>{intro}</p></div>
        <div className="card-grid">
          {services.map(service => (
            <article className="info-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split">
        <div>
          <p className="eyebrow">Process</p>
          <h2>How the process works</h2>
          <div className="principles">
            <article><strong>01</strong><h3>Consultation</h3><p>Tell us about the space, your priorities, style, and budget.</p></article>
            <article><strong>02</strong><h3>Design direction</h3><p>We develop a practical layout and a clear visual direction.</p></article>
            <article><strong>03</strong><h3>Details and execution</h3><p>Materials, finishes, and site work are coordinated around the approved plan.</p></article>
          </div>
        </div>
        <div className="info-card area-closing" data-cta-location="area_closing">
          <h2>Planning a project in {area}?</h2>
          <p>Share your floor plan, a few photos, and what you want to change. We&apos;ll help you decide the right next step.</p>
          <div className="button-row"><a className="button button-whatsapp" data-cta="area-closing-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp us</a></div>
          <p className="area-alt-link"><Link className="text-link" href="/contact">or book a consultation</Link></p>
        </div>
      </section>
    </main></>
  )
}
