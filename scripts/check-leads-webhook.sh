#!/usr/bin/env bash
# Verifies a LEADS_SHEET_WEBHOOK_URL end to end by writing one obviously-fake row.
#
#   ./scripts/check-leads-webhook.sh 'https://script.google.com/macros/s/AKfy.../exec'
#
# Delete the test row afterwards. A row that does NOT appear means the deployment
# is wrong — almost always "Who has access" left as "Only myself" instead of
# "Anyone", which returns a Google login page rather than an error.
set -euo pipefail

URL="${1:-${LEADS_SHEET_WEBHOOK_URL:-}}"
[ -n "$URL" ] || { echo "usage: $0 <webhook-url>   (or set LEADS_SHEET_WEBHOOK_URL)" >&2; exit 2; }

payload=$(cat <<'JSON'
{"receivedAt":"TEST","name":"TEST ROW - delete me","phone":"9999999999","city":"Test",
 "service":"Interior Design","message":"Automated check from check-leads-webhook.sh",
 "flatType":"3 BHK","tier":"Comfort","priceRange":"TEST","ctaId":"webhook-check"}
JSON
)

echo "POSTing a test lead…"
body=$(curl -sS -L -o /dev/null -w '%{http_code}' -X POST "$URL" \
  -H 'Content-Type: application/json' --data "$payload") || { echo "FAIL: request errored" >&2; exit 1; }

if [ "$body" = "200" ]; then
  echo "OK: webhook returned 200 — check the sheet for a row named 'TEST ROW - delete me', then delete it."
else
  echo "FAIL: webhook returned HTTP $body" >&2
  echo "  Deploy > Manage deployments > edit: Execute as = Me, Who has access = Anyone." >&2
  exit 1
fi
