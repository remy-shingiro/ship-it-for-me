import type { HTMLAttributes } from "react";
import { Container } from "./container";

export function Section({ className = "", children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-12 sm:py-16 ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}