import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { HeroDemo } from "@/components/HeroDemo";
import { TrueFocusHeading } from "@/components/TrueFocusHeading";
import {
  Lock,
  User,
  Zap,
  Smartphone,
  ImageIcon,
  FileText,
  Camera,
  PenTool,
  ArrowRight,
  CheckCircle2,
  Layers,
  Scissors,
  FileType,
  Shrink,
  Crop,
  ArrowRightToLine,
  ArrowLeftFromLine,
} from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "DocMint – Free Online Document & Image Tools",
    description:
      "Every tool you need for documents and images in one place. Resize images for government forms, compress PDFs, create passport photos, extract signatures. 100% free, private, and easy to use.",
    keywords: [
      "resize image",
      "compress PDF",
      "passport photo",
      "signature extractor",
      "document tools online",
      "image resizer",
      "PDF compressor",
      "government form photo",
    ],
    path: "/",
  }),
};

const tools = [
  {
    href: "/tools/resize-image-to-100kb",
    title: "Resize Image",
    description: "Resize images to 20KB, 50KB or 100KB for government forms and uploads.",
    icon: ImageIcon,
  },
  {
    href: "/tools/compress-image",
    title: "Compress Image",
    description: "Reduce image file size without losing quality. Compress JPG, PNG, and WebP in bulk with ease.",
    icon: Shrink,
  },
  {
    href: "/tools/crop-image",
    title: "Crop Image",
    description: "Crop images to the exact size or area you need. Free and browser-based.",
    icon: Crop,
  },
  {
    href: "/tools/convert-to-png",
    title: "Convert to PNG",
    description: "Turn JPG, GIF, WebP, BMP, or TIF format images to PNG in bulk with ease.",
    icon: ArrowRightToLine,
  },
  {
    href: "/tools/convert-from-jpg",
    title: "Convert from JPG",
    description: "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
    icon: ArrowLeftFromLine,
  },
  {
    href: "/tools/pdf-compressor",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality. Secure and fast.",
    icon: FileText,
  },
  {
    href: "/tools/merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file. Reorder pages and merge in seconds.",
    icon: Layers,
  },
  {
    href: "/tools/split-pdf",
    title: "Split PDF",
    description: "Split one PDF into multiple files. Extract pages or split by range.",
    icon: Scissors,
  },
  {
    href: "/tools/pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable DOC or DOCX. Preserve layout and formatting.",
    icon: FileType,
  },
  {
    href: "/tools/word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOC or DOCX documents to PDF. Preserve layout and formatting.",
    icon: FileType,
  },
  {
    href: "/tools/pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert each PDF page to JPG or extract all images from a PDF.",
    icon: ImageIcon,
  },
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF in seconds. Adjust orientation and margins.",
    icon: FileText,
  },
  {
    href: "/tools/image-to-pdf",
    title: "Image to PDF",
    description: "Convert any image type — JPG, PNG, WebP, GIF, BMP, TIF — to PDF in seconds.",
    icon: ImageIcon,
  },
  {
    href: "/tools/passport-photo",
    title: "Passport Photo",
    description: "Create passport and visa photos with correct size and background.",
    icon: Camera,
  },
  {
    href: "/tools/signature-extractor",
    title: "Signature Extractor",
    description: "Extract a clean signature from a photo or document.",
    icon: PenTool,
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
    a: "Yes. DocMint is designed for privacy. Processing runs in your browser where possible, and we don't store your files. No sign-up is required to use the tools.",
  },
  {
    q: "Do files get uploaded?",
    a: "For the resize, compress and signature tools, processing happens locally on your device. Your files never leave your device unless a specific tool clearly states otherwise.",
  },
  {
    q: "What formats are supported?",
    a: "We support common image formats (JPEG, PNG, WebP) for resizing and passport photos, and PDF for compression. Outputs are in standard formats accepted by most portals and forms.",
  },
] as const;

const trustItems = [
  { icon: Lock, label: "Private by design" },
  { icon: User, label: "No sign-up required" },
  { icon: Zap, label: "Instant processing" },
  { icon: Smartphone, label: "Works on all devices" },
] as const;

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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero – heading and description closer to nav */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-6 lg:px-8 lg:pt-10 lg:pb-8">
          <div className="text-center">
            <h1
              id="hero-heading"
              className="animate-fade-in-up text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl"
            >
              Every tool you need for documents & images in one place
            </h1>
            <p className="animate-fade-in-up animate-stagger-1 mt-5 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 sm:text-l">
              Resize images for government forms, compress PDFs, create passport photos, and extract signatures. <strong>100% free</strong> and easy to use — no sign-up required.
            </p>
            <div className="animate-fade-in-up animate-stagger-2 mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools/resize-image-to-100kb"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 px-5 py-3.5 text-base font-semibold text-white dark:text-slate-900 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100"
              >
                Resize Image
              </Link>
              <Link
                href="/tools/pdf-compressor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-3.5 text-base font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100"
              >
                Compress PDF
              </Link>
              <Link
                href="/tools/passport-photo"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-3.5 text-base font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-slate-100"
              >
                Passport Photo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid – 4 cards per row, directly below hero */}
      <section
        className="mx-auto max-w-6xl px-4 pt-4 pb-10 sm:px-6 sm:pt-2 sm:pb-12 lg:px-8"
        aria-labelledby="tools-heading"
      >
        <TrueFocusHeading />
        <p className="mt-1.5 text-slate-600 dark:text-slate-400">
          All tools are free. Processing runs in your browser when possible.
        </p>
        <ul className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ href, title, description, icon: Icon }) => (
            <li key={href} className="flex">
              <Link
                href={href}
                className="landing-tool-card group flex h-full flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  {title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900 dark:text-slate-200">
                  Use tool
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Hero demo – GIF below cards (lazy-loaded); add public/hero-demo.gif or hero-demo.webm */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8" aria-label="DocMint in action">
        <div
          className="animate-fade-in-up rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 overflow-hidden shadow-lg"
          style={{ minHeight: "280px" }}
        >
          <div className="relative aspect-video w-full max-w-4xl mx-auto">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="border-y border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50"
        aria-label="Why trust DocMint"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-600/80 text-slate-600 dark:text-slate-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section
        className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-16 sm:py-20"
        aria-labelledby="how-it-works-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="how-it-works-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            How it works
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Three simple steps to fix your documents.
          </p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map(({ step, title, description }) => (
              <li key={step} className="relative flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-600/80"
                  aria-hidden
                >
                  {step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="faq-heading"
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Quick answers about DocMint and our tools.
        </p>
        <dl className="mt-10 space-y-8">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <dt className="flex items-start gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500 mt-0.5" aria-hidden />
                {q}
              </dt>
              <dd className="mt-2 ml-7 text-sm text-slate-600 dark:text-slate-400">{a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
          Need to resize for a specific form? See our guides on{" "}
          <Link href="/resize-image-for-ssc-form" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            SSC photo size
          </Link>
          {" "}and{" "}
          <Link href="/resize-image-for-upsc-form" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            UPSC photo size
          </Link>
          , or use the{" "}
          <Link href="/tools/resize-image-to-100kb" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
            resize image to 100KB
          </Link>{" "}
          tool.
        </p>
      </section>
    </div>
  );
}
