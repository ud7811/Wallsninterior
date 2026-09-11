/**
 * Self-check for the WhatsApp prefill routing.
 *
 * The point of this mapping is that an enquiry tells you what the visitor was
 * looking at. It fails silently — a wrong or missing subject still produces a
 * working wa.me link, just a useless one — so the routes are pinned here.
 *
 * Run: pnpm test
 */
import assert from "node:assert/strict"
import { buildWhatsAppLink, subjectForPath, messageForPath } from "./whatsapp"

const FALLBACK = "Hi Walls N Interior, I'd like a quote."

// --- service pages: the whole reason this exists ----------------------------
// Each must read correctly in "I'd like a quote for ___", so singular services
// carry an article and plural ones do not.
assert.equal(subjectForPath("/services/modular-kitchen"), "a modular kitchen")
assert.equal(subjectForPath("/services/false-ceiling"), "a false ceiling")
assert.equal(subjectForPath("/services/wardrobes"), "wardrobes")
// "tv-units" must not come out as "Tv units".
assert.equal(subjectForPath("/services/tv-units"), "TV units")

// --- BHK and cost pages -----------------------------------------------------
assert.equal(subjectForPath("/interiors/2bhk-flat-interior-design"), "2 BHK interiors")
assert.equal(subjectForPath("/interiors/3bhk-flat-interior-design"), "3 BHK interiors")
assert.equal(subjectForPath("/interiors/4bhk-flat-interior-design"), "4 BHK interiors")
assert.equal(subjectForPath("/cost/3bhk-interior-design-cost-ghaziabad"), "3 BHK interiors")
assert.equal(subjectForPath("/cost"), "interior costs")

// --- area pages -------------------------------------------------------------
assert.equal(subjectForPath("/areas/greater-noida"), "interiors in Greater Noida")
assert.equal(subjectForPath("/areas/crossings-republik"), "interiors in Crossings Republik")

// --- pages with no specific subject keep their own copy ---------------------
for (const path of ["/", "/about", "/contact", "/process", "/warranty", "/services"]) {
  assert.equal(subjectForPath(path), null, `${path} should have no subject`)
  assert.equal(messageForPath(path, FALLBACK), FALLBACK, `${path} should use the fallback copy`)
}

// --- message assembly -------------------------------------------------------
assert.equal(
  messageForPath("/services/modular-kitchen", FALLBACK),
  "Hi Walls N Interior, I'd like a quote for a modular kitchen.",
)
assert.notEqual(
  messageForPath("/services/wardrobes", FALLBACK),
  messageForPath("/services/tv-units", FALLBACK),
  "two different service pages must not produce identical enquiries",
)

// Trailing slashes and query strings must not break matching.
assert.equal(subjectForPath("/services/modular-kitchen/"), "a modular kitchen")
assert.equal(subjectForPath("/"), null)

// --- link building ----------------------------------------------------------
const href = buildWhatsAppLink({ number: "917428095297", text: messageForPath("/services/wardrobes", FALLBACK) })
assert.ok(href.startsWith("https://wa.me/917428095297?text="))
assert.ok(!href.includes(" "), "spaces must be percent-encoded or WhatsApp truncates the message")
assert.ok(decodeURIComponent(href.split("text=")[1]).includes("wardrobes"))

console.log("whatsapp: all assertions passed")
