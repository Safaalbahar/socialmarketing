# Safa Al Bahar Social Marketing

First practical version of a social marketing application for WhatsApp Business, Facebook, Instagram, X, and TikTok official API integrations.

This project does not start by building a separate AI platform. The first release focuses on the operational foundation:

- Secure company login
- Connect official platform accounts
- Store OAuth tokens encrypted
- Receive webhooks from Meta, X, and TikTok
- Prepare campaign/content records for approval and publishing
- Add AI assistance later inside the existing workflow

## Recommended Architecture

Use a single full-stack Next.js application for version 1:

- **Frontend:** Next.js dashboard for connections, campaigns, approvals, and reporting.
- **Backend:** Next.js route handlers for OAuth callbacks, publishing APIs, and webhooks.
- **Database:** PostgreSQL through Prisma.
- **Authentication:** NextAuth for staff login; provider OAuth only for social account connections.
- **Secrets:** Environment variables plus encrypted token storage.
- **Background jobs:** Add Redis/BullMQ when scheduling and retry volume increases.

## Authentication Approach

There are two different authentication layers:

1. **Staff login**
   - Company users sign in to the application.
   - Recommended first provider: Microsoft Entra ID because Safa Al Bahar already uses Microsoft 365/SharePoint/Teams workflows.

2. **Social platform authorization**
   - Meta OAuth for Facebook Pages, Instagram Business accounts, and WhatsApp Business assets.
   - X OAuth 2.0 for X account publishing.
   - TikTok OAuth for TikTok Business/Content Posting APIs.
   - Access and refresh tokens are encrypted before saving.

## Getting Started

```bash
npm install
cp .env.example .env
node scripts/generate-token-key.mjs
docker compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Open `http://localhost:3000`.

Copy the generated key into `TOKEN_ENCRYPTION_KEY` in `.env`.

## First Version Scope

Version 1 should prove these workflows:

1. Admin signs in.
2. Admin connects social channels.
3. Marketing creates a campaign draft.
4. Manager approves.
5. App publishes or schedules through the official platform API.
6. Webhooks update message/post status.

## Platform Notes

WhatsApp, Facebook, and Instagram are best handled together through Meta developer apps and Graph API permissions. X and TikTok each require separate developer apps and review/approval before production posting.

See `docs/platform-setup.md` for the platform setup checklist.
