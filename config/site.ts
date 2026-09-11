export const siteConfig = {
  name: "Walls N Interior",
  legalName: "Walls N Interior",
  shortName: "Wallsninterior",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://wallsninterior.com").replace(/\/$/, ""),
  description:
    "Interior design and execution for apartments, kitchens, wardrobes and renovations across Ghaziabad, Noida and Greater Noida.",
  locale: "en-IN",
  currency: "INR",
  timezone: "Asia/Kolkata",
  phone: "+917428095297",
  phoneDisplay: "+91 74280 95297",
  // Overridable from Vercel without a code change. This is the single source for
  // every WhatsApp link on the site — previously only /contact read the env var
  // while everywhere else read the literal below, so changing it in Vercel updated
  // one page and left the rest disagreeing.
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917428095297").replace(/[^0-9]/g, ""),
  email: "wallsninterior@gmail.com",
  address: {
    street: "LGF-11, Avantika Retail Street",
    locality: "Crossings Republik",
    city: "Ghaziabad",
    region: "Uttar Pradesh",
    postalCode: "201016",
    country: "IN",
  },
  hours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "22:00" }],
  priceRange: "₹₹",
  areas: ["Ghaziabad", "Noida", "Greater Noida"],
  social: {} as Record<string, string>,

  // Prefilled WhatsApp copy, kept here so wording changes don't require touching
  // components. Each entry is tied to the CTA that sends it, which is what makes
  // the incoming message tell you where the visitor came from.
  whatsappMessages: {
    hero: "Hi Walls N Interior, I'd like a one-tap estimate for my home interiors.",
    header: "Hi Walls N Interior, I'd like a free interior design quote.",
    sticky: "Hi Walls N Interior, I saw your prices and would like an estimate.",
    ctaBanner: "Hi Walls N Interior, I saw your published prices and would like an itemised estimate.",
    contact: "Hi Walls N Interior, I'd like a design consultation.",
  },

  // Studio coordinates for the LocalBusiness geo block, read off the Google Business
  // Profile pin (Place ID ChIJN_GmxwPvDDkRm2vl2xZMPEY), whose address matches the one
  // above exactly.
  geo: { lat: 28.633043, lng: 77.442999 } as { lat: number; lng: number } | null,

  // Owner-supplied trust numbers for the hero stat strip. Each renders only when set,
  // so leaving one null simply omits that stat. DECISIONS.md: never guess these.
  // Confirmed by the owner 2026-09-11. Bump projectsCompleted as homes complete —
  // it is displayed as "25+", so it must never overstate the real figure.
  projectsCompleted: 25 as number | null,
  foundedYear: 2024 as number | null,
} as const

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
