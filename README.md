# Patient Animal Resource

A web tool that helps **hospitalized patients arrange care for the animals they leave at
home**. It digitizes a reference binder used at intake: a step-by-step workflow plus a
searchable directory of Maine kennels, pet food pantries, humane societies / Animal Control
Officers, and large-animal help — and a plain-language copy of the relevant Maine
animal-welfare statute.

Built for **patients, families, and intake staff** — mobile-first, clean, no internal
chrome.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Mission + "How It Works" (3 steps) + resource categories |
| `/intake` | Interactive intake checklist (Steps 1–3), printable |
| `/resources` | Filterable directory (category + Maine county + search) |
| `/forms` | Consent-to-contact and relinquishment forms (signable versions to come) |
| `/legal` | Maine Title 17, Ch. 42 (Possession of Animals) — reference summaries |

## Data

Directory content lives in `src/data/resources.ts`. Entries transcribed from the source
binder are flagged `verified: true`. The full Maine import (DACF Animal Control Officers,
all-county pet food pantries, LocalKennels.net) is a follow-on — **do not invent contact
details; import them.**

Source documents and OCR transcription: `docs/source-ocr.md`. Original photos live under
`_source/` (git-ignored, large raw files).

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx playwright test  # smoke + dark-mode contrast tests
```

Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · deployed on Vercel.

## To do (next pass)

- Import the full Maine Animal Control Officer directory (DACF).
- Import all-county pet food pantries and the 37 Maine kennels (LocalKennels.net).
- Attach downloadable/signable consent forms on `/forms`.
- Optionally pull authoritative statute text from legislature.maine.gov.
