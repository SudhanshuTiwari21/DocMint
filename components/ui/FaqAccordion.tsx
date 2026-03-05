type FaqItem = { q: string; a: string };

type FaqAccordionProps = {
  faqs: readonly FaqItem[] | FaqItem[];
  heading?: string;
  subheading?: string;
  accordionName?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * DaisyUI accordion for FAQ sections. Use on every page with FAQs.
 * @see https://daisyui.com/components/accordion/
 */
export function FaqAccordion({
  faqs,
  heading = "FAQs",
  subheading,
  accordionName = "faq-accordion",
  className = "",
  children,
}: FaqAccordionProps) {
  return (
    <section
      className={className}
      aria-labelledby={heading ? "faq-heading" : undefined}
    >
      {heading && (
        <h2
          id="faq-heading"
          className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl"
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p className="mt-2 text-slate-600 dark:text-slate-400">{subheading}</p>
      )}
      <div className="join join-vertical mt-10 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
        {faqs.map(({ q, a }, index) => (
          <div
            key={q}
            className="collapse collapse-arrow join-item border-0 border-b border-slate-200 dark:border-neutral-700 last:border-b-0 bg-white dark:bg-neutral-900"
          >
            <input
              type="radio"
              name={accordionName}
              defaultChecked={index === 0}
            />
            <div className="collapse-title min-h-0 py-4 text-base font-semibold text-slate-900 dark:text-slate-100 after:top-4">
              {q}
            </div>
            <div className="collapse-content text-sm text-slate-600 dark:text-slate-400">
              <p className="pt-0 pb-4">{a}</p>
            </div>
          </div>
        ))}
      </div>
      {children && (
        <div className="mt-10 text-sm text-slate-500 dark:text-slate-400">
          {children}
        </div>
      )}
    </section>
  );
}
