"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { id: string; label: string; hint?: string };
type Step = {
  n: string;
  tone: string;
  title: string;
  summary: string;
  items: Item[];
  link?: { href: string; label: string };
};

const STEPS: Step[] = [
  {
    n: "1",
    tone: "bg-peach",
    title: "Intake Conversation",
    summary:
      "On intake, have a gentle conversation with the patient about any animals at home.",
    items: [
      { id: "s1-has", label: "Do you have an animal at home?" },
      {
        id: "s1-care",
        label: "Is a family member or caretaker looking after it?",
      },
      {
        id: "s1-poa",
        label: "Is there a power of attorney (POA)?",
        hint: "In case the patient is unable to make a decision.",
      },
      {
        id: "s1-consent",
        label: "Obtain consent to contact (phone numbers + consent form).",
        hint: "If they have no help and animals are at home, ask whether they will sign a consent for us to find help — e.g. contacting an Animal Control Officer to transport the animal to a kennel, or anyone the patient consents to.",
      },
    ],
  },
  {
    n: "2",
    tone: "bg-sage-soft",
    title: "Arrange Care Or Relinquish",
    summary:
      "If resources are needed, use the directory. If the patient chooses to relinquish, use a consent form.",
    items: [
      {
        id: "s2-kennel",
        label: "Identify a kennel or shelter that can take the animal.",
      },
      {
        id: "s2-transport",
        label:
          "Arrange transport with an Animal Control Officer or consented contact.",
      },
      {
        id: "s2-relinquish",
        label: "If relinquishing care, complete the relinquishment consent form.",
        hint: "A signed form removes barriers for animal control and police to take possession and ensures the animal is humanely transported to a humane society (or veterinarian if needed).",
      },
    ],
    link: {
      href: "/resources?category=humane-aco",
      label: "Open Humane Societies & ACOs",
    },
  },
  {
    n: "3",
    tone: "bg-butter",
    title: "Food & Ongoing Support",
    summary: "Connect caretakers with food and the right help for any animal.",
    items: [
      {
        id: "s3-food",
        label: "Share pet food pantries with extra supply for people in need.",
      },
      {
        id: "s3-large",
        label: "For large animals / livestock, refer to the large-animal resource.",
        hint: "The binder references a Windham, Maine society that helps with large animals at all levels (see the Large Animals & Livestock category).",
      },
      {
        id: "s3-forms",
        label: "Provide any consent forms the patient needs.",
      },
    ],
    link: {
      href: "/resources?category=food-pantry",
      label: "Open Pet Food Pantries",
    },
  },
];

export function IntakeWorkflow() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  const total = STEPS.reduce((a, s) => a + s.items.length, 0);
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <div>
      <div className="no-print sticky top-[64px] z-30 -mx-4 mb-8 border border-edge bg-cream/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-ink">
            Progress:{" "}
            <span className="text-accent-text">
              {completed}/{total}
            </span>{" "}
            steps checked
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDone({})}
              className="rounded-full border border-edge-strong px-4 py-1.5 text-sm font-bold text-ink hover:bg-peach"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-on-accent hover:bg-accent-hover"
            >
              Print
            </button>
          </div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-edge">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {STEPS.map((step) => (
          <section
            key={step.n}
            className="rounded-3xl border border-edge bg-surface p-7 shadow-[var(--shadow)]"
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid h-11 w-11 place-items-center rounded-2xl ${step.tone} font-display text-lg font-bold text-ink-deep`}
              >
                {step.n}
              </span>
              <h2 className="font-display text-xl font-bold text-ink-deep">
                {step.title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted">{step.summary}</p>

            <ul className="mt-4 space-y-3">
              {step.items.map((item) => (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={!!done[item.id]}
                      onChange={() => toggle(item.id)}
                      className="mt-1 h-5 w-5 accent-[var(--accent)]"
                    />
                    <span>
                      <span
                        className={`text-sm font-bold ${
                          done[item.id]
                            ? "text-muted line-through"
                            : "text-ink-deep"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.hint && (
                        <span className="mt-0.5 block text-sm text-muted">
                          {item.hint}
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            {step.link && (
              <Link
                href={step.link.href}
                className="no-print mt-5 inline-block text-sm font-bold text-accent-text underline-offset-2 hover:underline"
              >
                {step.link.label} →
              </Link>
            )}
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-sage-deep p-7 text-on-dark">
        <h3 className="font-display text-lg font-bold text-on-dark">
          A Goal For This Program
        </h3>
        <ul className="mt-3 space-y-1.5 text-sm text-on-dark/90">
          <li>
            • Establish a fund so people who meet the criteria can access help.
          </li>
          <li>
            • Build a volunteer network for fundraising, transport, and food.
          </li>
        </ul>
      </div>
    </div>
  );
}
