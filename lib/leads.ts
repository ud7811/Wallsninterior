import { z } from "zod"

/**
 * Lead validation and durable storage.
 *
 * A server action is directly POST-able, so the browser `required` attributes on
 * the contact form were never validation — the endpoint accepted anything and
 * returned ok. Everything below runs server-side.
 */

// Indian mobile numbers: 10 digits starting 6-9, optionally +91 / 91 / 0 prefixed.
// Spaces and dashes are stripped before checking so people can type naturally.
const PHONE = /^(?:\+?91|0)?[6-9]\d{9}$/

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .transform(v => v.replace(/[\s-()]/g, ""))
    .refine(v => PHONE.test(v), "Please enter a valid 10-digit Indian mobile number"),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  service: z.enum(["Interior Design", "Renovation", "Consultation"]).catch("Interior Design"),
  message: z.string().trim().max(2000).default(""),
  flatType: z.string().trim().max(40).default(""),
  tier: z.string().trim().max(40).default(""),
  priceRange: z.string().trim().max(80).default(""),
})

export type Lead = z.infer<typeof leadSchema>

/**
 * Appends the lead to a Google Sheet via an Apps Script Web App.
 *
 * This runs BEFORE the email. Previously a lead existed only as one Resend
 * message, so a send failure lost it permanently with no record anywhere. The
 * sheet also makes lead-to-customer rate measurable, which it currently is not.
 *
 * No-ops when LEADS_SHEET_WEBHOOK_URL is unset. Never throws: a storage failure
 * must not block the email, since a delivered email still means a reachable lead.
 */
export async function storeLead(lead: Lead, meta: Record<string, string>): Promise<boolean> {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL
  if (!url) return false
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receivedAt: new Date().toISOString(), ...lead, ...meta }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    })
    if (!res.ok) {
      console.error(`[leads] sheet webhook returned ${res.status}`)
      return false
    }
    return true
  } catch (error) {
    console.error("[leads] sheet webhook failed", error)
    return false
  }
}
