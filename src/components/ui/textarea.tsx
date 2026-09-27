import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={"min-h-32 w-full resize-y rounded-control border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 " + className} {...props} />;
}
