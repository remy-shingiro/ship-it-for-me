import Link from "next/link";

const links = [
  ["How It Works", "/how-it-works"],
  ["What We Source", "/services"],
  ["Locations", "/locations"],
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["Request a Quote", "/request"],
] as const;

export function MobileNav() {
  return (
    <details className="relative sm:hidden">
      <summary className="cursor-pointer list-none rounded-md border border-border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-primary">
        Menu
      </summary>
      <nav aria-label="Mobile navigation" className="absolute right-0 z-10 mt-2 grid min-w-52 gap-1 rounded-md border border-border bg-white p-2 shadow-lg">
        {links.map(([label, href]) => (
          <Link className="rounded px-3 py-2 text-sm hover:bg-gray-50" href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}