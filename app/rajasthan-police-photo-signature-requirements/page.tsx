import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/rajasthan-police-photo-signature-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Rajasthan Police Photo, Signature & Document Upload Guide | Dockera",
    description:
      "Rajasthan Police photo 50-100KB, signature 20-50KB. Recruitment image requirements, format, common errors. Free resize tools.",
    keywords: [
      "Rajasthan Police photo size",
      "Rajasthan Police image requirements",
      "Rajasthan Police signature size",
      "reduce image for Rajasthan Police",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is Rajasthan Police photo size in KB?",
    a: "Rajasthan Police typically requires 50–100 KB for the candidate photo. Dimensions 3.5 cm × 4.5 cm. Pixel range 240×320 to 480×640. Use our image resizer to hit the target.",
  },
  {
    q: "How to reduce image for Rajasthan Police form?",
    a: "Use our image resizer, set target to 100KB (or 50KB if minimum), and download. Ensure JPEG format. Photo must be latest colour photo (up to 6 months old).",
  },
  {
    q: "Rajasthan Police signature size—what are the limits?",
    a: "Signature is typically 20–50 KB, 7 cm × 2 cm (box). Pixel range 280×80 to 560×160. Black or dark blue pen on white paper. Must be scanned (not mobile photo).",
  },
  {
    q: "What format does Rajasthan Police accept?",
    a: "JPEG only for photo and signature.",
  },
];

export default function RajasthanPolicePhotoSignatureRequirementsPage() {
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
          <li className="text-slate-900 dark:text-slate-100">Rajasthan Police photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Rajasthan Police Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Rajasthan Police recruitment requires specific photo and signature specifications. Upload failures—often due to size, format, or the requirement for scanned (not mobile) signature—are common. This guide covers Rajasthan Police image and document requirements, typical errors, and fixes using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for Rajasthan Police
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Rajasthan Police specifications:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 50–100 KB.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 4.5 cm. Pixel range 240×320 to 480×640.</li>
          <li><strong>Format:</strong> JPEG only.</li>
          <li><strong>Background:</strong> White or light. 50% face coverage. No flash or sunglasses.</li>
          <li><strong>Quality:</strong> Latest colour photo (up to 6 months old).</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for Rajasthan Police
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature: 20–50 KB, 7 cm × 2 cm (box). Pixel range 280×80 to 560×160. Black or dark blue pen on white paper. Must be scanned—not a mobile photo. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 50KB</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for Rajasthan Police
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Certificates and proofs are uploaded as PDFs. Check the notification for size limits. Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>Image size exceeds limit</strong> — Resize to 95 KB when limit is 100 KB.</li>
          <li><strong>Signature not accepted</strong> — Rajasthan Police requires scanned signature, not mobile photo. Scan on white paper, then extract and resize.</li>
          <li><strong>Invalid file format</strong> — Use JPEG only.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Check the Rajasthan Police notification for exact specifications.</li>
          <li>Prepare passport-style photo. Resize to 50–100 KB.</li>
          <li>Scan signature on white paper (do not use mobile photo). Extract and resize to 20–50 KB.</li>
          <li>Prepare documents. Compress or merge PDFs as required.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-rajasthan-police" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
