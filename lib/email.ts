import { Resend } from "resend";
import nodemailer from "nodemailer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dockera.in";
const FROM = process.env.RESEND_FROM ?? process.env.SMTP_FROM ?? "Dockera <info@dockera.in>";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const smtpTransporter = !resend
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    })
  : null;

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (resend) {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
    });
    if (error) throw new Error(`Resend: ${error.message}`);
    return;
  }
  if (smtpTransporter) {
    await smtpTransporter.sendMail({ from: FROM, to, subject, html });
    return;
  }
  throw new Error(
    "No email provider configured. Set RESEND_API_KEY (recommended for Vercel) or SMTP_HOST/SMTP_USER/SMTP_PASS."
  );
}

export async function sendVerificationEmail(email: string, link: string): Promise<void> {
  await sendEmail(
    email,
    "Verify your Dockera account",
    `
      <p>Thanks for signing up for Dockera.</p>
      <p>Click the link below to verify your email. The link expires in 24 hours.</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you didn't create an account, you can ignore this email.</p>
    `
  );
}

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  await sendEmail(
    email,
    "Your Dockera login code",
    `
      <p>Your one-time login code is:</p>
      <p style="font-size:24px;font-weight:bold;letter-spacing:4px">${otp}</p>
      <p>This code is valid for 10 minutes.</p>
      <p>If you didn't request this code, you can ignore this email.</p>
    `
  );
}

export function getVerificationLink(token: string): string {
  return `${SITE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
}
