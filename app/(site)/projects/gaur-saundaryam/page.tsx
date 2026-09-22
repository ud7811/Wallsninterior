import Link from "next/link"
import { buildMetadata } from "@/lib/seo-v2"

export const metadata = buildMetadata({
  seo: {
    title: "Gaur Saundaryam Interior Video Walkthrough",
    description:
      "Watch the completed Gaur Saundaryam home interior walkthrough by Walls N Interior, featuring bespoke storage, wall details and warm lighting.",
    primaryKeyword: "Gaur Saundaryam interior design project",
  },
  path: "/projects/gaur-saundaryam",
})

export default function GaurSaundaryamPage() {
  return (
    <main>
      <section className="project-detail-hero project-video-heading">
        <Link className="project-back" href="/projects">
          ← All projects
        </Link>
        <div>
          <p className="eyebrow">Completed site · Video walkthrough</p>
          <h1>Gaur Saundaryam</h1>
          <p className="lead">
            A concise tour of a finished home, highlighting its refined wall treatments, tailored storage and
            softly layered lighting.
          </p>
        </div>
        <dl className="project-facts">
          <div>
            <dt>Format</dt>
            <dd>Site walkthrough</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>38 seconds</dd>
          </div>
          <div>
            <dt>Orientation</dt>
            <dd>Vertical video</dd>
          </div>
        </dl>
      </section>
      <section className="project-video-stage">
        <div className="project-video-frame">
          <video controls playsInline preload="metadata" poster="/images/projects/gaur-saundaryam-poster.jpg">
            <source src="/videos/projects/gaur-saundaryam.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
        <div className="project-video-note">
          <p className="eyebrow">Walk through the details</p>
          <h2>Thoughtful details, brought together.</h2>
          <p>
            The original vertical walkthrough offers an honest look at the completed cabinetry, decorative wall
            treatments, mirrors and lighting as they appear in the home.
          </p>
        </div>
      </section>
    </main>
  )
}
