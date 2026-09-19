import { SocialProvider } from "@prisma/client";

import { env } from "@/lib/env";
import type { OAuthConfig, PublishPostInput, PublishPostResult, SocialIntegration } from "./types";

const graphBaseUrl = "https://graph.facebook.com/v21.0";

export class MetaIntegration implements SocialIntegration {
  constructor(public provider: SocialProvider.FACEBOOK | SocialProvider.INSTAGRAM | SocialProvider.WHATSAPP) {}

  getOAuthConfig(): OAuthConfig {
    return {
      provider: this.provider,
      authorizationUrl: "https://www.facebook.com/v21.0/dialog/oauth",
      tokenUrl: `${graphBaseUrl}/oauth/access_token`,
      scopes: [
        "pages_show_list",
        "pages_read_engagement",
        "pages_manage_posts",
        "instagram_basic",
        "instagram_content_publish",
        "whatsapp_business_management",
        "whatsapp_business_messaging"
      ]
    };
  }

  async publishPost(input: PublishPostInput): Promise<PublishPostResult> {
    if (this.provider === SocialProvider.WHATSAPP) {
      return this.sendWhatsAppTemplate(input);
    }

    throw new Error(`${this.provider} publishing adapter is not implemented yet.`);
  }

  private async sendWhatsAppTemplate(input: PublishPostInput): Promise<PublishPostResult> {
    if (!env.WHATSAPP_BUSINESS_ACCOUNT_ID) {
      throw new Error("WHATSAPP_BUSINESS_ACCOUNT_ID is required.");
    }

    const response = await fetch(`${graphBaseUrl}/${input.accountId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${input.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        type: "text",
        text: {
          preview_url: true,
          body: input.caption
        }
      })
    });

    const raw = await response.json();

    if (!response.ok) {
      throw new Error(`WhatsApp publish failed: ${JSON.stringify(raw)}`);
    }

    return {
      externalPostId: raw.messages?.[0]?.id ?? "unknown",
      raw
    };
  }
}
