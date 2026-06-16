# Data Sources

Current launch scope: Maine. The data shape is intended to support other states
later, but this repo should not display a listing until the contact details come
from a public source or a verified partner submission.

## Maine Animal Control Officers

- Source: Maine Department of Agriculture, Conservation and Forestry, Animal
  Welfare Program, Animal Control Officers table.
- URL: `https://www.maine.gov/dacf/ahw/animal_welfare/animal_control_officers.shtml`
- Local data: `src/data/aco.json`
- Refresh command: `node scripts/scrape-dacf-aco.mjs > src/data/aco.json`
- Current rows: 500 town records.
- Notes: the source table includes town, ACO / alternate ACO, contracted animal
  shelter, business phone / after-hours phone, town office phone, and
  certification status. The site labels this category "Animal Control &
  Contracted Shelters" because the current scrape is town ACO records with a
  contracted-shelter field, not standalone shelter profiles.

## Maine Pet Food Pantries

- Primary source: State of Maine pet food pantries directory PDF.
- URL: `https://www.maine.gov/dacf/ahw/animal_welfare/documents/maine-pet-food-pantries.pdf`
- Local data: `src/data/pantries.json`
- Current rows: 35.

## Supplemental Pet Food Pantry Lists

- Source: Maine Friends of Animals pet food pantries page.
- URL: `https://www.mfoa.net/activism-programs/pet-food-pantries-maine`
- Source: Midcoast Humane pet food pantries page.
- URL: `https://midcoasthumane.org/pet-food-pantries/`
- Local data: `src/data/pantries-supplemental.json`
- Current rows: 20.

## Kennels

- Local data: `src/data/kennels.json`
- Current rows: 37.
- Source note: compiled from public Maine kennel listings during the initial
  build. Confirm individual availability directly before referral.

## Large Animals

- Local data: in `src/data/resources.ts`.
- Current rows: 1.
- Notes: this is intentionally conservative until more large-animal resources
  are verified.
