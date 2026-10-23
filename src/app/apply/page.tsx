import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { ApplyForm } from "./apply-form";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_OPTIONS } from "@/lib/application";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/apply",
  title: "Apply",
  description: `Apply for a ${SITE.name} account: wholesale, white label, fulfillment, payments setup or storefront development. Every application is reviewed by a person.`,
});

export default async function ApplyPage(props: PageProps<"/apply">) {
  const sp = await props.searchParams;
  const email = typeof sp.email === "string" ? sp.email.slice(0, 200) : "";
  const service = typeof sp.service === "string" ? SERVICE_OPTIONS.find((s) => s.toLowerCase().replace(/\s+/g, "-") === sp.service) : undefined;

  return (
    <section className="halo grain relative pt-32 sm:pt-40">
      <Container className="relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Apply</p>
          <h1 className="display mt-5 text-[46px] text-white sm:text-[64px]">One application.</h1>
          <p className="mt-6 max-w-md text-[16px] leading-8 text-muted">
            Tell us about your business and what you need. It covers any combination of services.
          </p>
          <ol className="mt-12 space-y-6 border-t border-line pt-10">
            {[
              ["A person reads it", "Not a scoring form. Someone on our team reviews every application."],
              ["We reply with specifics", "What we can supply, how we would set it up, and a quote."],
              ["You decide", "Nothing is committed until you approve a proposal."],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-5">
                <span className="font-mono text-[12px] leading-7 text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[16px] text-white">{t}</p>
                  <p className="mt-1 text-[14px] leading-6 text-muted">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="glass rounded-[24px] p-6 sm:p-10">
          <ApplyForm defaultEmail={email} defaultService={service} />
        </div>
      </Container>
    </section>
  );
}
