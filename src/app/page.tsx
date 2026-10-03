import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CodeIcon,
  FilePdfIcon,
  GlobeSearchIcon,
  HeartPulseIcon,
  ImageIcon,
  LayersIcon,
  ShieldCheckIcon,
  ShieldLockIcon,
  SmartphoneIcon,
  WrenchIcon,
  ZapIcon,
} from "@/components/icons"
import { HeroIntro, SummaryTile, ToolPanel } from "@/components/tool-page"
import { ToolSearchDirectory } from "@/components/tool-search-directory"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site"
import { toolCategories, tools, toolsByCategory } from "@/lib/tools"

const pageTitle = `${SITE_NAME} | 52 Free In-Browser Tools, Calculators & PDF Utilities`
const pageDescription =
  "Free, fast, and 100% private in-browser tools. Merge PDFs, convert images, format JSON, calculate formulas, and generate code offline with zero server uploads."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "free online tools",
    "browser utilities",
    "pdf tools",
    "pdf merge",
    "image converter",
    "json formatter",
    "offline pwa tools",
    "client-side tools",
    "private developer utilities",
    "code minifier",
    "unit converter",
    "qr code generator",
    "password generator",
    "scientific calculator",
    "free web tools",
    "in-browser converters",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
}

const homeFaqs = [
  {
    question: "Are my files, documents, or data uploaded to a server?",
    answer:
      "No. Every single utility on Manjurul operates 100% locally within your browser. Calculations, file conversions, PDF processing, and cryptographic operations run via client-side JavaScript, Web Workers, HTML5 Canvas, and WebAssembly. Your data never touches a remote server or cloud database.",
  },
  {
    question: "Can I use these web tools offline without an internet connection?",
    answer:
      "Yes. Manjurul is engineered as an installable Progressive Web App (PWA). Once loaded in your browser or installed on your desktop or mobile device, our Service Worker caches all 52 utilities, allowing you to use them seamlessly anywhere without Wi-Fi or cellular data.",
  },
  {
    question: "Are all 52 browser tools completely free to use?",
    answer:
      "Yes. All utilities are 100% free with no hidden charges, no premium paywalls, no usage limits, and no account registration or credit card required.",
  },
  {
    question: "What categories of tools are available?",
    answer:
      "The platform provides utilities across 7 key disciplines: PDF manipulation (merge, split, compress, convert), image processing (converter, resizer, favicon generator, ASCII art), developer converters (JSON formatter, YAML-JSON, regex tester, code minifiers), health and mathematics calculators (BMI, Creatinine Clearance, Loan, Scientific), security (password and UUID generators, hash computation, JWT decoder), SEO utilities (robots.txt and XML sitemap generators), and focus timers (Pomodoro, stopwatch, interval timer).",
  },
  {
    question: "How fast is in-browser processing compared to cloud tools?",
    answer:
      "Because all operations execute locally using your device's physical CPU and GPU hardware, there is zero network upload or download latency. Large PDFs, massive code files, and high-resolution images process near-instantaneously without waiting in cloud queues.",
  },
  {
    question: "Which browsers and devices are supported?",
    answer:
      "Manjurul is compatible with all modern web browsers including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Chromium-based mobile browsers on Windows, macOS, Linux, iOS, and Android.",
  },
]

const popularTools = [
  { title: "PDF Merge", href: "/pdf-merge" },
  { title: "Image Converter", href: "/image-converter" },
  { title: "JSON Formatter", href: "/json-formatter" },
  { title: "QR Code Generator", href: "/qr-code-generator" },
  { title: "Password Generator", href: "/password-generator" },
  { title: "HTML, CSS & JS Minifier", href: "/html-css-js-minifier" },
  { title: "Scientific Calculator", href: "/scientific-calculator" },
  { title: "XML Sitemap Generator", href: "/xml-sitemap-generator" },
  { title: "Base64 Encoder / Decoder", href: "/base64-encoder-decoder" },
  { title: "Typing Speed Test", href: "/typing-speed-test" },
]

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
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}#webapp`,
        name: `${SITE_NAME} - 52 Free In-Browser Utilities`,
        url: SITE_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "100% Private Client-Side Execution",
          "Zero Cloud Upload Latency",
          "Full Offline PWA Support",
          "PDF Merge, Split, Compress & Conversion",
          "Image Formatting, Resizing & Favicon Generation",
          "Developer Minifiers, JSON Formatter & Converters",
          "Cryptographic Hash, UUID & Password Generation",
          "Scientific & Health Calculators",
        ],
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
      {
        "@type": "FAQPage",
        mainEntity: homeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
            <div className="max-w-2xl min-w-0">
              <HeroIntro eyebrow="100% Private & Offline" title="Free in-browser tools for everyday work.">
                Pick a utility below. All 52 tools process files and text locally in your browser with full offline PWA support—meaning
                zero server uploads, complete privacy, and instant responsiveness even without an internet connection.
              </HeroIntro>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto lg:min-w-[420px] lg:shrink-0">
              <SummaryTile
                label="Tools"
                value={tools.length}
                icon={<WrenchIcon className="h-4 w-4 shrink-0" />}
              />
              <SummaryTile
                label="Categories"
                value={toolCategories.length}
                icon={<LayersIcon className="h-4 w-4 shrink-0" />}
              />
              <SummaryTile
                label="Offline"
                value="100% PWA"
                icon={<ShieldCheckIcon className="h-4 w-4 shrink-0" />}
                className="col-span-2 sm:col-span-1"
              />
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
        <section aria-labelledby="why-in-browser-heading" className="mt-16 space-y-12 border-t border-[var(--ink-900)]/10 pt-12">
          {/* Section Header for Semantic Hierarchy */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-rust)]">
              Architecture & Security
            </p>
            <h2 id="why-in-browser-heading" className="font-serif text-2xl font-bold text-[var(--ink-900)] sm:text-3xl">
              Why In-Browser Utilities Outperform Traditional Cloud Tools
            </h2>
          </div>

          {/* Core Philosophy Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-[var(--accent-rust)]">
                <ShieldLockIcon className="h-5 w-5" />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-[var(--accent-rust)]">
                <ZapIcon className="h-5 w-5" />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-[var(--accent-rust)]">
                <SmartphoneIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--ink-900)]">
                100% Offline PWA Ready
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Install {SITE_NAME} to your desktop or mobile home screen as a standalone application.
                Our background Service Worker caches all 52 utilities, enabling full offline productivity on airplanes, during travel, or with zero internet connection.
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
                <div className="flex items-center gap-2">
                  <FilePdfIcon className="h-4 w-4 shrink-0 text-[var(--accent-rust)]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                    PDF & Document Tools
                  </h3>
                </div>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  In-browser PDF compression, document merging, page splitting, and PDF-to-image extraction
                  powered by client-side Web Workers.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 shrink-0 text-[var(--accent-rust)]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                    Image & Media Utilities
                  </h3>
                </div>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Convert between PNG, JPG, and WebP, generate multi-size favicon packages, resize banners,
                  and render creative ASCII art directly on HTML5 Canvas.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CodeIcon className="h-4 w-4 shrink-0 text-[var(--accent-rust)]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                    Code Minifiers & Converters
                  </h3>
                </div>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Compress HTML, CSS, and JavaScript using Terser and CSSO; optimize vector SVGs, convert YAML
                  to JSON, and generate TypeScript interfaces from raw payloads.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HeartPulseIcon className="h-4 w-4 shrink-0 text-[var(--accent-rust)]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                    Calculators & Health Formulas
                  </h3>
                </div>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Scientific calculations, loan amortization schedules, BMI, Ideal Body Weight,
                  Cockcroft-Gault Creatinine Clearance, and optimal sleep cycle estimators.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldLockIcon className="h-4 w-4 shrink-0 text-[var(--accent-rust)]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                    Security & Cryptography
                  </h3>
                </div>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Cryptographically secure password generation using browser CSPRNG, v4 UUIDs, SHA-256/512 hashes,
                  and client-side JWT token structure inspection.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GlobeSearchIcon className="h-4 w-4 shrink-0 text-[var(--accent-rust)]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-rust)]">
                    SEO & Webmaster Tools
                  </h3>
                </div>
                <p className="text-xs leading-6 text-[var(--ink-700)]">
                  Generate compliant robots.txt directives, XML sitemaps, OpenGraph social meta tags, and test
                  web accessibility with our screen reader simulator.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-emerald-600/20 bg-emerald-50/50 p-4 sm:p-5">
              <div className="flex items-start sm:items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">True Offline Architecture</h4>
                  <p className="text-xs leading-5 text-emerald-800/90">
                    Every calculator, converter, and PDF tool runs via client-side Web Workers, WebAssembly, and Canvas. No backend API calls are made, allowing complete productivity with zero internet.
                  </p>
                </div>
              </div>
              <Link href="/about" className="shrink-0 text-xs font-semibold text-emerald-900 underline hover:text-emerald-700">
                Read architecture &rarr;
              </Link>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="rounded-[2rem] border border-[var(--ink-900)]/10 bg-white p-8 sm:p-10 shadow-[0_18px_50px_rgba(33,37,41,0.06)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-rust)]">
                Common Inquiries
              </span>
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--ink-900)] sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-700)]">
              Everything you need to know about our privacy-first, client-side execution model and offline PWA runtime.
            </p>

            <div className="mt-8 grid gap-4">
              {homeFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/50 p-5 transition hover:border-[var(--accent-rust)]/30 hover:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[var(--ink-900)]">
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ink-900)]/5 text-xs text-[var(--ink-700)] transition group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-700)] border-t border-[var(--ink-900)]/6 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Popular Quick-Access Utilities (Internal Link Distribution) */}
          <div className="rounded-[2rem] border border-[var(--ink-900)]/10 bg-white p-8 sm:p-10 shadow-[0_18px_50px_rgba(33,37,41,0.06)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-rust)]">
                Direct Links
              </span>
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--ink-900)] sm:text-3xl">
              Popular Free Web Utilities
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-700)]">
              Quick access to our most frequently used document, image, and developer tools:
            </p>

            <nav aria-label="Popular tools" className="mt-6 flex flex-wrap gap-2.5">
              {popularTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold text-[var(--ink-900)] transition hover:border-[var(--accent-rust)] hover:bg-white hover:text-[var(--accent-rust)]"
                >
                  <span>{tool.title}</span>
                  <ArrowRightIcon className="h-3 w-3 opacity-60" />
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ink-900)]/10 pt-6">
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
                <span>Learn more about {SITE_NAME}</span>
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
