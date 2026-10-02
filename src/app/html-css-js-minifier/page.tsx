import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { HtmlCssJsMinifierTool } from "./html-css-js-minifier-tool"

const pagePath = "/html-css-js-minifier"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "HTML CSS JavaScript Minifier | Minify Code Online"
const pageDescription =
  "Minify HTML, CSS, and JavaScript online in your browser. Reduce code size, compare byte savings, copy output, and download minified frontend files."

const faqs = [
  {
    question: "What is code minification?",
    answer:
      "Code minification reduces file size by removing unnecessary characters and applying safe optimizations according to the selected minifier.",
  },
  {
    question: "Why should I minify HTML?",
    answer:
      "Minified HTML can reduce transfer size by removing comments, optional whitespace, and other removable markup characters supported by the implementation.",
  },
  {
    question: "Why should I minify CSS?",
    answer:
      "Minifying CSS reduces stylesheet bytes for production delivery and can pair well with server compression such as gzip or Brotli.",
  },
  {
    question: "Why should I minify JavaScript?",
    answer:
      "Smaller JavaScript files can download faster, though runtime performance also depends on parsing, execution, and application behavior.",
  },
  {
    question: "Does minification change functionality?",
    answer:
      "It is intended to preserve behavior for valid supported code, but output should always be tested because minifier options and input syntax matter.",
  },
  {
    question: "Is minification safe?",
    answer:
      "Minification is generally safe for valid code supported by the configured library, but production use should include testing before deployment.",
  },
  {
    question: "Does it remove comments?",
    answer:
      "Yes. The configured HTML and JavaScript minifiers remove comments, and CSSO may also remove comments as part of CSS minification.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. This is a free browser-based HTML, CSS, and JavaScript minifier.",
  },
  {
    question: "Does my code leave my browser?",
    answer:
      "The minification runs in your browser. The tool does not intentionally upload pasted code for processing.",
  },
  {
    question: "Can I minify large files?",
    answer:
      "Large files may work, but processing time and memory use depend on your browser, device, and code complexity.",
  },
  {
    question: "What is the difference between minification and compression?",
    answer:
      "Minification changes code text to remove unnecessary characters. Compression encodes files for transfer, usually at the HTTP layer.",
  },
  {
    question: "What is the difference between minification and obfuscation?",
    answer:
      "Minification focuses on file size. Obfuscation focuses on making code harder to understand, although JavaScript mangling can also reduce readability.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser text areas and buttons, so support depends on the mobile browser and file size.",
  },
  {
    question: "Why is my code unreadable afterward?",
    answer:
      "Minification removes formatting that humans use for readability, such as indentation and line breaks.",
  },
  {
    question: "Can I reverse minification?",
    answer:
      "Formatting can often be made readable again with a formatter, but original comments, exact whitespace, and some names may not be recoverable.",
  },
  {
    question: "Does this page create source maps?",
    answer:
      "No. This implementation does not expose source map generation.",
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
      "HTML CSS JavaScript Minifier",
      "HTML Minifier",
      "CSS Minifier",
      "JavaScript Minifier",
      "Code Minifier",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HTML, CSS & JavaScript Minifier",
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
    name: "HTML, CSS & JavaScript Minifier",
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
        name: "HTML, CSS & JavaScript Minifier",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to minify HTML, CSS, or JavaScript online",
    description: "Reduce frontend code size with the browser-based HTML, CSS, and JavaScript Minifier.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose language",
        text: "Select HTML, CSS, or JS.",
      },
      {
        "@type": "HowToStep",
        name: "Enter code",
        text: "Paste valid code into the input editor or load the sample.",
      },
      {
        "@type": "HowToStep",
        name: "Minify",
        text: "Click Minify to generate the optimized output.",
      },
      {
        "@type": "HowToStep",
        name: "Review savings",
        text: "Compare input and output character, line, byte, and estimated savings values.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download",
        text: "Copy the result, download the minified file, or clear the workspace.",
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

export default function HtmlCssJsMinifierPage() {
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
          <HtmlCssJsMinifierTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is an HTML, CSS & JavaScript Minifier?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                An HTML, CSS & JavaScript Minifier reduces frontend code size by removing
                unnecessary characters and applying supported safe optimizations. Developers,
                designers, agencies, students, DevOps engineers, and site owners use minifiers
                before deployment, for snippets, landing pages, static sites, and production assets.
              </p>
              <p>
                Minification is different from compression: minification rewrites source text, while
                gzip or Brotli compress transferred files. It is also different from obfuscation,
                which prioritizes hiding intent. Smaller files can improve network transfer, but
                minification alone does not guarantee faster runtime behavior.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How Minification Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Choose language", "Select HTML, CSS, or JS to load the matching sample and minifier."],
                ["Paste code", "Enter code manually in the input editor."],
                ["Minify on command", "Click Minify to run the selected minification library."],
                ["HTML path", "HTML uses html-minifier-terser with whitespace collapse, comments removed, sorted attributes, and inline CSS/JS minification enabled."],
                ["CSS path", "CSS uses CSSO with restructuring enabled."],
                ["JavaScript path", "JavaScript uses Terser with compression, name mangling, and comments disabled in output formatting."],
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
                ["HTML minification", "Minify HTML with configured html-minifier-terser options."],
                ["CSS minification", "Minify CSS with CSSO."],
                ["JavaScript minification", "Minify JavaScript with Terser."],
                ["Manual processing", "Minification runs when you click the Minify button."],
                ["Stats comparison", "Input and output panels show characters, lines, bytes, and estimated savings."],
                ["Copy output", "Copy generated minified code to the clipboard."],
                ["Download output", "Download minified.html, minified.css, or minified.js."],
                ["Clear and samples", "Clear the workspace or reload the current language sample."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Minification Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Implemented libraries", "Output depends on html-minifier-terser, CSSO, and Terser behavior and configuration."],
                ["Valid syntax", "Valid supported code is more likely to minify successfully than incomplete or invalid snippets."],
                ["Whitespace", "Whitespace is removed or collapsed only according to the selected library and options."],
                ["Comments", "Comments are removed where the configured minifiers support that behavior."],
                ["JavaScript mangling", "Terser may rename local identifiers as part of the configured mangle option."],
                ["No source maps", "This page does not generate source maps or preserve original formatting."],
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
                ["HTML deployment", "Minify a static HTML page before uploading it to a host."],
                ["CSS delivery", "Reduce stylesheet size for faster network transfer."],
                ["JavaScript build", "Compress a small JavaScript snippet for production use."],
                ["Embedded snippets", "Optimize inline CSS or JavaScript inside an HTML sample."],
                ["Frontend assets", "Prepare simple frontend files before adding them to a deployment workflow."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Minifier" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select HTML, CSS, or JS.</li>
              <li>Paste valid code into the input editor, or use Load Sample.</li>
              <li>Click Minify to generate output.</li>
              <li>Review the minified result, byte counts, line counts, and estimated savings.</li>
              <li>Copy or download the output, then test it before deployment.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding Code Minification" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Minification removes text that is useful for humans but usually unnecessary for
                browsers, such as indentation, many line breaks, and comments. Some minifiers also
                simplify syntax or rename JavaScript identifiers when that is allowed by their
                configuration.
              </p>
              <p>
                Reduced byte size can improve transfer time and reduce bandwidth, especially when
                paired with HTTP compression. It does not replace validation, testing, bundling,
                caching, or compression, and it can make manual debugging harder because the output
                is intentionally less readable.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Website deployment", "Prepare simple frontend files before publishing."],
                ["Production builds", "Check what minified code may look like before adding it to a build process."],
                ["Static websites", "Reduce small standalone HTML, CSS, and JavaScript files."],
                ["Landing pages", "Optimize compact page snippets and embedded code blocks."],
                ["Performance work", "Measure approximate byte savings from minification."],
                ["Frontend development", "Quickly test minifier behavior on examples and isolated snippets."],
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
                  <li>Reduce HTML, CSS, and JavaScript bytes for production delivery.</li>
                  <li>Compare input and output size estimates in the browser.</li>
                  <li>Copy or download minified output without installing a local command-line tool.</li>
                  <li>Use standards-aware minification libraries rather than ad hoc string cleanup.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Minification is not gzip, Brotli, or another transfer compression method.</li>
                  <li>Invalid or unsupported syntax may fail or produce errors.</li>
                  <li>Output is harder to read and may not be easy to reconstruct exactly.</li>
                  <li>Upload, beautify, source maps, and auto-minify are not implemented on this page.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Validate code before minifying.</li>
                  <li>Keep an original readable copy under version control.</li>
                  <li>Test minified output in the target browser or production-like environment.</li>
                  <li>Combine minification with HTTP compression for production delivery.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Editing minified code directly instead of the original source.</li>
                  <li>Confusing minification with compression or obfuscation.</li>
                  <li>Assuming every minifier and configuration produces identical output.</li>
                  <li>Deploying minified code without testing it first.</li>
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
                ["JSON Formatter", "/json-formatter"],
                ["HTML to Markdown", "/html-to-markdown"],
                ["Markdown Previewer", "/markdown-previewer"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["URL Encoder / Decoder", "/url-encoder-decoder"],
                ["Regex Tester", "/regex-tester"],
                ["SVG Optimizer", "/svg-optimizer"],
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
            <PanelHeader eyebrow="Glossary" title="Minification Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Minification", "Reducing source text size by removing unnecessary characters and applying supported optimizations."],
                ["Compression", "Encoding data to reduce transfer or storage size, such as gzip or Brotli."],
                ["Obfuscation", "Transforming code to make it harder for humans to understand."],
                ["HTML", "The markup language used to structure web documents."],
                ["CSS", "The style language used to describe presentation of web documents."],
                ["JavaScript", "The ECMAScript-based programming language commonly used in web browsers."],
                ["Whitespace", "Spaces, tabs, and line breaks used for formatting source code."],
                ["Comment", "Developer notes in source code that browsers or parsers may ignore."],
                ["Source Map", "A file that maps generated code back to original source for debugging."],
                ["Production Build", "Optimized code prepared for deployment to users."],
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
                  href="https://html.spec.whatwg.org/multipage/syntax.html"
                  rel="noreferrer"
                >
                  WHATWG HTML Living Standard. HTML syntax.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS"
                  rel="noreferrer"
                >
                  MDN. CSS performance optimization.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/JavaScript"
                  rel="noreferrer"
                >
                  MDN. JavaScript performance optimization.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/TR/css-2026/"
                  rel="noreferrer"
                >
                  W3C. CSS Snapshot 2026.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://tc39.es/ecma262/"
                  rel="noreferrer"
                >
                  TC39. ECMAScript Language Specification.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://terser.org/docs/api-reference/"
                  rel="noreferrer"
                >
                  Terser. API Reference.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://github.com/css/csso"
                  rel="noreferrer"
                >
                  CSSO. CSS minifier repository and documentation.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://github.com/terser/html-minifier-terser"
                  rel="noreferrer"
                >
                  html-minifier-terser. HTML minifier repository and options.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="technical">
          <p>
            This HTML, CSS & JavaScript Minifier performs minification using the implemented
            libraries and configuration. Minification removes unnecessary characters and applies
            supported optimizations while aiming to preserve functionality for valid supported
            code. Different minification libraries and settings may produce different output.
            Test minified code before deploying it to production.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
