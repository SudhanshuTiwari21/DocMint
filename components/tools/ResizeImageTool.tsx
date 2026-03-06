"use client";

import { useCallback, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { checkAndUpdateDailyUsage } from "@/lib/usageLimit";
import { FileInput } from "@/components/ui/FileInput";
import { LimitReachedModal } from "@/components/ui/LimitReachedModal";

export type ResizeImageToolProps = {
  defaultTargetSize: number;
  seoTitle: string;
  seoDescription: string;
  heading: string;
};

const TOOL_ID = "resize-image";
const DAILY_LIMIT = 5;

const TARGET_OPTIONS = [
  { value: 20, label: "20 KB" },
  { value: 50, label: "50 KB" },
  { value: 100, label: "100 KB" },
  { value: -1, label: "Custom" },
] as const;

const MAX_DIMENSION = 1600;
const MIN_QUALITY = 0.1;
const QUALITY_STEP = 0.08;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

type UsageState = { allowed: boolean; count: number; limit: number };

export function ResizeImageTool({
  defaultTargetSize,
  seoTitle: _seoTitle,
  seoDescription,
  heading,
}: ResizeImageToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState(defaultTargetSize);
  const [customKb, setCustomKb] = useState<string>(String(Math.min(500, defaultTargetSize + 50)));
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [usage, setUsage] = useState<UsageState>({ allowed: true, count: 0, limit: DAILY_LIMIT });
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/premium-status", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setIsPremiumUser(Boolean(data.premium));
        setUserId(data.userId ?? null);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, false, userId));
  }, [userId]);

  const resetResult = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setResultBlob(null);
    setResultSize(null);
    setError(null);
  }, [previewUrl]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      resetResult();
      const f = e.target.files?.[0];
      if (!f) {
        setFile(null);
        return;
      }
      if (!f.type.startsWith("image/")) {
        setError("Please select an image file (JPEG, PNG, WebP, etc.).");
        setFile(null);
        return;
      }
      setFile(f);
      setError(null);
    },
    [resetResult]
  );

  const getTargetBytes = useCallback((): number => {
    const kb = targetKb === -1 ? parseInt(customKb, 10) : targetKb;
    if (isNaN(kb) || kb < 5 || kb > 500) return defaultTargetSize * 1024;
    return kb * 1024;
  }, [targetKb, customKb, defaultTargetSize]);

  const compressImage = useCallback(async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    if (!isPremiumUser && !usage.allowed) {
      setShowLimitModal(true);
      return;
    }
    const targetBytes = getTargetBytes();
    setIsProcessing(true);
    setError(null);
    resetResult();

    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("Failed to load image"));
        el.src = URL.createObjectURL(file);
      });

      let width = img.naturalWidth;
      let height = img.naturalHeight;
      const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      let quality = 0.92;
      let blob: Blob | null = null;
      let scaleFactor = 1;

      while (scaleFactor >= 0.25) {
        const w = Math.round(width * scaleFactor);
        const h = Math.round(height * scaleFactor);
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        quality = 0.92;
        while (quality >= MIN_QUALITY) {
          blob = await new Promise<Blob>((res) =>
            canvas.toBlob((b) => res(b!), "image/jpeg", quality)
          );
          if (blob && blob.size <= targetBytes) break;
          quality -= QUALITY_STEP;
        }
        if (blob && blob.size <= targetBytes) break;
        scaleFactor -= 0.15;
      }

      URL.revokeObjectURL(img.src);

      if (!blob || blob.size > targetBytes) {
        setError("Could not reduce image to target size. Try a larger target or a smaller image.");
        setIsProcessing(false);
        return;
      }

      if (!isPremiumUser) {
        setUsage(checkAndUpdateDailyUsage(TOOL_ID, DAILY_LIMIT, true, userId));
      }

      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setResultBlob(blob);
      setResultSize(blob.size);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, getTargetBytes, resetResult, isPremiumUser, usage.allowed, userId]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(resultBlob);
    a.download = file.name.replace(/\.[^.]+$/, "") + "-resized.jpg";
    a.click();
    URL.revokeObjectURL(a.href);
  }, [resultBlob, file]);

  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
      aria-labelledby="tool-heading"
    >
      <h2 id="tool-heading" className="sr-only">
        {heading}
      </h2>
      {seoDescription && (
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          {seoDescription}
        </p>
      )}
      <p className="mb-4 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
        <Lock className="h-4 w-4 shrink-0" aria-hidden />
        Your files are processed in your browser. Nothing is uploaded.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="file-input" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Upload image
          </label>
          <FileInput
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
            inputSize="md"
            variant="neutral"
            className="w-full"
          />
          {file && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Original size: {formatBytes(file.size)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="target-size" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Target size
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <select
              id="target-size"
              value={targetKb}
              onChange={(e) => {
                setTargetKb(Number(e.target.value));
                resetResult();
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-slate-700 dark:text-slate-100"
            >
              {TARGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {targetKb === -1 && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={customKb}
                  onChange={(e) => {
                    setCustomKb(e.target.value);
                    resetResult();
                  }}
                  className="w-24 rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-neutral-600 dark:bg-slate-700 dark:text-slate-100"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400">KB</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={compressImage}
          disabled={!file || isProcessing}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {isProcessing ? "Compressing…" : "Resize image"}
        </button>
      </div>

      {resultSize !== null && previewUrl && (
        <div className="mt-6 space-y-4 border-t border-slate-200 pt-6 dark:border-neutral-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Compressed size: <strong>{formatBytes(resultSize)}</strong>
            {file && <> (original: {formatBytes(file.size)})</>}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element -- Blob URL preview */}
            <img
              src={previewUrl}
              alt="Compressed preview"
              className="max-h-64 rounded-lg border border-slate-200 object-contain dark:border-neutral-600"
            />
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Download resized image
            </button>
          </div>
        </div>
      )}

      <LimitReachedModal
        open={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        toolName="image resizing"
      />
    </section>
  );
}
