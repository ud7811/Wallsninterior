import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"

export const generateMetadata = async (): Promise<Metadata> => createSeo({ title: "About", path: "/about" })

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="font-serif text-3xl">About Wallsninterior</h1>
        <p className="text-muted-foreground max-w-2xl">
          Wallsninterior is a premium interior design studio serving Noida, Greater Noida, and Ghaziabad.
          Our philosophy blends warm minimalism with rich textures and timeless accents, delivering spaces that feel elegant and lived-in.
        </p>
      </div>
    </div>
  )
}
