"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BLUR_DATA } from "@/lib/images"

type Item = { title: string; image: string; href: string; alt?: string }

export function RoomIdeasCarousel({
  items = [
    { title: "Kitchen", image: "/images/rooms/kitchen.png", href: "/portfolio?room=Kitchen", alt: "Kitchen design ideas" },
    { title: "Bath", image: "/images/rooms/bath.png", href: "/portfolio?room=Bath", alt: "Bathroom design ideas" },
    { title: "Bedroom", image: "/images/rooms/bedroom.png", href: "/portfolio?room=Bedroom", alt: "Bedroom design ideas" },
    { title: "Living", image: "/images/rooms/living.png", href: "/portfolio?room=Living", alt: "Living room design ideas" },
    { title: "Dining", image: "/images/rooms/dining.png", href: "/portfolio?room=Dining", alt: "Dining room design ideas" },
    { title: "Outdoor", image: "/images/rooms/outdoor.png", href: "/portfolio?room=Outdoor", alt: "Outdoor design ideas" },
  ],
  autoScrollIdleMs = 4000,
}: {
  items?: Item[]
  autoScrollIdleMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isIdle, setIsIdle] = useState(true)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const scrollByCard = (dir: number) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector("[data-card]") as HTMLElement
    const dx = (card?.offsetWidth || 280) + 16
    el.scrollBy({ left: dir * dx, behavior: "smooth" })
  }

  const onPrev = () => scrollByCard(-1)
  const onNext = () => scrollByCard(1)

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") onPrev()
    if (e.key === "ArrowRight") onNext()
  }

  const resetIdle = useCallback(() => {
    setIsIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIsIdle(true), autoScrollIdleMs)
  }, [autoScrollIdleMs])

  useEffect(() => {
    resetIdle()
    return () => clearTimeout(idleTimer.current)
  }, [resetIdle])

  useEffect(() => {
    if (!isIdle) return
    const t = setInterval(() => scrollByCard(1), autoScrollIdleMs)
    return () => clearInterval(t)
  }, [isIdle, autoScrollIdleMs])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Browse ideas by room"
      className="relative"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div
        ref={ref}
        className="carousel-snap flex gap-4 overflow-x-auto no-scrollbar px-1 py-1"
        onScroll={resetIdle}
        onMouseMove={resetIdle}
        onTouchStart={resetIdle}
        onWheel={resetIdle}
      >
        {items.map((item, i) => (
          <Link
            key={i}
            data-card
            href={item.href}
            className="min-w-[240px] sm:min-w-[280px] md:min-w-[300px] group relative rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-2)]"
            aria-label={`${item.title} ideas`}
          >
            <div className="relative h-48 sm:h-56 md:h-64">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.alt || item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_DATA}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="inline-block bg-white/90 rounded-md px-3 py-1 text-sm font-medium shadow">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        aria-label="Previous"
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white shadow hover:bg-[color:var(--accent-1)]"
        onClick={onPrev}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next"
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full bg-white shadow hover:bg-[color:var(--accent-1)]"
        onClick={onNext}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
