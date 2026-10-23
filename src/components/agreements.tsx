import { SITE } from "@/lib/site";
import { ContactButtons } from "./contact-buttons";
import { IconCheck } from "./icons";

const DOCS = [
  { t: "A signed service agreement", b: "Scope, timeline and pricing in writing, signed by both parties before work starts." },
  { t: "An NDA when you want one", b: "Your brand, products and plans stay between us." },
  { t: "Written quotes and invoices", b: "Every price confirmed in writing. No surprises." },
  { t: "Lot paperwork on research supply", b: "Lot numbers on every unit and a certificate of analysis with wholesale lots." },
];

/** Comfort for a first-time buyer: a real business, and everything in writing. */
export function Agreements() {
  return (
    <section className="mt-28">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="grid gap-10 rounded-[28px] bg-ink p-7 text-white sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[14px] font-medium text-gold-fill">A real business, on paper</p>
            <h2 className="h-section mt-2 text-[34px] sm:text-[46px]">The team behind the brands.</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-white/75">
              We build, run and supply our own brands every day. When you work with us, it&rsquo;s in writing, and both
              sides sign.
            </p>
            <p className="mt-6 text-[13px] text-white/55">A few of the brands we&rsquo;re behind</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[14px] text-white">
                  {b}
                </li>
              ))}
            </ul>
            <ContactButtons
              single
              size="lg"
              className="mt-8 [&_.btn-dark]:bg-white [&_.btn-dark]:text-ink [&_.btn-dark]:hover:bg-white/90"
              message="Hi Vanta Foundry, I'd like to see your service agreement before we start."
              subject="Service agreement"
            />
          </div>
          <ul className="space-y-3">
            {DOCS.map((d) => (
              <li key={d.t} className="flex gap-3 rounded-xl bg-white/[0.06] px-4 py-3.5">
                <IconCheck className="mt-1 shrink-0 text-gold-fill" />
                <span>
                  <span className="block text-[15.5px] font-medium text-white">{d.t}</span>
                  <span className="mt-0.5 block text-[14px] leading-[1.5] text-white/65">{d.b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
