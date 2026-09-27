import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PREFERRED_CONTACT_METHODS, type PreferredContactMethod } from "@/features/quote-request/domain/quote-request";
import { serverEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: "Request Received",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams: Promise<{ contact?: string | string[] }>;
};

const methodLabels: Record<PreferredContactMethod, string> = {
  WHATSAPP: "WhatsApp",
  PHONE: "phone",
  EMAIL: "email",
};

export default async function RequestSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const candidate = Array.isArray(params.contact) ? params.contact[0] : params.contact;
  const contactMethod = PREFERRED_CONTACT_METHODS.find((method) => method === candidate);
  const whatsappDigits = serverEnv.whatsappBusinessNumber?.replace(/\D/g, "");
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Card className="mx-auto max-w-2xl rounded-panel px-5 py-8 sm:px-9 sm:py-10">
          <p className="eyebrow">Quote request</p>
          <Heading as="h1" className="mt-2 text-3xl sm:text-4xl">Request received</Heading>
          <p className="body-copy mt-4 !text-base">
            {contactMethod
              ? `In a live submission, the team would review your request and contact you by ${methodLabels[contactMethod]}.`
              : "In a live submission, the team would review your request and contact you using your selected method."}
          </p>
          <p className="mt-5 rounded-control border border-accent/40 bg-accent-soft px-4 py-3 text-sm leading-6 text-foreground">
            Preview only: this demo did not send or save your request.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            {whatsappHref ? (
              <ButtonLink href={whatsappHref} rel="noreferrer" target="_blank" variant="secondary">
                Chat on WhatsApp
              </ButtonLink>
            ) : null}
          </div>
        </Card>
      </Container>
    </section>
  );
}
