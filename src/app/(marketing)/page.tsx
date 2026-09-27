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
import { serverEnv } from "@/lib/env";

const title = "Product sourcing from China, Dubai and Uganda";
const description = "Tell us what you need. We help customers in Rwanda explore product sourcing options from China, Dubai and Uganda.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title, description },
};

export default function HomePage() {
  const digits = serverEnv.whatsappBusinessNumber?.replace(/[^0-9]/g, "");
  const whatsappHref = digits ? "https://wa.me/" + digits : undefined;
  const homepageFaqs = getHomepageFaqs(Boolean(whatsappHref));

  return (
    <>
      <Hero />
      <ValueStrip />
      <HowItWorks />
      <SourceCategories />
      <LocationGrid />
      <WhyChooseUs />
      <FaqSection items={homepageFaqs} />
      <FinalCta whatsappHref={whatsappHref} />
    </>
  );
}
