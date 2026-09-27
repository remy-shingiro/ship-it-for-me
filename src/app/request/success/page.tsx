import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Request Received",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams: Promise<{ reference?: string | string[] }>;
};

export default async function RequestSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  if (!reference || !/^RQ-\d{4}-[0-9A-HJKMNP-TV-Z]{10}$/.test(reference)) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Card className="mx-auto max-w-2xl rounded-panel px-5 py-8 sm:px-9 sm:py-10">
          <p className="eyebrow">Quote request</p>
          <Heading as="h1" className="mt-2 text-3xl sm:text-4xl">Request received</Heading>
          <p className="mt-5 text-sm font-medium text-muted">Your request reference:</p>
          <p className="mt-1 font-mono text-xl font-semibold tracking-wide text-foreground">{reference}</p>
          <p className="body-copy mt-4 !text-base">We&apos;ve received your request and our team will review it. We&apos;ll contact you using your preferred contact method.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
          </div>
        </Card>
      </Container>
    </section>
  );
}
