import { IconMail, IconWhatsApp } from "./icons";
import { SITE, emailLink, whatsappLink } from "@/lib/site";

/**
 * The two ways to reach us, as buttons. WhatsApp shows only when a number is
 * configured; email always shows, so there is never a dead end.
 */
export function ContactButtons({
  message = "Hi Vanta Foundry, I'd like to talk about your services.",
  subject = "Vanta Foundry enquiry",
  size = "md",
  single = false,
  className = "",
}: {
  message?: string;
  subject?: string;
  size?: "md" | "lg";
  /** One button: WhatsApp when configured, otherwise email. */
  single?: boolean;
  className?: string;
}) {
  const wa = whatsappLink(message);
  const pad = size === "lg" ? "h-12 px-6 text-[15px]" : "h-10 px-5 text-[14px]";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${pad}`}>
          <IconWhatsApp className="text-wa" /> WhatsApp us
        </a>
      )}
      {!(single && wa) && (
      <a href={emailLink(subject, message)} className={`btn ${wa ? "btn-light" : "btn-dark"} ${pad}`}>
        <IconMail /> Email {wa ? "us" : SITE.email}
      </a>
      )}
    </div>
  );
}

export { FloatingWhatsApp } from "./floating-whatsapp";
