import type { FAQItem } from "@/features/marketing/content";

type FaqListProps = {
  items: readonly FAQItem[];
  openFirst?: boolean;
};

export function FaqList({ items, openFirst = true }: FaqListProps) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.id} open={openFirst && index === 0}>
          <summary className="faq-question"><span>{item.question}</span><span aria-hidden="true" className="faq-toggle" /></summary>
          <p className="faq-answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
