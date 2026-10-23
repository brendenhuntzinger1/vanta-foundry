/**
 * The application: one shape, validated identically on the client (for
 * messages) and the server (for trust).
 */
export const BUSINESS_TYPES = [
  "Research-supply brand",
  "Reseller or distributor",
  "Laboratory",
  "Starting a new brand",
] as const;

export const SERVICE_OPTIONS = ["Wholesale", "White label", "Fulfillment", "Payments", "Storefronts", "Launch"] as const;

export type Application = {
  name: string;
  email: string;
  company: string;
  website: string;
  businessType: string;
  services: string[];
  volume: string;
  message: string;
  attest: boolean;
};

const LIMITS: Record<keyof Omit<Application, "services" | "attest">, number> = {
  name: 120,
  email: 200,
  company: 160,
  website: 300,
  businessType: 60,
  volume: 1000,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(input: unknown): { ok: true; value: Application } | { ok: false; errors: Record<string, string> } {
  const raw = (input ?? {}) as Record<string, unknown>;
  const str = (k: keyof typeof LIMITS) => (typeof raw[k] === "string" ? (raw[k] as string).trim().slice(0, LIMITS[k]) : "");
  const value: Application = {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    website: str("website"),
    businessType: str("businessType"),
    volume: str("volume"),
    message: str("message"),
    services: Array.isArray(raw.services)
      ? raw.services.filter((s): s is string => typeof s === "string" && (SERVICE_OPTIONS as readonly string[]).includes(s))
      : [],
    attest: raw.attest === true,
  };

  const errors: Record<string, string> = {};
  if (!value.name) errors.name = "Your name, please.";
  if (!EMAIL_RE.test(value.email)) errors.email = "A work email we can reply to.";
  if (!value.company) errors.company = "Your company or brand name.";
  if (!(BUSINESS_TYPES as readonly string[]).includes(value.businessType)) errors.businessType = "Choose the closest fit.";
  if (value.services.length === 0) errors.services = "Pick at least one service.";
  if (!value.attest) errors.attest = "We can only work with research-use-only businesses.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function applicationText(a: Application) {
  return [
    `Name: ${a.name}`,
    `Email: ${a.email}`,
    `Company: ${a.company}`,
    `Website: ${a.website || "—"}`,
    `Business: ${a.businessType}`,
    `Services: ${a.services.join(", ")}`,
    `Volume and cadence: ${a.volume || "—"}`,
    "",
    a.message || "(no message)",
    "",
    "Attested: research use only, not for human or veterinary use.",
  ].join("\n");
}
