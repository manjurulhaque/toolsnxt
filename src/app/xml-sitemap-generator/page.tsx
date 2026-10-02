import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { XmlSitemapGeneratorTool } from "./xml-sitemap-generator-tool"

const pagePath = "/xml-sitemap-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "XML Sitemap Generator | Create Valid sitemap.xml for SEO"
const pageDescription =
  "Generate valid XML sitemaps for search engines online. Configure canonical URLs, lastmod timestamps, change frequencies, and priorities, then copy or download sitemap.xml instantly."

const faqs = [
  {
    question: "What is an XML sitemap?",
    answer:
      "An XML sitemap is a structured XML document conforming to the Sitemaps.org protocol that lists the canonical URLs of a website. Search engine crawlers (like Googlebot and Bingbot) use it to discover, index, and re-crawl pages efficiently.",
  },
  {
    question: "Where should the sitemap.xml file be placed?",
    answer:
      "The standard location is the root directory of your website domain (e.g. https://example.com/sitemap.xml). You should also reference its exact URL at the bottom of your robots.txt file.",
  },
  {
    question: "What is the role of the <lastmod> tag?",
    answer:
      "The <lastmod> tag tells search engines when the content at a URL was last updated, formatted in W3C/ISO 8601 date notation (YYYY-MM-DD). Google and Bing use this to prioritize crawling pages with fresh updates over static ones.",
  },
  {
    question: "Do search engines strictly follow <changefreq> and <priority>?",
    answer:
      "No. Search engines treat changefreq and priority as advisory hints rather than authoritative commands. Googlebot primarily relies on observed content update patterns, server response times, and the lastmod date.",
  },
  {
    question: "What are the size and URL limits for an XML sitemap?",
    answer:
      "The official Sitemaps.org standard restricts a single sitemap file to a maximum of 50,000 URLs and an uncompressed file size of 50 MB. Sites exceeding these limits must split URLs across multiple sitemaps and bundle them in a Sitemap Index file.",
  },
  {
    question: "Can I use relative URLs in a sitemap?",
    answer:
      "No. The Sitemaps.org protocol strictly requires fully qualified, absolute canonical URLs including the protocol (https://) and domain name (e.g. https://example.com/about, never /about).",
  },
  {
    question: "Should noindex or redirecting URLs be included in a sitemap?",
    answer:
      "No. A sitemap should only include canonical, 200 OK indexable pages. Including URLs that return 301 redirects, 404 errors, or have <meta name='robots' content='noindex'> wastes crawler budget and triggers Google Search Console warnings.",
  },
  {
    question: "How do I submit my sitemap to search engines?",
    answer:
      "Once uploaded to your domain root, submit the sitemap URL directly in Google Search Console (under the 'Sitemaps' menu) and Bing Webmaster Tools, and declare it in your robots.txt with 'Sitemap: https://yourdomain.com/sitemap.xml'.",
  },
  {
    question: "Does having an XML sitemap guarantee higher search rankings?",
    answer:
      "No. A sitemap guarantees efficient discovery and indexation by search bots, but content quality, backlinks, technical performance, and user engagement determine actual search ranking position.",
  },
  {
    question: "Are XML reserved characters automatically escaped?",
    answer:
      "Yes. Characters that have special meaning in XML (such as & becoming &amp;, < becoming &lt;, and > becoming &gt;) are automatically escaped by this tool to ensure strict XML validation.",
  },
  {
    question: "Can I download the generated file as sitemap.xml?",
    answer:
      "Yes. Click the 'Download sitemap.xml' button to save the valid XML file directly to your computer, ready for deployment to your web server.",
  },
  {
    question: "Are my site URLs uploaded to an external server?",
    answer:
      "No. All URL parsing, XML formatting, and file generation execute 100% locally in your web browser. No URLs or domain structures are ever sent across the network.",
  },
  {
    question: "Does this tool work completely offline?",
    answer:
      "Yes. As an installable Progressive Web App utility, the XML Sitemap Generator functions entirely offline once loaded in your browser.",
  },
  {
    question: "Is the XML Sitemap Generator free to use?",
    answer:
      "Yes. The tool is 100% free with no limits on URL counts, no subscription requirements, and no advertisements.",
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
    about: [
      "XML Sitemap Generator",
      "sitemap.xml",
      "Sitemaps Protocol",
      "SEO Sitemap",
      "Search Engine Indexing",
      "Google Search Console",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "XML Sitemap Generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Sitemaps.org compliant XML generation",
      "Base URL normalization for relative path inputs",
      "Configurable change frequency (daily, weekly, monthly)",
      "Priority weighting (0.0 to 1.0)",
      "ISO 8601 / W3C date formatting for lastmod",
      "Direct sitemap.xml file download",
      "Copy XML to clipboard",
      "100% private client-side execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "XML Sitemap Generator",
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
        name: "XML Sitemap Generator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate and deploy an XML sitemap",
    description: "Step-by-step instructions for creating a valid sitemap.xml and submitting it to search engines.",
    step: [
      {
        "@type": "HowToStep",
        name: "Specify base URL",
        text: "Enter your website domain root (e.g. https://example.com) to resolve relative paths.",
      },
      {
        "@type": "HowToStep",
        name: "Add target pages",
        text: "List your public, indexable page paths (one per line) in the input area.",
      },
      {
        "@type": "HowToStep",
        name: "Set frequency and priority",
        text: "Select default change frequency and priority weighting for the listed URLs.",
      },
      {
        "@type": "HowToStep",
        name: "Download and deploy",
        text: "Download sitemap.xml, upload it to your public website root, and submit it in Google Search Console.",
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
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <XmlSitemapGeneratorTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is an XML Sitemap and Why Is It Vital for SEO?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              An <strong>XML Sitemap</strong> is an essential technical SEO file that acts as a comprehensive
              roadmap of your website for search engines. Jointly supported by Google, Microsoft Bing, Yahoo,
              and Ask under the <strong>Sitemaps.org protocol</strong>, an XML sitemap explicitly informs web
              crawlers which pages exist on your site, when they were last modified, and their relative importance.
            </p>
            <p>
              Without an XML sitemap, search crawlers must rely exclusively on internal links to discover your
              content, which can leave deep pages, new articles, or unlinked marketing resources unindexed for
              months. This browser-based generator enables you to construct valid, perfectly formatted
              <code>sitemap.xml</code> files in seconds with zero cloud uploads or data tracking.
            </p>
          </div>
        </ToolPanel>

        {/* XML Sitemap Schema Tags Breakdown */}
        <ToolPanel>
          <PanelHeader eyebrow="Specification" title="Sitemaps.org XML Schema Tags Explained" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10 text-[var(--ink-900)]">
                  <th className="py-3 pr-4 font-semibold">XML Tag</th>
                  <th className="py-3 pr-4 font-semibold">Requirement</th>
                  <th className="py-3 font-semibold">Purpose &amp; Formatting Rules</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["<urlset>", "Mandatory", "Enclosing root element containing namespace declaration xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'."],
                  ["<url>", "Mandatory", "Parent container tag for each individual URL entry."],
                  ["<loc>", "Mandatory", "Absolute canonical URL of the page (e.g. https://example.com/page). Must be escaped."],
                  ["<lastmod>", "Optional (Recommended)", "Date of last modification in W3C Datetime format (YYYY-MM-DD)."],
                  ["<changefreq>", "Optional", "Hints how frequently content changes (always, hourly, daily, weekly, monthly, yearly, never)."],
                  ["<priority>", "Optional", "Priority relative to other URLs on your site (0.0 to 1.0, default 0.5). Does not affect external rankings."],
                ].map(([tag, req, desc]) => (
                  <tr key={tag} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-mono font-semibold text-[var(--ink-900)]">{tag}</td>
                    <td className="py-3 pr-4 font-medium">{req}</td>
                    <td className="py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Generator Controls" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Sitemaps.org Standard Compliance",
                "Outputs strictly valid XML adhering to the official 0.9 schema recognized by all major search engines.",
              ],
              [
                "Intelligent URL Normalization",
                "Input relative paths (e.g. /about) and combine them with your base domain into fully qualified canonical links.",
              ],
              [
                "Configurable Crawl Frequencies",
                "Select from standard changefreq values (daily, weekly, monthly) to suit your publishing schedule.",
              ],
              [
                "Relative Priority Weighting",
                "Assign numeric priority values between 0.0 and 1.0 to distinguish core landing pages from archive posts.",
              ],
              [
                "Automatic Entity Escaping",
                "Safely escapes ampersands, angle brackets, and quotes into &amp;, &lt;, &gt;, and &quot; automatically.",
              ],
              [
                "Direct File Download",
                "Export clean sitemap.xml files directly to your storage with a single click, ready for deployment.",
              ],
              [
                "Real-Time Statistics",
                "Instant count of total included URLs, generated lines, and output payload byte size.",
              ],
              [
                "100% Client-Side Privacy",
                "Your private staging links, new product URLs, and domain architectures never leave your browser.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
              >
                <h3 className="font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        {/* How It Works */}
        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How the XML Sitemap Generator Operates" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The generator parses the input URL lines, cleans trailing whitespace, and filters empty rows.
              For each entry, it checks whether the URL is already absolute (starts with <code>http://</code> or
              <code>https://</code>). If a relative path is provided, it combines it with the sanitized base domain.
            </p>
            <p>
              Next, all special XML characters are escaped to ensure the document conforms to W3C XML 1.0 standards.
              Each entry is wrapped in an individual <code>&lt;url&gt;</code> block containing <code>&lt;loc&gt;</code>,
              <code>&lt;lastmod&gt;</code>, <code>&lt;changefreq&gt;</code>, and <code>&lt;priority&gt;</code> tags,
              enclosed in the root <code>&lt;urlset&gt;</code> envelope.
            </p>
          </div>
        </ToolPanel>

        {/* Step-by-Step Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="Step-by-Step Deployment Guide" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Define your base URL:</strong> Enter your full canonical website domain (e.g. <code>https://example.com</code>).
            </li>
            <li>
              <strong>List your URLs:</strong> Paste your website paths, one URL per line, into the input workspace.
            </li>
            <li>
              <strong>Configure defaults:</strong> Set your preferred change frequency, priority, and check the current date.
            </li>
            <li>
              <strong>Download file:</strong> Click <em>Download sitemap.xml</em> to save the generated file to your local computer.
            </li>
            <li>
              <strong>Upload to server:</strong> Place the file in your website&apos;s public root directory so it resolves at
              <code>https://example.com/sitemap.xml</code>.
            </li>
            <li>
              <strong>Submit to search engines:</strong> Open Google Search Console, navigate to <em>Sitemaps</em>, enter
              <code>sitemap.xml</code>, and click <em>Submit</em>. Repeat in Bing Webmaster Tools.
            </li>
          </ol>
        </ToolPanel>

        {/* Use Cases */}
        <ToolPanel>
          <PanelHeader eyebrow="Applications" title="Common SEO & Development Scenarios" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Launching a New Website",
                "Ensure search bots discover all site pages immediately upon public launch, bypassing internal link crawl delays.",
              ],
              [
                "Static Site Generators & JAMstack",
                "Create quick sitemaps for Astro, Vite, Eleventy, or static HTML projects that lack automated sitemap plugins.",
              ],
              [
                "E-Commerce Product Catalogs",
                "Ensure newly published product listings, category pages, and promotional sales are indexed rapidly by search engines.",
              ],
              [
                "Website Redesigns & Migrations",
                "Provide search engines with an authoritative checklist of updated URL structures following domain or platform migrations.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
              >
                <h3 className="font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        {/* Benefits & Limitations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits of XML Sitemaps" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Directly communicates canonical page inventory to Google and Bing.</li>
              <li>Speeds up discovery of deep content that has few internal inbound links.</li>
              <li>Helps crawlers prioritize newly updated pages using the lastmod date.</li>
              <li>Reduces wasted search engine crawl budget on unimportant paths.</li>
              <li>Enables detailed index coverage diagnostics in Google Search Console.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Does not guarantee page indexation or high search engine rankings.</li>
              <li>Limited to 50,000 URLs and 50 MB per single sitemap file.</li>
              <li>Must only contain 200 OK indexable canonical URLs (no redirects or 404s).</li>
              <li>Search engines may ignore changefreq and priority hints.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for Optimal Sitemap SEO" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Add a reference link at the bottom of your robots.txt: <code>Sitemap: https://yourdomain.com/sitemap.xml</code>.</li>
              <li>Keep the <code>&lt;lastmod&gt;</code> date accurate—do not falsely update it without changing content.</li>
              <li>Ensure all URLs end consistently with or without trailing slashes according to your canonical rule.</li>
              <li>Verify that all submitted URLs return HTTP 200 OK status codes.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Pitfalls to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Including pages with <code>noindex</code> robots tags, which causes Search Console errors.</li>
              <li>Including redirecting URLs (301/302) or broken links (404) in the sitemap.</li>
              <li>Using non-canonical URLs (e.g. mixing http:// and https:// or www and non-www).</li>
              <li>Submitting non-escaped URLs containing raw ampersands (<code>&amp;</code>).</li>
            </ul>
          </ToolPanel>
        </div>

        {/* FAQ */}
        <ToolPanel>
          <PanelHeader eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
              >
                <summary className="cursor-pointer font-semibold text-[var(--ink-900)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </ToolPanel>

        {/* Related Tools */}
        <ToolPanel>
          <PanelHeader eyebrow="More Tools" title="Related SEO & Webmaster Tools" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["Robots.txt Generator", "/robots-txt-generator"],
              ["Meta Tag Generator", "/meta-tag-generator"],
              ["URL Encoder / Decoder", "/url-encoder-decoder"],
              ["HTML to Markdown", "/html-to-markdown"],
              ["HTML, CSS & JS Minifier", "/html-css-js-minifier"],
              ["SVG Optimizer", "/svg-optimizer"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-[1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 transition hover:border-[var(--accent-rust)]/40"
              >
                {label}
              </Link>
            ))}
          </nav>
        </ToolPanel>

        {/* Glossary */}
        <ToolPanel>
          <PanelHeader eyebrow="Terms" title="XML Sitemap Terminology Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["XML Sitemap", "A machine-readable list of web page URLs formatted per Sitemaps.org rules."],
              ["Sitemaps.org", "The collaborative initiative defining standard sitemap protocols for Google, Bing, and Yahoo."],
              ["Sitemap Index", "An XML document listing multiple individual sitemaps when exceeding 50,000 URLs."],
              ["Canonical URL", "The preferred version of a page chosen by site owners to avoid duplicate content."],
              ["Crawl Budget", "The number of URLs a search crawler is willing and able to crawl on a website."],
              ["Google Search Console", "Google's official webmaster dashboard for monitoring search indexation and performance."],
              ["Bing Webmaster Tools", "Microsoft Bing's search indexing and diagnostic service."],
              ["lastmod", "W3C date stamp indicating when a page was last substantially revised."],
              ["changefreq", "Advisory hint indicating expected content revision cadence (daily, weekly, monthly)."],
              ["priority", "Relative importance ranking (0.0 to 1.0) compared to other pages on the same domain."],
              ["noindex", "A robots meta directive instructing search engines not to display a page in search results."],
              ["Robots.txt", "A text file in the site root instructing crawlers which paths they may access."],
            ].map(([term, definition]) => (
              <div key={term}>
                <h3 className="font-semibold text-[var(--ink-900)]">{term}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">{definition}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        {/* References */}
        <ToolPanel>
          <PanelHeader eyebrow="Sources" title="Official Standards & Documentation" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <a
                href="https://www.sitemaps.org/protocol.html"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Sitemaps.org: Official XML Sitemap Protocol Specification
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Search Central: Sitemaps Overview &amp; Best Practices
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/TR/NOTE-datetime"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                W3C Note: Date and Time Formats (ISO 8601)
              </a>
            </li>
          </ul>
        </ToolPanel>

                <EducationalDisclaimerCard type="technical">
          <p>
            This XML Sitemap Generator formats URLs according to the Sitemaps.org XML schema.
            Submitting a sitemap provides search engines with discovery hints, but does not guarantee indexation,
            ranking, or traffic. Ensure all included URLs are active, canonical 200 OK responses before publishing.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
