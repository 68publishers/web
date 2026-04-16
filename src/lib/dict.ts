import "server-only";
import type { Locale } from "./i18n";

const dictionaries = {
  cs: {
    nav: {
      work: "Naše práce",
      services: "Služby",
      why: "Proč '68",
      blog: "Blog",
      docs: "Dokumentace",
      cta: "Pojďme si promluvit",
    },
    footer: {
      tagline: "Dlouhodobý technologický partner pro vážné digitální systémy.",
      rights: "Všechna práva vyhrazena.",
    },
    hero: {
      eyebrow: "Custom software development",
      headline: "Stavíme systémy, které mají vydržet.",
      claim: "Dlouhodobý technologický partner pro náročné B2B projekty. Žádný hype, žádné agenturní triky — jen solidní software.",
    },
  },
  en: {
    nav: {
      work: "Our Work",
      services: "Services",
      why: "Why '68",
      blog: "Blog",
      docs: "Docs",
      cta: "Let's talk",
    },
    footer: {
      tagline: "A long-term technology partner for serious digital systems.",
      rights: "All rights reserved.",
    },
    hero: {
      eyebrow: "Custom software development",
      headline: "We build systems designed to last.",
      claim: "A long-term technology partner for demanding B2B projects. No hype, no agency theatrics — just solid software.",
    },
  },
};

export type Dict = typeof dictionaries.cs;

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
