import { siteConfig } from "@/config/site"
import { Phone } from "lucide-react"
import WhatsAppIcon from "@/components/site/whatsapp-icon"
export default function StickyMobileCTA() { const message = encodeURIComponent("Hi Walls N Interior, I saw your prices and would like an estimate."); return <div className="mobile-call-bar"><a href={`tel:${siteConfig.phone}`}><Phone size={17} aria-hidden="true" />Call now</a><a className="whatsapp" href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp</a></div> }
