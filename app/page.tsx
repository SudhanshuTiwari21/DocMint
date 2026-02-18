import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "DocMint – Fix Your Documents in Seconds",
    description:
      "Resize images, compress PDFs, create passport photos and extract signatures — fast, private and secure. 100% browser-based. No sign-up required.",
    keywords: [
      "resize image",
      "compress PDF",
      "passport photo",
      "signature extractor",
      "document tools online",
      "image resizer",
      "PDF compressor",
    ],
    path: "/",
  }),
};

const tools = [
  {
    href: "/tools/resize-image-to-100kb",
    title: "Resize Image",
    description: "Resize images to 20KB, 50KB or 100KB for forms and uploads.",
  },
  {
    href: "/tools/pdf-compressor",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality. Secure and fast.",
  },
  {
    href: "/tools/passport-photo",
    title: "Passport Photo",
    description: "Create passport and visa photos with correct size and background.",
  },
  {
    href: "/tools/signature-extractor",
    title: "Signature Extractor",
    description: "Extract a clean signature from a photo or document.",
  },
] as const;

const steps = [
  {
    step: 1,
    title: "Choose a tool",
    description: "Pick the document or image tool you need from the grid above.",
  },
  {
    step: 2,
    title: "Upload or add your file",
    description: "Your file stays in your browser. Nothing is sent to our servers.",
  },
  {
    step: 3,
    title: "Download the result",
    description: "Get your resized image, compressed PDF or extracted signature instantly.",
  },
] as const;

const faqs = [
  {
    q: "How to resize image to 100KB?",
    a: "Use our Resize Image tool: upload your photo, select 100KB as the target size, and click Resize. The tool runs in your browser and outputs a file under 100KB. You can also choose 20KB or 50KB for stricter form limits.",
  },
  {
    q: "Is DocMint safe?",
    a: "Yes. DocMint is designed for privacy. Processing runs in your browser where possible, and we don’t store your files. No sign-up is required to use the tools.",
  },
  {
    q: "Do files get uploaded?",
    a: "For the resize, compress and signature tools, processing happens locally in your device. Your files never leave your device unless a specific tool clearly states otherwise.",
  },
  {
    q: "What formats are supported?",
    a: "We support common image formats (JPEG, PNG, WebP) for resizing and passport photos, and PDF for compression. Outputs are in standard formats accepted by most portals and forms.",
  },
] as const;

const trustItems = [
  { icon: "lock", label: "Private by design" },
  { icon: "user", label: "No sign-up required" },
  { icon: "bolt", label: "Instant processing" },
  { icon: "device", label: "Works on all devices" },
] as const;

function TrustIcon({ name }: { name: string }) {
  const className = "h-5 w-5 shrink-0 text-slate-500";
  if (name === "lock") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }
  if (name === "bolt") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  if (name === "device") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  }
  return null;
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/80"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Fix Your Documents in Seconds.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Resize images, compress PDFs, create passport photos and extract
            signatures — fast, private and secure.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tools/resize-image-to-100kb"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Resize Image
            </Link>
            <Link
              href="/tools/pdf-compressor"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Compress PDF
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            100% browser-based. Your files never leave your device.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="border-y border-slate-200/80 bg-slate-50/50"
        aria-label="Why trust DocMint"
      >
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80">
                  <TrustIcon name={icon} />
                </span>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools grid */}
      <section
        className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="tools-heading"
      >
        <h2 id="tools-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Document & image tools
        </h2>
        <p className="mt-2 text-slate-600">
          Choose a tool below. All processing runs in your browser when possible.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map(({ href, title, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                  {title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900">
                  Use tool
                  <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section
        className="border-t border-slate-200 bg-slate-50/50 py-16 sm:py-20"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="how-it-works-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            How it works
          </h2>
          <p className="mt-2 text-slate-600">
            Three simple steps to fix your documents.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map(({ step, title, description }) => (
              <li key={step} className="relative">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                  aria-hidden
                >
                  {step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="faq-heading"
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-slate-600">
          Quick answers about DocMint and our tools.
        </p>
        <dl className="mt-10 space-y-8">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <dt className="text-base font-semibold text-slate-900">{q}</dt>
              <dd className="mt-2 text-sm text-slate-600">{a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-slate-500">
          Need to resize for a specific form? See our guides on{" "}
          <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 underline underline-offset-2 hover:no-underline">
            SSC photo size
          </Link>
          {" "}and{" "}
          <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 underline underline-offset-2 hover:no-underline">
            UPSC photo size
          </Link>
          , or use the{" "}
          <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 underline underline-offset-2 hover:no-underline">
            resize image to 100KB
          </Link>{" "}
          tool.
        </p>
      </section>
    </div>
  );
}
