import type { QuoteStepIndex } from "./quote-validation";

const steps = ["Product", "Requirements", "Contact", "Review"] as const;

export function QuoteProgress({ currentStep }: { currentStep: QuoteStepIndex }) {
  return (
    <nav aria-label="Quote request progress" className="border-b border-border pb-5">
      <div className="sm:hidden">
        <div aria-live="polite" className="mb-2 flex items-baseline justify-between gap-3">
          <p className="m-0 text-sm font-semibold text-foreground">Step {currentStep + 1} of 4</p>
          <p className="m-0 text-sm text-muted">{steps[currentStep]}</p>
        </div>
        <progress aria-label={`Step ${currentStep + 1} of 4`} className="h-2 w-full accent-primary" max={4} value={currentStep + 1} />
      </div>
      <ol className="hidden list-none items-center justify-between gap-2 p-0 sm:flex">
        {steps.map((label, index) => {
          const active = index === currentStep;
          const complete = index < currentStep;
          return (
            <li aria-current={active ? "step" : undefined} className={`flex min-w-0 items-center gap-2 text-sm font-medium ${active ? "text-primary" : "text-muted"}`} key={label}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold ${active ? "border-primary bg-primary text-white" : complete ? "border-primary-soft bg-primary-soft text-primary" : "border-border bg-surface text-muted"}`}>
                {complete ? <><span aria-hidden="true">✓</span><span className="sr-only">Complete</span></> : `0${index + 1}`}
              </span>
              <span className="whitespace-nowrap">{label}</span>
              {index < steps.length - 1 ? <span aria-hidden="true" className="ml-1 h-px min-w-3 flex-1 bg-border-strong" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
