import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "on-dark";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "border border-border bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-surface-muted",
  inverse: "bg-surface text-primary hover:bg-primary-soft",
  "on-dark": "border border-white/35 bg-transparent text-white hover:bg-white/10",
};

export function buttonClassName(variant: ButtonVariant, className = "") {
  return [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 py-3 text-sm font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  ].filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={buttonClassName(variant, className)} {...props} />;
}
