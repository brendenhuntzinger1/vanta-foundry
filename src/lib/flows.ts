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
  /** One line under the heading on the first screen. */
  promise: string;
  questions: FlowQuestion[];
  /** Big points on the first screen; falls back to the service's list. */
  pillars?: { t: string; b: string }[];
  /**
   * "form": the brief is submitted on the page (name, email, phone) and
   * emailed to the team, with no WhatsApp; used for website development.
   * Otherwise it opens in WhatsApp or email.
   */
  contact?: "form";
  /** Show the sites we've built on the first screen. */
  showcase?: boolean;
  /** For a path that isn't one service (e.g. RUO brand scaling). */
  subject?: { slug: string; name: string; title: string; includes: string[] };
};

const WHEN: FlowQuestion = { q: "When do you want to start?", label: "Timing", options: ["As soon as possible", "This month", "In the next few months", "Just exploring"] };
const RUO: FlowQuestion = { q: "Confirm research use", label: "Research use", options: ["I confirm these are for research use only"] };

export const FLOWS: Record<string, Flow> = {
  "website-development": {
    promise: "A premium, custom-coded store for your research brand, designed for you, live in 72 hours to a week, and looked after by your own developer team.",
    showcase: true,
    contact: "form",
    pillars: [
      { t: "Designed for your brand", b: "Custom design and hand-written code. Never a template, never AI filler." },
      { t: "Live in 72 hours to a week", b: "Built, tested and launched by our developers, with every change you ask for." },
      { t: "Your developer team, 24/7", b: "On a monthly plan, a team on call for fixes, changes and new features. You never do maintenance." },
      { t: "Found on Google and AI", b: "SEO and GEO built in from day one, so customers and AI tools can find you." },
    ],
    questions: [
      {
        q: "What are you building?",
        label: "Project",
        options: [
          { label: "Online store", desc: "Catalog, COA pages, cart and checkout" },
          { label: "Wholesale ordering", desc: "Quote requests, quantity pricing and reorders" },
          { label: "Store and wholesale", desc: "Retail checkout and a buyer portal on one site" },
          { label: "Redesign my current site", desc: "Keep your products, rebuild the store" },
          { label: "Not sure yet", desc: "We'll recommend the right build" },
        ],
      },
      { q: "Where is your brand today?", label: "Stage", options: ["Just starting", "Selling, want a better site", "Established, adding wholesale", "Something else"] },
      {
        q: "What do you want included?",
        label: "Included",
        multi: true,
        hint: "Tap all that apply.",
        options: [
          { label: "Custom design", desc: "Designed from scratch for your brand" },
          { label: "Online store & checkout", desc: "Cards, Apple Pay, Google Pay" },
          { label: "COA library", desc: "Lab reports searchable by product and lot" },
          { label: "SEO (Google)", desc: "Rank in search and Google Maps" },
          { label: "GEO (AI search)", desc: "Get recommended by ChatGPT, Gemini, Perplexity" },
          { label: "Payment processing", desc: "Merchant account with a backup" },
          { label: "Logo & branding", desc: "A look that's yours" },
          { label: "Copywriting", desc: "Every page written for you" },
        ],
      },
      {
        q: "How should it be looked after?",
        label: "Care",
        options: [
          { label: "Build + developer team", desc: "A monthly plan with a team on call 24/7 for fixes, changes and new features. You never touch maintenance.", tag: "Recommended" },
          { label: "Build only", desc: "We design, build and launch it. You look after it from there." },
          { label: "Not sure, tell me more", desc: "We'll explain both on WhatsApp." },
        ],
      },
      { q: "Do you have a website now?", label: "Current site", options: ["No, starting fresh", "Yes, rebuild it", "Yes, improve it"] },
      { q: "What's your budget?", label: "Budget", hint: "Your range helps us recommend the right build. We quote in writing.", options: ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"] },
      WHEN,
    ],
  },
  "payment-processing": {
    promise: "Cards, Apple Pay and Google Pay connected to your checkout, with a backup processor ready. Every account is subject to approval.",
    questions: [
      { q: "What do you sell?", label: "Sells", options: ["Physical products", "Services", "Subscriptions", "Research supply", "Health & wellness", "Something else"] },
      { q: "Do you take card payments now?", label: "Current setup", options: ["Not yet", "Yes, I want a backup", "Yes, but I was shut down", "Yes, I want better rates"] },
      { q: "Roughly how much per month?", label: "Volume", options: ["Just starting", "Under $10k", "$10k – $50k", "$50k – $250k", "$250k+"] },
      {
        q: "What do you need?",
        label: "Needs",
        multi: true,
        hint: "Tap all that apply.",
        options: ["Cards", "Apple Pay & Google Pay", "Subscriptions", "Backup processor", "High-risk approval", "Checkout on my website", "Payment links & invoices"],
      },
      WHEN,
    ],
  },
  "seo-ai-search": {
    promise: "SEO and AI search set up for your business, with a plain-words report every month. No one can guarantee rankings; we do the work that earns them.",
    questions: [
      { q: "Where are your customers?", label: "Customers", options: ["My local area", "A few cities", "Nationwide", "Worldwide"] },
      { q: "What matters most?", label: "Goals", multi: true, hint: "Tap all that apply.", options: ["More calls and leads", "More online sales", "Showing up in AI answers", "Google Maps", "Beating a competitor"] },
      { q: "Do you have a website?", label: "Website", options: ["Yes", "No, I need one too"] },
      { q: "What's your monthly budget?", label: "Budget", options: ["Under $1,000 / mo", "$1,000 – $2,500 / mo", "$2,500 – $5,000 / mo", "$5,000+ / mo", "Not sure yet"] },
      WHEN,
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
    promise: "Everything a research-use-only brand needs to launch or grow: product, label, shipping, website and payments, from the team behind Vanta Labs.",
    questions: [
      { q: "Where are you now?", label: "Stage", options: ["Starting from scratch", "Already selling, want to scale", "Switching suppliers"] },
      {
        q: "What do you need?",
        label: "Needs",
        multi: true,
        hint: "Tap all that apply.",
        options: ["White-label vials", "Wholesale stock", "Factory-direct supply", "3PL fulfillment", "Website & checkout", "Payment processing", "SEO & AI search"],
      },
      { q: "How many products to start?", options: ["1–3", "4–10", "10–25", "25+"] },
      { q: "Budget for your first order?", label: "Budget", options: ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"] },
      RUO,
    ],
  },
  wholesale: {
    promise: "Our in-stock research products in bulk. Tell us what you need and we reply with wholesale pricing. A COA with every wholesale lot.",
    questions: [
      { q: "Which products?", options: ["I'll list them in my message", "Send me the full list", "Not sure yet"] },
      { q: "How much are you ordering?", options: ["A starter order", "Case quantities", "Large or recurring orders"] },
      { q: "Where should it ship?", options: ["To me", "Store it with your 3PL"] },
      RUO,
    ],
  },
  "factory-direct": {
    promise: "Made to order at the manufacturer, with a certificate of analysis for wholesale lots.",
    questions: [
      { q: "What do you need made?", options: ["Something in your catalog", "Something not listed"] },
      { q: "What size of order?", options: ["One large order", "Recurring orders"] },
      { q: "How should it be labelled?", options: ["Under my own label", "Plain, no label"] },
      { q: "Budget for this order?", label: "Budget", options: ["Under $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"] },
      RUO,
    ],
  },
  "white-label": {
    promise: "Your brand on every vial. You approve a proof before anything prints.",
    questions: [
      { q: "Do you have a brand yet?", options: ["Yes, logo ready", "I need help with the design"] },
      { q: "How many products to start?", options: ["1–3", "4–10", "10+"] },
      { q: "Who ships the orders?", options: ["Ship the stock to me", "Store and ship for me (3PL)"] },
      RUO,
    ],
  },
  fulfillment: {
    promise: "We store your stock, pack every order and ship it as your brand, with tracking sent.",
    questions: [
      { q: "What will we ship?", options: ["Products I buy from you", "My own products"] },
      { q: "Orders per month?", options: ["Just starting", "Under 300", "300–1,000", "1,000+"] },
      { q: "Where do you sell?", options: ["My own website", "Marketplaces", "Both"] },
      WHEN,
    ],
  },
};
