# Handoff — photos & ownership

## Live
- Site: https://animals.jbf.com (Vercel project `animal-resource-patients`, team jbf-2539)
- Repo: https://github.com/franzenjb/animal-resource-patients

## Git ownership
One git owner at a time. Claude Code built this; if **Codex** takes over, Codex becomes the
sole git owner — Claude goes read-only here until handed back. Commit + push every phase.

## Photos
**All imagery flows through one file: `src/data/photos.ts`.** Each slug renders a warm
placeholder until you give it a real `src`. To drop in a real photo:

1. Put the image in `public/img/` (e.g. `public/img/hero.jpg`), OR use a full https URL.
2. In `src/data/photos.ts`, set `src` on that slug:
   ```ts
   hero: { alt: "...", tone: "peach", glyph: "🐕", src: "/img/hero.jpg" },
   ```
That's it — `<Photo slug="hero" />` everywhere picks it up. No other edits.

Current real images live in `public/img/` and are mapped in `src/data/photos.ts`.
Photos are used for hero/header/story sections; resource cards use generated
category graphics through `src/components/CategoryGraphic.tsx` so the directory
does not repeat the same image hundreds of times.

Slugs in use: `hero`, `comfort`, `waiting`, `feeding`, `volunteer`, `horse`, and `fish`.
Also defined for later expansion: `cat`, `senior`, `reunion`.

Tone (`peach | sage | butter | accent`) only sets the placeholder gradient — harmless once a
real `src` is set, but keep it sensible.

## NON-NEGOTIABLE: contrast
`tests/contrast.spec.ts` runs a WCAG-AA audit on every page + the modal and **fails the run**
on any low-contrast text. Two-tier rule (see `src/app/globals.css`): dark ink text ONLY on
light surfaces; white/cream text ONLY on colored/dark surfaces. Run `npx playwright test`
before every commit — if you add a colored band, give its text an `text-on-dark`/`text-on-accent`
utility, never `text-ink`.

## Data
- `src/data/kennels.json` — 37 Maine kennels (LocalKennels.net). Real.
- `src/data/pantries.json` — 35 Maine pet food pantry entries from the State of Maine directory.
- `src/data/pantries-supplemental.json` — 20 additional pantry entries from MFOA and
  Midcoast Humane public lists.
- `src/data/aco.json` — 500 Maine DACF town Animal Control Officer records, including
  business phone, after-hours phone, ACO name, alternate ACO where present, town office,
  certification, and contracted shelter details.
- `src/data/resources.ts` — types + merges the above + the MSSPA large-animal entry.
- `scripts/scrape-dacf-aco.mjs` — regenerates `aco.json` from the official DACF table.

Current total: 593 resources.
See `docs/data-sources.md` for source notes.

## Run
`npm run dev` · `npm run build` · `npx playwright test`
