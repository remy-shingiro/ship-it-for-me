import { ButtonLink } from "@/components/ui/button-link";
import { Heading } from "@/components/ui/heading";

type FinalCtaProps = { whatsappHref?: string };

export function FinalCta({ whatsappHref }: FinalCtaProps) {
  return (
    <section aria-labelledby="final-cta-title" className="section-space pt-0">
      <div className="site-container">
        <div className="final-cta">
          <p className="eyebrow">Start with what you need</p>
          <Heading as="h2" className="section-title" id="final-cta-title">Looking for something from abroad?</Heading>
          <p className="final-cta-copy">Tell us what you have in mind and we will help you explore the sourcing options.</p>
          <div className="final-cta-actions">
            <ButtonLink href="/request" variant="inverse">Request a Quote <span aria-hidden="true">&#8599;</span></ButtonLink>
            {whatsappHref ? <ButtonLink href={whatsappHref} rel="noreferrer" target="_blank" variant="on-dark">Chat on WhatsApp <span aria-hidden="true">&#8599;</span></ButtonLink> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
