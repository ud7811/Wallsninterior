/**
 * Self-check for the transcribed Google reviews.
 *
 * data/testimonials.ts is hand-maintained, and its two failure modes are both
 * reputational rather than technical: a quote quietly reworded, or an aggregate
 * that no longer matches the public listing and so cannot survive Google
 * cross-checking it against the Business Profile.
 *
 * The quote assertions below pin the exact published text. If someone "fixes" a
 * customer's grammar, this fails — which is the point.
 *
 * Run: pnpm test
 */
import assert from "node:assert/strict"
import { testimonials, aggregate } from "@/data/testimonials"
import { localBusinessSchema } from "@/lib/schema"

// --- verbatim quotes, exactly as published on the listing --------------------
const PUBLISHED: Record<string, string> = {
  "avanish-yadav":
    "Really happy with their work! The team is professional, listens to your ideas, and delivers exactly what you want. The designs are modern, finishing is neat, and they complete work on time. Highly recommended for anyone looking for reliable interior work in Ghaziabad.",
  "charu-sharma":
    "Really happy with the service! The team was polite, helpful, and delivered everything on time. The designs came out even better than I expected. Definitely one of the best interior services I've come across!",
  // Reproduced with its original grammar. Do not "correct" it.
  "shikha-mathur": "Excellent work within time best material and budget friendly",
}

for (const t of testimonials) {
  assert.equal(t.quote, PUBLISHED[t.slug], `quote for ${t.slug} must match the published review verbatim`)
  assert.equal(t.source, "google", `${t.slug} must be attributed to Google`)
  assert.equal(t.verified, true, `${t.slug} must be marked verified — it was read off the live listing`)
  assert.ok(t.clientName.trim().length > 0, `${t.slug} must carry the reviewer's name as attribution`)
  assert.ok(t.rating >= 1 && t.rating <= 5)
}

// --- aggregate must be self-consistent and plausible -------------------------
assert.ok(aggregate.rating > 0 && aggregate.rating <= 5, "rating must be a real 1-5 value")
assert.ok(Number.isInteger(aggregate.reviewCount) && aggregate.reviewCount > 0, "review count must be a positive integer")
assert.ok(aggregate.reviewCount >= testimonials.length, "cannot display more reviews than the listing has")
assert.match(aggregate.listingUrl, /^https:\/\/www\.google\.com\/maps\//, "must link to the Google listing so claims are checkable")
assert.match(aggregate.capturedOn, /^\d{4}-\d{2}-\d{2}$/, "capture date tells the next maintainer how stale this is")

// Every displayed review is 5 stars, so the average cannot be below them.
const shownMin = Math.min(...testimonials.map(t => t.rating))
assert.ok(aggregate.rating >= shownMin - 1.5, "headline rating is implausible against the reviews on display")

// --- schema mirrors the same numbers ----------------------------------------
const schema = localBusinessSchema() as Record<string, any>
assert.equal(schema.aggregateRating.ratingValue, aggregate.rating, "schema rating must not drift from the data file")
assert.equal(schema.aggregateRating.reviewCount, aggregate.reviewCount, "schema count must not drift from the data file")
assert.equal(schema.aggregateRating.bestRating, 5)

console.log(`testimonials: all assertions passed (${testimonials.length} shown, ${aggregate.rating} from ${aggregate.reviewCount})`)
