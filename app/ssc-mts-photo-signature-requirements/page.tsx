import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/ssc-mts-photo-signature-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "SSC MTS Photo, Signature & Document Upload Requirements | Dockera",
    description:
      "SSC MTS photo 20-50KB, signature 10-20KB. Image requirements, format, common errors. Free tools to resize for SSC MTS form.",
    keywords: [
      "SSC MTS photo size",
      "SSC MTS image requirements",
      "SSC MTS signature size",
      "reduce image for SSC MTS",
      "SSC MTS upload error",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is SSC MTS photo size in KB?",
    a: "SSC MTS requires 20–50 KB for the candidate photo. Use our image resizer to hit this range. Aim for 45–48 KB for a safety margin.",
  },
  {
    q: "How to reduce image for SSC MTS form?",
    a: "Upload to our image resizer, set target to 50KB (or use Exam mode with SSC preset), and download. Ensure JPEG format and passport-style dimensions.",
  },
  {
    q: "What format does SSC MTS accept for photo?",
    a: "JPEG or JPG only. PNG and other formats are rejected. Our tools output JPEG.",
  },
  {
    q: "SSC MTS signature size—what are the limits?",
    a: "Signature must be 10–20 KB, JPEG, typically 4 cm × 2 cm. Use our signature extractor and resize to 20KB tool.",
  },
  {
    q: "Why does my SSC MTS photo get rejected?",
    a: "Common causes: file over 50KB or under 20KB, wrong format, spectacles, blurry image, or wrong dimensions. Resize to the exact range and use a passport-style photo.",
  },
];

export default function SscMtsPhotoSignatureRequirementsPage() {
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
          <li className="text-slate-900 dark:text-slate-100">SSC MTS photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          SSC MTS Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          SSC MTS (Multi Tasking Staff) is a large-scale recruitment for 10th pass candidates. Upload failures due to photo size, signature limits, or PDF constraints are common. This guide covers SSC MTS image and document requirements, typical errors, and fixes using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for SSC MTS
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          SSC MTS follows the standard SSC specification:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20 KB to 50 KB.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 4.5 cm. Approximately 140×180 to 275×354 pixels.</li>
          <li><strong>Format:</strong> JPEG/JPG only.</li>
          <li><strong>Background:</strong> Plain, light (white preferred). No patterns.</li>
          <li><strong>Quality:</strong> Recent, clear, both ears visible, no spectacles or headgear.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for SSC MTS
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature must be 10–20 KB, JPEG, 4 cm × 2 cm. Black or blue ink on white paper. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> tool.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for SSC MTS
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Certificates and proofs are usually uploaded as PDFs. Check the notification for size limits (often 200 KB to 2 MB per file). Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to 45–48 KB. Use Smart Optimize in the image resizer.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only.</li>
          <li><strong>&quot;Signature blurred&quot;</strong> — Clean scan, resize to 15–18 KB.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Read the SSC MTS notification for exact specifications.</li>
          <li>Prepare passport-style photo. Resize to 20–50 KB (aim for 45–48 KB).</li>
          <li>Create signature image. Resize to 10–20 KB.</li>
          <li>Prepare documents: scan clearly, compress or merge PDFs as needed.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-ssc-mts" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link> for a general guide.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
