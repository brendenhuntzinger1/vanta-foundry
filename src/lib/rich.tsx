import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders `**bold**` spans and `[text](/path)` links in page and guide copy.
 * Links must be site paths (they start with "/"); nothing else is interpreted.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
        if (m) {
          return (
            <Link key={i} href={m[2]} className="text-ink underline underline-offset-2">
              {m[1]}
            </Link>
          );
        }
        return <Fragment key={i}>{bold(part)}</Fragment>;
      })}
    </>
  );
}

function bold(text: string) {
  return text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}
