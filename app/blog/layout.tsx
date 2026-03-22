import type { ReactNode } from "react";
import { Lora, Source_Serif_4 } from "next/font/google";

const fontTitle = Lora({
  subsets: ["latin"],
  variable: "--font-blog-title",
  display: "swap",
});

const fontBody = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-blog-body",
  display: "swap",
});

/**
 * Warm, document-style canvas for blog routes (Notion-like reading surface).
 */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${fontTitle.variable} ${fontBody.variable} min-h-screen bg-[#f7f6f3] font-[family-name:var(--font-blog-body)] text-[#37352f] antialiased dark:bg-[#191919] dark:text-[#e6e6e6]`}
    >
      {children}
    </div>
  );
}
