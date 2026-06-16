import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.76fr]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
            For Reference
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-deep sm:text-4xl">
            Legal Reference
          </h1>
          <p className="mt-3 text-ink">{STATUTE_TITLE}.</p>
        </div>
        <div className="h-52 sm:h-64 lg:h-72">
          <Photo slug="fish" />
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-edge-strong bg-butter px-4 py-3 text-sm text-ink">
        <strong className="font-bold text-ink-deep">Reference Only:</strong>{" "}
        these are plain-language summaries of the statute from the binder. For
        the authoritative, current text, see the{" "}
        <a
          href={STATUTE_SOURCE}
          target="_blank"
          rel="noreferrer"
          className="font-bold text-accent-text hover:underline"
        >
          Maine Legislature
        </a>
        . This is not legal advice.
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-5">
        {STATUTE_SECTIONS.map((s) => (
          <section
            key={s.id}
            className="rounded-xl border border-edge bg-surface p-6"
          >
            <h2 className="font-display text-lg font-bold text-ink-deep">
              {s.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
