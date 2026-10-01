import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { TextDiffCheckerTool } from "./text-diff-checker-tool"

const pagePath = "/text-diff-checker"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Text Diff Checker | Compare Text Differences Online"
const pageDescription =
  "Compare two text blocks line by line online in your browser. Inspect added, removed, and changed lines, ignore whitespace/case, and copy diff patches."

const faqs = [
  {
    question: "What is a diff checker?",
    answer:
      "A diff checker compares two text blocks or code files line by line and highlights lines that were added, removed, modified, or left unchanged.",
  },
  {
    question: "Can I ignore whitespace differences?",
    answer:
      "Yes. Check 'Ignore whitespace' to compare lines based on their trimmed content, ignoring leading and trailing spaces.",
  },
  {
    question: "Can I ignore case differences?",
    answer:
      "Yes. Check 'Ignore case' to perform a case-insensitive comparison of the two texts.",
  },
  {
    question: "Is my text uploaded or stored on a server?",
    answer:
      "No. All text diff operations run locally in your browser using client-side JavaScript. No data is sent to external servers.",
  },
  {
    question: "Can I copy the comparison as a diff patch?",
    answer:
      "Yes. The 'Copy Diff' button copies a standard unified-style diff text with '+' prefixes for added lines, '-' for removed lines, and '~' for changed lines.",
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
    name: "Text Diff Checker",
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
        name: "Text Diff Checker",
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

export default function TextDiffCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <TextDiffCheckerTool />

        <section className="mx-auto max-w-7xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="How Diff Checking Works" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Comparing text differences is a fundamental task in software engineering, content editing,
                and legal review. By computing line-by-line alignments, you can instantly pinpoint modifications,
                additions, and deletions across versions.
              </p>
              <p>
                This browser utility compares two text blocks instantly in memory, providing color-coded visual
                markers and a copyable diff patch format.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Legend" title="Diff Visual Markers" />
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <InfoBox className="border-green-200 bg-green-50 text-green-800">
                <strong className="block text-green-900">Added (+)</strong>
                Lines present in the changed text that did not exist in the original.
              </InfoBox>
              <InfoBox className="border-red-200 bg-red-50 text-red-800">
                <strong className="block text-red-900">Removed (-)</strong>
                Lines present in the original text that were deleted in the changed version.
              </InfoBox>
              <InfoBox className="border-amber-200 bg-amber-50 text-amber-800">
                <strong className="block text-amber-900">Changed (~)</strong>
                Lines that were altered or modified between versions.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Unchanged</strong>
                Identical lines preserved across both original and changed versions.
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
            <PanelHeader eyebrow="Related" title="Related Text Tools" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/word-character-counter">
                Word & Character Counter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/markdown-previewer">
                Markdown Previewer
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/case-converter">
                Case Converter
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
