import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteName } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-4 text-sm text-gray-600">
        <span>{siteName}</span>
        <Link className="hover:text-primary" href="/request">
          Request a Quote
        </Link>
      </Container>
    </footer>
  );
}