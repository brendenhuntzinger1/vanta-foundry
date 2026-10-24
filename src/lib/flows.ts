/**
 * The guided "start" paths: /start/<slug>. One question per screen, every
 * answer a tap, then name and phone, then the inquiry opens in WhatsApp or
 * email, already written. Nothing is stored.
 *
 * Budgets are the customer's own ranges, asked so we can quote sensibly;
 * they are not our prices.
 */

export type FlowOption = string | { label: string; desc?: string; tag?: string };

export type FlowQuestion = {
  q: string;
  /** Short name for the "Your project" summary. */
  label?: string;
  options: FlowOption[];
  multi?: boolean;
  hint?: string;
};

export const optLabel = (o: FlowOption) => (typeof o === "string" ? o : o.label);

export type Flow = {
  /** One line under the heading. */
  promise: string;
  /** One or two taps, then the contact details (owner, 2026-10-24: "people want simplicity"). */
  questions: FlowQuestion[];
  /**
   * "form": the brief is submitted on the page (name, email, phone) and
   * emailed to the team, with no WhatsApp; used for website development.
   * Otherwise it opens in WhatsApp or email.
   */
  contact?: "form";
  /** For a path that isn't one service (e.g. RUO brand scaling). */
  subject?: { slug: string; name: string; title: string; includes: string[] };
};

const RUO: FlowQuestion = { q: "Confirm research use", label: "Research use", options: ["I confirm these are for research use only"] };

export const FLOWS: Record<string, Flow> = {
  "website-development": {
    promise: "A custom-coded store for your research brand, live in 72 hours to a week, with developers on call 24/7.",
    contact: "form",
    questions: [
      {
        q: "What do you need?",
        label: "Project",
        options: [
          { label: "A new online store", desc: "Catalog, COA pages and checkout" },
          { label: "Redesign my current site", desc: "Keep your products, rebuild the store" },
          { label: "Wholesale ordering", desc: "Quote requests and reorders for buyers" },
          { label: "Not sure yet", desc: "We'll recommend the right build" },
        ],
      },
      { q: "What's your budget?", label: "Budget", hint: "Helps us suggest the right build. We quote in writing.", options: ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"] },
    ],
  },
  "payment-processing": {
    promise: "Cards, Apple Pay and Google Pay on your checkout, with a backup processor ready. Every account is subject to approval.",
    questions: [
      { q: "Do you take card payments now?", label: "Current setup", options: ["Not yet", "Yes, I want a backup", "Yes, but I was shut down"] },
      { q: "Roughly how much per month?", label: "Volume", options: ["Just starting", "Under $10k", "$10k – $50k", "$50k+"] },
    ],
  },
  "seo-ai-search": {
    promise: "SEO and AI search set up for your brand, with a plain-words report every month. No one can guarantee rankings; we do the work that earns them.",
    questions: [
      { q: "Do you have a website?", label: "Website", options: ["Yes", "No, I need one too"] },
    ],
  },
  "ruo-brand": {
    subject: {
      slug: "white-label",
      name: "RUO brand scaling",
      title: "Launch or scale your research brand.",
      includes: [
        "Your label on every vial, approved before print",
        "Wholesale or factory-direct supply, with a COA for wholesale lots",
        "Stored, packed and shipped as your brand (3PL)",
        "A custom website and checkout built for research supply",
        "Payment processing that accepts research supply, with a backup",
        "Research-use-only copy and documentation throughout",
      ],
    },
    promise: "Product, label, shipping, website and payments for your research brand, from the team behind Vanta Labs.",
    questions: [
      { q: "Where are you now?", label: "Stage", options: ["Starting from scratch", "Already selling, want to scale", "Switching suppliers"] },
      RUO,
    ],
  },
  wholesale: {
    promise: "Our in-stock research products in bulk, with a COA for every wholesale lot. We reply with pricing.",
    questions: [RUO],
  },
  "factory-direct": {
    promise: "Made to order at the manufacturer, with a certificate of analysis for wholesale lots.",
    questions: [
      { q: "What do you need made?", options: ["Something in your catalog", "Something not listed"] },
      RUO,
    ],
  },
  "white-label": {
    promise: "Your brand on every vial. You approve a proof before anything prints.",
    questions: [
      { q: "Do you have a logo yet?", options: ["Yes, logo ready", "I need help with the design"] },
      RUO,
    ],
  },
  fulfillment: {
    promise: "We store your stock, pack every order and ship it as your brand, with tracking sent.",
    questions: [
      { q: "Orders per month?", label: "Orders", options: ["Just starting", "Under 300", "300–1,000", "1,000+"] },
    ],
  },
};
