import Image from "next/image"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo-v2"

export const metadata = buildMetadata({
  seo: {
    title: "Completed Interior Projects | Walls N Interior",
    description:
      "Explore completed home interiors and project walkthroughs by Walls N Interior across living rooms, kitchens, bedrooms and custom storage.",
    primaryKeyword: "completed interior projects",
  },
  path: "/projects",
})

export default function ProjectsPage() {
  return (
    <main>
      <section className="project-index-hero">
        <p className="eyebrow">Completed spaces</p>
        <h1>Homes shaped around the people who live in them.</h1>
        <p className="lead">
          Step inside finished interiors through detailed photo stories and honest site walkthroughs.
        </p>
      </section>
      <section className="project-index-grid">
        <Link className="project-feature-card" href="/projects/contemporary-family-home">
          <div className="project-card-media">
            <Image
              src="/images/projects/contemporary-family-home/04.webp"
              alt="Warm contemporary living room in a completed family home"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 68vw"
            />
          </div>
          <div className="project-card-copy">
            <div>
              <p className="eyebrow">Photo story · 36 images</p>
              <h2>Contemporary Family Home</h2>
              <p>
                A complete apartment interior balancing warm neutrals, practical storage and individual
                bedroom personalities.
              </p>
            </div>
            <span className="text-link">Explore the complete home →</span>
          </div>
        </Link>
        <Link className="project-feature-card project-feature-card-small" href="/projects/shrishti-interior-work">
          <div className="project-card-media">
            <Image
              src="/images/projects/shrishti-interior-work-poster.jpg"
              alt="Shrishti completed interior walkthrough preview"
              fill
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </div>
          <div className="project-card-copy">
            <div>
              <p className="eyebrow">Video walkthrough · 24 sec</p>
              <h2>Shrishti Interior</h2>
              <p>A candid walkthrough showing the completed finishes, fitted furniture and room-to-room flow.</p>
            </div>
            <span className="text-link">Watch the walkthrough →</span>
          </div>
        </Link>
        <Link className="project-feature-card project-feature-card-small" href="/projects/gaur-saundaryam">
          <div className="project-card-media">
            <Image
              src="/images/projects/gaur-saundaryam-poster.jpg"
              alt="Gaur Saundaryam completed interior walkthrough preview"
              fill
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </div>
          <div className="project-card-copy">
            <div>
              <p className="eyebrow">Video walkthrough · 38 sec</p>
              <h2>Gaur Saundaryam</h2>
              <p>A completed-home walkthrough featuring elegant wall details, bespoke storage and warm lighting.</p>
            </div>
            <span className="text-link">Watch the walkthrough →</span>
          </div>
        </Link>
      </section>
    </main>
  )
}
