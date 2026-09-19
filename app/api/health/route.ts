import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "safaalbahar-socialmarketing",
    timestamp: new Date().toISOString()
  });
}
