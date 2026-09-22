"use server"

import { Resend } from "resend"
import { getResendConfig } from "@/lib/email"
import { leadSchema, storeLead, type Lead } from "@/lib/leads"

export type ContactPayload = {
  name: string
  phone: string
  city: string
  service: string
  message: string
  flatType?: string
  tier?: string
  priceRange?: string
  // Hidden field. Real users never see it, so anything filled in here is a bot.
  company?: string
  ctaId?: string
}

export type ContactResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> }

const escapeHtml = (value: string | undefined) =>
  (value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] ?? char)

// Per-process, best-effort. Serverless instances are short-lived and not shared, so
// this stops a naive flood rather than a distributed one — which is the actual
// threat for a site this size.
// ponytail: in-memory rate limit, move to Upstash/KV if spam gets past it
const RATE_LIMIT = { windowMs: 60_000, max: 5 }
const recent = new Map<string, number[]>()

function rateLimited(key: string) {
  const now = Date.now()
  const hits = (recent.get(key) ?? []).filter(t => now - t < RATE_LIMIT.windowMs)
  hits.push(now)
  recent.set(key, hits)
  if (recent.size > 500) for (const [k, v] of recent) if (v.every(t => now - t >= RATE_LIMIT.windowMs)) recent.delete(k)
  return hits.length > RATE_LIMIT.max
}

function buildHtml(lead: Lead, meta: Record<string, string>) {
  const row = (label: string, value: string) => (value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "")
  return `
      <h2>New Enquiry</h2>
      ${lead.flatType ? `<h3>Selected website interest</h3>${row("Flat type", lead.flatType)}${row("Tier", lead.tier)}${row("Indicative range", lead.priceRange)}` : ""}
      <h3>Customer details</h3>
      ${row("Name", lead.name)}
      ${row("Phone", lead.phone)}
      ${row("City", lead.city)}
      ${row("Service", lead.service)}
      ${row("Message", lead.message)}
      <hr />
      ${row("Came from", meta.ctaId)}
    `
}

export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  // Honeypot: drop silently rather than erroring, so bots get no signal.
  if (payload.company) return { ok: true }

  const parsed = leadSchema.safeParse(payload)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form")
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors }
  }

  const lead = parsed.data
  if (rateLimited(lead.phone)) return { ok: false, error: "Too many submissions. Please try again in a minute." }

  const meta = { ctaId: payload.ctaId ?? "" }

  // Store first. If Resend then fails, the lead still exists somewhere.
  const stored = await storeLead(lead, meta)

  try {
    const { apiKey, to, from } = getResendConfig()
    const interestLabel = lead.flatType && lead.tier ? `${lead.flatType} ${lead.tier} tier` : lead.service
    await new Resend(apiKey).emails.send({
      to,
      from,
      subject: `New ${interestLabel} enquiry from ${lead.name} (${lead.city})`,
      html: buildHtml(lead, meta),
    })
    return { ok: true }
  } catch (e: any) {
    console.error("sendContact error", e)
    // The lead is recorded, so tell the visitor it worked — it did, from their side.
    if (stored) return { ok: true }
    return { ok: false, error: "We could not send that. Please WhatsApp or call us instead." }
  }
}
