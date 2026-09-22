import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"
import { LocalAreaPage } from "@/components/site/local-area-page"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({ title: "Interior Designer in Noida", description: "Interior designers serving Noida for full-home interiors, modular kitchens, wardrobes, TV units, false ceilings and renovations.", path: "/areas/noida" })

export default function AreaNoida() {
  return (
    <LocalAreaPage area="Noida" intro="Plan a practical, elegant home with interior design and execution for apartments across Noida. We coordinate layouts, modular kitchens, wardrobes, TV units, ceilings, finishes and installation as one clear scope." localNote="Our Crossings Republik studio serves Noida projects with scheduled site measurements, in-person material reviews and coordinated installation." />
  )
}
