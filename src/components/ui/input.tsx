import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={"min-h-11 w-full rounded-control border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 " + className} {...props} />;
}
