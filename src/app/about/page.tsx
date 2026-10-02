import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, type LegalStat, type TableOfContentsItem } from "@/components/legal-page-layout"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: `About Us | Mission & In-Browser Technology | ${SITE_NAME}`,
  description: `Discover the mission and technology behind ${SITE_NAME}. We build private, fast, 100% in-browser utilities that run locally on your device with zero server storage.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description: `Learn about the mission, architecture, and principles of ${SITE_NAME}.`,
    url: `${SITE_URL}/about`,
  },
}

const STATS: LegalStat[] = [
  {
    label: "Utilities",
    value: "52 Tools",
    description: "Covering document processing, media, developer tools, and math.",
  },
  {
    label: "Architecture",
    value: "100% Local",
    description: "Every tool executes in your browser's private memory sandbox.",
  },
  {
    label: "Offline Support",
    value: "100% PWA",
    description: "Background Service Worker caches all 52 tools for full offline usage.",
  },
  {
    label: "Pricing",
    value: "100% Free",
    description: "No accounts, no paywalls, no subscriptions, and no trial limits.",
  },
  {
    label: "Standards",
    value: "WCAG 2.1 AA",
    description: "Designed for full screen reader and keyboard accessibility.",
  },
]

const TOC: TableOfContentsItem[] = [
  { id: "mission", title: "1. Our Mission & Purpose" },
  { id: "zero-server-tech", title: "2. The Zero-Server Technology Architecture" },
  { id: "domains", title: "3. Scope of Our 52 Browser Utilities" },
  { id: "editorial-standards", title: "4. Editorial Standards & Formula Accuracy" },
  { id: "accessibility-commitment", title: "5. Digital Accessibility & WCAG Standards" },
  { id: "publisher-contact", title: "6. Publisher Transparency & Contact Channels" },
]

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about` },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: `About Us | ${SITE_NAME}`,
        description: `Mission, editorial principles, and technology architecture behind ${SITE_NAME}.`,
        datePublished: "2026-07-02",
        dateModified: "2026-10-01",
        inLanguage: "en-US",
        publisher: {
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
        title="About Us"
        subtitle="Empowering developers, students, creators, and everyday web users with fast, distraction-free browser utilities that respect your privacy by never sending your files to a server."
        currentPath="/about"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
        lastReviewedDate="October 2026"
        stats={STATS}
        tocItems={TOC}
      >
        {/* Section 1 */}
        <section id="mission" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              1
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Our Mission & Purpose
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} was founded on a simple realization: everyday web tasks—like minifying code, converting an image,
            compressing a PDF, or calculating a loan schedule—should not require uploading sensitive personal or business
            documents to mysterious cloud servers, nor should they require bloated desktop software or recurring subscription paywalls.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Our mission is to engineer the web&apos;s most reliable, elegant, and private utility platform. By shifting all
            computational work from remote cloud servers into your local browser, we ensure that your private data stays on
            your machine, jobs complete with zero network upload latency, and our platform remains completely free to use.
          </p>
        </section>

        {/* Section 2 */}
        <section id="zero-server-tech" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              2
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              The Zero-Server Technology Architecture
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Modern web browsers are capable of extraordinary computational performance. Rather than using web servers to
            process user requests, our platform operates as a suite of client-side desktop-class applications delivered
            through modern browser primitives:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li>
              <strong>HTML5 Canvas & WebGL:</strong> Image resizing, format conversions (JPG, PNG, WebP), and vector rendering
              execute directly on your device&apos;s graphics hardware without pixel data leaving local RAM.
            </li>
            <li>
              <strong>Web Workers & WebAssembly:</strong> Computationally intensive workloads—including PDF decompression,
              AST JavaScript minification, and cryptographic hashing—run on background browser worker threads, ensuring the UI
              remains buttery-smooth and responsive.
            </li>
            <li>
              <strong>Edge CDN Delivery:</strong> The site is prerendered into immutable static assets served from edge
              data centers globally, resulting in sub-50ms page load times across North America, Europe, Asia, and worldwide.
            </li>
            <li>
              <strong>Full Offline PWA Service Worker:</strong> Our background Service Worker caches all 52 utility tools,
              application scripts, and stylesheets locally. Once visited, the entire platform remains 100% functional without an
              internet connection, making it ideal for travel, offline fieldwork, or airplane productivity.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section id="domains" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              3
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Scope of Our 52 Browser Utilities
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Our catalog covers seven core disciplines of digital productivity:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 text-xs text-[var(--ink-700)]">
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <strong className="text-[var(--ink-900)]">Document & PDF Tools:</strong> Compress, merge, split, and extract images from PDF documents.
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <strong className="text-[var(--ink-900)]">Media & Graphics:</strong> Convert between WebP/PNG/JPG, generate favicons, and create SVG assets.
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <strong className="text-[var(--ink-900)]">Developer Utilities:</strong> Minify HTML, CSS, and JS; convert YAML/JSON; generate TypeScript interfaces.
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <strong className="text-[var(--ink-900)]">Mathematics & Health:</strong> Calculate loan schedules, scientific functions, CrCl, and BMI formulas.
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <strong className="text-[var(--ink-900)]">Cryptography & Security:</strong> Generate secure passwords, inspect JWT payloads, and compute SHA hashes.
            </div>
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-4">
              <strong className="text-[var(--ink-900)]">SEO & Webmaster:</strong> Generate robots.txt files, XML sitemaps, and preview social OpenGraph cards.
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="editorial-standards" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              4
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Editorial Standards & Formula Accuracy
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Every utility on {SITE_NAME} is accompanied by an original, in-depth technical guide. We do not generate
            boilerplate or scrape external content. Our technical guides detail:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>The mathematical formulas and algorithms behind each calculation (e.g., standard amortization, Cockcroft-Gault CrCl).</li>
            <li>Step-by-step instructions for power users and beginners.</li>
            <li>Edge case handling and computational precision limits (such as JavaScript IEEE 754 floating-point considerations).</li>
            <li>Practical verification checklists and worked mathematical examples.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="accessibility-commitment" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              5
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Digital Accessibility & WCAG Standards
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We believe that accessibility is a foundational requirement, not an afterthought. Our design system adheres to
            Web Content Accessibility Guidelines (WCAG 2.1 Level AA) standards:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>High-contrast typography using curated warm-editorial tokens (<code className="font-mono text-xs">#212529</code> on <code className="font-mono text-xs">#f5efe6</code>).</li>
            <li>Full keyboard navigability across search dialogs, form inputs, and interactive cards (tabIndex, ARIA roles).</li>
            <li>Proper semantic HTML hierarchy with explicit landmark regions and single H1 headings per route.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="publisher-contact" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              6
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Publisher Transparency & Contact Channels
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            {SITE_NAME} is developed and maintained by independent web engineers committed to an open, private web.
            We welcome constructive feedback, bug reports, and suggestions from our global community of users.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Have a question, proposal, or feedback? You can reach us directly anytime at{" "}
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
