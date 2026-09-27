import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import type { FAQItem } from "@/features/marketing/content";
import { FaqList } from "./faq-list";

type FAQCategoryListProps = {
  categories: readonly { id: string; title: string; items: readonly FAQItem[] }[];
};

export function FaqCategoryList({ categories }: FAQCategoryListProps) {
  return (
    <section aria-label="Frequently asked questions by topic" className="section-space pt-0">
      <Container>
        <div className="grid gap-12">
          {categories.map((category) => (
            <section aria-labelledby={`faq-${category.id}-title`} id={`faq-${category.id}`} key={category.id}>
              <Heading as="h2" className="mb-5 text-2xl sm:text-3xl" id={`faq-${category.id}-title`}>{category.title}</Heading>
              <FaqList items={category.items} openFirst={false} />
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
