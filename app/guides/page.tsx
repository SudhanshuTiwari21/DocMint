import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";

const path = "/guides";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Guides – Document & Photo Tips for Govt Forms",
    description:
      "Guides on resizing images, compressing PDFs, and preparing documents for SSC, UPSC, and other government forms in India.",
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Guides – Document & Photo Tips for Govt Forms",
    description:
      "Guides on resizing images, compressing PDFs, and preparing documents for SSC, UPSC, and other government forms in India.",
    siteName: "Dockera",
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function GuidesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Guides</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Guides
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Tips and how-tos for document and photo requirements for government forms in India.
      </p>
      <p className="mt-6 text-slate-600 dark:text-slate-400">
        More guides will be added here. Use the tools and guides below in the meantime.
      </p>
      <div className="mt-10">
        <RelatedToolsLinks />
      </div>
    </article>
  );
}
