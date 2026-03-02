import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en", "ja"],
  defaultLocale: "ko",
  localePrefix: "always",
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export const localeNames = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};
