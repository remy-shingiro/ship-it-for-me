import { valuePoints } from "@/features/marketing/content";

export function ValueStrip() {
  return (
    <section aria-label="How we support your request" className="value-strip">
      <ul className="site-container value-list">
        {valuePoints.map((point) => <li className="value-point" key={point}>{point}</li>)}
      </ul>
    </section>
  );
}
