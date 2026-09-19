import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

import { env } from "@/lib/env";

const providers: NextAuthOptions["providers"] = [];

if (env.AZURE_AD_CLIENT_ID && env.AZURE_AD_CLIENT_SECRET && env.AZURE_AD_TENANT_ID) {
  providers.push(
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID,
      clientSecret: env.AZURE_AD_CLIENT_SECRET,
      tenantId: env.AZURE_AD_TENANT_ID
    })
  );
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
