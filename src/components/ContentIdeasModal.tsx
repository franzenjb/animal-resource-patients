"use client";

import { useEffect, useState } from "react";

type Idea = { icon: string; title: string; body: string };

const IDEAS: Idea[] = [
  {
    icon: "💛",
    title: "Pet Stories & Photos",
    body: "A gallery of patients reunited with their animals (with permission) — the emotional heart of the site.",
  },
  {
    icon: "🤝",
    title: "Foster & Volunteer Network",
    body: "Sign-up for volunteers who can foster, transport, or walk a pet while its owner is hospitalized.",
  },
  {
    icon: "💵",
    title: "Emergency Pet Care Fund",
    body: "Donate button + a simple application so people who meet the criteria can access help (the binder's stated goal).",
  },
  {
    icon: "🚪",
    title: "“Pet At Home” Alert Card",
    body: "A printable wallet card / door hanger telling first responders an animal is home alone and who to call.",
  },
  {
    icon: "📝",
    title: "My Pet Emergency Plan",
    body: "A fill-in template — vet, meds, feeding schedule, emergency contact — patients complete before they ever need it.",
  },
  {
    icon: "🏥",
    title: "24/7 Emergency Vet Directory",
    body: "Emergency animal hospitals and on-call vets by county, for urgent situations.",
  },
  {
    icon: "✂️",
    title: "Low-Cost Clinics",
    body: "Spay/neuter, vaccination, and low-cost veterinary clinics across Maine.",
  },
  {
    icon: "🚗",
    title: "Pet Transportation Help",
    body: "Who can actually move an animal — volunteers, ACOs, and services — when the owner can't.",
  },
  {
    icon: "🌎",
    title: "Spanish & Accessible Version",
    body: "Translation and large-text / screen-reader-friendly mode so every family can use it.",
  },
  {
    icon: "❓",
    title: "Family FAQ",
    body: "Plain answers: Who pays? How long can boarding last? What if there's no caretaker?",
  },
  {
    icon: "📋",
    title: "Staff Quick-Reference",
    body: "A one-page intake script and downloadable, signable consent forms for bedside use.",
  },
  {
    icon: "🕊️",
    title: "Hospice & End-Of-Life Support",
    body: "Compassionate options for a patient's pet when the patient is in hospice or passes.",
  },
  {
    icon: "📦",
    title: "Supply Drives",
    body: "How the community can donate food, crates, and supplies — and where they go.",
  },
  {
    icon: "➕",
    title: "Get Listed (Self-Submit)",
    body: "A form so shelters, pantries, and kennels can add or update their own listing.",
  },
  {
    icon: "📍",
    title: "Map View",
    body: "An interactive Maine map of every resource, filterable by what you need and where you are.",
  },
];

const SEEN_KEY = "par-ideas-seen-v1";

export function ContentIdeasModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(SEEN_KEY)) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {}
  };

  return (
    <>
      {/* Floating launcher — soft, friendly, always reachable */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="no-print fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-on-accent shadow-lg transition-transform hover:scale-105"
        aria-haspopup="dialog"
      >
        <span aria-hidden>💡</span> Ideas To Grow This Site
      </button>

      {open && (
        <div
          className="no-print fixed inset-0 z-50 flex items-end justify-center bg-ink-deep/55 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Ideas to grow this site"
          onClick={close}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header band — accent fill, cream text (contrast contract) */}
            <div className="flex items-start justify-between gap-4 bg-accent px-6 py-5 text-on-accent">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-accent/80">
                  For The Team
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-on-accent">
                  15 Ways To Grow This Site
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 rounded-full bg-white/20 px-3 py-1.5 text-sm font-bold text-on-accent hover:bg-white/30"
              >
                Close ✕
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              <p className="text-sm text-muted">
                Ideas for content and features to add next. Pick the ones that
                fit — each can be built into its own page or section.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {IDEAS.map((idea) => (
                  <li
                    key={idea.title}
                    className="rounded-2xl border border-edge bg-surface p-4"
                  >
                    <p className="font-display text-base font-bold text-ink-deep">
                      <span aria-hidden className="mr-1.5">
                        {idea.icon}
                      </span>
                      {idea.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      {idea.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-edge bg-cream px-6 py-4">
              <button
                type="button"
                onClick={close}
                className="w-full rounded-full bg-sage-deep px-5 py-3 text-sm font-bold text-on-dark hover:opacity-95"
              >
                Got It — Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
