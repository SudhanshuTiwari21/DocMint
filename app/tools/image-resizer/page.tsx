import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Resize Image for Govt Forms – Free Online Tool",
    description:
      "Resize your photo to exact dimensions for Aadhaar, PAN, and other Indian government forms. Free, private, no sign-up. Works in your browser.",
    keywords: [
      "resize image for govt forms",
      "government form photo size",
      "Aadhaar photo size",
      "PAN card photo dimensions",
      "resize image online India",
    ],
    path: "/tools/image-resizer",
  }),
};

export default function ImageResizerPage() {
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
            Image Resizer
          </li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Resize Image for Govt Forms
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Tool interface coming soon. This page is a placeholder for the image
        resizer tool.
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
