/** A v4 UUID, also where crypto.randomUUID is missing (older in-app browsers). */
export function uuid(): string {
  const c: Partial<Crypto> | undefined = typeof crypto !== "undefined" ? crypto : undefined;
  if (c?.randomUUID) return c.randomUUID();
  const b = new Uint8Array(16);
  if (c?.getRandomValues) c.getRandomValues(b);
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** The short reference shown to visitors and the team (matches the database's). */
export const refFor = (id: string) => `VF-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
