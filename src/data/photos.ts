// SINGLE SOURCE OF TRUTH FOR IMAGERY.
//
// HANDOFF (Codex photo designer): to drop in a real photo, set `src` for that slug to a
// file you place in /public/img (e.g. "/img/hero.jpg") or a full https URL. That's the only
// change needed — every page reads from here via <Photo slug="..." />. Until `src` is set,
// a tasteful warm placeholder renders so layouts never look broken.

export type PhotoTone = "peach" | "sage" | "butter" | "accent";

export type Photo = {
  alt: string;
  tone: PhotoTone;
  glyph: string; // emoji shown in the placeholder
  src?: string; // set to a real image to replace the placeholder
};

export const PHOTOS: Record<string, Photo> = {
  hero: {
    alt: "A patient smiling with a therapy dog",
    tone: "peach",
    glyph: "🐕",
    src: "/img/patient-dog-joy.jpg",
  },
  comfort: {
    alt: "A dog giving its paw to a person at home",
    tone: "sage",
    glyph: "🐾",
    src: "/img/dog-paw-home.jpg",
  },
  waiting: {
    alt: "A dog waiting by the window at home",
    tone: "butter",
    glyph: "🪟",
    src: "/img/dog-window.jpg",
  },
  cat: {
    alt: "An orange cat resting at home",
    tone: "sage",
    glyph: "🐈",
    src: "/img/cat-home.jpg",
  },
  senior: {
    alt: "A patient resting with a dog nearby",
    tone: "peach",
    glyph: "💛",
    src: "/img/patient-dog-bed.jpg",
  },
  horse: {
    alt: "A horse being cared for by a person",
    tone: "butter",
    glyph: "🐴",
    src: "/img/horse-care-stable.jpg",
  },
  feeding: {
    alt: "Filling a pet's bowl with food",
    tone: "sage",
    glyph: "🥣",
    src: "/img/pet-food-bowl.jpg",
  },
  volunteer: {
    alt: "A volunteer caring for animals",
    tone: "peach",
    glyph: "🤝",
    src: "/img/rescue-dog-leash.jpg",
  },
  reunion: {
    alt: "A patient smiling with a therapy dog",
    tone: "accent",
    glyph: "🏡",
    src: "/img/patient-dog-joy.jpg",
  },
  fish: {
    alt: "A home aquarium with fish being cared for",
    tone: "sage",
    glyph: "🐟",
    src: "/img/aquarium-care.jpg",
  },
};
