import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | Dockera",
  description: "Create your Dockera account. Passwordless signup with email verification.",
  robots: { index: false, follow: true },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
