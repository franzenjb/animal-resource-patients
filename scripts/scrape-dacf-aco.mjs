const SOURCE =
  "https://www.maine.gov/dacf/ahw/animal_welfare/animal_control_officers.shtml";
const CENSUS_MUNICIPALITIES =
  "https://www2.census.gov/programs-surveys/popest/datasets/2010-2015/cities/totals/sub-est2015_23.csv";

const COUNTY_OVERRIDES = new Map(
  Object.entries({
    connor: "Aroostook",
    e: "Aroostook",
    edmunds: "Washington",
    herseytown: "Penobscot",
    indian: "Washington",
    "indian township": "Washington",
    kingman: "Penobscot",
    lakeview: "Piscataquis",
    "lake view": "Piscataquis",
    lexington: "Somerset",
    madrid: "Franklin",
    milton: "Oxford",
    rockwood: "Somerset",
    "rogue bluffs": "Washington",
    "roque bluffs": "Washington",
    sedgewick: "Hancock",
    stocklholm: "Aroostook",
    stockholm: "Aroostook",
    westport: "Lincoln",
  }),
);

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

function normalizeTown(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\bst\.?\b/g, " saint ")
    .replace(/\bplt\.?\b/g, " plantation")
    .replace(/\bpltn\.?\b/g, " plantation")
    .replace(/\btwp\.?\b/g, " township")
    .replace(/\b(cdp|city|town|plantation|county)\b/g, " ")
    .replace(/\b(unorganized territory|township)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSlash(value) {
  const [first = "", ...rest] = value.split("/");
  return [first.trim(), rest.join("/").trim()];
}

function normalizePhone(value) {
  return value.replace(/^;+/, "").replace(/\s+/g, " ").trim();
}

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells;
}

async function townCountyLookup() {
  const response = await fetch(CENSUS_MUNICIPALITIES);
  if (!response.ok) {
    throw new Error(`Failed to fetch Census municipality data: ${response.status}`);
  }

  const rows = (await response.text())
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map(parseCsvLine);

  const countyByCode = new Map();
  for (const row of rows) {
    const [sumlev, , countyCode, , , , , , name] = row;
    if (sumlev === "050") {
      countyByCode.set(countyCode, name.replace(/\s+County$/, ""));
    }
  }

  const byTown = new Map();
  for (const row of rows) {
    const [sumlev, , countyCode, , , , , , name] = row;
    if (sumlev !== "061") continue;
    const county = countyByCode.get(countyCode);
    if (!county) continue;
    byTown.set(normalizeTown(name), county);
  }

  return byTown;
}

const countyByTown = await townCountyLookup();

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
    const townKey = normalizeTown(town);
    const county = countyByTown.get(townKey) ?? COUNTY_OVERRIDES.get(townKey);
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
      county,
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
