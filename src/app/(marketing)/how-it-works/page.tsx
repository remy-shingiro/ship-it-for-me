import type { Metadata } from "next";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { FaqSection } from "@/features/marketing/components/faq-section";
import { HowItWorks } from "@/features/marketing/components/how-it-works";
import { PageHero } from "@/features/marketing/components/page-hero";
import { RequestDetailsSection } from "@/features/marketing/components/request-details-section";
import { getHomepageFaqs } from "@/features/marketing/content";
import { locationRequestDetails } from "@/features/marketing/content/locations";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "How it works";
const description = "Learn how to share a product request and what happens while the team reviews possible sourcing options.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/how-it-works" });

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        aside={{ eyebrow: "A useful place to start", title: "Share what you know.", items: ["Product name, link or image", "Quantity and specifications", "Other requirements that matter to you"] }}
        description="Tell us what you need, and the sourcing team can review the details and explore whether an option may be available."
        eyebrow="The request process"
        secondaryAction={{ label: "Explore services", href: "/services" }}
        title={title}
      />
      <HowItWorks
        description="The team reviews your request, explores possible sourcing options through its network in China, Dubai or Uganda, and discusses the information available. Not every request can be fulfilled."
        title="From your request to the next steps"
      />
      <RequestDetailsSection
        description="You do not need to have every detail ready. Add the information that helps explain the product and leave optional fields blank if you are unsure."
        items={locationRequestDetails}
        title="Start with the information you have"
      />
      <FaqSection
        description="A few answers about sharing a product request."
        items={getHomepageFaqs(siteConfig.whatsappConfigured)}
        title="Before you send a request"
      />
      <FinalCta title="Ready to tell us what you need?" description="Share the product details you have and the team can review your request." />
    </>
  );
}
