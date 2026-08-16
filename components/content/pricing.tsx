import Link from "next/link"
import type { PriceRange, PriceTier, RoomCostLine } from "@/types/content"
import { formatINR, formatRange, formatUnit } from "@/lib/format"

export function PriceHero({ range, label }: { range: PriceRange; label: string }) {
  return <div className="price-hero"><p className="eyebrow">{label}</p><p className="price-display">{formatRange(range)}</p><p className="price-unit">{formatUnit(range.unit)}</p>{!range.verified && <p className="price-note">Indicative market range — confirm on consultation</p>}</div>
}

export function PriceTierCards({ tiers }: { tiers: PriceTier[] }) {
  const ordered = [tiers[1], tiers[0], tiers[2]].filter(Boolean)
  return <div className="tier-grid">{ordered.map(tier => <article className={`tier-card ${tier.name === "Comfort" ? "tier-featured" : ""}`} key={tier.name}>
    {tier.name === "Comfort" && <span className="badge">Most popular</span>}<h3>{tier.name}</h3><p className="muted">{tier.tagline}</p><p className="tier-price">{formatRange(tier.range)}</p><p className="small">Best for: {tier.bestFor}</p>
    <h4>Included</h4><ul className="check-list">{tier.includes.map(i => <li key={i}>✓ {i}</li>)}</ul>
    <h4>Not included</h4><ul className="exclude-list">{tier.excludes.map(i => <li key={i}>× {i}</li>)}</ul>
    <p className="small"><strong>Materials:</strong> {tier.materials.ply} · {tier.materials.finish} · {tier.materials.hardware}</p>
    <Link className="button button-secondary" href="/contact">Discuss this tier</Link>
  </article>)}</div>
}

export function RoomCostTable({ lines, label = "Room / scope" }: { lines: RoomCostLine[]; label?: string }) {
  return <div className="table-wrap"><table><thead><tr><th>{label}</th><th>Indicative range</th><th>Notes</th></tr></thead><tbody>{lines.map(line => <tr key={line.room}><td data-label={label}>{line.room}</td><td data-label="Range" className="number">{formatINR(line.range.min)} – {formatINR(line.range.max)}</td><td data-label="Notes">{line.note ?? "Depends on scope and specification"}</td></tr>)}</tbody></table></div>
}
