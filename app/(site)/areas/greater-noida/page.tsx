import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({ title: "Interior Designer in Greater Noida", path: "/areas/greater-noida" })

export default function AreaGreaterNoida() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 space-y-4">
        <h1 className="font-serif text-3xl">Interior Designer in Greater Noida</h1>
        <p className="text-muted-foreground max-w-2xl">
          We serve Greater Noida&apos;s top residential and commercial neighborhoods with custom interior design.
        </p>
      </div>
    </div>
  )
}
