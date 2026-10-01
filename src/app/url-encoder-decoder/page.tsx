import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { UrlEncoderDecoderTool } from "./url-encoder-decoder-tool"

const pagePath = "/url-encoder-decoder"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "URL Encoder / Decoder | Online URL & Component Encoding"
const pageDescription =
  "Encode and decode URLs, URI components, and Base64 text online in your browser. Inspect query parameters and copy results instantly."

const faqs = [
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (percent-encoding) converts reserved or non-ASCII characters in a URL into a '%' followed by two hexadecimal digits, ensuring the address can be transmitted reliably across the Internet.",
  },
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI encodes a complete URL while preserving protocol and path separators (such as :, /, ?, &). encodeURIComponent encodes every special character, making a string safe to pass as a query parameter value.",
  },
  {
    question: "Why do spaces become %20 or + in URLs?",
    answer:
      "Standard percent-encoding replaces spaces with %20. In query strings formatted as application/x-www-form-urlencoded, spaces may also be replaced with a plus sign (+).",
  },
  {
    question: "Is this URL decoder safe for private links?",
    answer:
      "Yes. All encoding, decoding, and parsing operations execute entirely in your browser using client-side JavaScript. No data is sent to external servers.",
  },
  {
    question: "Can I decode Base64 in this tool?",
    answer:
      "Yes. The tool includes dedicated Base64 Encode and Base64 Decode modes supporting UTF-8 text strings.",
  },
  {
    question: "How does the query parameter inspector work?",
    answer:
      "The tool extracts the query string portion after the '?' character and parses key-value pairs using the standard URLSearchParams API.",
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
    name: "URL Encoder / Decoder",
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
        name: "URL Encoder / Decoder",
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

export default function UrlEncoderDecoderPage() {
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
          <UrlEncoderDecoderTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="Understanding URL Encoding" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Uniform Resource Identifiers (URIs) are restricted to a defined subset of ASCII characters.
                Characters outside this range, as well as reserved characters with syntactic meaning (such as
                slashes, question marks, and ampersands), must be percent-encoded to prevent ambiguous interpretation.
              </p>
              <p>
                This tool provides five standard conversion modes: complete URL encoding, full URL decoding,
                query component encoding, and Base64 text encoding and decoding.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Modes" title="Conversion Modes Explained" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Encode URL</strong>
                Encodes special characters while preserving protocol (https://), slashes, and query delimiters.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Encode Component</strong>
                Encodes all reserved delimiters, suitable for query parameter values and subpath segments.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Base64 Modes</strong>
                Encodes and decodes standard ASCII and UTF-8 strings into Base64 format.
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/base64-encoder-decoder">
                Base64 Encoder / Decoder
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/json-formatter">
                JSON Formatter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/regex-tester">
                Regex Tester
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
