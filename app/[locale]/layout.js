import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const resolvedLocale = locale && routing.locales.includes(locale) ? locale : routing.defaultLocale;
  const messages = (await import(`@/messages/${resolvedLocale}.json`)).default;

  return (
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
