import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { SectionHeading } from "./section-heading";

type RequestDetailsSectionProps = {
  title: string;
  description: string;
  items: readonly string[];
};

export function RequestDetailsSection({ title, description, items }: RequestDetailsSectionProps) {
  return (
    <section aria-labelledby="request-details-title" className="section-space bg-surface-muted">
      <Container>
        <SectionHeading description={description} eyebrow="What to include" id="request-details-title" title={title} />
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item}>
              <Card className="flex h-full min-h-20 items-center gap-4 p-4">
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <Heading as="h3" className="text-base">{item}</Heading>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
