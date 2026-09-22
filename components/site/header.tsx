"use client"
import Link from "next/link"
import { useState } from "react"
import { Phone } from "lucide-react"
import { siteConfig } from "@/config/site"
import BrandLogo from "@/components/site/brand-logo"
import WhatsAppLink from "@/components/site/whatsapp-link"

const nav = [{ href: "/#interiors", label: "Interiors" }, { href: "/services", label: "Services" }, { href: "/cost", label: "Cost" }, { href: "/projects", label: "Projects" }, { href: "/areas/ghaziabad", label: "Areas" }, { href: "/about", label: "About" }]
export default function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><a className="skip-link" href="#main-content">Skip to content</a><div className="nav-shell"><Link className="brand" href="/" aria-label="Walls N Interior home"><BrandLogo priority /></Link><nav className="desktop-nav" aria-label="Main navigation">{nav.map(i => <Link href={i.href} key={i.href}>{i.label}</Link>)}</nav><div className="nav-actions"><WhatsAppLink className="button header-quote-button" ctaId="header-whatsapp" fallback={siteConfig.whatsappMessages.header}>Get Quote</WhatsAppLink><a className="button header-call-button" data-cta="header-call" href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.phoneDisplay}`}><Phone size={17} aria-hidden="true" /><span>Call</span></a></div><button className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span>{open ? "Close" : "Menu"}</span></button></div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
      {nav.map(i => <Link href={i.href} onClick={() => setOpen(false)} key={i.href}>{i.label}</Link>)}
      <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      {/* The header's Call and Get Quote buttons are hidden below 960px, so without
          these the drawer was a dead end on exactly the devices most visitors use. */}
      <div className="mobile-nav-actions">
        <a className="button button-primary" data-cta="mobile-menu-call" href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.phoneDisplay}`}><Phone size={17} aria-hidden="true" />Call now</a>
        <WhatsAppLink className="button button-whatsapp" ctaId="mobile-menu-whatsapp" fallback={siteConfig.whatsappMessages.header}>WhatsApp</WhatsAppLink>
      </div>
    </nav>}
  </header>
}
