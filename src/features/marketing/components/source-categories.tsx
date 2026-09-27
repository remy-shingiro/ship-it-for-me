import { sourceCategories } from "@/features/marketing/content";
import { SectionHeading } from "./section-heading";

export function SourceCategories() {
  return (
    <section aria-labelledby="categories-title" className="categories-section section-space">
      <div className="site-container categories-layout">
        <SectionHeading id="categories-title" eyebrow="What we source" title="Tell us what you are looking for." />
        <div>
          <p className="body-copy mt-0">Whether it is electronics, machinery, household goods or something more specialized, share what you have in mind and we will assess the sourcing options.</p>
          <ul aria-label="Example product categories" className="category-list">
            {sourceCategories.map((category) => <li className="category-chip" key={category}>{category}</li>)}
          </ul>
          <p className="category-note">Examples only. Every request is reviewed individually.</p>
        </div>
      </div>
    </section>
  );
}
