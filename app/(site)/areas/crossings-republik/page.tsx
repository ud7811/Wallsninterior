import type { Metadata } from "next"
import { createSeo } from "@/lib/seo"
import { LocalAreaPage } from "@/components/site/local-area-page"

export const generateMetadata = async (): Promise<Metadata> =>
  createSeo({
    title: "Interior Designer in Crossings Republik",
    description:
      "Meet a local interior designer in Crossings Republik for home interiors, office interiors, and renovation projects in Ghaziabad.",
    path: "/areas/crossings-republik",
  })

export default function AreaCrossingsRepublik() {
  return (
    <LocalAreaPage
      area="Crossings Republik"
      intro="Work with a local studio for thoughtful home interiors, office interiors, and renovations. We balance everyday function with warm, elegant design and guide the project from the first conversation onward."
      localNote="Our studio is at Avantika Retail Street in Crossings Republik, making it easy to meet, review ideas, and coordinate nearby projects."
    />
  )
}
