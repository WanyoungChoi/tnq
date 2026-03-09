import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "tnq500@naver.com";
const MIN_SUBMIT_SECONDS = 3;
const MAX_SUBMIT_SECONDS = 3600; // 1 hour

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

async function sendViaResend({ from, to, replyTo, subject, html, text }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from:
      from ||
      process.env.RESEND_FROM ||
      "TNQ21 제품문의 <onboarding@resend.dev>",
    to: [to],
    reply_to: replyTo || undefined,
    subject,
    html,
    text,
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
  return (
    data.success === true && (data.score === undefined || data.score >= 0.5)
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      message,
      company_website: honeypot,
      _submitTime: submitTime,
      _recaptchaToken: recaptchaToken,
    } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "필수 항목을 입력해 주세요." },
        { status: 400 },
      );
    }

    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json(
        { success: false, error: "요청을 처리할 수 없습니다." },
        { status: 400 },
      );
    }

    const now = Date.now();
    const submittedAt = submitTime ? Number(submitTime) : 0;
    const elapsed = (now - submittedAt) / 1000;
    if (elapsed < MIN_SUBMIT_SECONDS) {
      return NextResponse.json(
        {
          success: false,
          error: "요청이 너무 빠릅니다. 잠시 후 다시 시도해 주세요.",
        },
        { status: 400 },
      );
    }
    if (elapsed > MAX_SUBMIT_SECONDS) {
      return NextResponse.json(
        { success: false, error: "페이지를 새로고침한 뒤 다시 시도해 주세요." },
        { status: 400 },
      );
    }

    const useRecaptcha = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (useRecaptcha) {
      const valid = await verifyRecaptcha(recaptchaToken);
      if (!valid) {
        return NextResponse.json(
          {
            success: false,
            error: "보안 확인에 실패했습니다. 다시 시도해 주세요.",
          },
          { status: 400 },
        );
      }
    }

    const subject = `[TNQ21 제품문의] ${(name || "").trim().slice(0, 50)}`;
    const text = [
      `이름: ${(name || "").trim()}`,
      `이메일: ${(email || "").trim()}`,
      "",
      "문의내용:",
      (message || "").trim(),
    ].join("\n");

    const html = [
      "<p><strong>https://tnq21.com에서 문의 접수되었습니다.</strong></p>",
      "<p><strong>본 메일은 회신 불가 메일입니다.</strong></p>",
      "<p><strong>아래 문의 고객의 이메일 정보로 회신하여 주십시오.</strong></p>",
      "<p></p>",
      "<p><strong>이름</strong> " + escapeHtml((name || "").trim()) + "</p>",
      "<p><strong>이메일</strong> " + escapeHtml((email || "").trim()) + "</p>",
      "<p><strong>문의내용</strong></p>",
      "<pre style='white-space:pre-wrap'>" +
        escapeHtml((message || "").trim()) +
        "</pre>",
    ].join("");

    const replyTo = (email || "").trim() || undefined;

    if (process.env.RESEND_API_KEY) {
      await sendViaResend({
        to: RECIPIENT_EMAIL,
        replyTo,
        subject,
        html,
        text,
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
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("product-inquiry API error:", err);
    const msg = err?.message || "";
    if (
      msg.includes("only send testing emails to your own") ||
      msg.includes("verify a domain")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Resend 테스트 계정에서는 가입 이메일로만 수신 가능합니다. tnq500@naver.com으로 받으려면 Resend에서 도메인 인증( resend.com/domains ) 후 발신 주소를 해당 도메인으로 설정하거나, .env에서 RESEND_API_KEY를 제거하고 Gmail SMTP(앱 비밀번호)를 사용하세요.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: "발송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
