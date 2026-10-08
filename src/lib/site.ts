import "server-only";
import { publicEnv } from "@/lib/env";

const whatsappNumber = "+250 781 286 272";
const whatsappDigits = whatsappNumber.replace(/\D/g, "");

export const siteConfig = {
  companyName: "PrimeLink Sourcing Ltd",
  brandName: "PrimeLink",
  name: "PrimeLink",
  url: publicEnv.siteUrl,
  whatsappNumber,
  whatsappHref: `https://wa.me/${whatsappDigits}`,
  whatsappConfigured: true,
} as const;

export const siteName = siteConfig.brandName;
