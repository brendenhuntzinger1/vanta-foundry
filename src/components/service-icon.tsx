import { IconBoxes, IconBrowser, IconCard, IconFactory, IconSearch, IconTag, IconTruck } from "./icons";

const MAP = {
  "payment-processing": IconCard,
  wholesale: IconBoxes,
  "factory-direct": IconFactory,
  "white-label": IconTag,
  fulfillment: IconTruck,
  "website-development": IconBrowser,
  "seo-ai-search": IconSearch,
} as const;

export function ServiceIcon({ slug, className = "" }: { slug: string; className?: string }) {
  const Icon = MAP[slug as keyof typeof MAP] ?? IconBoxes;
  return <Icon className={className} />;
}
