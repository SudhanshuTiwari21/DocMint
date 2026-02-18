import Link from "next/link";
import type { InternalLink } from "@/lib/internalLinks";

type InternalLinksSectionProps = {
  title: string;
  links: InternalLink[];
  /** Heading level for section title. Default 2. Use 3 when section is nested under another H2. */
  headingLevel?: 2 | 3;
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "internal-links";
}

export function InternalLinksSection({
  title,
  links,
  headingLevel = 2,
}: InternalLinksSectionProps) {
  if (links.length === 0) return null;

  const id = `internal-links-${slugify(title)}`;
  const HeadingTag = `h${headingLevel}` as "h2" | "h3";

  return (
    <section
      className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50"
      aria-labelledby={id}
    >
      <HeadingTag
        id={id}
        className={
          headingLevel === 2
            ? "text-xl font-bold text-slate-900 dark:text-slate-100"
            : "text-lg font-bold text-slate-900 dark:text-slate-100"
        }
      >
        {title}
      </HeadingTag>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-medium text-slate-900 underline underline-offset-4 hover:no-underline dark:text-slate-100"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
