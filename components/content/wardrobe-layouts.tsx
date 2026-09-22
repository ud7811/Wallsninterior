import { LayoutImagePreview } from "@/components/content/layout-image-preview"

const wardrobeTypes = [
  {
    name: "Hinged wardrobe",
    image: "/images/wardrobe-layouts/hinged-wardrobe.jpg",
    width: 1200,
    height: 1200,
    alt: "Floor-to-ceiling grey hinged wardrobe with overhead storage and open display shelves",
    bestFor: "Medium to large bedrooms with enough door-opening space",
    description: "Individual shutters provide full access to each compartment and make internal storage easy to organise. The design can combine lofts, drawers, mirrors and open display niches.",
  },
  {
    name: "Sliding wardrobe",
    image: "/images/wardrobe-layouts/sliding-wardrobe.jpg",
    width: 1152,
    height: 2048,
    alt: "Modern floor-to-ceiling sliding wardrobe with neutral panels and wooden framing",
    bestFor: "Compact bedrooms and rooms with limited circulation space",
    description: "Sliding shutters need no swing clearance, helping preserve movement around the bed. Wide panels create a clean appearance and work well with loft storage above.",
  },
  {
    name: "Walk-in wardrobe",
    image: "/images/wardrobe-layouts/walk-in-wardrobe.jpg",
    width: 736,
    height: 1104,
    alt: "Warm walk-in wardrobe with open hanging storage, illuminated shelves and a dressing mirror",
    bestFor: "Large bedrooms or a dedicated dressing room",
    description: "A walk-in configuration combines hanging, folded storage, drawers and a dressing zone in one room. Good aisle width and layered lighting are essential for comfortable everyday use.",
  },
] as const

export default function WardrobeLayouts() {
  return <section className="content-section wardrobe-layout-section"><div className="section-heading"><p className="eyebrow">Choose the right shutter system</p><h2>Popular wardrobe configurations</h2><p>Room size, circulation space, storage volume and daily routine determine which wardrobe type will work best. Compare these three practical configurations before planning the internals.</p></div><div className="wardrobe-layout-grid">{wardrobeTypes.map(wardrobe => <div className="layout-card-trigger" key={wardrobe.name}><article className="wardrobe-layout-card"><LayoutImagePreview className="wardrobe-layout-image" src={wardrobe.image} alt={wardrobe.alt} width={wardrobe.width} height={wardrobe.height} /><div className="wardrobe-layout-copy"><h3>{wardrobe.name}</h3><p className="wardrobe-layout-best"><strong>Best for:</strong> {wardrobe.bestFor}</p><p>{wardrobe.description}</p></div></article></div>)}</div><p className="small wardrobe-layout-note">The final shutter type, internal divisions and hardware are confirmed after measuring the room and checking door, window and electrical positions.</p></section>
}
