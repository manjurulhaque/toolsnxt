import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, type LegalStat, type TableOfContentsItem } from "@/components/legal-page-layout"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: `Disclaimer & Professional Limits | ${SITE_NAME}`,
  description: `Important disclosures for calculators, health utilities, financial tools, and code minifiers on ${SITE_NAME}. Verification recommendations and professional advice limits.`,
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  openGraph: {
    title: `Disclaimer | ${SITE_NAME}`,
    description: `Professional limitations and category disclaimers for ${SITE_NAME} utilities.`,
    url: `${SITE_URL}/disclaimer`,
  },
}

const STATS: LegalStat[] = [
  {
    label: "Medical Scope",
    value: "Non-Diagnostic",
    description: "Formulas are statistical approximations and do not substitute medical care.",
  },
  {
    label: "Financial Scope",
    value: "Estimates Only",
    description: "Calculations exclude lender escrow, statutory taxes, and specific closing fees.",
  },
  {
    label: "Cryptography",
    value: "Browser CSPRNG",
    description: "JWT tool decodes payload structure without private key verification.",
  },
  {
    label: "Code Tools",
    value: "Verification Advised",
    description: "Always back up source files and test minified assets before production.",
  },
]

const TOC: TableOfContentsItem[] = [
  { id: "general-scope", title: "1. General Informational Use & Convenience" },
  { id: "medical-health", title: "2. Health & Medical Calculators Disclaimer" },
  { id: "financial-loan", title: "3. Financial & Loan Calculators Disclaimer" },
  { id: "security-crypto", title: "4. Cryptographic & Security Utilities" },
  { id: "developer-minifiers", title: "5. Code Minifiers, Parsers & Transformers" },
  { id: "units-timezones", title: "6. Unit, Measurement & Timezone Conversions" },
  { id: "no-professional-rel", title: "7. Absence of Professional Relationship" },
  { id: "verification-duty", title: "8. User Verification & Assumption of Risk" },
]

export default function DisclaimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Disclaimer", item: `${SITE_URL}/disclaimer` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/disclaimer#webpage`,
        url: `${SITE_URL}/disclaimer`,
        name: `Disclaimer & Professional Advice Limits | ${SITE_NAME}`,
        description: `Legal limitations and domain-specific disclaimers for ${SITE_NAME} web utilities.`,
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
        title="Disclaimer & Professional Limits"
        subtitle="Crucial disclosures and domain-specific guidance regarding health calculators, financial estimators, cryptographic generators, and code minifiers. Always verify critical results before reliance."
        currentPath="/disclaimer"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
        lastReviewedDate="October 2026"
        stats={STATS}
        tocItems={TOC}
      >
        {/* Section 1 */}
        <section id="general-scope" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              1
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              General Informational Use & Convenience Scope
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            The calculators, converters, minifiers, generators, simulators, and informational guides published on{" "}
            {SITE_NAME} (&quot;the Service&quot;) are provided strictly for general educational, productivity, and
            convenience purposes.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            While we strive for technical excellence, computational fidelity, and mathematical accuracy, the software
            operates without human intervention or personalized review. Outputs may reflect rounding variations,
            edge-case behavior, or limitations inherent to browser-based JavaScript execution.
          </p>
        </section>

        {/* Section 2 */}
        <section id="medical-health" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              2
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Health, Fitness & Medical Calculators Disclaimer
            </h2>
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-red-50/60 p-5 text-red-950">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-700">
              Important Medical Disclosure
            </h3>
            <p className="mt-2 text-xs leading-6 text-red-900">
              The health utilities on this website—including the <strong>BMI Calculator</strong>,{" "}
              <strong>Body Weight Calculator</strong>, <strong>Creatinine Clearance Calculator</strong>, and{" "}
              <strong>Sleep Time Calculator</strong>—are NOT medical diagnostic instruments, clinical treatment plans,
              or prescription dosing systems. They do NOT constitute medical advice.
            </p>
          </div>

          <p className="text-sm leading-7 text-[var(--ink-700)]">
            These tools implement recognized population-level statistical equations (such as the Cockcroft-Gault
            formula for estimated renal clearance, the Mifflin-St Jeor equation for basal metabolic rate, and the
            Quetelet index for BMI). However:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              Formulas do not account for individual clinical factors such as muscle mass, fluid overload, severe obesity,
              amputations, renal transplant history, pregnancy, or metabolic disorders.
            </li>
            <li>
              Never adjust medications, therapeutic regimens, or pharmaceutical dosages based solely on calculations
              generated by this site.
            </li>
            <li>
              Always consult a licensed medical doctor, nephrologist, clinical pharmacist, or registered dietitian
              for personalized medical guidance. If you are experiencing a medical emergency, call your local emergency
              services immediately.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="financial-loan" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              3
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Financial, Loan & Percentage Calculators Disclaimer
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            The <strong>Loan Calculator</strong> and <strong>Percentage Calculator</strong> provide mathematical
            simulations based on standard amortization formulas and algebraic ratios.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              Calculations do NOT constitute an offer of credit, loan pre-approval, commitment to lend, or certified
              financial or tax advice.
            </li>
            <li>
              Estimates typically exclude real-world loan overhead such as origination points, appraisal fees, title insurance,
              private mortgage insurance (PMI), property tax escrow, home insurance, and specific day-count conventions
              (such as Actual/360 or 30/360).
            </li>
            <li>
              Before committing to legally binding mortgage agreements, commercial loans, or investment strategies, consult
              a certified financial planner (CFP), accountant, or licensed lending officer.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="security-crypto" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              4
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Cryptographic, Password & Security Utilities
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Our security utilities (including the <strong>Password Generator</strong>, <strong>UUID Generator</strong>,{" "}
            <strong>Hash Generator</strong>, and <strong>JWT Decoder</strong>) are engineered using standard web cryptographic APIs:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              <strong>JWT Decoder Notice:</strong> The JWT Decoder tool parses and reveals the Base64URL-encoded JSON
              header and claims payload for debugging and development. It does <em>NOT</em> cryptographically verify the
              signature against private/public keys, nor does it validate token expiry or revocation status against an
              identity provider. Never trust decoded claims without independent server-side cryptographic signature validation.
            </li>
            <li>
              <strong>Cryptographic Randomness:</strong> Random string and UUID generation utilize the host browser&apos;s
              <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-xs">crypto.getRandomValues()</code> CSPRNG.
              While cryptographically strong, browser-generated keys do not offer Hardware Security Module (HSM) tamper protection.
            </li>
            <li>
              <strong>Legacy Hash Algorithms:</strong> The Hash Generator includes legacy algorithms (MD5 and SHA-1) solely
              for compatibility and historical checksum comparisons. Neither MD5 nor SHA-1 is secure against intentional
              cryptographic collision attacks and should never be used for password hashing or digital signatures.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="developer-minifiers" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              5
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Code Minifiers, Parsers & Transformers
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Utilities such as the <strong>HTML/CSS/JS Minifier</strong>, <strong>SVG Optimizer</strong>,{" "}
            <strong>Text Diff Checker</strong>, <strong>Regex Tester</strong>, and <strong>JSON/YAML Converters</strong>{" "}
            perform aggressive lexical parsing and AST dead-code elimination:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              While based on industry-standard engines (Terser, CSSO, SVGO), minification can occasionally introduce subtle
              semantic bugs if source code relies on non-standard JavaScript quirks, dynamic <code className="font-mono text-xs">eval()</code>,
              reflection, or unscoped CSS custom properties.
            </li>
            <li>
              <strong>Mandatory Backup Requirement:</strong> Always maintain unminified, version-controlled source files.
              Never overwrite production code without verifying minified artifacts in a staging environment.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="units-timezones" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              6
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Unit, Measurement & Timezone Conversions
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            The <strong>Unit Converter</strong> and <strong>Timezone Converter</strong> rely on standard international
            conversion constants and the IANA Time Zone Database available in the host browser. Due to geopolitical daylight
            saving adjustments, leap seconds, and precision limits, critical scientific, navigational, or astronomical
            measurements should be corroborated through primary standards organizations (such as NIST or BIPM).
          </p>
        </section>

        {/* Section 7 */}
        <section id="no-professional-rel" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              7
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Absence of Professional Relationship
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Your use of {SITE_NAME}, its calculators, or email communication with its maintainers does not create an
            attorney-client, doctor-patient, accountant-client, fiduciary, or any other professional advisory relationship.
            The site operator is not your physician, attorney, broker, or financial advisor.
          </p>
        </section>

        {/* Section 8 */}
        <section id="verification-duty" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              8
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              User Verification & Assumption of Risk
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            You expressly acknowledge and agree that your use of the Service is at your sole risk. You assume full
            responsibility for verifying the accuracy, completeness, and appropriateness of any calculations, code,
            images, or files generated through {SITE_NAME} before publishing, deploying, signing, or relying upon them.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            If you identify a calculation inaccuracy or bug in any of our tools, please notify us immediately at{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
            >
              {SITE_CONTACT_EMAIL}
            </a>{" "}
            or via our{" "}
            <Link
              href="/contact"
              className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
            >
              Contact page
            </Link>
            .
          </p>
        </section>
      </LegalPageLayout>
    </>
  )
}
