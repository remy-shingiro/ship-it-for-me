import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Request Received", robots: { index: false, follow: false } };

export default function RequestSuccessPage() {
  return <Section><Heading as="h1" className="text-3xl">Request Received</Heading></Section>;
}