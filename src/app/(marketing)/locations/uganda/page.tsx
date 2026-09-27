import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Uganda" };

export default function UgandaPage() {
  return <Section><Heading as="h1" className="text-3xl">Uganda</Heading></Section>;
}