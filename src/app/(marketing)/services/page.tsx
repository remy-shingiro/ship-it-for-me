import type { Metadata } from "next";
import { FinalCta } from "@/features/marketing/components/final-cta";
import { LocationGrid } from "@/features/marketing/components/location-grid";
import { PageHero } from "@/features/marketing/components/page-hero";
import { ServiceGrid } from "@/features/marketing/components/service-grid";
import { createPageMetadata } from "@/lib/seo";

const title = "Product sourcing services in Rwanda";
const description = "Explore product sourcing, research and coordination support for customers in Rwanda.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        aside={{ eyebrow: "Sourcing support", title: "Start with the product.", items: ["Product name or link", "Images and specifications", "Quantity and other requirements"] }}
        description="Tell us what you are looking for. The team reviews each request and may help explore product and sourcing options through its network."
        eyebrow="Services"
        secondaryAction={{ label: "Explore sourcing locations", href: "/locations" }}
        title="Product sourcing support, shaped around your request"
      />
      <ServiceGrid />
      <LocationGrid
        description="Requests can be made for sourcing through China, Dubai or Uganda. Each request is assessed based on its details and the options available."
        eyebrow="Sourcing network"
        id="service-locations"
        title="Explore the markets"
      />
      <FinalCta title="Have something specific in mind?" description="Send the product details you have and the team can review your request." />
    </>
  );
}
