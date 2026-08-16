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
  whatsapp: "917428095297",
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
} as const

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
