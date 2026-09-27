import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & { as?: "h1" | "h2" | "h3" | "h4" };

export function Heading({ as: Tag = "h2", className = "", ...props }: HeadingProps) {
  return <Tag className={"font-semibold tracking-tight text-foreground " + className} {...props} />;
}
