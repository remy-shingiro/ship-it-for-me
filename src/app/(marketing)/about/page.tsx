import type { Metadata } from "next";
import { AboutOverview } from "@/features/marketing/components/about-overview";
import { ApproachSection } from "@/features/marketing/components/approach-section";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { LocationGrid } from "@/features/marketing/components/location-grid";
import { PageHero } from "@/features/marketing/components/page-hero";
import { createPageMetadata } from "@/lib/seo";

const title = "About";
const description = "Learn how the sourcing service helps customers in Rwanda explore product options from international markets.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="Customers tell us what they need. The team reviews each request and works through sourcing agents in international markets to explore possible options."
        eyebrow="About the service"
        secondaryAction={{ label: "How It Works", href: "/how-it-works" }}
        title="Making international sourcing simpler for customers in Rwanda"
      />
      <AboutOverview />
      <ApproachSection />
      <LocationGrid
        description="The sourcing network includes China, Dubai and Uganda. Learn more about each market and the information you can share in a request."
        eyebrow="Sourcing network"
        id="about-locations"
        title="Markets you can ask about"
      />
      <FinalCta title="Tell us what you are looking for" description="Share a product request and the team can review the details with you." />
    </>
  );
}
