import Link from "next/link";
import { IconArrow, IconCheck } from "./icons";

const CORE = [
  { t: "Custom website", b: "Designed and hand-coded, live in 72 hours to a week." },
  { t: "Payment processing", b: "Cards, Apple Pay and Google Pay, with a backup processor." },
  { t: "SEO & AI search", b: "Found on Google and Maps, recommended by ChatGPT, Gemini and Perplexity." },
  { t: "Developer team, 24/7", b: "Fixes, changes and updates handled for you every month." },
];

const ADD = ["Wholesale or factory-direct supply", "White label", "3PL & fulfillment"];

/** The bundle: everything a business needs to launch and get found, from one team. */
export function LaunchPackage() {
  const all = "website-development,payment-processing,seo-ai-search";
  return (
    <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      <div className="rounded-[24px] bg-ink p-7 text-white sm:p-10">
        <p className="text-[14px] font-medium text-gold-fill">The launch package</p>
        <p className="h-section mt-2 text-[30px] sm:text-[40px]">Built, paid and found. One package.</p>
        <p className="mt-3 max-w-[520px] text-[16px] leading-[1.6] text-white/70">
          Everything a business in any industry needs to launch online and keep growing, run by one team and quoted as one package.
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {CORE.map((c) => (
            <li key={c.t} className="rounded-xl bg-white/[0.06] p-4">
              <p className="flex items-center gap-2 text-[15.5px] font-medium">
                <IconCheck className="shrink-0 text-gold-fill" /> {c.t}
              </p>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-white/60">{c.b}</p>
            </li>
          ))}
        </ul>
        <Link href={`/get-started?services=${all}`} className="btn mt-8 h-12 bg-white px-6 text-[15px] text-ink hover:bg-white/90">
          Get the launch package <IconArrow />
        </Link>
      </div>
      <div className="flex flex-col justify-between rounded-[24px] border border-line p-7 sm:p-10">
        <div>
          <p className="text-[14px] font-medium text-gold">Selling research products?</p>
          <p className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.03em] text-ink">Add supply, your label and shipping.</p>
          <ul className="mt-5 space-y-2.5">
            {ADD.map((a) => (
              <li key={a} className="flex gap-3 text-[15.5px] text-ink">
                <IconCheck className="mt-0.5 shrink-0 text-gold" /> {a}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-[13.5px] leading-[1.6] text-muted">
          Every package is quoted for your business. Tell us what you need and we reply with a price and a timeline, in writing.
        </p>
      </div>
    </div>
  );
}
