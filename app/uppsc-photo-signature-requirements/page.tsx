import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/uppsc-photo-signature-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "UPPSC Photo, Signature & Document Upload Guide | Dockera",
    description:
      "UPPSC photo 20-50KB, signature 10-20KB. PCS exam image requirements, format, common errors. Free tools for UPPSC application.",
    keywords: [
      "UPPSC photo size",
      "UPPSC image requirements",
      "UPPSC signature size",
      "reduce image for UPPSC",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is UPPSC photo size in KB?",
    a: "UPPSC (PCS) typically requires 20–50 KB for the candidate photo. Dimensions 3.5 cm × 4.5 cm. Use our image resizer to hit the exact limit.",
  },
  {
    q: "How to reduce image for UPPSC form?",
    a: "Use our image resizer, set target to 50KB, and download. Ensure JPEG format and passport-style dimensions. Photo should be recent (within 10 days).",
  },
  {
    q: "What format does UPPSC accept for photo?",
    a: "JPEG only. PNG and other formats are rejected.",
  },
  {
    q: "UPPSC signature size—what are the limits?",
    a: "Signature is typically 10–20 KB, 4 cm × 2 cm. Blue or black ink on white paper. Use our signature extractor and resize to 20KB.",
  },
  {
    q: "Why does UPPSC reject my photo?",
    a: "Common causes: outdated photo (must be within 10 days), selfie instead of passport photo, patterned background, wrong dimensions, or file over 50KB.",
  },
];

export default function UppscPhotoSignatureRequirementsPage() {
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
          <li className="text-slate-900 dark:text-slate-100">UPPSC photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          UPPSC Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          UPPSC (Uttar Pradesh Public Service Commission) PCS exams require specific photo and signature specifications. Many applicants face rejection due to outdated photos, wrong dimensions, or file size issues. This guide covers UPPSC image and document requirements, common errors, and fixes using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for UPPSC
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          UPPSC PCS specifications:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20–50 KB.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 4.5 cm. Approximately 250×250 to 275×354 pixels.</li>
          <li><strong>Format:</strong> JPEG only.</li>
          <li><strong>Background:</strong> Plain, light-coloured.</li>
          <li><strong>Face coverage:</strong> 50–60% of photo area. Recent colour photo (within 10 days), both ears visible, eyes open, proper lighting.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for UPPSC
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature: 10–20 KB, 4 cm × 2 cm (approximately 220×100 pixels). Plain white paper, blue or black ink. Clear and legible, no smudges. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for UPPSC
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
          <li><strong>Outdated photo</strong> — UPPSC requires photo within 10 days. Avoid selfies; use proper passport-style photo.</li>
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to 45–48 KB when limit is 50 KB.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only.</li>
          <li><strong>&quot;Wrong dimensions&quot;</strong> — Use passport photo tool for correct framing.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Check the UPPSC notification for exact specifications.</li>
          <li>Take a recent photo (within 10 days). Use passport-style framing.</li>
          <li>Resize to 20–50 KB. Aim for 45–48 KB.</li>
          <li>Create signature image. Resize to 10–20 KB.</li>
          <li>Prepare documents. Compress or merge PDFs as required.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-uppsc" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
