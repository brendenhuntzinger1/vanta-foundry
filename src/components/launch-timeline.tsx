import { ContactButtons } from "./contact-buttons";

const DAYS = [
  { d: "Day 1", t: "First message", b: "You tell us on WhatsApp what you sell and what you need. We map out the whole launch." },
  { d: "Day 2", t: "Design and labels started", b: "Your site design and label proofs are underway. Payment processing application goes in, with a backup." },
  { d: "Day 3", t: "Site design approved", b: "You review the design. Our developers start coding it, page by page." },
  { d: "Day 4", t: "Labels and files ready", b: "Label art approved and printed. Product files and certificates of analysis lined up." },
  { d: "Day 5", t: "Website live for review", b: "Your custom site is built and on a preview link. Any change you ask for gets made." },
  { d: "Day 6", t: "Stock at our warehouse", b: "Product is received, labelled and shelved. Fulfillment is connected to your store." },
  { d: "Day 7", t: "Checkout tested", b: "Processing connected, Apple Pay and cards tested end to end, backup ready." },
  { d: "Day 8", t: "Launch", b: "Your site goes live. Orders come in, we pack and ship them under your brand." },
];

// Illustrative orders per day for the two weeks after a launch.
const ORDERS = [2, 3, 5, 4, 7, 9, 8, 11, 13, 12, 16, 18, 17, 22];

/**
 * From nothing to selling in eight days: how a full launch runs when one team
 * handles the site, payments, product, labels and shipping.
 */
export function LaunchTimeline() {
  const max = Math.max(...ORDERS);
  return (
    <div>
      <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DAYS.map((x, i) => (
          <li key={x.d} className={`rounded-2xl border p-5 ${i === DAYS.length - 1 ? "border-ink bg-ink text-white" : "border-line bg-white"}`}>
            <p className={`text-[13px] font-medium ${i === DAYS.length - 1 ? "text-gold-fill" : "text-gold"}`}>{x.d}</p>
            <p className="mt-1.5 text-[17px] font-semibold tracking-[-0.02em]">{x.t}</p>
            <p className={`mt-1.5 text-[14.5px] leading-[1.55] ${i === DAYS.length - 1 ? "text-white/75" : "text-body"}`}>{x.b}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-6 rounded-2xl border border-line bg-bg-2 p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">After launch: what it can look like.</p>
          <p className="mt-2 text-[15px] leading-[1.6] text-body">
            Orders come in through your own site, get paid through your processor and ship from our warehouse. You focus on
            selling; we keep the site, payments and shipping running.
          </p>
          <p className="mt-3 text-[12.5px] text-muted">
            Illustration of a store&rsquo;s first two weeks, not a promise of results. Every timeline depends on the scope and
            on processor approval.
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-line bg-white p-4 sm:p-5">
          <div className="flex items-baseline justify-between text-[12.5px]">
            <span className="font-medium text-ink">Orders per day</span>
            <span className="text-muted">Days 1–14 after launch</span>
          </div>
          <div className="mt-4 flex h-[140px] items-end gap-1 sm:gap-1.5" role="img" aria-label="Illustrative chart: orders per day rising over the first two weeks after launch">
            {ORDERS.map((n, i) => (
              <span key={i} className="flex-1 rounded-t-[3px] bg-ink" style={{ height: `${(n / max) * 100}%`, opacity: 0.35 + (0.65 * (i + 1)) / ORDERS.length }} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-[12px]">
            <span className="text-body"><span className="block font-semibold text-ink">Shipped</span>Same or next day</span>
            <span className="text-body"><span className="block font-semibold text-ink">Payments</span>Main + backup</span>
            <span className="text-body"><span className="block font-semibold text-ink">Site</span>Team on call 24/7</span>
          </div>
        </div>
      </div>

      <ContactButtons single size="lg" className="mt-8" message="Hi Vanta Foundry, I'd like to launch my brand. Can we start the 8-day plan?" subject="Launch plan" />
    </div>
  );
}
