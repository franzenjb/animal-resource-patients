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
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
        Find Local Help
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink-deep sm:text-4xl">
        Resource Directory
      </h1>
      <p className="mt-3 max-w-2xl text-ink">
        Filter by what you need and where you are. Each listing links to phone,
        email, and websites so you can reach out directly.
      </p>

      <div className="mt-6 rounded-2xl border border-edge-strong bg-butter px-4 py-3 text-sm text-ink">
        <strong className="font-bold text-ink-deep">Good to know:</strong> these
        Maine listings are compiled from public sources and are being expanded.
        Always confirm hours and eligibility directly with each organization
        before referring a patient.
      </div>

      <div className="mt-8">
        <ResourceDirectory initialCategory={initial} />
      </div>
    </div>
  );
}
