import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/compress-pdf-for-govt-form";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "How to Compress PDF for Govt Form Upload | Dockera",
    description:
      "Steps to compress and reduce PDF file size for government form uploads in India. Free PDF compressor for SSC, UPSC, and other portals.",
    keywords: [
      "compress PDF for govt form",
      "reduce PDF size upload",
      "PDF compressor India",
      "SSC UPSC PDF size",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "How to Compress PDF for Govt Form Upload | Dockera",
    description:
      "Steps to compress and reduce PDF file size for government form uploads in India. Free PDF compressor for SSC, UPSC, and other portals.",
    siteName: "Dockera",
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I compress a PDF for government form upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use our PDF compressor tool. Upload your PDF, choose compression level, and download the reduced file. Processing happens in your browser—documents are not stored on our servers. Ensure the compressed PDF remains readable and meets the portal's size limit.",
      },
    },
    {
      "@type": "Question",
      name: "What is the typical PDF size limit for government portals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many SSC, UPSC, railway, and state recruitment portals limit PDF uploads to 1MB, 2MB, or 5MB. Check the official notification. For documents that exceed the limit, compress using our tool. For photo size limits (e.g. 100KB), use our resize image tools instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does compressing a PDF reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Light to moderate compression usually keeps text and images readable. Aggressive compression can reduce image quality inside the PDF. For certificates and forms, use moderate compression to balance size and clarity. Our tool lets you choose the level.",
      },
    },
  ],
};

export default function CompressPdfForGovtFormPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Compress PDF for govt form
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          How to Compress PDF for Govt Form Upload
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Government job and exam portals in India often limit PDF file size. Compressing your documents lets you stay within those limits without removing content.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Steps to compress
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">compress PDF online</Link> tool. Upload your PDF, select compression level (light for minimal quality loss, higher for smaller files), and download. Processing happens in your browser. For photo size limits (e.g. 100KB for applicant photo), use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize image to 100KB</Link> tool instead.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="tips-heading">
        <h2 id="tips-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Tips
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Check the official notification for exact size limits. Scan documents at reasonable resolution—very high DPI increases file size. For certificates and forms, moderate compression usually keeps everything readable. Need to merge multiple PDFs? Use our <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link> tool.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-compress-pdf-govt"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
