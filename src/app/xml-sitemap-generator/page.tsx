import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { XmlSitemapGeneratorTool } from "./xml-sitemap-generator-tool"

const pagePath = "/xml-sitemap-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "XML Sitemap Generator | Create Valid sitemap.xml Online"
const pageDescription =
  "Generate a standard XML sitemap for your website online. Configure change frequency, priority, and last modified dates, then copy or download sitemap.xml."

const faqs = [
  {
    question: "What is an XML sitemap?",
    answer:
      "An XML sitemap is a file listing the URLs of a website that search engines like Google, Bing, and DuckDuckGo use to discover and index pages intelligently.",
  },
  {
    question: "Where should the sitemap.xml file be placed?",
    answer:
      "A sitemap is typically uploaded to the root directory of your website domain (for example, https://example.com/sitemap.xml).",
  },
  {
    question: "What does changefreq mean?",
    answer:
      "The changefreq tag provides a hint to crawlers on how often content is expected to change (e.g. daily, weekly, monthly). Crawlers treat this as guidance rather than a command.",
  },
  {
    question: "What does priority indicate?",
    answer:
      "Priority indicates the relative importance of a URL compared to other URLs on your own domain, with values ranging from 0.0 to 1.0 (default 0.5).",
  },
  {
    question: "Can I enter relative paths?",
    answer:
      "Yes. If you provide a base URL and enter relative paths like '/about' or '/blog', the tool automatically combines them into fully qualified absolute URLs.",
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
    name: "XML Sitemap Generator",
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
        name: "XML Sitemap Generator",
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

export default function XmlSitemapGeneratorPage() {
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
          <XmlSitemapGeneratorTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="XML Sitemap Standards" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Search engine crawlers rely on XML sitemaps to discover new and updated pages across large
                domains. By adhering to the official Sitemaps.org XML schema standard, webmasters ensure
                that all valid URL endpoints are surfaced for indexing.
              </p>
              <p>
                Paste your list of URLs or paths, configure optional crawl tags, and instantly download a
                validated sitemap.xml file.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Tags" title="Key Sitemap Tags" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">&lt;loc&gt;</strong>
                The canonical absolute URL of the page. Must begin with protocol (e.g. https://).
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">&lt;lastmod&gt;</strong>
                The date of last modification in ISO 8601 format (YYYY-MM-DD).
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">&lt;priority&gt;</strong>
                Relative importance from 0.0 to 1.0 comparing internal pages on the same domain.
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/robots-txt-generator">
                Robots.txt Generator
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
