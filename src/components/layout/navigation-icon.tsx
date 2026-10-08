import type { navigationLinks } from "@/features/marketing/content";

type NavigationHref = (typeof navigationLinks)[number]["href"];

export function NavigationIcon({ href }: { href: NavigationHref }) {
  return (
    <svg aria-hidden="true" className="nav-link-icon" fill="none" focusable="false" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      {href === "/how-it-works" && <>
        <path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8" />
      </>}
      {href === "/services" && <>
        <rect height="14" rx="2" width="20" x="2" y="7" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 12h20M10 12v2h4v-2" />
      </>}
      {href === "/locations" && <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>}
      {href === "/about" && <>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
      </>}
      {href === "/faq" && <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
      </>}
    </svg>
  );
}
