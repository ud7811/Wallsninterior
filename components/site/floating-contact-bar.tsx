import { siteConfig } from "@/config/site"
import { Phone } from "lucide-react"
import WhatsAppLink from "@/components/site/whatsapp-link"

/**
 * Persistent call/WhatsApp bar. Renders as a full-width bottom bar at <=640px and
 * as a floating pill pair above that — it is not mobile-only despite the
 * .mobile-call-bar class name it styles against.
 */
export default function FloatingContactBar() {
  return <div className="mobile-call-bar">
    <a data-cta="floating-call" href={`tel:${siteConfig.phone}`}><Phone size={17} aria-hidden="true" />Call now</a>
    <WhatsAppLink className="whatsapp" ctaId="floating-whatsapp" fallback={siteConfig.whatsappMessages.sticky}>WhatsApp</WhatsAppLink>
  </div>
}
