export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "cs";

export const localeMeta: Record<Locale, { label: string; htmlLang: string }> = {
  cs: { label: "Čeština", htmlLang: "cs-CZ" },
  en: { label: "English", htmlLang: "en-US" },
};

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
