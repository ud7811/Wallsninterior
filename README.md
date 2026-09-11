# Wallsninterior

Interior design and execution studio site for Ghaziabad, Noida and Greater Noida.

## Tech

- Next.js 15 (App Router) + TypeScript
- Plain CSS in `styles/theme.css` for the live site (shadcn/Tailwind survives only in `components/ui`)
- Server Actions for the contact form (Resend email + Google Sheet storage)
- JSON-LD: LocalBusiness, Organization, WebSite, Service, FAQPage, BreadcrumbList, Article
- GA4 + Vercel Analytics

## Commands

```bash
pnpm dev        # local dev
pnpm test       # assertion self-checks in lib/*.test.ts
pnpm typecheck  # tsc --noEmit
pnpm verify     # typecheck + test + production build
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **yes in production** (build throws without it) | Canonical URLs, schema, OG tags |
| `RESEND_API_KEY` | yes | Contact-form email |
| `RESEND_FROM_EMAIL` | yes | Without it Resend falls back to its shared test sender |
| `CONTACT_TO_EMAIL` | no | Defaults to `wallsninterior@gmail.com` |
| `LEADS_SHEET_WEBHOOK_URL` | no | Durable lead storage — see below |
| `NEXT_PUBLIC_GA4_ID` | no | GA4 renders nothing when unset |
| `NEXT_PUBLIC_GSC_VERIFICATION` | no | Search Console meta tag |

Everything optional degrades to nothing rendered — never to a placeholder. See `DECISIONS.md`.

## Google reviews

Reviews are transcribed by hand into `data/testimonials.ts` from the Google
Business Profile (Place ID `ChIJN_GmxwPvDDkRm2vl2xZMPEY`), not fetched. The Places
API needs a billing account on file for what would be ~30 calls a month, which
wasn't worth it.

Two rules when editing that file, both enforced by `lib/testimonials.test.ts`:

1. **Quotes are verbatim.** Reproduced exactly as published, typos included.
   Rewording a customer misrepresents them.
2. **`aggregate` matches the live listing.** It feeds `aggregateRating` in the
   LocalBusiness schema, which earns star snippets in search — and which Google
   cross-checks against the Business Profile. A rating it can't verify is a
   manual-action risk.

The trade-off versus the API is staleness: nothing refreshes on its own. Re-read
the listing whenever the rating or count moves and update `capturedOn`. As of
2026-09-11 it was 5.0 from 52 reviews, all five-star.

## Lead storage

Every lead is written to a Google Sheet **before** the Resend email is sent, so a
mail failure cannot lose it. Without `LEADS_SHEET_WEBHOOK_URL` the write is skipped
and behaviour matches the old email-only path.

Setup (~5 min, no billing):

1. Create a Google Sheet named e.g. "Walls N Interior — Leads". Leave it empty;
   the script writes its own header row on first use.
2. Extensions → Apps Script. Delete the stub and paste `scripts/leads-sheet.gs`.
3. Deploy → New deployment → Web app. **Execute as: Me. Who has access: Anyone.**
   Vercel calls it unauthenticated, so "Only myself" silently returns a login page
   instead of writing the row.
4. Copy the `/exec` URL into `LEADS_SHEET_WEBHOOK_URL` on Vercel (all environments),
   then redeploy — existing deployments do not pick up new env vars.
5. Verify before trusting it with real leads:

   ```bash
   ./scripts/check-leads-webhook.sh 'https://script.google.com/macros/s/AKfy.../exec'
   ```

   A row appears named "TEST ROW - delete me". Delete it.

The sheet has a `status` column the site never writes. Filling it in is what makes
lead-to-customer rate answerable — GA4 cannot tell you that, because contact
details must never be sent to Analytics.

`lib/leads.integration.test.ts` covers the failure modes: Resend down but storage
working still reports success to the visitor, an invalid phone stores nothing, a
honeypot hit stores nothing, and with *neither* channel working the visitor is told
to call rather than shown a false success.

## Content gaps

`CONTENT-TODO.md` tracks what is deliberately missing pending owner-supplied
evidence — testimonials, verified project count, warranty terms, studio geo
coordinates. `config/site.ts` has `geo`, `projectsCompleted` and `foundedYear` as
nulls ready to receive them; each renders only once set.
