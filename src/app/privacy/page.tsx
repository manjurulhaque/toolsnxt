import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, type LegalStat, type TableOfContentsItem } from "@/components/legal-page-layout"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: `Privacy Policy | Zero-Server Processing | ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} safeguards your privacy. All 52 utility tools operate 100% locally in your browser with zero server uploads, no data retention, and strict telemetry privacy.`,
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Zero-server in-browser data processing privacy policy for ${SITE_NAME}.`,
    url: `${SITE_URL}/privacy`,
  },
}

const STATS: LegalStat[] = [
  {
    label: "Processing",
    value: "100% Client-Side",
    description: "Calculations, image conversions, and PDF tools run in local browser RAM.",
  },
  {
    label: "Server Storage",
    value: "0 Bytes Stored",
    description: "No database records, user accounts, or input logging on our servers.",
  },
  {
    label: "Ad Transparency",
    value: "AdSense Compliant",
    description: "Full disclosure of third-party advertising cookies and user opt-out controls.",
  },
  {
    label: "Local Storage",
    value: "User Controlled",
    description: "Favorites and recent tools stay on your device and can be cleared anytime.",
  },
]

const TOC: TableOfContentsItem[] = [
  { id: "core-principle", title: "1. Core Architecture: Client-Side Execution" },
  { id: "data-handled", title: "2. Data Processed Locally on Your Machine" },
  { id: "local-storage", title: "3. Local Browser Storage & Preferences" },
  { id: "analytics-telemetry", title: "4. Cookieless Analytics & Telemetry" },
  { id: "advertising-policy", title: "5. Third-Party Advertising & Google AdSense" },
  { id: "infrastructure-security", title: "6. Static Infrastructure & Security Headers" },
  { id: "data-retention-sharing", title: "7. Data Retention, Sharing & Sale Policies" },
  { id: "gdpr-ccpa-rights", title: "8. Your Rights under GDPR & CCPA/CPRA" },
  { id: "children-privacy", title: "9. Children's Privacy (COPPA)" },
  { id: "security-measures", title: "10. Technical Safeguards & Sandboxing" },
  { id: "updates-contact", title: "11. Policy Updates & Privacy Inquiries" },
]

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/privacy#webpage`,
        url: `${SITE_URL}/privacy`,
        name: `Privacy Policy | ${SITE_NAME}`,
        description: `Privacy policy and client-side data protection practices of ${SITE_NAME}.`,
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
        title="Privacy Policy"
        subtitle="We believe utilities should serve you without collecting your data. Discover our 100% in-browser processing architecture and how we ensure your text, files, and calculations never leave your computer."
        currentPath="/privacy"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
        lastReviewedDate="October 2026"
        stats={STATS}
        tocItems={TOC}
      >
        {/* Section 1 */}
        <section id="core-principle" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              1
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Core Architecture: 100% Client-Side In-Browser Execution
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} is built upon a fundamental architectural commitment:{" "}
            <strong>your data belongs to you and should never leave your machine</strong>. Unlike conventional
            cloud-based web tools that transmit your files, code, or personal calculations to remote backend
            servers for processing, our utilities execute entirely inside your local web browser engine.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            When you format a JSON document, compress or merge a PDF, convert an image, hash a string, or
            calculate personal loan figures, your web browser utilizes its own JavaScript runtime, WebAssembly,
            HTML5 Canvas, and Web Workers. At no point during execution are your inputs, files, or generated
            results transmitted across the network to our servers or any third-party infrastructure.
          </p>

          <div className="rounded-2xl border border-[var(--accent-rust)]/20 bg-[var(--accent-rust)]/5 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-[var(--ink-900)]">
              Zero-Server & Offline Architecture Guarantee
            </h3>
            <p className="mt-1 text-xs leading-6 text-[var(--ink-700)]">
              You can verify this yourself: open your browser&apos;s Developer Tools (Press F12 &rarr; Network tab),
              drag a PDF into the PDF Compressor or paste text into the Minifier, and observe that zero network
              requests are initiated when processing your inputs. In fact, because our platform operates as a full offline
              Progressive Web App (PWA), you can disconnect from Wi-Fi or enable Airplane Mode and all 52 tools will continue
              functioning with zero network access.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="data-handled" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              2
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Data Processed Locally on Your Machine
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            The following categories of data are processed exclusively in volatile browser memory (RAM) and
            are permanently discarded when you close the tab or refresh the page:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Files & Documents
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                PDF documents, JPG/PNG/WebP/SVG images, Markdown files, XML sitemaps, and CSV spreadsheets.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Code & Structured Data
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                JSON objects, YAML configs, TypeScript interfaces, HTML/CSS/JavaScript source code, and SQL queries.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Security & Cryptography Inputs
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Decoded JWT tokens, generated random passwords, UUID strings, and cryptographic hash inputs (SHA/MD5).
              </p>
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Health & Financial Figures
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Body weight, height, serum creatinine, sleep times, loan principal, and interest rate entries.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="local-storage" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              3
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Local Browser Storage & User Preferences
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            To provide a seamless experience without requiring user accounts or logins, we utilize the HTML5
            Web Storage API (<code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs">localStorage</code>)
            on your local browser. This storage is completely private to your device and is never synchronized
            with remote servers:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-900)]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Key Name</th>
                  <th className="py-2.5 px-3 font-semibold">Type</th>
                  <th className="py-2.5 px-3 font-semibold">Purpose</th>
                  <th className="py-2.5 px-3 font-semibold">Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--ink-900)]/5 text-[var(--ink-700)]">
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium text-[var(--ink-900)]">webtools_favorites</td>
                  <td className="py-2.5 px-3">JSON String Array</td>
                  <td className="py-2.5 px-3">Stores the routes of tools you have starred for quick access.</td>
                  <td className="py-2.5 px-3">Until manually removed or browser data cleared.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium text-[var(--ink-900)]">webtools_recents</td>
                  <td className="py-2.5 px-3">JSON Object Array</td>
                  <td className="py-2.5 px-3">Stores up to 10 recently opened tools to help you resume work.</td>
                  <td className="py-2.5 px-3">Until &quot;Clear history&quot; clicked or browser data cleared.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs leading-6 text-[var(--ink-700)]">
            You can clear all stored preferences at any time by clicking the &quot;Clear history&quot; button on the
            homepage, or by clearing your site data through your browser settings.
          </p>
        </section>

        {/* Section 4 */}
        <section id="analytics-telemetry" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              4
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Cookieless Analytics & Technical Telemetry
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            To ensure the site remains fast, accessible, and reliable across all modern devices, we utilize
            privacy-preserving telemetry through Vercel Web Analytics. Our telemetry configuration has been
            specifically hardened to respect user privacy:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              <strong>Zero Persistent Cookies:</strong> No tracking cookies, advertising IDs, or session cookies
              are created or stored on your device.
            </li>
            <li>
              <strong>IP Anonymization:</strong> IP addresses are truncated and hashed at the edge layer to determine
              only approximate geographic region (country/city level) and are never stored in raw form.
            </li>
            <li>
              <strong>No Cross-Site Tracking:</strong> We do not track user activities across external websites,
              nor do we build individual behavioral user profiles.
            </li>
            <li>
              <strong>Aggregate Metrics Only:</strong> Telemetry is strictly limited to aggregate counters: page
              URLs visited, referring domain, browser engine type, device form-factor, and HTTP response codes.
            </li>
          </ul>
        </section>

        {/* Section 5: Third-Party Advertising & Google AdSense */}
        <section id="advertising-policy" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              5
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Third-Party Advertising & Google AdSense Disclosures
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            To ensure our suite of 52 in-browser utilities remains completely free and accessible without paid subscriptions,
            we may display advertisements served by third-party advertising networks, including Google AdSense. In
            accordance with Google Publisher Policies and privacy regulations, we provide the following required disclosures:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              <strong>Third-Party Cookies:</strong> Third-party vendors, including Google, use cookies and web beacons
              to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.
            </li>
            <li>
              <strong>Personalized Ad Serving:</strong> Google&apos;s use of advertising cookies enables it and its partners
              to serve ads to our users based on their visits to {SITE_DOMAIN} and/or other sites across the World Wide Web.
            </li>
            <li>
              <strong>User Opt-Out Controls:</strong> Users may opt out of personalized advertising at any time by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
              >
                Google Ads Settings
              </a>
              . Alternatively, users can opt out of third-party vendors&apos; use of cookies for personalized advertising by
              visiting{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
              >
                www.aboutads.info
              </a>{" "}
              or{" "}
              <a
                href="https://www.youronlinechoices.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
              >
                Your Online Choices (Europe)
              </a>
              .
            </li>
            <li>
              <strong>Consent Management (EEA, UK & California):</strong> For visitors located in jurisdictions requiring
              explicit consent (such as the EU/EEA under GDPR, the UK under UK GDPR, and California under CCPA/CPRA), we
              deploy Google-certified Consent Management Platforms (CMP) to collect and record your granular ad consent choices.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="infrastructure-security" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              6
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Static Infrastructure & Security Headers
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            All HTML, CSS, JavaScript, and Web Worker assets are prerendered and served via an edge Content
            Delivery Network (CDN). We enforce strict HTTP security headers to protect your browser session:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>
              <code className="font-mono font-semibold">Strict-Transport-Security:</code> Enforces HTTPS with HSTS
              preload, preventing SSL-stripping attacks.
            </li>
            <li>
              <code className="font-mono font-semibold">X-Frame-Options: SAMEORIGIN:</code> Prevents unauthorized
              framing and clickjacking attacks.
            </li>
            <li>
              <code className="font-mono font-semibold">X-Content-Type-Options: nosniff:</code> Prevents MIME-type
              confusion attacks.
            </li>
            <li>
              <code className="font-mono font-semibold">Permissions-Policy:</code> Explicitly disables camera,
              microphone, geolocation, and browsing-topics sensor access.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="data-retention-sharing" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              7
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Data Retention, Sharing & Sale Policies
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Our operational data policy is straightforward:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              <strong>We do not collect personal data:</strong> No account registration, email newsletter prompts,
              or payment credentials are requested.
            </li>
            <li>
              <strong>We do not sell personal data:</strong> We do not sell, rent, monetize, or broker your personal
              information or usage data under any circumstances.
            </li>
            <li>
              <strong>We do not share data with AI training pools:</strong> Your text, code, images, and files
              are never ingested, indexed, or shared with large language models (LLMs) or third-party training datasets.
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section id="gdpr-ccpa-rights" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              8
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Your Rights under GDPR & CCPA/CPRA
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Whether you reside in the European Union (GDPR), the United Kingdom (UK GDPR), California (CCPA/CPRA),
            or other privacy-conscious jurisdictions, {SITE_NAME} adheres to the highest standards of data minimization.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Because we do not maintain accounts, identities, or server-side databases of your visits, there is no
            identifiable dossier to request, rectify, or delete. If you ever contact us via email, you have the right
            to request immediate deletion of our email correspondence at any time.
          </p>
        </section>

        {/* Section 9 */}
        <section id="children-privacy" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              9
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Children&apos;s Privacy (COPPA Compliance)
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} is intended for general audiences, students, developers, and professionals. We do not knowingly
            solicit, collect, or process personal data from children under the age of 13 (or under 16 in applicable
            jurisdictions). In keeping with our zero-server model, children can safely utilize our educational and
            computational tools without risk of data harvesting.
          </p>
        </section>

        {/* Section 10 */}
        <section id="security-measures" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              10
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Technical Safeguards & Sandboxing
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            All client-side operations benefit from modern browser process isolation and sandboxing. File parsers
            (such as PDF.js and image decoders) run in restricted memory scopes. We bundle our dependencies locally
            rather than loading executable scripts from external unverified CDNs, protecting you against supply-chain
            tampering.
          </p>
        </section>

        {/* Section 11 */}
        <section id="updates-contact" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              11
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Policy Updates & Privacy Inquiries
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We review and update this Privacy Policy periodically to reflect technical enhancements or regulatory
            requirements. When updates are published, the &quot;Effective Date&quot; at the top of this document
            will be revised accordingly.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            If you have questions, feedback, or verification inquiries regarding our privacy standards, please reach
            out to our data protection contact at{" "}
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
