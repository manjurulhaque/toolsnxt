import type { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout, type LegalStat, type TableOfContentsItem } from "@/components/legal-page-layout"
import { LEGAL_EFFECTIVE_DATE, SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: `Cookie & Web Storage Policy | ${SITE_NAME}`,
  description: `Discover how ${SITE_NAME} uses local browser storage for favorites and recents with zero third-party advertising cookies and cookieless aggregate analytics.`,
  alternates: {
    canonical: `${SITE_URL}/cookies`,
  },
  openGraph: {
    title: `Cookie & Storage Policy | ${SITE_NAME}`,
    description: `Full transparency report on cookies and local web storage on ${SITE_NAME}.`,
    url: `${SITE_URL}/cookies`,
  },
}

const STATS: LegalStat[] = [
  {
    label: "Advertising Cookies",
    value: "0 Cookies",
    description: "Zero marketing trackers, behavioral pixels, or cross-site ad identifiers.",
  },
  {
    label: "Local Storage Keys",
    value: "2 Keys Only",
    description: "Used exclusively for your starred favorites and recently opened tools.",
  },
  {
    label: "Server Transmission",
    value: "0 Transmission",
    description: "HTML5 local storage keys stay on your machine and never send over HTTP.",
  },
  {
    label: "Analytics",
    value: "Cookieless",
    description: "Privacy-preserving aggregate telemetry without persistent device fingerprinting.",
  },
]

const TOC: TableOfContentsItem[] = [
  { id: "overview", title: "1. Overview & Core Philosophy" },
  { id: "cookies-vs-storage", title: "2. Cookies vs. HTML5 Local Storage" },
  { id: "inventory", title: "3. Complete Inventory of Client Storage Keys" },
  { id: "advertising-policy", title: "4. Zero Third-Party Advertising Trackers" },
  { id: "analytics", title: "5. Cookieless Performance Telemetry" },
  { id: "management-guide", title: "6. How to Inspect, Clear & Disable Storage" },
  { id: "privacy-signals", title: "7. Do Not Track (DNT) & GPC Signals" },
  { id: "updates-contact", title: "8. Policy Revisions & Inquiries" },
]

export default function CookiePolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cookie Policy", item: `${SITE_URL}/cookies` },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/cookies#webpage`,
        url: `${SITE_URL}/cookies`,
        name: `Cookie & Web Storage Policy | ${SITE_NAME}`,
        description: `Detailed transparency report on browser cookies and local storage keys used by ${SITE_NAME}.`,
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
        title="Cookie & Web Storage Policy"
        subtitle="Complete transparency regarding how we store your preferences locally in your browser. We do not use third-party advertising cookies, cross-site trackers, or invasive fingerprinting."
        currentPath="/cookies"
        effectiveDate={LEGAL_EFFECTIVE_DATE}
        lastReviewedDate="October 2026"
        stats={STATS}
        tocItems={TOC}
      >
        {/* Section 1 */}
        <section id="overview" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              1
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Overview & Core Philosophy
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            At {SITE_NAME}, we believe that using utility software should not come at the expense of your digital privacy.
            Most modern websites deploy dozens of third-party advertising cookies, retargeting pixels, and tracking beacons
            that follow you across the internet.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Our approach is simple: <strong>we do not use advertising cookies</strong>. When we need to remember convenient
            user settings (such as which tools you pinned to your favorites or recently accessed), we store that data
            locally inside your own browser using HTML5 Local Storage.
          </p>
        </section>

        {/* Section 2 */}
        <section id="cookies-vs-storage" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              2
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Understanding Cookies vs. Modern HTML5 Web Storage
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            To understand how your data is handled, it is helpful to distinguish between traditional HTTP cookies and
            modern client-side Web Storage:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--ink-900)]/10 bg-[var(--page-cream)]/50 p-5">
              <h3 className="text-sm font-bold text-[var(--ink-900)]">Traditional HTTP Cookies</h3>
              <p className="mt-2 text-xs leading-6 text-[var(--ink-700)]">
                Small text files sent by a server that your browser automatically attaches to <em>every single subsequent
                network request</em> back to that server. Third-party cookies can track users across multiple websites.
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--accent-rust)]">
                &rarr; {SITE_NAME} uses ZERO third-party tracking cookies.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--ink-900)]/10 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-[var(--ink-900)]">HTML5 Local Storage (localStorage)</h3>
              <p className="mt-2 text-xs leading-6 text-[var(--ink-700)]">
                Key-value storage maintained strictly within your local browser sandbox. Data saved in localStorage is
                <em>never automatically transmitted over the network</em> with HTTP requests, providing superior privacy.
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--ink-900)]">
                &rarr; Used solely to persist your pinned tool preferences locally.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="inventory" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              3
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Complete Inventory of Client Storage Keys
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Here is an exhaustive list of every browser storage key utilized by {SITE_NAME}:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[var(--ink-900)]/10">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-900)]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Key Identifier</th>
                  <th className="py-3 px-4 font-semibold">Mechanism</th>
                  <th className="py-3 px-4 font-semibold">Content Stored</th>
                  <th className="py-3 px-4 font-semibold">Expiration</th>
                  <th className="py-3 px-4 font-semibold">Sent to Server?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--ink-900)]/5 bg-white text-[var(--ink-700)]">
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-[var(--ink-900)]">webtools_favorites</td>
                  <td className="py-3 px-4">localStorage</td>
                  <td className="py-3 px-4">
                    Array of route strings (e.g., <code className="rounded bg-black/5 px-1 py-0.5 font-mono text-[11px]">[&quot;/json-formatter&quot;, &quot;/pdf-compress&quot;]</code>)
                  </td>
                  <td className="py-3 px-4">Persistent until deleted</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">No (Local Only)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-[var(--ink-900)]">webtools_recents</td>
                  <td className="py-3 px-4">localStorage</td>
                  <td className="py-3 px-4">
                    Array of up to 10 objects (<code className="rounded bg-black/5 px-1 py-0.5 font-mono text-[11px]">&#123; href, title, category, visitedAt, count &#125;</code>)
                  </td>
                  <td className="py-3 px-4">Persistent until cleared</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">No (Local Only)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section id="advertising-policy" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              4
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Zero Third-Party Advertising Trackers
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We hold a strict policy regarding commercial tracking technologies:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--ink-700)]">
            <li><strong>No Ad Networks:</strong> We do not run Google AdSense, DoubleClick, Media.net, or ad exchange scripts.</li>
            <li><strong>No Social Media Pixels:</strong> We do not embed Meta (Facebook) Pixel, TikTok Pixel, LinkedIn Insight, or X tracking tags.</li>
            <li><strong>No Data Brokers:</strong> We do not sell or share browsing patterns with data aggregators or market research panels.</li>
            <li><strong>No Canvas Fingerprinting:</strong> We do not execute browser fingerprinting scripts to identify your hardware signature across sites.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="analytics" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              5
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Cookieless Performance Telemetry
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We use Vercel Web Analytics to monitor aggregate traffic patterns (such as popular tools and page load latency).
            This telemetry is completely <strong>cookieless</strong>:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-xs leading-6 text-[var(--ink-700)]">
            <li>It does not create or write any cookie file to your machine.</li>
            <li>It does not track individual user paths across sessions or across multiple browser tabs.</li>
            <li>Visitor counts are aggregated using temporary cryptographic hashes that cycle daily to prevent cross-day profiling.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="management-guide" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              6
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              How to Inspect, Clear & Disable Browser Storage
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            You maintain absolute control over the data saved in your browser:
          </p>

          <div className="space-y-3">
            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-white p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Method 1: Instant In-App Reset
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Navigate to the <Link href="/" className="font-semibold underline text-[var(--accent-rust)]">Homepage</Link>{" "}
                and locate the &quot;Recently Visited&quot; section. Clicking the &quot;Clear history&quot; button immediately
                wipes your recent tools log.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-white p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Method 2: Google Chrome & Microsoft Edge
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Press <kbd className="rounded border bg-black/5 px-1 py-0.5 font-mono text-[11px]">F12</kbd> &rarr; Application tab &rarr; Storage &rarr; Local Storage &rarr; Click <code className="font-mono">Clear Site Data</code>.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-white p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Method 3: Mozilla Firefox
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Settings &rarr; Privacy & Security &rarr; Cookies and Site Data &rarr; Manage Data &rarr; Search &quot;manjurul.com&quot; &rarr; Remove Selected.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--ink-900)]/8 bg-white p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                Method 4: Apple Safari (macOS & iOS)
              </h4>
              <p className="mt-1 text-xs leading-5 text-[var(--ink-700)]">
                Safari Settings &rarr; Privacy &rarr; Manage Website Data &rarr; Remove data for &quot;manjurul.com&quot;.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section id="privacy-signals" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              7
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Do Not Track (DNT) & Global Privacy Control (GPC)
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            We honor modern browser privacy mechanisms. Because our architecture is inherently devoid of advertising
            and tracking networks, our operations naturally comply with Do Not Track (DNT) and Global Privacy Control (GPC)
            signals by default.
          </p>
        </section>

        {/* Section 8 */}
        <section id="updates-contact" className="scroll-mt-28 space-y-4 border-t border-[var(--ink-900)]/10 pt-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-rust)]/10 font-mono text-xs font-bold text-[var(--accent-rust)]">
              8
            </span>
            <h2 className="text-xl font-bold text-[var(--ink-900)] sm:text-2xl">
              Policy Revisions & Inquiries
            </h2>
          </div>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            Should we ever introduce new client-side features that utilize additional web storage keys, this document
            will be updated with exact key names, data schemas, and clearing procedures.
          </p>
          <p className="text-sm leading-7 text-[var(--ink-700)]">
            For questions regarding browser storage or cookie policies, contact us at{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
            >
              {SITE_CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </LegalPageLayout>
    </>
  )
}
