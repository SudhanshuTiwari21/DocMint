import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/sbi-clerk-photo-signature-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "SBI Clerk Photo, Signature & Document Upload Guide | Dockera",
    description:
      "SBI Clerk photo and signature size requirements. Image 20-100KB, format, common errors. Free tools to resize for SBI Clerk application.",
    keywords: [
      "SBI Clerk photo size",
      "SBI Clerk image requirements",
      "SBI Clerk signature size",
      "reduce image for SBI Clerk",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is SBI Clerk photo size in KB?",
    a: "SBI Clerk typically requires 20–100 KB for the candidate photo. Dimensions are often 4.5 cm × 3.5 cm. Use our image resizer to hit the exact limit.",
  },
  {
    q: "How to reduce image for SBI Clerk form?",
    a: "Use our image resizer, set target to 100KB (or 50KB if specified), and download. Ensure JPEG format and passport-style framing.",
  },
  {
    q: "What format does SBI Clerk accept for photo?",
    a: "JPEG or JPG only. PNG is not accepted.",
  },
  {
    q: "SBI Clerk signature size—what are the limits?",
    a: "Signature is typically 10–50 KB, 4 cm × 3 cm. Blue or black ink on white paper. Use our signature extractor and resize tools.",
  },
  {
    q: "Why does SBI Clerk reject my photo?",
    a: "Common causes: file over 100KB, PNG format, wrong dimensions, poor lighting, or outdated photo. Use JPEG and resize to the exact range.",
  },
];

export default function SbiClerkPhotoSignatureRequirementsPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li><Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">Guides</Link></li>
          <li aria-hidden>/</li>
          <li className="text-slate-900 dark:text-slate-100">SBI Clerk photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          SBI Clerk Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          SBI Clerk recruitment attracts a large number of applicants. Photo and signature upload failures—often due to size, format, or dimension issues—delay applications. This guide covers SBI Clerk image and document requirements, common errors, and how to fix them using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for SBI Clerk
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          SBI Clerk uses specifications similar to IBPS:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20–100 KB.</li>
          <li><strong>Dimensions:</strong> 4.5 cm × 3.5 cm (width × height).</li>
          <li><strong>Format:</strong> JPEG/JPG only.</li>
          <li><strong>Background:</strong> White or light-coloured.</li>
          <li><strong>Quality:</strong> Frontal view, clear, approximately 70% face coverage. Recent (within 3 months).</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for SBI Clerk
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature: 10–50 KB, 4 cm × 3 cm. Blue or black ink on white paper. Clear and legible. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 50KB</Link> or <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for SBI Clerk
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Educational certificates and proofs are uploaded as PDFs. Check the notification for size limits. Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to 95 KB when limit is 100 KB.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only.</li>
          <li><strong>&quot;Signature blurred&quot;</strong> — Clean scan, resize to 40–48 KB when limit is 50 KB.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Check the SBI Clerk notification for exact specifications.</li>
          <li>Prepare passport-style photo. Resize to 20–100 KB.</li>
          <li>Create signature image. Resize to 10–50 KB.</li>
          <li>Prepare documents. Compress or merge PDFs as required.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-sbi-clerk" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
