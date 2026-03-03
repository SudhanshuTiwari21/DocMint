import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/rrb-je-photo-signature-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "RRB JE Photo, Signature & Document Upload Guide | Dockera",
    description:
      "RRB JE photo 20-50KB, signature 10-20KB. Railway JE image requirements, format, common errors. Free tools for RRB JE form.",
    keywords: [
      "RRB JE photo size",
      "RRB JE image requirements",
      "RRB JE signature size",
      "railway JE photo size",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is RRB JE photo size in KB?",
    a: "RRB JE typically requires 20–50 KB for the candidate photo. Use our image resizer to hit the exact limit. Check the official RRB JE notification for any variation.",
  },
  {
    q: "What format does RRB JE accept for photo?",
    a: "JPG or JPEG only. PNG and other formats are rejected.",
  },
  {
    q: "RRB JE signature size—what are the limits?",
    a: "Signature is usually 10–20 KB, JPEG. Dimensions often 3.5 cm × 1.5 cm or 4 cm × 3 cm. Black ink on white paper (blue ink may not be accepted for some RRB exams).",
  },
  {
    q: "How to compress image for RRB JE form?",
    a: "Use our image resizer, set target to 50KB, and download. Ensure passport-style framing and JPEG format.",
  },
  {
    q: "Why does RRB JE reject my photo?",
    a: "Common causes: file over 50KB, wrong format, wrong dimensions, spectacles, patterned background. Use white/light background and resize to the exact KB range.",
  },
];

export default function RrbJePhotoSignatureRequirementsPage() {
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
          <li className="text-slate-900 dark:text-slate-100">RRB JE photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          RRB JE Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          RRB JE (Junior Engineer) recruitment attracts engineering graduates. Upload failures for photo size, signature limits, or document constraints are common. This guide covers RRB JE image and document specifications, typical errors, and how to fix them using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for RRB JE
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          RRB JE follows standard RRB specifications:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20 KB to 50 KB.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 3.5 cm (square). Approximately 200×200 to 500×500 pixels. Minimum 100 DPI recommended for clarity.</li>
          <li><strong>Format:</strong> JPG/JPEG only.</li>
          <li><strong>Background:</strong> White or light grey. No lines or ruled backgrounds.</li>
          <li><strong>Quality:</strong> Recent (within 3 months), clear, face occupying at least 50% of frame. No selfies, caps, sunglasses, or spectacles with glare.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for RRB JE
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature must be 10–20 KB, JPEG. Dimensions: 3.5×1.5 cm or 4×3 cm. Black ink on white paper. Signature must not touch borders. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> tool.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for RRB JE
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Engineering degree certificates, caste/EWS documents, and other proofs are uploaded as PDFs. Check the notification for size limits. Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to 45–48 KB. Use Smart Optimize.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only.</li>
          <li><strong>&quot;Signature blurred after compression&quot;</strong> — Start with a clean scan. Resize to 15–18 KB.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Read the RRB JE notification for exact specifications.</li>
          <li>Prepare passport-style photo. Resize to 20–50 KB.</li>
          <li>Create signature image. Resize to 10–20 KB.</li>
          <li>Prepare documents. Compress or merge PDFs as required.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-rrb-je" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway photo size limit</Link> and <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
