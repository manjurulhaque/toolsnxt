import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { HtmlToMarkdownTool } from "./html-to-markdown-tool"

const pagePath = "/html-to-markdown"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "HTML to Markdown | Convert HTML to Markdown Online"
const pageDescription =
  "Convert HTML to Markdown online in your browser. Paste HTML and generate Markdown for headings, links, images, lists, blockquotes, code, and simple tables."

const faqs = [
  {
    question: "What is HTML to Markdown?",
    answer:
      "HTML to Markdown conversion turns supported HTML elements into Markdown text syntax for easier editing and documentation.",
  },
  {
    question: "How does HTML-to-Markdown conversion work?",
    answer:
      "This page parses pasted HTML with DOMParser, walks the document body, and maps supported elements to Markdown strings.",
  },
  {
    question: "Which HTML elements are supported?",
    answer:
      "Implemented mappings include headings, paragraphs and common containers, line breaks, bold, emphasis, strikethrough, inline code, preformatted code, links, images, blockquotes, lists, and simple tables.",
  },
  {
    question: "Are tables converted?",
    answer:
      "Yes. HTML table rows and cells are converted into a simple pipe-table Markdown format.",
  },
  {
    question: "Are images converted?",
    answer:
      "Yes. Images with a src attribute are converted to Markdown image syntax using the alt attribute when present.",
  },
  {
    question: "Are links preserved?",
    answer:
      "Yes. Anchor tags with href attributes are converted to inline Markdown links.",
  },
  {
    question: "Are code blocks converted?",
    answer:
      "Yes. pre elements are converted to fenced code blocks, and code elements are converted to inline code spans.",
  },
  {
    question: "Does the tool support GitHub Flavored Markdown?",
    answer:
      "The output includes some GFM-style syntax such as pipe tables and strikethrough, but it is not a full GFM compliance checker.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser text areas and buttons, so support depends on the mobile browser.",
  },
  {
    question: "Is my HTML uploaded to a server?",
    answer:
      "The conversion runs in your browser. The tool does not intentionally upload pasted HTML for processing.",
  },
  {
    question: "Can I copy the generated Markdown?",
    answer:
      "Yes. Use Copy Markdown to copy the converted output.",
  },
  {
    question: "Can I download the output?",
    answer:
      "No. This implementation provides copy, clear, and sample actions, but not a download button.",
  },
  {
    question: "Why is my Markdown different from another converter?",
    answer:
      "Converters use different parsers, element mappings, whitespace rules, escaping choices, and Markdown flavors.",
  },
  {
    question: "Can I use the output commercially?",
    answer:
      "The tool does not grant rights to source content. Use converted output only when you have the required rights and permissions.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. This is a free browser-based HTML to Markdown converter.",
  },
  {
    question: "Does it preserve CSS or layout?",
    answer:
      "No. Markdown represents document structure and inline formatting, not pixel-perfect CSS layout or interactive behavior.",
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
    about: ["HTML to Markdown", "HTML to Markdown Converter", "Markdown Generator", "HTML to MD"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HTML to Markdown",
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
    "@type": "SoftwareApplication",
    name: "HTML to Markdown",
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
        name: "HTML to Markdown",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert HTML to Markdown online",
    description: "Generate Markdown from pasted HTML with the browser-based HTML to Markdown tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Paste HTML",
        text: "Paste HTML into the input editor.",
      },
      {
        "@type": "HowToStep",
        name: "Review output",
        text: "The Markdown output updates automatically in the output panel.",
      },
      {
        "@type": "HowToStep",
        name: "Check stats",
        text: "Review input characters, tags, lines, and output words, characters, and lines.",
      },
      {
        "@type": "HowToStep",
        name: "Copy Markdown",
        text: "Use Copy Markdown to copy the generated Markdown.",
      },
      {
        "@type": "HowToStep",
        name: "Verify rendering",
        text: "Preview the output in your target Markdown renderer before publishing.",
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

export default function HtmlToMarkdownPage() {
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
          <HtmlToMarkdownTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is HTML to Markdown?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                HTML to Markdown conversion turns structured web markup into lighter plain-text
                Markdown. Developers, technical writers, documentation teams, students, bloggers,
                content creators, and open-source contributors use it to migrate snippets,
                simplify content, prepare README files, and edit documentation more comfortably.
              </p>
              <p>
                HTML uses tags and elements to describe document structure for browsers. Markdown
                uses readable punctuation patterns for headings, links, lists, emphasis, code, and
                other common writing structures. Some HTML layout and interactivity cannot be
                represented exactly in Markdown.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How HTML to Markdown Conversion Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Paste HTML", "Enter HTML directly into the input editor."],
                ["Parse HTML", "The browser DOMParser parses the input as text/html."],
                ["Walk nodes", "The implementation walks child nodes from the parsed document body."],
                ["Map elements", "Supported elements are converted to Markdown syntax."],
                ["Normalize output", "Extra spaces and blank lines are normalized by the implemented rules."],
                ["Copy Markdown", "Use Copy Markdown to copy the generated output."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Supported Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Browser-based conversion", "HTML parsing and Markdown generation run in the browser."],
                ["Headings", "h1 through h6 become ATX-style Markdown headings."],
                ["Paragraphs and containers", "p, article, section, main, header, footer, and div create Markdown blocks."],
                ["Inline formatting", "strong, b, em, i, s, del, and code map to Markdown inline syntax."],
                ["Links and images", "a and img elements convert to inline link and image syntax when attributes exist."],
                ["Lists and blockquotes", "ul, ol, li, and blockquote elements convert to Markdown list and quote formats."],
                ["Code blocks and tables", "pre elements become fenced code blocks; simple tables become pipe tables."],
                ["Copy, clear, sample", "Copy Markdown, Clear, and Load Sample are implemented."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Conversion Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Implemented mappings", "Markdown is generated directly from the supported HTML mappings in this page."],
                ["Unsupported elements", "Elements without specific mappings fall back to converted child content."],
                ["Whitespace", "Text nodes collapse whitespace, and final Markdown removes trailing line spaces and excess blank lines."],
                ["Tables", "Table cells escape pipe characters and convert newlines inside cells to <br>."],
                ["No sanitizing output view", "The tool outputs Markdown text; it does not render or sanitize HTML for display as a web page."],
                ["Converter differences", "Other converters may produce different Markdown due to parser, escaping, and flavor choices."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Common Examples" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Webpage content", "Convert article HTML into Markdown documentation."],
                ["Blog migration", "Move simple HTML blog content into a Markdown-based CMS."],
                ["README drafts", "Prepare README sections from HTML snippets."],
                ["Email content", "Convert simple HTML email copy into readable Markdown notes."],
                ["Note-taking", "Simplify HTML fragments into plain text markup for personal notes."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use HTML to Markdown" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Paste HTML into the HTML input editor.</li>
              <li>Review the generated Markdown in the output editor.</li>
              <li>Check the input and output statistics if useful.</li>
              <li>Use Copy Markdown to copy the converted text.</li>
              <li>Preview and test the Markdown in your target renderer before publishing.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding HTML and Markdown" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                HTML is a markup language made from elements and tags. It can represent rich
                document structure, attributes, embedded media, styling hooks, scripts, and
                interactive behavior. Markdown is also a markup language, but it focuses on readable
                plain text for common document structures.
              </p>
              <p>
                Block elements such as headings, paragraphs, lists, blockquotes, code blocks, and
                tables usually become separate Markdown blocks. Inline elements such as links,
                emphasis, images, and code spans appear inside those blocks. Markdown flavors differ,
                so table and strikethrough support depends on the renderer.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Documentation", "Convert HTML snippets into docs, guides, and knowledge-base articles."],
                ["GitHub README files", "Prepare Markdown for repositories and project pages."],
                ["Static site generators", "Migrate simple HTML content into Markdown content files."],
                ["Technical writing", "Turn web markup into editable drafting material."],
                ["Content migration", "Simplify old HTML pages before moving to a Markdown workflow."],
                ["Education", "Compare HTML elements with Markdown syntax for learning markup concepts."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, Tips and Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Convert HTML snippets into readable Markdown in the browser.</li>
                  <li>Make content easier to edit, review, and store in plain text workflows.</li>
                  <li>Copy generated Markdown without installing a command-line converter.</li>
                  <li>Use lightweight markup for documentation, notes, blogs, and README drafts.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Not every HTML element has an equivalent Markdown representation.</li>
                  <li>Complex layouts, CSS, scripts, forms, and interactive elements are simplified or omitted.</li>
                  <li>Markdown flavors support different features, especially tables and strikethrough.</li>
                  <li>Upload and download actions are not implemented on this page.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use clean, valid HTML when possible.</li>
                  <li>Remove unnecessary styles, scripts, and layout wrappers before conversion.</li>
                  <li>Review generated Markdown before publishing.</li>
                  <li>Test output in your target Markdown renderer or previewer.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Expecting pixel-perfect HTML reproduction.</li>
                  <li>Assuming every HTML element has a Markdown equivalent.</li>
                  <li>Forgetting that Markdown flavors differ.</li>
                  <li>Assuming every converter generates identical output.</li>
                </ul>
              </div>
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
            <PanelHeader eyebrow="More Tools" title="Related Tools" />
            <nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              {[
                ["Markdown Previewer", "/markdown-previewer"],
                ["HTML CSS JS Minifier", "/html-css-js-minifier"],
                ["JSON Formatter", "/json-formatter"],
                ["YAML JSON Converter", "/yaml-json-converter"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["URL Encoder / Decoder", "/url-encoder-decoder"],
                ["Regex Tester", "/regex-tester"],
                ["Text Diff Checker", "/text-diff-checker"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="HTML and Markdown Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["HTML", "HyperText Markup Language, the markup language browsers parse for web documents."],
                ["Markdown", "A readable plain-text markup format for structured writing."],
                ["CommonMark", "A formal specification for a common Markdown syntax."],
                ["GitHub Flavored Markdown", "GitHub's CommonMark-based Markdown dialect with extensions such as tables and strikethrough."],
                ["Element", "A structured part of an HTML document, such as a paragraph or link."],
                ["Tag", "The markup syntax used to start or end many HTML elements."],
                ["Block Element", "A document structure that typically stands as its own block, such as a heading or paragraph."],
                ["Inline Element", "A structure that appears inside text, such as emphasis, a link, or inline code."],
                ["Parser", "Software that reads markup and creates a structured representation."],
                ["Markup Language", "A text format that uses symbols or tags to describe document structure."],
              ].map(([term, definition]) => (
                <div key={term}>
                  <dt className="font-semibold text-[var(--ink-900)]">{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Sources" title="References" />
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--ink-700)]">
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://spec.commonmark.org/spec"
                  rel="noreferrer"
                >
                  CommonMark Specification.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://github.github.com/gfm/"
                  rel="noreferrer"
                >
                  GitHub Flavored Markdown Specification.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://html.spec.whatwg.org/multipage/parsing.html"
                  rel="noreferrer"
                >
                  WHATWG HTML Living Standard. Parsing HTML documents.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString"
                  rel="noreferrer"
                >
                  MDN Web Docs. DOMParser parseFromString.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements"
                  rel="noreferrer"
                >
                  MDN Web Docs. HTML elements reference.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This HTML to Markdown tool converts HTML into Markdown using the implemented
            browser-based conversion algorithm. Results depend on supported HTML elements,
            Markdown syntax, whitespace handling, and mapping rules. Different converters and
            Markdown flavors may produce different output. The tool is intended for educational,
            documentation, and development purposes.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
