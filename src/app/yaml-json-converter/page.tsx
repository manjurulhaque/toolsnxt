import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { YamlJsonConverterTool } from "./yaml-json-converter-tool"

const pagePath = "/yaml-json-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "YAML to JSON Converter | Convert YAML to JSON & JSON to YAML Online"
const pageDescription =
  "Convert YAML to JSON or JSON to YAML online in your browser. Pretty-print indentation, sort object keys, inspect token counts, and download results instantly with zero server uploads."

const faqs = [
  {
    question: "What is the difference between YAML and JSON?",
    answer:
      "JSON is a strict, minimalist data-interchange syntax derived from JavaScript object notation, requiring double quotes and braces. YAML is a human-friendly superset of JSON that uses significant whitespace indentation instead of braces, supports comments, anchors, and multiline strings, making it popular for human-edited configuration files.",
  },
  {
    question: "How does YAML to JSON conversion work?",
    answer:
      "The tool uses the js-yaml parser to read YAML text into an abstract JavaScript object hierarchy, then serializes the data structure into valid JSON using customizable indentation (2 spaces, 4 spaces, or compact tabs).",
  },
  {
    question: "Can I convert JSON back to YAML?",
    answer:
      "Yes. Switching the direction to 'JSON to YAML' parses standard JSON text and dumps it into clean, idiomatic YAML syntax with proper list hyphens and block indentation.",
  },
  {
    question: "Why does YAML disallow tab characters for indentation?",
    answer:
      "The YAML specification strictly prohibits tab characters for indentation because different text editors and terminal environments display tabs at varying column widths (e.g. 2, 4, or 8 spaces), which can alter the parsed hierarchical structure.",
  },
  {
    question: "What is the 'Norway problem' in YAML?",
    answer:
      "In YAML 1.1, unquoted 'NO' (the ISO country code for Norway), 'yes', 'on', and 'off' are automatically coerced into boolean false or true values. Modern YAML 1.2 parsers and safe schemas address this, but quoting strings like 'NO' or 'yes' remains a best practice.",
  },
  {
    question: "Can I sort object keys alphabetically during conversion?",
    answer:
      "Yes. Checking 'Sort keys' instructs the converter to recursively sort all dictionary and mapping keys alphabetically, which is ideal for comparing configuration diffs or normalizing Kubernetes manifests.",
  },
  {
    question: "Does YAML support comments, and are they preserved in JSON?",
    answer:
      "YAML natively supports comments using the '#' symbol. However, standard RFC 8259 JSON does not support comments, so comments are necessarily stripped when converting YAML to JSON.",
  },
  {
    question: "What are YAML anchors (&) and aliases (*)?",
    answer:
      "Anchors allow you to mark a node in YAML (&anchor_name) and reuse its exact structure elsewhere using an alias (*anchor_name). When converting to JSON, the parser resolves the reference and copies the referenced object into each alias location.",
  },
  {
    question: "Is my configuration data kept private?",
    answer:
      "Yes. All parsing, validation, and conversion occur 100% locally inside your browser using client-side JavaScript. No data is transmitted across the network or stored on any server.",
  },
  {
    question: "What is the difference between '|' and '>' in YAML multiline strings?",
    answer:
      "The pipe symbol (|) is the literal block scalar indicator that preserves newlines verbatim. The greater-than symbol (>) is the folded block scalar indicator that folds adjacent line breaks into single spaces, useful for long paragraphs.",
  },
  {
    question: "Can I download the converted result as a file?",
    answer:
      "Yes. Click the 'Download' button to instantly export the converted output as either a .json or .yaml file directly to your device.",
  },
  {
    question: "Can I convert complex Kubernetes manifests and Docker Compose files?",
    answer:
      "Yes. The converter handles nested mappings, sequences of objects, multiline strings, numbers, booleans, and null values common in Kubernetes deployments, Helm values, and Docker Compose services.",
  },
  {
    question: "Does this tool work offline?",
    answer:
      "Yes. Once loaded, the utility functions entirely offline as an installable Progressive Web App with zero external network dependencies.",
  },
  {
    question: "Is the YAML to JSON Converter free?",
    answer:
      "Yes. It is completely free with no signup requirements, no rate limits, and no watermarks.",
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
      "YAML to JSON",
      "JSON to YAML",
      "Configuration Converter",
      "Kubernetes YAML",
      "Docker Compose YAML",
      "OpenAPI Converter",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YAML to JSON Converter",
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
      "Bidirectional conversion (YAML to JSON & JSON to YAML)",
      "Customizable indentation (2 spaces, 4 spaces, tabs)",
      "Recursive object key sorting",
      "Syntax validation and descriptive error reporting",
      "File download (.json or .yaml)",
      "Instant copy to clipboard",
      "Real-time character, line, and byte counters",
      "100% private in-browser client execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YAML to JSON Converter",
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
        name: "YAML to JSON Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert YAML to JSON online",
    description: "Step-by-step instructions to convert YAML configuration files to JSON or vice versa.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose conversion direction",
        text: "Select 'YAML to JSON' or 'JSON to YAML' depending on your source data format.",
      },
      {
        "@type": "HowToStep",
        name: "Paste your input",
        text: "Paste your YAML or JSON markup into the input text area.",
      },
      {
        "@type": "HowToStep",
        name: "Configure formatting options",
        text: "Select your preferred indentation spacing and enable key sorting if desired.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download output",
        text: "Copy the validated result to your clipboard or download it directly as a formatted file.",
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

export default function YamlJsonConverterPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <YamlJsonConverterTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is YAML and Why Convert to JSON?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              <strong>YAML</strong> (YAML Ain&apos;t Markup Language) and <strong>JSON</strong> (JavaScript
              Object Notation) are the two most prominent structured data serialization formats in modern
              software development. While YAML prioritizes human readability through clean indentation,
              comments, and concise syntax, JSON is the universal interchange standard for web APIs,
              databases (like MongoDB and PostgreSQL jsonb), and browser runtimes.
            </p>
            <p>
              Developers frequently need to convert between both formats—such as transforming Kubernetes
              manifests or GitHub Actions workflows into programmatic JSON for API processing, or converting
              API payloads into clean YAML for documentation and configuration templates. This utility executes
              all parsing and serialization 100% locally in your browser.
            </p>
          </div>
        </ToolPanel>

        {/* Comparison Table */}
        <ToolPanel>
          <PanelHeader eyebrow="Comparison" title="YAML vs JSON: Feature Breakdown" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10 text-[var(--ink-900)]">
                  <th className="py-3 pr-4 font-semibold">Feature</th>
                  <th className="py-3 pr-4 font-semibold">YAML</th>
                  <th className="py-3 font-semibold">JSON</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["Syntax Style", "Indentation-based, clean whitespace", "Braces {}, brackets [], quotes"],
                  ["Comments", "Supported natively with #", "Not supported (RFC 8259)"],
                  ["Readability", "High (optimized for human editing)", "Moderate (optimized for machines)"],
                  ["Strictness", "Flexible (optional quotes, multi-types)", "Very strict (double quotes required)"],
                  ["Primary Uses", "Kubernetes, CI/CD, Docker Compose", "REST APIs, Web Services, Storage"],
                  ["Parsing Speed", "Moderate (complex grammar)", "Extremely fast (native browser parser)"],
                  ["Security Concerns", "Complex types can risk code execution", "Safe (pure data representation)"],
                ].map(([feature, yaml, json]) => (
                  <tr key={feature} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-semibold text-[var(--ink-900)]">{feature}</td>
                    <td className="py-3 pr-4">{yaml}</td>
                    <td className="py-3">{json}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Options" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Bidirectional Conversion",
                "Switch seamlessly between YAML to JSON and JSON to YAML with immediate syntax validation.",
              ],
              [
                "Configurable Indentation",
                "Format output with 2 spaces, 4 spaces, or compact tabs to fit your engineering team's style guide.",
              ],
              [
                "Recursive Key Sorting",
                "Organize dictionary keys alphabetically at all nesting depths to create clean, easily diffed files.",
              ],
              [
                "Direct File Export",
                "Download converted results immediately as properly formatted .json or .yaml files.",
              ],
              [
                "Detailed Syntax Error Catching",
                "Pinpoint parsing errors with exact line and column numbers to debug broken manifests rapidly.",
              ],
              [
                "Comprehensive Live Stats",
                "Inspect total character counts, line counts, and byte sizes for both source and converted output.",
              ],
              [
                "Sample Data Loaders",
                "Quickly test capabilities with pre-loaded configuration snippets for immediate evaluation.",
              ],
              [
                "Zero Server Uploads",
                "Sensitive cloud credentials, API tokens, and private server configs never leave your browser.",
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
          <PanelHeader eyebrow="Method" title="How the Parsing Engine Works" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The conversion is powered by the industry-standard <code>js-yaml</code> parsing library.
              When converting from YAML to JSON, the parser constructs an in-memory Abstract Syntax Tree
              (AST), resolving references, anchors, and multiline scalars into native JavaScript primitives
              (Objects, Arrays, Strings, Numbers, Booleans, and Null).
            </p>
            <p>
              If key sorting is enabled, an object traversal normalizes mapping order. Finally,
              <code>JSON.stringify()</code> serializes the structured data with the selected indentation level.
              In reverse mode, native <code>JSON.parse()</code> ingests the JSON payload, which is then serialized
              into YAML using <code>js-yaml.dump()</code> with strict indentation control.
            </p>
          </div>
        </ToolPanel>

        {/* Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="Step-by-Step Conversion Guide" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Choose conversion direction:</strong> Use the toggle button to switch between
              <em>YAML to JSON</em> or <em>JSON to YAML</em>.
            </li>
            <li>
              <strong>Paste source content:</strong> Enter your YAML or JSON into the left-hand workspace.
            </li>
            <li>
              <strong>Adjust formatting:</strong> Select 2 spaces, 4 spaces, or tabs, and toggle
              <em>Sort keys</em> if you want consistent alphabetical ordering.
            </li>
            <li>
              <strong>Verify conversion:</strong> Review the live converted output and confirm there are no syntax errors.
            </li>
            <li>
              <strong>Copy or export:</strong> Click <em>Copy Output</em> to clipboard or <em>Download</em> to save the file.
            </li>
          </ol>
        </ToolPanel>

        {/* Use Cases */}
        <ToolPanel>
          <PanelHeader eyebrow="Scenarios" title="Common Real-World Use Cases" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Kubernetes & Helm Deployments",
                "Convert complex Helm values.yaml or Kubernetes pod definitions into JSON for programmatic Kubernetes API calls.",
              ],
              [
                "CI/CD Pipeline Configurations",
                "Inspect, validate, and convert GitHub Actions or GitLab CI configuration files into testable JSON fixtures.",
              ],
              [
                "OpenAPI / Swagger API Specifications",
                "Switch OpenAPI 3.0 document definitions freely between YAML and JSON format for documentation generators.",
              ],
              [
                "Docker Compose Configurations",
                "Translate docker-compose.yml files into JSON for cloud orchestrators and infrastructure-as-code automation.",
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
            <PanelHeader eyebrow="Advantages" title="Benefits of This Converter" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Instant real-time conversion without page reloads.</li>
              <li>Eliminates human error when migrating configuration templates.</li>
              <li>100% confidential: data never touches third-party cloud servers.</li>
              <li>Supports sorting keys to easily compare Git revision diffs.</li>
              <li>Catches subtle indentation bugs with detailed line error messages.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>YAML comments cannot be preserved when converting to standard JSON.</li>
              <li>Custom language tags (e.g. !custom_tag) are parsed as plain strings or skipped.</li>
              <li>Massive files (&gt;20MB) may experience brief browser calculation latency.</li>
              <li>Duplicate keys in YAML mappings will take the last declared value in standard mode.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for YAML & JSON" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Always use 2 spaces for YAML indentation and never press the Tab key.</li>
              <li>Always quote strings that resemble booleans, numbers, or dates (e.g. &quot;true&quot;, &quot;123&quot;).</li>
              <li>Use the pipe character (<code>|</code>) for multi-line scripts to preserve line breaks.</li>
              <li>Keep JSON property names in strict double quotes (single quotes cause syntax errors).</li>
              <li>Utilize key sorting when generating configuration files for Git repositories.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Pitfalls to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Mixing spaces and tabs in YAML, which causes fatal parsing errors.</li>
              <li>Leaving trailing commas in JSON objects or arrays (illegal in standard JSON).</li>
              <li>Assuming YAML comments will survive a round-trip conversion through JSON.</li>
              <li>Forgetting that country codes like <code>NO</code> or <code>OFF</code> can evaluate to false.</li>
              <li>Using unquoted colons inside YAML values without a following space.</li>
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
          <PanelHeader eyebrow="More Tools" title="Related Developer Utilities" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["JSON Formatter", "/json-formatter"],
              ["JSON to TypeScript", "/json-to-typescript"],
              ["CSV to JSON Converter", "/csv-to-json"],
              ["Text Diff Checker", "/text-diff-checker"],
              ["HTML, CSS & JS Minifier", "/html-css-js-minifier"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
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
          <PanelHeader eyebrow="Terms" title="YAML & JSON Terminology Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Mapping", "A collection of key-value pairs (equivalent to an Object in JSON)."],
              ["Sequence", "An ordered list of items denoted by hyphens (equivalent to an Array in JSON)."],
              ["Scalar", "A single, indivisible datum such as a string, integer, float, or boolean."],
              ["Anchor (&)", "A YAML marker used to identify a node for reuse throughout the document."],
              ["Alias (*)", "A YAML reference that pulls in the data defined by a preceding anchor."],
              ["Literal Block (|)", "A multiline scalar style that preserves newlines and indentation."],
              ["Folded Block (>)", "A multiline scalar style that folds line breaks into single spaces."],
              ["Significant Whitespace", "The syntactic rule that indentation levels define hierarchical scope."],
              ["AST", "Abstract Syntax Tree, the in-memory tree representation of parsed data."],
              ["Serialization", "The process of translating in-memory objects into a text format."],
              ["RFC 8259", "The official standard specification for JavaScript Object Notation."],
              ["YAML 1.2", "The current specification of YAML, designed for closer JSON compatibility."],
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
          <PanelHeader eyebrow="Sources" title="Official Standards & Specifications" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <a
                href="https://yaml.org/spec/1.2.2/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                YAML 1.2.2 Specification (yaml.org)
              </a>
            </li>
            <li>
              <a
                href="https://www.rfc-editor.org/rfc/rfc8259"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                IETF RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nodeca/js-yaml"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                js-yaml: JavaScript YAML parser and dumper
              </a>
            </li>
            <li>
              <a
                href="https://json-schema.org/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                JSON Schema Standard
              </a>
            </li>
          </ul>
        </ToolPanel>

                <EducationalDisclaimerCard type="technical">
          <p>
            This conversion utility processes YAML and JSON according to standard
            specification rules using client-side JavaScript. While output is syntactically validated, it does
            not validate target schema rules (such as Kubernetes CustomResourceDefinitions or specific JSON Schemas).
            Always test generated configurations in staging environments before applying to production infrastructure.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
