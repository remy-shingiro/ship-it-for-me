import type { Metadata } from "next";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const siteDescription = `${siteConfig.brandName} is a Rwanda-based sourcing and procurement company helping customers source products from China, Dubai, Uganda and other markets.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brandName} | Product sourcing in Rwanda`,
    template: "%s | " + siteConfig.brandName,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Product sourcing in Rwanda`,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a className="sr-only focus:not-sr-only" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
