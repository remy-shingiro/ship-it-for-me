import { processSteps } from "@/features/marketing/content";
import { ProcessStep } from "./process-step";
import { SectionHeading } from "./section-heading";

type HowItWorksProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function HowItWorks({
  id = "how-it-works",
  eyebrow = "How it works",
  title = "A clear process, centered on what you need.",
  description = "A straightforward path from a product idea to a conversation about sourcing options.",
}: HowItWorksProps) {
  return (
    <section aria-labelledby="process-title" className="section-space" id={id}>
      <div className="site-container">
        <SectionHeading id="process-title" eyebrow={eyebrow} title={title} description={description} />
        <ol className="process-grid m-0 list-none p-0">{processSteps.map((step) => <ProcessStep key={step.number} {...step} />)}</ol>
      </div>
    </section>
  );
}
