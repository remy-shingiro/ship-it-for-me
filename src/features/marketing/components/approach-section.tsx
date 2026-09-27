import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { aboutPrinciples } from "@/features/marketing/content";
import { SectionHeading } from "./section-heading";

export function ApproachSection() {
  return (
    <section aria-labelledby="approach-title" className="section-space bg-surface">
      <Container>
        <SectionHeading
          description="The approach is centered on understanding each request and being clear about what can be explored."
          eyebrow="Our approach"
          id="approach-title"
          title="A considered process for each request."
        />
        <ol className="m-0 grid list-none gap-7 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPrinciples.map((principle) => (
            <li className="border-t border-border-strong pt-5" key={principle.number}>
              <span aria-hidden="true" className="text-sm font-bold tracking-widest text-accent">{principle.number}</span>
              <Heading as="h3" className="mt-3 text-lg">{principle.title}</Heading>
              <p className="mb-0 mt-2 text-sm leading-6 text-muted">{principle.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
