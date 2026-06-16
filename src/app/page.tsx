import Link from "next/link";
import { CategoryGraphic } from "@/components/CategoryGraphic";
import { PetFamilyMosaic } from "@/components/PetFamilyMosaic";
import { Photo } from "@/components/Photo";
import {
  CATEGORY_META,
  ResourceCategory,
  resources,
} from "@/data/resources";

const STEPS = [
  {
    n: "1",
    tone: "bg-peach",
    title: "Intake Conversation",
    body: "We ask whether the patient has an animal at home, who is caring for it, and whether there is a power of attorney — then capture consent to reach the people who can help.",
  },
  {
    n: "2",
    tone: "bg-sage-soft",
    title: "Arrange Care Or Relinquish",
    body: "If the animal needs help, we connect with kennels, shelters, or Animal Control Officers for transport — or use a consent form to relinquish care safely and humanely.",
  },
  {
    n: "3",
    tone: "bg-butter",
    title: "Food & Ongoing Support",
    body: "We point caretakers to pet food pantries with extra supply, and connect large-animal and livestock owners with the right help.",
  },
];

const categoryOrder: ResourceCategory[] = [
  "kennel",
  "food-pantry",
  "humane-aco",
  "large-animal",
];

const WAYS_TO_HELP = [
  {
    title: "Volunteer",
    body: "Help with outreach, transport, temporary care coordination, resource verification, or getting new partners listed.",
  },
  {
    title: "Donate",
    body: "Pet food, supplies, crates, and financial support can help keep animals safe while their people are getting care.",
  },
  {
    title: "Suggest An Edit",
    body: "Send missing resources, corrections, better contact details, or ideas for what families and staff need next.",
  },
  {
    title: "Nonprofit Status",
    body: "We are considering 501(c)(3) nonprofit status. Until that is confirmed, donations should not be assumed to be tax-deductible.",
  },
];

export default function Home() {
  const count = (c: ResourceCategory) =>
    resources.filter((r) => r.category === c).length;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
              A Resource For Patients, Families &amp; Staff
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] text-ink-deep sm:text-5xl">
              When someone is in the hospital, their animals should be safe too.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">
              This tool gathers care resources and information about a
              patient&apos;s animals while they are in the hospital. It helps
              alleviate stress on patients and makes sure everyone involved —
              people and animals — is cared for, by connecting to local
              resources across Maine.
            </p>
            <p className="mt-4 max-w-xl text-sm font-bold uppercase tracking-wide text-muted">
              Dogs, cats, fish, birds, rabbits, turtles, and other animals
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/intake"
                className="rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-on-accent shadow-sm transition-colors hover:bg-accent-hover"
              >
                Start The Intake Workflow
              </Link>
              <Link
                href="/resources"
                className="rounded-full border-2 border-edge-strong bg-surface px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent-text"
              >
                Browse The Resource Directory
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
              <PetFamilyMosaic />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink-deep">
            How It Works
          </h2>
          <p className="mt-2 text-muted">
            Three Steps, From The First Conversation To Ongoing Support
          </p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-3xl border border-edge bg-surface p-7 shadow-[var(--shadow)]"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl ${s.tone} font-display text-xl font-bold text-ink-deep`}
              >
                {s.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink-deep">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Find local help */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
            Maine Launch, Built To Grow
          </p>
          <h2 className="font-display text-3xl font-bold text-ink-deep">
            Find Local Help
          </h2>
          <p className="mt-2 text-muted">
            Maine is the first directory. The structure is ready for more
            states, partners, and resource types as the work expands.
          </p>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {categoryOrder.map((cat) => {
            const meta = CATEGORY_META[cat];
            const n = count(cat);
            return (
              <Link
                key={cat}
                href={`/resources?category=${cat}`}
                className="group flex items-center gap-5 rounded-3xl border border-edge bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
              >
                <CategoryGraphic category={cat} className="h-24 w-24 shrink-0 p-4" />
                <div>
                  <h3 className="font-display text-xl font-bold text-ink-deep group-hover:text-accent-text">
                    {meta.label}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-ink">
                    {meta.blurb}
                  </p>
                  <span className="mt-2 inline-block text-sm font-bold text-accent-text">
                    {n > 0 ? `${n} listed` : "Coming soon"} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ways to help */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
              Build This With Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-deep">
              Volunteers, donations, and corrections are welcome.
            </h2>
            <p className="mt-3 text-ink">
              This resource gets stronger when local people help keep it
              current. If you know a shelter, pantry, kennel, transport option,
              or animal-care partner that should be listed, send it in.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {WAYS_TO_HELP.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-edge bg-surface p-5"
              >
                <h3 className="font-display text-lg font-bold text-ink-deep">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance band */}
      <section className="mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-sage-deep p-8 text-on-dark sm:p-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-dark/80">
                Why It Matters
              </p>
              <p className="mt-3 font-display text-2xl font-medium italic leading-snug text-on-dark sm:text-3xl">
                “No one should have to choose between getting care and knowing
                their best friend is okay.”
              </p>
              <p className="mt-4 max-w-xl text-on-dark/85">
                Worry about a pet keeps people from seeking treatment, staying
                admitted, or healing well. When we take that worry off their
                shoulders, patients can focus on getting better — and their
                animals stay safe and fed until they&apos;re home.
              </p>
            </div>
            <div className="h-48 w-full lg:h-full">
              <Photo slug="comfort" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-ink-deep">
          Start With A Simple Conversation
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink">
          Open the intake workflow at the bedside, or jump straight to local
          resources near the patient&apos;s home.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/intake"
            className="rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-on-accent hover:bg-accent-hover"
          >
            Open Intake Workflow
          </Link>
          <Link
            href="/resources"
            className="rounded-full border-2 border-edge-strong bg-surface px-6 py-3.5 text-sm font-bold text-ink hover:border-accent hover:text-accent-text"
          >
            Find Resources
          </Link>
        </div>
      </section>
    </>
  );
}
