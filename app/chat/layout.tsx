import type { ReactNode } from "react";
import { DocChatStructuredData } from "./DocChatStructuredData";

/** Matches Header `h-14`. Locks DocChat to the viewport so inner panes can scroll. */
const CHAT_VIEWPORT =
  "h-[calc(100dvh-3.5rem)] max-h-[calc(100dvh-3.5rem)] min-h-0 w-full flex-shrink-0";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-docchat-shell
      className={`flex min-h-0 flex-col overflow-hidden ${CHAT_VIEWPORT}`}
    >
      <DocChatStructuredData />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
