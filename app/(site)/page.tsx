import { createSeo, localBusinessJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/seo/jsonld"
import { Hero } from "@/components/sections/hero"
import { FeaturedProjectsGrid } from "@/components/sections/featured-projects"
import { HomeRoomIdeas } from "@/components/sections/room-ideas"
import { WhyUs } from "@/components/sections/why-us"
import { Testimonials } from "@/components/sections/testimonials"
import ShapedGalleryMarquee from "@/components/sections/ShapedGalleryMarquee"
import EverythingInteriors from "@/components/sections/everything-interiors"
import type { Metadata } from "next"

export const generateMetadata = async (): Promise<Metadata> => {
  return createSeo({
    title: "Elegant Interiors",
    path: "/",
  })
}

export default function HomePage() {
  // LocalBusiness JSON-LD
  const jsonLd = localBusinessJsonLd({
    brand: "Wallsninterior",
    phone: "+917428095297",
    email: "wallsninterior@gmail.com",
    address: {
      streetAddress: "LGF-11, Avantika Retail Street",
      addressLocality: "ghaziabad",
      postalCode: "201016",
      addressRegion: "UP",
      addressCountry: "IN",
    },
    cities: ["Noida", "Greater Noida", "Ghaziabad"],
  })

 const inspirationItems = [
  { src: "/images/walls/botanical_grandeur.JPG", alt: "Botanical Grandeur" },
  { src: "/images/walls/caravan_to_the_fort.JPG", alt: "Caravan to the Fort" },
  { src: "/images/walls/cow_painting.JPG", alt: "Cow Painting" },
  { src: "/images/walls/desert_tone_panel_set.JPG", alt: "Desert Tone Panel Set" },
  { src: "/images/walls/forest_vibe.JPG", alt: "Forest Vibe" },
  { src: "/images/walls/kids_cosmic_explorer.JPG", alt: "Kids Cosmic Explorer" },
  { src: "/images/walls/mistwood_deer.JPG", alt: "Mistwood Deer" },
  { src: "/images/walls/peacock_stairs.JPG", alt: "Peacock Stairs" },
  { src: "/images/walls/radha_krishna_darbar_panels.JPG", alt: "Radha Krishna Darbar Panels" },
  { src: "/images/walls/royal-elephant_procession.JPG", alt: "Royal Elephant Procession" },
  { src: "/images/walls/tropical_luxe.JPG", alt: "Tropical Luxe" },
  { src: "/images/walls/trpoical_pastel.JPG", alt: "Tropical Pastel" },
]
  return (
    <>
      <JsonLd id="jsonld-localbusiness" data={jsonLd} />
      <Hero />
      <FeaturedProjectsGrid />
      <HomeRoomIdeas />
      <ShapedGalleryMarquee items={inspirationItems} />
      <EverythingInteriors />
      <WhyUs />
      <Testimonials />
    </>
  )
}
