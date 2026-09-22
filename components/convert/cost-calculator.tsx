"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { formatINR } from "@/lib/format"
import { siteConfig } from "@/config/site"
import { buildWhatsAppLink } from "@/lib/whatsapp"
import { bhkConfigs } from "@/data/bhk"
import { pushEvent } from "@/lib/ga"
import WhatsAppIcon from "@/components/site/whatsapp-icon"

// Derived from data/bhk.ts rather than restated here. These used to be a second,
// independently drifting copy of the same prices — and they had already drifted:
// the typical-area midpoints read 1300 / 2000 against the data's 1350 / 2100.
const base = Object.fromEntries(bhkConfigs.map(c => [c.label, [c.headlinePrice.min, c.headlinePrice.max] as const]))
const midArea = Object.fromEntries(bhkConfigs.map(c => [c.label, (c.typicalCarpetArea.min + c.typicalCarpetArea.max) / 2]))

// Deliberately NOT derived from the published tier ranges: those are absolute
// bands per BHK, while these are multipliers against the headline range. Tune here.
const factors = { Essential: .72, Comfort: 1, Premium: 1.42 } as const

const SCOPES = ["Full home", "Kitchen + wardrobes", "Kitchen only"] as const

export default function CostCalculator() {
  const [bhk, setBhk] = useState<string>("3 BHK")
  const [area, setArea] = useState(1250)
  const [tier, setTier] = useState<keyof typeof factors>("Comfort")
  const [scope, setScope] = useState<string>("Full home")
  const touched = useRef(false)

  const estimate = useMemo(() => {
    const b = base[bhk]
    const areaFactor = Math.max(.75, Math.min(1.35, area / midArea[bhk]))
    const scopeFactor = scope === "Full home" ? 1 : scope === "Kitchen + wardrobes" ? .55 : .25
    return [
      Math.round(b[0] * factors[tier] * areaFactor * scopeFactor / 10000) * 10000,
      Math.round(b[1] * factors[tier] * areaFactor * scopeFactor / 10000) * 10000,
    ]
  }, [bhk, area, tier, scope])

  const rangeLabel = `${formatINR(estimate[0], true)} – ${formatINR(estimate[1], true)}`

  // The calculator is the highest-intent surface on the site and fired no events at
  // all. `calculator_used` marks engagement on first interaction; the debounced
  // `calculator_result` captures people who see a number and leave without clicking
  // anything — the drop-off that matters most here.
  function onInteract() {
    if (touched.current) return
    touched.current = true
    pushEvent("calculator_used", { page_path: "/tools/cost-calculator" })
  }

  useEffect(() => {
    if (!touched.current) return
    const t = setTimeout(() => pushEvent("calculator_result", {
      bhk, carpet_area: area, tier, scope, estimate_min: estimate[0], estimate_max: estimate[1],
    }), 1500)
    return () => clearTimeout(t)
  }, [bhk, area, tier, scope, estimate])

  // Carries the estimate into the existing /contact?flat=&tier=&range= contract, so
  // the lead email subject reads "New 3 BHK Comfort tier enquiry" instead of the
  // generic default, and the form shows the visitor their own selection back.
  const contactHref = `/contact?flat=${encodeURIComponent(bhk)}&tier=${encodeURIComponent(tier)}&range=${encodeURIComponent(rangeLabel)}`
  const whatsappHref = buildWhatsAppLink({
    number: siteConfig.whatsapp,
    text: `Hi Walls N Interior, my website estimate is ${formatINR(estimate[0])}–${formatINR(estimate[1])} for a ${bhk}, ${area} sq ft, ${tier}, ${scope.toLowerCase()} project.`,
  })

  return <div className="calculator">
    <div className="calculator-fields" onChange={onInteract} onClick={onInteract}>
      <fieldset><legend>1. Property</legend><div className="choice-row">{Object.keys(base).map(v => <button className={bhk === v ? "active" : ""} onClick={() => setBhk(v)} type="button" key={v}>{v}</button>)}</div></fieldset>
      <fieldset><legend>2. Carpet area: <strong>{area.toLocaleString("en-IN")} sq ft</strong></legend><input type="range" min="400" max="3000" step="50" value={area} onChange={e => setArea(Number(e.target.value))} aria-label="Carpet area in square feet" /></fieldset>
      <fieldset><legend>3. Scope</legend><div className="choice-row">{SCOPES.map(v => <button className={scope === v ? "active" : ""} onClick={() => setScope(v)} type="button" key={v}>{v}</button>)}</div></fieldset>
      <fieldset><legend>4. Finish</legend><div className="choice-row">{Object.keys(factors).map(v => <button className={tier === v ? "active" : ""} onClick={() => setTier(v as keyof typeof factors)} type="button" key={v}>{v}</button>)}</div></fieldset>
    </div>
    <aside className="calculator-result">
      <p className="eyebrow light">Your indicative estimate</p>
      <p className="price-display">{rangeLabel}</p>
      <p>Shown before we ask for your phone number. Final pricing needs site measurement and an itemised scope.</p>
      <ul>
        <li>Includes design and selected modular scope</li>
        <li>Excludes civil work, appliances and loose furniture</li>
        <li>Uses unverified August 2026 market benchmarks</li>
      </ul>
      <a className="button button-whatsapp" data-cta="calculator-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp this estimate</a>
      <Link className="button button-light" data-cta="calculator-contact" href={contactHref}>Request site measurement</Link>
    </aside>
  </div>
}
