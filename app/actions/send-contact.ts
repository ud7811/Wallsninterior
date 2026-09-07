"use server"

import { Resend } from "resend"
import { getResendConfig, getEmailHealth } from "@/lib/email"

export type ContactPayload = {
  name: string
  phone: string
  city: string
  service: string
  message: string
  flatType?: string
  tier?: string
  priceRange?: string
}

export async function sendContact(payload: ContactPayload) {
  try {
    const escapeHtml = (value: string | undefined) => (value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] ?? char)
    const { apiKey, to, from } = getResendConfig()
    const resend = new Resend(apiKey)
    const interestLabel = payload.flatType && payload.tier ? `${payload.flatType} ${payload.tier} tier` : payload.service
    const subject = `New ${interestLabel} enquiry from ${payload.name} (${payload.city})`

    const html = `
      <h2>New Enquiry</h2>
      ${payload.flatType ? `<h3>Selected website interest</h3><p><strong>Flat type:</strong> ${escapeHtml(payload.flatType)}</p><p><strong>Tier:</strong> ${escapeHtml(payload.tier)}</p><p><strong>Indicative range:</strong> ${escapeHtml(payload.priceRange)}</p>` : ""}
      <h3>Customer details</h3>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>City:</strong> ${escapeHtml(payload.city)}</p>
      <p><strong>Service:</strong> ${escapeHtml(payload.service)}</p>
      <p><strong>Message:</strong> ${escapeHtml(payload.message)}</p>
    `
    await resend.emails.send({ to, from, subject, html })
    return { ok: true }
  } catch (e: any) {
    console.error("sendContact error", e)
    return { ok: false, error: e?.message || "Failed to send" }
  }
}
