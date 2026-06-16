import type { Metadata } from "next";
import { IntakeWorkflow } from "@/components/IntakeWorkflow";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Intake Workflow",
  description:
    "A step-by-step checklist for talking with a hospitalized patient about the animals they leave at home.",
};

export default function IntakePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.78fr]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
            For Intake Staff
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-deep sm:text-4xl">
            Intake Workflow
          </h1>
          <p className="mt-3 text-ink">
            Work through these steps with the patient. Check items off as you go,
            and print the checklist for the chart if you need a paper copy.
          </p>
        </div>
        <div className="h-52 sm:h-64 lg:h-72">
          <Photo slug="comfort" />
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-3xl">
        <IntakeWorkflow />
      </div>
    </div>
  );
}
