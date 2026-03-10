"use client";
import React from "react";
import AnimatedText from "@/components/common/AnimatedText";
import { useTranslations } from "next-intl";

export default function Footer1({ dark = false }) {
  const t = useTranslations("footer");

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`page-section footer ${
        dark ? "bg-dark-2 light-content dark" : "bg-gray-light-1"
      } pb-30`}
    >
      <div className="footer--white-border">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row mb-50">
                <div className="col-lg-10">
                  <h4 className="section-title mb-0">
                    <span className="wow charsAnimIn" data-splitting="chars">
                      <AnimatedText text={t("companyName")} />
                    </span>
                  </h4>
                  <h4 className="section-title contact-intro-title mb-0">
                    <span className="wow charsAnimIn" data-splitting="chars">
                      <AnimatedText text={t("tagline")} />
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row mb-60 mb-sm-50">
                {/* Contact Item */}
                <div className="col-sm-6 mb-xs-30 d-flex align-items-stretch">
                  <div
                    className="alt-features-item border-left mt-0 wow fadeScaleIn"
                    data-wow-delay=".3s"
                  >
                    <div className="alt-features-icon">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
                      </svg>
                      <div className="alt-features-icon-s">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.445 17.827c-3.684 1.684-9.401-9.43-5.8-11.308l1.053-.519 1.746 3.409-1.042.513c-1.095.587 1.185 5.04 2.305 4.497l1.032-.505 1.76 3.397-1.054.516z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="alt-features-title">{t("phoneEmailTitle")}</h4>
                    <div className="alt-features-descr clearlinks">
                      <div>
                        <a href="mailto:tnq500@naver.com">tnq500@naver.com</a>
                      </div>
                      <div>
                        <a href="tel:043-844-1363">043-844-1363</a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Contact Item */}
                {/* Contact Item */}
                <div className="col-sm-6 d-flex align-items-stretch">
                  <div
                    className="alt-features-item border-left mt-0 wow fadeScaleIn"
                    data-wow-delay=".5s"
                  >
                    <div className="alt-features-icon">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" />
                      </svg>
                    </div>
                    <h4 className="alt-features-title">{t("locationTitle")}</h4>
                    <div className="alt-features-descr">
                      {t("address")}
                    </div>
                  </div>
                </div>
                {/* End Contact Item */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Text - Scroll to top (테두리 밖) */}
      <div className="container">
        <div className="row text-gray">
          <div className="col-md-6 clearfix text-md-end">
            <div className="local-scroll float-end mt-n20 mt-sm-10">
              <a href="#top" className="link-to-top" onClick={scrollToTop}>
                <i className="mi-arrow-up size-24" />
                <span className="visually-hidden">{t("scrollToTop")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
