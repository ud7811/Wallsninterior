"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { pushEvent, trackPageView } from "@/lib/ga"

const PATH_EVENTS: Array<[RegExp, string]> = [
  [/^\/interiors\/2bhk/, "view_2bhk_page"],
  [/^\/interiors\/3bhk/, "view_3bhk_page"],
  [/^\/interiors\/4bhk/, "view_4bhk_page"],
  [/^\/services\/modular-kitchen/, "view_modular_kitchen"],
  [/^\/services\/wardrobes/, "view_wardrobe"],
  [/^\/services\/tv-units/, "view_tv_unit"],
  [/^\/services\/false-ceiling/, "view_false_ceiling"],
  [/^\/projects/, "view_projects"],
  [/^\/(cost|tools\/cost-calculator)/, "view_cost"],
  [/^\/areas\/greater-noida/, "view_area_greater_noida"],
  [/^\/areas\/noida/, "view_area_noida"],
  [/^\/areas\/ghaziabad/, "view_area_ghaziabad"],
  [/^\/areas\/crossings-republik/, "view_area_crossings_republik"],
  [/^\/contact/, "view_contact"],
]

export default function AnalyticsEvents() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    trackPageView(pathname)
    const match = PATH_EVENTS.find(([re]) => re.test(pathname))
    if (match) pushEvent(match[1], { page_path: pathname })
  }, [pathname])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null
      const a = target?.closest("a")
      if (!a) return
      const href = a.getAttribute("href") || ""
      const page_path = window.location.pathname
      // Identifies *which* CTA was tapped. Without this every WhatsApp link on the
      // site reports as the same undifferentiated whatsapp_click, so there is no
      // way to tell a hero tap from a sticky-bar tap from a CTA-banner tap.
      const cta_id = (a.closest("[data-cta]") as HTMLElement | null)?.dataset.cta

      if (href.startsWith("tel:")) {
        pushEvent("phone_click", { page_path, cta_id })
        return
      }
      if (href.startsWith("mailto:")) {
        pushEvent("email_click", { page_path, cta_id })
        return
      }
      if (/(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i.test(href)) {
        const cls = (a.className || "").toString().toLowerCase()
        const text = (a.textContent || "").toLowerCase()
        const isQuote = cls.includes("quote") || /\bquote\b/.test(text)
        pushEvent(isQuote ? "quote_click" : "whatsapp_click", { page_path, link_domain: "wa.me", cta_id })
        return
      }
      // Non-WhatsApp CTAs worth attributing: BHK cards, tier deeplinks, the
      // calculator's handoff into the contact form.
      if (cta_id) pushEvent("cta_click", { page_path, cta_id, href })
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  // Homepage scroll depth. The homepage is the whole funnel entrance, so how far
  // down people actually get is the difference between "the hero is wrong" and
  // "the hero is fine but the price grid loses them".
  useEffect(() => {
    if (pathname !== "/") return
    const fired = new Set<number>()
    function onScroll() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = Math.round((window.scrollY / scrollable) * 100)
      for (const mark of [25, 50, 75, 100]) {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark)
          pushEvent("scroll_depth", { page_path: "/", percent_scrolled: mark })
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  return null
}
