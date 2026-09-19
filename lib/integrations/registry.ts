import { SocialProvider } from "@prisma/client";

import { MetaIntegration } from "./meta";
import { TikTokIntegration } from "./tiktok";
import type { SocialIntegration } from "./types";
import { XIntegration } from "./x";

export function getIntegration(provider: SocialProvider): SocialIntegration {
  switch (provider) {
    case SocialProvider.FACEBOOK:
    case SocialProvider.INSTAGRAM:
    case SocialProvider.WHATSAPP:
      return new MetaIntegration(provider);
    case SocialProvider.X:
      return new XIntegration();
    case SocialProvider.TIKTOK:
      return new TikTokIntegration();
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
