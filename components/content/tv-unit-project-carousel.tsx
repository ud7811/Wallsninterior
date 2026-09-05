"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { LayoutImagePreview } from "@/components/content/layout-image-preview"

const tvUnitPhotos = [
  { src: "/images/tv-unit-projects/completed-tv-unit-01.jpg", width: 1101, height: 1073, alt: "Dark fluted TV wall with sculptural lighting and a floating console" },
  { src: "/images/tv-unit-projects/completed-tv-unit-02.jpg", width: 1170, height: 1170, alt: "Compact walnut and white TV unit with display ledges" },
  { src: "/images/tv-unit-projects/completed-tv-unit-03.jpg", width: 1170, height: 893, alt: "Full-width illuminated TV wall with fluted panels and a display tower" },
  { src: "/images/tv-unit-projects/completed-tv-unit-04.jpg", width: 1170, height: 898, alt: "Contemporary floating TV unit with vertical feature lights" },
] as const

export default function TvUnitProjectCarousel() {
  const [active, setActive] = useState(0)
  const photo = tvUnitPhotos[active]
  const show = (index: number) => setActive((index + tvUnitPhotos.length) % tvUnitPhotos.length)

  return <section className="kitchen-project-carousel" aria-label="Completed TV unit project photographs">
    <div className="kitchen-project-stage" aria-live="polite">
      <LayoutImagePreview key={photo.src} className="kitchen-project-image" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
      <span className="kitchen-project-count">{String(active + 1).padStart(2, "0")} / {String(tvUnitPhotos.length).padStart(2, "0")}</span>
      <button className="kitchen-carousel-arrow kitchen-carousel-prev" type="button" aria-label="Previous TV unit photograph" onClick={() => show(active - 1)}><ChevronLeft aria-hidden="true" /></button>
      <button className="kitchen-carousel-arrow kitchen-carousel-next" type="button" aria-label="Next TV unit photograph" onClick={() => show(active + 1)}><ChevronRight aria-hidden="true" /></button>
    </div>
    <div className="kitchen-carousel-dots" aria-label="Choose a TV unit photograph">{tvUnitPhotos.map((item, index) => <button className={index === active ? "active" : ""} type="button" aria-label={`Show TV unit photograph ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => show(index)} key={item.src} />)}</div>
    <div className="kitchen-project-caption"><p className="eyebrow">Completed TV unit</p><p>{photo.alt}</p></div>
  </section>
}
