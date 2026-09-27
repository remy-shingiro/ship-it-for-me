import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { getAdminFirestore } from "@/lib/firebase/admin";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your product sourcing request was received.",
  alternates: { canonical: "/request/success" },
  robots: { index: false, follow: false },
};

async function requestExists(reference: string) {
  try {
    const result = await getAdminFirestore()
      .collection("quoteRequests")
      .where("reference", "==", reference)
      .limit(1)
      .get();
    return !result.empty;
  } catch (error) {
    console.error("[quote-request] Success reference verification failed", {
      errorCode: error instanceof Error ? error.name.slice(0, 64) : "unknown_error",
    });
    return false;
  }
}

type SuccessPageProps = {
  searchParams: Promise<{ reference?: string | string[] }>;
};

export default async function RequestSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const reference = Array.isArray(params.reference) ? params.reference[0] : params.reference;
  if (!reference || !/^RQ-\d{4}-[0-9A-HJKMNP-TV-Z]{10}$/.test(reference)) notFound();
  if (!(await requestExists(reference))) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Card className="mx-auto max-w-2xl rounded-panel px-5 py-8 sm:px-9 sm:py-10">
          <div aria-hidden="true" className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
              <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <p className="eyebrow">Quote request</p>
          <Heading as="h1" className="mt-2 text-3xl sm:text-4xl">Request received</Heading>
          <div className="mt-6 rounded-control border border-border bg-surface-muted p-4 sm:p-5">
            <p className="m-0 text-sm font-medium text-muted">Your request reference</p>
            <p className="mb-0 mt-2 break-all font-mono text-lg font-semibold tracking-wide text-foreground sm:text-xl">{reference}</p>
          </div>
          <p className="body-copy mt-4 !text-base">We&apos;ve received your request and our team will review it. We&apos;ll contact you using your preferred contact method.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
          </div>
        </Card>
      </Container>
    </section>
  );
}
