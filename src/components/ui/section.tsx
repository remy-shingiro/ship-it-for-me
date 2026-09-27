import type { HTMLAttributes } from "react";
import { Container } from "./container";

export function Section({ className = "", children, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={"section-space " + className} {...props}><Container>{children}</Container></section>;
}
