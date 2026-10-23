import { EXAMPLE_BRAND, Pill, Screen } from "./frame";
import { IconCheck } from "../icons";

const DONE = [
  "Site speed and structured data fixed",
  "Service and city pages published",
  "Google Business Profile set up",
  "llms.txt and AI-readable answers live",
];

/** What a customer sees: the brand on Google, and the brand named in an AI answer. */
export function SeoDemo() {
  const domain = "northfieldco.com";
  return (
    <Screen title="Search & AI visibility" subtitle={`${EXAMPLE_BRAND} · monthly report`} status={<Pill tone="ok">Live</Pill>}>
      <div className="space-y-3">
        <div className="rounded-xl border border-line p-4">
          <p className="text-[11.5px] text-muted">Google · &ldquo;custom furniture near me&rdquo;</p>
          <p className="mt-2 text-[11.5px] text-body">{domain}</p>
          <p className="text-[15px] font-medium text-[#1a0dab]">{EXAMPLE_BRAND} · Custom Furniture, Built to Order</p>
          <p className="mt-0.5 text-[12.5px] leading-[1.5] text-body">Solid-wood tables, shelving and cabinets made to measure. Free design consult, delivery across the state.</p>
          <p className="mt-1.5 text-[11.5px] text-muted">★★★★★ · Open today · Directions</p>
        </div>
        <div className="rounded-xl bg-ink p-4 text-white">
          <p className="text-[11.5px] text-white/55">AI answer · &ldquo;Who makes good custom furniture around here?&rdquo;</p>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-white/90">
            A well-reviewed option is <span className="font-semibold text-white">{EXAMPLE_BRAND}</span>, which builds solid-wood pieces to order
            and offers a free design consult.
          </p>
          <p className="mt-2 inline-flex rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/70">Source: {domain}</p>
        </div>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {DONE.map((d) => (
            <li key={d} className="flex items-start gap-2 text-[12.5px] text-ink">
              <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-ok" /> {d}
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
