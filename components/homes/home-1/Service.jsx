"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function Service() {
  const t = useTranslations("main");

  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-lg-6 mb-md-60 mb-sm-30">
          <div className="row">
            <div className="col-lg-10">
              <p
                className="section-descr mb-50 mb-sm-30 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                {t("serviceIntro")}
              </p>
            </div>
          </div>
          <div
            className="section-descr wow fadeInUp services-strategy-list"
            data-wow-delay="0.55s"
          >
            <ul className="list-unstyled mb-0 text-gray">
              <li>- {t("serviceStrategy1")}</li>
              <li>- {t("serviceStrategy2")}</li>
              <li>- {t("serviceStrategy3")}</li>
              <li>- {t("serviceStrategy4")}</li>
              <li>- {t("serviceStrategy5")}</li>
              <li>- {t("serviceStrategy6")}</li>
            </ul>
          </div>
        </div>
        <div
          className="col-lg-6 d-flex wow fadeInLeft"
          data-wow-delay="0.55s"
          data-wow-offset={275}
        >
          <div className="services-content position-relative overflow-hidden rounded">
            <video
              src="/assets/videos/brand_strat.mp4"
              className="services-image w-100"
              style={{ objectFit: "cover", display: "block" }}
              autoPlay
              muted
              loop
              playsInline
              aria-label={t("serviceVideoAria")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
