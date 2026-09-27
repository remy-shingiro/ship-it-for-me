import { quoteRequestDraftSchema, type QuoteRequestDraftInput } from "../schemas/quote-request";

export type QuoteStepIndex = 0 | 1 | 2 | 3;
export type FieldErrors = Record<string, string>;
type IssueLike = { path: PropertyKey[]; code: string };

export function errorsFromIssues(issues: readonly IssueLike[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path.map(String).join(".");
    if (!key || errors[key]) continue;
    if (key === "product.name") errors[key] = issue.code === "too_big" ? "Keep the product name under 120 characters." : "Product name is required.";
    else if (key === "product.url") errors[key] = "Please enter a valid product URL.";
    else if (key === "product.quantity") errors[key] = issue.code === "too_big" ? "Quantity cannot exceed 10,000." : issue.code === "too_small" ? "Quantity must be at least 1." : "Enter a whole number greater than 0.";
    else if (key === "product.description") errors[key] = "Keep the description under 2,000 characters.";
    else if (key === "requirements.budget") errors[key] = issue.code === "too_big" ? "Enter a smaller budget amount." : "Enter a valid approximate amount.";
    else if (key === "requirements.additionalRequirements") errors[key] = "Keep additional requirements under 3,000 characters.";
    else if (key === "contact.name") errors[key] = issue.code === "too_big" ? "Keep your name under 120 characters." : "Full name is required.";
    else if (key === "contact.phone") errors[key] = issue.code === "too_big" ? "Keep the phone number under 30 characters." : "Enter a phone number with at least 5 characters.";
    else if (key === "contact.email") errors[key] = "Please enter a valid email address.";
    else if (key === "contact.preferredContactMethod") errors[key] = "Choose how you would prefer us to be contacted.";
    else errors[key] = "Please check this field.";
  }
  return errors;
}

export function validateStep(draft: QuoteRequestDraftInput, step: QuoteStepIndex, methodChosen: boolean) {
  if (step === 3) return { success: true as const, errors: {} as FieldErrors };
  const result = step === 0
    ? quoteRequestDraftSchema.shape.product.safeParse(draft.product)
    : step === 1
      ? quoteRequestDraftSchema.shape.requirements.safeParse(draft.requirements)
      : quoteRequestDraftSchema.shape.contact.safeParse({
          ...draft.contact,
          preferredContactMethod: methodChosen ? draft.contact.preferredContactMethod : "",
        });
  return result.success
    ? { success: true as const, errors: {} as FieldErrors }
    : { success: false as const, errors: errorsFromIssues(result.error.issues) };
}

export function validateDraft(draft: QuoteRequestDraftInput, methodChosen: boolean) {
  return quoteRequestDraftSchema.safeParse({
    ...draft,
    contact: { ...draft.contact, preferredContactMethod: methodChosen ? draft.contact.preferredContactMethod : "" },
  });
}

export function stepForIssuePath(path: PropertyKey[] | undefined): QuoteStepIndex {
  if (path?.[0] === "product") return 0;
  if (path?.[0] === "requirements") return 1;
  return 2;
}
