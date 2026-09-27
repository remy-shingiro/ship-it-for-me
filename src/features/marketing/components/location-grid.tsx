import Link from "next/link";
import { locations } from "@/features/marketing/content";
import { Heading } from "@/components/ui/heading";
import { SectionHeading } from "./section-heading";

export function LocationCard({ name, href, slug, index, description }: (typeof locations)[number]) {
  return (
    <Link aria-label={"Learn about sourcing from " + name} className="location-card" href={href}>
      <div aria-hidden="true" className={"location-art location-art--" + slug}>
        <span className="location-art-index">SOURCING LOCATION {index}</span>
        <span className="location-art-orbit" />
        <span className="location-art-label">Rwanda to {name}</span>
      </div>
      <div className="location-card-copy">
        <div>
          <Heading as="h3" className="location-card-title">{name}</Heading>
          <p className="location-card-description">{description}</p>
        </div>
        <span aria-hidden="true" className="location-arrow">&#8599;</span>
      </div>
    </Link>
  );
}

export function LocationGrid() {
  return (
    <section aria-labelledby="locations-title" className="section-space" id="locations">
      <div className="site-container">
        <SectionHeading id="locations-title" eyebrow="Sourcing locations" title="Explore the markets we work across."
          description="Tell us which market you have in mind and we can review the request with our sourcing network." />
        <div className="location-grid">{locations.map((location) => <LocationCard key={location.href} {...location} />)}</div>
      </div>
    </section>
  );
}
