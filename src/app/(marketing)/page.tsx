import type { Metadata } from "next";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { FaqSection } from "@/features/marketing/components/faq-section";
import { Hero } from "@/features/marketing/components/hero";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { LocationGrid } from "@/features/marketing/components/location-grid";
import { SourceCategories } from "@/features/marketing/components/source-categories";
import { ValueStrip } from "@/features/marketing/components/value-strip";
import { WhyChooseUs } from "@/features/marketing/components/why-choose-us";
import { getHomepageFaqs } from "@/features/marketing/content";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

const title = "Product sourcing from China, Dubai and Uganda";
const description = `${siteConfig.brandName} is a Rwanda-based sourcing and procurement company helping customers source products from China, Dubai, Uganda and other markets.`;

export const metadata: Metadata = createPageMetadata({ title, description, path: "/" });

export default function HomePage() {
  const homepageFaqs = getHomepageFaqs(siteConfig.whatsappConfigured);

  return (
    <>
      <Hero />
      <ValueStrip />
      <LocationGrid />
      <HowItWorks />
      <SourceCategories />
      <WhyChooseUs />
      <FaqSection items={homepageFaqs} />
      <FinalCta whatsappHref={siteConfig.whatsappHref} />
    </>
  );
}
