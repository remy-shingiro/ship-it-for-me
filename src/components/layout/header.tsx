import Link from "next/link";
import { navigationLinks } from "@/features/marketing/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteName } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { NavigationIcon } from "./navigation-icon";

export function Header() {
  return (
    <header className="site-header">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link aria-label={siteName + " home"} className="brand-lockup" href="/">
          <span aria-hidden="true" className="brand-mark">
            <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
              <path d="M4 16h5l3-8h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              <circle cx="4" cy="16" r="1.5" fill="currentColor" />
              <circle cx="20" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <span className="brand-name">{siteName}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigationLinks.map(({ label, href }) => (
            <Link className="nav-link" href={href} key={href}><NavigationIcon href={href} />{label}</Link>
          ))}
          <ButtonLink className="ml-2" href="/request">Request a Quote</ButtonLink>
        </nav>
        <MobileNav />
      </Container>
    </header>
  );
}
