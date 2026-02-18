"use client";

import { useEffect, useState } from "react";

// Two groups: "Document &" and "image tools" – brackets cover each group
const GROUPS = ["Document &", "image tools"];

const BLUR_PX = 1;
const ANIMATION_DURATION_MS = 500; // 0.5s
const PAUSE_BETWEEN_MS = 1000;    // 1s pause between animations
const INTERVAL_MS = ANIMATION_DURATION_MS + PAUSE_BETWEEN_MS;

export function TrueFocusHeading() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setFocusedIndex((i) => (i + 1) % GROUPS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <h2
      id="tools-heading"
      className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl inline-flex flex-wrap items-center gap-x-2 gap-y-1"
      aria-label="Document and image tools"
    >
      {GROUPS.map((text, i) => {
        const isFocused = reduceMotion || focusedIndex === i;
        return (
          <span
            key={`${text}-${i}`}
            className="relative inline-block rounded-sm transition-all ease-out py-1.5 px-3"
            style={{
              filter: isFocused ? "blur(0)" : `blur(${BLUR_PX}px)`,
              opacity: isFocused ? 1 : 0.7,
              transitionDuration: `${ANIMATION_DURATION_MS}ms`,
            }}
          >
            {text}
            {isFocused && !reduceMotion && (
              <span
                className="pointer-events-none absolute inset-0 flex rounded-sm"
                aria-hidden
              >
                {/* Bold four-corner brackets with padding around text */}
                <span className="absolute -top-0.5 left-0 h-3 w-3 border-l-[3px] border-t-[3px] border-slate-600 dark:border-slate-400 rounded-tl dark:drop-shadow-[0_0_6px_rgba(148,163,184,0.4)]" />
                <span className="absolute -top-0.5 right-0 h-3 w-3 border-r-[3px] border-t-[3px] border-slate-600 dark:border-slate-400 rounded-tr dark:drop-shadow-[0_0_6px_rgba(148,163,184,0.4)]" />
                <span className="absolute -bottom-0.5 left-0 h-3 w-3 border-l-[3px] border-b-[3px] border-slate-600 dark:border-slate-400 rounded-bl dark:drop-shadow-[0_0_6px_rgba(148,163,184,0.4)]" />
                <span className="absolute -bottom-0.5 right-0 h-3 w-3 border-r-[3px] border-b-[3px] border-slate-600 dark:border-slate-400 rounded-br dark:drop-shadow-[0_0_6px_rgba(148,163,184,0.4)]" />
              </span>
            )}
          </span>
        );
      })}
    </h2>
  );
}
