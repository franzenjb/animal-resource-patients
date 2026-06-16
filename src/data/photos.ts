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
    alt: "A person holding their dog close, warm and reassured",
    tone: "peach",
    glyph: "🐕",
  },
  comfort: {
    alt: "A hand gently holding a pet's paw",
    tone: "sage",
    glyph: "🐾",
  },
  waiting: {
    alt: "A dog waiting by the window at home",
    tone: "butter",
    glyph: "🪟",
  },
  cat: {
    alt: "Someone cuddling a cat at home",
    tone: "sage",
    glyph: "🐈",
  },
  senior: {
    alt: "An older person with their beloved pet",
    tone: "peach",
    glyph: "💛",
  },
  horse: {
    alt: "A horse being cared for by a person",
    tone: "butter",
    glyph: "🐴",
  },
  feeding: {
    alt: "Filling a pet's bowl with food",
    tone: "sage",
    glyph: "🥣",
  },
  volunteer: {
    alt: "A volunteer caring for animals",
    tone: "peach",
    glyph: "🤝",
  },
  reunion: {
    alt: "A joyful reunion between a person and their pet",
    tone: "accent",
    glyph: "🏡",
  },
};
