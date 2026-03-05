import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Privacy Policy",
    description: "Dockera privacy policy. How we handle your data when you use our document and image tools.",
    path: "/privacy",
  }),
};

const sectionClass = "mt-10";
const headingClass = "text-xl font-semibold text-slate-900 dark:text-slate-100 mt-8 first:mt-0";
const bodyClass = "mt-3 text-slate-600 dark:text-slate-400 leading-relaxed";
const listClass = "mt-2 list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-400";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Last updated: March 2025
      </p>

      <section className={sectionClass}>
        <h2 className={headingClass}>Introduction</h2>
        <p className={bodyClass}>
          Dockera (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website dockera.in and provides browser-based tools for preparing images and documents, including image resizing, compression, passport photo formatting, signature extraction, PDF tools, and format conversion. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our services. By using Dockera, you agree to the practices described in this policy.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Information We Collect</h2>
        <p className={bodyClass}>
          We collect information that you provide directly and information that is generated when you use our services:
        </p>
        <ul className={listClass}>
          <li><strong className="text-slate-700 dark:text-slate-300">Account information:</strong> If you create an account, we collect your email address and any profile details you provide.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">Usage information:</strong> We may collect information about how you use our website, such as which tools you use and general usage patterns.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">Device and technical data:</strong> We may collect browser type, device type, and general location (e.g., country or region) to improve our services and security.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Uploaded Files and Document Processing</h2>
        <p className={bodyClass}>
          Our tools are designed with privacy in mind. When you upload files to Dockera:
        </p>
        <ul className={listClass}>
          <li><strong className="text-slate-700 dark:text-slate-300">Temporary processing only:</strong> Files are processed temporarily to perform the requested operation (e.g., resize, compress, convert). They are not retained for long-term storage.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">No permanent storage:</strong> We do not permanently store your uploaded files. Files may be held only for the duration of processing and are automatically deleted afterward.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">Automated processing:</strong> We do not access the content of your documents beyond what is necessary for automated processing. Our systems do not read, analyse, or use your file contents for any purpose other than delivering the tool output you requested.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">Your ownership:</strong> You retain full ownership of your files. We do not claim any rights over the content you upload.</li>
        </ul>
        <p className={bodyClass}>
          Many of our tools are designed to run primarily in your browser, so your files may never leave your device for certain operations. Where processing requires server-side handling, we apply the same temporary-use and deletion practices described above.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>How We Use Information</h2>
        <p className={bodyClass}>
          We use the information we collect to:
        </p>
        <ul className={listClass}>
          <li>Provide, maintain, and improve our tools and services</li>
          <li>Respond to your requests and support inquiries</li>
          <li>Send transactional or account-related communications (e.g., login codes, billing) where applicable</li>
          <li>Detect and prevent abuse, fraud, or security issues</li>
          <li>Comply with applicable laws and enforce our terms</li>
        </ul>
        <p className={bodyClass}>
          We do not sell your personal information or your file content. We do not use your documents or images for advertising, marketing, or training purposes.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Cookies and Analytics</h2>
        <p className={bodyClass}>
          We may use cookies and similar technologies to remember your preferences, keep you signed in, and understand how our site is used. We may use analytics services to collect aggregated, non-personally identifiable data about site traffic and usage. You can control cookies through your browser settings; disabling certain cookies may affect some features of our service.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Third-Party Services</h2>
        <p className={bodyClass}>
          Our website may use third-party services for hosting, analytics, payment processing, or email delivery. These providers may process data on our behalf under contractual obligations to protect your information. We do not allow third parties to use your data for their own marketing or to sell your data. Our payment provider(s) handle payment data in accordance with their own privacy policies and applicable standards (e.g., PCI DSS where applicable).
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Data Security</h2>
        <p className={bodyClass}>
          We implement reasonable technical and organisational measures to protect your data, including encryption in transit (HTTPS) and secure handling of any data we process. No method of transmission or storage is completely secure; we encourage you to use strong passwords and to avoid uploading highly sensitive documents if you have concerns.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Data Retention</h2>
        <p className={bodyClass}>
          Uploaded files are not retained after processing; they are automatically deleted. We may retain account-related data (e.g., email, usage logs) for as long as your account is active or as needed to provide support, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated personal data subject to applicable law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Children&apos;s Privacy</h2>
        <p className={bodyClass}>
          Our services are not directed at children under the age of 13 (or the applicable age in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us and we will take steps to delete it.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>International Users</h2>
        <p className={bodyClass}>
          Dockera is accessible globally but is primarily used by users in India. Our systems may be hosted in one or more countries. By using our services, you consent to the transfer and processing of your information in those locations, in accordance with this Privacy Policy and applicable law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Your Privacy Rights</h2>
        <p className={bodyClass}>
          Depending on where you live, you may have rights to access, correct, delete, or restrict the processing of your personal data, or to object to certain processing. You may also have the right to data portability or to withdraw consent. To exercise these rights, or if you have questions about our practices, please contact us using the details below. You may also have the right to lodge a complaint with a supervisory authority in your country.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Changes to This Privacy Policy</h2>
        <p className={bodyClass}>
          We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the &quot;Last updated&quot; date. For material changes, we may provide additional notice (e.g., by email or a notice on our site). Continued use of Dockera after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Contact Information</h2>
        <p className={bodyClass}>
          If you have questions about this Privacy Policy or our data practices, you can contact us at:
        </p>
        <p className={bodyClass}>
          <strong className="text-slate-700 dark:text-slate-300">Dockera</strong><br />
          Website: dockera.in<br />
          Email:{" "}
          <a href="mailto:info@dockera.in" className="text-slate-900 underline dark:text-slate-100 hover:no-underline">
            info@dockera.in
          </a>
        </p>
      </section>

      <p className="mt-12 pt-8 border-t border-slate-200 dark:border-neutral-700">
        <Link href="/" className="font-medium text-slate-900 underline dark:text-slate-100 hover:no-underline">
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
