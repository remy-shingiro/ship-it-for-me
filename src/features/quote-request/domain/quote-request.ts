export const QUOTE_REQUEST_STATUSES = [
  "PENDING",
  "REVIEWING",
  "SOURCING",
  "QUOTED",
  "APPROVED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",
] as const;

export type QuoteRequestStatus = (typeof QUOTE_REQUEST_STATUSES)[number];

export const SOURCING_COUNTRIES = ["CHINA", "DUBAI", "UGANDA"] as const;
export type SourcingCountry = (typeof SOURCING_COUNTRIES)[number];

export const TIMELINES = ["ASAP", "ONE_TO_TWO_WEEKS", "TWO_TO_FOUR_WEEKS", "FLEXIBLE"] as const;
export type Timeline = (typeof TIMELINES)[number];

export const PREFERRED_CONTACT_METHODS = ["WHATSAPP", "PHONE", "EMAIL"] as const;
export type PreferredContactMethod = (typeof PREFERRED_CONTACT_METHODS)[number];

export interface QuoteRequestProductDraft {
  name: string;
  url?: string;
  quantity: number;
  description?: string;
}

export interface QuoteRequestRequirementsDraft {
  sourceCountry?: SourcingCountry;
  budget?: number;
  timeline?: Timeline;
  additionalRequirements?: string;
}

export interface QuoteRequestContactDraft {
  name: string;
  phone: string;
  email?: string;
  preferredContactMethod: PreferredContactMethod;
}

export interface QuoteRequestDraft {
  product: QuoteRequestProductDraft;
  requirements: QuoteRequestRequirementsDraft;
  contact: QuoteRequestContactDraft;
}

export interface QuoteRequest extends QuoteRequestDraft {
  id: string;
  status: QuoteRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}