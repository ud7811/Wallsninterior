import type { GooglePlaceReviews } from "@/lib/google-reviews"

const Stars = ({ rating }: { rating: number }) => (
  <span className="review-stars" role="img" aria-label={`${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= Math.round(rating) ? "on" : ""} aria-hidden>★</span>)}
  </span>
)

/**
 * Google Business Profile reviews.
 *
 * Google's terms require attribution (name, photo, relative time), unedited text
 * and a link through to the listing — so none of that is optional styling here.
 *
 * Renders nothing when `data` is null so the page degrades to exactly what it was
 * before any reviews existed, per DECISIONS.md.
 */
export function GoogleReviews({ data, max = 3 }: { data: GooglePlaceReviews | null; max?: number }) {
  if (!data || data.reviews.length === 0) return null
  const shown = data.reviews.slice(0, max)

  return (
    <section className="content-section" id="reviews">
      <div className="section-heading">
        <p className="eyebrow">What homeowners say</p>
        <h2>Rated {data.rating.toFixed(1)} on Google</h2>
        <p>Across {data.reviewCount} {data.reviewCount === 1 ? "review" : "reviews"} from completed Walls N Interior homes.</p>
      </div>
      <div className="card-grid">
        {shown.map(review => (
          <article className="review-card" key={`${review.author}-${review.relativeTime}`}>
            <Stars rating={review.rating} />
            <blockquote>{review.text}</blockquote>
            <footer className="review-author">
              {/* Plain img: a 36px avatar on a Google-hosted domain is not worth a remotePatterns entry. */}
              {review.authorPhoto && <img src={review.authorPhoto} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" />}
              <div>
                <strong>{review.author}</strong>
                <span>{review.relativeTime}</span>
              </div>
            </footer>
          </article>
        ))}
      </div>
      {data.mapsUri && (
        <div className="section-cta">
          <a className="button button-secondary" href={data.mapsUri} target="_blank" rel="noreferrer" data-cta="reviews-google">
            Read all {data.reviewCount} reviews on Google
          </a>
        </div>
      )}
    </section>
  )
}
