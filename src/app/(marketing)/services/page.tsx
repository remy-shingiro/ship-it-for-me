import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "What We Source" };

export default function ServicesPage() {
  return <Section><Heading as="h1" className="text-3xl">What We Source</Heading></Section>;
}