import "server-only";
import type { Locale } from "./config";
import cs from "./dictionaries/cs.json";
import en from "./dictionaries/en.json";

const dictionaries = { cs, en } as const;

export type Dictionary = typeof cs;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
