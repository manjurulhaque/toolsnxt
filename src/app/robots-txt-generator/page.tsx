import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { RobotsTxtGeneratorTool } from "./robots-txt-generator-tool"

const pagePath = "/robots-txt-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Robots.txt Generator | Create Custom robots.txt Online for SEO"
const pageDescription =
  "Generate a valid robots.txt file with Allow, Disallow, User-agent, Crawl-delay, and Sitemap directives online in your browser. Download or copy your robots.txt file instantly with zero server uploads."

const faqs = [
  {
    question: "What is a robots.txt file?",
    answer:
      "A robots.txt file is a plain text file uploaded to your website's root directory that implements the Robots Exclusion Protocol (IETF RFC 9309). It instructs web robots and search engine crawlers (such as Googlebot and Bingbot) which paths they are allowed or forbidden to crawl.",
  },
  {
    question: "Where must the robots.txt file be located?",
    answer:
      "A robots.txt file must always be placed at the absolute root of the website host (e.g. https://example.com/robots.txt). Placing it in a subfolder (like https://example.com/blog/robots.txt) makes it completely ignored by web crawlers.",
  },
  {
    question: "Does robots.txt prevent pages from appearing in Google search results?",
    answer:
      "No. Robots.txt governs crawling, not indexing. If an external website links to a disallowed URL, Google may still index the URL in search results without crawling its content. To guarantee a page is never indexed, use a <meta name='robots' content='noindex'> tag or password protection instead.",
  },
  {
    question: "What does 'User-agent: *' mean?",
    answer:
      "The asterisk (*) wildcard denotes a universal fallback rule. It applies the declared allow and disallow directives to all web crawlers that do not have their own specific user-agent rule block declared in the file.",
  },
  {
    question: "How should I declare my XML sitemap in robots.txt?",
    answer:
      "Add a 'Sitemap: [absolute-url]' directive at the top or bottom of your robots.txt file (e.g. Sitemap: https://example.com/sitemap.xml). This helps search engines discover your sitemap automatically upon crawling.",
  },
  {
    question: "What does the 'Crawl-delay' directive do?",
    answer:
      "Crawl-delay specifies the number of seconds a crawler should wait between successive requests to prevent server resource exhaustion. While supported by Bing, Yandex, and Baidu, Googlebot does not support Crawl-delay (crawl rate is managed in Google Search Console instead).",
  },
  {
    question: "Are robots.txt path directives case-sensitive?",
    answer:
      "Yes. RFC 9309 dictates that path matching in robots.txt is strictly case-sensitive. 'Disallow: /admin/' will not block crawlers from requesting '/Admin/' or '/ADMIN/'.",
  },
  {
    question: "Can I block AI scrapers and LLM training bots with robots.txt?",
    answer:
      "Yes. You can target specific AI bot user-agents (such as GPTBot, ClaudeBot, CCBot, or Bytespider) with a dedicated 'Disallow: /' block to request that they do not scrape your content for model training.",
  },
  {
    question: "Why should I avoid disallowing CSS, JavaScript, or image assets?",
    answer:
      "Modern search crawlers render web pages like a browser to assess mobile responsiveness and layout stability. Disallowing CSS or JS files prevents Googlebot from rendering the page accurately, which can severely damage search rankings.",
  },
  {
    question: "How do pattern matching wildcards (* and $) work?",
    answer:
      "An asterisk (*) matches any sequence of characters (e.g. 'Disallow: /*.pdf' blocks all PDF files). A dollar sign ($) designates the end of a URL (e.g. 'Disallow: /*.php$' blocks URLs ending precisely in .php but permits .php?query=1).",
  },
  {
    question: "Can I download the generated file as robots.txt?",
    answer:
      "Yes. Click the 'Download robots.txt' button to save the plain text file directly to your device, ready to be transferred to your web server.",
  },
  {
    question: "Are my site configurations uploaded to an external server?",
    answer:
      "No. All parsing, directive formatting, and file generation run 100% locally in your web browser. No paths or site architectures are ever sent across the network.",
  },
  {
    question: "Does this tool work completely offline?",
    answer:
      "Yes. Once loaded, this Progressive Web App utility operates with zero external network connectivity.",
  },
  {
    question: "Is the Robots.txt Generator free to use?",
    answer:
      "Yes. It is completely free with no restrictions, no account creation, and no advertising.",
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
      "Robots.txt Generator",
      "Robots Exclusion Protocol",
      "RFC 9309",
      "Crawl Budget",
      "Googlebot Directives",
      "Search Engine Crawlers",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Robots.txt Generator",
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
      "RFC 9309 compliant robots.txt generation",
      "User-agent targeting (Universal, Googlebot, Bingbot, AI bots)",
      "Allow and Disallow path configuration",
      "Crawl-delay parameter support",
      "XML Sitemap linking",
      "One-click robots.txt file download",
      "Copy directives to clipboard",
      "100% private in-browser client execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Robots.txt Generator",
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
        name: "Robots.txt Generator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate and install a robots.txt file",
    description: "Step-by-step instructions for creating a valid robots.txt file to guide search crawlers.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select default policy",
        text: "Choose whether your default policy allows all crawling or disallows private directories.",
      },
      {
        "@type": "HowToStep",
        name: "Add disallow and allow paths",
        text: "List directories (like /admin/ or /cart/) you want to exclude from search engine crawling.",
      },
      {
        "@type": "HowToStep",
        name: "Specify sitemap location",
        text: "Provide your full sitemap URL (e.g. https://example.com/sitemap.xml) for automated crawler discovery.",
      },
      {
        "@type": "HowToStep",
        name: "Download and deploy",
        text: "Download the robots.txt file and place it in your website root so it is reachable at /robots.txt.",
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
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <RobotsTxtGeneratorTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is robots.txt and How Does It Work?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A <strong>robots.txt</strong> file is a foundational web standard governed by <strong>IETF RFC 9309</strong>
              (Robots Exclusion Protocol). It serves as the primary gatekeeper for your website, providing guidelines
              to automated search engine spiders, social media indexers, and AI web crawlers regarding which sections
              of your domain they are permitted to request.
            </p>
            <p>
              When a crawler arrives at your site, the very first request it makes is for <code>/robots.txt</code>.
              Properly configuring this file conserves server bandwidth and crawl budget, prevents administrative
              panels from being scraped, and points crawlers directly to your XML sitemap. This tool runs 100% locally
              in your browser to build and validate compliant robots.txt directives in seconds.
            </p>
          </div>
        </ToolPanel>

        {/* Directives Breakdown Table */}
        <ToolPanel>
          <PanelHeader eyebrow="Specification" title="RFC 9309 Directives Breakdown" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10 text-[var(--ink-900)]">
                  <th className="py-3 pr-4 font-semibold">Directive</th>
                  <th className="py-3 pr-4 font-semibold">Syntax Example</th>
                  <th className="py-3 font-semibold">Function &amp; Scope</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["User-agent", "User-agent: Googlebot", "Designates which specific crawler or bot the subsequent rules apply to."],
                  ["Disallow", "Disallow: /checkout/", "Prevents matching crawlers from accessing URLs that begin with this path prefix."],
                  ["Allow", "Allow: /checkout/success", "Explicitly permits crawling of a specific subpath inside an otherwise disallowed directory."],
                  ["Sitemap", "Sitemap: https://site.com/sitemap.xml", "Directs search engines to the absolute URL of the XML sitemap."],
                  ["Crawl-delay", "Crawl-delay: 10", "Requests a delay in seconds between consecutive crawler hits (supported by Bing, Yandex)."],
                  ["Wildcard (*)", "Disallow: /*.pdf$", "Matches any sequence of characters in the URL string."],
                  ["End of Line ($)", "Disallow: /*.json$", "Designates the end of the URL pattern for strict extension matching."],
                ].map(([directive, example, func]) => (
                  <tr key={directive} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-mono font-semibold text-[var(--ink-900)]">{directive}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[var(--accent-rust)]">{example}</td>
                    <td className="py-3">{func}</td>
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
                "RFC 9309 Protocol Standard",
                "Constructs valid, compliant directives according to the formal IETF standard recognized by major search engines.",
              ],
              [
                "Quick Pre-Configured Presets",
                "One-click presets for common scenarios: Allow All, Disallow All, or Standard SEO Best Practices.",
              ],
              [
                "Custom Path Inclusions & Exclusions",
                "Easily specify exact directory paths and filenames to allow or disallow with real-time syntax checking.",
              ],
              [
                "XML Sitemap Integration",
                "Link your XML sitemap URL automatically to provide an immediate discovery map for visiting crawlers.",
              ],
              [
                "Crawl-Delay Configuration",
                "Throttle aggressive crawlers by configuring customized wait intervals to protect server infrastructure.",
              ],
              [
                "Direct File Download",
                "Save your formatted robots.txt file immediately with one click, ready for your web root deployment.",
              ],
              [
                "One-Click Copy & Clear",
                "Quickly copy the clean directives directly to your clipboard or reset your rules with a single click.",
              ],
              [
                "100% Client-Side Privacy",
                "Your private server directories, admin route names, and domain URLs remain strictly inside your browser.",
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
          <PanelHeader eyebrow="Precedence" title="How Crawlers Interpret Rules & Priority" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              When a crawler evaluates a URL against conflicting <code>Allow</code> and <code>Disallow</code> directives,
              RFC 9309 mandates that <strong>the most specific rule wins</strong> based on path length:
            </p>
            <div className="rounded-xl border border-[var(--ink-900)]/10 bg-white p-4 font-mono text-sm text-[var(--ink-900)]">
              Disallow: /admin/<br />
              Allow: /admin/login<br />
              <span className="text-[var(--ink-700)]">→ /admin/login is allowed because its path (12 chars) is longer and more specific than /admin/ (7 chars).</span>
            </div>
            <p>
              If both Allow and Disallow rules match with equal path lengths, the <strong>Allow</strong> directive
              takes precedence under modern search engine conventions.
            </p>
          </div>
        </ToolPanel>

        {/* Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Create and Install robots.txt" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Choose base rule:</strong> Select <em>Allow All</em> (recommended for public sites) or
              <em>Disallow All</em> (for staging/private environments).
            </li>
            <li>
              <strong>Specify disallowed paths:</strong> Enter internal paths (e.g. <code>/admin/</code>,
              <code>/cart/</code>, <code>/checkout/</code>) that should not be crawled.
            </li>
            <li>
              <strong>Add sitemap link:</strong> Enter your full XML sitemap address (e.g. <code>https://example.com/sitemap.xml</code>).
            </li>
            <li>
              <strong>Download file:</strong> Click <em>Download robots.txt</em> to save the file locally.
            </li>
            <li>
              <strong>Deploy to site root:</strong> Upload the file via FTP, SSH, or CI/CD to your public web root so it
              resolves at <code>https://yourdomain.com/robots.txt</code>.
            </li>
            <li>
              <strong>Verify in Search Console:</strong> Use Google Search Console&apos;s Robots Testing Tool to verify your
              rules match expected crawler behaviors.
            </li>
          </ol>
        </ToolPanel>

        {/* Use Cases */}
        <ToolPanel>
          <PanelHeader eyebrow="Applications" title="Common Deployment Scenarios" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Public E-Commerce & Content Websites",
                "Permit full crawling of product and blog pages while disallowing search results, user accounts, and checkout funnels.",
              ],
              [
                "Staging & Development Servers",
                "Disallow all crawling (User-agent: * Disallow: /) on test environments to prevent duplicate content penalties.",
              ],
              [
                "Blocking AI Scraper Bots",
                "Explicitly forbid aggressive AI crawlers (GPTBot, ClaudeBot, CCBot) from mining your proprietary content.",
              ],
              [
                "Conserving Server Crawl Budget",
                "Prevent search bots from indexing infinite faceted navigation filters, sorting parameters, and internal search URLs.",
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
            <PanelHeader eyebrow="Advantages" title="Benefits of Proper robots.txt" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Directs crawler resources to high-value, revenue-generating pages.</li>
              <li>Protects database-heavy search and filtering endpoints from crawler overload.</li>
              <li>Prevents administrative dashboards from appearing in search results.</li>
              <li>Instantly communicates sitemap location to global search engines.</li>
              <li>Gives site owners explicit control over automated crawler permissions.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Robots.txt is public: anyone can read your disallowed paths to find private directories.</li>
              <li>Malicious bots and scrapers intentionally ignore robots.txt directives.</li>
              <li>Does not guarantee de-indexing if external sites link to the disallowed URL.</li>
              <li>Googlebot ignores the Crawl-delay directive.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for Robots.txt" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Always verify that <code>/robots.txt</code> returns HTTP 200 OK, not a 404 or 500 error.</li>
              <li>Ensure CSS and JavaScript bundles are never blocked so Google can render pages.</li>
              <li>Keep paths case-accurate: <code>/Admin/</code> does not match <code>/admin/</code>.</li>
              <li>Use <code>noindex</code> meta tags inside pages when you need absolute exclusion from search results.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Pitfalls to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Using robots.txt to hide sensitive user data or passwords (it is publicly viewable).</li>
              <li>Accidentally deploying staging robots.txt (<code>Disallow: /</code>) to production.</li>
              <li>Forgetting that <code>Disallow: /app</code> blocks <code>/application</code> as well as <code>/app/</code>.</li>
              <li>Using relative paths for the Sitemap directive (Sitemap must be a full URL).</li>
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
              ["XML Sitemap Generator", "/xml-sitemap-generator"],
              ["Meta Tag Generator", "/meta-tag-generator"],
              ["URL Encoder / Decoder", "/url-encoder-decoder"],
              ["HTML, CSS & JS Minifier", "/html-css-js-minifier"],
              ["Text Diff Checker", "/text-diff-checker"],
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
          <PanelHeader eyebrow="Terms" title="Robots & Crawler Terminology Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["REP", "Robots Exclusion Protocol, formalized as IETF RFC 9309 in 2022."],
              ["User-agent", "Header identifying the software agent, browser, or crawler requesting a resource."],
              ["Googlebot", "The primary web crawling software used by Google to index the Internet."],
              ["Bingbot", "Microsoft Bing's web crawling bot."],
              ["Crawl Budget", "The volume of queries and rate limit assigned by search engines to crawl a domain."],
              ["Crawl-delay", "Non-standard directive requesting an interval between consecutive bot requests."],
              ["Wildcard (*)", "Pattern matching symbol representing any sequence of zero or more characters."],
              ["End Anchor ($)", "Pattern matching symbol indicating the end of a URL path."],
              ["Disallow", "Directive explicitly prohibiting crawler access to a path prefix."],
              ["Allow", "Directive explicitly permitting crawler access to an otherwise blocked path."],
              ["AI Bot", "Autonomous crawler collecting data specifically for LLM and artificial intelligence training."],
              ["Scraper", "Automated script extracting content or data from web pages."],
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
                href="https://www.rfc-editor.org/rfc/rfc9309"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                IETF RFC 9309: Robots Exclusion Protocol (Formal Internet Standard)
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/search/docs/crawling-indexing/robots/intro"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Search Central: Introduction to robots.txt
              </a>
            </li>
            <li>
              <a
                href="https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Bing Webmaster Guidelines: Creating robots.txt
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: A robots.txt file provides cooperative guidance for automated crawlers adhering
          to the Robots Exclusion Protocol (RFC 9309). It is not an access-control or security barrier. Never rely
          on robots.txt to protect sensitive personal records, financial data, or administrative passwords.
        </InfoBox>
      </section>
    </main>
  )
}
