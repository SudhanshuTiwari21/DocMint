import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/rrb-alp-photo-signature-size";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "RRB ALP Photo, Signature & Document Upload Guide | Dockera",
    description:
      "RRB ALP photo and signature size requirements. Railway ALP image 20-50KB, format, common errors. Free tools to resize for RRB ALP form.",
    keywords: [
      "RRB ALP photo size",
      "railway ALP image requirements",
      "RRB ALP signature size",
      "reduce image for RRB ALP",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is RRB ALP photo size in KB?",
    a: "RRB ALP typically requires 20–50 KB for the candidate photo. Some notifications may allow up to 100–150 KB. Always check the official RRB ALP advertisement for the exact limit.",
  },
  {
    q: "What format is required for RRB ALP photo?",
    a: "JPG or JPEG only. Our tools output JPEG. Ensure the file extension is .jpg or .jpeg.",
  },
  {
    q: "RRB ALP signature size—what are the limits?",
    a: "Signature is usually 10–20 KB, JPEG. Dimensions often 3.5 cm × 1.5 cm or 4 cm × 2 cm. Black ink on white paper. Use our signature extractor and resize to 20KB.",
  },
  {
    q: "How to reduce image for RRB ALP application?",
    a: "Use our image resizer, set the target KB as per the notification (50KB or 100KB), and download. Use passport-style photo and JPEG format.",
  },
  {
    q: "Why does RRB ALP reject my photo?",
    a: "Common causes: file over limit, wrong format, wrong dimensions, spectacles, or patterned background. Resize to the exact KB limit and use a plain light background.",
  },
];

export default function RrbAlpPhotoSignatureSizePage() {
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
          <li className="text-slate-900 dark:text-slate-100">RRB ALP photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          RRB ALP Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          RRB ALP (Assistant Loco Pilot) recruitment sees high applicant numbers. Photo and signature uploads often fail due to size limits, format issues, or dimension mismatches. This guide covers RRB ALP image and document requirements, typical errors, and fixes using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for RRB ALP
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          RRB ALP notifications may specify:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> Usually 20–50 KB. Some notifications allow 50–150 KB. Check the advertisement.</li>
          <li><strong>Dimensions:</strong> Often 3.5 cm × 3.5 cm (square) or passport 3.5×4.5 cm. Pixel range may be 200×200 to 500×500 or 250×330 to 300×380 for portrait.</li>
          <li><strong>Format:</strong> JPG/JPEG only.</li>
          <li><strong>Background:</strong> White or light grey.</li>
          <li><strong>Quality:</strong> Recent (within 3 months), clear, face centred, no caps or spectacles.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for RRB ALP
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Signature: 10–20 KB, JPEG, typically 3.5×1.5 cm or 4×2 cm. Black ink on white paper. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> tool.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for RRB ALP
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
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to slightly under the limit. Use Smart Optimize.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only.</li>
          <li><strong>&quot;Photo dimension mismatch&quot;</strong> — Use passport photo tool for correct framing, then resize for file size.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Check the RRB ALP notification for exact photo and signature specs.</li>
          <li>Prepare passport-style photo. Resize to the required KB range.</li>
          <li>Create signature image. Resize to 10–20 KB.</li>
          <li>Prepare documents. Compress or merge PDFs as needed.</li>
          <li>Verify all files before submitting.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-rrb-alp" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/railway-photo-size-limit" className="font-medium text-slate-900 underline dark:text-slate-100">railway photo size limit</Link> and <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
