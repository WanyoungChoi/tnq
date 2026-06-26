"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const PHONE_PREFIXES = ["010", "011", "016", "017", "018", "019", "02", "031", "032", "033", "041", "042", "043", "044", "051", "052", "053", "054", "055", "061", "062", "063", "064", "070"];

const EMAIL_DOMAINS = [
  "naver.com",
  "gmail.com",
  "daum.net",
  "hanmail.net",
  "kakao.com",
  "nate.com",
];

function RequiredMark() {
  return <span className="esg-report-required" aria-hidden="true">*</span>;
}

function FormRow({ label, required, children, className = "" }) {
  return (
    <div className={`esg-report-form-row${className ? ` ${className}` : ""}`}>
      <div className="esg-report-form-label">
        {required && <RequiredMark />}
        {label}
      </div>
      <div className="esg-report-form-field">{children}</div>
    </div>
  );
}

export default function EsgReportForm() {
  const t = useTranslations("esgReportingChannel");
  const formRef = useRef(null);
  const openedAtRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [emailDomainMode, setEmailDomainMode] = useState("direct");
  const [fileName, setFileName] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const workplaceOptions = t.raw("formWorkplaceOptions") ?? [];
  const reportTypeOptions = t.raw("formReportTypeOptions") ?? [];
  const privacyItems = t.raw("formPrivacyItems") ?? [];

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

  const buildEmail = (form) => {
    const local = form.email_local?.value?.trim();
    const domain =
      emailDomainMode === "direct"
        ? form.email_domain_direct?.value?.trim()
        : emailDomainMode;
    if (!local || !domain) return "";
    return `${local}@${domain}`;
  };

  const buildPhone = (form) => {
    const prefix = form.phone_prefix?.value;
    const middle = form.phone_middle?.value?.trim();
    const last = form.phone_last?.value?.trim();
    if (!prefix || !middle || !last) return "";
    return `${prefix}-${middle}-${last}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = formRef.current;
    if (!form) return;

    const subject = form.subject?.value?.trim();
    const content = form.content?.value?.trim();
    const workplace = form.workplace?.value;
    const reportType = form.report_type?.value;
    const email = buildEmail(form);
    const phone = buildPhone(form);
    const name = isAnonymous ? t("formAnonymousValue") : form.name?.value?.trim();

    if (!isAnonymous && !name) {
      window.alert(t("formErrorRequired"));
      return;
    }
    if (!phone || !email || !workplace || !reportType || !subject || !content) {
      window.alert(t("formErrorRequired"));
      return;
    }
    if (!privacyConsent) {
      window.alert(t("formErrorPrivacyConsent"));
      return;
    }

    const recaptchaToken = getRecaptchaResponse();
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      window.alert(t("formErrorRecaptcha"));
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append("name", name);
      body.append("phone", phone);
      body.append("email", email);
      body.append("workplace", workplace);
      body.append("report_type", reportType);
      body.append("subject", subject);
      body.append("content", content);
      body.append("is_anonymous", isAnonymous ? "1" : "0");
      body.append("privacy_consent", privacyConsent ? "1" : "0");
      body.append("company_website", form.company_website?.value ?? "");
      body.append("_submitTime", String(openedAtRef.current ?? ""));
      if (recaptchaToken) body.append("_recaptchaToken", recaptchaToken);

      const file = form.attachment?.files?.[0];
      if (file) body.append("attachment", file);

      const res = await fetch("/api/esg-report", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        window.alert(data.error || t("formErrorSendFailed"));
        if (RECAPTCHA_SITE_KEY && typeof window.grecaptcha?.reset === "function") {
          window.grecaptcha.reset();
        }
        return;
      }

      window.alert(t("formSuccessSent"));
      form.reset();
      setIsAnonymous(false);
      setEmailDomainMode("direct");
      setFileName("");
      setPrivacyConsent(false);
      openedAtRef.current = Date.now();
      if (RECAPTCHA_SITE_KEY && typeof window.grecaptcha?.reset === "function") {
        window.grecaptcha.reset();
      }
    } catch {
      window.alert(t("formErrorNetwork"));
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
        className="form esg-report-form wow fadeInUp wch-unset"
        encType="multipart/form-data"
      >
        <div
          className="esg-report-honeypot"
          aria-hidden="true"
        >
          <label htmlFor="company_website">{t("formHoneypotLabel")}</label>
          <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="esg-report-form-table">
          <FormRow label={t("formNameLabel")} required>
            <div className="esg-report-name-row">
              <input
                type="text"
                name="name"
                className="input-lg round form-control"
                disabled={loading || isAnonymous}
                placeholder={t("formNamePlaceholder")}
              />
              <label className="esg-report-checkbox-label mb-0">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  disabled={loading}
                />
                <span>{t("formAnonymousLabel")}</span>
              </label>
            </div>
          </FormRow>

          <FormRow label={t("formPhoneLabel")} required>
            <div className="esg-report-phone-row">
              <select name="phone_prefix" className="input-lg round form-control esg-report-select" disabled={loading} defaultValue="">
                <option value="">{t("formSelectPlaceholder")}</option>
                {PHONE_PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <span className="esg-report-dash">-</span>
              <input type="text" name="phone_middle" className="input-lg round form-control" maxLength={4} disabled={loading} inputMode="numeric" />
              <span className="esg-report-dash">-</span>
              <input type="text" name="phone_last" className="input-lg round form-control" maxLength={4} disabled={loading} inputMode="numeric" />
            </div>
          </FormRow>

          <FormRow label={t("formEmailLabel")} required>
            <div className="esg-report-email-row">
              <input type="text" name="email_local" className="input-lg round form-control" disabled={loading} />
              <span className="esg-report-at">@</span>
              {emailDomainMode === "direct" ? (
                <input
                  type="text"
                  name="email_domain_direct"
                  className="input-lg round form-control"
                  disabled={loading}
                />
              ) : (
                <input type="hidden" name="email_domain_direct" value="" />
              )}
              <select
                name="email_domain_select"
                className="input-lg round form-control esg-report-select"
                disabled={loading}
                value={emailDomainMode}
                onChange={(e) => setEmailDomainMode(e.target.value)}
              >
                <option value="direct">{t("formEmailDirect")}</option>
                {EMAIL_DOMAINS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </FormRow>

          <FormRow label={t("formWorkplaceLabel")} required>
            <select name="workplace" className="input-lg round form-control esg-report-select w-100" disabled={loading} defaultValue="">
              <option value="">{t("formSelectPlaceholder")}</option>
              {workplaceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </FormRow>

          <FormRow label={t("formReportTypeLabel")} required>
            <select name="report_type" className="input-lg round form-control esg-report-select w-100" disabled={loading} defaultValue="">
              <option value="">{t("formSelectPlaceholder")}</option>
              {reportTypeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </FormRow>

          <FormRow label={t("formSubjectLabel")} required>
            <input type="text" name="subject" className="input-lg round form-control w-100" disabled={loading} />
          </FormRow>

          <FormRow label={t("formContentLabel")} required>
            <textarea
              name="content"
              className="input-lg round form-control w-100"
              style={{ height: 180 }}
              disabled={loading}
            />
          </FormRow>

          <FormRow label={t("formAttachmentLabel")} required={false}>
            <div className="esg-report-file-row">
              <input
                type="file"
                name="attachment"
                id="esg_report_attachment"
                className="esg-report-file-input"
                disabled={loading}
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              />
              <label htmlFor="esg_report_attachment" className="esg-report-file-label btn btn-mod btn-border btn-small light-content">
                {t("formFileChoose")}
              </label>
              <span className="esg-report-file-name text-gray">{fileName || t("formFileEmpty")}</span>
            </div>
          </FormRow>

          <FormRow label={t("formPrivacyLabel")} required className="esg-report-form-row--top">
            <div className="esg-report-privacy w-100">
              <p className="esg-report-privacy-intro mb-15">{t("formPrivacyIntro")}</p>
              <ul className="esg-report-privacy-list list-unstyled mb-20">
                {privacyItems.map((item, i) => (
                  <li key={i} className="text-gray">{item}</li>
                ))}
              </ul>
              <label className="esg-report-checkbox-label esg-report-privacy-consent mb-0">
                <input
                  type="checkbox"
                  name="privacy_consent"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  disabled={loading}
                />
                <span>{t("formPrivacyConsent")}</span>
              </label>
            </div>
          </FormRow>
        </div>

        {RECAPTCHA_SITE_KEY && (
          <div className="esg-report-recaptcha mt-30">
            <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} data-theme="dark" />
          </div>
        )}

        <div className="esg-report-submit-wrap text-end mt-30">
          <button
            type="submit"
            disabled={loading}
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
      </form>
    </>
  );
}
