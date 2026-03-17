"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"
import { buildWhatsAppLink } from "@/lib/whatsapp"
import logo from "../../public/logo.png"
import { usePathname } from "next/navigation"

export default function Header() {
  const brand = "Walls N Interior"
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919610459679"
  const waLink = buildWhatsAppLink({
    number: whatsapp,
    text: "Hi Wallsninterior, I'd like a design consultation",
  })

  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] as const

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="w-full sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Walls N Interior logo"
            width={120}
            height={40}
            className="h-15 w-auto object-contain"
          />
          <span className="font-serif text-lg font-medium text-[color:var(--accent-2)]">{brand}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "text-sm transition-colors",
                  "hover:text-[color:var(--accent-2)]",
                  active
                    ? "text-[color:var(--accent-2)] font-semibold underline underline-offset-4"
                    : "text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href={waLink} target="_blank">
            <Button className="btn-gold-hover bg-transparent" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Quote
            </Button>
          </Link>
          <Link href="tel:+917428095297">
            <Button variant="default">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
