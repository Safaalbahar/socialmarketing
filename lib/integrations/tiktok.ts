import { SocialProvider } from "@prisma/client";

import type { OAuthConfig, PublishPostInput, PublishPostResult, SocialIntegration } from "./types";

export class TikTokIntegration implements SocialIntegration {
  provider = SocialProvider.TIKTOK;

  getOAuthConfig(): OAuthConfig {
    return {
      provider: this.provider,
      authorizationUrl: "https://www.tiktok.com/v2/auth/authorize/",
      tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
      scopes: ["user.info.basic", "video.publish", "video.upload"]
    };
  }

  async publishPost(_input: PublishPostInput): Promise<PublishPostResult> {
    throw new Error("TikTok publishing requires upload initialization and content-posting approval.");
  }
}
