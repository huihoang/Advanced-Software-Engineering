import en from "@/languages/en/en.json";
import type { Locale } from "@/types/common";

type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = {
  en,
};

let currentLocale: Locale = "en";

export function setLocale(locale: Locale) {
  if (dictionaries[locale]) currentLocale = locale;
}

export function t(key: string, fallback?: string): string {
  const dict = dictionaries[currentLocale] ?? {};
  return dict[key] ?? fallback ?? key;
}
