import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const trackPayload = {
      ...body,
      product: "reviewreply",
      timestamp: new Date().toISOString(),
    };

    // Forward to tracking server
    try {
      await fetch("http://77.42.94.208:3458/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackPayload),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      // Silent fail — tracking should never break the app
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
