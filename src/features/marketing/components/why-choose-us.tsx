import { serviceBenefits } from "@/features/marketing/content";
import { SectionHeading } from "./section-heading";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="benefits-title" className="why-section section-space">
      <div className="site-container why-layout">
        <div>
          <SectionHeading id="benefits-title" eyebrow="Why use a sourcing service" title="Less searching. A clearer way forward." />
          <p className="why-copy">Sourcing across borders can mean coordinating details in different markets. We help customers in Rwanda explore options through our agents and understand the next steps for a product request.</p>
        </div>
        <ul className="benefit-list">
          {serviceBenefits.map((benefit) => (
            <li className="benefit-item" key={benefit.title}>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
