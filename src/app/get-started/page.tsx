import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { ServicePicker } from "@/components/service-picker";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { ServiceIcon } from "@/components/service-icon";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  path: "/get-started",
  title: "Get started",
  description: `Choose the ${SITE.name} services you need — payment processing, wholesale, factory-direct, white label, 3PL, website development or SEO & AI search — and send your request on WhatsApp or by email.`,
});

export default async function GetStarted(props: PageProps<"/get-started">) {
  const sp = await props.searchParams;
  const raw = sp.services;
  const initial = (Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split(",") : []).map((s) => s.trim()).filter(Boolean);

  return (
    <section className="pt-16 sm:pt-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Get started.</h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-body">
            Tap the services you want, then send them to us. Your message opens already written. No forms, no account.
          </p>
        </div>
        {initial.length === 0 && (
          <div className="mt-10">
            <p className="text-[14px] font-medium text-muted">Need one thing? Start there. It takes a minute.</p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/start/${s.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-ink">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-2 text-ink"><ServiceIcon slug={s.slug} /></span>
                    <span className="min-w-0 flex-1 text-[15.5px] font-medium text-ink">{s.name}</span>
                    <IconArrow className="text-muted transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-[14px] font-medium text-muted">Need several? Pick them all below and send one request.</p>
          </div>
        )}
        <div className={initial.length === 0 ? "mt-4" : "mt-12"}>
          <ServicePicker initial={initial} />
        </div>
      </Container>
    </section>
  );
}
