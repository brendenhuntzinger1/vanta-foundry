import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { ServiceFlow, type FlowSubject } from "@/components/service-flow";
import { ServiceIcon } from "@/components/service-icon";
import { FLOWS } from "@/lib/flows";
import { getService } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(FLOWS).map((service) => ({ service }));
}

/** A path is either one service, or a named bundle with its own subject. */
function resolve(slug: string): { subject: FlowSubject; learnMore?: string } | null {
  const flow = FLOWS[slug];
  if (!flow) return null;
  if (flow.subject) return { subject: flow.subject };
  const s = getService(slug);
  return s ? { subject: s, learnMore: `/${s.slug}` } : null;
}

export async function generateMetadata(props: PageProps<"/start/[service]">): Promise<Metadata> {
  const { service } = await props.params;
  const r = resolve(service);
  if (!r) return {};
  return pageMetadata({ path: `/start/${service}`, title: `Get started: ${r.subject.name}`, description: `${FLOWS[service].promise} Answer a few quick questions and send your request on WhatsApp or by email.` });
}

export default async function StartPage(props: PageProps<"/start/[service]">) {
  const { service } = await props.params;
  const r = resolve(service);
  if (!r) notFound();

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
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-2"><ServiceIcon slug={r.subject.slug} /></span>
            Get started: {r.subject.name}
          </h1>
          <div className="mt-8">
            <ServiceFlow subject={r.subject} flow={FLOWS[service]} learnMore={r.learnMore} />
          </div>
        </div>
      </Container>
    </section>
  );
}
