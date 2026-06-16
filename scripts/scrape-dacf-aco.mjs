const SOURCE =
  "https://www.maine.gov/dacf/ahw/animal_welfare/animal_control_officers.shtml";

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-");
}

function textFromCell(value) {
  return decodeHtml(
    value
      .replace(/<br\s*\/?>/gi, "; ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitSlash(value) {
  const [first = "", ...rest] = value.split("/");
  return [first.trim(), rest.join("/").trim()];
}

function normalizePhone(value) {
  return value.replace(/^;+/, "").replace(/\s+/g, " ").trim();
}

const response = await fetch(SOURCE);
if (!response.ok) {
  throw new Error(`Failed to fetch DACF ACO table: ${response.status}`);
}

const html = await response.text();
const table = html.match(/<table[^>]*id="data"[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/i);
if (!table) {
  throw new Error("Could not find DACF ACO data table");
}

const rows = [...table[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
  .map((row) => [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => textFromCell(cell[1])))
  .filter((cells) => cells.length === 6);

const resources = rows
  .map(([town, acoCell, shelter, phoneCell, townOffice, certification]) => {
    if (!town || town.toUpperCase() === "VACANT") return null;

    const [aco, alternate] = splitSlash(acoCell);
    const [businessPhone, afterHoursPhone] = splitSlash(phoneCell);
    const notes = [];

    if (aco) notes.push(`ACO: ${aco}`);
    if (alternate) notes.push(`Alternate ACO: ${alternate}`);
    if (shelter) notes.push(`Contracted shelter: ${shelter}`);
    if (townOffice) notes.push(`Town office: ${townOffice}`);
    if (certification) notes.push(`Certification: ${certification}`);
    notes.push("Source: Maine DACF Animal Welfare ACO table");

    return {
      id: `aco-${slugify(town)}`,
      name: `${town} - Animal Control Officer`,
      category: "humane-aco",
      town,
      phone: normalizePhone(businessPhone) || undefined,
      phoneAfterHours: normalizePhone(afterHoursPhone) || undefined,
      notes,
      verified: true,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.town.localeCompare(b.town));

process.stdout.write(`${JSON.stringify(resources, null, 2)}\n`);
