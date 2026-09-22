"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BackToTop({
  threshold = 300,
  className,
}: {
  threshold?: number
  className?: string
}) {
  const [visible, setVisible] = useState(false)
  const raf = useRef<number | null>(null)
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop
        setVisible(y > threshold)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      window.removeEventListener("scroll", onScroll)
    }
  }, [threshold])

  const scrollToTop = () => {
    if (prefersReduced) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        "fixed right-4 bottom-40 md:bottom-24 z-50",
        "rounded-full bg-[color:var(--ink)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.15)]",
        "h-11 w-11 md:h-12 md:w-12 flex items-center justify-center",
        "transition-opacity transition-transform transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
        "cursor-pointer hover:scale-105 active:scale-[0.97] hover:bg-[color:var(--clay)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.2)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
        "group",
        className,
      )}
    >
      <ArrowUp className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  )
}
