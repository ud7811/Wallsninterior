import { siteConfig } from "@/config/site"
import { buildWhatsAppLink } from "@/lib/whatsapp"
import { Phone } from "lucide-react"
import WhatsAppIcon from "@/components/site/whatsapp-icon"

/**
 * Persistent call/WhatsApp bar. Renders as a full-width bottom bar at <=640px and
 * as a floating pill pair above that — it is not mobile-only despite the
 * .mobile-call-bar class name it styles against.
 */
export default function FloatingContactBar() {
  return <div className="mobile-call-bar">
    <a data-cta="floating-call" href={`tel:${siteConfig.phone}`}><Phone size={17} aria-hidden="true" />Call now</a>
    <a className="whatsapp" data-cta="floating-whatsapp" href={buildWhatsAppLink({ number: siteConfig.whatsapp, text: siteConfig.whatsappMessages.sticky })} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp</a>
  </div>
}
