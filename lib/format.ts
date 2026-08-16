import type { PriceRange, PriceUnit } from "@/types/content"

export function formatINR(value: number, compact = false) {
  if (compact) {
    if (value >= 10_000_000) return `₹${Number((value / 10_000_000).toFixed(1))}Cr`
    if (value >= 100_000) return `₹${Number((value / 100_000).toFixed(1))}L`
    if (value >= 1_000) return `₹${Math.round(value / 1_000)}K`
  }
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)
}

const units: Record<PriceUnit, string> = { total: "total", per_sqft: "/sq ft", per_rft: "/running ft", per_unit: "/unit" }
export function formatRange(range: PriceRange, compact = true) { return `${formatINR(range.min, compact)} – ${formatINR(range.max, compact)}` }
export function formatUnit(unit: PriceUnit) { return units[unit] }
export function formatArea(min: number, max: number) { return `${min.toLocaleString("en-IN")}–${max.toLocaleString("en-IN")} sq ft` }
