import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/seo/structured-data"
import { breadcrumbsSchema, localBusinessSchema } from "@/lib/schema"

type LocalAreaPageProps = {
  area: string
  intro: string
  localNote: string
}

const services = [
  {
    title: "Home interiors",
    description: "Living rooms, bedrooms, kitchens, storage, lighting, colour, and finishes planned as one cohesive home.",
  },
  {
    title: "Office interiors",
    description: "Practical, welcoming workplaces designed around your team, workflow, brand, and available floor area.",
  },
  {
    title: "Renovation",
    description: "Layout improvements and finish upgrades for spaces that need a considered refresh rather than a complete rebuild.",
  },
]

export function LocalAreaPage({ area, intro, localNote }: LocalAreaPageProps) {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Service areas" }, { label: area }]
  return (
    <><StructuredData data={[localBusinessSchema([area]), breadcrumbsSchema(crumbs)]} /><main>
      <section className="section">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--accent-2)]">Walls N Interior</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">Interior Designer in {area}</h1>
            <p className="text-muted-foreground max-w-3xl text-lg">{intro}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"><Button size="lg">Book a consultation</Button></Link>
              <Link href="/portfolio"><Button size="lg" variant="outline">View our work</Button></Link>
            </div>
          </div>
          <aside className="card p-6 space-y-2">
            <h2 className="font-serif text-xl">A nearby design studio</h2>
            <p className="text-sm text-muted-foreground">{localNote}</p>
            <p className="text-sm">LGF-11, Avantika Retail Street, Crossings Republik, Ghaziabad 201016</p>
          </aside>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container mx-auto px-4 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-serif text-3xl">Interior services for your space</h2>
            <p className="text-muted-foreground">We begin with how you use the space, then shape the layout, materials, lighting, and details around it.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <div className="card p-6" key={service.title}>
                <h3 className="font-serif text-xl mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl">How the process works</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li><strong className="text-foreground">1. Consultation:</strong> Tell us about the space, your priorities, style, and budget.</li>
              <li><strong className="text-foreground">2. Design direction:</strong> We develop a practical layout and a clear visual direction.</li>
              <li><strong className="text-foreground">3. Details and execution:</strong> Materials, finishes, and site work are coordinated around the approved plan.</li>
            </ol>
          </div>
          <div className="card p-6 space-y-4">
            <h2 className="font-serif text-2xl">Planning a project in {area}?</h2>
            <p className="text-muted-foreground">Share your floor plan, a few photos, and what you want to change. We&apos;ll help you decide the right next step.</p>
            <Link href="/contact"><Button className="w-full sm:w-auto">Get a project consultation</Button></Link>
          </div>
        </div>
      </section>
    </main></>
  )
}
