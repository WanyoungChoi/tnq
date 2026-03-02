import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const PREPARING_LOCALES = ["en", "ja"];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  if (PREPARING_LOCALES.includes(locale)) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="theme-main dark-mode">
          <div className="page bg-dark-1 min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container text-center light-content">
              <p className="section-title mb-0">준비중입니다</p>
            </div>
          </div>
        </div>
      </NextIntlClientProvider>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
