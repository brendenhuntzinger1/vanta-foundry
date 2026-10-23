import Image from "next/image";
import Link from "next/link";
import { CATALOG } from "@/lib/catalog";
import { SERVICES } from "@/lib/services";
import { CardBrands } from "./card-brands";
import { IconArrow, IconCheck } from "./icons";
import { Vial } from "./demos/vial";

/**
 * The first thing under the headline: every service as a tile with its own
 * picture, so a visitor knows what we offer before scrolling.
 */
export function ServiceBento() {
  const pick = (slug: string) => CATALOG.find((p) => p.slug === slug)?.image;
  const vials = ["bpc-157", "nad", "ghk-cu"].map(pick).filter((x): x is string => !!x);
  const svc = (slug: string) => SERVICES.find((s) => s.slug === slug)!;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Tile slug="payment-processing" title={svc("payment-processing").name} body="Accept cards online, with a backup processor ready if one goes down.">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <CardBrands />
          <div className="w-full max-w-[230px] space-y-1.5 text-[12px]">
            <Row label="Main processor" tone="ok" status="Active" />
            <Row label="Backup processor" tone="muted" status="Ready" />
          </div>
        </div>
      </Tile>

      <Tile slug="wholesale" title={svc("wholesale").name} body="Our in-stock products in bulk, at wholesale prices.">
        <div className="relative h-full">
          {vials.map((src, i) => (
            <div
              key={src}
              className="absolute top-1/2 h-[150px] w-[112px] overflow-hidden rounded-xl border border-line bg-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)]"
              style={{ left: `calc(50% - 56px + ${(i - 1) * 74}px)`, zIndex: i === 1 ? 2 : 1, transform: `translateY(-50%) rotate(${(i - 1) * 6}deg) scale(${i === 1 ? 1.06 : 0.94})` }}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </div>
          ))}
        </div>
      </Tile>

      <Tile slug="factory-direct" title={svc("factory-direct").name} body="Large orders made to order at the manufacturer, at the lowest unit price.">
        <div className="flex h-full items-center justify-center">
          <ol className="flex items-center gap-2 text-[12px] text-ink">
            {["Factory", "Lot documented", "You"].map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={`rounded-lg px-3 py-2 font-medium ${i === 0 ? "bg-ink text-white" : i === 2 ? "bg-gold-tint text-gold" : "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]"}`}>{s}</span>
                {i < 2 && <IconArrow className="text-muted" />}
              </li>
            ))}
          </ol>
        </div>
      </Tile>

      <Tile slug="white-label" title={svc("white-label").name} body="Your brand on every unit, with your own label design.">
        <div className="flex h-full items-end justify-center gap-1 pb-1">
          <Vial brand="Your Brand" product="BPC-157" size="10 mg" style="noir" width={92} />
          <Vial brand="Your Brand" product="NAD+" size="500 mg" style="clinical" width={92} />
          <Vial brand="Your Brand" product="Semax" size="10 mg" style="bold" width={92} />
        </div>
      </Tile>

      <Tile slug="fulfillment" title={svc("fulfillment").name} body="We store your stock, pack every order and ship it as your brand.">
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-[240px] rounded-xl bg-white p-4 text-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            <p className="font-semibold text-ink">Order #1042 · Your Brand</p>
            <ul className="mt-2.5 space-y-1.5">
              {["Received", "Packed with your slip", "Shipped · tracking sent"].map((s) => (
                <li key={s} className="flex items-center gap-2 text-body">
                  <IconCheck width={14} height={14} className="text-ok" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Tile>

      <Tile slug="website-development" title="Custom websites" body="Hand-coded sites and stores, plus a developer team on call 24/7.">
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-x-3 top-3 overflow-hidden rounded-t-lg border border-b-0 border-line bg-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)]">
            <Image src="/showcase/vanta-labs-desktop.webp" alt="" width={2160} height={1147} sizes="360px" className="h-auto w-full" />
          </div>
        </div>
      </Tile>
    </ul>
  );
}

function Tile({ slug, title, body, children }: { slug: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={`/${slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-line-2 hover:shadow-[0_14px_36px_-20px_rgba(0,0,0,0.3)]">
        <div className="h-[190px] bg-bg-2" aria-hidden="true">{children}</div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{title}</p>
          <p className="mt-1 text-[14.5px] leading-[1.5] text-muted">{body}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
            Learn more <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </li>
  );
}

function Row({ label, tone, status }: { label: string; tone: "ok" | "muted"; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <span className="text-ink">{label}</span>
      <span className={`inline-flex items-center gap-1.5 ${tone === "ok" ? "text-ok" : "text-muted"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "ok" ? "bg-ok" : "bg-line-2"}`} />
        {status}
      </span>
    </div>
  );
}
