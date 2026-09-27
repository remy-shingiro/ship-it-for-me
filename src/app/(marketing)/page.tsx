import { Heading } from "@/components/ui/heading";
import { siteName } from "@/lib/site";
import { Section } from "@/components/ui/section";

export default function HomePage() {
  return (
    <Section>
      <Heading as="h1" className="text-3xl">{siteName}</Heading>
    </Section>
  );
}