import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/ssc-chsl-image-requirements";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "SSC CHSL Photo, Signature & Document Upload Requirements | Dockera",
    description:
      "SSC CHSL photo 20-50KB, signature 10-20KB. Image requirements, format, common errors. Free tools to resize for SSC CHSL application.",
    keywords: [
      "SSC CHSL photo size",
      "SSC CHSL image requirements",
      "SSC CHSL signature size",
      "reduce image for SSC CHSL",
      "SSC CHSL upload error",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is SSC CHSL photo size in KB?",
    a: "SSC CHSL requires the candidate photo to be 20–50 KB. Use our image resizer to hit this range. Aim for 45–48 KB to avoid rejection from portal measurement differences.",
  },
  {
    q: "How to reduce image to 50KB for SSC CHSL?",
    a: "Use our image resizer, select the Exam or Smart Optimize mode, set target to 50KB, and download. The tool compresses in your browser. Ensure JPEG format and passport-style dimensions.",
  },
  {
    q: "What format is required for SSC CHSL photo?",
    a: "JPEG or JPG only. PNG, TIFF, or other formats are rejected. Our tools output JPEG. After resizing, ensure you upload the processed file, not the original.",
  },
  {
    q: "SSC CHSL signature size—what are the limits?",
    a: "Signature must be 10–20 KB, JPEG format. Dimensions typically 4 cm × 2 cm. Use our signature extractor to get a clean image, then resize to 20KB.",
  },
  {
    q: "Why does SSC CHSL reject my photo?",
    a: "Common reasons: file over 50KB or under 20KB, wrong format, wrong dimensions, spectacles, or blurry image. Resize to the exact range and use a passport-style photo with plain background.",
  },
  {
    q: "Can I use the same photo for SSC CGL and SSC CHSL?",
    a: "Yes. SSC CGL and CHSL share similar specifications. Ensure the photo meets 20–50 KB and JPEG format for both.",
  },
];

export default function SscChslImageRequirementsPage() {
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
          <li className="text-slate-900 dark:text-slate-100">SSC CHSL image requirements</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          SSC CHSL Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          SSC CHSL (Combined Higher Secondary Level) is a popular exam for 10+2 pass candidates. Many applicants face upload failures—photos rejected for size, signatures over the limit, or PDFs too large. This guide details SSC CHSL image requirements, document rules, and how to fix common errors using free browser-based tools.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for SSC CHSL
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          SSC CHSL uses the same general specifications as other SSC exams:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20 KB to 50 KB. Files above or below are rejected.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 4.5 cm (passport-style). Approximately 140×180 to 275×354 pixels.</li>
          <li><strong>Format:</strong> JPEG/JPG only.</li>
          <li><strong>Background:</strong> Plain, light (white preferred). No patterns.</li>
          <li><strong>Quality:</strong> Recent (within 3 months), clear, both ears visible, no spectacles or caps.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link>, <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link>, and <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo</Link> tools to meet these requirements.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for SSC CHSL
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Your signature must be:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 10–20 KB.</li>
          <li><strong>Dimensions:</strong> 4 cm × 2 cm (about 80×200 or 236×79 pixels).</li>
          <li><strong>Format:</strong> JPEG only.</li>
          <li><strong>Quality:</strong> Black or blue ink on white paper. Clear, legible. No smudges.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Common mistakes: scanning at high resolution (file exceeds 20 KB), or using ruled paper. Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> and <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> tool.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for SSC CHSL
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          SSC CHSL requires uploading educational certificates, caste/EWS documents, and other proofs. Check the notification for exact limits. Typical rules:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>PDF size:</strong> Often 200 KB to 2 MB per document.</li>
          <li><strong>Format:</strong> PDF for multi-page documents.</li>
          <li><strong>Merge:</strong> Combine multiple pages into one PDF where required.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>, <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link>, and <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link> tools.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize to 45–48 KB when limit is 50 KB. Use the image resizer with Smart Optimize.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — Use JPEG only. Convert other formats using our tools.</li>
          <li><strong>&quot;Signature blurred after compression&quot;</strong> — Start with a clean scan. Resize to 15–18 KB to keep clarity.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress with our PDF compressor. Use moderate settings for certificates.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Check the latest SSC CHSL notification for exact specifications.</li>
          <li>Prepare a passport-style photo. Use the passport photo tool for correct framing.</li>
          <li>Resize the photo to 20–50 KB. Aim for 45–48 KB.</li>
          <li>Create a clear signature image. Extract and resize to 10–20 KB.</li>
          <li>Prepare documents: scan clearly, compress PDFs if needed, merge multi-page files.</li>
          <li>Verify all files before submitting. Test uploads during the application window.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-ssc-chsl" className="mb-12" />

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        For a broader guide on government form images, see <Link href="/guides/how-to-resize-image-for-government-forms" className="font-medium text-slate-900 underline dark:text-slate-100">how to resize image for government forms</Link>.
      </p>

      <RelatedToolsLinks />
    </article>
  );
}
