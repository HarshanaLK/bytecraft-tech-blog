import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["programming tutorials", "web development", "Next.js", "developer tools", "DevOps", "AI", "original tech news", "technology news"],
  alternates: { canonical: "/", types: { "application/rss+xml": `${siteConfig.url}/rss.xml` } },
  openGraph: { type: "website", siteName: siteConfig.name, url: siteConfig.url, title: `${siteConfig.name} — ${siteConfig.tagline}`, description: siteConfig.description, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} — ${siteConfig.tagline}`, images: ["/og-image.png"] },
  icons: { icon: "/favicon.svg" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f8f9f6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";
  return (
    <html lang="en">
      <head>
        {/* Only load AdSense after account setup AND applicable privacy/consent steps. */}
        {adsEnabled && adsenseClient && /^ca-pub-\d+$/.test(adsenseClient) ? (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" />
        ) : null}
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
