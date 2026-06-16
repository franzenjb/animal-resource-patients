import type { Metadata } from "next";
import {
  STATUTE_SECTIONS,
  STATUTE_SOURCE,
  STATUTE_TITLE,
} from "@/data/statute";

export const metadata: Metadata = {
  title: "Legal Reference",
  description:
    "Maine animal-welfare statute (Title 17, Chapter 42, Subchapter 2: Possession of Animals) — reference summaries.",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-legal">
        For Reference
      </p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-ink-strong sm:text-4xl">
        Legal Reference
      </h1>
      <p className="mt-3 text-ink">{STATUTE_TITLE}.</p>

      <div className="mt-6 rounded-xl border border-legal/30 bg-legal-soft px-4 py-3 text-sm text-ink">
        <strong className="font-semibold text-legal">Reference Only:</strong>{" "}
        these are plain-language summaries of the statute from the binder. For
        the authoritative, current text, see the{" "}
        <a
          href={STATUTE_SOURCE}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-legal hover:underline"
        >
          Maine Legislature
        </a>
        . This is not legal advice.
      </div>

      <div className="mt-8 space-y-5">
        {STATUTE_SECTIONS.map((s) => (
          <section
            key={s.id}
            className="rounded-xl border border-edge bg-surface p-6"
          >
            <h2 className="font-serif text-lg font-bold text-ink-strong">
              {s.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
