/**
 * Budget and home-size options for the lead form. Shared by the form, the server
 * schema, the email subject and the GA4 events so the values cannot drift apart.
 *
 * `leadValue` is the INR value reported to GA4 / Google Ads: a rough midpoint of
 * the band, not a quote. It lets Ads tell a ₹10L lead from a ₹2L one.
 */
export const BUDGETS = [
  { value: "lt3", label: "Under ₹3 Lakh", short: "Under ₹3L", leadValue: 200000 },
  { value: "3-5", label: "₹3 – 5 Lakh", short: "₹3–5L", leadValue: 400000 },
  { value: "5-10", label: "₹5 – 10 Lakh", short: "₹5–10L", leadValue: 750000 },
  { value: "10plus", label: "₹10 Lakh+", short: "₹10L+", leadValue: 1200000 },
] as const

export const HOME_SIZES = [
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
  { value: "4bhk", label: "4 BHK / Villa" },
  { value: "partial", label: "Only kitchen / wardrobe" },
] as const

export type Budget = (typeof BUDGETS)[number]["value"]
export type HomeSize = (typeof HOME_SIZES)[number]["value"]

export const BUDGET_VALUES = BUDGETS.map(b => b.value) as [Budget, ...Budget[]]
export const HOME_SIZE_VALUES = HOME_SIZES.map(h => h.value) as [HomeSize, ...HomeSize[]]

export const isHighValue = (b: string) => b === "5-10" || b === "10plus"

export const budgetOption = (b: string) => BUDGETS.find(x => x.value === b)
export const homeSizeOption = (h: string) => HOME_SIZES.find(x => x.value === h)

/** "3 BHK" (a BHK page's label or the calculator's ?flat=) -> "3bhk"; anything else -> "". */
export function homeSizeFromLabel(label: string | undefined): HomeSize | "" {
  const n = label?.match(/^\s*(\d)\s*BHK/i)?.[1]
  return n === "2" ? "2bhk" : n === "3" ? "3bhk" : n === "4" ? "4bhk" : ""
}

/** WhatsApp prefill carrying the visitor's answers, so the chat starts qualified. */
export function leadWhatsAppText(homeSize: string, budget: string) {
  const size = homeSizeOption(homeSize)
  const b = budgetOption(budget)
  const subject = homeSize === "partial" ? "a kitchen / wardrobe" : size ? `my ${size.label} home` : "my home"
  return `Hi Walls N Interior, I'd like a quote for ${subject}.${b ? ` Budget: ${b.short}.` : ""}`
}
