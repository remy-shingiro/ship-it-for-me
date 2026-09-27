import type { processSteps } from "@/features/marketing/content";
import { Heading } from "@/components/ui/heading";

type ProcessStepProps = (typeof processSteps)[number];

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <li className="process-step">
      <span aria-hidden="true" className="process-number">{number}</span>
      <Heading as="h3" className="process-title">{title}</Heading>
      <p className="process-description">{description}</p>
    </li>
  );
}
