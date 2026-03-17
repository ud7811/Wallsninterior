"use client"

import Link from "next/link"
import { Phone, MessageCircle, ClipboardList } from 'lucide-react'
import { buildWhatsAppLink } from "@/lib/whatsapp"
import { usePathname } from "next/navigation"

const allowed = ["/", "/services", "/portfolio"]

export default function StickyMobileCTA() {
  const pathname = usePathname()
  const show = allowed.some((p) => pathname === p || pathname.startsWith(p + "/"))
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917428095297"
  const wa = buildWhatsAppLink({
    number: whatsapp,
    text: "Hi Walls N Interior, I'd like a design consultation",
  })
  if (!show) return null
  return (
    <div className="sticky-bar md:hidden">
      <div className="container mx-auto px-4 py-2 grid grid-cols-3 gap-2">
        <Link
          href="tel:+917428095297"
          className="inline-flex items-center justify-center rounded-md border py-2 text-sm font-medium btn-gold-hover"
          aria-label="Call"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call
        </Link>
        <Link
          href={wa}
          target="_blank"
          className="inline-flex items-center justify-center rounded-md border py-2 text-sm font-medium btn-gold-hover"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border py-2 text-sm font-medium btn-gold-hover"
          aria-label="Get Quote"
        >
          <ClipboardList className="w-4 h-4 mr-2" />
          Get Quote
        </Link>
      </div>
    </div>
  )
}
