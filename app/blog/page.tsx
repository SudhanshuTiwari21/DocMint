import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Blog – Dockera",
    description:
      "Tips, guides, and updates from Dockera. Learn about image resizing, PDF tools, exam preparation, and AI-powered document Q&A.",
    path: "/blog",
  }),
};

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

const posts: BlogPost[] = [
  {
    slug: "introducing-docchat-ai-pdf-qa",
    title: "Introducing DocChat — AI-Powered PDF Q&A for Exam Prep",
    excerpt:
      "Upload any study material, textbook, or previous year paper and ask questions instantly. DocChat uses RAG technology to give you accurate answers from your own documents.",
    date: "2026-03-03",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Blog
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Product updates, tips, and guides from the Dockera team.
      </p>

      <div className="mt-12 space-y-10">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
          >
            <time className="text-sm text-slate-500 dark:text-slate-400">{post.date}</time>
            <span className="mx-2 text-slate-300 dark:text-slate-600">&middot;</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">{post.readTime}</span>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-900 dark:text-slate-100"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
