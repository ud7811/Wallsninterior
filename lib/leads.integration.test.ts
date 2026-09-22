/**
 * End-to-end check of the contact server action against a stand-in for the Google
 * Sheet webhook, with Resend deliberately unavailable.
 *
 * The ordering it protects — store the lead, then send the email — is the whole
 * point: before this, a lead existed only as one Resend message and a send failure
 * lost it silently.
 *
 * Run: pnpm test
 */
import http from "node:http"
import assert from "node:assert/strict"
import { sendContact } from "@/app/actions/send-contact"

// The Resend failures below are deliberate; keep their stack traces out of the run.
console.error = () => {}

const valid = { name: "Test Lead", phone: "98765 43210", city: "Noida", service: "Interior Design", message: "hi", flatType: "3 BHK", tier: "Comfort", priceRange: "Rs4.2L" }

async function main() {
  const received: any[] = []
  const server = http.createServer((req, res) => {
    let body = ""
    req.on("data", c => (body += c))
    req.on("end", () => { received.push(JSON.parse(body)); res.writeHead(200); res.end("ok") })
  })
  await new Promise<void>(r => server.listen(0, r))
  process.env.LEADS_SHEET_WEBHOOK_URL = `http://127.0.0.1:${(server.address() as any).port}`
  delete process.env.RESEND_API_KEY // simulate Resend being down / unconfigured

  // 1. Resend unavailable but storage working -> lead is NOT lost, visitor sees success
  const r1 = await sendContact(valid)
  assert.equal(r1.ok, true, "with storage working, a Resend failure must still report success")
  assert.equal(received.length, 1, "the lead must have reached durable storage")
  assert.equal(received[0].phone, "9876543210", "phone normalised before storage")
  assert.equal(received[0].flatType, "3 BHK", "tier context carried into storage")
  assert.ok(received[0].receivedAt, "row is timestamped")

  // 2. Invalid phone -> rejected server-side with a field error, nothing stored
  const r2 = await sendContact({ ...valid, phone: "asdf" })
  assert.equal(r2.ok, false)
  assert.ok(!r2.ok && r2.fieldErrors?.phone, "phone error surfaced to the form")
  assert.equal(received.length, 1, "an invalid lead must not be stored")

  // 3. Honeypot filled -> silently dropped, nothing stored, no signal to the bot
  const r3 = await sendContact({ ...valid, company: "bot" })
  assert.equal(r3.ok, true, "honeypot hits look successful so bots get no feedback")
  assert.equal(received.length, 1, "honeypot submission must not be stored")

  // 4. Rate limit: 5/min per phone, so repeated submissions are eventually refused
  let refused = 0
  for (let i = 0; i < 8; i++) if (!(await sendContact(valid)).ok) refused++
  assert.ok(refused > 0, "repeated submissions from one number must eventually be refused")

  // 5. Storage unconfigured AND Resend down -> visitor is told to call, not lied to
  delete process.env.LEADS_SHEET_WEBHOOK_URL
  const r5 = await sendContact({ ...valid, phone: "9811111111" })
  assert.equal(r5.ok, false, "with neither channel working the visitor must not see success")
  assert.ok(!r5.ok && /WhatsApp or call/.test(r5.error))

  server.close()
  console.log(`lead integration: all assertions passed (${received.length} rows stored, ${refused} rate-limited)`)
}

main()
