/**
 * The brand's name and every way to reach the team, in one file.
 *
 * "Vanta Foundry" is a working name; renaming the site is a change here only.
 */
export const SITE = {
  name: "Vanta Foundry",
  parent: "Vanta Labs",
  parentUrl: "https://www.vantalabsresearch.com",
  /** Stores the team has built, named in the hero (owner, 2026-10-23). */
  builtStores: ["Vanta Labs", "Genesis Biomapping", "Remade Clinic"],
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vantafoundry.com").replace(/\/$/, ""),
  description:
    "Everything to start and scale a research peptide brand: wholesale peptides with a COA for every lot, factory-direct supply, white label, 3PL fulfillment, and the website and payment processing to sell them.",
  /** Every email link and prefilled request goes here (owner, 2026-10-23). */
  email: "support@vantalabsresearch.com",
  /**
   * WhatsApp number in international format, digits only: +1 (419) 378-1139
   * (owner, 2026-10-23). NEXT_PUBLIC_WHATSAPP_NUMBER overrides it; an empty
   * value hides every WhatsApp button and the site falls back to email.
   */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "14193781139").replace(/\D/g, ""),
  privacyUrl: "https://www.vantalabsresearch.com/legal/privacy",
  termsUrl: "https://www.vantalabsresearch.com/legal/terms",
} as const;

export function whatsappLink(text?: string) {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function emailLink(subject?: string, body?: string) {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const qs = q.toString().replace(/\+/g, "%20");
  return `mailto:${SITE.email}${qs ? `?${qs}` : ""}`;
}

/**
 * Pages that hide the WhatsApp buttons. Empty since 2026-10-24: Vanta Foundry
 * now serves research brands only, and WhatsApp is how they reach us on every
 * page, the website pages included (their brief form stays).
 */
export const NO_WHATSAPP_PATHS: string[] = [];

/** True on every website-development page, including the service pages under it and each case study. */
export function isWebsitePath(pathname: string) {
  return NO_WHATSAPP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export const NAV = [
  { href: "/catalog", label: "Catalog" },
  { href: "/supply", label: "Wholesale & 3PL" },
  { href: "/white-label", label: "White label" },
  { href: "/website-development", label: "Websites & payments" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;

export const RUO_NOTICE =
  "Research materials supplied by Vanta Foundry are for laboratory research use only. They are not for human or veterinary use and are not drugs, foods, cosmetics or dietary supplements. Websites and payment processing are business services for research-supply brands.";
