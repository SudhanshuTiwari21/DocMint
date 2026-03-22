"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

/**
 * Full-height chat (ChatGPT-style) should not sit above the marketing footer.
 */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/chat")) return null;
  return <Footer />;
}
