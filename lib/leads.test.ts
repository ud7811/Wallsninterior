/**
 * Self-check for lead validation.
 *
 * This is the only thing standing between the contact server action and anything
 * a script cares to POST at it — the form's `required` attributes do not apply to
 * a direct call — so the rejection cases matter more than the happy path.
 *
 * Run: pnpm test
 */
import assert from "node:assert/strict"
import { leadSchema } from "./leads"

const valid = { name: "Utkarsh Dubey", phone: "9876543210", city: "Noida", service: "Interior Design", message: "3 BHK in Crossings Republik" }

// --- accepts ----------------------------------------------------------------
const ok = leadSchema.safeParse(valid)
assert.ok(ok.success, "a well-formed lead should validate")
assert.equal(ok.data.phone, "9876543210")

for (const [input, expected] of [
  ["+919876543210", "+919876543210"],
  ["09876543210", "09876543210"],
  ["98765 43210", "9876543210"],   // spaces stripped
  ["98765-43210", "9876543210"],   // dashes stripped
] as const) {
  const r = leadSchema.safeParse({ ...valid, phone: input })
  assert.ok(r.success, `phone ${input} should be accepted`)
  assert.equal(r.data.phone, expected, `phone ${input} should normalise to ${expected}`)
}

// Optional fields default rather than erroring.
const minimal = leadSchema.safeParse({ name: "Ab", phone: "9876543210", city: "Delhi", service: "Interior Design" })
assert.ok(minimal.success)
assert.equal(minimal.data.message, "")
assert.equal(minimal.data.flatType, "")

// An unrecognised service falls back instead of rejecting a real lead over a
// select value we changed.
const odd = leadSchema.safeParse({ ...valid, service: "Something Else" })
assert.ok(odd.success)
assert.equal(odd.data.service, "Interior Design")

// --- rejects ----------------------------------------------------------------
const bad: [string, Record<string, unknown>][] = [
  ["the exact payload that used to return ok", { ...valid, phone: "asdf" }],
  ["empty phone", { ...valid, phone: "" }],
  ["too few digits", { ...valid, phone: "98765432" }],
  ["too many digits", { ...valid, phone: "98765432109" }],
  ["landline-style leading digit", { ...valid, phone: "1234567890" }],
  ["empty name", { ...valid, name: "" }],
  ["one-character name", { ...valid, name: "A" }],
  ["whitespace-only name", { ...valid, name: "   " }],
  ["empty city", { ...valid, city: "" }],
  ["oversized message", { ...valid, message: "x".repeat(2001) }],
  ["oversized name", { ...valid, name: "x".repeat(81) }],
]
for (const [label, payload] of bad) {
  assert.equal(leadSchema.safeParse(payload).success, false, `should reject: ${label}`)
}

// Rejections carry a per-field message so the form can point at the right input.
const phoneFail = leadSchema.safeParse({ ...valid, phone: "asdf" })
assert.ok(!phoneFail.success)
assert.equal(phoneFail.error.issues[0].path[0], "phone")
assert.match(phoneFail.error.issues[0].message, /10-digit/)

console.log("leads: all assertions passed")
