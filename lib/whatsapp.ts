export function buildWhatsAppLink({
  number,
  text,
}: {
  number: string
  text: string
}) {
  const encoded = encodeURIComponent(text)
  // Expect number like 91XXXXXXXXXX without +
  return `https://wa.me/${number}?text=${encoded}`
}

/**
 * Turns the current route into the subject of the WhatsApp prefill, so an enquiry
 * from /services/modular-kitchen arrives saying "modular kitchen" instead of being
 * indistinguishable from a wardrobe enquiry.
 *
 * Labels are derived from the slug rather than imported from data/services-v2.ts or
 * data/bhk.ts on purpose: these run in client components, and importing those files
 * would pull their SEO copy, materials and FAQs into the browser bundle to produce
 * a two-word string. The slug IS the source of truth, so it cannot drift — only the
 * acronym casing below needs maintaining.
 */
const ACRONYMS: Record<string, string> = { tv: "TV", bhk: "BHK" }

/** "tv-units" -> "TV units". Reads mid-sentence, so only acronyms get capitals. */
function phrase(slug: string) {
  return slug.split("-").map(word => ACRONYMS[word] ?? word).join(" ")
}

/** "greater-noida" -> "Greater Noida". For proper nouns. */
function properNoun(slug: string) {
  return slug.split("-").map(word => ACRONYMS[word] ?? word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

/** The thing a visitor on this path is looking at, or null on generic pages. */
export function subjectForPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/"

  const service = path.match(/^\/services\/([a-z0-9-]+)/)
  // Each subject has to read correctly in "a quote for ___", so singular services
  // need an article and plural ones must not have one.
  // ponytail: trailing "s" as the plural test, fine for the four current slugs
  if (service) return service[1].endsWith("s") ? phrase(service[1]) : `a ${phrase(service[1])}`

  // e.g. 3bhk-flat-interior-design -> "3 BHK"
  const bhk = path.match(/^\/interiors\/(\d)bhk/)
  if (bhk) return `${bhk[1]} BHK interiors`

  const cost = path.match(/^\/cost\/(\d)bhk/)
  if (cost) return `${cost[1]} BHK interiors`
  if (path === "/cost" || path.startsWith("/cost/")) return "interior costs"

  const area = path.match(/^\/areas\/([a-z-]+)/)
  if (area) return `interiors in ${properNoun(area[1])}`

  if (path.startsWith("/projects/")) return "a project like the one on your site"

  return null
}

/**
 * Prefill text for a WhatsApp CTA. `fallback` is the wording used on pages with no
 * specific subject (home, about, contact), so those keep their existing copy.
 */
export function messageForPath(pathname: string, fallback: string) {
  const subject = subjectForPath(pathname)
  return subject ? `Hi Walls N Interior, I'd like a quote for ${subject}.` : fallback
}
