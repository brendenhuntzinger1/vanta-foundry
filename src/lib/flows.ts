/**
 * The guided "start" flow for each service: what you get in one glance, a few
 * tap-to-answer questions, then name and phone, then send. Every answer is a
 * tap, so a visitor can finish on a phone in under a minute. Answers go into
 * the WhatsApp or email message; nothing is stored.
 */

export type FlowQuestion = { q: string; options: string[] };

export type Flow = {
  /** One line under the step 1 heading: what happens and how fast. */
  promise: string;
  questions: FlowQuestion[];
};

const WHEN: FlowQuestion = { q: "When do you want to start?", options: ["As soon as possible", "This month", "Just exploring"] };

export const FLOWS: Record<string, Flow> = {
  "website-development": {
    promise: "A custom-coded site, usually live in 72 hours to a week, with a developer team on call after launch.",
    questions: [
      { q: "What kind of site do you need?", options: ["Online store", "Service or booking business", "Company website", "Landing page", "Not sure yet"] },
      { q: "Do you have a website now?", options: ["No, starting fresh", "Yes, rebuild it", "Yes, improve it"] },
      { q: "Add the monthly developer team (24/7)?", options: ["Yes", "Tell me more", "No, just the build"] },
      WHEN,
    ],
  },
  "payment-processing": {
    promise: "Cards, Apple Pay and Google Pay connected to your checkout, with a backup processor ready.",
    questions: [
      { q: "What do you sell?", options: ["Physical products", "Services", "Subscriptions", "Research supply", "Something else"] },
      { q: "Do you take card payments now?", options: ["Not yet", "Yes, I want a backup", "Yes, but I was shut down"] },
      { q: "Roughly how much per month?", options: ["Just starting", "Under $10k", "$10k–$50k", "$50k+"] },
      WHEN,
    ],
  },
  "seo-ai-search": {
    promise: "SEO and AI search set up for your business, with a plain-words report every month.",
    questions: [
      { q: "Where are your customers?", options: ["My local area", "A few cities", "Nationwide"] },
      { q: "What matters most?", options: ["More calls and leads", "More online sales", "Showing up in AI answers"] },
      { q: "Do you have a website?", options: ["Yes", "No, I need one too"] },
      WHEN,
    ],
  },
  wholesale: {
    promise: "Our in-stock research products in bulk. Tell us what you need and we reply with wholesale pricing.",
    questions: [
      { q: "Which products?", options: ["I'll list them in my message", "Send me the full list", "Not sure yet"] },
      { q: "How much are you ordering?", options: ["A starter order", "Case quantities", "Large or recurring orders"] },
      { q: "Where should it ship?", options: ["To me", "Store it with your 3PL"] },
      { q: "Confirm research use", options: ["I confirm these are for research use only"] },
    ],
  },
  "factory-direct": {
    promise: "Made to order at the manufacturer, with a certificate of analysis for wholesale lots.",
    questions: [
      { q: "What do you need made?", options: ["Something in your catalog", "Something not listed"] },
      { q: "What size of order?", options: ["One large order", "Recurring orders"] },
      { q: "How should it be labelled?", options: ["Under my own label", "Plain, no label"] },
      { q: "Confirm research use", options: ["I confirm these are for research use only"] },
    ],
  },
  "white-label": {
    promise: "Your brand on every vial. You approve a proof before anything prints.",
    questions: [
      { q: "Do you have a brand yet?", options: ["Yes, logo ready", "I need help with the design"] },
      { q: "How many products to start?", options: ["1–3", "4–10", "10+"] },
      { q: "Who ships the orders?", options: ["Ship the stock to me", "Store and ship for me (3PL)"] },
      { q: "Confirm research use", options: ["I confirm these are for research use only"] },
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
