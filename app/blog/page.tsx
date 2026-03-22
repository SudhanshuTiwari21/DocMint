import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { BookOpen, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Blog – Dockera",
    description:
      "Product notes, guides, and updates from Dockera. Tools for documents, images, and focused study.",
    path: "/blog",
  }),
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
};

const posts: BlogPost[] = [
  {
    slug: "introducing-docchat-ai-pdf-qa",
    title: "Introducing DocChat — AI-Powered PDF Q&A for Exam Prep",
    excerpt:
      "A focused workflow for competitive exam preparation: ask questions against your own PDFs and notes, with answers grounded in what you uploaded.",
    date: "Mar 3, 2026",
    readTime: "4 min",
    tag: "Product",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[900px] px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <header className="border-b border-[#e8e7e4] pb-10 dark:border-neutral-800">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b9b99] dark:text-neutral-500">
          Dockera
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-blog-title)] text-4xl font-semibold tracking-tight text-[#37352f] dark:text-[#ececec] sm:text-[2.75rem]">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-[#5c5c5c] dark:text-neutral-400">
          Notes on product direction, document workflows, and tools for students and professionals in India.
        </p>
      </header>

      <section aria-label="Articles" className="mt-8">
        <h2 className="sr-only">Articles</h2>
        <div className="overflow-hidden rounded-xl border border-[#e8e7e4] bg-white shadow-[0_1px_2px_rgba(15,15,15,0.04)] dark:border-neutral-800 dark:bg-[#252525]">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#f1f0ed] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#9b9b99] dark:border-neutral-700 dark:text-neutral-500 sm:px-5">
            <span>Name</span>
            <span className="hidden text-right sm:block">Updated</span>
          </div>
          <ul>
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-[#f1f0ed] last:border-0 dark:border-neutral-700/80"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 px-4 py-5 transition-colors hover:bg-[#fbfbfa] sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-5 dark:hover:bg-neutral-800/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f0ed] text-[#37352f] dark:bg-neutral-800 dark:text-neutral-200">
                        <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div>
                        <span className="mb-1 inline-block rounded bg-[#ebebea] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#6f6f6f] dark:bg-neutral-700 dark:text-neutral-400">
                          {post.tag}
                        </span>
                        <p className="font-[family-name:var(--font-blog-title)] text-[1.05rem] font-semibold leading-snug text-[#37352f] group-hover:text-[#2a2926] dark:text-[#ececec] dark:group-hover:text-white">
                          {post.title}
                        </p>
                        <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[#787774] dark:text-neutral-500">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 pl-12 sm:flex-col sm:items-end sm:pl-0 sm:pt-1">
                    <time className="text-[13px] tabular-nums text-[#9b9b99] dark:text-neutral-500">{post.date}</time>
                    <span className="flex items-center gap-1 text-[13px] font-medium text-[#787774] opacity-0 transition group-hover:opacity-100 dark:text-neutral-400">
                      Open
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
