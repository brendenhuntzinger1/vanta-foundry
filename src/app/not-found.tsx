import Link from "next/link";
import { Container } from "@/components/blocks";

export default function NotFound() {
  return (
    <section className="halo relative pt-40 pb-10">
      <Container className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-5 text-[48px] text-white sm:text-[64px]">Not on file.</h1>
        <p className="mx-auto mt-5 max-w-md text-[15.5px] leading-7 text-muted">That page doesn&rsquo;t exist. The services and guides do.</p>
        <div className="mt-9 flex justify-center gap-3">
          <Link href="/" className="btn-gold rounded-full px-6 py-3 text-[14px]">Home</Link>
          <Link href="/guides" className="btn-ghost rounded-full px-6 py-3 text-[14px]">Guides</Link>
        </div>
      </Container>
    </section>
  );
}
