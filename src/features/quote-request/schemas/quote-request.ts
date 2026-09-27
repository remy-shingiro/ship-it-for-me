import { z } from "zod";
import {
  PREFERRED_CONTACT_METHODS,
  QUOTE_REQUEST_STATUSES,
  SOURCING_COUNTRIES,
  TIMELINES,
} from "../domain/quote-request";

const optionalText = (maxLength: number) =>
  z.string().trim().max(maxLength).optional().or(z.literal(""));

export const quoteRequestDraftSchema = z.object({
  product: z.object({
    name: z.string().trim().min(1).max(120),
    url: z.string().url().max(2048).optional().or(z.literal("")),
    quantity: z.number().int().min(1).max(10_000),
    description: optionalText(2_000),
  }),
  requirements: z.object({
    sourceCountry: z.enum(SOURCING_COUNTRIES).optional(),
    budget: z.number().finite().min(0).max(1_000_000_000_000).optional(),
    timeline: z.enum(TIMELINES).optional(),
    additionalRequirements: optionalText(3_000),
  }),
  contact: z.object({
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(5).max(30),
    email: z.string().trim().email().max(254).optional().or(z.literal("")),
    preferredContactMethod: z.enum(PREFERRED_CONTACT_METHODS),
  }),
});

export const quoteRequestStatusSchema = z.enum(QUOTE_REQUEST_STATUSES);

export type QuoteRequestDraftInput = z.infer<typeof quoteRequestDraftSchema>;