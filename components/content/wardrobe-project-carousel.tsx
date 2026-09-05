"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { LayoutImagePreview } from "@/components/content/layout-image-preview"

const wardrobePhotos = [
  { src: "/images/wardrobe-projects/completed-wardrobe-01.jpg", width: 720, height: 1006, alt: "Glossy hinged wardrobe with a pink, white and grey chevron design" },
  { src: "/images/wardrobe-projects/completed-wardrobe-02.jpg", width: 736, height: 981, alt: "Floor-to-ceiling sage and marble-finish hinged wardrobe" },
  { src: "/images/wardrobe-projects/completed-wardrobe-03.jpg", width: 1125, height: 980, alt: "Dark wood sliding wardrobe with integrated display lighting" },
  { src: "/images/wardrobe-projects/completed-wardrobe-04.jpg", width: 960, height: 1280, alt: "Glossy full-height wardrobe with a lit dressing mirror and display shelves" },
] as const

export default function WardrobeProjectCarousel() {
  const [active, setActive] = useState(0)
  const photo = wardrobePhotos[active]
  const show = (index: number) => setActive((index + wardrobePhotos.length) % wardrobePhotos.length)

  return <section className="kitchen-project-carousel" aria-label="Completed wardrobe project photographs">
    <div className="kitchen-project-stage" aria-live="polite">
      <LayoutImagePreview key={photo.src} className="kitchen-project-image" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
      <span className="kitchen-project-count">{String(active + 1).padStart(2, "0")} / {String(wardrobePhotos.length).padStart(2, "0")}</span>
      <button className="kitchen-carousel-arrow kitchen-carousel-prev" type="button" aria-label="Previous wardrobe photograph" onClick={() => show(active - 1)}><ChevronLeft aria-hidden="true" /></button>
      <button className="kitchen-carousel-arrow kitchen-carousel-next" type="button" aria-label="Next wardrobe photograph" onClick={() => show(active + 1)}><ChevronRight aria-hidden="true" /></button>
    </div>
    <div className="kitchen-carousel-dots" aria-label="Choose a wardrobe photograph">{wardrobePhotos.map((item, index) => <button className={index === active ? "active" : ""} type="button" aria-label={`Show wardrobe photograph ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => show(index)} key={item.src} />)}</div>
    <div className="kitchen-project-caption"><p className="eyebrow">Completed wardrobe</p><p>{photo.alt}</p></div>
  </section>
}
