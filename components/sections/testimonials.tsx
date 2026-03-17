"use client"

import { useEffect, useState } from "react"
import { Star } from 'lucide-react'

type Testimonial = { name: string; rating: number; quote: string; location?: string }

export function Testimonials({ items = [] as Testimonial[] }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % Math.max(items.length || 1, 1)), 5000)
    return () => clearInterval(t)
  }, [items.length])

  const active = items[index] || {
    name: "Riya S.",
    rating: 5,
    quote: "Beautiful designs and smooth execution. The results look incredible!",
    location: "Noida",
  }

  return (
    <section className="section bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex text-[color:var(--accent-2)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < active.rating ? "fill-[color:var(--accent-2)]" : "stroke-muted-foreground"}`} />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Google Rating</div>
        </div>
        <div className="card p-6">
          <p className="text-lg">“{active.quote}”</p>
          <div className="mt-3 text-sm text-muted-foreground">— {active.name}{active.location ? `, ${active.location}` : ""}</div>
        </div>
      </div>
    </section>
  )
}
