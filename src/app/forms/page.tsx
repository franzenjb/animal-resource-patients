import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consent Forms",
  description:
    "Consent to contact and relinquishment-of-care forms used in the patient animal resource workflow.",
};

const FORMS = [
  {
    title: "Consent To Contact",
    when: "Step 1 — Intake",
    purpose:
      "Lets staff reach out to caretakers, Animal Control Officers, kennels, or shelters on the patient's behalf to arrange care for an animal at home.",
    captures: [
      "Patient name and the animal(s) at home",
      "People the patient consents to have us contact (names + phone numbers)",
      "Whether a power of attorney exists",
      "Signature and date",
    ],
  },
  {
    title: "Relinquishment Of Care",
    when: "Step 2 — Relinquish",
    purpose:
      "Signs over the patient's rights to the animal. Removes barriers for animal control and police to properly take possession and humanely transport the animal to a humane society (or a veterinarian if needed).",
    captures: [
      "Patient name and animal description",
      "Acknowledgement of relinquishing rights",
      "Receiving organization (humane society / shelter)",
      "Signature, witness, and date",
    ],
  },
];

export default function FormsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Paperwork
      </p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-ink-strong sm:text-4xl">
        Consent Forms
      </h1>
      <p className="mt-3 text-ink">
        Two forms support the workflow. The signable versions will be attached
        here for download and printing.
      </p>

      <div className="mt-8 space-y-6">
        {FORMS.map((f) => (
          <section
            key={f.title}
            className="rounded-xl border border-edge bg-surface p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {f.when}
            </p>
            <h2 className="mt-1 font-serif text-xl font-bold text-ink-strong">
              {f.title}
            </h2>
            <p className="mt-2 text-sm text-ink">{f.purpose}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
              What It Captures
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink">
              {f.captures.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    •
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <span className="mt-5 inline-block rounded-md border border-dashed border-edge px-3 py-2 text-sm font-semibold text-muted">
              Downloadable form coming soon
            </span>
          </section>
        ))}
      </div>
    </div>
  );
}
