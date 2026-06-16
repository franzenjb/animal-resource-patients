import type { Metadata } from "next";
import { ResourceDirectory } from "@/components/ResourceDirectory";
import { ResourceCategory } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resource Directory",
  description:
    "Kennels, pet food pantries, humane societies, Animal Control Officers, and large-animal help across Maine.",
};

const VALID: ResourceCategory[] = [
  "kennel",
  "food-pantry",
  "humane-aco",
  "large-animal",
];

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initial =
    category && VALID.includes(category as ResourceCategory)
      ? (category as ResourceCategory)
      : "all";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Find Local Help
      </p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-ink-strong sm:text-4xl">
        Resource Directory
      </h1>
      <p className="mt-3 max-w-2xl text-ink">
        Filter by what you need and where you are. Each listing links to phone,
        email, and websites so you can reach out directly.
      </p>

      <div className="mt-6 rounded-xl border border-warm/30 bg-warm-soft px-4 py-3 text-sm text-ink">
        <strong className="font-semibold text-warm">Starter Data:</strong> this
        directory currently holds a verified sample from the source binder. The
        full Maine data — Animal Control Officers (DACF), all-county pet food
        pantries, and kennels — is being imported. Always confirm hours and
        eligibility directly with each organization.
      </div>

      <div className="mt-8">
        <ResourceDirectory initialCategory={initial} />
      </div>
    </div>
  );
}
