FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --include=dev
RUN DATABASE_URL="postgresql://build:build@127.0.0.1:5432/build" npm run prisma:generate
COPY . .
RUN mkdir -p public
RUN DATABASE_URL="postgresql://build:build@127.0.0.1:5432/build" \
    NEXTAUTH_URL="http://localhost:3000" \
    NEXTAUTH_SECRET="build-only-placeholder-not-a-runtime-secret" \
    TOKEN_ENCRYPTION_KEY="build-only-placeholder-not-a-runtime-key" \
    npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/next.config.ts ./next.config.ts
USER node
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "--hostname", "0.0.0.0", "--port", "3000"]
