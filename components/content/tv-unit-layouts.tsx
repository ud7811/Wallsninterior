import { LayoutImagePreview } from "@/components/content/layout-image-preview"

const tvUnitTypes = [
  {
    name: "Floating wall-mounted TV unit",
    image: "/images/tv-unit-layouts/floating-wall-mounted-tv-unit.jpg",
    width: 894,
    height: 894,
    alt: "Light wood floating TV unit mounted beneath a television",
    bestFor: "Compact living rooms and a clean, open floor",
    description: "A wall-mounted console keeps the floor clear while providing drawers for remotes, devices and everyday media storage. Concealed wiring helps maintain the minimal appearance.",
  },
  {
    name: "Floor-standing TV console",
    image: "/images/tv-unit-layouts/floor-standing-tv-console.jpg",
    width: 736,
    height: 1307,
    alt: "Custom floor-standing TV console and partition under construction",
    bestFor: "Flexible installations and homes needing a substantial base",
    description: "A floor-supported console carries more storage and equipment weight without relying entirely on wall fixing. It can be built as a movable piece or a made-to-measure installation.",
  },
  {
    name: "TV unit with closed storage",
    image: "/images/tv-unit-layouts/tv-unit-with-closed-storage.jpg",
    width: 735,
    height: 490,
    alt: "Full-width TV unit with drawers, cabinets and an illuminated display tower",
    bestFor: "Family living rooms that need clutter-free storage",
    description: "Drawers and shuttered cabinets hide cables, devices, games and accessories. A balanced mix of closed storage and one display cabinet keeps the composition visually light.",
  },
  {
    name: "TV unit with open display shelves",
    image: "/images/tv-unit-layouts/tv-unit-with-open-display-shelves.jpg",
    width: 736,
    height: 981,
    alt: "TV unit framed by illuminated open display shelves and lower drawers",
    bestFor: "Display-led living rooms with curated décor",
    description: "Open shelves frame the television and create space for books, art and objects. Integrated lighting adds depth, while lower drawers handle practical media storage.",
  },
  {
    name: "Fluted or slatted TV backdrop",
    image: "/images/tv-unit-layouts/fluted-tv-backdrop.jpg",
    width: 898,
    height: 1200,
    alt: "Floating TV unit with a curved illuminated panel and fluted wall backdrop",
    bestFor: "Bedrooms and contemporary feature walls",
    description: "Fluted or slatted panels introduce texture and visually define the TV wall. They can be combined with a floating console, mirror, shelves and warm indirect lighting.",
  },
  {
    name: "Partition TV unit",
    image: "/images/tv-unit-layouts/partition-tv-unit.jpg",
    width: 800,
    height: 800,
    alt: "Open timber partition TV unit separating living and dining areas",
    bestFor: "Open-plan homes that need light zoning",
    description: "A double-purpose media unit divides living and dining spaces without building a solid wall. Open sections preserve light and views while providing storage and display space.",
  },
  {
    name: "Corner TV unit",
    image: "/images/tv-unit-layouts/corner-tv-unit.jpg",
    width: 1200,
    height: 960,
    alt: "L-shaped illuminated corner TV unit with cabinets and display shelves",
    bestFor: "Rooms where the television must use two adjoining walls",
    description: "An L-shaped configuration turns an awkward corner into continuous storage and display. Careful screen positioning and viewing angles are important for comfortable seating.",
  },
  {
    name: "TV unit with pooja or study integration",
    image: "/images/tv-unit-layouts/tv-unit-with-pooja-integration.jpg",
    width: 1080,
    height: 1076,
    alt: "Minimal TV wall integrated with an illuminated pooja unit",
    bestFor: "Apartments where one wall must serve multiple functions",
    description: "The media wall can incorporate a compact pooja space or study desk while retaining a unified finish. Separate lighting and storage help each activity remain clearly organised.",
  },
] as const

export default function TvUnitLayouts() {
  return <section className="content-section tv-unit-layout-section"><div className="section-heading"><p className="eyebrow">Choose the right media wall</p><h2>Popular TV unit configurations</h2><p>Room size, storage needs, viewing position and adjoining spaces determine the right TV-unit format. Compare these configurations before deciding the final panel, console and wiring plan.</p></div><div className="tv-unit-layout-grid">{tvUnitTypes.map(unit => <div className="layout-card-trigger" key={unit.name}><article className="tv-unit-layout-card"><LayoutImagePreview className="tv-unit-layout-image" src={unit.image} alt={unit.alt} width={unit.width} height={unit.height} /><div className="tv-unit-layout-copy"><h3>{unit.name}</h3><p className="tv-unit-layout-best"><strong>Best for:</strong> {unit.bestFor}</p><p>{unit.description}</p></div></article></div>)}</div><p className="small tv-unit-layout-note">The final size and configuration are confirmed after checking the television dimensions, viewing distance, electrical points, equipment ventilation and wall structure.</p></section>
}
