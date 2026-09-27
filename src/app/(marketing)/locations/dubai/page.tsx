import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Dubai" };

export default function DubaiPage() {
  return <Section><Heading as="h1" className="text-3xl">Dubai</Heading></Section>;
}