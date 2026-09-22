import { NextResponse } from "next/server"
import { getEmailHealth } from "@/lib/email"

export async function GET() {
  return NextResponse.json(getEmailHealth(), {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
