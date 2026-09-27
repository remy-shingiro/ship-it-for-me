import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

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
  "/request",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, publicEnv.siteUrl).toString(),
  }));
}