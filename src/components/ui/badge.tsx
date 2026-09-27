import type { HTMLAttributes } from "react";

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-primary/10 px-2 py-1 text-xs font-medium text-primary ${className}`}
      {...props}
    />
  );
}