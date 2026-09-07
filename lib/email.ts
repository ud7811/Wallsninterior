export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL || "wallsninterior@gmail.com"
  const from = process.env.RESEND_FROM_EMAIL || "Walls N Interior <onboarding@resend.dev>"

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set")
  }

  return { apiKey, to, from }
}

export function getEmailHealth() {
  try {
    const { to, from } = getResendConfig()
    const fromDomain = from.split("<").pop()?.replace(">", "").trim().split("@").pop() ?? ""

    return {
      ok: true,
      configured: {
        resendApiKey: true,
        resendFromEmail: from,
        contactToEmail: to,
      },
      notes: [
        from.includes("onboarding@resend.dev")
          ? "RESEND_FROM_EMAIL is not set; using Resend test sender."
          : fromDomain
            ? `Sending from domain: ${fromDomain}`
            : "Sender configured.",
      ],
    }
  } catch (e: any) {
    return {
      ok: false,
      error: e?.message || "Email configuration is invalid",
    }
  }
}
