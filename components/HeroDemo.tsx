"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

/** Add public/hero-demo.gif (or hero-demo.webm via a <video> tag) for a 4K demo. */
export function HeroDemo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 text-slate-500 p-6 text-center"
        aria-hidden
      >
        <ImageIcon className="h-16 w-16 text-slate-300" />
        <p className="text-sm font-medium">Add your demo GIF or video here</p>
        <p className="text-xs max-w-sm">
          Place <code className="rounded bg-slate-200 px-1">hero-demo.gif</code> or{" "}
          <code className="rounded bg-slate-200 px-1">hero-demo.webm</code> in{" "}
          <code className="rounded bg-slate-200 px-1">public/</code> for a 4K-quality preview of
          resize/compress in action.
        </p>
      </div>
    );
  }

  return (
    <Image
      src="/hero-demo.gif"
      alt="DocMint in action: resizing an image and compressing a PDF in the browser"
      fill
      className="object-contain"
      sizes="(max-width: 1024px) 100vw, 1024px"
      loading="lazy"
      decoding="async"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
