"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string;
      subscription_id: string;
      name: string;
      handler: (response: {
        razorpay_subscription_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => void;
    }) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay script failed to load"));
    document.body.appendChild(script);
  });
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? "monthly";
  const [status, setStatus] = useState<"loading" | "error" | "checkout">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/subscription/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ plan: plan === "yearly" ? "yearly" : "monthly" }),
        });
        if (cancelled) return;
        if (res.status === 401) {
          window.location.href = "/login?redirect=" + encodeURIComponent("/pricing/checkout?plan=" + plan);
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Could not start checkout");
          setStatus("error");
          return;
        }
        const { subscription_id, key } = (await res.json()) as {
          subscription_id: string;
          key: string;
        };

        await loadRazorpayScript();
        const Razorpay = window.Razorpay;
        if (!Razorpay || cancelled) return;

        const rzp = new Razorpay({
          key,
          subscription_id,
          name: "Dockera",
          handler: async (response: {
            razorpay_subscription_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            const verifyRes = await fetch("/api/subscription/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (verifyRes.ok) {
              window.location.href = "/pricing?success=1";
            } else {
              const data = await verifyRes.json().catch(() => ({}));
              setError(data.error ?? "Payment verification failed");
              setStatus("error");
            }
          },
        });
        rzp.open();
        setStatus("checkout");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Checkout failed");
          setStatus("error");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [plan]);

  if (status === "loading" || status === "checkout") {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-center text-slate-600 dark:text-slate-400">
            {status === "checkout" ? "Complete payment in the popup." : "Opening checkout…"}
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Checkout failed
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{error}</p>
          <Link
            href="/pricing"
            className="btn btn-primary btn-block mt-6"
          >
            Back to pricing
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-center text-slate-600 dark:text-slate-400">Opening checkout…</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
