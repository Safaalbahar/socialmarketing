# Platform Setup Checklist

## Meta: WhatsApp, Facebook, Instagram

1. Create a Meta developer app.
2. Add Facebook Login for Business.
3. Add WhatsApp product.
4. Connect or create the WhatsApp Business Account.
5. Link Facebook Pages and Instagram Business accounts.
6. Configure webhook callback:
   - `https://your-domain.com/api/webhooks/meta`
7. Use the verify token from `META_VERIFY_TOKEN`.
8. Request required permissions for production use.

## X

1. Create an X developer project and app.
2. Enable OAuth 2.0.
3. Add callback URL:
   - `https://your-domain.com/api/auth/callback/x`
4. Request write scopes.
5. Add `X_CLIENT_ID` and `X_CLIENT_SECRET`.

## TikTok

1. Create a TikTok developer app.
2. Add redirect URI:
   - `https://your-domain.com/api/auth/callback/tiktok`
3. Request content posting permissions.
4. Implement upload initialization after approval.

## Production Notes

- Use HTTPS only.
- Restrict admin access to approved staff.
- Keep API tokens server-side only.
- Log every publish action in `AuditLog`.
- Do not store customer mobile numbers in campaign content unless there is a business reason and permission.
