/**
 * Self-check for the Places response mapping and the aggregateRating schema.
 *
 * These two guard a promise the site makes in DECISIONS.md — that no rating or
 * testimonial is ever published without real evidence behind it — so the cases
 * that matter most here are the ones that must return nothing.
 *
 * Run: pnpm test:reviews
 */
import assert from "node:assert/strict"
import { parsePlacesResponse, type PlacesResponse } from "./google-reviews"
import { localBusinessSchema } from "./schema"

const review = (rating: number, name: string, text: string, when = "2 months ago") => ({
  rating,
  relativePublishTimeDescription: when,
  text: { text },
  authorAttribution: { displayName: name, photoUri: `https://lh3.googleusercontent.com/${name}`, uri: `https://maps.google.com/${name}` },
})

const full: PlacesResponse = {
  rating: 4.7,
  userRatingCount: 63,
  googleMapsUri: "https://maps.google.com/?cid=123",
  reviews: [review(3, "Mid Review", "It was fine."), review(5, "Best Review", "Outstanding work start to finish."), review(4, "Good Review", "Happy with the kitchen.")],
}

// --- happy path -------------------------------------------------------------
const parsed = parsePlacesResponse(full)
assert.ok(parsed, "a well-formed payload should parse")
assert.equal(parsed.rating, 4.7)
assert.equal(parsed.reviewCount, 63)
assert.equal(parsed.mapsUri, "https://maps.google.com/?cid=123")

// Sorted best-first, because the homepage shows only the top few.
assert.deepEqual(parsed.reviews.map(r => r.rating), [5, 4, 3])
assert.equal(parsed.reviews[0].author, "Best Review")
assert.equal(parsed.reviews[0].text, "Outstanding work start to finish.")
assert.ok(parsed.reviews[0].authorPhoto?.startsWith("https://"), "attribution photo is required by Google's terms")
assert.equal(parsed.reviews[0].relativeTime, "2 months ago")

// --- the cases that must yield nothing --------------------------------------
assert.equal(parsePlacesResponse({}), null, "empty payload must not render as proof")
assert.equal(parsePlacesResponse({ rating: 4.9 }), null, "a rating with no count must not render")
assert.equal(parsePlacesResponse({ rating: 4.9, userRatingCount: 0 }), null, "zero ratings must not render")

// A place with a rating but no review bodies still yields a valid aggregate.
const noBodies = parsePlacesResponse({ rating: 5, userRatingCount: 4 })
assert.ok(noBodies)
assert.deepEqual(noBodies.reviews, [])

// Reviews missing an author or text are dropped rather than rendered blank.
const partial = parsePlacesResponse({
  rating: 4,
  userRatingCount: 9,
  reviews: [review(5, "", "no author"), { rating: 5, text: { text: "" }, authorAttribution: { displayName: "No Text" } }, review(4, "Keeper", "Real review.")],
})
assert.equal(partial?.reviews.length, 1)
assert.equal(partial?.reviews[0].author, "Keeper")

// --- schema -----------------------------------------------------------------
const withRating = localBusinessSchema(undefined, parsed) as Record<string, any>
assert.equal(withRating.aggregateRating.ratingValue, 4.7)
assert.equal(withRating.aggregateRating.reviewCount, 63)
assert.equal(withRating.aggregateRating["@type"], "AggregateRating")

const withoutRating = localBusinessSchema(undefined, null) as Record<string, any>
assert.equal("aggregateRating" in withoutRating, false, "no reviews must mean no aggregateRating in JSON-LD")

console.log("google-reviews: all assertions passed")
