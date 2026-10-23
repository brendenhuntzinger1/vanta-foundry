/**
 * Card network and wallet badges, drawn simply (no official artwork), to show at a glance
 * what a merchant account accepts.
 */
export function CardBrands({ size = "md", className = "" }: { size?: "sm" | "md"; className?: string }) {
  const h = size === "sm" ? 22 : 30;
  const w = Math.round(h * 1.55);
  const base = "inline-flex items-center justify-center rounded-[5px] border";
  const box = `${base} border-line-2 bg-white`;
  return (
    <span role="img" className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Visa, Mastercard, American Express, Discover, Apple Pay and Google Pay">
      <span className={box} style={{ width: w, height: h }}>
        <svg viewBox="0 0 48 16" width={w * 0.7} aria-hidden="true">
          <text x="24" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="15" fill="#1a1f71">VISA</text>
        </svg>
      </span>
      <span className={box} style={{ width: w, height: h }}>
        <svg viewBox="0 0 40 24" width={w * 0.62} aria-hidden="true">
          <circle cx="15" cy="12" r="9" fill="#eb001b" />
          <circle cx="25" cy="12" r="9" fill="#f79e1b" fillOpacity="0.9" />
        </svg>
      </span>
      <span className={`${base} border-[#2e77bb] bg-[#2e77bb]`} style={{ width: w, height: h }}>
        <svg viewBox="0 0 48 16" width={w * 0.78} aria-hidden="true">
          <text x="24" y="12" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#fff" letterSpacing="0.5">AMEX</text>
        </svg>
      </span>
      <span className={box} style={{ width: w, height: h }}>
        <svg viewBox="0 0 64 16" width={w * 0.86} aria-hidden="true">
          <text x="2" y="12" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10.5" fill="#231f20">DISC</text>
          <circle cx="36.5" cy="8.3" r="4.6" fill="#f58220" />
          <text x="42" y="12" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10.5" fill="#231f20">VER</text>
        </svg>
      </span>
      <span className={`${base} border-black bg-black`} style={{ width: w, height: h }}>
        <svg viewBox="0 0 52 20" width={w * 0.8} aria-hidden="true">
          <path d="M10.6 5.2c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.9-2.5.6-.7 1.6-1.2 2.4-1.2.1.9-.3 1.8-.9 2.6Zm.9 1.4c-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.2 1 8.3.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.2-3.3 0-2.1 1.7-3 1.8-3.1-1-1.4-2.5-1.6-3-1.7Z" fill="#fff" />
          <text x="17" y="15" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11.5" fill="#fff">Pay</text>
        </svg>
      </span>
      <span className={box} style={{ width: w, height: h }}>
        <svg viewBox="0 0 52 20" width={w * 0.8} aria-hidden="true">
          <text x="2" y="15" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12.5">
            <tspan fill="#4285f4">G</tspan>
          </text>
          <text x="15" y="15" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11.5" fill="#3c4043">Pay</text>
        </svg>
      </span>
    </span>
  );
}
