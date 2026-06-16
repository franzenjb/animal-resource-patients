import Link from "next/link";
import { NAV } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-sage-deep text-on-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2 font-display text-xl font-bold text-on-dark">
              <span aria-hidden>🐾</span> Patient Animal Resource
            </p>
            <p className="mt-3 text-sm leading-relaxed text-on-dark/85">
              Connecting hospitalized patients with care for the animals they
              leave at home — kennels, food, shelters, and large-animal help
              across Maine. Because healing is easier when you know they&apos;re
              safe.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 font-semibold text-on-dark/90 hover:text-on-dark hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-white/20 pt-6 text-xs leading-relaxed text-on-dark/75">
          The resource directory is compiled from public Maine sources and is
          being expanded — always confirm hours and eligibility directly with
          each organization. Legal text is a plain-language reference; consult
          the{" "}
          <a
            href="https://legislature.maine.gov/statutes/17/title17ch42sec0.html"
            className="font-bold text-on-dark underline"
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
