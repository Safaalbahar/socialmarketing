import { SocialProvider } from "@prisma/client";

const providers = [
  {
    provider: SocialProvider.WHATSAPP,
    name: "WhatsApp Business",
    note: "Connect through Meta Graph API after WABA and phone number setup."
  },
  {
    provider: SocialProvider.FACEBOOK,
    name: "Facebook Pages",
    note: "Requires Page permissions and Meta app review for production."
  },
  {
    provider: SocialProvider.INSTAGRAM,
    name: "Instagram Business",
    note: "Requires an Instagram Business account linked to a Facebook Page."
  },
  {
    provider: SocialProvider.X,
    name: "X",
    note: "Requires OAuth 2.0 app with tweet write permissions."
  },
  {
    provider: SocialProvider.TIKTOK,
    name: "TikTok",
    note: "Requires TikTok developer approval for content posting."
  }
];

export default function ConnectionsPage() {
  return (
    <section>
      <h1>Channel Connections</h1>
      <p>Start by connecting official business accounts. Tokens stay encrypted on the server.</p>

      <div className="grid">
        {providers.map((provider) => (
          <article className="card" key={provider.provider}>
            <span className="status">Ready for OAuth</span>
            <h3>{provider.name}</h3>
            <p>{provider.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
