/**
 * The storefronts on /work: brands our team designed and coded, shown full
 * size. Vanta Labs is our live store; the others are our own design builds,
 * one per industry, coded to the same standard as client work.
 */

export type ShowcaseProduct = { name: string; note: string; price: string; src: string };

export type Showcase = {
  key: string;
  brand: string;
  industry: string;
  /** One line under the brand on /work. */
  summary: string;
  theme: {
    bg: string;
    ink: string;
    accent: string;
    accentInk: string;
    /** "serif" for editorial brands, "bold" for sport, "sans" otherwise. */
    type: "serif" | "bold" | "sans";
    dark?: boolean;
  };
  nav: string[];
  hero: { src: string; eyebrow: string; title: [string, string]; body: string; cta: string };
  products: ShowcaseProduct[];
  story: { src: string; title: string; body: string };
  features: string[];
};

export const SHOWCASE: Showcase[] = [
  {
    key: "solenne",
    brand: "Solenne",
    industry: "Skincare",
    summary: "An editorial skincare store with routines, subscriptions and ingredient pages.",
    theme: { bg: "#f6f1ea", ink: "#2a241e", accent: "#2a241e", accentInk: "#f6f1ea", type: "serif" },
    nav: ["Shop", "Rituals", "Ingredients", "About"],
    hero: { src: "/solenne/hero.webp", eyebrow: "New · The Renewal Ritual", title: ["Skin, quietly", "restored."], body: "Botanical formulas for calm, strong skin. Made in small batches.", cta: "Shop the ritual" },
    products: [
      { name: "Renewal Serum", note: "Bakuchiol + niacinamide", price: "$68", src: "/solenne/serum.webp" },
      { name: "Barrier Cream", note: "Squalane + ceramides", price: "$54", src: "/solenne/cream.webp" },
      { name: "Gentle Cleanser", note: "Oat + aloe", price: "$38", src: "/solenne/cleanser.webp" },
    ],
    story: { src: "/sites/solenne-ritual.webp", title: "A three-step ritual.", body: "Cleanse, treat, protect. Every formula is made to work alone or together, morning and night." },
    features: ["Routine builder", "Subscribe & save", "Ingredient pages", "Reviews"],
  },
  {
    key: "halcyon",
    brand: "Halcyon",
    industry: "Coffee & food",
    summary: "A roaster's store with subscriptions, gift boxes and wholesale ordering for cafés.",
    theme: { bg: "#14201b", ink: "#efe9dd", accent: "#c9a66b", accentInk: "#14201b", type: "serif", dark: true },
    nav: ["Shop", "Subscribe", "Wholesale", "Visit"],
    hero: { src: "/sites/halcyon-hero.webp", eyebrow: "Roasted every Monday", title: ["Coffee worth", "waking up for."], body: "Small-lot beans, roasted to order and shipped the same week.", cta: "Shop coffee" },
    products: [
      { name: "Ethiopia Guji", note: "Peach, jasmine · Light", price: "$22", src: "/sites/halcyon-bag.webp" },
      { name: "Colombia Huila", note: "Caramel, cherry · Medium", price: "$20", src: "/sites/halcyon-huila.webp" },
      { name: "House Espresso", note: "Cocoa, molasses · Dark", price: "$19", src: "/sites/halcyon-espresso.webp" },
    ],
    story: { src: "/sites/halcyon-hero.webp", title: "Never more than a week from roast.", body: "Choose your coffee, grind and schedule. Skip, swap or pause any time." },
    features: ["Subscriptions", "Gift boxes", "Café wholesale portal", "Local pickup"],
  },
  {
    key: "atlas",
    brand: "Atlas",
    industry: "Athletic apparel",
    summary: "A fast, drop-ready apparel store with size filters, waitlists and lookbooks.",
    theme: { bg: "#f2f3f5", ink: "#0f1114", accent: "#c8ff3d", accentInk: "#0f1114", type: "bold" },
    nav: ["Men", "Women", "Run", "Train"],
    hero: { src: "/sites/atlas-hero.webp", eyebrow: "New season", title: ["Built for", "the early miles."], body: "Technical layers made for cold starts and long runs.", cta: "Shop run" },
    products: [
      { name: "Storm Shell Jacket", note: "Black · Water-resistant", price: "$148", src: "/sites/atlas-jacket.webp" },
      { name: "Tempo Runner", note: "Black / Volt", price: "$135", src: "/sites/atlas-shoe.webp" },
      { name: "Pace Kit", note: "Short + tee", price: "$88", src: "/sites/atlas-kit.webp" },
    ],
    story: { src: "/sites/atlas-hero.webp", title: "Drop 04 lands Friday.", body: "Join the list for early access. Limited sizes, one per customer." },
    features: ["Drops & waitlists", "Size and fit filters", "Lookbooks", "3PL-connected"],
  },
];
