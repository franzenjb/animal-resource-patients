import type { Metadata } from "next";
import { PetFamilyMosaic } from "@/components/PetFamilyMosaic";
import { ResourceDirectory } from "@/components/ResourceDirectory";
import { ResourceCategory } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resource Directory",
  description:
    "Maine kennels, pet food pantries, Animal Control Officer contacts, contracted shelters, and large-animal help.",
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
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
            Find Local Help
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-deep sm:text-4xl">
            Resource Directory
          </h1>
          <p className="mt-3 max-w-2xl text-ink">
            Maine is the launch directory. Filter by what you need and where
            you are today; the same structure can expand to more states and
            partner networks later.
          </p>
        </div>
        <div className="h-52 sm:h-64 lg:h-72">
          <PetFamilyMosaic />
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-edge-strong bg-butter px-4 py-3 text-sm text-ink">
        <strong className="font-bold text-ink-deep">Good to know:</strong> these
        Maine listings are compiled from public sources and are being expanded.
        Animal Control records show the town contact and contracted shelter
        from the state table. Always confirm hours and eligibility directly
        before referring a patient.
      </div>

      <div className="mt-8">
        <ResourceDirectory initialCategory={initial} />
      </div>
    </div>
  );
}
