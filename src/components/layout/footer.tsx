import Link from "next/link";
import { locations, navigationLinks } from "@/features/marketing/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteName } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="grid content-start gap-4">
            <Link aria-label={siteName + " home"} className="brand-lockup text-background" href="/">
              <span aria-hidden="true" className="brand-mark">
                <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
                  <path d="M4 16h5l3-8h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                  <circle cx="4" cy="16" r="1.5" fill="currentColor" />
                  <circle cx="20" cy="8" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span className="brand-name">{siteName}</span>
            </Link>
            <p className="footer-description">Product sourcing support for customers in Rwanda looking to source from China, Dubai or Uganda.</p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              {navigationLinks.map(({ label, href }) => <li key={href}><Link className="footer-link" href={href}>{label}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Sourcing locations">
            <h2 className="footer-heading">Sourcing locations</h2>
            <ul className="footer-links">
              {locations.map((location) => <li key={location.href}><Link className="footer-link" href={location.href}>{location.name}</Link></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="footer-heading">Have a product in mind?</h2>
            <p className="footer-description">Tell us what you are looking for and we can review the sourcing options.</p>
            <ButtonLink className="mt-5" href="/request" variant="inverse">Request a Quote</ButtonLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteName}</span>
          <span>Product sourcing for Rwanda</span>
        </div>
      </Container>
    </footer>
  );
}
