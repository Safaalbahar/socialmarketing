import Link from "next/link";

const platforms = ["WhatsApp", "Facebook", "Instagram", "X", "TikTok"];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">First practical version</span>
        <h1>Run Safa Al Bahar social marketing from one approval dashboard.</h1>
        <p>
          Connect official platform accounts, prepare campaigns, approve content, publish through APIs,
          and keep a record of every status update.
        </p>
        <div className="actions">
          <Link href="/dashboard/connections" className="button">
            Connect channels
          </Link>
          <Link href="/dashboard/campaigns" className="button secondary">
            View campaign workflow
          </Link>
        </div>
      </section>

      <section className="grid">
        {platforms.map((platform) => (
          <article className="card" key={platform}>
            <span className="status">Planned</span>
            <h3>{platform}</h3>
            <p>Official API integration with encrypted token storage and webhook status tracking.</p>
          </article>
        ))}
      </section>
    </>
  );
}
