import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata, buildCanonicalUrl } from "@/lib/seo";
import { RelatedToolsLinks } from "@/components/RelatedToolsLinks";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const path = "/railway-photo-size-limit";
const canonicalUrl = buildCanonicalUrl(path);

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Railway Exam Photo Size Limit | Dockera",
    description:
      "Photo size and dimension requirements for railway recruitment forms. Resize your image to the required limit for railway applications. SSC, RRB, RRC.",
    keywords: [
      "railway photo size",
      "railway exam photo limit",
      "RRB photo size",
      "RRC application photo",
    ],
    path,
  }),
  openGraph: {
    url: canonicalUrl,
    title: "Railway Exam Photo Size Limit | Dockera",
    description:
      "Photo size and dimension requirements for railway recruitment forms. Resize your image to the required limit for railway applications.",
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
      name: "What is the photo size limit for railway recruitment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Railway recruitment boards (RRB, RRC) typically specify 20KB to 100KB for applicant photos. Exact limits vary by notification—check the official advertisement. Use our resize to 100KB, 50KB, or 20KB tools to meet the requirement.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize my photo for railway form?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your photo to our resize image tool. Choose the target size (100KB, 50KB, or 20KB) based on the form guidelines. The tool compresses and resizes in your browser. Download the result and use it in your application. No data is sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Which image format does railway recruitment accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most railway forms accept JPEG. Our resize tools output JPEG optimized for the size limit. Ensure your photo meets dimension requirements (usually passport-style) and has a light/neutral background as specified in the notification.",
      },
    },
  ],
};

export default function RailwayPhotoSizeLimitPage() {
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
            <Link href="/guides" className="hover:text-slate-900 dark:hover:text-slate-100">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Railway photo size limit
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Railway Exam Photo Size Limit
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Railway recruitment forms (RRB, RRC) often require a recent photograph within a specific file size—usually 20KB to 100KB. Resize your photo to the exact limit to avoid upload errors.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Photo requirements
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Check the official notification for the exact limit. Many forms specify 50KB or 100KB. Use our <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline dark:text-slate-100">resize image to 100KB</Link>, <Link href="/tools/resize-image-to-50kb" className="font-medium text-slate-900 underline dark:text-slate-100">50KB</Link>, or <Link href="/tools/resize-image-to-20kb" className="font-medium text-slate-900 underline dark:text-slate-100">20KB</Link> tools to meet the requirement. For passport-style dimensions and background, use our <Link href="/tools/passport-photo" className="font-medium text-slate-900 underline dark:text-slate-100">passport photo tool</Link>.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="how-to-heading">
        <h2 id="how-to-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How to resize
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Upload your photo, select the target size (20KB, 50KB, or 100KB), and download. Processing happens in your browser—your photo is never uploaded to our servers. For related exam photo guides, see <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline dark:text-slate-100">SSC</Link> and <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline dark:text-slate-100">UPSC</Link>.
        </p>
      </section>

      <FaqAccordion
        faqs={faqSchema.mainEntity.map((m) => ({
          q: m.name,
          a: (m as { acceptedAnswer: { text: string } }).acceptedAnswer.text,
        }))}
        heading="FAQs"
        accordionName="faq-railway-photo"
        className="mb-12"
      />

      <RelatedToolsLinks />
    </article>
  );
}
