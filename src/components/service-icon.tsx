import { IconBoxes, IconBrowser, IconCard, IconFactory, IconTag, IconTruck } from "./icons";

const MAP = {
  "payment-processing": IconCard,
  wholesale: IconBoxes,
  "factory-direct": IconFactory,
  "white-label": IconTag,
  fulfillment: IconTruck,
  "website-development": IconBrowser,
} as const;

export function ServiceIcon({ slug, className = "" }: { slug: string; className?: string }) {
  const Icon = MAP[slug as keyof typeof MAP] ?? IconBoxes;
  return <Icon className={className} />;
}
