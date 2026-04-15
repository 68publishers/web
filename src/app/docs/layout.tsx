import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import type { ReactNode } from "react";
import { docsSource } from "@/lib/source";

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <DocsLayout
        tree={docsSource.pageTree}
        nav={{ title: "'68 Publishers — Docs" }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
