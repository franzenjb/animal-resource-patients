import { PHOTOS, PhotoTone } from "@/data/photos";

// Placeholder gradients. Light tones carry ink text; the dark "accent" tone carries
// cream text — per the contrast contract in globals.css.
const TONE: Record<PhotoTone, { grad: string; onDark: boolean }> = {
  peach: { grad: "linear-gradient(135deg,#ffd9c7,#ffe7da)", onDark: false },
  sage: { grad: "linear-gradient(135deg,#cfe0cd,#e6efe5)", onDark: false },
  butter: { grad: "linear-gradient(135deg,#ffe2ad,#fff0d4)", onDark: false },
  accent: { grad: "linear-gradient(135deg,#d56a4b,#b8482a)", onDark: true },
};

export function Photo({
  slug,
  className = "",
  rounded = "rounded-3xl",
}: {
  slug: keyof typeof PHOTOS | string;
  className?: string;
  rounded?: string;
}) {
  const p = PHOTOS[slug] ?? {
    alt: "",
    tone: "peach" as PhotoTone,
    glyph: "🐾",
  };

  if (p.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={p.src}
        alt={p.alt}
        className={`h-full w-full object-cover ${rounded} ${className}`}
        loading="lazy"
      />
    );
  }

  const tone = TONE[p.tone];
  const text = tone.onDark ? "text-on-dark" : "text-ink";
  const chip = "bg-surface text-ink"; // solid: guaranteed-legible over any tone

  return (
    <div
      aria-label={p.alt}
      role="img"
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: tone.grad }}
    >
      <span
        aria-hidden
        className={`select-none text-[clamp(3rem,12vw,7rem)] opacity-80 ${text}`}
      >
        {p.glyph}
      </span>
      <span
        className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${chip}`}
      >
        Photo Coming Soon
      </span>
    </div>
  );
}
