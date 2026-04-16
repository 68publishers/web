import { defineI18n } from "fumadocs-core/i18n";
import { defineI18nUI } from "fumadocs-ui/i18n";

export const i18n = defineI18n({
  languages: ["cs", "en"],
  defaultLanguage: "cs",
  hideLocale: "default-locale",
});

export const i18nUI = defineI18nUI(i18n, {
  cs: { displayName: "Čeština" },
  en: { displayName: "English" },
});

export type Locale = (typeof i18n)["languages"][number];
