/**
 * Self-check for lead budget options. `isHighValue` decides which leads Google Ads
 * optimises for, so a wrong band silently trains bidding on the wrong customers.
 *
 * Run: pnpm test
 */
import assert from "node:assert/strict"
import { BUDGETS, isHighValue, homeSizeFromLabel, leadWhatsAppText } from "./lead-options"

assert.deepEqual(BUDGETS.filter(b => isHighValue(b.value)).map(b => b.value), ["5-10", "10plus"])
for (const b of ["lt3", "3-5", "", "10"]) assert.equal(isHighValue(b), false, `${b} is not high value`)

assert.equal(homeSizeFromLabel("2 BHK"), "2bhk")
assert.equal(homeSizeFromLabel("3 BHK"), "3bhk")
assert.equal(homeSizeFromLabel("4 BHK"), "4bhk")
assert.equal(homeSizeFromLabel(""), "")
assert.equal(homeSizeFromLabel(undefined), "")

assert.equal(leadWhatsAppText("3bhk", "5-10"), "Hi Walls N Interior, I'd like a quote for my 3 BHK home. Budget: ₹5–10L.")
assert.equal(leadWhatsAppText("partial", "lt3"), "Hi Walls N Interior, I'd like a quote for a kitchen / wardrobe. Budget: Under ₹3L.")

console.log("lead-options: all assertions passed")
