import { SocialProvider } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  const payload = await request.json();

  await prisma.webhookEvent.create({
    data: {
      provider: SocialProvider.TIKTOK,
      eventType: payload.event ?? "tiktok_event",
      payload
    }
  });

  return NextResponse.json({ received: true });
}
