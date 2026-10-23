/**
 * One place for the brand's name, address and contact details.
 *
 * "Vanta Foundry" is a working name. Renaming the site is a change to this
 * file and nothing else: every page, the metadata, the JSON-LD and llms.txt
 * read from here.
 */
export const SITE = {
  name: "Vanta Foundry",
  shortName: "Foundry",
  parent: "Vanta Labs",
  parentUrl: "https://www.vantalabsresearch.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vantafoundry.com").replace(/\/$/, ""),
  tagline: "Everything behind the label.",
  description:
    "Wholesale supply, white label, fulfillment, payments setup and storefront development for research-supply businesses, from the team that runs Vanta Labs.",
  /**
   * Shown publicly as the fallback contact. Defaults to the parent brand's
   * support inbox, which exists today; set NEXT_PUBLIC_CONTACT_EMAIL once a
   * partners@ address on the new domain is live.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@vantalabsresearch.com",
  privacyUrl: "https://www.vantalabsresearch.com/legal/privacy",
  termsUrl: "https://www.vantalabsresearch.com/legal/terms",
} as const;

export const NAV = [
  { href: "/wholesale", label: "Wholesale" },
  { href: "/white-label", label: "White label" },
  { href: "/fulfillment", label: "Fulfillment" },
  { href: "/payments", label: "Payments" },
  { href: "/storefronts", label: "Storefronts" },
  { href: "/guides", label: "Guides" },
] as const;

export const RUO_NOTICE =
  "Vanta Foundry supplies laboratory research materials for research use only. They are not for human or veterinary use, and are not drugs, foods, cosmetics or dietary supplements. We do not supply businesses that sell for human use.";
