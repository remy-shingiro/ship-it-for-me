import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteName } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

const links = [
  ["How It Works", "/how-it-works"],
  ["What We Source", "/services"],
  ["Locations", "/locations"],
  ["About", "/about"],
  ["FAQ", "/faq"],
] as const;

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link className="shrink-0 font-semibold text-foreground" href="/">
          {siteName}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 sm:flex">
          {links.map(([label, href]) => (
            <Link className="text-sm text-foreground hover:text-primary" href={href} key={href}>
              {label}
            </Link>
          ))}
          <Link className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90" href="/request">
            Request a Quote
          </Link>
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}