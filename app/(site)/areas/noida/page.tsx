import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({ title: "Interior Designer in Noida", path: "/areas/noida" })

export default function AreaNoida() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 space-y-4">
        <h1 className="font-serif text-3xl">Interior Designer in Noida</h1>
        <p className="text-muted-foreground max-w-2xl">
          Walls N Interior provides full-service interior design across Noida. Our team delivers warm, elegant spaces tailored to your lifestyle.
        </p>
      </div>
    </div>
  )
}
