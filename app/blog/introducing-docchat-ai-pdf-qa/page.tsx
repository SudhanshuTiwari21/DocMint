import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/seo";
import { BookOpen } from "lucide-react";
import {
  NotionPageShell,
  NotionPageIcon,
  NotionBreadcrumb,
  NotionMetaRow,
  NotionTitle,
  NotionLead,
  NotionDivider,
  NotionH2,
  NotionP,
  NotionOl,
  NotionLi,
  NotionCallout,
  NotionInlineLink,
  NotionFooterNav,
} from "@/components/blog/NotionDocStyles";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title:
      "Introducing DocChat — AI-Powered PDF Q&A for Exam Prep | Dockera Blog",
    description:
      "DocChat lets you upload PDFs or Word (.docx) and ask questions with AI—UPSC, SSC, banking, and competitive exams. Unlimited chat; free tier includes indexed documents.",
    keywords: [
      "DocChat",
      "chat with PDF online",
      "AI PDF reader",
      "exam preparation tool",
      "PDF chatbot",
      "study with AI",
      "UPSC study tool",
      "SSC preparation",
      "Word document AI chat",
    ],
    path: "/blog/introducing-docchat-ai-pdf-qa",
  }),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Introducing DocChat — AI-Powered PDF Q&A for Exam Prep",
  datePublished: "2026-03-03",
  author: { "@type": "Organization", name: "Dockera" },
  publisher: { "@type": "Organization", name: "Dockera" },
  description:
    "DocChat lets you upload PDFs and ask questions using AI. Built for students preparing for UPSC, SSC, banking, and competitive exams.",
};

export default function DocChatBlogPost() {
  return (
    <NotionPageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <NotionBreadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { label: "Introducing DocChat" },
        ]}
      />

      <NotionPageIcon>
        <BookOpen className="h-7 w-7 text-[#37352f] dark:text-neutral-200" strokeWidth={1.5} />
      </NotionPageIcon>

      <NotionMetaRow date="March 3, 2026" readTime="4 min read" tag="Product" />

      <NotionTitle>Introducing DocChat — AI-Powered PDF Q&amp;A for Exam Prep</NotionTitle>

      <NotionLead>
        Upload textbooks, previous-year papers, or long notes as PDFs (or Word), then ask questions in plain language.
        Answers are grounded in your file using retrieval-augmented generation — not generic web text.
      </NotionLead>

      <NotionDivider />

      <NotionCallout title="At a glance">
        <p>
          DocChat is built for serious, document-heavy preparation: one place to read, ask, and revise without
          hunting through hundreds of pages manually.
        </p>
      </NotionCallout>

      <NotionH2>Why we built it</NotionH2>
      <NotionP>
        Candidates for UPSC CSE, SSC CGL, banking, railways, and state services routinely work from large PDFs —
        compilations, coaching notes, and official material. Search-within-PDF is brittle; generic chat does not
        know your file. DocChat keeps the conversation tied to what you uploaded.
      </NotionP>

      <NotionH2>How it works</NotionH2>
      <NotionOl>
        <NotionLi index={1}>
          <strong className="font-semibold text-[#37352f] dark:text-neutral-200">Start a chat</strong> — You can
          begin with a general question; no upload is required to open a thread.
        </NotionLi>
        <NotionLi index={2}>
          <strong className="font-semibold text-[#37352f] dark:text-neutral-200">Attach a document</strong> — When
          you are ready, use the + control in the composer to add a PDF or .docx to the same conversation.
        </NotionLi>
        <NotionLi index={3}>
          <strong className="font-semibold text-[#37352f] dark:text-neutral-200">Ask</strong> — Subsequent answers
          can use indexed excerpts from that file, in addition to general reasoning when appropriate.
        </NotionLi>
      </NotionOl>

      <NotionH2>Designed for exam preparation</NotionH2>
      <NotionP>
        The product defaults to clear, plain-text replies (no markdown noise) and is tuned for revision workflows:
        summaries, clarification of dense passages, and quick checks against your own material — whether that is
        polity, quantitative aptitude, or a technical handbook.
      </NotionP>

      <NotionH2>Plans</NotionH2>
      <NotionP>
        Free tier includes a daily message allowance and a limited number of document uploads so you can evaluate fit
        with your study routine.{" "}
        <NotionInlineLink href="/pricing">Pro</NotionInlineLink> raises daily limits and upload capacity for heavier
        use. See the pricing page for current numbers.
      </NotionP>

      <NotionH2>Data handling</NotionH2>
      <NotionP>
        Content is embedded for search over your documents; we do not use your files for training public models.
        You can manage uploads from the DocChat interface. For full legal terms, see{" "}
        <NotionInlineLink href="/privacy">Privacy</NotionInlineLink> and{" "}
        <NotionInlineLink href="/terms">Terms</NotionInlineLink>.
      </NotionP>

      <NotionDivider />

      <NotionH2>Try DocChat</NotionH2>
      <NotionP>
        Open <NotionInlineLink href="/chat">DocChat</NotionInlineLink> to start a thread. No card required for the
        free tier.
      </NotionP>
      <NotionP>
        Dockera also offers{" "}
        <NotionInlineLink href="/tools">free image and PDF utilities</NotionInlineLink> — resize, compress, convert —
        for forms and submissions alongside your prep.
      </NotionP>

      <NotionFooterNav href="/blog" label="Back to blog" />
    </NotionPageShell>
  );
}
