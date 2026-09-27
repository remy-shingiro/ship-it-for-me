"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { submitQuoteRequest } from "../actions/submit-quote-request";
import type { PreferredContactMethod, SourcingCountry, Timeline } from "../domain/quote-request";
import type { QuoteRequestDraftInput } from "../schemas/quote-request";
import { ImagePicker, type SelectedProductImage } from "./image-picker";
import { ContactStep, ProductStep, RequirementsStep, ReviewStep } from "./quote-steps";
import { QuoteProgress } from "./quote-progress";
import { errorsFromIssues, stepForIssuePath, validateDraft, validateStep, type FieldErrors, type QuoteStepIndex } from "./quote-validation";

const stepHeadings = [
  "What are you looking for?",
  "Tell us about your requirements",
  "How can we reach you?",
  "Review your request",
] as const;
const stepDescriptions = [
  "Share a few details so we can understand the product you have in mind.",
  "Add any preferences that could help us explore the sourcing options.",
  "Choose how you would prefer us to contact you about this request.",
  "Check the details before continuing.",
] as const;

const initialDraft: QuoteRequestDraftInput = {
  product: { name: "", url: "", quantity: 1, description: "" },
  requirements: { sourceCountry: undefined, budget: undefined, timeline: undefined, additionalRequirements: "" },
  contact: { name: "", phone: "", email: "", preferredContactMethod: "WHATSAPP" },
};

export function QuoteForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [draft, setDraft] = useState<QuoteRequestDraftInput>(initialDraft);
  const [step, setStep] = useState<QuoteStepIndex>(0);
  const [methodChosen, setMethodChosen] = useState(false);
  const [attemptedStep, setAttemptedStep] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(() => new Set());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [images, setImages] = useState<SelectedProductImage[]>([]);
  const [imageError, setImageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, startSubmission] = useTransition();
  const submissionLock = useRef(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function updateDraft(nextDraft: QuoteRequestDraftInput, chosen = methodChosen) {
    setDraft(nextDraft);
    if (attemptedStep) setErrors(validateStep(nextDraft, step, chosen).errors);
  }

  function blurField(field: string) {
    setTouched((previous) => new Set(previous).add(field));
    setErrors(validateStep(draft, step, methodChosen).errors);
  }

  function isVisible(field: string) {
    return attemptedStep || touched.has(field);
  }

  function focusFirstInvalid() {
    requestAnimationFrame(() => {
      const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (invalid instanceof HTMLFieldSetElement) {
        invalid.querySelector<HTMLInputElement>('input[type="radio"]')?.focus();
      } else {
        invalid?.focus();
      }
    });
  }

  function continueStep() {
    const result = validateStep(draft, step, methodChosen);
    setAttemptedStep(true);
    setErrors(result.errors);
    if (!result.success) {
      focusFirstInvalid();
      return;
    }
    setStep((current) => (current < 3 ? (current + 1) as QuoteStepIndex : current));
    setAttemptedStep(false);
    setTouched(new Set());
    setErrors({});
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      continueStep();
      return;
    }

    const result = validateDraft(draft, methodChosen);
    if (!result.success) {
      const invalidStep = stepForIssuePath(result.error.issues[0]?.path);
      setStep(invalidStep);
      setAttemptedStep(true);
      setTouched(new Set());
      setErrors(errorsFromIssues(result.error.issues.filter((issue) => stepForIssuePath(issue.path) === invalidStep)));
      focusFirstInvalid();
      return;
    }

    if (!methodChosen || submissionLock.current) return;

    submissionLock.current = true;
    setSubmitError("");

    const formData = new FormData();
    formData.set("draft", JSON.stringify(draft));
    for (const image of images) formData.append("images", image.file);

    startSubmission(async () => {
      let submitted = false;
      try {
        const result = await submitQuoteRequest(formData);
        if (result.success) {
          submitted = true;
          router.push(`/request/success?reference=${encodeURIComponent(result.reference)}`);
        } else {
          setSubmitError(result.message);
        }
      } catch {
        setSubmitError("Something went wrong while submitting your request. Please try again.");
      } finally {
        if (!submitted) submissionLock.current = false;
      }
    });
  }

  function goBack() {
    if (step === 0) return;
    setStep((current) => (current - 1) as QuoteStepIndex);
    setAttemptedStep(false);
    setTouched(new Set());
    setErrors({});
  }

  function editStep(target: 0 | 1 | 2) {
    setStep(target);
    setAttemptedStep(false);
    setTouched(new Set());
    setErrors({});
  }

  function changeProduct<K extends keyof QuoteRequestDraftInput["product"]>(
    field: K,
    value: QuoteRequestDraftInput["product"][K],
  ) {
    updateDraft({ ...draft, product: { ...draft.product, [field]: value } });
  }

  function changeCountry(value: SourcingCountry | undefined) {
    updateDraft({ ...draft, requirements: { ...draft.requirements, sourceCountry: value } });
  }

  function changeBudget(value: number | undefined) {
    updateDraft({ ...draft, requirements: { ...draft.requirements, budget: value } });
  }

  function changeTimeline(value: Timeline | undefined) {
    updateDraft({ ...draft, requirements: { ...draft.requirements, timeline: value } });
  }

  function changeAdditionalRequirements(value: string) {
    updateDraft({ ...draft, requirements: { ...draft.requirements, additionalRequirements: value } });
  }

  function changeContact<K extends keyof QuoteRequestDraftInput["contact"]>(
    field: K,
    value: QuoteRequestDraftInput["contact"][K],
  ) {
    updateDraft({ ...draft, contact: { ...draft.contact, [field]: value } });
  }

  function changeMethod(method: PreferredContactMethod) {
    const nextDraft = { ...draft, contact: { ...draft.contact, preferredContactMethod: method } };
    setMethodChosen(true);
    setDraft(nextDraft);
    if (attemptedStep) setErrors(validateStep(nextDraft, step, true).errors);
  }

  const currentStepIsValid = validateStep(draft, step, methodChosen).success;
  const nextDisabled = attemptedStep && !currentStepIsValid;

  return (
    <section aria-labelledby="request-title" className="py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <p className="eyebrow">Product sourcing request</p>
            <Heading as="h1" className="mt-2 text-3xl sm:text-4xl" id="request-title">Request a Quote</Heading>
            <p className="body-copy mt-3 !text-base">Tell us what you need from China, Dubai or Uganda.</p>
          </div>

          <Card className="rounded-panel px-4 py-5 sm:px-8 sm:py-8">
            <QuoteProgress currentStep={step} />
            <form className="mt-6" noValidate onSubmit={submit} ref={formRef}>
              <div aria-labelledby="quote-step-heading">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-3xl" id="quote-step-heading" ref={headingRef} tabIndex={-1}>
                  {stepHeadings[step]}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">{stepDescriptions[step]}</p>
              </div>

              <div className="mt-6">
                {step === 0 ? (
                  <ProductStep
                    errors={errors}

                    onBlur={blurField}
                    onChange={changeProduct}
                    product={draft.product}
                    visible={isVisible}
                  />
                ) : null}
                {step === 1 ? (
                  <RequirementsStep
                    errors={errors}
                    onAdditionalRequirements={changeAdditionalRequirements}
                    onBlur={blurField}
                    onBudget={changeBudget}
                    onCountry={changeCountry}
                    onTimeline={changeTimeline}
                    requirements={draft.requirements}
                    visible={isVisible}
                  />
                ) : null}
                {step === 2 ? (
                  <ContactStep
                    contact={draft.contact}
                    errors={errors}
                    methodChosen={methodChosen}
                    onBlur={blurField}
                    onEmail={(value) => changeContact("email", value)}
                    onMethod={changeMethod}
                    onName={(value) => changeContact("name", value)}
                    onPhone={(value) => changeContact("phone", value)}
                    visible={isVisible}
                  />
                ) : null}
                {step === 3 ? <ReviewStep draft={draft} images={images} onEdit={editStep} /> : null}
              </div>

              <div className={step === 0 ? "mt-5" : "hidden"} hidden={step !== 0}>
                <ImagePicker
                  error={imageError || undefined}
                  images={images}
                  onAdd={(added) => setImages((existing) => [...existing, ...added])}
                  onError={setImageError}
                  onRemove={(id) => {
                    setImages((existing) => existing.filter((image) => image.id !== id));
                    setImageError("");
                  }}
                />
              </div>

              <div className="sticky bottom-0 z-10 -mx-4 mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-6 sm:backdrop-blur-none">
                <div>
                  {step === 0 ? (
                    <Link className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-semibold text-muted hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="/">
                      Back to home
                    </Link>
                  ) : <Button onClick={goBack} type="button" variant="secondary">Back</Button>}
                </div>
                <Button disabled={step === 3 ? isSubmitting : nextDisabled} type="submit">
                  {step === 3 ? (isSubmitting ? "Submitting…" : "Submit Request") : "Continue"}
                </Button>
              </div>
              {step === 3 && submitError ? <p className="mt-3 text-center text-sm text-error" role="alert">{submitError}</p> : null}
            </form>
          </Card>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-muted">You can review and change your details before submitting.</p>
        </div>
      </Container>
    </section>
  );
}
