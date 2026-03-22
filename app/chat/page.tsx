import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/seo";
import { ChatClient } from "@/components/chat/ChatClient";
import { DocChatStructuredData } from "./DocChatStructuredData";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "DocChat — Chat with PDF & Word Online (Free AI) | Dockera",
    description:
      "Free AI chat for PDF and Word (.docx). Ask questions, get summaries, and study with your notes—UPSC, SSC, banking & school prep. Answers grounded in your files. Unlimited messages.",
    keywords: [
      "DocChat",
      "chat with PDF online",
      "AI PDF chat",
      "ask questions about PDF",
      "PDF chatbot India",
      "chat with Word document online",
      "docx chat AI",
      "PDF Q&A tool",
      "document chatbot",
      "AI study assistant PDF",
      "UPSC notes chat AI",
      "SSC exam PDF assistant",
      "read PDF with AI",
      "summarize PDF online free",
      "Dockera DocChat",
      "RAG PDF chat",
      "PDF question answering",
    ],
    path: "/chat",
  }),
};

export default function ChatPage() {
  return (
    <>
      <DocChatStructuredData />
      <ChatClient />
    </>
  );
}
