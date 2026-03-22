import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/seo";
import { ChatClient } from "@/components/chat/ChatClient";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "DocChat – Ask questions about your PDFs | Dockera",
    description:
      "Upload a PDF and chat with DocChat. Get answers grounded in your document—notes, reports, forms, or any text-based PDF. Free to start.",
    keywords: [
      "DocChat",
      "PDF chatbot",
      "AI PDF reader",
      "PDF Q&A",
      "document chat",
      "ask PDF questions",
    ],
    path: "/chat",
  }),
};

export default function ChatPage() {
  return <ChatClient />;
}
