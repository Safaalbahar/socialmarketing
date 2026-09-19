import { SocialProvider } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { encryptToken } from "@/lib/auth/tokens";
import { prisma } from "@/lib/db/prisma";
import { getIntegration } from "@/lib/integrations/registry";

const createConnectionSchema = z.object({
  organizationId: z.string().min(1),
  provider: z.nativeEnum(SocialProvider),
  displayName: z.string().min(1),
  externalAccountId: z.string().min(1),
  accessToken: z.string().min(1),
  refreshToken: z.string().optional(),
  scopes: z.array(z.string()).default([])
});

export function GET() {
  const providers = Object.values(SocialProvider).map((provider) => {
    const integration = getIntegration(provider);
    const config = integration.getOAuthConfig();

    return {
      provider,
      authorizationUrl: config.authorizationUrl,
      scopes: config.scopes
    };
  });

  return NextResponse.json({ providers });
}

export async function POST(request: Request) {
  const body = createConnectionSchema.parse(await request.json());

  const channel = await prisma.connectedChannel.upsert({
    where: {
      provider_externalAccountId: {
        provider: body.provider,
        externalAccountId: body.externalAccountId
      }
    },
    create: {
      organizationId: body.organizationId,
      provider: body.provider,
      displayName: body.displayName,
      externalAccountId: body.externalAccountId,
      encryptedAccessToken: encryptToken(body.accessToken),
      encryptedRefreshToken: body.refreshToken ? encryptToken(body.refreshToken) : null,
      scopes: body.scopes
    },
    update: {
      displayName: body.displayName,
      encryptedAccessToken: encryptToken(body.accessToken),
      encryptedRefreshToken: body.refreshToken ? encryptToken(body.refreshToken) : null,
      scopes: body.scopes,
      status: "CONNECTED"
    }
  });

  return NextResponse.json({
    id: channel.id,
    provider: channel.provider,
    displayName: channel.displayName,
    status: channel.status
  });
}
