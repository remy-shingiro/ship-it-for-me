import Link from "next/link";
import type { FAQItem } from "@/features/marketing/content";
import { FaqList } from "./faq-list";
import { SectionHeading } from "./section-heading";

type FaqSectionProps = {
  items: readonly FAQItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showAllLink?: boolean;
};

export function FaqSection({
  items,
  eyebrow = "Frequently asked questions",
  title = "Good to know before you begin.",
  description = "A few useful details about making a product request.",
  showAllLink = true,
}: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-title" className="section-space" id="faq">
      <div className="site-container faq-layout">
        <div>
          <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} description={description} />
          {showAllLink ? <Link className="faq-more" href="/faq">Visit all FAQs <span aria-hidden="true">&#8599;</span></Link> : null}
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
