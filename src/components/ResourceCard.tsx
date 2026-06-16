import { CATEGORY_META, Resource } from "@/data/resources";

const TONE: Record<string, string> = {
  accent: "bg-accent-soft text-accent",
  warm: "bg-warm-soft text-warm",
  ink: "bg-background text-ink",
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
    <article className="flex flex-col rounded-xl border border-edge bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
            TONE[meta.tone]
          }`}
        >
          {meta.label}
        </span>
        {r.verified && (
          <span
            title="Transcribed from the source binder"
            className="rounded-full bg-accent-soft px-2 py-1 text-[11px] font-semibold text-accent"
          >
            ✓ From The Binder
          </span>
        )}
      </div>

      <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-ink-strong">
        {r.name}
      </h3>
      {place && <p className="mt-1 text-sm text-muted">{place}</p>}

      <dl className="mt-3 space-y-1.5 text-sm text-ink">
        {r.address && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold text-muted">Address</dt>
            <dd>{r.address}</dd>
          </div>
        )}
        {r.phone && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold text-muted">Phone</dt>
            <dd>
              <a
                href={telHref(r.phone)}
                className="font-semibold text-accent hover:text-accent-hover"
              >
                {r.phone}
              </a>
              {r.phoneAfterHours && (
                <>
                  {" "}
                  · after hours{" "}
                  <a
                    href={telHref(r.phoneAfterHours)}
                    className="font-semibold text-accent hover:text-accent-hover"
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
            <dt className="shrink-0 font-semibold text-muted">Email</dt>
            <dd>
              <a
                href={`mailto:${r.email}`}
                className="font-semibold text-accent hover:text-accent-hover break-all"
              >
                {r.email}
              </a>
            </dd>
          </div>
        )}
        {r.hours && (
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold text-muted">Hours</dt>
            <dd>{r.hours}</dd>
          </div>
        )}
      </dl>

      {r.notes && r.notes.length > 0 && (
        <ul className="mt-3 space-y-1 border-t border-edge pt-3 text-sm text-ink">
          {r.notes.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-accent">
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
          className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-hover"
        >
          Visit Website →
        </a>
      )}
    </article>
  );
}
