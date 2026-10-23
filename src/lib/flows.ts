/**
 * The guided "start" paths: /start/<slug>. One question per screen, every
 * answer a tap, then name and phone, then the inquiry opens in WhatsApp or
 * email, already written. Nothing is stored.
 *
 * Budgets are the customer's own ranges, asked so we can quote sensibly;
 * they are not our prices.
 */

export type FlowQuestion = { q: string; options: string[]; multi?: boolean; hint?: string };

export type Flow = {
  /** One line under the heading on the first screen. */
  promise: string;
  questions: FlowQuestion[];
  /** For a path that isn't one service (e.g. RUO brand scaling). */
  subject?: { slug: string; name: string; title: string; includes: string[] };
};

const WHEN: FlowQuestion = { q: "When do you want to start?", options: ["As soon as possible", "This month", "In the next few months", "Just exploring"] };
const RUO: FlowQuestion = { q: "Confirm research use", options: ["I confirm these are for research use only"] };

export const FLOWS: Record<string, Flow> = {
  "website-development": {
    promise: "A premium, custom-coded site for any industry, usually live in 72 hours to a week, with a developer team on call after launch.",
    questions: [
      { q: "What are you building?", options: ["Online store", "Service or booking business", "Company or brand site", "Landing page", "Not sure yet"] },
      { q: "What's your industry?", options: ["Skincare & beauty", "Health, clinics & wellness", "Food & beverage", "Apparel & fashion", "Research supply", "Home & local services", "Professional services", "Something else"] },
      {
        q: "What do you want included?",
        multi: true,
        hint: "Tap all that apply.",
        options: ["Custom design", "Online store & checkout", "Booking & appointments", "SEO (Google)", "GEO (AI search)", "Payment processing", "Logo & branding", "Copywriting", "Monthly developer team (24/7)"],
      },
      { q: "Do you have a website now?", options: ["No, starting fresh", "Yes, rebuild it", "Yes, improve it"] },
      { q: "What's your budget?", options: ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"] },
      WHEN,
    ],
  },
  "payment-processing": {
    promise: "Cards, Apple Pay and Google Pay connected to your checkout, with a backup processor ready. Every account is subject to approval.",
    questions: [
      { q: "What do you sell?", options: ["Physical products", "Services", "Subscriptions", "Research supply", "Health & wellness", "Something else"] },
      { q: "Do you take card payments now?", options: ["Not yet", "Yes, I want a backup", "Yes, but I was shut down", "Yes, I want better rates"] },
      { q: "Roughly how much per month?", options: ["Just starting", "Under $10k", "$10k – $50k", "$50k – $250k", "$250k+"] },
      {
        q: "What do you need?",
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
      { q: "Where are your customers?", options: ["My local area", "A few cities", "Nationwide", "Worldwide"] },
      { q: "What matters most?", multi: true, hint: "Tap all that apply.", options: ["More calls and leads", "More online sales", "Showing up in AI answers", "Google Maps", "Beating a competitor"] },
      { q: "Do you have a website?", options: ["Yes", "No, I need one too"] },
      { q: "What's your monthly budget?", options: ["Under $1,000 / mo", "$1,000 – $2,500 / mo", "$2,500 – $5,000 / mo", "$5,000+ / mo", "Not sure yet"] },
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
      { q: "Where are you now?", options: ["Starting from scratch", "Already selling, want to scale", "Switching suppliers"] },
      {
        q: "What do you need?",
        multi: true,
        hint: "Tap all that apply.",
        options: ["White-label vials", "Wholesale stock", "Factory-direct supply", "3PL fulfillment", "Website & checkout", "Payment processing", "SEO & AI search"],
      },
      { q: "How many products to start?", options: ["1–3", "4–10", "10–25", "25+"] },
      { q: "Budget for your first order?", options: ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"] },
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
      { q: "Budget for this order?", options: ["Under $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"] },
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
