"use client"
import Link from "next/link"
import { useState } from "react"
import { Phone } from "lucide-react"
import { siteConfig } from "@/config/site"
import BrandLogo from "@/components/site/brand-logo"
import WhatsAppIcon from "@/components/site/whatsapp-icon"

const nav = [{ href: "/#interiors", label: "Interiors" }, { href: "/services", label: "Services" }, { href: "/cost", label: "Cost" }, { href: "/projects", label: "Projects" }, { href: "/areas/ghaziabad", label: "Areas" }, { href: "/about", label: "About" }]
export default function Header() { const [open, setOpen] = useState(false); const quoteMessage = encodeURIComponent("Hi Walls N Interior, I'd like a free interior design quote."); return <header className="site-header"><a className="skip-link" href="#main-content">Skip to content</a><div className="nav-shell"><Link className="brand" href="/" aria-label="Walls N Interior home"><BrandLogo priority /></Link><nav className="desktop-nav" aria-label="Main navigation">{nav.map(i => <Link href={i.href} key={i.href}>{i.label}</Link>)}</nav><div className="nav-actions"><a className="button header-quote-button" href={`https://wa.me/${siteConfig.whatsapp}?text=${quoteMessage}`} target="_blank" rel="noreferrer"><WhatsAppIcon />Get Quote</a><a className="button header-call-button" href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.phoneDisplay}`}><Phone size={17} aria-hidden="true" /><span>Call</span></a></div><button className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span>{open ? "Close" : "Menu"}</span></button></div>{open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{nav.map(i => <Link href={i.href} onClick={() => setOpen(false)} key={i.href}>{i.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></nav>}</header> }
