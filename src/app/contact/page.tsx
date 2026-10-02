import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, type LegalStat, type TableOfContentsItem } from "@/components/legal-page-layout"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: `Contact & Support | ${SITE_NAME}`,
  description: `Get in touch with the ${SITE_NAME} team for support, feature suggestions, bug reports, legal notices, privacy requests, or accessibility feedback.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact & Support | ${SITE_NAME}`,
    description: `Support channels, bug reports, and legal inquiries for ${SITE_NAME}.`,
    url: `${SITE_URL}/contact`,
  },
}

const STATS: LegalStat[] = [
  {
    label: "Primary Channel",
    value: "Direct Email",
    description: `Reach our maintainers directly at ${SITE_CONTACT_EMAIL}.`,
  },
  {
    label: "Response Target",
    value: "24–48 Hours",
    description: "Typical turnaround time for technical, legal, and privacy inquiries.",
  },
  {
    label: "Privacy Focus",
    value: "Zero Tracking",
    description: "No intrusive marketing forms or third-party CRM trackers.",
  },
  {
    label: "Community",
    value: "Open Feedback",
    description: "Tool suggestions, algorithm corrections, and feature requests welcome.",
  },
]

const TOC: TableOfContentsItem[] = [
  { id: "direct-contact", title: "1. Direct Communication Channels" },
  { id: "inquiry-categories", title: "2. Categorized Inquiry Guidelines" },
  { id: "bug-reports", title: "3. How to Report a Bug or Calculation Error" },
  { id: "feature-requests", title: "4. Requesting New Tools or Formats" },
  { id: "dmca-copyright", title: "5. DMCA, Copyright & Legal Notices" },
  { id: "security-disclosure", title: "6. Responsible Security Vulnerability Disclosure" },
  { id: "accessibility-feedback", title: "7. Accessibility & Usability Inquiries" },
  { id: "support-faq", title: "8. Support & Service FAQ" },
]

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Contact & Support", item: `${SITE_URL}/contact` },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: `Contact & Support | ${SITE_NAME}`,
        description: `Official contact information and support channels for ${SITE_NAME}.`,
        datePublished: "2026-07-02",
        dateModified: "2026-10-01",
        inLanguage: "en-US",
        mainEntity: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          email: SITE_CONTACT_EMAIL,
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
        title="Contact & Support"
        subtitle="Have a question, identified a calculation discrepancy, want to suggest a new browser utility, or need to send a legal notice? Reach our engineering and editorial team directly."
        currentPath="/contact"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
        lastReviewedDate="October 2026"
        stats={STATS}
        tocItems={TOC}
      >
        {/* Section 1 */}
        <section id="direct-contact" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              1
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Direct Communication Channels
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We operate without clunky third-party ticketing forms or marketing automation funnels to preserve your
            privacy. For all technical, legal, and operational inquiries, please email our team directly:
          </p>

          <div className="rounded-2xl border border-[var(--accent-rust)]/20 bg-[var(--accent-rust)]/5 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-rust)]">
              Official Contact Email
            </p>
            <p className="mt-2 font-mono text-2xl font-bold text-[var(--ink-900)] sm:text-3xl">
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="underline hover:text-[var(--accent-rust)] transition-colors"
              >
                {SITE_CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-3 text-xs leading-6 text-[var(--ink-700)]">
              Expected turnaround time: <strong>24 to 48 business hours</strong>. All emails are reviewed by our
              core maintainers. For privacy questions, please consult our{" "}
              <Link href="/privacy" className="font-semibold text-[var(--accent-rust)] underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="inquiry-categories" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              2
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Categorized Inquiry Guidelines
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            To help us expedite your request, choose the appropriate category below to see recommended details:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}?subject=[Bug%20Report]%20Tool%20Issue`}
              className="group block rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-5 transition hover:border-[var(--accent-rust)]/30 hover:bg-white hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Technical
                </span>
                <span className="text-xs text-[var(--ink-700)] group-hover:text-[var(--accent-rust)]">&rarr;</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                Bug Reports & Errors
              </h3>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Report unexpected calculation results, parser crashes, or browser rendering discrepancies.
              </p>
            </a>

            <a
              href={`mailto:${SITE_CONTACT_EMAIL}?subject=[Feature%20Request]%20New%20Tool%20Suggestion`}
              className="group block rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-5 transition hover:border-[var(--accent-rust)]/30 hover:bg-white hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Enhancement
                </span>
                <span className="text-xs text-[var(--ink-700)] group-hover:text-[var(--accent-rust)]">&rarr;</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                Feature & Tool Requests
              </h3>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Suggest new in-browser calculators, converters, minifiers, or expanded export formats.
              </p>
            </a>

            <a
              href={`mailto:${SITE_CONTACT_EMAIL}?subject=[Legal%20Notice]%20DMCA%20or%20Copyright`}
              className="group block rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-5 transition hover:border-[var(--accent-rust)]/30 hover:bg-white hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Legal
                </span>
                <span className="text-xs text-[var(--ink-700)] group-hover:text-[var(--accent-rust)]">&rarr;</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                DMCA & Legal Notices
              </h3>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Submit intellectual property inquiries, trademark notices, or formal legal correspondence.
              </p>
            </a>

            <a
              href={`mailto:${SITE_CONTACT_EMAIL}?subject=[Accessibility]%20A11y%20Feedback`}
              className="group block rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-5 transition hover:border-[var(--accent-rust)]/30 hover:bg-white hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Usability
                </span>
                <span className="text-xs text-[var(--ink-700)] group-hover:text-[var(--accent-rust)]">&rarr;</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                Accessibility Feedback
              </h3>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Share suggestions for screen reader compatibility, keyboard navigation, or color contrast.
              </p>
            </a>
          </div>
        </section>

        {/* Section 3 */}
        <section id="bug-reports" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              3
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              How to Report a Bug or Calculation Error
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            When reporting a technical problem, including the following specifics allows us to diagnose and patch
            the issue swiftly:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li><strong>Tool URL:</strong> The specific page URL (e.g. <code className="font-mono text-xs">/creatinine-clearance-calculator</code>).</li>
            <li><strong>Environment:</strong> Your operating system (macOS, Windows, Linux, iOS, Android) and browser version (Chrome 124, Safari 17, Firefox 125).</li>
            <li><strong>Sample Input:</strong> The non-sensitive input string, formula values, or test file that caused the unexpected result.</li>
            <li><strong>Expected vs. Observed Result:</strong> What you expected the tool to calculate or render versus what actually occurred.</li>
            <li><strong>Console Output:</strong> Any red error messages logged to your browser&apos;s Developer Console (F12 &rarr; Console).</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="feature-requests" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              4
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Requesting New Tools or Formats
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We are constantly expanding our collection of in-browser utilities. When suggesting a tool, please consider:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>Can the tool execute 100% locally in the browser without requiring external paid server APIs?</li>
            <li>What common file formats, standard specifications, or mathematical formulas should it support?</li>
            <li>Who is the primary audience (developers, designers, students, researchers, everyday web users)?</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="dmca-copyright" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              5
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              DMCA, Copyright & Legal Notices
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} respects intellectual property rights. If you believe that content on our website infringes
            upon your copyright or trademark, please submit a formal notice containing:
          </p>
          <ol className="list-decimal space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>Physical or electronic signature of the authorized copyright holder or legal representative.</li>
            <li>Clear identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL on {SITE_NAME} where the allegedly infringing material is located.</li>
            <li>Your contact information (name, postal address, telephone number, and email address).</li>
            <li>A statement that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement, under penalty of perjury, that the information in your notice is accurate.</li>
          </ol>
        </section>

        {/* Section 6 */}
        <section id="security-disclosure" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              6
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Responsible Security Vulnerability Disclosure
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We value the contributions of security researchers. If you discover a security vulnerability or header
            misconfiguration on {SITE_NAME}, please report it responsibly:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>Email details to <code className="font-mono text-xs">{SITE_CONTACT_EMAIL}</code> with the subject <code className="font-mono text-xs">[SECURITY DISCLOSURE]</code>.</li>
            <li>Provide reasonable time for our team to remediate the issue prior to public disclosure.</li>
            <li>Do not attempt to access other users&apos; devices or disrupt our edge hosting infrastructure.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="accessibility-feedback" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              7
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Accessibility & Usability Inquiries
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We are dedicated to ensuring digital accessibility for all users, including individuals with visual,
            auditory, motor, or cognitive disabilities. We aim to conform with WCAG 2.1 AA guidelines across all 52 tools.
            If you encounter accessibility barriers, keyboard navigation traps, or screen reader difficulties, please
            let us know so we can implement remediations promptly.
          </p>
        </section>

        {/* Section 8 */}
        <section id="support-faq" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              8
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Support & Service FAQ
            </h2>
          </div>

          <div className="space-y-3">
            <details className="rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--ink-900)]">
                Can I use tool outputs for commercial client projects?
              </summary>
              <p className="mt-2 text-xs leading-6 text-[var(--ink-700)]">
                Yes. You retain 100% intellectual property ownership of all minified code, converted images,
                generated SVG assets, and calculations. You are free to incorporate them into commercial projects,
                client deliverables, or proprietary applications without licensing fees.
              </p>
            </details>

            <details className="rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--ink-900)]">
                Do you offer paid enterprise or dedicated API endpoints?
              </summary>
              <p className="mt-2 text-xs leading-6 text-[var(--ink-700)]">
                Our tools are intentionally engineered to execute client-side in the browser to maintain zero-cost
                and total data privacy. We do not provide server-side cloud APIs. If you need offline capability,
                you can install the website as a Progressive Web App (PWA) on your device.
              </p>
            </details>

            <details className="rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--ink-900)]">
                How do I suggest a new calculator or converter?
              </summary>
              <p className="mt-2 text-xs leading-6 text-[var(--ink-700)]">
                Send an email to <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="underline text-[var(--accent-rust)]">{SITE_CONTACT_EMAIL}</a>{" "}
                with your idea, the mathematical formula or transformation specification, and any reference documentation.
              </p>
            </details>
          </div>
        </section>
      </LegalPageLayout>
    </>
  )
}
