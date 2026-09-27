import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  aside?: { eyebrow: string; title: string; items: readonly string[] };
};

export function PageHero({ eyebrow, title, description, breadcrumb, secondaryAction, aside }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="hero-section">
      <Container>
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
              <li><Link className="underline-offset-4 hover:text-primary hover:underline" href={breadcrumb.href}>{breadcrumb.label}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">{title}</li>
            </ol>
          </nav>
        ) : null}
        <div className={aside ? "grid min-w-0 items-center gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,.7fr)]" : "max-w-3xl"}>
          <div className="grid min-w-0 justify-items-start gap-5">
            <p className="eyebrow">{eyebrow}</p>
            <Heading as="h1" className="display-title max-w-3xl" id="page-title">{title}</Heading>
            <p className="body-copy m-0">{description}</p>
            <div className="hero-actions">
              <ButtonLink href="/request">Request a Quote <span aria-hidden="true">&#8599;</span></ButtonLink>
              {secondaryAction ? <ButtonLink href={secondaryAction.href} variant="secondary">{secondaryAction.label}</ButtonLink> : null}
            </div>
          </div>
          {aside ? (
            <aside aria-label={aside.title} className="rounded-panel border border-border bg-surface p-6 shadow-soft sm:p-8">
              <p className="eyebrow">{aside.eyebrow}</p>
              <Heading as="h2" className="mt-3 text-xl sm:text-2xl">{aside.title}</Heading>
              <ul className="mt-5 grid list-none gap-3 p-0">
                {aside.items.map((item) => (
                  <li className="flex items-start gap-3 text-sm leading-6 text-muted" key={item}>
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
