import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | Dockera",
  description: "Log in to Dockera with your email. Passwordless login with one-time code.",
  robots: { index: false, follow: true },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
