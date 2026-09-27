import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground outline-none placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      {...props}
    />
  );
}