import Link from "next/link";
import Image from "next/image";
import { locations } from "@/features/marketing/content";
import { Heading } from "@/components/ui/heading";
import { CountryFlag } from "./country-flag";
import { SectionHeading } from "./section-heading";

export function LocationCard({ name, country, href, slug, description, imageSrc, imageAlt }: (typeof locations)[number]) {
  return (
    <Link className="location-card" href={href}>
      <div className={"location-art location-art--" + slug}>
        <Image alt={imageAlt} className="location-art-image" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={imageSrc} />
        <span aria-hidden="true" className="location-art-shade" />
        <span className="location-country"><CountryFlag country={country} /><span>{country}</span></span>
        <span className="location-art-label">Sourcing from {name}</span>
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

type LocationGridProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function LocationGrid({
  id = "locations",
  eyebrow = "Sourcing locations",
  title = "Explore the markets we work across.",
  description = "Tell us which market you have in mind and we can review the request with our sourcing network.",
}: LocationGridProps) {
  return (
    <section aria-labelledby="locations-title" className="section-space" id={id}>
      <div className="site-container">
        <SectionHeading id="locations-title" eyebrow={eyebrow} title={title} description={description} />
        <div className="location-grid">{locations.map((location) => <LocationCard key={location.href} {...location} />)}</div>
      </div>
    </section>
  );
}
