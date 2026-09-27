import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorksPage() {
  return <Section><Heading as="h1" className="text-3xl">How It Works</Heading></Section>;
}