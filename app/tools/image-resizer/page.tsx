import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/tools/image-resizer";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Smart Image Optimizer – Resize, Compress, Auto-Size | Dockera",
    description:
      "Resize by dimensions, compress by quality, or auto-optimize to target file size. Free, private, no sign-up. Works entirely in your browser.",
    keywords: [
      "image optimizer",
      "resize image online",
      "compress image",
      "reduce image size",
      "smart image optimization",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Smart Image Optimizer – Resize, Compress, Auto-Size | Dockera",
    description:
      "Resize by dimensions, compress by quality, or auto-optimize to target file size. Free, private, no sign-up. Works entirely in your browser.",
    siteName: "Dockera",
    locale: "en_IN",
    type: "website",
  },
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Smart Image Optimizer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Smart Image Optimizer offers three modes: Resize (adjust dimensions), Compress (adjust quality), and Smart Optimize (automatically hit a target file size in KB). All processing happens in your browser—your images are never uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize an image to 100KB for government forms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select Smart Optimize, set the target to 100KB (or 50KB, 20KB), upload your image, and click Optimize. The tool compresses and optionally resizes to reach the exact file size. Our dedicated resize to 100KB page also offers this for government form uploads.",
      },
    },
    {
      "@type": "Question",
      name: "Is the image optimizer safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All processing happens locally in your browser. Your images are never sent to our servers, so you can use it for sensitive photos and documents with confidence.",
      },
    },
  ],
};

export default function ImageResizerPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools/image-resizer" className="hover:text-slate-900 dark:hover:text-slate-100">
              Image tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Smart Image Optimizer
          </li>
        </ol>
      </nav>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Smart Image Optimizer
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Resize by dimensions, compress by quality, or auto-optimize to a target file size. Free, private, no sign-up. Works entirely in your browser.
        </p>
      </header>
      <div className="mb-14">
        <SmartImageOptimizer
          defaultMode="smart"
          defaultTargetKb={100}
          seoDescription="Choose Resize for dimensions, Compress for quality, or Smart Optimize for automatic target file size."
          heading="Smart Image Optimizer"
        />
      </div>

      <section className="mb-12" aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Use cases
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Resize images for government forms (SSC, UPSC, railway), compress photos for faster uploads, or hit exact file size limits. For passport-style photos with correct dimensions, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>. For PDF size limits, try our <Link href="/tools/pdf-compressor" className="font-medium text-slate-900 underline dark:text-slate-100">PDF compressor</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-image-resizer"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
