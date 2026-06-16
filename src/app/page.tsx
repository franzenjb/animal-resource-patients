import Link from "next/link";
import { CATEGORY_META, ResourceCategory } from "@/data/resources";

const STEPS = [
  {
    n: "1",
    title: "Intake Conversation",
    body: "Ask whether the patient has an animal at home, who is caring for it, and whether there is a power of attorney. Capture consent to contact people who can help.",
  },
  {
    n: "2",
    title: "Arrange Care Or Relinquish",
    body: "If the animal needs help, connect with kennels, shelters, or Animal Control Officers for transport — or use a consent form to relinquish care safely.",
  },
  {
    n: "3",
    title: "Food & Ongoing Support",
    body: "Point caretakers to pet food pantries and shelters with extra supply. Connect large-animal and livestock owners with the right help.",
  },
];

const categoryOrder: ResourceCategory[] = [
  "kennel",
  "food-pantry",
  "humane-aco",
  "large-animal",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-edge bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            A Resource For Patients, Families & Staff
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-ink-strong sm:text-5xl">
            When someone is in the hospital, their animals should be safe too.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink">
            This tool gathers care resources and information about a patient&apos;s
            animals while they are in the hospital. It helps alleviate stress on
            patients and makes sure everyone involved — people and animals — is
            cared for, by connecting to local resources across Maine.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/intake"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Start The Intake Workflow
            </Link>
            <Link
              href="/resources"
              className="rounded-lg border border-edge bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Browse The Resource Directory
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-ink-strong">
          How It Works
        </h2>
        <p className="mt-2 text-muted">
          Three Steps, From First Conversation To Ongoing Support
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-edge bg-surface p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft font-serif text-lg font-bold text-accent">
                {s.n}
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-ink-strong">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resource categories */}
      <section className="border-t border-edge bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-ink-strong">
            Find Local Help
          </h2>
          <p className="mt-2 text-muted">Resources Organized By What You Need</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {categoryOrder.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <Link
                  key={cat}
                  href={`/resources?category=${cat}`}
                  className="group rounded-xl border border-edge bg-background p-6 transition-colors hover:border-accent"
                >
                  <h3 className="font-serif text-lg font-bold text-ink-strong group-hover:text-accent">
                    {meta.label}
                  </h3>
                  <p className="mt-2 text-sm text-ink">{meta.blurb}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent">
                    View →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
