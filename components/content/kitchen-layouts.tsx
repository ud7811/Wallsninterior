import { LayoutImagePreview } from "@/components/content/layout-image-preview"

const layouts = [
  {
    name: "L-shaped kitchen",
    image: "/images/kitchen-layouts/l-shaped-kitchen.jpg",
    width: 626,
    height: 632,
    alt: "Modern L-shaped modular kitchen with counters on two adjoining walls",
    bestFor: "Compact to medium kitchens and open-plan homes",
    description: "Cabinetry runs along two adjoining walls, leaving the remaining area open for movement or dining. It creates an efficient cooking triangle while using a corner that might otherwise be wasted.",
  },
  {
    name: "U-shaped kitchen",
    image: "/images/kitchen-layouts/u-shaped-kitchen.jpg",
    width: 736,
    height: 589,
    alt: "Modern U-shaped modular kitchen with storage and counters on three sides",
    bestFor: "Medium to large kitchens with a dedicated room",
    description: "Three connected counter runs provide generous preparation space and storage. Cooking, washing and pantry zones can be separated clearly, making this layout practical for frequent cooking.",
  },
  {
    name: "Parallel kitchen",
    image: "/images/kitchen-layouts/parallel-kitchen.jpg",
    width: 1200,
    height: 1500,
    alt: "Parallel modular kitchen with counters and cabinets on two facing walls",
    bestFor: "Long or narrow kitchens and busy cooking routines",
    description: "Two facing cabinet runs divide preparation, cooking and washing into efficient work zones. It offers excellent storage and counter capacity when the central aisle is planned for comfortable movement.",
  },
] as const

export default function KitchenLayouts() {
  return <section className="content-section kitchen-layout-section"><div className="section-heading"><p className="eyebrow">Choose the right configuration</p><h2>Popular modular-kitchen layouts</h2><p>Your room dimensions, doors, windows, service points and cooking routine determine the best layout. These three configurations cover many apartment kitchens.</p></div><div className="kitchen-layout-grid">{layouts.map(layout => <div className="layout-card-trigger" key={layout.name}><article className="kitchen-layout-card"><LayoutImagePreview className="kitchen-layout-image" src={layout.image} alt={layout.alt} width={layout.width} height={layout.height} /><div className="kitchen-layout-copy"><h3>{layout.name}</h3><p className="kitchen-layout-best"><strong>Best for:</strong> {layout.bestFor}</p><p>{layout.description}</p></div></article></div>)}</div><p className="small kitchen-layout-note">The final configuration is confirmed only after site measurement and appliance positions are checked.</p></section>
}
