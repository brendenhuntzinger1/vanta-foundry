import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWhatsApp } from "@/components/contact-buttons";
import { Analytics } from "@vercel/analytics/next";
import { PageTracker } from "@/components/page-tracker";
import { InquiryBar } from "@/components/inquiry";
import { HideOnWebsitePages } from "@/components/hide-on-website-pages";
import { JsonLd, organization, website } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { HOME_TITLE } from "@/lib/metadata";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// The italic accent word in headlines.
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: HOME_TITLE,
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: SITE.name, type: "website", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${cormorant.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
        <HideOnWebsitePages>
          <InquiryBar />
        </HideOnWebsitePages>
        <JsonLd data={organization()} />
        <JsonLd data={website()} />
        <PageTracker />
        <Analytics />
      </body>
    </html>
  );
}
