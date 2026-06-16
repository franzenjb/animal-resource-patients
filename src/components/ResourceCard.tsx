import { CATEGORY_META, Resource, ResourceCategory } from "@/data/resources";

// Category badges — all on LIGHT chips with dark/ink text (contrast contract).
const BADGE: Record<ResourceCategory, string> = {
  kennel: "bg-peach text-ink",
  "food-pantry": "bg-sage-soft text-sage-text",
  "humane-aco": "bg-butter text-ink",
  "large-animal": "bg-peach text-accent-text",
};

function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export function ResourceCard({ r }: { r: Resource }) {
  const meta = CATEGORY_META[r.category];
  const place = [r.town, r.county && `${r.county} County`]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex flex-col rounded-3xl border border-edge bg-surface p-6 shadow-[var(--shadow)]">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
            BADGE[r.category]
          }`}
        >
          {meta.label}
        </span>
        {r.verified && (
          <span
            title="Transcribed from the source binder"
            className="rounded-full bg-sage-soft px-2.5 py-1 text-[11px] font-bold text-sage-text"
          >
            ✓ Verified
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink-deep">
        {r.name}
      </h3>
      {place && <p className="mt-1 text-sm font-semibold text-muted">{place}</p>}

      <dl className="mt-4 space-y-2 text-sm text-ink">
        {r.address && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-bold text-muted">Address</dt>
            <dd>{r.address}</dd>
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

      {r.website && (
        <a
          href={r.website}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-sm font-bold text-accent-text underline-offset-2 hover:underline"
        >
          Visit Website →
        </a>
      )}
    </article>
  );
}
