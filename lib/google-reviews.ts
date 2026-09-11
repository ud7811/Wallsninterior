// Google Places API (New). Server-only by construction: neither env var carries a
// NEXT_PUBLIC_ prefix, so the key cannot reach the bundle. DECISIONS.md forbids publishing ratings
// or testimonials without real owner-supplied evidence, so every function here
// returns null rather than a fallback when the credentials or the response are
// missing. Callers must render nothing in that case.

export interface GoogleReview {
  author: string
  authorPhoto?: string
  authorUri?: string
  rating: number
  text: string
  relativeTime: string
}

export interface GooglePlaceReviews {
  rating: number
  reviewCount: number
  reviews: GoogleReview[]
  mapsUri: string
  writeReviewUri?: string
}

export interface PlacesResponse {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  googleMapsLinks?: { writeAReviewUri?: string }
  reviews?: {
    rating?: number
    relativePublishTimeDescription?: string
    text?: { text?: string }
    originalText?: { text?: string }
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string }
  }[]
}

const FIELDS = ["rating", "userRatingCount", "googleMapsUri", "googleMapsLinks.writeAReviewUri", "reviews"].join(",")

/**
 * Fetches the Google Business Profile rating and reviews.
 *
 * Revalidates daily: one request per day is negligible against the Places quota,
 * and it keeps us inside Google's terms, which forbid caching review content for
 * more than 30 days.
 *
 * Returns null when unconfigured or on any failure — never a placeholder.
 */
export async function getGoogleReviews(): Promise<GooglePlaceReviews | null> {
  const placeId = process.env.GOOGLE_PLACE_ID
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!placeId || !apiKey) return null

  let data: PlacesResponse
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": FIELDS },
      next: { revalidate: 86400, tags: ["google-reviews"] },
    })
    if (!res.ok) {
      console.error(`[google-reviews] Places API returned ${res.status}: ${await res.text()}`)
      return null
    }
    data = (await res.json()) as PlacesResponse
  } catch (error) {
    console.error("[google-reviews] Places API request failed", error)
    return null
  }

  return parsePlacesResponse(data)
}

/**
 * Maps a Places API payload to our shape. Pure, so it is exercised directly by
 * lib/google-reviews.test.ts without needing credentials or a network call.
 *
 * Returns null unless the payload carries a real rating and at least one rating,
 * which is what keeps an empty or malformed response from rendering as proof.
 */
export function parsePlacesResponse(data: PlacesResponse): GooglePlaceReviews | null {
  if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number" || data.userRatingCount < 1) return null

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .map(r => ({
      author: r.authorAttribution?.displayName ?? "",
      authorPhoto: r.authorAttribution?.photoUri,
      authorUri: r.authorAttribution?.uri,
      rating: r.rating ?? 0,
      // Google's terms require review text be shown unedited, so this is never truncated.
      text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
      relativeTime: r.relativePublishTimeDescription ?? "",
    }))
    .filter(r => r.author && r.text && r.rating > 0)
    .sort((a, b) => b.rating - a.rating)

  return {
    rating: data.rating,
    reviewCount: data.userRatingCount,
    reviews,
    mapsUri: data.googleMapsUri ?? "",
    writeReviewUri: data.googleMapsLinks?.writeAReviewUri,
  }
}
