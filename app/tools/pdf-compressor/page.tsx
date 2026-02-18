import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Compress PDF Online India – Free PDF Compressor",
    description:
      "Reduce PDF file size for job applications and government portals. Secure compression—process in browser. Free, no sign-up required.",
    keywords: [
      "compress PDF online India",
      "reduce PDF size",
      "PDF compressor India",
      "small PDF for upload",
    ],
    path: "/tools/pdf-compressor",
  }),
};

export default function PdfCompressorPage() {
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
            PDF Compressor
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Compress PDF Online India
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Tool interface coming soon. This page is a placeholder for the PDF
        compressor tool.
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
