import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Safa Social Marketing",
  description: "Social marketing operations for Safa Al Bahar"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <Link href="/" className="brand">
            Safa Social Marketing
          </Link>
          <nav>
            <Link href="/dashboard/connections">Connections</Link>
            <Link href="/dashboard/campaigns">Campaigns</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
