/* eslint-disable @next/next/no-img-element */

const PETS = [
  {
    name: "Dogs",
    src: "/img/patient-dog-joy.jpg",
    alt: "A patient smiling with a therapy dog",
    position: "object-center",
  },
  {
    name: "Cats",
    src: "/img/cat-home.jpg",
    alt: "An orange cat resting at home",
    position: "object-[50%_48%]",
  },
  {
    name: "Fish",
    src: "/img/aquarium-care.jpg",
    alt: "A cared-for home aquarium with fish",
    position: "object-center",
  },
  {
    name: "Birds",
    src: "/img/bird-home.jpg",
    alt: "A blue and yellow pet bird",
    position: "object-[42%_34%]",
  },
  {
    name: "Rabbits",
    src: "/img/rabbit-care.jpg",
    alt: "A small rabbit being held safely",
    position: "object-[50%_45%]",
  },
  {
    name: "Turtles",
    src: "/img/turtle-aquarium.jpg",
    alt: "A turtle in an aquarium",
    position: "object-center",
  },
];

export function PetFamilyMosaic({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid h-full w-full grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}
      aria-label="Photos of common pets covered: dogs, cats, fish, birds, rabbits, and turtles"
      role="img"
    >
      {PETS.map((pet) => (
        <div
          key={pet.name}
          className="group relative min-h-28 overflow-hidden rounded-3xl border border-edge bg-surface shadow-[var(--shadow)]"
        >
          <img
            src={pet.src}
            alt={pet.alt}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${pet.position}`}
            loading="lazy"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-sage-deep px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-on-dark shadow-sm">
            {pet.name}
          </span>
        </div>
      ))}
    </div>
  );
}
