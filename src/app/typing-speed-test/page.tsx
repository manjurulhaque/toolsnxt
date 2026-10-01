import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { TypingSpeedTestTool } from "./typing-speed-test-tool"

const pagePath = "/typing-speed-test"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Typing Speed Test | Test WPM & Accuracy Online"
const pageDescription =
  "Test your typing speed and accuracy with timed passages online in your browser. Track WPM, mistakes, and progress without registration or ads."

const faqs = [
  {
    question: "How is WPM (Words Per Minute) calculated?",
    answer:
      "WPM is calculated using the standard formula: (Total Correct Characters / 5) divided by elapsed time in minutes. One standard word is defined as 5 keystrokes.",
  },
  {
    question: "How is typing accuracy calculated?",
    answer:
      "Accuracy is the percentage of correct characters typed out of all attempted keystrokes: (Correct Characters / Total Typed Characters) * 100.",
  },
  {
    question: "What test durations are available?",
    answer:
      "You can select between 30-second, 60-second (1 minute), and 120-second (2 minute) practice sessions.",
  },
  {
    question: "Is my typing logged or stored?",
    answer:
      "No. The typing test runs 100% locally in your browser memory. Keystrokes are never logged, tracked, or sent to any server.",
  },
  {
    question: "What is an average typing speed?",
    answer:
      "The average typing speed for most people is roughly 40 WPM. Professional typists typically range from 65 to 85+ WPM.",
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
    name: "Typing Speed Test",
    applicationCategory: "UtilityApplication",
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
        name: "Typing Speed Test",
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

export default function TypingSpeedTestPage() {
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
          <TypingSpeedTestTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="Improving Typing Speed & Rhythm" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Touch typing efficiency relies on muscle memory, steady rhythm, and finger placement on the
                home row keys (ASDF JKL;). Focusing on 98%+ accuracy before attempting to push speed produces
                faster long-term gains than rushing with frequent mistakes.
              </p>
              <p>
                Take regular short breaks during practice to prevent wrist strain and maintain high focus.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Metrics" title="Understanding WPM & Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Gross vs Net WPM</strong>
                Gross WPM counts all keystrokes. Net WPM deducts errors to reflect usable production speed.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Accuracy Target</strong>
                Aim for 95% to 99% accuracy. Frequent backspacing costs far more time than typing at a steady pace.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Private Practice</strong>
                Results and typed characters are stored solely in transient component state.
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
            <PanelHeader eyebrow="Related" title="Related Focus & Text Tools" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/pomodoro-timer">
                Pomodoro Timer
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/stopwatch">
                Stopwatch
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/word-character-counter">
                Word & Character Counter
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
