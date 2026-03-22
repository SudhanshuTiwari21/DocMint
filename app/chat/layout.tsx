import type { ReactNode } from "react";

/**
 * Keeps DocChat in a flex subtree with min-h-0 so only the inner messages area scrolls,
 * not the whole document, when the chat column is height-constrained.
 */
/** Matches Header `h-14` (3.5rem) — lock height so % / flex children don’t grow with content. */
const CHAT_MAIN_H = "h-[calc(100dvh-3.5rem)] max-h-[calc(100dvh-3.5rem)]";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-hidden ${CHAT_MAIN_H}`}
    >
      {children}
    </div>
  );
}
