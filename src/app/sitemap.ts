import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const paths = [
  "/",
  "/how-it-works",
  "/services",
  "/locations",
  "/locations/china",
  "/locations/dubai",
  "/locations/uganda",
  "/about",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
