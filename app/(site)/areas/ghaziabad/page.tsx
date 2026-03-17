import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({ title: "Interior Designer in Ghaziabad", path: "/areas/ghaziabad" })

export default function AreaGhaziabad() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 space-y-4">
        <h1 className="font-serif text-3xl">Interior Designer in Ghaziabad</h1>
        <p className="text-muted-foreground max-w-2xl">
          Premium interior design for modern homes and offices across Ghaziabad.
        </p>
      </div>
    </div>
  )
}
