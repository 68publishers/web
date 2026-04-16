"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import type { I18nProviderProps } from "fumadocs-ui/i18n";

export function Provider({
  children,
  i18n,
}: {
  children: ReactNode;
  i18n?: I18nProviderProps;
}) {
  return (
    <RootProvider i18n={i18n} theme={{ defaultTheme: "dark" }}>
      {children}
    </RootProvider>
  );
}
