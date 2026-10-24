import Image from "next/image";

/** Live stores our team built, shown in the bento rotator and the website demo. */
export const SITES = [
  { key: "vanta", name: "Vanta Labs", industry: "Research supply · live store", url: "vantalabsresearch.com", real: true, href: "https://www.vantalabsresearch.com" },
  { key: "genesis", name: "Genesis Biomapping", industry: "Research supply · live store", url: "genesisbiomapping.co", real: true, href: "https://genesisbiomapping.co" },
] as const;

export type SiteKey = (typeof SITES)[number]["key"];

export function SiteView({ which }: { which: SiteKey }) {
  if (which === "vanta")
    return <Image src="/showcase/vanta-labs-desktop.webp" alt="The live Vanta Labs store" width={2160} height={1147} sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />;
  return <Image src="/showcase/genesis-desktop.webp" alt="The live Genesis Biomapping store" width={2160} height={1148} sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />;
}
