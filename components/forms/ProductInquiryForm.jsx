"use client";

import React, { useRef, useState, useEffect } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

export default function ProductInquiryForm() {
  const t = useTranslations("customerCenter");
  const formRef = useRef(null);
  const openedAtRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  const getRecaptchaResponse = () => {
    if (!RECAPTCHA_SITE_KEY || typeof window.grecaptcha === "undefined") return "";
    try {
      return window.grecaptcha.getResponse() || "";
    } catch {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = formRef.current;
    if (!form) return;

    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const message = form.message?.value?.trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", text: t("errorRequired") });
      return;
    }

    const recaptchaToken = getRecaptchaResponse();
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setStatus({ type: "error", text: t("errorRecaptcha") });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/product-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company_website: form.company_website?.value ?? "",
          _submitTime: openedAtRef.current,
          _recaptchaToken: recaptchaToken || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", text: data.error || t("errorSendFailed") });
      if (RECAPTCHA_SITE_KEY && typeof window.grecaptcha?.reset === "function") {
        window.grecaptcha.reset();
      }
      return;
    }

    setStatus({ type: "success", text: t("successSent") });
    form.reset();
    openedAtRef.current = Date.now();
    if (RECAPTCHA_SITE_KEY && typeof window.grecaptcha?.reset === "function") {
      window.grecaptcha.reset();
    }
  } catch {
    setStatus({ type: "error", text: t("errorNetwork") });
    if (RECAPTCHA_SITE_KEY && typeof window.grecaptcha?.reset === "function") {
      window.grecaptcha.reset();
    }
  } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="form contact-form wow fadeInUp wch-unset"
        data-wow-delay=".5s"
        id="contact_form"
      >
        {/* Honeypot: 숨김 필드. 봇이 채우면 서버에서 거부 */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <label htmlFor="company_website">{t("formHoneypotLabel")}</label>
          <input
            type="text"
            id="company_website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">{t("formNameLabel")}</label>
              <input
                type="text"
                name="name"
                id="name"
                className="input-lg round form-control"
                placeholder={t("formNamePlaceholder")}
                pattern=".{3,100}"
                required
                aria-required="true"
                disabled={loading}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">{t("formEmailLabel")}</label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-lg round form-control"
                placeholder={t("formEmailPlaceholder")}
                pattern=".{5,100}"
                required
                aria-required="true"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">{t("formMessageLabel")}</label>
          <textarea
            name="message"
            id="message"
            className="input-lg round form-control"
            style={{ height: 130 }}
            placeholder={t("formMessagePlaceholder")}
            required
            aria-required="true"
            disabled={loading}
          />
        </div>

        {RECAPTCHA_SITE_KEY && (
          <div className="form-group">
            <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} data-theme="dark" />
          </div>
        )}

        <div className="row">
          <div className="col-sm-6">
            <div className="form-tip pt-20 pt-sm-0">
              <i className="icon-info size-16" />
              {t("formPrivacyTip")}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="text-end pt-10">
              <button
                type="submit"
                disabled={loading}
                aria-controls="result"
                className="submit_btn link-hover-anim link-circle-1 align-middle"
                data-link-animate="y"
              >
                <span className="link-strong link-strong-unhovered">
                  {loading ? t("formSubmitSending") : t("formSubmitButton")}
                  <i className="mi-arrow-right size-18 align-middle" aria-hidden="true" />
                </span>
                <span className="link-strong link-strong-hovered" aria-hidden="true">
                  {loading ? t("formSubmitSending") : t("formSubmitButton")}
                  <i className="mi-arrow-right size-18 align-middle" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          id="result"
          role="region"
          aria-live="polite"
          aria-atomic="true"
          className={status?.type === "error" ? "text-danger mt-3" : status?.type === "success" ? "text-success mt-3" : "mt-3"}
        >
          {status?.text}
        </div>
      </form>
    </>
  );
}
