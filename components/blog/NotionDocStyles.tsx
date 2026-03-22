import type { ReactNode } from "react";
import Link from "next/link";

const titleClass =
  "font-[family-name:var(--font-blog-title)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-[#37352f] dark:text-[#ececec] sm:text-[2.75rem]";

const bodyClass = "font-[family-name:var(--font-blog-body)]";

export function NotionPageShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${bodyClass} mx-auto max-w-[720px] px-5 pb-20 pt-10 sm:px-8 md:pt-14`}>
      {children}
    </div>
  );
}

export function NotionPageIcon({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-3xl shadow-[0_1px_2px_rgba(15,15,15,0.08)] ring-1 ring-black/[0.06] dark:bg-[#2f2f2f] dark:ring-white/10">
      {children}
    </div>
  );
}

export function NotionBreadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-[#787774] dark:text-neutral-500">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[#e0e0e0] dark:text-neutral-600">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-[#37352f] dark:hover:text-neutral-300">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#37352f] dark:text-neutral-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function NotionMetaRow({
  date,
  readTime,
  tag,
}: {
  date: string;
  readTime: string;
  tag?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#787774] dark:text-neutral-500">
      <time dateTime={date}>{date}</time>
      <span className="text-[#e0e0e0] dark:text-neutral-600">·</span>
      <span>{readTime}</span>
      {tag && (
        <>
          <span className="text-[#e0e0e0] dark:text-neutral-600">·</span>
          <span className="rounded-md bg-[#ebebea] px-2 py-0.5 text-[12px] font-medium text-[#5c5c5c] dark:bg-neutral-800 dark:text-neutral-400">
            {tag}
          </span>
        </>
      )}
    </div>
  );
}

export function NotionTitle({ children }: { children: ReactNode }) {
  return <h1 className={titleClass}>{children}</h1>;
}

export function NotionLead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 text-[1.125rem] leading-[1.65] text-[#5c5c5c] dark:text-neutral-400">{children}</p>
  );
}

export function NotionDivider() {
  return <hr className="my-10 border-0 border-t border-[#e8e7e4] dark:border-neutral-800" />;
}

export function NotionH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 scroll-mt-24 text-[1.5rem] font-semibold tracking-tight text-[#37352f] first:mt-0 dark:text-[#ececec]">
      {children}
    </h2>
  );
}

export function NotionP({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[1.05rem] leading-[1.7] text-[#37352f]/95 dark:text-neutral-300">{children}</p>;
}

export function NotionOl({ children }: { children: ReactNode }) {
  return (
    <ol className="mt-4 list-none space-y-3 pl-0 text-[1.05rem] leading-[1.7] text-[#37352f]/95 dark:text-neutral-300">
      {children}
    </ol>
  );
}

export function NotionLi({ index, children }: { index: number; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#ebebea] text-[13px] font-semibold text-[#5c5c5c] dark:bg-neutral-800 dark:text-neutral-400">
        {index}
      </span>
      <span className="pt-0.5">{children}</span>
    </li>
  );
}

export function NotionCallout({
  children,
  title = "Summary",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="my-8 rounded-lg border border-[#e8e7e4] bg-white/80 py-4 pl-4 pr-4 shadow-[0_1px_2px_rgba(15,15,15,0.04)] dark:border-neutral-800 dark:bg-[#252525]">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b9b99] dark:text-neutral-500">
        {title}
      </p>
      <div className="mt-2 text-[0.98rem] leading-[1.65] text-[#37352f]/95 dark:text-neutral-300">{children}</div>
    </aside>
  );
}

export function NotionInlineLink({ href, children }: { href: string; children: ReactNode }) {
  const className =
    "border-b border-[#37352f]/25 pb-px font-medium text-[#37352f] transition hover:border-[#37352f] dark:border-white/30 dark:text-[#ececec] dark:hover:border-white/60";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function NotionFooterNav({ href, label }: { href: string; label: string }) {
  return (
    <footer className="mt-16 border-t border-[#e8e7e4] pt-8 dark:border-neutral-800">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-[14px] font-medium text-[#787774] transition hover:text-[#37352f] dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <span aria-hidden>←</span> {label}
      </Link>
    </footer>
  );
}
