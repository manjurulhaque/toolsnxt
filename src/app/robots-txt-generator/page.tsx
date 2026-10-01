import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { RobotsTxtGeneratorTool } from "./robots-txt-generator-tool"

const pagePath = "/robots-txt-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Robots.txt Generator | Create Robots.txt Online"
const pageDescription =
  "Generate a custom robots.txt file with allow, disallow, sitemap, host, and crawl-delay directives online in your browser. Download or copy instantly."

const faqs = [
  {
    question: "What is a robots.txt file?",
    answer:
      "A robots.txt file is a text file uploaded to your website's root directory that instructs search engine crawlers and web robots which URLs they can or cannot request from your site.",
  },
  {
    question: "Where should robots.txt be located?",
    answer:
      "A robots.txt file must always be placed at the root of the website host (for example, https://example.com/robots.txt).",
  },
  {
    question: "Does robots.txt guarantee private pages won't be indexed?",
    answer:
      "No. Robots.txt instructs well-behaved crawlers where not to crawl, but if another site links to a disallowed page, search engines may still index the URL. Use password protection or a 'noindex' meta tag for true privacy.",
  },
  {
    question: "What does 'User-agent: *' mean?",
    answer:
      "The asterisk (*) wildcard applies the following rules to all web crawlers and automated bots that don't have a more specific user-agent rule block.",
  },
  {
    question: "Can I reference my sitemap in robots.txt?",
    answer:
      "Yes. Including 'Sitemap: https://example.com/sitemap.xml' at the bottom of robots.txt allows web crawlers to automatically locate your XML sitemap.",
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
    name: "Robots.txt Generator",
    applicationCategory: "SEOApplication",
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
        name: "Robots.txt Generator",
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

export default function RobotsTxtGeneratorPage() {
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
          <RobotsTxtGeneratorTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="Robots Exclusion Protocol" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The Robots Exclusion Protocol (REP) is the standard mechanism websites use to communicate
                with web crawlers and other automated search bots. It defines which parts of a website should
                be visited and which should be bypassed.
              </p>
              <p>
                Configure user agents, allow and disallow paths, sitemap locations, and crawl delays,
                then download a production-ready robots.txt file.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Directives" title="Common Directives Explained" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">User-agent</strong>
                Identifies which crawler the rule applies to (e.g. Googlebot, Bingbot, or * for all).
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Disallow</strong>
                Specifies URL paths or prefixes that crawlers must not request.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Allow</strong>
                Overrides a disallow directive to permit crawling of a specific subpath.
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
            <PanelHeader eyebrow="Related" title="Related SEO Tools" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/xml-sitemap-generator">
                XML Sitemap Generator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/meta-tag-generator">
                Meta Tag Generator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/url-encoder-decoder">
                URL Encoder / Decoder
              </Link>
            </div>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
