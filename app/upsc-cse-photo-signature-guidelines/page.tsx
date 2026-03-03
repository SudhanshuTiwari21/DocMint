import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/upsc-cse-photo-signature-guidelines";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "UPSC CSE Photo, Signature & Document Upload Guidelines | Dockera",
    description:
      "UPSC CSE photo 20-300KB, signature specs. Image requirements, format, common errors. Free tools to prepare UPSC Civil Services form.",
    keywords: [
      "UPSC CSE photo size",
      "UPSC photo signature guidelines",
      "UPSC image requirements",
      "compress PDF for UPSC",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is UPSC CSE photo size in KB?",
    a: "UPSC CSE allows 20–300 KB for the candidate photo. The recommended default is around 600×600 pixels. Use our image resizer to hit the target size. UPSC does not auto-resize, so you must meet the specs before upload.",
  },
  {
    q: "What are UPSC CSE photo dimensions in pixels?",
    a: "UPSC typically specifies square format, 550–1000 pixels. The default recommended is 600×600 pixels. Face should cover approximately 75% of the image.",
  },
  {
    q: "How to compress PDF for UPSC form?",
    a: "Use our PDF compressor. Upload your document, choose the compression level, and download. Ensure the compressed PDF remains legible. Check the notification for exact size limits per document.",
  },
  {
    q: "What is UPSC signature size?",
    a: "UPSC CSE allows 20–300 KB for signature. Dimensions are typically square, 350–550 pixels. White background. Some notifications require a triple signature. Check the latest guidelines.",
  },
  {
    q: "Why does UPSC reject my photo?",
    a: "Common causes: photo older than 10 days, wrong dimensions, file outside 20–300 KB, or missing candidate name and date at bottom (if required). Ensure compliance with the latest notification.",
  },
  {
    q: "Can I use the same photo for UPSC prelims and mains?",
    a: "Yes, if it meets the specification. UPSC CSE uses the same guidelines across stages. Ensure the photo is recent and complies with size and format requirements.",
  },
];

export default function UpscCsePhotoSignatureGuidelinesPage() {
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
          <li className="text-slate-900 dark:text-slate-100">UPSC CSE photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          UPSC CSE Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          UPSC Civil Services Examination (CSE) has strict photo and signature guidelines. UPSC does not auto-resize images, so applicants must ensure compliance before upload. This guide covers UPSC CSE image and document requirements, common errors, and how to fix them using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for UPSC CSE
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          UPSC CSE specifications differ from many other exams:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20–300 KB. Wider range than SSC or Railway.</li>
          <li><strong>Dimensions:</strong> Square format. 550–1000 pixels. Default recommended 600×600 pixels.</li>
          <li><strong>Format:</strong> JPG/JPEG only. 24-bit colour.</li>
          <li><strong>Background:</strong> White background required.</li>
          <li><strong>Face coverage:</strong> Approximately 75% of the image.</li>
          <li><strong>Recency:</strong> Photo must be less than 10 days old. Candidate name and date may need to be printed at the bottom—check the latest notification.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for UPSC CSE
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          UPSC CSE signature specifications:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20–300 KB.</li>
          <li><strong>Dimensions:</strong> Square format. 350–550 pixels.</li>
          <li><strong>Format:</strong> JPG/JPEG only. 24-bit colour.</li>
          <li><strong>Background:</strong> White background required.</li>
          <li><strong>Quality:</strong> Clear and legible. Some notifications require a triple signature—check the latest guidelines at upsc.gov.in.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link>. For strict size control, use <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 100KB</Link> or the image resizer.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for UPSC CSE
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          UPSC requires uploading educational certificates, caste/EWS documents, and other proofs. Check the notification for exact size limits per document. Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — UPSC allows up to 300 KB. Resize if over. Use our image resizer.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only.</li>
          <li><strong>&quot;Photo dimension mismatch&quot;</strong> — Use square format, 550–1000 pixels. Crop to 600×600 if needed.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Read the latest UPSC CSE notification at upsc.gov.in for exact specs. Requirements can change.</li>
          <li>Take a recent photo (within 10 days). Ensure white background and face coverage ~75%.</li>
          <li>Resize/crop to square 600×600 or within 550–1000 pixels. Keep file 20–300 KB.</li>
          <li>Prepare signature. White background, 350–550 pixels square, 20–300 KB.</li>
          <li>Prepare documents. Compress or merge PDFs as required by the notification.</li>
          <li>Verify all files before submitting. UPSC strictly verifies during document authentication.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-upsc-cse" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        See <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link> and <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">resize image for UPSC form</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
