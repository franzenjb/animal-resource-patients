export type NavItem = { href: string; label: string; featured?: boolean };

export const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/intake", label: "Intake Workflow" },
  { href: "/resources", label: "Resource Directory" },
  { href: "/forms", label: "Consent Forms" },
  { href: "/legal", label: "Legal Reference" },
  { href: "/contact", label: "Contact Us", featured: true },
];
