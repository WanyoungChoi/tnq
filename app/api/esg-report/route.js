import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "rokmc815@tnp21.com";
const MIN_SUBMIT_SECONDS = 3;
const MAX_SUBMIT_SECONDS = 3600;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true";

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASSWORD must be set");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function sendViaResend({ to, replyTo, subject, html, text, attachments }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM || "TNQ21 ESG 제보 <onboarding@resend.dev>",
    to: [to],
    reply_to: replyTo || undefined,
    subject,
    html,
    text,
    attachments,
  });
  if (error) throw new Error(error.message || "Resend send failed");
  return data;
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return false;

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = await res.json();
  return data.success === true && (data.score === undefined || data.score >= 0.5);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const workplace = String(formData.get("workplace") || "").trim();
    const reportType = String(formData.get("report_type") || "").trim();
    const subjectLine = String(formData.get("subject") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const isAnonymous = formData.get("is_anonymous") === "1";
    const privacyConsent = formData.get("privacy_consent") === "1";
    const honeypot = String(formData.get("company_website") || "").trim();
    const submitTime = Number(formData.get("_submitTime") || 0);
    const recaptchaToken = String(formData.get("_recaptchaToken") || "");
    const attachment = formData.get("attachment");

    if (!phone || !email || !workplace || !reportType || !subjectLine || !content) {
      return NextResponse.json({ success: false, error: "필수 항목을 입력해 주세요." }, { status: 400 });
    }

    if (!isAnonymous && !name) {
      return NextResponse.json({ success: false, error: "필수 항목을 입력해 주세요." }, { status: 400 });
    }

    if (!privacyConsent) {
      return NextResponse.json({ success: false, error: "개인정보 수집 및 이용에 동의해 주세요." }, { status: 400 });
    }

    if (honeypot) {
      return NextResponse.json({ success: false, error: "요청을 처리할 수 없습니다." }, { status: 400 });
    }

    const elapsed = (Date.now() - submitTime) / 1000;
    if (elapsed < MIN_SUBMIT_SECONDS) {
      return NextResponse.json({ success: false, error: "요청이 너무 빠릅니다. 잠시 후 다시 시도해 주세요." }, { status: 400 });
    }
    if (elapsed > MAX_SUBMIT_SECONDS) {
      return NextResponse.json({ success: false, error: "페이지를 새로고침한 뒤 다시 시도해 주세요." }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      const valid = await verifyRecaptcha(recaptchaToken);
      if (!valid) {
        return NextResponse.json({ success: false, error: "보안 확인에 실패했습니다. 다시 시도해 주세요." }, { status: 400 });
      }
    }

    let mailAttachments = [];
    if (attachment && typeof attachment === "object" && "arrayBuffer" in attachment && attachment.size > 0) {
      if (attachment.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, error: "첨부파일은 10MB 이하만 가능합니다." }, { status: 400 });
      }
      const buffer = Buffer.from(await attachment.arrayBuffer());
      mailAttachments = [
        {
          filename: attachment.name || "attachment",
          content: buffer,
        },
      ];
    }

    const subject = `[TNQ21 ESG 제보] ${subjectLine.slice(0, 50)}`;
    const text = [
      `이름: ${name || "익명"}`,
      `연락처: ${phone}`,
      `이메일: ${email}`,
      `사업장: ${workplace}`,
      `제보 선택: ${reportType}`,
      `익명접수: ${isAnonymous ? "예" : "아니오"}`,
      "",
      `제목: ${subjectLine}`,
      "",
      "내용:",
      content,
    ].join("\n");

    const html = [
      "<p><strong>https://tnq21.com ESG 제보가 접수되었습니다.</strong></p>",
      `<p><strong>이름</strong> ${escapeHtml(name || "익명")}</p>`,
      `<p><strong>연락처</strong> ${escapeHtml(phone)}</p>`,
      `<p><strong>이메일</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>사업장</strong> ${escapeHtml(workplace)}</p>`,
      `<p><strong>제보 선택</strong> ${escapeHtml(reportType)}</p>`,
      `<p><strong>익명접수</strong> ${isAnonymous ? "예" : "아니오"}</p>`,
      `<p><strong>제목</strong> ${escapeHtml(subjectLine)}</p>`,
      "<p><strong>내용</strong></p>",
      `<pre style="white-space:pre-wrap">${escapeHtml(content)}</pre>`,
    ].join("");

    const replyTo = email || undefined;

    if (process.env.RESEND_API_KEY) {
      await sendViaResend({
        to: RECIPIENT_EMAIL,
        replyTo,
        subject,
        html,
        text,
        attachments: mailAttachments.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      });
    } else {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: RECIPIENT_EMAIL,
        replyTo,
        subject,
        text,
        html,
        attachments: mailAttachments,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("esg-report API error:", err);
    return NextResponse.json(
      { success: false, error: "발송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
