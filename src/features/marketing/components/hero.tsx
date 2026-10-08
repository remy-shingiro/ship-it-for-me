import { ButtonLink } from "@/components/ui/button-link";
import { Heading } from "@/components/ui/heading";
import { CountryFlag } from "./country-flag";

function SourcingVisual() {
  return (
    <div aria-label="Illustration of sourcing connections from China, Dubai in the United Arab Emirates, and Uganda to Rwanda" className="sourcing-visual" role="img">
      <div aria-hidden="true" className="sourcing-grid" />
      <p className="sourcing-kicker">Your request, connected</p>
      <span aria-hidden="true" className="sourcing-orbit" />
      <svg aria-hidden="true" className="sourcing-routes" fill="none" viewBox="0 0 450 460">
        <path d="M108 108C178 94 268 144 370 216" stroke="var(--accent)" strokeDasharray="5 8" strokeLinecap="round" strokeWidth="2" />
        <path d="M105 225C188 182 282 208 370 216" stroke="var(--primary)" strokeDasharray="5 8" strokeLinecap="round" strokeWidth="2" />
        <path d="M148 354C222 307 297 235 370 216" stroke="var(--border-strong)" strokeDasharray="5 8" strokeLinecap="round" strokeWidth="2" />
        <circle cx="370" cy="216" fill="var(--primary)" r="5" />
      </svg>
      <div className="route-node route-node--china"><CountryFlag country="China" /><span>China</span></div>
      <div className="route-node route-node--dubai"><CountryFlag country="United Arab Emirates" /><span>Dubai</span></div>
      <div className="route-node route-node--uganda"><CountryFlag country="Uganda" /><span>Uganda</span></div>
      <div className="route-node route-node--rwanda"><CountryFlag country="Rwanda" /><span>Rwanda</span></div>
      <div className="sourcing-caption">International sourcing, with local support</div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="home-title" className="hero-section">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Product sourcing support for customers in Rwanda</p>
          <Heading as="h1" className="display-title" id="home-title">Need a product from China, Dubai or Uganda?</Heading>
          <p className="body-copy">Tell us what you are looking for. We review your request, explore options through sourcing agents in these markets and help coordinate the next steps.</p>
          <div className="hero-actions">
            <ButtonLink href="/request">Request a Quote <span aria-hidden="true">&#8599;</span></ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary">How It Works</ButtonLink>
          </div>
          <p className="m-0 text-sm text-muted">Start with a product name, description or link.</p>
        </div>
        <SourcingVisual />
      </div>
    </section>
  );
}
