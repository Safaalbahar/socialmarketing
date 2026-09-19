# Authentication And Token Handling

## Staff Authentication

Use Microsoft Entra ID for Safa Al Bahar staff login in production. For local development, NextAuth can be configured with a simple provider first, then switched to Microsoft once tenant app registration is ready.

Recommended roles:

| Role | Access |
| --- | --- |
| Admin | Manage users, connect channels, publish settings |
| Marketing | Draft campaigns and view results |
| Manager | Approve or reject campaigns |
| Viewer | Read-only reports |

## Social Account Authorization

Platform accounts should never use shared passwords. Each platform must be connected through official OAuth or app authorization.

| Platform | Auth Method | Notes |
| --- | --- | --- |
| WhatsApp Business | Meta OAuth / System User token | Requires WABA, phone number, templates |
| Facebook | Meta OAuth | Page permissions required |
| Instagram | Meta OAuth | Instagram Business account linked to Facebook Page |
| X | OAuth 2.0 | App approval and scopes required |
| TikTok | TikTok OAuth | Posting API access may require review |

## Token Storage

Access tokens and refresh tokens are encrypted before saving to the database. Only server-side code can decrypt them.

Never expose tokens to the browser, logs, screenshots, or client-side JavaScript.
