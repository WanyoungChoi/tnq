import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export const localeNames = {
  ko: "KO",
  en: "EN",
};
