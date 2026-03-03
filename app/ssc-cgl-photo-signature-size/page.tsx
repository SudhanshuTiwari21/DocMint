import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/ssc-cgl-photo-signature-size";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "SSC CGL Photo, Signature & Document Upload Requirements | Dockera",
    description:
      "SSC CGL photo size 20-50KB, signature 10-20KB. Dimensions, format, common errors & fixes. Resize for SSC CGL form using our free tools.",
    keywords: [
      "SSC CGL photo size",
      "SSC CGL image size KB",
      "SSC CGL signature size",
      "SSC CGL upload error",
      "reduce image for SSC CGL",
    ],
    path,
  }),
  openGraph: { url: canonicalUrl },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    q: "What is SSC CGL photo size in KB?",
    a: "SSC CGL requires the candidate photograph to be between 20 KB and 50 KB. The portal rejects files outside this range. Use our image resizer or resize to 50KB tool to hit the exact size.",
  },
  {
    q: "What are SSC CGL photo dimensions in pixels?",
    a: "SSC CGL typically specifies 3.5 cm × 4.5 cm, which corresponds to approximately 140×180 or 275×354 pixels at standard resolution. Use our passport photo tool for correct framing, then resize for file size.",
  },
  {
    q: "How to reduce image to 50KB for SSC CGL?",
    a: "Upload your photo to our image resizer, select Smart Optimize or Exam mode, set the target to 50KB, and download. Processing happens in your browser. Ensure JPEG format and correct dimensions.",
  },
  {
    q: "What is SSC CGL signature size in KB?",
    a: "SSC CGL signature must be 10–20 KB. Dimensions are typically 4 cm × 2 cm (about 80×200 pixels). Use our signature extractor to isolate your signature, then resize to 20KB.",
  },
  {
    q: "Why is my SSC CGL form photo not uploading?",
    a: "Common causes: file size over 50KB or under 20KB, wrong format (use JPEG only), incorrect dimensions, or blurry image. Resize to 45–48KB for a safety margin and ensure passport-style framing.",
  },
  {
    q: "Can I use the same photo for SSC CGL and SSC CHSL?",
    a: "Yes, if the photo meets the requirements for both. SSC CGL and CHSL typically use the same specs: 20–50 KB photo, 10–20 KB signature, JPEG format. Always check the latest notification.",
  },
];

export default function SscCglPhotoSignatureSizePage() {
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
          <li className="text-slate-900 dark:text-slate-100">SSC CGL photo and signature</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          SSC CGL Photo, Signature & Document Upload Requirements
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          SSC CGL (Combined Graduate Level) attracts lakhs of applicants. A common bottleneck is document upload—photos rejected for size, signatures too large, or PDFs exceeding limits. This guide covers exact photo and signature specifications, document rules, common errors, and how to fix them using free tools that work in your browser.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="photo-requirements">
        <h2 id="photo-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo Size Requirements for SSC CGL
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          SSC CGL requires a recent passport-style photograph. The official notification specifies:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 20 KB to 50 KB. Files outside this range are rejected.</li>
          <li><strong>Dimensions:</strong> 3.5 cm × 4.5 cm (approximately 140×180 to 275×354 pixels).</li>
          <li><strong>Format:</strong> JPEG/JPG only. PNG or other formats are not accepted.</li>
          <li><strong>Background:</strong> Plain, light-coloured (preferably white). No patterns or shadows.</li>
          <li><strong>Other:</strong> Both ears visible, neutral expression, no spectacles or headgear. Photo should be recent (within 3 months).</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Use our <Link href="/tools/image-resizer" className="font-medium text-slate-900 underline dark:text-slate-100">image resizer</Link> to set the exact KB target, or <Link href="/tools/compress-image" className="font-medium text-slate-900 underline dark:text-slate-100">compress image</Link> to reduce size. For correct framing, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link> first.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="signature-requirements">
        <h2 id="signature-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Signature Size Requirements for SSC CGL
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Your signature image must meet these specifications:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>File size:</strong> 10 KB to 20 KB.</li>
          <li><strong>Dimensions:</strong> 4 cm × 2 cm (approximately 80×200 or 236×79 pixels).</li>
          <li><strong>Format:</strong> JPEG only.</li>
          <li><strong>Requirements:</strong> Sign on white paper with black or blue ink. Clear and legible. No smudges.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Common mistakes: signature touching borders, using ruled paper, or scanning at too high a resolution (file exceeds 20KB). Use our <Link href="/tools/signature-extractor" className="font-medium text-slate-900 underline dark:text-slate-100">signature extractor</Link> to isolate the signature, then <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize to 20KB</Link> to stay within limits.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="document-requirements">
        <h2 id="document-requirements" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Document Upload Requirements for SSC CGL
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          SSC CGL requires uploading scanned certificates, caste/EWS documents, and other proofs. Typical rules:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-400">
          <li><strong>PDF size:</strong> Usually 200 KB to 2 MB per document. Check the notification for exact limits.</li>
          <li><strong>Format:</strong> PDF for multi-page documents. Combine multiple pages into one PDF if required.</li>
          <li><strong>Clarity:</strong> Scanned documents must be legible. Avoid blurry or low-resolution scans.</li>
        </ul>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          If your PDF is too large, use our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>. To merge multiple images into one PDF, use <Link href="/tools/merge-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">merge PDF</Link> or <Link href="/tools/jpg-to-pdf" className="font-medium text-slate-900 underline dark:text-slate-100">JPG to PDF</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="common-errors">
        <h2 id="common-errors" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Common Upload Errors & How to Fix Them
        </h2>
        <ul className="mt-4 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>&quot;Image size exceeds limit&quot;</strong> — Resize your photo to 45–48 KB when the limit is 50 KB. Use our image resizer with Smart Optimize. Some portals measure size slightly differently; a small buffer helps.</li>
          <li><strong>&quot;Invalid file format&quot;</strong> — SSC accepts JPEG only. Convert PNG or other formats to JPEG using our tools. Ensure the file extension is .jpg or .jpeg.</li>
          <li><strong>&quot;Signature blurred after compression&quot;</strong> — Use a clean scan of your signature on white paper. Resize to 15–18 KB to retain clarity while staying under 20 KB.</li>
          <li><strong>&quot;PDF file too large&quot;</strong> — Compress the PDF with our PDF compressor. For scanned documents, use moderate compression to balance size and readability.</li>
          <li><strong>&quot;Dimensions not as per specification&quot;</strong> — Use the passport photo tool for correct framing (3.5×4.5 cm), then resize for file size.</li>
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="step-by-step">
        <h2 id="step-by-step" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Step-by-Step Guide to Upload Documents Successfully
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-slate-600 dark:text-slate-400">
          <li>Read the official SSC CGL notification for the exact specs. Requirements can change slightly each cycle.</li>
          <li>Prepare your photo: passport-style, plain background, recent. Use the passport photo tool if needed.</li>
          <li>Resize the photo to 20–50 KB using our image resizer. Aim for 45–48 KB for a safety margin.</li>
          <li>Sign on white paper with black ink. Scan or photograph clearly. Extract and resize to 10–20 KB.</li>
          <li>Prepare documents: scan certificates, ensure PDFs are within size limits. Compress if necessary.</li>
          <li>Before submitting, verify each file: correct size, format, and clarity. Test upload during the application window.</li>
        </ol>
      </section>

      <FaqAccordion faqs={faqs} accordionName="faq-ssc-cgl" className="mb-12" />

      <RelatedToolsLinks />
    </article>
  );
}
