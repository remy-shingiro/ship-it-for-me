"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/features/marketing/content";
import { ButtonLink } from "@/components/ui/button-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav lg:hidden">
      <button aria-controls="mobile-navigation-panel" aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-nav-toggle" onClick={() => setOpen((current) => !current)}
        ref={toggleRef} type="button">
        <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
          {open
            ? <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />}
        </svg>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <nav aria-hidden={!open} aria-label="Mobile navigation"
        className={open ? "mobile-nav-panel mobile-nav-panel--open" : "mobile-nav-panel"}
        id="mobile-navigation-panel">
        {navigationLinks.map(({ label, href }) => (
          <Link aria-current={pathname === href ? "page" : undefined} className="mobile-nav-link"
            href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <ButtonLink className="mt-2 w-full" href="/request" onClick={() => setOpen(false)}>Request a Quote</ButtonLink>
      </nav>
    </div>
  );
}
