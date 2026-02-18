import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { buildOptimizedTitle } from "@/lib/titleOptimizer";
import { ResizeImageTool } from "@/components/tools/ResizeImageTool";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";

const path = "/resize-image-for-ssc-form";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: buildOptimizedTitle("Resize Image for SSC Form", { intent: "exam" }),
    description:
      "Resize image for SSC form online. Reduce photo to 20KB, 50KB or 100KB as required by SSC application. Free, private, works in your browser.",
    keywords: [
      "resize image for SSC form",
      "SSC form photo size",
      "SSC application photo 50kb",
      "compress photo for SSC",
      "SSC CGL photo size",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the photo size for SSC application form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SSC application forms typically require the candidate photograph to be within 20KB to 100KB, and often 50KB or 100KB. Use this tool to resize your image to the exact size specified in the SSC notification.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo for SSC form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo on this page, select the target size (e.g. 50KB or 100KB as per SSC guidelines), and click Resize image. The tool compresses the image in your browser. Download and use it in your SSC application.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use this tool for SSC form photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Processing happens entirely in your browser. Your photo is never uploaded to any server. You can safely resize your SSC application photo and other sensitive documents.",
      },
    },
  ],
};

export default function ResizeImageForSscFormPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools/image-resizer" className="hover:text-slate-900 dark:hover:text-slate-100">Image tools</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">Resize image for SSC form</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Resize Image for SSC Form Online – Photo 20KB to 100KB
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize image for SSC form online. Reduce your photo to 20KB, 50KB or 100KB as required by SSC application. Free, private, and works in your browser.
        </p>
      </header>

      <div className="mb-14">
        <ResizeImageTool
          defaultTargetSize={50}
          seoTitle="Resize Image for SSC Form | DocMint"
          seoDescription=""
          heading="Resize image for SSC form"
        />
      </div>

      <section className="mb-12" aria-labelledby="how-to-heading">
        <h2 id="how-to-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How to resize image for SSC form
        </h2>
        <ol className="mt-4 list-inside list-decimal space-y-2 text-slate-600 dark:text-slate-400">
          <li>Upload your passport-size or recent photograph.</li>
          <li>Select the size required by SSC (e.g. 50KB or 100KB—check the notification).</li>
          <li>Click &quot;Resize image&quot;. Compression runs in your browser.</li>
          <li>Download the resized image and use it in your SSC application.</li>
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="context-heading">
        <h2 id="context-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          SSC form photo size requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Staff Selection Commission (SSC) applications—including SSC CGL, CHSL, MTS, and others—require a recent photograph of the candidate. The notification usually specifies a maximum file size, often between 20KB and 100KB, and sometimes 50KB. If your photo is larger, the portal may reject the upload. Resizing your image to the exact limit avoids last-minute errors and ensures your application is submitted successfully. This tool lets you choose 20KB, 50KB, or 100KB (or a custom size) so you can match the requirement for your exam. All processing is done in your browser; nothing is uploaded. For a correctly framed passport-style photo, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. For document size limits, try the <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> or <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          FAQs
        </h2>
        <dl className="mt-4 space-y-6">
          <div>
            <dt className="font-semibold text-slate-900 dark:text-slate-100">What is the photo size for SSC application form?</dt>
            <dd className="mt-1 text-slate-600 dark:text-slate-400">
              SSC forms typically require the photograph to be within 20KB to 100KB (often 50KB or 100KB). Check the specific notification and use this tool to resize to the exact size specified.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900 dark:text-slate-100">How do I resize my photo for SSC form?</dt>
            <dd className="mt-1 text-slate-600 dark:text-slate-400">
              Upload your photo, select the target size (e.g. 50KB or 100KB as per SSC guidelines), and click &quot;Resize image&quot;. Download the resized image and use it in your SSC application.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900 dark:text-slate-100">Is it safe to use this tool for SSC form photo?</dt>
            <dd className="mt-1 text-slate-600 dark:text-slate-400">
              Yes. Processing is entirely in your browser. Your photo is never uploaded. Safe for SSC application photos and other sensitive documents.
            </dd>
          </div>
        </dl>
      </section>

      <RelatedToolsLinks />
    </article>
  );
}
