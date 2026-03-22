import type { ReactNode } from "react";

/**
 * Keeps DocChat in a flex subtree with min-h-0 so only the inner messages area scrolls,
 * not the whole document, when the chat column is height-constrained.
 */
export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {children}
    </div>
  );
}
