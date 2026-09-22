"use client"

import Script from "next/script"

/**
 * Google Analytics 4 base tag (gtag.js).
 * Renders nothing until NEXT_PUBLIC_GA4_ID (G-XXXXXXX) is set in the environment.
 * Page views are sent manually on route change by <AnalyticsEvents /> so that
 * client-side (SPA) navigations are counted, so send_page_view is disabled here.
 */
export function GA() {
  const id = process.env.NEXT_PUBLIC_GA4_ID
  if (!id) return null
  return (
    <>
      <Script id="ga4-src" async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="ga4-init">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', { send_page_view: false });
        `}
      </Script>
    </>
  )
}

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
}

/**
 * Fire a GA4 event. Uses gtag() when the GA4 tag is present, and falls back to a
 * GTM-style dataLayer push so the same call keeps working if a GTM container is
 * added later. Only pass anonymous, non-PII parameters (event names, page paths).
 */
export function pushEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const w = window as GtagWindow
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params)
  } else {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ event: name, ...params })
  }
}

/** Send a GA4 page_view for the current document (used on every route change). */
export function trackPageView(path: string) {
  if (typeof window === "undefined") return
  const w = window as GtagWindow
  if (typeof w.gtag !== "function") return
  w.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
