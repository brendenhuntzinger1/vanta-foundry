import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { ServiceFlow } from "@/components/service-flow";
import { ServiceIcon } from "@/components/service-icon";
import { FLOWS } from "@/lib/flows";
import { SERVICES, getService } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.filter((s) => FLOWS[s.slug]).map((s) => ({ service: s.slug }));
}

export async function generateMetadata(props: PageProps<"/start/[service]">): Promise<Metadata> {
  const { service } = await props.params;
  const s = getService(service);
  if (!s) return {};
  return pageMetadata({ path: `/start/${s.slug}`, title: `Get started: ${s.name}`, description: `${s.short} Answer a few quick questions and send your request on WhatsApp or by email.` });
}

export default async function StartPage(props: PageProps<"/start/[service]">) {
  const { service } = await props.params;
  const s = getService(service);
  const flow = FLOWS[service];
  if (!s || !flow) notFound();

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <div className="mx-auto max-w-[760px]">
        <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-ink">Get started</span>
        </nav>
        <h1 className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-2"><ServiceIcon slug={s.slug} /></span>
          Get started: {s.name}
        </h1>
        <div className="mt-6">
          <ServiceFlow service={s} flow={flow} />
        </div>
        </div>
      </Container>
    </section>
  );
}
