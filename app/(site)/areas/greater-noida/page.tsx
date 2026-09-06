import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"
import { LocalAreaPage } from "@/components/site/local-area-page"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({ title: "Interior Designer in Greater Noida", description: "Interior designers serving Greater Noida for complete homes, modular kitchens, wardrobes, TV units, ceilings and renovations.", path: "/areas/greater-noida" })

export default function AreaGreaterNoida() {
  return (
    <LocalAreaPage area="Greater Noida" intro="Create a cohesive apartment or villa interior in Greater Noida with layouts, storage, lighting, finishes and execution planned around your home, priorities and budget." localNote="We serve Greater Noida from our nearby Crossings Republik studio and begin execution projects with a site visit and measured scope." />
  )
}
