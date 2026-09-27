import "server-only";
import { publicEnv, serverEnv } from "@/lib/env";

const whatsappDigits = serverEnv.whatsappBusinessNumber?.replace(/\D/g, "");

export const siteConfig = {
  name: "Company Name",
  url: publicEnv.siteUrl,
  whatsappNumber: serverEnv.whatsappBusinessNumber,
  whatsappHref: whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined,
  whatsappConfigured: Boolean(whatsappDigits),
} as const;

export const siteName = siteConfig.name;
