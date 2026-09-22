import type { Testimonial } from "@/types/content"
import { testimonials, aggregate } from "@/data/testimonials"

const Stars = ({ rating }: { rating: number }) => (
  <span className="review-stars" role="img" aria-label={`${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= Math.round(rating) ? "on" : ""} aria-hidden>★</span>)}
  </span>
)

/**
 * Google reviews, transcribed into data/testimonials.ts rather than fetched.
 *
 * Quotes are shown verbatim and attributed, and the section links out to the
 * public listing so any claim here can be checked against the source. Renders
 * nothing if the data file is emptied.
 */
export function GoogleReviews({ items = testimonials, max = 3 }: { items?: Testimonial[]; max?: number }) {
  const shown = items.slice(0, max)
  if (shown.length === 0) return null

  return (
    <section className="content-section" id="reviews">
      <div className="section-heading">
        <p className="eyebrow">What homeowners say</p>
        <h2>Rated {aggregate.rating.toFixed(1)} on Google</h2>
        <p>Every one of our {aggregate.reviewCount} Google reviews is five stars. Here are three, word for word.</p>
      </div>
      <div className="card-grid">
        {shown.map(item => (
          <article className="review-card" key={item.slug}>
            <Stars rating={item.rating} />
            <blockquote>{item.quote}</blockquote>
            <footer className="review-author">
              <div>
                <strong>{item.clientName}</strong>
                <span>{item.localityName ? `${item.localityName} · Google review` : "Google review"}</span>
              </div>
            </footer>
          </article>
        ))}
      </div>
      <div className="section-cta">
        <a className="button button-secondary" href={aggregate.listingUrl} target="_blank" rel="noreferrer" data-cta="reviews-google">
          Read all {aggregate.reviewCount} reviews on Google
        </a>
      </div>
    </section>
  )
}
