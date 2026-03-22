import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getDefaultMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DocChatFab } from "@/components/DocChatFab";

export const metadata: Metadata = {
  ...getDefaultMetadata(),
  manifest: "/manifest.json",
  icons: [
    { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    { url: "/favicon-128.png", sizes: "128x128", type: "image/png" },
  ],
  appleWebApp: { capable: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const themeScript = `
(function() {
  var k = 'docera-theme';
  var v = localStorage.getItem(k);
  var theme;
  if (v === 'dark' || v === 'light') {
    theme = v;
  } else {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  var d = document.documentElement;
  if (theme === 'dark') {
    d.classList.add('dark');
    d.setAttribute('data-theme', 'dark');
  } else {
    d.classList.remove('dark');
    d.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <ThemeProvider>
          <Header />
          <main className="flex min-h-0 flex-1 flex-col basis-0">{children}</main>
          <ConditionalFooter />
          <DocChatFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
