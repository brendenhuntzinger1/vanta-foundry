import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { ServicePicker } from "@/components/service-picker";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/get-started",
  title: "Get started",
  description: `Choose the ${SITE.name} services you need — payment processing, wholesale, factory-direct, white label, 3PL or website development — and send your request on WhatsApp or by email.`,
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
        <div className="mt-12">
          <ServicePicker initial={initial} />
        </div>
      </Container>
    </section>
  );
}
