"use client";

import { useLocale, useTranslations } from "next-intl";

const LABEL_FALLBACK = "㈜ TNQ";

export default function Map({ address: addressProp }) {
  const locale = useLocale();
  const t = useTranslations("footer");
  const address = addressProp ?? t("address");
  const label = typeof addressProp === "object" && addressProp?.label != null ? addressProp.label : LABEL_FALLBACK;
  const addressStr = typeof address === "string" ? address : address.address ?? t("address");
  const hl = locale === "en" ? "en" : "ko";
  const embedUrl =
    "https://www.google.com/maps?q=" + encodeURIComponent(addressStr) + "&output=embed&hl=" + hl;
  const searchUrl =
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addressStr) + "&hl=" + hl;

  return (
    <>
      <div className="position-relative w-100" style={{ paddingBottom: "56.25%", minHeight: 300 }}>
        <iframe
          src={embedUrl}
          className="position-absolute top-0 start-0 w-100 h-100"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title={t("mapIframeTitle")}
        />
      </div>
      <div className="container py-4">
        <p className="text-gray mb-1">
          <strong>{label}</strong>
        </p>
        <p className="text-gray mb-0">{addressStr}</p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-mod btn-small btn-round btn-hover-anim mt-3"
        >
          <span>{t("mapViewOnGoogle")}</span>
        </a>
      </div>
    </>
  );
}
