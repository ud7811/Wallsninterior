import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BLUR_DATA } from "@/lib/images"

export function Hero() {
  return (
    <section className="section">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
        <div className="space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">
            Transform Your Space with Elegant Interiors
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Premium, warm, and trustworthy design services tailored to your lifestyle. Serving Noida, Greater Noida, and Ghaziabad.
          </p>
          <div className="flex gap-3">
            <Link href="/services">
              <Button size="lg" className="btn-gold-hover">View Services</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="btn-gold-hover">Get Quote on WhatsApp</Button>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] rounded-xl overflow-hidden">
          <Image
            src="/images/hero-1.png"
            alt="Elegant interior design"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA}
          />
        </div>
      </div>
    </section>
  )
}
