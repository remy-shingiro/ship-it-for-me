import Link from "next/link";
import { faqs } from "@/features/marketing/content";
import { SectionHeading } from "./section-heading";

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="section-space" id="faq">
      <div className="site-container faq-layout">
        <div>
          <SectionHeading id="faq-title" eyebrow="Frequently asked questions" title="Good to know before you begin."
            description="A few useful details about making a product request." />
          <Link className="faq-more" href="/faq">Visit all FAQs <span aria-hidden="true">&#8599;</span></Link>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary className="faq-question"><span>{faq.question}</span><span aria-hidden="true" className="faq-toggle" /></summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
