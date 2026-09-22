import Link from "next/link"
import { LayoutImagePreview } from "@/components/content/layout-image-preview"
import { buildMetadata } from "@/lib/seo-v2"

export const metadata = buildMetadata({ seo: { title: "Contemporary Family Home Interior Project", description: "Explore 36 photographs from a completed contemporary family-home interior by Walls N Interior, including living, kitchen and three bedrooms.", primaryKeyword: "completed home interior project ghaziabad" }, path: "/projects/contemporary-family-home" })

const portraitImages = new Set([1, 10, 29])
const groups = [
  { title: "Living, dining and prayer", intro: "Warm layered lighting, soft neutrals and display details bring the shared spaces together.", images: Array.from({ length: 13 }, (_, index) => index + 1) },
  { title: "Kitchen", intro: "A bright, storage-led kitchen planned around uninterrupted counters and everyday access.", images: Array.from({ length: 5 }, (_, index) => index + 14) },
  { title: "Primary bedroom", intro: "Deep blue cabinetry, a compact study and graphic detailing give this room a confident identity.", images: Array.from({ length: 6 }, (_, index) => index + 19) },
  { title: "Children's bedroom", intro: "Pastel storage, a study corner and a playful illustrated wall make the room adaptable and personal.", images: Array.from({ length: 5 }, (_, index) => index + 25) },
  { title: "Guest bedroom", intro: "Neutral upholstery and geometric wardrobes create a calm finish with generous concealed storage.", images: Array.from({ length: 7 }, (_, index) => index + 30) },
] as const

function imageDetails(number: number) {
  const portrait = portraitImages.has(number)
  return { src: `/images/projects/contemporary-family-home/${String(number).padStart(2, "0")}.webp`, width: portrait ? 2821 : number < 19 ? 4188 : 4223, height: portrait ? 4223 : number < 19 ? 2797 : 2821 }
}

export default function ContemporaryFamilyHomePage() {
  return <main><section className="project-detail-hero"><Link className="project-back" href="/projects">← All projects</Link><div><p className="eyebrow">Completed home · Photo story</p><h1>Contemporary Family Home</h1><p className="lead">A warm, highly personalised apartment that moves from refined shared spaces to bedrooms with distinctly different characters.</p></div><dl className="project-facts"><div><dt>Scope</dt><dd>Full-home interiors</dd></div><div><dt>Spaces</dt><dd>Living, kitchen + 3 bedrooms</dd></div><div><dt>Gallery</dt><dd>36 photographs</dd></div></dl></section><div className="project-cover"><LayoutImagePreview className="project-cover-image" src="/images/projects/contemporary-family-home/04.webp" alt="Completed contemporary family living room" width={4188} height={2797} /></div>{groups.map(group => <section className="project-room" key={group.title}><div className="project-room-heading"><p className="eyebrow">Inside the home</p><h2>{group.title}</h2><p>{group.intro}</p></div><div className="project-photo-grid">{group.images.map((number, index) => { const image = imageDetails(number); return <article className={index === 0 ? "project-photo project-photo-featured" : "project-photo"} key={number}><LayoutImagePreview className="project-photo-image" src={image.src} alt={`${group.title} interior view ${index + 1}`} width={image.width} height={image.height} /></article> })}</div></section>)}</main>
}
