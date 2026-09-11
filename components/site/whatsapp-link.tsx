"use client"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { buildWhatsAppLink, messageForPath } from "@/lib/whatsapp"
import WhatsAppIcon from "@/components/site/whatsapp-icon"

/**
 * A WhatsApp CTA whose prefilled message names whatever the visitor is looking at.
 *
 * This is the only reason any of these CTAs is a client component — the shared ones
 * (header, floating bar, CtaBanner) render on every route, so they cannot know the
 * path without usePathname. Keeping that here lets their parents stay on the server.
 *
 * `fallback` is the wording for pages with no specific subject.
 */
export default function WhatsAppLink({
  className,
  ctaId,
  fallback,
  icon = true,
  children,
}: {
  className?: string
  ctaId: string
  fallback: string
  icon?: boolean
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const href = buildWhatsAppLink({ number: siteConfig.whatsapp, text: messageForPath(pathname ?? "/", fallback) })
  return (
    <a className={className} data-cta={ctaId} href={href} target="_blank" rel="noreferrer">
      {icon && <WhatsAppIcon />}
      {children}
    </a>
  )
}
