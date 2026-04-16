import "./global.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://68publishers.io"),
  title: {
    default: "'68 Publishers — Custom software development",
    template: "%s | '68 Publishers",
  },
  description:
    "A long-term technology partner for serious digital systems. Custom software, AI implementation, and systems designed to last.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
