import { Heading } from "@/components/ui/heading";

type SectionHeadingProps = { eyebrow: string; title: string; description?: string; id?: string };

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <Heading as="h2" className="section-title" id={id}>{title}</Heading>
      {description ? <p className="body-copy m-0">{description}</p> : null}
    </div>
  );
}
