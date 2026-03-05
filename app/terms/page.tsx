import type { Metadata } from "next";
import Link from "next/link";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Terms of Use",
    description: "Dockera terms of use. Rules and conditions for using our document and image tools.",
    path: "/terms",
  }),
};

const sectionClass = "mt-10";
const headingClass = "text-xl font-semibold text-slate-900 dark:text-slate-100 mt-8 first:mt-0";
const bodyClass = "mt-3 text-slate-600 dark:text-slate-400 leading-relaxed";
const listClass = "mt-2 list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-400";

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Last updated: March 2025
      </p>

      <section className={sectionClass}>
        <h2 className={headingClass}>Introduction</h2>
        <p className={bodyClass}>
          Welcome to Dockera. These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website dockera.in and the tools and services offered by Dockera (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By using our platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Acceptance of Terms</h2>
        <p className={bodyClass}>
          By accessing or using Dockera, you confirm that you have read, understood, and agree to these Terms and to our Privacy Policy. If you are using Dockera on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms. We may require you to create an account for certain features; your use of those features is subject to these Terms.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Description of Services</h2>
        <p className={bodyClass}>
          Dockera provides browser-based tools to help users prepare images and documents, including for use with online forms, applications, and competitive exams. Our services include, but are not limited to:
        </p>
        <ul className={listClass}>
          <li>Image resizing, compression, and resizing to specific file sizes (e.g., 20KB, 50KB, 100KB)</li>
          <li>Passport photo formatting</li>
          <li>Signature extraction from images</li>
          <li>Image cropping and format conversion (e.g., PNG, JPG)</li>
          <li>PDF compression, merge, split, and conversion to or from images</li>
        </ul>
        <p className={bodyClass}>
          Tools may process files in your browser or on our systems on a temporary basis. We do not guarantee that every tool will be available at all times or that output will meet every third-party requirement. You are responsible for verifying that your processed files meet the requirements of the external site or authority to which you submit them.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>User Responsibilities</h2>
        <p className={bodyClass}>
          You agree to:
        </p>
        <ul className={listClass}>
          <li>Use Dockera only for lawful purposes and in accordance with these Terms</li>
          <li>Provide accurate information when creating an account or using our services</li>
          <li>Ensure that you have the right to upload and process any files you submit (e.g., you own the content or have permission to use it)</li>
          <li>Verify that your processed documents meet the requirements of any third-party form, portal, or authority before submission</li>
          <li>Keep your account credentials secure and notify us of any unauthorised use</li>
        </ul>
        <p className={bodyClass}>
          You are solely responsible for the content you upload and for ensuring that your use of our tools complies with applicable laws and third-party terms.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Acceptable Use Policy</h2>
        <p className={bodyClass}>
          You must not use Dockera to:
        </p>
        <ul className={listClass}>
          <li>Violate any applicable law, regulation, or third-party rights</li>
          <li>Upload content that is illegal, harmful, offensive, or infringing</li>
          <li>Attempt to gain unauthorised access to our systems, other users&apos; accounts, or any network or system</li>
          <li>Overload or disrupt our services (e.g., excessive automated requests or abuse of free tiers)</li>
          <li>Scrape, copy, or reverse-engineer our tools or content beyond normal use</li>
        </ul>
        <p className={bodyClass}>
          We reserve the right to suspend or terminate access for users who violate this policy or who we reasonably believe are abusing the platform. We may also restrict or limit use to protect the service for all users.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Intellectual Property</h2>
        <p className={bodyClass}>
          The Dockera name, logo, website design, and the software and content we provide (other than user-uploaded content) are owned by us or our licensors. You may not copy, modify, or use our branding or technology for your own purposes without our prior written consent. You retain ownership of the files you upload; we do not claim any intellectual property rights over your content. By using our services, you grant us only the limited rights necessary to operate the tools (e.g., to process and delete your files as described in our Privacy Policy).
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>File Processing Disclaimer</h2>
        <p className={bodyClass}>
          Dockera provides tools for document and image preparation. We are not responsible for:
        </p>
        <ul className={listClass}>
          <li><strong className="text-slate-700 dark:text-slate-300">Third-party requirements:</strong> Requirements for file size, format, dimensions, or content are set by external websites, forms, or authorities (e.g., government portals, exam bodies). You are responsible for ensuring your processed files meet those requirements.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">Form submission outcomes:</strong> We do not control third-party systems. Rejection of your submission, upload errors, or validation failures on other websites are not our responsibility, even if you used our tools to prepare the file.</li>
          <li><strong className="text-slate-700 dark:text-slate-300">Accuracy of output:</strong> We strive to provide accurate results, but we do not guarantee that output will be error-free or suitable for every use case. You should review processed files before submitting them elsewhere.</li>
        </ul>
        <p className={bodyClass}>
          Use of our tools does not create any obligation on us regarding the acceptability of your documents to any third party.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Service Availability</h2>
        <p className={bodyClass}>
          We aim to keep Dockera available and working reliably, but we do not guarantee uninterrupted or error-free access. We may modify, suspend, or discontinue features or the entire service with or without notice. We are not liable for any loss or inconvenience resulting from downtime, changes, or discontinuation.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Limitation of Liability</h2>
        <p className={bodyClass}>
          To the fullest extent permitted by applicable law:
        </p>
        <ul className={listClass}>
          <li>Dockera and its services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied (including implied warranties of merchantability, fitness for a particular purpose, or non-infringement).</li>
          <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or business opportunities, arising from your use of or inability to use our services.</li>
          <li>Our total liability for any claims related to these Terms or the services shall not exceed the amount you paid us in the twelve (12) months preceding the claim, or, if you have not paid us, one hundred Indian Rupees (INR 100).</li>
        </ul>
        <p className={bodyClass}>
          Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities; in such cases, the above limitations apply only to the extent permitted by law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Indemnification</h2>
        <p className={bodyClass}>
          You agree to indemnify, defend, and hold harmless Dockera and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from your use of our services, your violation of these Terms, your violation of any law or third-party rights, or your uploaded content. We reserve the right to assume the exclusive defence and control of any matter subject to indemnification by you, at your expense.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Third-Party Links</h2>
        <p className={bodyClass}>
          Our website may contain links to third-party sites (e.g., government portals, guides). We do not control and are not responsible for the content, privacy practices, or terms of those sites. Your use of third-party services is at your own risk. Links do not imply our endorsement.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Changes to Terms</h2>
        <p className={bodyClass}>
          We may update these Terms from time to time. We will post the revised Terms on this page and update the &quot;Last updated&quot; date. Material changes may be communicated via email or a notice on our site where appropriate. Your continued use of Dockera after changes take effect constitutes acceptance of the new Terms. If you do not agree, you must stop using our services.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Governing Law (India)</h2>
        <p className={bodyClass}>
          These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms or the use of Dockera shall be subject to the exclusive jurisdiction of the courts of India. You agree to submit to the personal jurisdiction of such courts for the purpose of litigating any such dispute.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Contact Information</h2>
        <p className={bodyClass}>
          For questions about these Terms of Use, please contact us at:
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
