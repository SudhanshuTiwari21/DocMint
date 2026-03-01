import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dockera.in";
const FROM = process.env.SMTP_FROM ?? "Dockera <info@dockera.in>";

export async function sendVerificationEmail(email: string, link: string): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "Verify your Dockera account",
    html: `
      <p>Thanks for signing up for Dockera.</p>
      <p>Click the link below to verify your email. The link expires in 24 hours.</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you didn't create an account, you can ignore this email.</p>
    `,
  });
}

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "Your Dockera login code",
    html: `
      <p>Your one-time login code is:</p>
      <p style="font-size:24px;font-weight:bold;letter-spacing:4px">${otp}</p>
      <p>This code is valid for 10 minutes.</p>
      <p>If you didn't request this code, you can ignore this email.</p>
    `,
  });
}

export function getVerificationLink(token: string): string {
  return `${SITE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
}
