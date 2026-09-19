import { SocialProvider } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === env.META_VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const payload = await request.json();

  await prisma.webhookEvent.create({
    data: {
      provider: resolveProvider(payload),
      eventType: payload.object ?? "meta_event",
      payload
    }
  });

  return NextResponse.json({ received: true });
}

function resolveProvider(payload: { object?: string }) {
  if (payload.object === "whatsapp_business_account") {
    return SocialProvider.WHATSAPP;
  }

  if (payload.object === "instagram") {
    return SocialProvider.INSTAGRAM;
  }

  return SocialProvider.FACEBOOK;
}
