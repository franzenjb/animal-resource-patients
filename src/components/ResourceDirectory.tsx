"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_META,
  MAINE_COUNTIES,
  Resource,
  ResourceCategory,
  resources,
} from "@/data/resources";
import { ResourceCard } from "@/components/ResourceCard";

const CATS: { value: ResourceCategory | "all"; label: string }[] = [
  { value: "all", label: "All Resources" },
  { value: "kennel", label: CATEGORY_META.kennel.label },
  { value: "food-pantry", label: CATEGORY_META["food-pantry"].label },
  { value: "humane-aco", label: CATEGORY_META["humane-aco"].label },
  { value: "large-animal", label: CATEGORY_META["large-animal"].label },
];

export function ResourceDirectory({
  initialCategory = "all",
}: {
  initialCategory?: ResourceCategory | "all";
}) {
  const [category, setCategory] = useState<ResourceCategory | "all">(
    initialCategory,
  );
  const [county, setCounty] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r: Resource) => {
      if (category !== "all" && r.category !== category) return false;
      if (county !== "all" && r.county !== county) return false;
      if (q) {
        const hay = [r.name, r.town, r.county, r.address, ...(r.notes ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, county, query]);

  return (
    <div>
      {/* Filters */}
      <div className="rounded-3xl border border-edge bg-surface p-5 shadow-[var(--shadow)]">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                category === c.value
                  ? "bg-accent text-on-accent"
                  : "bg-cream text-ink hover:bg-peach"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
              Filter By County
            </span>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm font-semibold text-ink"
            >
              <option value="all">All Maine Counties</option>
              {MAINE_COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c} County
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Town, organization, or keyword…"
              className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink"
            />
          </label>
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-muted">
        Showing {filtered.length}{" "}
        {filtered.length === 1 ? "resource" : "resources"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {filtered.map((r) => (
            <ResourceCard key={r.id} r={r} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-edge-strong bg-surface p-10 text-center">
          <p className="font-display text-lg font-bold text-ink-deep">
            No Matches Yet
          </p>
          <p className="mt-2 text-sm text-muted">
            Try clearing the filters, or check back as more Maine resources are
            added.
          </p>
        </div>
      )}
    </div>
  );
}
