import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocationLandingPage } from "@/features/marketing/components/location-landing-page";
import { locationPages } from "@/features/marketing/content/locations";
import { createPageMetadata } from "@/lib/seo";

type LocationRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locationPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LocationRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locationPages.find((item) => item.slug === slug);
  if (!location) return {};

  return createPageMetadata({ title: location.title, description: location.description, path: location.href });
}

export default async function LocationPage({ params }: LocationRouteProps) {
  const { slug } = await params;
  const location = locationPages.find((item) => item.slug === slug);
  if (!location) notFound();

  return <LocationLandingPage location={location} />;
}
