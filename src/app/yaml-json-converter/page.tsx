import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { YamlJsonConverterTool } from "./yaml-json-converter-tool"

const pagePath = "/yaml-json-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "YAML to JSON Converter | Online YAML JSON Format Converter"
const pageDescription =
  "Convert YAML to JSON or JSON to YAML online in your browser. Pretty-print, sort keys, configure indentation, and download results instantly."

const faqs = [
  {
    question: "What is YAML?",
    answer:
      "YAML (YAML Ain't Markup Language) is a human-friendly data serialization standard commonly used for configuration files, Kubernetes manifests, and CI/CD pipelines.",
  },
  {
    question: "How does YAML to JSON conversion work?",
    answer:
      "The tool uses the js-yaml parser to read YAML into native JavaScript data structures, then serializes them into valid JSON with customizable indentation.",
  },
  {
    question: "Can I convert JSON back to YAML?",
    answer:
      "Yes. Select the 'JSON to YAML' mode. Valid JSON is parsed and dumped into clean, readable YAML syntax.",
  },
  {
    question: "Can I sort object keys alphabetically?",
    answer:
      "Yes. Enable the 'Sort keys' checkbox to recursively organize all dictionary keys alphabetically in the converted output.",
  },
  {
    question: "Is my configuration data kept private?",
    answer:
      "Yes. All parsing and serialization operations execute entirely in your browser using client-side JavaScript. No data is sent to external servers.",
  },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YAML to JSON Converter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "YAML JSON Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
}

export default function YamlJsonConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
          <YamlJsonConverterTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="YAML vs JSON" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Both YAML and JSON are widely used formats for representing structured data. JSON is the
                standard for web APIs and browser-native serialization, while YAML is favoured in DevOps
                and application configuration due to its support for comments, concise syntax, and readability.
              </p>
              <p>
                This converter allows seamless two-way translation between both formats directly in your browser,
                featuring key sorting and custom indentation controls.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formatting" title="Configuration Options" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Indentation</strong>
                Format JSON output with 2 spaces, 4 spaces, tabs, or minified single-line compact representation.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Sort Keys</strong>
                Recursively sorts all object and dictionary keys alphabetically for clean diff comparisons.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Local Privacy</strong>
                All parsing happens in memory via js-yaml without server uploads or external tracking.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="FAQ" title="Frequently Asked Questions" />
            <div className="mt-6 grid gap-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--ink-900)]">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Related" title="Related Developer Tools" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/json-formatter">
                JSON Formatter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/csv-to-json">
                CSV to JSON Converter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/json-to-typescript">
                JSON to TypeScript
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
