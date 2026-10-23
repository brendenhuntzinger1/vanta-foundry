import type { DemoKey } from "@/lib/services";
import { WholesaleDemo } from "./wholesale-demo";
import { LabelDemo } from "./label-demo";
import { FulfillmentDemo } from "./fulfillment-demo";
import { PaymentsDemo } from "./payments-demo";
import { StorefrontDemo } from "./storefront-demo";
import { LaunchDemo } from "./launch-demo";

export function Demo({ which }: { which: DemoKey }) {
  switch (which) {
    case "wholesale":
      return <WholesaleDemo />;
    case "label":
      return <LabelDemo />;
    case "fulfillment":
      return <FulfillmentDemo />;
    case "payments":
      return <PaymentsDemo />;
    case "storefront":
      return <StorefrontDemo />;
    case "launch":
      return <LaunchDemo />;
  }
}
