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

      if (href.startsWith("tel:")) {
        pushEvent("phone_click", { page_path, transport_type: "beacon" })
        return
      }
      if (href.startsWith("mailto:")) {
        pushEvent("email_click", { page_path, transport_type: "beacon" })
        return
      }
      if (/(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i.test(href)) {
        const cls = (a.className || "").toString().toLowerCase()
        const text = (a.textContent || "").toLowerCase()
        const isQuote = cls.includes("quote") || /\bquote\b/.test(text)
        pushEvent(isQuote ? "quote_click" : "whatsapp_click", {
          page_path,
          link_domain: "wa.me",
          transport_type: "beacon",
        })
      }
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  return null
}
