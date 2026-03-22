import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/seo";
import { ChatClient } from "@/components/chat/ChatClient";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "DocChat – AI PDF Q&A for Exam Prep | Dockera",
    description:
      "Upload any PDF and ask questions with DocChat. AI-powered document Q&A for competitive exam prep – UPSC, SSC, banking, and more. Free to start.",
    keywords: [
      "DocChat",
      "PDF chatbot",
      "AI PDF reader",
      "exam preparation",
      "UPSC study",
      "SSC preparation",
      "PDF Q&A",
      "document chat",
    ],
    path: "/chat",
  }),
};

export default function ChatPage() {
  return <ChatClient />;
}
