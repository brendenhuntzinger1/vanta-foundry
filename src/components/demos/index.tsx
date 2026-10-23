import type { DemoKey } from "@/lib/services";
import { PaymentsDemo } from "./payments-demo";
import { WholesaleDemo } from "./wholesale-demo";
import { FactoryDemo } from "./factory-demo";
import { LabelDemo } from "./label-demo";
import { FulfillmentDemo } from "./fulfillment-demo";
import { WebsiteDemo } from "./website-demo";

export function Demo({ which }: { which: DemoKey }) {
  switch (which) {
    case "payments":
      return <PaymentsDemo />;
    case "wholesale":
      return <WholesaleDemo />;
    case "factory":
      return <FactoryDemo />;
    case "label":
      return <LabelDemo />;
    case "fulfillment":
      return <FulfillmentDemo />;
    case "website":
      return <WebsiteDemo />;
  }
}
