import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Signature Extractor – Extract Signature from Image",
    description:
      "Extract a clean signature from a photo or document. Use for digital forms and official documents. Free online tool.",
    keywords: [
      "signature extractor",
      "extract signature from image",
      "signature crop online",
    ],
    path: "/tools/signature-extractor",
  }),
};

export default function SignatureExtractorPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Signature Extractor
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Signature Extractor
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Tool interface coming soon. This page is a placeholder for the signature
        extractor tool.
      </p>
      <p className="mt-4">
        <Link
          href="/"
          className="font-medium text-slate-900 underline dark:text-slate-100"
        >
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
