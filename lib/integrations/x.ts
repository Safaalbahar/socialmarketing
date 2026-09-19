import { SocialProvider } from "@prisma/client";

import type { OAuthConfig, PublishPostInput, PublishPostResult, SocialIntegration } from "./types";

export class XIntegration implements SocialIntegration {
  provider = SocialProvider.X;

  getOAuthConfig(): OAuthConfig {
    return {
      provider: this.provider,
      authorizationUrl: "https://twitter.com/i/oauth2/authorize",
      tokenUrl: "https://api.x.com/2/oauth2/token",
      scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"]
    };
  }

  async publishPost(input: PublishPostInput): Promise<PublishPostResult> {
    const response = await fetch("https://api.x.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${input.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input.caption })
    });

    const raw = await response.json();

    if (!response.ok) {
      throw new Error(`X publish failed: ${JSON.stringify(raw)}`);
    }

    return {
      externalPostId: raw.data?.id ?? "unknown",
      raw
    };
  }
}
