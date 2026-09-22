import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"
import { LocalAreaPage } from "@/components/site/local-area-page"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({
    title: "Interior Designer in Ghaziabad",
    description: "Home, office, and renovation interior design in Ghaziabad from Walls N Interior's Crossings Republik studio.",
    path: "/areas/ghaziabad",
  })

export default function AreaGhaziabad() {
  return (
    <LocalAreaPage
      area="Ghaziabad"
      intro="Create a home or workplace that feels considered, comfortable, and distinctly yours. We plan residential and commercial interiors across Ghaziabad from concept through execution."
      localNote="Based in Crossings Republik, we can discuss your project in person and understand the site before finalising the design direction."
    />
  )
}
