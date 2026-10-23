import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconCard = (p: P) => (<svg {...base} {...p}><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 9.5h19M6.5 15h4" /></svg>);
export const IconBoxes = (p: P) => (<svg {...base} {...p}><path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" /><path d="M3 9.5V15l9 4.5 9-4.5V9.5M12 14v5.5" /></svg>);
export const IconFactory = (p: P) => (<svg {...base} {...p}><path d="M3 20V10l5 3V10l5 3V6h4l1 14H3Z" /><path d="M7 17h2M12 17h2" /></svg>);
export const IconTag = (p: P) => (<svg {...base} {...p}><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.3" /></svg>);
export const IconTruck = (p: P) => (<svg {...base} {...p}><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>);
export const IconBrowser = (p: P) => (<svg {...base} {...p}><rect x="2.5" y="4" width="19" height="16" rx="2.5" /><path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01" /></svg>);
export const IconCheck = (p: P) => (<svg {...base} strokeWidth={2} {...p}><path d="m5 12.5 4.2 4L19 7" /></svg>);
export const IconArrow = (p: P) => (<svg {...base} width={16} height={16} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconMail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>);
export const IconPlus = (p: P) => (<svg {...base} width={16} height={16} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconMinus = (p: P) => (<svg {...base} width={16} height={16} {...p}><path d="M5 12h14" /></svg>);

/** The WhatsApp glyph, in its brand green by default. */
export function IconWhatsApp({ className = "", ...p }: P) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={className} {...p}>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06a6.73 6.73 0 0 1-3.37-2.94c-.25-.44.25-.41.72-1.36.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.17 1.75 2.67 4.24 3.74 1.57.68 2.19.74 2.98.62.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z"
      />
    </svg>
  );
}
