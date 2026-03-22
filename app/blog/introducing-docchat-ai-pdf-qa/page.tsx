import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title:
      "Introducing DocChat — AI-Powered PDF Q&A for Exam Prep | Dockera Blog",
    description:
      "DocChat lets you upload PDFs and ask questions using AI. Built for students preparing for UPSC, SSC, banking, and competitive exams. Free to start.",
    keywords: [
      "DocChat",
      "AI PDF reader",
      "exam preparation tool",
      "PDF chatbot",
      "study with AI",
      "UPSC study tool",
      "SSC preparation",
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
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header>
        <time className="text-sm text-slate-500 dark:text-slate-400">
          March 3, 2026
        </time>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Introducing DocChat — AI-Powered PDF Q&A for Exam Prep
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Upload any PDF — textbooks, previous year papers, handwritten notes
          — and ask questions about it instantly. DocChat uses
          Retrieval-Augmented Generation (RAG) to give you accurate,
          context-aware answers from your own documents.
        </p>
      </header>

      <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
        <h2>Why DocChat?</h2>
        <p>
          Students preparing for competitive exams — UPSC CSE, SSC CGL, IBPS
          PO, RRB Group D, and state-level exams — often deal with hundreds
          of pages of study material. Finding specific answers in a
          500-page PDF is time-consuming. DocChat solves this by letting you
          ask questions in plain language and get answers directly from the
          document.
        </p>

        <h2>How it works</h2>
        <ol>
          <li>
            <strong>Upload a PDF</strong> — drag and drop or click to upload
            your study material.
          </li>
          <li>
            <strong>Ask a question</strong> — type any question about the
            document content.
          </li>
          <li>
            <strong>Get an answer</strong> — DocChat retrieves the most
            relevant sections and generates a concise answer.
          </li>
        </ol>

        <h2>Built for exam preparation</h2>
        <p>
          DocChat is designed with Indian competitive exam students in mind.
          Whether you&#39;re revising polity from Laxmikanth, practicing
          previous year question papers, or going through a coaching
          institute&#39;s notes — DocChat can help you study faster and more
          effectively.
        </p>

        <h2>Free and Pro plans</h2>
        <p>
          Free users get <strong>10 messages per day</strong> and can upload
          up to <strong>3 documents</strong>. This is enough to try DocChat
          and see if it fits your study routine.{" "}
          <Link href="/pricing" className="font-medium underline">
            Pro users
          </Link>{" "}
          get <strong>200 messages per day</strong>, unlimited document
          uploads, and larger file size support (up to 50 MB).
        </p>

        <h2>Privacy first</h2>
        <p>
          Your documents are processed securely. We use embeddings to index
          the content and do not share your files with anyone. You can delete
          your documents and all associated data at any time from the{" "}
          <Link href="/chat" className="font-medium underline">
            DocChat
          </Link>{" "}
          sidebar.
        </p>

        <h2>Try DocChat now</h2>
        <p>
          Head to{" "}
          <Link href="/chat" className="font-medium underline">
            DocChat
          </Link>{" "}
          to upload your first document and start asking questions. No credit
          card required — start for free.
        </p>

        <p>
          Also check out our{" "}
          <Link href="/tools" className="font-medium underline">
            free PDF and image tools
          </Link>{" "}
          for resizing images, compressing PDFs, and creating passport photos
          for government forms.
        </p>
      </div>

      <footer className="mt-12 border-t border-slate-200 pt-8 dark:border-neutral-800">
        <Link
          href="/blog"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          &larr; Back to blog
        </Link>
      </footer>
    </article>
  );
}
