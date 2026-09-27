import { FinalCta } from "./final-cta";
import { FaqSection } from "./faq-section";
import { HowItWorks } from "./how-it-works";
import { PageHero } from "./page-hero";
import { RequestDetailsSection } from "./request-details-section";
import { locationRequestDetails, type LocationPageData } from "@/features/marketing/content/locations";

type LocationLandingPageProps = { location: LocationPageData };

export function LocationLandingPage({ location }: LocationLandingPageProps) {
  return (
    <>
      <PageHero
        breadcrumb={{ label: "Locations", href: "/locations" }}
        description={location.heroDescription}
        eyebrow={`Sourcing location · ${location.name}`}
        secondaryAction={{ label: "How It Works", href: "/how-it-works" }}
        title={location.title}
      />
      <RequestDetailsSection description={location.detailDescription} items={locationRequestDetails} title={location.detailTitle} />
      <HowItWorks
        description="The request follows the same review process as other sourcing requests. The team will explain what information is available before you decide how to proceed."
        eyebrow={`The process · ${location.name}`}
        id="location-process"
        title="How a sourcing request works"
      />
      <FaqSection
        description={`Answers to common questions about product requests for sourcing through ${location.name}.`}
        eyebrow={`${location.name} sourcing questions`}
        items={location.faqs}
        title={`FAQs about sourcing from ${location.name}`}
      />
      <FinalCta
        description={`Share what you have in mind and the team can review your request for sourcing through ${location.name}.`}
        eyebrow={`Start a ${location.name} request`}
        title="Have a product in mind?"
      />
    </>
  );
}
