import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { siteName } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = new URL(path, publicEnv.siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName,
      url,
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
