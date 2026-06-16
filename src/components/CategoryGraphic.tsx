import type { ReactNode } from "react";
import { ResourceCategory } from "@/data/resources";

const TONE: Record<ResourceCategory, string> = {
  kennel: "bg-peach text-accent-text border-peach",
  "food-pantry": "bg-sage-soft text-sage-text border-sage-soft",
  "humane-aco": "bg-butter text-ink-deep border-butter",
  "large-animal": "bg-peach text-ink-deep border-peach",
};

function KennelGraphic() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <path
        d="M18 49 48 24l30 25v25a5 5 0 0 1-5 5H23a5 5 0 0 1-5-5V49Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M17 49 48 23l31 26M25 78V48l23-19 23 19v30"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M36 78V61c0-7 5-12 12-12s12 5 12 12v17"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <circle cx="37" cy="38" r="3.5" fill="currentColor" />
      <circle cx="59" cy="38" r="3.5" fill="currentColor" />
    </svg>
  );
}

function PantryGraphic() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <path
        d="M21 57h54l-5 18a7 7 0 0 1-7 5H33a7 7 0 0 1-7-5l-5-18Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M20 57h56l-6 18a7 7 0 0 1-7 5H33a7 7 0 0 1-7-5l-6-18Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M35 44c2-7 8-11 13-11s11 4 13 11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <circle cx="37" cy="50" r="3" fill="currentColor" />
      <circle cx="48" cy="48" r="3" fill="currentColor" />
      <circle cx="59" cy="50" r="3" fill="currentColor" />
      <path
        d="M48 26c-3-5-11-4-11 3 0 7 11 12 11 12s11-5 11-12c0-7-8-8-11-3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AcoGraphic() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <path
        d="M48 15 72 25v20c0 18-10 30-24 38-14-8-24-20-24-38V25l24-10Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M48 15 72 25v20c0 18-10 30-24 38-14-8-24-20-24-38V25l24-10Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M36 52c0-7 5-12 12-12s12 5 12 12v14H36V52Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <circle cx="38" cy="36" r="4" fill="currentColor" />
      <circle cx="48" cy="32" r="4" fill="currentColor" />
      <circle cx="58" cy="36" r="4" fill="currentColor" />
    </svg>
  );
}

function LargeAnimalGraphic() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <path
        d="M20 76V45l28-23 28 23v31"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M18 45 48 20l30 25M24 76V46l24-20 24 20v30"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M38 76V58h20v18M35 45h26M33 56h30"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M68 26c8 1 12 7 10 14-7 0-12-4-15-10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </svg>
  );
}

const GRAPHIC: Record<ResourceCategory, () => ReactNode> = {
  kennel: KennelGraphic,
  "food-pantry": PantryGraphic,
  "humane-aco": AcoGraphic,
  "large-animal": LargeAnimalGraphic,
};

export function CategoryGraphic({
  category,
  className = "",
}: {
  category: ResourceCategory;
  className?: string;
}) {
  const Graphic = GRAPHIC[category];

  return (
    <div
      className={`grid place-items-center overflow-hidden rounded-2xl border ${TONE[category]} ${className}`}
      aria-hidden="true"
    >
      <Graphic />
    </div>
  );
}
