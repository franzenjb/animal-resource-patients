import Link from "next/link";
import { NAV } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-edge bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg font-bold text-ink-strong">
              Patient Animal Resource
            </p>
            <p className="mt-2 text-sm text-muted">
              Connecting hospitalized patients with care for the animals they
              leave at home — kennels, food, shelters, and large-animal help
              across Maine.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 text-ink hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-edge pt-6 text-xs text-muted">
          Resource directory is starter data compiled from public Maine sources
          and is being expanded. Always confirm hours and eligibility directly
          with each organization. Legal text is provided for reference — consult
          the{" "}
          <a
            href="https://legislature.maine.gov/statutes/17/title17ch42sec0.html"
            className="font-semibold text-accent hover:text-accent-hover"
            target="_blank"
            rel="noreferrer"
          >
            Maine Legislature
          </a>{" "}
          for the authoritative statute.
        </p>
      </div>
    </footer>
  );
}
