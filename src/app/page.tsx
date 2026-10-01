import type { Metadata } from "next"
import Link from "next/link"
import { HeroIntro, SummaryTile, ToolPanel } from "@/components/tool-page"
import { ToolSearchDirectory } from "@/components/tool-search-directory"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site"
import { toolCategories, tools, toolsByCategory } from "@/lib/tools"

export const metadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_TAGLINE} - 52 Free In-Browser Tools`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | 52 Free In-Browser Utilities`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
    ],
  }

  return (
    <div className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <ToolPanel className="sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <HeroIntro eyebrow="Tool directory" title="Browser tools for everyday work.">
                Pick a utility below. All 52 tools process files and text locally in your browser,
                meaning zero server uploads, total privacy, and instant responsiveness.
              </HeroIntro>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-80">
              <SummaryTile label="Tools" value={tools.length} />
              <SummaryTile label="Categories" value={toolCategories.length} />
              <SummaryTile label="Local Execution" value="100%" />
            </div>
          </div>
        </ToolPanel>

        {/* Interactive Tool Search & Filter Directory */}
        <ToolSearchDirectory
          allTools={tools}
          categories={toolCategories}
          toolsByCategory={toolsByCategory}
        />

        {/* Editorial Architecture & Trust Section */}
        <section className="mt-16 space-y-12 border-t border-[var(--ink-900)]/10 pt-12">
          {/* Core Philosophy Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-lg text-[var(--accent-rust)]">
                🛡️
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">
                Zero Server Data Storage
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Your documents, source code, images, and calculations never leave your machine.
                Everything executes locally in your browser runtime via HTML5 Canvas, Web Workers,
                and WebAssembly.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-lg text-[var(--accent-rust)]">
                ⚡
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">
                Zero Cloud Upload Latency
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Skip remote server queues. Large PDFs and high-resolution images process instantly
                using your device&apos;s physical hardware, delivering instant results without upload bottlenecks.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-lg text-[var(--accent-rust)]">
                📱
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">
                Progressive Web App Ready
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Install {SITE_NAME} to your desktop or mobile home screen as a standalone application.
                Star your favorite utilities for instant one-click access directly from the top navigation.
              </p>
            </div>
          </div>

          {/* Detailed Domain Overview */}
          <div className="rounded-[2rem] border border-[var(--ink-900)]/10 bg-white p-8 sm:p-10 shadow-[0_18px_50px_rgba(33,37,41,0.06)]">
            <h2 className="font-serif text-2xl font-bold text-[var(--ink-900)] sm:text-3xl">
              Comprehensive Browser Utilities Across 7 Disciplines
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ink-700)]">
              {SITE_NAME} unifies everyday productivity tasks into a distraction-free, privacy-preserving workspace.
              Whether you are a software developer, web designer, student, health researcher, or digital marketer,
              our utilities provide authoritative mathematical calculations and file transformations:
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  PDF & Document Tools
                </h4>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  In-browser PDF compression, document merging, page splitting, and PDF-to-image extraction
                  powered by client-side Web Workers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Image & Media Utilities
                </h4>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Convert between PNG, JPG, and WebP, generate multi-size favicon packages, resize banners,
                  and render creative ASCII art directly on HTML5 Canvas.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Code Minifiers & Converters
                </h4>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Compress HTML, CSS, and JavaScript using Terser and CSSO; optimize vector SVGs, convert YAML
                  to JSON, and generate TypeScript interfaces from raw payloads.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Calculators & Health Formulas
                </h4>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Scientific calculations, loan amortization schedules, BMI, Ideal Body Weight,
                  Cockcroft-Gault Creatinine Clearance, and optimal sleep cycle estimators.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  Security & Cryptography
                </h4>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Cryptographically secure password generation using browser CSPRNG, v4 UUIDs, SHA-256/512 hashes,
                  and client-side JWT token structure inspection.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                  SEO & Webmaster Tools
                </h4>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Generate compliant robots.txt directives, XML sitemaps, OpenGraph social meta tags, and test
                  web accessibility with our screen reader simulator.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ink-900)]/10 pt-6">
              <p className="text-xs text-[var(--ink-700)]">
                Have questions or need technical support? Visit our{" "}
                <Link href="/contact" className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]">
                  Contact & Support
                </Link>{" "}
                center or review our{" "}
                <Link href="/privacy" className="font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]">
                  Privacy Policy
                </Link>
                .
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold text-[var(--ink-900)] transition hover:border-[var(--accent-rust)]/30 hover:bg-white"
              >
                Learn more about {SITE_NAME} &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
