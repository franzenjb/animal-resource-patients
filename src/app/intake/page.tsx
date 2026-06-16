import type { Metadata } from "next";
import { IntakeWorkflow } from "@/components/IntakeWorkflow";

export const metadata: Metadata = {
  title: "Intake Workflow",
  description:
    "A step-by-step checklist for talking with a hospitalized patient about the animals they leave at home.",
};

export default function IntakePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        For Intake Staff
      </p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-ink-strong sm:text-4xl">
        Intake Workflow
      </h1>
      <p className="mt-3 text-ink">
        Work through these steps with the patient. Check items off as you go, and
        print the checklist for the chart if you need a paper copy.
      </p>
      <div className="mt-8">
        <IntakeWorkflow />
      </div>
    </div>
  );
}
