import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/rrb-group-d-photo-size";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "RRB Group D Photo, Signature & Document Upload Guide | Dockera",
    description:
      "RRB Group D photo 20-50KB, signature 10-20KB. Railway recruitment image requirements, format, common errors. Free resize tools.",
    keywords: [
      "RRB Group D photo size",
      "RRB Group D image requirements",
      "RRB Group D signature size",
      "railway photo size",
      "reduce image for RRB",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is RRB Group D photo size in KB?",
    a: "RRB Group D typically requires 20–50 KB for the candidate photo. Some notifications may specify 30 KB or 50 KB. Use our image resizer to hit the exact limit. Always check the official advertisement.",
  },
  {
    q: "What format is required for RRB Group D photo?",
    a: "JPG or JPEG only. PNG and other formats are rejected. Our tools output JPEG.",
  },
  {
    q: "RRB Group D signature size—what are the limits?",
    a: "Signature is usually 10–20 KB, JPEG format. Dimensions often 3.5 cm × 1.5 cm or 4 cm × 2 cm. Black ink on white paper. Use our signature extractor and resize to 20KB.",
  },
  {
    q: "How to reduce image for RRB Group D form?",
    a: "Upload to our image resizer, set target to 50KB (or 30KB if specified), and download. Ensure passport-style framing and JPEG format.",
  },
  {
    q: "Why does RRB reject my photo?",
    a: "Common causes: file over limit, wrong format, wrong dimensions, patterned background, or spectacles. Use white/light background and resize to the exact KB limit.",
  },
];

export default function RrbGroupDPhotoSizePage() {
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
          <li className="text-slate-900 dark:text-slate-100">RRB Group D photo size</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          RRB Group D Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          RRB Group D recruitment attracts millions of applicants. Upload failures due to photo size, signature limits, or document constraints are frequent. This guide covers RRB Group D image and document specifications, common errors, and how to fix them using free tools that run in your browser.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for RRB Group D
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          RRB Group D notifications typically specify:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20 KB to 50 KB. Some notifications may specify 30 KB.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 3.5 cm (square) or 3.5 cm × 4.5 cm. Approximately 200×200 to 500×500 pixels for square format.</li>
          <li><strong>Format:</strong> JPG/JPEG only.</li>
          <li><strong>Background:</strong> White or light grey. No patterns.</li>
          <li><strong>Quality:</strong> Recent (within 3 months), clear, face centred, no caps or spectacles.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for RRB Group D
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature specifications:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 10–20 KB.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 1.5 cm or 4 cm × 2 cm. Check the notification.</li>
          <li><strong>Format:</strong> JPG/JPEG only.</li>
          <li><strong>Quality:</strong> Black ink on white paper. Clear, legible. No ruled paper.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> tool.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for RRB Group D
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Certificates, caste/EWS documents, and other proofs are typically uploaded as PDFs. Check the notification for size limits (often 200 KB to 2 MB). Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to 45–48 KB when limit is 50 KB. Use Smart Optimize in the image resizer.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only. Convert PNG or other formats with our tools.</li>
          <li><strong>&quot;Photo not accepted&quot;</strong> — Ensure white/light background, correct dimensions, and no spectacles. Resize to the exact KB range.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Read the RRB Group D notification for exact photo and signature specs.</li>
          <li>Prepare passport-style photo. Resize to 20–50 KB (aim for 45–48 KB).</li>
          <li>Create signature image. Resize to 10–20 KB.</li>
          <li>Prepare documents: scan clearly, compress or merge PDFs as required.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-rrb-group-d" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link> and <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway photo size limit</Link> for related guides.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
