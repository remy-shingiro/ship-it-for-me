import type { Metadata } from "next";
import { FaqCategoryList } from "@/features/marketing/components/faq-category-list";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { PageHero } from "@/features/marketing/components/page-hero";
import { getFaqCategories } from "@/features/marketing/content";
import { serverEnv } from "@/lib/env";
import { createPageMetadata } from "@/lib/seo";

const title = "Frequently asked questions";
const description = "Answers about product requests, sourcing locations, pricing and the request process.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/faq" });

export default function FAQPage() {
  const whatsappConfigured = Boolean(serverEnv.whatsappBusinessNumber?.replace(/\D/g, ""));
  const categories = getFaqCategories(whatsappConfigured);

  return (
    <>
      <PageHero
        description="Find answers about sharing a product request and what to expect while the team reviews possible sourcing options."
        eyebrow="Help and information"
        secondaryAction={{ label: "How It Works", href: "/how-it-works" }}
        title={title}
      />
      <FaqCategoryList categories={categories} />
      <FinalCta title="Still have a product in mind?" description="Send the details you have and the team can review your request." />
    </>
  );
}
