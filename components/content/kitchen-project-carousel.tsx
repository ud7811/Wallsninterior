"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { LayoutImagePreview } from "@/components/content/layout-image-preview"

const kitchenPhotos = [
  { src: "/images/kitchen-projects/completed-kitchen-01.jpg", width: 720, height: 541, alt: "Completed white and charcoal L-shaped modular kitchen" },
  { src: "/images/kitchen-projects/completed-kitchen-02.jpg", width: 1080, height: 1619, alt: "Glossy lavender modular kitchen opening into a living room" },
  { src: "/images/kitchen-projects/completed-kitchen-03.jpg", width: 963, height: 963, alt: "Blue modular kitchen with pendant lights and a fluted breakfast counter" },
  { src: "/images/kitchen-projects/completed-kitchen-04.jpg", width: 960, height: 1280, alt: "Neutral handleless L-shaped kitchen with illuminated backsplash" },
  { src: "/images/kitchen-projects/completed-kitchen-05.jpg", width: 1152, height: 864, alt: "Compact beige kitchen integrated beside a timber partition" },
  { src: "/images/kitchen-projects/completed-kitchen-06.jpg", width: 1080, height: 1440, alt: "Sage green modular kitchen with marble-look backsplash" },
  { src: "/images/kitchen-projects/completed-kitchen-07.jpg", width: 1080, height: 810, alt: "Parallel sage green kitchen with glass-front overhead cabinets" },
] as const

export default function KitchenProjectCarousel() {
  const [active, setActive] = useState(0)
  const photo = kitchenPhotos[active]
  const show = (index: number) => setActive((index + kitchenPhotos.length) % kitchenPhotos.length)

  return <section className="kitchen-project-carousel" aria-label="Completed modular kitchen project photographs">
    <div className="kitchen-project-stage" aria-live="polite">
      <LayoutImagePreview key={photo.src} className="kitchen-project-image" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
      <span className="kitchen-project-count">{String(active + 1).padStart(2, "0")} / {String(kitchenPhotos.length).padStart(2, "0")}</span>
      <button className="kitchen-carousel-arrow kitchen-carousel-prev" type="button" aria-label="Previous kitchen photograph" onClick={() => show(active - 1)}><ChevronLeft aria-hidden="true" /></button>
      <button className="kitchen-carousel-arrow kitchen-carousel-next" type="button" aria-label="Next kitchen photograph" onClick={() => show(active + 1)}><ChevronRight aria-hidden="true" /></button>
    </div>
    <div className="kitchen-carousel-dots" aria-label="Choose a kitchen photograph">{kitchenPhotos.map((item, index) => <button className={index === active ? "active" : ""} type="button" aria-label={`Show kitchen photograph ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => show(index)} key={item.src} />)}</div>
    <div className="kitchen-project-caption"><p className="eyebrow">Completed kitchen</p><p>{photo.alt}</p></div>
  </section>
}
