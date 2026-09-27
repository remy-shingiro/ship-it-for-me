import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export function AboutOverview() {
  return (
    <section aria-labelledby="what-we-do-title" className="section-space bg-surface">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">What we do</p>
            <Heading as="h2" className="section-title mt-4" id="what-we-do-title">Your request is where the process begins.</Heading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <Heading as="h3" className="text-lg">You tell us what you need</Heading>
              <p className="mb-0 mt-3 text-sm leading-6 text-muted">Share a product name, link, image, quantity and the requirements that matter to you.</p>
            </Card>
            <Card>
              <Heading as="h3" className="text-lg">The team explores options</Heading>
              <p className="mb-0 mt-3 text-sm leading-6 text-muted">The team works through sourcing agents in international markets and helps customers in Rwanda understand the options available for their request.</p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
