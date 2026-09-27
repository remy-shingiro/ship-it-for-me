import type { Metadata } from "next";
import { QuoteForm } from "@/features/quote-request/components/quote-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Request a Quote",
    description: "Share the product you need and your sourcing preferences.",
    path: "/request",
  }),
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";

export default function RequestPage() {
  return <QuoteForm />;
}
