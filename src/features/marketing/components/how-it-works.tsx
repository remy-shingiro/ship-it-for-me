import { processSteps } from "@/features/marketing/content";
import { ProcessStep } from "./process-step";
import { SectionHeading } from "./section-heading";

export function HowItWorks() {
  return (
    <section aria-labelledby="process-title" className="section-space" id="how-it-works">
      <div className="site-container">
        <SectionHeading id="process-title" eyebrow="How it works" title="A clear process, centered on what you need."
          description="A straightforward path from a product idea to a conversation about sourcing options." />
        <ol className="process-grid m-0 list-none p-0">{processSteps.map((step) => <ProcessStep key={step.number} {...step} />)}</ol>
      </div>
    </section>
  );
}
