import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { serviceCapabilities } from "@/features/marketing/content";
import { SectionHeading } from "./section-heading";

export function ServiceGrid() {
  return (
    <section aria-labelledby="service-capabilities-title" className="section-space bg-surface">
      <Container>
        <SectionHeading
          description="Each request is reviewed on its own details. These are areas where the team may be able to help, depending on the request and available options."
          eyebrow="What we help with"
          id="service-capabilities-title"
          title="Support built around your product request."
        />
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCapabilities.map((service) => (
            <li key={service.number}>
              <Card className="h-full">
                <span aria-hidden="true" className="text-sm font-bold tracking-widest text-primary">{service.number}</span>
                <Heading as="h3" className="mt-4 text-lg">{service.title}</Heading>
                <p className="mb-0 mt-2 text-sm leading-6 text-muted">{service.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
