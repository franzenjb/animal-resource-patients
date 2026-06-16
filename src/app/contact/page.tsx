import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PetFamilyMosaic } from "@/components/PetFamilyMosaic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Patient Animal Resource to volunteer, donate, suggest edits, add resources, or ask questions.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.78fr]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
            Contact Us
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-deep sm:text-4xl">
            Help build the resource network.
          </h1>
          <p className="mt-3 text-ink">
            Send corrections, new resources, volunteer interest, donation
            questions, partnership ideas, or patient and family questions.
          </p>
          <p className="mt-3 text-sm font-semibold text-muted">
            For now, this form opens your email app addressed to jbf@jbf.com.
          </p>
        </div>
        <div className="h-60 sm:h-72 lg:h-80">
          <PetFamilyMosaic />
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <ContactForm />

        <aside className="rounded-3xl border border-edge bg-surface p-6 shadow-[var(--shadow)]">
          <h2 className="font-display text-xl font-bold text-ink-deep">
            What to send
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink">
            <li>• A resource that should be listed or corrected.</li>
            <li>• Interest in volunteering for outreach, transport, or calls.</li>
            <li>• Donation questions for food, supplies, crates, or funds.</li>
            <li>• Suggestions for making the site clearer or more useful.</li>
            <li>
              • Notes on future nonprofit status, partnerships, or Spanish
              translation.
            </li>
          </ul>
          <div className="mt-6 rounded-2xl bg-butter px-4 py-3 text-sm text-ink">
            We are considering 501(c)(3) nonprofit status. Until that is
            confirmed, donations should not be assumed to be tax-deductible.
          </div>
        </aside>
      </div>
    </div>
  );
}
