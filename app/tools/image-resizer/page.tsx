import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { SmartImageOptimizer } from "@/components/tools/SmartImageOptimizer";

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
    path: "/tools/image-resizer",
  }),
};

export default function ImageResizerPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-900 dark:text-slate-100">
            Smart Image Optimizer
          </li>
        </ol>
      </nav>
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
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
    </article>
  );
}
