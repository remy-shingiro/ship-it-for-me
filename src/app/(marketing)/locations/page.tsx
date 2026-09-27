import type { Metadata } from "next";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { LocationGrid } from "@/features/marketing/components/location-grid";
import { PageHero } from "@/features/marketing/components/page-hero";
import { createPageMetadata } from "@/lib/seo";

const title = "Product sourcing locations";
const description = "Explore product requests for sourcing through China, Dubai and Uganda from Rwanda.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/locations" });

export default function LocationsPage() {
  return (
    <>
      <PageHero
        aside={{ eyebrow: "Sourcing markets", title: "Choose a place to explore.", items: ["China", "Dubai", "Uganda"] }}
        description="Customers in Rwanda can submit requests for products they want sourced from China, Dubai or Uganda. The team reviews each request and determines what approach may be appropriate."
        eyebrow="Sourcing locations"
        secondaryAction={{ label: "How It Works", href: "/how-it-works" }}
        title="Source products from international markets"
      />
      <LocationGrid
        description="Choose a market to learn what details you can share in a product request."
        id="location-options"
        title="Explore the sourcing locations"
      />
      <FinalCta title="Have a product in mind?" description="Tell us what you need and choose the source country you are interested in." />
    </>
  );
}
