import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { CsvToJsonTool } from "./csv-to-json-tool"

const pagePath = "/csv-to-json"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "CSV to JSON Converter | Convert CSV Data Online"
const pageDescription =
  "Convert pasted CSV data to JSON online. Create JSON objects or row arrays, trim values, use the first row as headers, copy JSON, or download data.json in your browser."

const faqs = [
  {
    question: "What is a CSV to JSON Converter?",
    answer:
      "A CSV to JSON Converter maps comma-separated rows and fields into JSON using the tool's implemented parsing and output rules.",
  },
  {
    question: "What is CSV?",
    answer:
      "CSV stands for comma-separated values. It represents tabular data as records and fields separated by commas.",
  },
  {
    question: "What is JSON?",
    answer:
      "JSON is a text format for structured data that can represent objects, arrays, strings, numbers, booleans, and null.",
  },
  {
    question: "Can I paste CSV data into the converter?",
    answer:
      "Yes. This page is built around a CSV text area where you can type or paste comma-separated data.",
  },
  {
    question: "Can I upload a CSV file?",
    answer:
      "No. This implementation does not include file upload. Paste CSV text into the input area instead.",
  },
  {
    question: "Does the converter support CSV headers?",
    answer:
      "Yes. When First row is header is enabled, the first parsed row becomes the JSON object property names.",
  },
  {
    question: "How are CSV rows converted to JSON?",
    answer:
      "With headers enabled, each body row becomes one JSON object. With headers disabled, parsed rows are serialized as arrays.",
  },
  {
    question: "How are CSV columns converted to JSON properties?",
    answer:
      "Header cells become property names. Blank headers are replaced with column_1, column_2, and so on.",
  },
  {
    question: "Does it support quoted CSV fields?",
    answer:
      "Yes. The parser handles fields wrapped in double quotes and keeps commas or line breaks inside quoted fields.",
  },
  {
    question: "Does it support escaped quotation marks?",
    answer:
      "Yes. Two double quotes inside a quoted field are interpreted as one quotation mark.",
  },
  {
    question: "Does the converter preserve numbers as numbers?",
    answer:
      "No. Object output stores parsed CSV values as strings. The tool does not perform data type inference.",
  },
  {
    question: "Are empty CSV fields converted to null?",
    answer:
      "No. Empty fields are represented as empty strings in the current output behavior.",
  },
  {
    question: "Can I minify the JSON?",
    answer:
      "Yes. Select Minify to serialize the generated JSON without pretty-print indentation.",
  },
  {
    question: "Can I copy the generated JSON?",
    answer:
      "Yes. Use Copy JSON to copy the current output to the clipboard.",
  },
  {
    question: "Can I download the JSON?",
    answer:
      "Yes. Use Download to save the generated output as data.json.",
  },
  {
    question: "Is the CSV to JSON Converter free?",
    answer: "Yes. This is a free browser-based CSV to JSON conversion tool.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser text areas, checkboxes, buttons, and downloads, so behavior depends on the mobile browser.",
  },
  {
    question: "Is my CSV data uploaded to a server?",
    answer:
      "The conversion runs in your browser and does not intentionally upload pasted CSV data.",
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
    about: ["CSV to JSON Converter", "CSV Converter", "JSON Converter", "Structured Data"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSV to JSON Converter",
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
      "CSV text input",
      "Header row option",
      "Trim values option",
      "JSON object output",
      "JSON row array output",
      "Minified JSON output",
      "Copy JSON",
      "Download JSON",
      "Clear workspace",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSV to JSON Converter",
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
        name: "CSV to JSON Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert CSV to JSON",
    description: "Convert pasted comma-separated values into JSON using the available header, trim, and output options.",
    step: [
      {
        "@type": "HowToStep",
        name: "Paste CSV",
        text: "Enter or paste comma-separated values into the CSV input area.",
      },
      {
        "@type": "HowToStep",
        name: "Choose options",
        text: "Enable or disable First row is header and Trim values, then choose Objects, Rows, or Minify.",
      },
      {
        "@type": "HowToStep",
        name: "Review JSON",
        text: "Check the generated JSON output and row, column, cell, and record counts.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download",
        text: "Copy the JSON to the clipboard or download it as data.json.",
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

export default function CsvToJsonPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <CsvToJsonTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a CSV to JSON Converter?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A CSV to JSON Converter transforms tabular comma-separated values into JSON text.
              CSV stores records as rows and fields, while JSON can represent structured data with
              arrays and objects. Developers, data analysts, students, QA engineers, and API teams
              often convert CSV rows into JSON when moving sample data into scripts, web apps,
              tests, or documentation.
            </p>
            <p>
              This converter maps pasted CSV into either JSON objects based on a header row or JSON
              row arrays when headers are disabled. It also offers value trimming, minified output,
              copy, clear, sample loading, and JSON download controls.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="CSV" title="Supported CSV Features" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Comma delimiter", "Fields are separated by commas. Custom delimiters are not implemented."],
              ["Header row option", "The first row can become JSON property names when the checkbox is enabled."],
              ["Quoted fields", "Double-quoted fields can contain commas or line breaks."],
              ["Escaped quotes", "Two double quotes inside a quoted field become one quotation mark."],
              ["Empty fields", "Empty fields are preserved as empty strings in generated JSON."],
              ["Missing values", "Missing row values for known headers become empty strings."],
              ["Trim values", "The Trim values checkbox removes leading and trailing whitespace from parsed fields."],
              ["Blank rows", "Rows whose cells are all empty are filtered out before output."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Output" title="JSON Output Documentation" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              With First row is header enabled, the first parsed row provides object keys and every
              following row becomes one JSON object. Blank header cells become names such as
              column_1. Values are serialized as strings, so values such as true, 98, or an empty
              field are not converted into native JSON booleans, numbers, or null values.
            </p>
            <p>
              With First row is header disabled, parsed rows are serialized as arrays of strings.
              The Minify option changes indentation only; it does not change the parsed data
              structure. The Download button saves the displayed output as data.json.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How CSV to JSON Conversion Works" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Paste comma-separated text into the CSV input area.</li>
            <li>Choose whether the first row should be treated as headers.</li>
            <li>Choose whether parsed field values should be trimmed.</li>
            <li>Select Objects, Rows, or Minify for the displayed JSON presentation.</li>
            <li>Review row, column, cell, and record counts along with the JSON output.</li>
            <li>Copy the output or download it as data.json.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Behavior" title="Conversion Behavior and Accuracy" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Conversion depends on the parser rules implemented on this page: comma separators,
              quote toggling, doubled quote escaping, CRLF or LF row breaks outside quoted fields,
              optional trimming, blank-row filtering, and JSON.stringify serialization. Different
              CSV parsers can interpret malformed or ambiguous input differently.
            </p>
            <p>
              A successful conversion means the output is valid JSON text according to the
              implementation, but it does not guarantee that the data matches a particular API,
              database schema, or application import format.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Structures" title="Understanding CSV, JSON, and Data Mapping" />
          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold">CSV</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                CSV is a tabular text format. It commonly uses records, fields, rows, columns,
                headers, commas, quoted fields, escaped quotes, and line breaks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">JSON</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                JSON is structured text with arrays, objects, property names, strings, numbers,
                booleans, null, brackets, braces, commas, colons, and escaping rules.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Mapping</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                This page maps header cells to property names when headers are enabled, then maps
                each following CSV row to a JSON object. Without headers, rows become arrays.
              </p>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Example" title="CSV to JSON Mapping Example" />
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold">CSV input</h3>
              <pre className="mt-3 overflow-x-auto rounded-[1.1rem] bg-[var(--page-cream)] p-4 text-xs leading-6">
{`name,age,city
Alice,30,London
Bob,25,Paris`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">Object output with headers enabled</h3>
              <pre className="mt-3 overflow-x-auto rounded-[1.1rem] bg-[var(--page-cream)] p-4 text-xs leading-6">
{`[
  {
    "name": "Alice",
    "age": "30",
    "city": "London"
  },
  {
    "name": "Bob",
    "age": "25",
    "city": "Paris"
  }
]`}
              </pre>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Comparison" title="CSV vs JSON" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10">
                  <th className="py-3 pr-4 font-semibold">Topic</th>
                  <th className="py-3 pr-4 font-semibold">CSV</th>
                  <th className="py-3 pr-4 font-semibold">JSON</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["Structure", "Rows and fields", "Objects, arrays, and values"],
                  ["Best fit", "Flat tabular data", "Structured application data"],
                  ["Data types", "Text fields by convention", "Strings, numbers, booleans, null, objects, arrays"],
                  ["Spreadsheet use", "Commonly imported by spreadsheet tools", "Less spreadsheet-oriented"],
                  ["API use", "Possible, but less common for web APIs", "Common for APIs and application data"],
                  ["Nested data", "Not naturally represented", "Naturally supports nested structures"],
                ].map(([topic, csv, json]) => (
                  <tr key={topic} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-semibold text-[var(--ink-900)]">{topic}</td>
                    <td className="py-3 pr-4">{csv}</td>
                    <td className="py-3 pr-4">{json}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common CSV to JSON Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["API data", "Convert tabular sample records into an array of JSON objects for API testing."],
              ["Web development", "Turn CSV records into JSON that can be loaded by browser-based scripts."],
              ["Data analysis", "Prepare pasted CSV data for tools or scripts that expect JSON text."],
              ["Configuration or import", "Create JSON objects from flat CSV data when another system expects that shape."],
              ["Development fixtures", "Convert small sample datasets into readable JSON fixtures."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Converts pasted CSV data into JSON without manual row mapping.</li>
              <li>Supports object output, row-array output, and minified JSON presentation.</li>
              <li>Helps developers, testers, and analysts create quick JSON fixtures.</li>
              <li>Runs in the browser using the current page logic.</li>
              <li>Includes copy, clear, sample, and download controls.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Only comma-delimited pasted text is supported.</li>
              <li>File upload, drag-and-drop, and custom delimiters are not implemented.</li>
              <li>The converter does not infer numbers, booleans, dates, nested objects, or null values.</li>
              <li>Extra cells beyond the header count are not represented in object output.</li>
              <li>Duplicate header names can overwrite earlier properties in an object.</li>
              <li>Very large inputs are limited by browser memory and rendering behavior.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use comma-separated data with consistent rows where possible.</li>
              <li>Check the header row before using object output.</li>
              <li>Quote fields that contain commas, quotes, or line breaks.</li>
              <li>Review empty fields and missing values before using the JSON.</li>
              <li>Validate the generated JSON against your target application schema.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Using semicolon- or tab-delimited data when the tool expects commas.</li>
              <li>Forgetting to enable or disable the header row option correctly.</li>
              <li>Expecting flat CSV to produce nested JSON automatically.</li>
              <li>Assuming numeric-looking strings become JSON numbers.</li>
              <li>Copying valid JSON into a system that expects a different structure.</li>
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
              ["JSON Formatter", "/json-formatter"],
              ["YAML JSON Converter", "/yaml-json-converter"],
              ["XML Sitemap Generator", "/xml-sitemap-generator"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
              ["URL Encoder / Decoder", "/url-encoder-decoder"],
              ["Regex Tester", "/regex-tester"],
              ["Text Diff Checker", "/text-diff-checker"],
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
              ["CSV", "Comma-separated values, a text format for tabular records and fields."],
              ["Record", "One row of CSV data."],
              ["Field", "One value inside a CSV record."],
              ["Header", "A row that names columns, commonly the first row."],
              ["Delimiter", "The character separating fields. This tool uses commas."],
              ["Quoted Field", "A field enclosed in double quotes, often used when values contain commas or line breaks."],
              ["Escape Character", "A character or sequence used to represent a special character inside data."],
              ["CSV Parsing", "Reading CSV text and turning it into rows and fields."],
              ["JSON", "JavaScript Object Notation, a structured data interchange syntax."],
              ["JSON Object", "A collection of name-value pairs inside braces."],
              ["JSON Array", "An ordered list of values inside square brackets."],
              ["JSON Property", "A name and value pair inside a JSON object."],
              ["JSON String", "A text value enclosed in double quotes."],
              ["JSON Serialization", "Converting a data structure into JSON text."],
              ["Data Mapping", "Matching source fields to output structure."],
              ["Tabular Data", "Data organized in rows and columns."],
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
              <a href="https://datatracker.ietf.org/doc/rfc4180/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                RFC 4180: Common Format and MIME Type for CSV Files
              </a>
            </li>
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
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: JSON.stringify
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This tool converts CSV data according to its implemented parsing
          and JSON serialization methods. Results depend on the input structure, comma delimiter,
          headers, quoting, trim setting, and output mode. Different CSV parsers can interpret edge
          cases differently, and valid JSON does not guarantee that the data matches a specific
          application schema. Verify generated JSON before using it in production or important data
          workflows.
        </InfoBox>
      </section>
    </main>
  )
}
