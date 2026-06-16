// Resource directory data.
//
// Kennels and food pantries are imported from JSON datasets compiled from public Maine
// sources (LocalKennels.net; the State of Maine "Maine Pet Food Pantries" directory).
// Humane / Animal Control Officer rows and the large-animal resource live below. Every
// entry shown to users is real, public data — do NOT invent contact details; import them.

import kennelsData from "./kennels.json";
import pantriesData from "./pantries.json";
import acoData from "./aco.json";

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
  notes?: string[];
  verified?: boolean;
};

export const CATEGORY_META: Record<
  ResourceCategory,
  { label: string; blurb: string }
> = {
  kennel: {
    label: "Kennels & Boarding",
    blurb: "Short-term boarding while a patient is in the hospital.",
  },
  "food-pantry": {
    label: "Pet Food Pantries",
    blurb: "Free pet food and supplies for caretakers in need.",
  },
  "humane-aco": {
    label: "Humane Societies & Animal Control",
    blurb:
      "Shelters and Animal Control Officers who can transport or take in an animal.",
  },
  "large-animal": {
    label: "Large Animals & Livestock",
    blurb: "Help for horses, farm animals, and other large animals.",
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

const kennels = kennelsData as Resource[];
const foodPantries = pantriesData as Resource[];
const humaneAco = acoData as Resource[];

const largeAnimal: Resource[] = [
  {
    id: "msspa-windham",
    name: "Maine State Society for the Protection of Animals (MSSPA)",
    category: "large-animal",
    county: "Cumberland",
    town: "Windham",
    website: "https://msspa.org",
    notes: [
      "Large-animal and livestock help (the Windham society referenced in the binder as helping at all levels)",
      "Confirm current intake / assistance details before referring a patient",
    ],
    verified: true,
  },
];

export const resources: Resource[] = [
  ...kennels,
  ...foodPantries,
  ...humaneAco,
  ...largeAnimal,
];
