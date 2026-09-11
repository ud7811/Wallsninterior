import type { Testimonial } from "@/types/content"

/**
 * Reviews transcribed verbatim from the Walls N Interior Google Business Profile
 * (Place ID ChIJN_GmxwPvDDkRm2vl2xZMPEY) on 2026-09-11.
 *
 * Satisfies DECISIONS.md: these are real, owner-owned reviews, not invented ones.
 * Two rules when editing this file:
 *
 *  1. Never alter quote text. It is reproduced exactly as published, typos included.
 *     Rewriting a customer's words misrepresents them and breaks Google's terms.
 *  2. Never add an entry that is not on the public listing, and keep `aggregate`
 *     matching what the listing actually shows. It feeds aggregateRating in the
 *     LocalBusiness schema, and a rating Google cannot verify is a manual-action
 *     risk, not just a fib.
 *
 * Chosen to answer the objections the FAQ raises rather than for enthusiasm:
 * on-time delivery, being listened to, finish quality, and price.
 */
export const testimonials: Testimonial[] = [
  {
    slug: "avanish-yadav",
    clientName: "Avanish Yadav",
    localityName: "Ghaziabad",
    rating: 5,
    quote:
      "Really happy with their work! The team is professional, listens to your ideas, and delivers exactly what you want. The designs are modern, finishing is neat, and they complete work on time. Highly recommended for anyone looking for reliable interior work in Ghaziabad.",
    date: "2025-10",
    source: "google",
    verified: true,
  },
  {
    slug: "charu-sharma",
    clientName: "Charu Sharma",
    rating: 5,
    quote:
      "Really happy with the service! The team was polite, helpful, and delivered everything on time. The designs came out even better than I expected. Definitely one of the best interior services I've come across!",
    date: "2025-10",
    source: "google",
    verified: true,
  },
  {
    slug: "shikha-mathur",
    clientName: "Shikha Mathur",
    rating: 5,
    quote: "Excellent work within time best material and budget friendly",
    date: "2026-04",
    source: "google",
    verified: true,
  },
]

/**
 * Headline numbers from the same listing, same date. Refresh both together —
 * a stale count is the most likely way this file drifts out of truth.
 */
export const aggregate = {
  rating: 5.0,
  reviewCount: 52,
  capturedOn: "2026-09-11",
  listingUrl: "https://www.google.com/maps/place/?q=place_id:ChIJN_GmxwPvDDkRm2vl2xZMPEY",
}
