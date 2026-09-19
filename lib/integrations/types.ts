import { SocialProvider } from "@prisma/client";

export type OAuthConfig = {
  provider: SocialProvider;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
};

export type PublishPostInput = {
  accessToken: string;
  accountId: string;
  caption: string;
  mediaUrls?: string[];
};

export type PublishPostResult = {
  externalPostId: string;
  raw: unknown;
};

export interface SocialIntegration {
  provider: SocialProvider;
  getOAuthConfig(): OAuthConfig;
  publishPost(input: PublishPostInput): Promise<PublishPostResult>;
}
