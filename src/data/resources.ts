// Resource directory data.
//
// HONESTY RULE: only entries transcribed from the source binder (the OCR'd photos)
// are marked `verified: true`. Everything else is structure waiting for the full
// online import (Maine DACF Animal Control Officers, all-county pet food pantries,
// LocalKennels.net). Do not invent contact details — import them.

export type ResourceCategory =
  | "kennel"
  | "food-pantry"
  | "humane-aco"
  | "large-animal";

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  county?: string; // Maine county
  town?: string;
  address?: string;
  phone?: string;
  phoneAfterHours?: string;
  email?: string;
  website?: string;
  hours?: string;
  /** Short human-readable notes: eligibility, services, what they cover. */
  notes?: string[];
  /** From the source binder vs. still to be imported. */
  verified?: boolean;
};

export const CATEGORY_META: Record<
  ResourceCategory,
  { label: string; blurb: string; tone: "accent" | "warm" | "ink" }
> = {
  kennel: {
    label: "Kennels & Boarding",
    blurb: "Short-term boarding while a patient is in the hospital.",
    tone: "accent",
  },
  "food-pantry": {
    label: "Pet Food Pantries",
    blurb: "Free pet food and supplies for caretakers in need.",
    tone: "accent",
  },
  "humane-aco": {
    label: "Humane Societies & Animal Control",
    blurb:
      "Shelters and Animal Control Officers (ACOs) who can transport or take in an animal.",
    tone: "ink",
  },
  "large-animal": {
    label: "Large Animals & Livestock",
    blurb: "Help for horses, farm animals, and other large animals.",
    tone: "warm",
  },
};

export const MAINE_COUNTIES = [
  "Androscoggin",
  "Aroostook",
  "Cumberland",
  "Franklin",
  "Hancock",
  "Kennebec",
  "Knox",
  "Lincoln",
  "Oxford",
  "Penobscot",
  "Piscataquis",
  "Sagadahoc",
  "Somerset",
  "Waldo",
  "Washington",
  "York",
] as const;

export const resources: Resource[] = [
  // ---- Pet food pantries (Androscoggin County — from the binder) ----
  {
    id: "gahs-fetchin-food",
    name: "Greater Androscoggin Humane Society — Fetchin' Food Pet Food Pantry",
    category: "food-pantry",
    county: "Androscoggin",
    town: "Lewiston",
    address: "55 Strawberry Ave, Lewiston, ME",
    phone: "(207) 783-2311",
    email: "info@gahumane.org",
    website: "https://www.gahumane.org",
    hours: "Every Tuesday, 9:00am–11:00am",
    notes: [
      "Androscoggin County residents only",
      "Must complete an application; proof of residency and proof of SSI / SSDI / military service",
      "Limited to 1 person per household and 3 pets per family",
      "Bring your own bags",
      "May not have had neglect or cruelty charges",
      "Pickup only",
    ],
    verified: true,
  },
  {
    id: "kommunity-kritters",
    name: "Kommunity Kritters",
    category: "food-pantry",
    county: "Androscoggin",
    town: "Lewiston",
    address:
      "Currently at Kaydenz Kitchen, 155 Lisbon St, Lewiston (moving to 550 Lisbon St — confirm location)",
    phone: "(207) 577-7942",
    email: "kommunitykritters2021@gmail.com",
    hours: "Mon, Tue, Thu & Fri 10:00am–12:30pm and 1:30pm–5:00pm; Sat 9:00am–3:00pm",
    notes: ["Available to anyone in need", "Pickup only"],
    verified: true,
  },

  // ---- Animal Control Officers / Humane societies (Maine DACF — sample rows) ----
  {
    id: "aco-abbot",
    name: "Abbot — Animal Control Officer",
    category: "humane-aco",
    county: "Piscataquis",
    town: "Abbot",
    phone: "(207) 717-5813",
    notes: [
      "ACO: Gary Scavette",
      "Contracted shelter: Penobscot Valley Humane Society",
      "Town office: (207) 876-3340",
    ],
    verified: true,
  },
  {
    id: "aco-acton",
    name: "Acton — Animal Control Officer",
    category: "humane-aco",
    county: "York",
    town: "Acton",
    phone: "(207) 206-6065",
    notes: [
      "ACO: Brandon Mee",
      "Contracted shelter: Animal Welfare Society",
      "Town office: (207) 636-3131 ext. 401",
    ],
    verified: true,
  },

  // ---- Large animals / livestock (from the binder reference note) ----
  {
    id: "msspa-windham",
    name: "Maine State Society for the Protection of Animals (MSSPA)",
    category: "large-animal",
    county: "Cumberland",
    town: "Windham",
    website: "https://msspa.org",
    notes: [
      "Large-animal and livestock help (referenced in the binder as the Windham society that helps at all levels)",
      "Confirm current intake / assistance details before referring a patient",
    ],
    verified: true,
  },
];
