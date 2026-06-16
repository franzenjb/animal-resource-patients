import { CATEGORY_META, Resource, ResourceCategory } from "@/data/resources";
import { CategoryGraphic } from "@/components/CategoryGraphic";

// Category badges — all on LIGHT chips with dark/ink text (contrast contract).
const BADGE: Record<ResourceCategory, string> = {
  kennel: "bg-peach text-ink",
  "food-pantry": "bg-sage-soft text-sage-text",
  "humane-aco": "bg-butter text-ink",
  "large-animal": "bg-peach text-accent-text",
};

const ACCENT: Record<ResourceCategory, string> = {
  kennel: "bg-accent",
  "food-pantry": "bg-sage-deep",
  "humane-aco": "bg-butter",
  "large-animal": "bg-peach",
};

function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

function directionsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;
}

export function ResourceCard({ r }: { r: Resource }) {
  const meta = CATEGORY_META[r.category];
  const place = [r.town, r.county && `${r.county} County`]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="relative flex flex-col overflow-hidden rounded-3xl border border-edge bg-surface p-6 shadow-[var(--shadow)]">
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1.5 ${ACCENT[r.category]}`}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <CategoryGraphic
            category={r.category}
            className="h-14 w-14 shrink-0 p-2.5"
          />
          <div className="min-w-0">
            <span
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                BADGE[r.category]
              }`}
            >
              {meta.label}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink-deep">
              {r.name}
            </h3>
            {place && (
              <p className="mt-1 text-sm font-semibold text-muted">{place}</p>
            )}
          </div>
        </div>
        {r.verified && (
          <span
            title="Verified against public source material"
            className="shrink-0 rounded-full bg-sage-soft px-2.5 py-1 text-[11px] font-bold text-sage-text"
          >
            ✓ Verified
          </span>
        )}
      </div>

      <dl className="mt-4 space-y-2 text-sm text-ink">
        {r.address && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-bold text-muted">Address</dt>
            <dd>
              <a
                href={directionsHref(r.address)}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-ink underline-offset-2 hover:text-accent-text hover:underline"
              >
                {r.address}
              </a>
            </dd>
          </div>
        )}
        {r.phone && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-bold text-muted">Phone</dt>
            <dd>
              <a
                href={telHref(r.phone)}
                className="font-bold text-accent-text underline-offset-2 hover:underline"
              >
                {r.phone}
              </a>
              {r.phoneAfterHours && (
                <>
                  {" "}
                  · after hours{" "}
                  <a
                    href={telHref(r.phoneAfterHours)}
                    className="font-bold text-accent-text underline-offset-2 hover:underline"
                  >
                    {r.phoneAfterHours}
                  </a>
                </>
              )}
            </dd>
          </div>
        )}
        {r.email && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-bold text-muted">Email</dt>
            <dd>
              <a
                href={`mailto:${r.email}`}
                className="font-bold text-accent-text underline-offset-2 hover:underline break-all"
              >
                {r.email}
              </a>
            </dd>
          </div>
        )}
        {r.hours && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-bold text-muted">Hours</dt>
            <dd>{r.hours}</dd>
          </div>
        )}
      </dl>

      {r.notes && r.notes.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-edge pt-4 text-sm text-ink">
          {r.notes.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-accent-text">
                •
              </span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {r.address && (
          <a
            href={directionsHref(r.address)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-on-accent hover:bg-accent-hover"
          >
            Directions
          </a>
        )}
        {r.phone && (
          <a
            href={telHref(r.phone)}
            className="rounded-full border border-edge-strong bg-surface px-4 py-2 text-sm font-bold text-ink hover:border-accent hover:text-accent-text"
          >
            Call
          </a>
        )}
        {r.website && (
          <a
            href={r.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-edge-strong bg-surface px-4 py-2 text-sm font-bold text-ink hover:border-accent hover:text-accent-text"
          >
            Website
          </a>
        )}
      </div>
    </article>
  );
}
