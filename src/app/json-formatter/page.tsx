import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { JsonFormatterTool } from "./json-formatter-tool"

const pagePath = "/json-formatter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "JSON Formatter | Format, Validate, and Minify JSON Online"
const pageDescription =
  "Format JSON online with 2-space, 4-space, tab, or minified output. Validate pasted JSON syntax, optionally sort object keys, copy formatted JSON, and inspect object, array, and key counts."

const faqs = [
  {
    question: "What is a JSON Formatter?",
    answer:
      "A JSON Formatter parses JSON text and serializes it with readable indentation, compact minified output, or the selected formatting settings.",
  },
  {
    question: "How do I format JSON online?",
    answer:
      "Paste valid JSON into the input area, choose an indentation mode, and review the formatted output.",
  },
  {
    question: "What is JSON pretty printing?",
    answer:
      "Pretty printing adds line breaks and indentation so nested JSON objects and arrays are easier to read.",
  },
  {
    question: "Does formatting JSON change the data?",
    answer:
      "Formatting changes presentation. For valid JSON, values are parsed and serialized without intentionally changing the represented data.",
  },
  {
    question: "Does this formatter validate JSON?",
    answer:
      "Yes. The page uses JSON.parse, so invalid JSON prevents output and shows the parser error message.",
  },
  {
    question: "What is the difference between JSON formatting and JSON validation?",
    answer:
      "Formatting changes whitespace and layout. Syntax validation checks whether the text follows JSON grammar.",
  },
  {
    question: "Can I format a JSON file?",
    answer:
      "This implementation does not include file upload. Open the file elsewhere and paste its JSON text into the input area.",
  },
  {
    question: "Can I customize indentation?",
    answer:
      "Yes. Choose 2 spaces, 4 spaces, tabs, or minified output.",
  },
  {
    question: "Can I minify JSON?",
    answer:
      "Yes. Select Minify to serialize the JSON without pretty-print indentation.",
  },
  {
    question: "Does it sort JSON keys?",
    answer:
      "Yes, if Sort object keys is enabled. Sorting is applied recursively before serialization.",
  },
  {
    question: "Does JSON allow comments?",
    answer:
      "No. Standard JSON does not allow comments, and this formatter does not add comment support.",
  },
  {
    question: "Can I use single quotes in JSON?",
    answer:
      "No. JSON strings and object names must use double quotes.",
  },
  {
    question: "Does JSON formatting change property order?",
    answer:
      "With sorting disabled, the formatter serializes the parsed object in its current property order. With sorting enabled, object keys are sorted recursively.",
  },
  {
    question: "What happens when JSON has duplicate object names?",
    answer:
      "This formatter uses JSON.parse before serialization. Duplicate names should be avoided because parser behavior can vary; in this browser-based workflow, the parsed value is what gets formatted.",
  },
  {
    question: "Can I copy formatted JSON?",
    answer: "Yes. Use Copy JSON to copy the current formatted output.",
  },
  {
    question: "Can I download formatted JSON?",
    answer:
      "No. This implementation provides copy, clear, and sample controls, but no download button.",
  },
  {
    question: "Is the JSON Formatter free?",
    answer: "Yes. This is a free browser-based JSON formatting tool.",
  },
  {
    question: "Does the JSON Formatter work on mobile devices?",
    answer:
      "Yes. It uses standard browser text areas, checkboxes, segmented controls, and buttons, so behavior depends on the mobile browser.",
  },
  {
    question: "Is my JSON data uploaded to a server?",
    answer:
      "The formatter runs in your browser and does not intentionally upload pasted JSON data.",
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
    about: ["JSON Formatter", "JSON Pretty Printer", "JSON Validator", "JSON Minifier"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter",
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
      "JSON text input",
      "JSON syntax validation",
      "2-space indentation",
      "4-space indentation",
      "Tab indentation",
      "JSON minification",
      "Recursive key sorting",
      "Object, array, and key counts",
      "Copy formatted JSON",
      "Clear workspace",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSON Formatter",
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "JSON Formatter", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to format JSON",
    description: "Format, validate, minify, or sort pasted JSON with the available formatter controls.",
    step: [
      { "@type": "HowToStep", name: "Paste JSON", text: "Enter or paste JSON text into the input area." },
      { "@type": "HowToStep", name: "Choose formatting", text: "Select 2 spaces, 4 spaces, tabs, or minified output." },
      { "@type": "HowToStep", name: "Sort keys if needed", text: "Enable Sort object keys if you want recursive key sorting." },
      { "@type": "HowToStep", name: "Copy output", text: "Review the output and use Copy JSON to copy the formatted result." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pagePath },
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

export default function JsonFormatterPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <JsonFormatterTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a JSON Formatter?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A JSON Formatter makes valid JSON easier to read by parsing the input and serializing
              it with the selected whitespace, indentation, and line-break style. Developers use
              formatted JSON when reviewing API responses, configuration files, fixtures, logs, and
              debugging data.
            </p>
            <p>
              This page validates pasted JSON syntax, formats it with 2 spaces, 4 spaces, or tabs,
              minifies it when requested, optionally sorts object keys, and provides readable counts
              for objects, arrays, keys, characters, lines, and bytes.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Features" title="JSON Formatting Features" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["JSON text input", "Paste JSON directly into the input area."],
              ["Syntax validation", "Invalid JSON shows the JSON.parse error and prevents formatted output."],
              ["Pretty printing", "Choose 2 spaces, 4 spaces, or tabs for readable indentation."],
              ["Minification", "Choose Minify to remove pretty-print indentation."],
              ["Key sorting", "Sort object keys recursively when the checkbox is enabled."],
              ["Statistics", "View character, line, byte, object, array, and key counts."],
              ["Copy", "Copy the current formatted output to the clipboard."],
              ["Clear and sample", "Clear the workspace or reload the built-in sample JSON."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How JSON Formatting Works" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The formatter parses the input with JSON.parse. If parsing succeeds, it optionally
              sorts object keys recursively, then serializes the result with JSON.stringify using
              the selected indentation mode. If parsing fails, the output is cleared and the parser
              error is displayed.
            </p>
            <p>
              Pretty-printed JSON uses whitespace to improve readability. Minified JSON removes the
              extra formatting whitespace. Neither mode is the same as gzip, Brotli, or another
              compression algorithm.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Syntax" title="JSON Syntax Explained" />
          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            {[
              ["Objects", "Objects use curly braces and contain string property names with values."],
              ["Arrays", "Arrays use square brackets and contain ordered values."],
              ["Values", "JSON values can be objects, arrays, strings, numbers, true, false, or null."],
              ["Strings", "Strings and object names use double quotes, not single quotes."],
              ["Whitespace", "Whitespace outside strings can be insignificant; whitespace inside strings is data."],
              ["Escaping", "Quotation marks, backslashes, control characters, and Unicode escapes have JSON escaping rules."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Validation" title="JSON Validation and Errors" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              This formatter performs JSON syntax validation as part of parsing. It does not perform
              JSON Schema validation, application-level validation, data cleaning, or malformed JSON
              repair. Error messages come from the underlying parser and may mention unexpected
              tokens or positions depending on the browser.
            </p>
            <p>
              A valid formatted document can still contain data that is wrong for your application.
              Formatting and syntax validation do not prove that values match a business rule,
              API contract, or database schema.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Comparison" title="Pretty-Printed vs Minified JSON" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10">
                  <th className="py-3 pr-4 font-semibold">Mode</th>
                  <th className="py-3 pr-4 font-semibold">Output</th>
                  <th className="py-3 pr-4 font-semibold">Use</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["2 spaces", "Readable indentation with two spaces", "Code review and common style guides"],
                  ["4 spaces", "Readable indentation with four spaces", "Workflows preferring wider indentation"],
                  ["Tabs", "Readable indentation using tab characters", "Projects that use tabs"],
                  ["Minify", "No pretty-print indentation", "Compact transfer or storage text"],
                ].map(([mode, output, use]) => (
                  <tr key={mode} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-semibold text-[var(--ink-900)]">{mode}</td>
                    <td className="py-3 pr-4">{output}</td>
                    <td className="py-3 pr-4">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common JSON Formatter Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["API response", "Pretty-print compact API JSON so nested data is easier to inspect."],
              ["Debugging", "Format JSON while tracing application or integration issues."],
              ["Configuration", "Review JSON configuration files with consistent indentation."],
              ["Development fixtures", "Format mock payloads before adding them to tests or documentation."],
              ["Code review", "Sort keys or pretty-print JSON to make structural changes easier to read."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the JSON Formatter" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Paste JSON into the input area.</li>
            <li>Choose 2 spaces, 4 spaces, tabs, or minified output.</li>
            <li>Enable Sort object keys if recursive key sorting is useful for your workflow.</li>
            <li>Review validation status, formatted output, and JSON statistics.</li>
            <li>Copy the formatted JSON, clear the workspace, or reload the sample.</li>
          </ol>
        </ToolPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Improves readability of nested JSON structures.</li>
              <li>Helps inspect API responses, configuration files, and sample payloads.</li>
              <li>Offers pretty printing, minification, and recursive key sorting.</li>
              <li>Uses a browser-based workflow with no extra dependency added to the site.</li>
              <li>Provides copy and statistics for quick development tasks.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>File upload, drag-and-drop, download, syntax highlighting, and tree view are not implemented.</li>
              <li>Formatting does not repair malformed JSON.</li>
              <li>JSON Schema validation and application-specific validation are not included.</li>
              <li>Duplicate object names should be avoided because parsing can resolve them before formatting.</li>
              <li>Pretty-printed JSON can be larger than compact JSON because it contains extra whitespace.</li>
              <li>Very large JSON input may be limited by browser memory and rendering behavior.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use valid JSON with double-quoted strings and property names.</li>
              <li>Check commas between object properties and array elements.</li>
              <li>Choose the indentation mode that matches your project or document style.</li>
              <li>Use minified output only when compact text is more useful than readability.</li>
              <li>Remember that whitespace inside string values is data and should be preserved.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Using single quotes instead of JSON double quotes.</li>
              <li>Leaving trailing commas in objects or arrays.</li>
              <li>Assuming formatting fixes invalid JSON automatically.</li>
              <li>Confusing JSON syntax validation with JSON Schema validation.</li>
              <li>Assuming property ordering is universally meaningful in every JSON workflow.</li>
            </ul>
          </ToolPanel>
        </div>

        <ToolPanel>
          <PanelHeader eyebrow="Questions" title="FAQ" />
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="More Tools" title="Related Tools" />
          <nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
            {[
              ["JSON to TypeScript Converter", "/json-to-typescript"],
              ["CSV to JSON Converter", "/csv-to-json"],
              ["YAML JSON Converter", "/yaml-json-converter"],
              ["JWT Decoder", "/jwt-decoder"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
              ["Regex Tester", "/regex-tester"],
              ["HTML, CSS & JavaScript Minifier", "/html-css-js-minifier"],
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

        <ToolPanel>
          <PanelHeader eyebrow="Terms" title="Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["JSON", "JavaScript Object Notation, a text syntax for structured data."],
              ["JSON Object", "A collection of string names and values inside curly braces."],
              ["JSON Array", "An ordered list of values inside square brackets."],
              ["JSON Value", "An object, array, string, number, boolean, or null."],
              ["JSON Parsing", "Reading JSON text and constructing the represented value."],
              ["JSON Serialization", "Producing JSON text from a structured value."],
              ["Pretty Printing", "Adding indentation and line breaks for readability."],
              ["Minification", "Removing unnecessary formatting whitespace for compact output."],
              ["Whitespace", "Spaces, tabs, and line breaks outside strings that can help readability."],
              ["Indentation", "Leading whitespace that shows nesting depth."],
              ["Escape Sequence", "A sequence used to represent special characters inside strings."],
              ["Syntax Error", "An error caused by text that does not follow JSON grammar."],
              ["JSON Validation", "Checking whether JSON text follows JSON syntax."],
              ["JSON Schema", "A separate vocabulary for describing and validating JSON data shapes."],
              ["Nested Object", "An object inside another object or array."],
              ["Data Structure", "An organized arrangement of values."],
            ].map(([term, definition]) => (
              <div key={term}>
                <h3 className="font-semibold">{term}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">{definition}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Sources" title="References" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <a href="https://www.rfc-editor.org/info/rfc8259/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                RFC 8259: The JavaScript Object Notation Data Interchange Format
              </a>
            </li>
            <li>
              <a href="https://ecma-international.org/publications-and-standards/standards/ecma-404/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                ECMA-404: The JSON Data Interchange Standard
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: JSON.parse
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: JSON.stringify
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This tool formats JSON according to its implemented parsing,
          optional sorting, and serialization methods. Formatting primarily changes whitespace,
          indentation, and presentation for typical valid input. Parsing and serialization can
          normalize the text, especially when duplicate object names are present. It does not
          validate JSON Schema or business rules. Verify important JSON data and
          application-specific requirements before using formatted output in production.
        </InfoBox>
      </section>
    </main>
  )
}
