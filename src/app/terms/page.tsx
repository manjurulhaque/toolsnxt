import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, type LegalStat, type TableOfContentsItem } from "@/components/legal-page-layout"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: `Terms of Use | Service Conditions | ${SITE_NAME}`,
  description: `Terms of use governing access to ${SITE_NAME}. Learn about permitted usage, user ownership of generated files, mathematical precision limits, and service warranties.`,
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: `Terms of Use | ${SITE_NAME}`,
    description: `Terms of use and service conditions for ${SITE_NAME} web utilities.`,
    url: `${SITE_URL}/terms`,
  },
}

const STATS: LegalStat[] = [
  {
    label: "File Ownership",
    value: "100% Yours",
    description: "You retain all intellectual property in your input and generated assets.",
  },
  {
    label: "Permitted Use",
    value: "Free & Unrestricted",
    description: "Personal, educational, and commercial utilization of outputs is permitted.",
  },
  {
    label: "Execution",
    value: "Local Hardware",
    description: "Utilities run in your browser sandbox without remote server queues.",
  },
  {
    label: "Warranty",
    value: "As-Is Basis",
    description: "Tools are provided for convenience with open verification encouraged.",
  },
]

const TOC: TableOfContentsItem[] = [
  { id: "acceptance", title: "1. Acceptance of Terms & Eligibility" },
  { id: "service-nature", title: "2. Nature of Services & Local Execution" },
  { id: "acceptable-use", title: "3. Acceptable Use & Prohibited Conduct" },
  { id: "ownership", title: "4. User Content & Output Ownership" },
  { id: "platform-ip", title: "5. Platform Intellectual Property & Branding" },
  { id: "precision-limits", title: "6. Computational Limits & Precision" },
  { id: "warranty-disclaimer", title: "7. Disclaimer of Warranties" },
  { id: "liability-limits", title: "8. Limitation of Liability" },
  { id: "indemnification", title: "9. Indemnification" },
  { id: "open-source", title: "10. Open-Source Software & Dependencies" },
  { id: "modifications", title: "11. Service Modifications & Availability" },
  { id: "governing-law", title: "12. Governing Law & Dispute Resolution" },
]

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Terms of Use", item: `${SITE_URL}/terms` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/terms#webpage`,
        url: `${SITE_URL}/terms`,
        name: `Terms of Use | ${SITE_NAME}`,
        description: `Terms and conditions governing the use of ${SITE_NAME} browser tools.`,
        datePublished: "2026-07-02",
        dateModified: "2026-10-01",
        inLanguage: "en-US",
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LegalPageLayout
        title="Terms of Use"
        subtitle="Clear, fair, and transparent conditions governing your use of our utilities. Learn about your intellectual property rights, acceptable use guidelines, and computational limitations."
        currentPath="/terms"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
        lastReviewedDate="October 2026"
        stats={STATS}
        tocItems={TOC}
      >
        {/* Section 1 */}
        <section id="acceptance" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              1
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Acceptance of Terms & Eligibility
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            By accessing, browsing, or utilizing any of the calculators, converters, minifiers, or browser
            utilities on {SITE_NAME} (&quot;the Service&quot;), you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Use. If you do not agree to these terms in full, you must
            discontinue using the website immediately.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            You represent and warrant that you are at least the age of majority in your jurisdiction or have
            obtained valid parental or guardian consent to use this Service.
          </p>
        </section>

        {/* Section 2 */}
        <section id="service-nature" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              2
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Nature of Services & Local Client Execution
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            The utilities provided on {SITE_NAME} operate as client-side software executed locally inside your web
            browser runtime. The processing power, memory (RAM), and storage required to perform file conversions,
            calculations, image transformations, and minifications are allocated from your own device rather than a
            remote cloud server.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Performance depends on your device&apos;s processing hardware, memory capacity, and browser engine
            efficiency. Large file inputs (such as high-resolution images or multi-hundred-page PDFs) may cause
            temporary browser tab responsiveness dips depending on your device&apos;s physical resources.
          </p>
        </section>

        {/* Section 3 */}
        <section id="acceptable-use" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              3
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Acceptable Use & Prohibited Conduct
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            You are granted a non-exclusive, revocable, non-transferable license to access and use the Service for
            lawful personal, educational, or commercial purposes. However, you agree that you will not:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              Engage in automated scraping or denial-of-service (DoS) activities intended to disrupt the edge CDN hosting
              infrastructure or interfere with other users&apos; access.
            </li>
            <li>
              Attempt to bypass, alter, or tamper with security headers, CORS directives, or software integrity mechanisms.
            </li>
            <li>
              Utilize the tools to convert, generate, or distribute malicious code, trojans, phishing assets, or unlawfully
              obtained copyrighted content.
            </li>
            <li>
              Frame or embed the entire site or individual tools in third-party iframes for commercial resale without
              express written permission.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="ownership" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              4
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              User Content & Output Ownership
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            <strong>You retain 100% full ownership, intellectual property rights, and copyright</strong> over any
            text, code, images, files, or data you input into our tools, as well as the resulting formatted, minified,
            converted, or generated outputs.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} claims zero copyright, ownership, or licensing rights over your outputs. Because all processing
            is performed locally within your browser without data retention, we do not view, inspect, or hold custody
            over your intellectual property. You are solely responsible for ensuring you possess the legal authority
            and copyright to process the documents and files you load into the utilities.
          </p>
        </section>

        {/* Section 5 */}
        <section id="platform-ip" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              5
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Platform Intellectual Property & Branding
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            The design system, color palette tokens, typography, visual layouts, editorial guides, logos, software
            source code, and overall compilation of {SITE_NAME} are the proprietary intellectual property of {SITE_NAME}
            and are protected by international copyright, trademark, and unfair competition laws.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            You may not clone, scrape, reproduce, or republish our editorial text, layout guides, or design assets
            in bulk without explicit prior written authorization.
          </p>
        </section>

        {/* Section 6 */}
        <section id="precision-limits" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              6
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Computational Limits & Precision Realities
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            While our tools are engineered to strict mathematical and algorithmic standards, users must recognize
            the technical realities of in-browser execution:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              <strong>Floating-Point Arithmetic:</strong> Standard JavaScript number implementations use IEEE 754
              double-precision floating-point format, which may yield minor rounding discrepancies at high decimal
              precisions.
            </li>
            <li>
              <strong>Abstract Syntax Tree (AST) Transformations:</strong> Minification and code conversion tools
              rely on syntax parsers (e.g. Terser, CSSO). Complex, highly dynamic, or non-standard syntax (such as
              eval or dynamic property reflection) should always be verified in a staging environment prior to production.
            </li>
            <li>
              <strong>Browser Canvas Color Spaces:</strong> Image conversions rely on the host browser&apos;s HTML5 Canvas
              2D rendering context, which may exhibit subtle color management variations across operating systems.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="warranty-disclaimer" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              7
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Disclaimer of Warranties (&quot;AS-IS&quot; Basis)
            </h2>
          </div>
          <div className="rounded-2xl border border-[var(--ink-900)]/10 bg-[var(--page-cream)]/60 p-5 text-xs uppercase leading-6 tracking-wide text-[var(--ink-800)]">
            THE SERVICE AND ALL INCLUDED UTILITIES, CALCULATORS, GENERATORS, AND CONTENT ARE PROVIDED STRICTLY ON AN
            &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, {SITE_NAME} DISCLAIMS ALL WARRANTIES, EXPRESS OR
            IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT.
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We do not warrant that the functions contained in the utilities will be uninterrupted, bug-free, or compatible
            with every obsolete browser version, or that defects will be corrected immediately.
          </p>
        </section>

        {/* Section 8 */}
        <section id="liability-limits" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              8
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Limitation of Liability
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Under no circumstances, including negligence, shall {SITE_NAME}, its developers, affiliates, or contributors
            be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>The use or inability to use the browser utilities.</li>
            <li>Calculations, estimates, or conversions relied upon for financial, architectural, or medical decisions.</li>
            <li>Loss or corruption of data, corrupted file downloads, or operational interruptions.</li>
            <li>Errors or inaccuracies in minified or converted source code deployed to production systems.</li>
          </ul>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Your sole and exclusive remedy for dissatisfaction with the site or tools is to stop using the Service.
          </p>
        </section>

        {/* Section 9 */}
        <section id="indemnification" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              9
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Indemnification
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            You agree to defend, indemnify, and hold harmless {SITE_NAME} and its maintainers from and against any claims,
            liabilities, damages, losses, or expenses (including reasonable attorney&apos;s fees) arising out of or in any
            way connected with your access to or use of the Service, your violation of these Terms, or your infringement
            of any intellectual property or rights of another party.
          </p>
        </section>

        {/* Section 10 */}
        <section id="open-source" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              10
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Open-Source Software & Dependencies
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} proudly utilizes leading open-source libraries that make client-side execution possible,
            including PDF.js (Apache-2.0), pdf-lib (MIT), SVGO (MIT), CSSO (MIT), Terser (BSD-2-Clause), and js-yaml (MIT).
            All respective copyrights and licenses belong to their original authors.
          </p>
        </section>

        {/* Section 11 */}
        <section id="modifications" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              11
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Service Modifications & Availability
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We reserve the right to modify, enhance, suspend, or discontinue any utility or feature at any time without
            prior notice. We also reserve the right to revise these Terms of Use periodically. Continued use of the
            Service following posted revisions constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Section 12 */}
        <section id="governing-law" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              12
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Governing Law & Dispute Resolution
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            These Terms shall be governed and interpreted in accordance with applicable laws without regard to conflict
            of law provisions. If any provision of these Terms is found to be unlawful, void, or unenforceable, that
            provision shall be deemed severable and will not affect the validity and enforceability of any remaining
            provisions.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            For questions or legal inquiries regarding these terms, please contact us at{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
            >
              {SITE_CONTACT_EMAIL}
            </a>{" "}
            or visit our{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
            >
              Contact & Support page
            </Link>
            .
          </p>
        </section>
      </LegalPageLayout>
    </>
  )
}
