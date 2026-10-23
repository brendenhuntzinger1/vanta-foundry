import Link from "next/link";
import { Container } from "@/components/blocks";

export default function NotFound() {
  return (
    <section className="pt-24 pb-10">
      <Container className="text-center">
        <h1 className="h-display text-[44px] text-ink sm:text-[60px]">Page not found.</h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-[1.6] text-body">That page doesn&rsquo;t exist. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-dark h-11 px-6 text-[15px]">Home</Link>
          <Link href="/get-started" className="btn btn-light h-11 px-6 text-[15px]">Get started</Link>
          <Link href="/catalog" className="btn btn-light h-11 px-6 text-[15px]">Catalog</Link>
        </div>
      </Container>
    </section>
  );
}
