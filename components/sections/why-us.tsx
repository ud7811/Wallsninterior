import { ShieldCheck, Palette, Wrench } from 'lucide-react'

export function WhyUs() {
  const items = [
    { icon: Palette, title: "Custom Designs", text: "Tailored concepts that reflect your style and space." },
    { icon: ShieldCheck, title: "Premium Materials", text: "We source high-quality finishes and premium materials." },
    { icon: Wrench, title: "Expert Installation", text: "Experienced installers ensure a flawless finish." },
  ]
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">Why Choose Us</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <div key={idx} className="card p-6">
              <it.icon className="w-8 h-8 mb-3 text-[color:var(--accent-2)]" />
              <div className="font-semibold mb-1">{it.title}</div>
              <p className="text-sm text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
