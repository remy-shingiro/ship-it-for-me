import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Request a Quote" };

export default function RequestPage() {
  return <Section><Heading as="h1" className="text-3xl">Request a Quote</Heading></Section>;
}