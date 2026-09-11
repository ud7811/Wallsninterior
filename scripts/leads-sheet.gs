/**
 * Google Apps Script — lead sink for the Walls N Interior contact form.
 *
 * Paste this into Extensions > Apps Script on the leads spreadsheet, then
 * Deploy > New deployment > Web app (Execute as: Me, Access: Anyone) and put the
 * resulting /exec URL in the LEADS_SHEET_WEBHOOK_URL env var on Vercel.
 *
 * app/actions/send-contact.ts POSTs here BEFORE attempting the Resend email, so a
 * mail failure cannot lose a lead. See lib/leads.ts.
 *
 * "Access: Anyone" is required because Vercel calls this unauthenticated. The
 * script only ever appends — it never reads data back out — so the exposure is
 * junk rows, which the honeypot and rate limit in sendContact already filter.
 *
 * Row order follows the header row, so to add a field just add a column whose
 * header matches the JSON key. Nothing here needs changing.
 */

// Written to row 1 on first run. Must match the keys sent by lib/leads.ts.
var HEADERS = [
  'receivedAt',
  'name',
  'phone',
  'city',
  'service',
  'message',
  'flatType',
  'tier',
  'priceRange',
  'ctaId',
  'status',   // not sent by the site — yours to fill in, and the reason this
              // sheet can answer lead-to-customer rate when GA4 cannot
]

function doPost(e) {
  var lock = LockService.getScriptLock()
  // Two submissions landing at once would otherwise race on getLastRow().
  lock.waitLock(20000)
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS)
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
      sheet.setFrozenRows(1)
    }
    var data = JSON.parse(e.postData.contents)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    sheet.appendRow(
      headers.map(function (h) {
        var v = data[h]
        // Phone numbers must stay text or Sheets strips the leading 0 / +91.
        if (h === 'phone' && v) return "'" + v
        return v === undefined || v === null ? '' : v
      })
    )
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// Lets you confirm the deployment is reachable by opening the /exec URL in a browser.
function doGet() {
  return json({ ok: true, service: 'wallsninterior-leads' })
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
