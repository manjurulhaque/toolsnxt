import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ScreenReaderSimulatorTool } from "./screen-reader-simulator-tool"

const pagePath = "/screen-reader-simulator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Screen Reader Simulator | Test Accessibility Reading Order Online"
const pageDescription =
  "Simulate screen reader reading order, accessible names, landmarks, and text-to-speech announcements from HTML markup online in your browser."

const faqs = [
  {
    question: "What is a screen reader simulator?",
    answer:
      "A screen reader simulator models how assistive technologies (such as NVDA, JAWS, or VoiceOver) traverse DOM landmarks, headings, interactive controls, and accessible names in linearized reading order.",
  },
  {
    question: "Does this replace testing with real assistive technology?",
    answer:
      "No. This simulator is a rapid developmental aid for checking source order and aria labels. Final compliance audits must always be verified with genuine screen readers.",
  },
  {
    question: "How does the simulated speech output work?",
    answer:
      "The tool uses the browser-native Web Speech API (SpeechSynthesis) to read linearized announcement items sequentially.",
  },
  {
    question: "How are accessible names computed?",
    answer:
      "The simulator inspects aria-label, aria-labelledby, alt attributes, title attributes, button text, and input placeholders according to simplified W3C accessible name computation heuristics.",
  },
  {
    question: "Is my HTML markup sent to a server?",
    answer:
      "No. All DOM parsing runs in an isolated in-memory DOMParser document inside your browser. No HTML or text is uploaded to any server.",
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
    name: "Screen Reader Simulator",
    applicationCategory: "AccessibilityApplication",
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
        name: "Screen Reader Simulator",
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

export default function ScreenReaderSimulatorPage() {
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
          <ScreenReaderSimulatorTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="Accessibility & Source Reading Order" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Visual CSS layouts (such as flexbox, grid, and absolute positioning) can rearrange elements
                on screen in a manner that completely diverges from the underlying HTML DOM reading sequence.
                Blind and low-vision users rely on sequential reading order to navigate information logically.
              </p>
              <p>
                Paste your component HTML to inspect the linearized reading order, check accessible labels,
                and listen to simulated announcements via browser text-to-speech.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Checklist" title="Key Accessibility Elements" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Landmarks</strong>
                Ensure header, nav, main, section, and footer elements structure page zones.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Headings</strong>
                Maintain a logical h1 &gt; h2 &gt; h3 hierarchy without skipping heading ranks.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Interactive Labels</strong>
                All buttons and links must have explicit text or aria-label attributes.
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/html-to-markdown">
                HTML to Markdown
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/markdown-previewer">
                Markdown Previewer
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/html-css-js-minifier">
                HTML CSS JS Minifier
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
