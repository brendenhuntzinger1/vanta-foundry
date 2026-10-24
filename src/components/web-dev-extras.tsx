import { ContactButtons } from "./contact-buttons";
import { IconCheck } from "./icons";

const BUILD = [
  { t: "Live in 72 hours to a week", b: "Our developer team builds it fast, without cutting corners. Any specific request gets built." },
  { t: "Designed for your brand", b: "A design made for your research brand, not a theme every other store is using." },
  { t: "Custom-coded", b: "Hand-written code on a modern stack. No page builders, no bloated plugins, no AI filler." },
  { t: "Fast on every phone", b: "Built mobile-first, because that is where most of your customers are." },
  { t: "Found on Google and in AI search", b: "Clean structure, structured data and answers written to be quoted." },
  { t: "Payments and checkout", b: "Checkout connected to your processor, with a backup ready." },
  { t: "Yours to grow", b: "Add pages, products, accounts or a wholesale portal when you need them." },
];

/** Website-development page only: what we build, and the monthly developer team. */
export function WebDevExtras() {
  return (
    <>
      <section className="mt-28">
        <div className="mx-auto max-w-[1160px] px-5">
          <p className="text-[14px] font-medium text-gold">What we build</p>
          <h2 className="h-section mt-2 max-w-2xl text-[34px] text-ink sm:text-[46px]">Custom-coded. Not templates, not AI filler.</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUILD.map((x) => (
              <li key={x.t} className="rounded-2xl border border-line p-6">
                <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{x.t}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-body">{x.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-24">
        <div className="mx-auto max-w-[1160px] px-5">
          <div className="grid gap-10 rounded-[28px] bg-ink p-7 text-white sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-[14px] font-medium text-gold-fill">Monthly plan</p>
              <h2 className="h-section mt-2 text-[34px] sm:text-[46px]">Your developer team, on call 24/7.</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-white/75">
                Pay monthly and get a development team you can reach any time. Something breaks, needs changing or needs
                building: message us and it gets done.
              </p>
              <ContactButtons
                single
                size="lg"
                className="mt-8 [&_.btn-dark]:bg-white [&_.btn-dark]:text-ink [&_.btn-dark]:hover:bg-white/90"
                message="Hi Vanta Foundry, I'd like to know about the monthly developer team plan."
                subject="Monthly developer team"
              />
            </div>
            <ul className="space-y-3">
              {[
                "Any specific request: features, integrations, pages",
                "24/7 access to the developer team",
                "Bug fixes and code changes, as they come up",
                "Updates, new pages and new features",
                "Speed, security and uptime looked after",
                "Works for sites we build and, after a review, sites you already have",
              ].map((x) => (
                <li key={x} className="flex gap-3 rounded-xl bg-white/[0.06] px-4 py-3.5 text-[15.5px] text-white">
                  <IconCheck className="mt-0.5 shrink-0 text-gold-fill" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
