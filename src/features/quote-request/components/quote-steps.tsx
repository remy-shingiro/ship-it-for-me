import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PREFERRED_CONTACT_METHODS, SOURCING_COUNTRIES, TIMELINES, type PreferredContactMethod, type SourcingCountry, type Timeline } from "../domain/quote-request";
import type { QuoteRequestDraftInput } from "../schemas/quote-request";
import type { SelectedProductImage } from "./image-picker";

type Errors = Record<string, string>;
type BlurHandler = (field: string) => void;

function fieldA11y(id: string, error?: string, hintId?: string) {
  return {
    "aria-invalid": error ? true as const : undefined,
    "aria-describedby": [hintId, error ? `${id}-error` : undefined].filter(Boolean).join(" ") || undefined,
  };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="m-0 text-sm text-error" id={`${id}-error`}>{message}</p> : null;
}

function Field({ id, label, hint, error, required, children }: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 content-start gap-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}{required ? <span aria-hidden="true" className="text-error"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {hint ? <p className="m-0 text-sm leading-6 text-muted" id={`${id}-hint`}>{hint}</p> : null}
      <FieldError id={id} message={error} />
    </div>
  );
}

export function ProductStep({ product, errors, visible, onChange, onBlur }: {
  product: QuoteRequestDraftInput["product"];
  errors: Errors;
  visible: (field: string) => boolean;
  onChange: <K extends keyof QuoteRequestDraftInput["product"]>(field: K, value: QuoteRequestDraftInput["product"][K]) => void;
  onBlur: BlurHandler;

}) {
  const nameError = visible("product.name") ? errors["product.name"] : undefined;
  const urlError = visible("product.url") ? errors["product.url"] : undefined;
  const quantityError = visible("product.quantity") ? errors["product.quantity"] : undefined;
  const descriptionError = visible("product.description") ? errors["product.description"] : undefined;

  return (
    <div className="grid min-w-0 gap-5">
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field id="product.name" label="Product name" error={nameError} required>
          <Input id="product.name" autoComplete="off" {...fieldA11y("product.name", nameError)} maxLength={120} onBlur={() => onBlur("product.name")} onChange={(event) => onChange("name", event.currentTarget.value)} placeholder="What product are you looking for?" required value={product.name} />
        </Field>
        <Field id="product.quantity" label="Quantity" error={quantityError} required>
          <Input id="product.quantity" {...fieldA11y("product.quantity", quantityError, "product.quantity-hint")} inputMode="numeric" max={10_000} min={1} onBlur={() => onBlur("product.quantity")} onChange={(event) => onChange("quantity", event.currentTarget.value === "" ? Number.NaN : Number(event.currentTarget.value))} required step={1} type="number" value={Number.isNaN(product.quantity) ? "" : product.quantity} />
          <span className="sr-only" id="product.quantity-hint">Enter a whole number from 1 to 10,000.</span>
        </Field>
      </div>
      <Field id="product.url" label="Product URL" error={urlError} hint="Optional. Paste a link from a marketplace or supplier website.">
        <Input id="product.url" {...fieldA11y("product.url", urlError, "product.url-hint")} autoCapitalize="none" autoComplete="url" maxLength={2048} onBlur={() => onBlur("product.url")} onChange={(event) => onChange("url", event.currentTarget.value)} placeholder="https://" type="url" value={product.url ?? ""} />
      </Field>
      <Field id="product.description" label="Description" error={descriptionError} hint="Share any model, size, color, specification or quality requirements.">
        <Textarea id="product.description" {...fieldA11y("product.description", descriptionError, "product.description-hint")} maxLength={2000} onBlur={() => onBlur("product.description")} onChange={(event) => onChange("description", event.currentTarget.value)} placeholder="Add useful details about what you need." value={product.description ?? ""} />
      </Field>

    </div>
  );
}

export function RequirementsStep({ requirements, errors, visible, onCountry, onBudget, onTimeline, onAdditionalRequirements, onBlur }: {
  requirements: QuoteRequestDraftInput["requirements"];
  errors: Errors;
  visible: (field: string) => boolean;
  onCountry: (country: SourcingCountry | undefined) => void;
  onBudget: (budget: number | undefined) => void;
  onTimeline: (timeline: Timeline | undefined) => void;
  onAdditionalRequirements: (text: string) => void;
  onBlur: BlurHandler;
}) {
  const budgetError = visible("requirements.budget") ? errors["requirements.budget"] : undefined;
  const additionalError = visible("requirements.additionalRequirements") ? errors["requirements.additionalRequirements"] : undefined;
  return (
    <div className="grid min-w-0 gap-5">
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field id="requirements.sourceCountry" label="Source country">
          <Select id="requirements.sourceCountry" onChange={(event) => onCountry(SOURCING_COUNTRIES.find((country) => country === event.currentTarget.value))} value={requirements.sourceCountry ?? ""}>
            <option value="">No preference</option><option value="CHINA">China</option><option value="DUBAI">Dubai</option><option value="UGANDA">Uganda</option>
          </Select>
        </Field>
        <Field id="requirements.budget" label="Approximate budget" error={budgetError} hint="Optional. Enter a rough amount; this does not guarantee a product at that price.">
          <Input id="requirements.budget" {...fieldA11y("requirements.budget", budgetError, "requirements.budget-hint")} inputMode="decimal" min={0} onBlur={() => onBlur("requirements.budget")} onChange={(event) => onBudget(event.currentTarget.value === "" ? undefined : Number(event.currentTarget.value))} placeholder="Amount only" step="any" type="number" value={requirements.budget ?? ""} />
        </Field>
      </div>
      <Field id="requirements.timeline" label="When do you need it?">
        <Select id="requirements.timeline" onChange={(event) => onTimeline(TIMELINES.find((timeline) => timeline === event.currentTarget.value))} value={requirements.timeline ?? ""}>
          <option value="">Select a timeline</option><option value="ASAP">As soon as possible</option><option value="ONE_TO_TWO_WEEKS">Within 1–2 weeks</option><option value="TWO_TO_FOUR_WEEKS">Within 2–4 weeks</option><option value="FLEXIBLE">Flexible</option>
        </Select>
      </Field>
      <Field id="requirements.additionalRequirements" label="Additional requirements" error={additionalError} hint="Optional. Add any other details that could help us assess your request.">
        <Textarea id="requirements.additionalRequirements" {...fieldA11y("requirements.additionalRequirements", additionalError, "requirements.additionalRequirements-hint")} maxLength={3000} onBlur={() => onBlur("requirements.additionalRequirements")} onChange={(event) => onAdditionalRequirements(event.currentTarget.value)} placeholder="Anything else we should know?" value={requirements.additionalRequirements ?? ""} />
      </Field>
    </div>
  );
}

export function ContactStep({ contact, errors, visible, methodChosen, onName, onPhone, onEmail, onMethod, onBlur }: {
  contact: QuoteRequestDraftInput["contact"];
  errors: Errors;
  visible: (field: string) => boolean;
  methodChosen: boolean;
  onName: (name: string) => void;
  onPhone: (phone: string) => void;
  onEmail: (email: string) => void;
  onMethod: (method: PreferredContactMethod) => void;
  onBlur: BlurHandler;
}) {
  const nameError = visible("contact.name") ? errors["contact.name"] : undefined;
  const phoneError = visible("contact.phone") ? errors["contact.phone"] : undefined;
  const emailError = visible("contact.email") ? errors["contact.email"] : undefined;
  const methodError = visible("contact.preferredContactMethod") ? errors["contact.preferredContactMethod"] : undefined;
  return (
    <div className="grid min-w-0 gap-5">
      <Field id="contact.name" label="Full name" error={nameError} required>
        <Input id="contact.name" autoComplete="name" {...fieldA11y("contact.name", nameError)} maxLength={120} onBlur={() => onBlur("contact.name")} onChange={(event) => onName(event.currentTarget.value)} required value={contact.name} />
      </Field>
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field id="contact.phone" label="Phone / WhatsApp" error={phoneError} required hint="Use a number where we can reach you.">
          <Input id="contact.phone" autoComplete="tel" {...fieldA11y("contact.phone", phoneError, "contact.phone-hint")} maxLength={30} onBlur={() => onBlur("contact.phone")} onChange={(event) => onPhone(event.currentTarget.value)} required type="tel" value={contact.phone} />
        </Field>
        <Field id="contact.email" label="Email" error={emailError} hint="Optional.">
          <Input id="contact.email" autoCapitalize="none" autoComplete="email" {...fieldA11y("contact.email", emailError, "contact.email-hint")} maxLength={254} onBlur={() => onBlur("contact.email")} onChange={(event) => onEmail(event.currentTarget.value)} type="email" value={contact.email ?? ""} />
        </Field>
      </div>
      <fieldset aria-describedby={methodError ? "contact.preferredContactMethod-hint contact.preferredContactMethod-error" : "contact.preferredContactMethod-hint"} aria-invalid={methodError ? true : undefined} className="m-0 grid min-w-0 gap-2 border-0 p-0">
        <legend className="text-sm font-medium text-foreground">Preferred contact method<span aria-hidden="true" className="text-error"> *</span><span className="sr-only"> (required)</span></legend>
        <p className="m-0 text-sm leading-6 text-muted" id="contact.preferredContactMethod-hint">Choose one. You do not need to use WhatsApp to request a quote.</p>
        <div className="grid gap-2 sm:grid-cols-3" onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onBlur("contact.preferredContactMethod");
        }}>
          {PREFERRED_CONTACT_METHODS.map((method) => {
            const label = method === "WHATSAPP" ? "WhatsApp" : method === "PHONE" ? "Phone" : "Email";
            return (
              <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-control border px-3 py-3 text-sm font-medium focus-within:ring-2 focus-within:ring-primary ${methodChosen && contact.preferredContactMethod === method ? "border-primary bg-primary-soft text-primary" : "border-border bg-surface text-foreground hover:bg-surface-muted"}`} key={method}>
                <input checked={methodChosen && contact.preferredContactMethod === method} className="h-4 w-4 accent-primary" name="preferredContactMethod" onChange={() => onMethod(method)} required type="radio" value={method} />
                {label}
              </label>
            );
          })}
        </div>
        <FieldError id="contact.preferredContactMethod" message={methodError} />
      </fieldset>
    </div>
  );
}

function ReviewValue({ label, children }: { label: string; children: ReactNode }) {
  return <div className="min-w-0"><dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt><dd className="mt-1 min-w-0 break-words text-sm leading-6 text-foreground">{children}</dd></div>;
}

function EditSection({ title, label, onEdit, children }: { title: string; label: string; onEdit: () => void; children: ReactNode }) {
  const id = `review-${label.toLowerCase().replace(/\s+/g, "-")}-title`;
  return (
    <section aria-labelledby={id} className="border-t border-border pt-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="m-0 text-base font-semibold text-foreground" id={id}>{title}</h3>
        <Button className="min-h-10 px-3 py-2 text-sm" onClick={onEdit} type="button" variant="ghost"><span className="sr-only">Edit </span>{label}</Button>
      </div>
      {children}
    </section>
  );
}

const countryLabels: Record<SourcingCountry, string> = { CHINA: "China", DUBAI: "Dubai", UGANDA: "Uganda" };
const timelineLabels: Record<Timeline, string> = { ASAP: "As soon as possible", ONE_TO_TWO_WEEKS: "Within 1–2 weeks", TWO_TO_FOUR_WEEKS: "Within 2–4 weeks", FLEXIBLE: "Flexible" };

export function ReviewStep({ draft, images, onEdit }: {
  draft: QuoteRequestDraftInput;
  images: SelectedProductImage[];
  onEdit: (step: 0 | 1 | 2) => void;
}) {
  const optional = (value?: string) => value?.trim() ? value : <span className="text-muted">Not provided</span>;
  const method = draft.contact.preferredContactMethod;
  const methodLabel = method === "WHATSAPP" ? "WhatsApp" : method === "PHONE" ? "Phone" : "Email";
  const productUrl = draft.product.url?.trim();
  return (
    <div className="grid gap-6">
      <EditSection label="product details" title="Product" onEdit={() => onEdit(0)}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <ReviewValue label="Product name">{draft.product.name.trim()}</ReviewValue>
          <ReviewValue label="Quantity">{draft.product.quantity}</ReviewValue>
          <ReviewValue label="Product URL">{productUrl ? (/^https?:\/\//i.test(productUrl) ? <a className="break-all text-primary underline underline-offset-2" href={productUrl} rel="noreferrer" target="_blank">{productUrl}</a> : <span className="break-all">{productUrl}</span>) : <span className="text-muted">Not provided</span>}</ReviewValue>
          <ReviewValue label="Description">{optional(draft.product.description)}</ReviewValue>
          <div className="sm:col-span-2"><ReviewValue label="Selected images">
            {images.length ? <ul className="mt-2 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-5">{images.map((image) => <li className="min-w-0" key={image.id}><Image alt={`Preview of ${image.file.name}`} className="aspect-square w-full rounded-control object-cover" height={100} src={image.previewUrl} unoptimized width={100} /><span className="mt-1 block break-all text-xs text-muted">{image.file.name}</span></li>)}</ul> : <span className="text-muted">None selected</span>}
          </ReviewValue></div>
        </dl>
      </EditSection>
      <EditSection label="requirements" title="Requirements" onEdit={() => onEdit(1)}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <ReviewValue label="Source country">{draft.requirements.sourceCountry ? countryLabels[draft.requirements.sourceCountry] : "No preference"}</ReviewValue>
          <ReviewValue label="Approximate budget">{draft.requirements.budget === undefined ? <span className="text-muted">Not provided</span> : `${draft.requirements.budget} (amount only)`}</ReviewValue>
          <ReviewValue label="Timeline">{draft.requirements.timeline ? timelineLabels[draft.requirements.timeline] : "Not provided"}</ReviewValue>
          <ReviewValue label="Additional requirements">{optional(draft.requirements.additionalRequirements)}</ReviewValue>
        </dl>
      </EditSection>
      <EditSection label="contact" title="Contact" onEdit={() => onEdit(2)}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <ReviewValue label="Name">{draft.contact.name.trim()}</ReviewValue>
          <ReviewValue label="Phone / WhatsApp">{draft.contact.phone.trim()}</ReviewValue>
          <ReviewValue label="Email">{optional(draft.contact.email)}</ReviewValue>
          <ReviewValue label="Preferred contact method">{methodLabel}</ReviewValue>
        </dl>
      </EditSection>
    </div>
  );
}
