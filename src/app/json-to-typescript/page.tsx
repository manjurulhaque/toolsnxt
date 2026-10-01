import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { JsonToTypeScriptTool } from "./json-to-typescript-tool"

const pagePath = "/json-to-typescript"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "JSON to TypeScript Converter | Generate TypeScript Types"
const pageDescription =
  "Convert JSON to TypeScript online. Generate exported interfaces or type aliases from pasted JSON with nested objects, arrays, null handling, readonly options, and copy support."

const faqs = [
  {
    question: "What is a JSON to TypeScript Converter?",
    answer:
      "It parses JSON and generates TypeScript declarations that describe the observed structure of the provided data.",
  },
  {
    question: "What is TypeScript?",
    answer:
      "TypeScript is a language built on JavaScript that adds static type checking and type syntax for development.",
  },
  {
    question: "What is JSON?",
    answer:
      "JSON is a text data format that represents objects, arrays, strings, numbers, booleans, and null.",
  },
  {
    question: "Can I convert JSON to TypeScript online?",
    answer:
      "Yes. Paste valid JSON into the input area and the generated TypeScript appears in the output panel.",
  },
  {
    question: "Can I convert a JSON object into a TypeScript interface?",
    answer:
      "Yes. Select interface mode to generate exported TypeScript interfaces for object-shaped JSON.",
  },
  {
    question: "Can I generate type aliases instead?",
    answer:
      "Yes. Select type mode to generate exported type aliases for generated object declarations.",
  },
  {
    question: "Does the converter support nested JSON?",
    answer:
      "Yes. Nested objects produce additional generated declarations using names derived from the parent type and property name.",
  },
  {
    question: "How are JSON arrays converted to TypeScript?",
    answer:
      "Arrays become itemType[] output. Empty arrays become unknown[], and mixed arrays can produce union array item types.",
  },
  {
    question: "How are JSON numbers converted?",
    answer: "JSON numbers are inferred as TypeScript number.",
  },
  {
    question: "How are JSON strings converted?",
    answer: "JSON strings are inferred as TypeScript string.",
  },
  {
    question: "How are boolean values converted?",
    answer: "JSON true and false values are inferred as TypeScript boolean.",
  },
  {
    question: "How is null handled?",
    answer:
      "Null values are inferred as null. Object properties whose value is null are also marked optional by this implementation.",
  },
  {
    question: "Does the converter generate optional properties?",
    answer:
      "Only properties with null values are marked optional. Missing properties across array objects are not separately analyzed.",
  },
  {
    question: "Does the converter generate union types?",
    answer:
      "Yes, when an array contains values that infer to different item types, the item type is written as a union.",
  },
  {
    question: "Can I customize the generated type name?",
    answer:
      "Yes. Use the Root type name field. The value is converted to a PascalCase-safe type name.",
  },
  {
    question: "Does the generated TypeScript provide runtime validation?",
    answer:
      "No. TypeScript declarations help during development, but they do not validate runtime JSON by themselves.",
  },
  {
    question: "Can I copy the generated TypeScript?",
    answer: "Yes. Use Copy Types to copy the current output to the clipboard.",
  },
  {
    question: "Can I download the generated TypeScript?",
    answer:
      "No. This implementation provides copy, clear, and sample controls, but no download button.",
  },
  {
    question: "Is my JSON data uploaded to a server?",
    answer:
      "The conversion runs in your browser and does not intentionally upload pasted JSON data.",
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
    about: ["JSON to TypeScript Converter", "TypeScript Interface Generator", "JSON Type Generator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON to TypeScript Converter",
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
      "JSON parsing",
      "TypeScript interface generation",
      "Type alias generation",
      "Nested type generation",
      "Array type generation",
      "Mixed-array union output",
      "Custom root type name",
      "Readonly property option",
      "Copy generated TypeScript",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSON to TypeScript Converter",
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
        name: "JSON to TypeScript Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert JSON to TypeScript",
    description: "Generate TypeScript declarations from pasted JSON with the available declaration, naming, and readonly options.",
    step: [
      {
        "@type": "HowToStep",
        name: "Paste JSON",
        text: "Enter or paste valid JSON into the JSON input area.",
      },
      {
        "@type": "HowToStep",
        name: "Choose declaration settings",
        text: "Set the root type name, choose interface or type output, and optionally enable readonly properties.",
      },
      {
        "@type": "HowToStep",
        name: "Review TypeScript",
        text: "Inspect the generated declarations, nested types, arrays, null values, and inferred primitives.",
      },
      {
        "@type": "HowToStep",
        name: "Copy the output",
        text: "Use Copy Types to copy the generated TypeScript to the clipboard.",
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

export default function JsonToTypeScriptPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <JsonToTypeScriptTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a JSON to TypeScript Converter?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A JSON to TypeScript Converter reads JSON data and generates TypeScript declarations
              that describe the observed structure. JSON is runtime data, while TypeScript types
              describe expected program shapes during development. Developers often use generated
              types as a starting point for API responses, mock data, front-end models, and
              JavaScript-to-TypeScript migration work.
            </p>
            <p>
              This converter parses pasted JSON, infers primitive values, arrays, nested objects,
              null values, and mixed-array item unions, then outputs exported interfaces or type
              aliases with an optional readonly modifier.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="JSON" title="Supported JSON Features" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Objects", "Object values generate named TypeScript interfaces or type aliases."],
              ["Arrays", "Arrays use itemType[] syntax. Empty arrays are inferred as unknown[]."],
              ["Nested objects", "Nested object declarations are generated with names derived from the parent type and property."],
              ["Nested arrays", "Array items are inferred recursively, including object and array item values."],
              ["Strings", "JSON strings map to TypeScript string."],
              ["Numbers", "JSON numbers map to TypeScript number."],
              ["Booleans", "JSON true and false map to TypeScript boolean."],
              ["Null", "Null maps to null, and null-valued object properties are marked optional by this implementation."],
              ["Mixed arrays", "Arrays with multiple inferred item types use union item types."],
              ["Empty objects", "Empty objects generate an index signature of [key: string]: unknown;."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Types" title="TypeScript Type Generation" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The converter can generate exported interface declarations or exported type aliases
              for object-shaped JSON. The root type name field is sanitized into a PascalCase type
              name. Property names that are not valid TypeScript identifiers are emitted as quoted
              property names.
            </p>
            <p>
              The readonly checkbox adds readonly before generated object properties. The tool does
              not generate JSON Schema, Zod schemas, runtime validators, classes, API clients,
              serializers, deserializers, or compiler-validated output.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How JSON to TypeScript Conversion Works" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Paste valid JSON into the input area.</li>
            <li>Choose the root type name used for the top-level declaration.</li>
            <li>Select interface or type alias output.</li>
            <li>Enable readonly properties if your generated declarations should include readonly.</li>
            <li>Review the generated TypeScript output and type count.</li>
            <li>Copy the declarations for use in your project.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Inference" title="Type Inference and Data Mapping" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Type generation is based on the JSON sample you provide. A string becomes string, a
              number becomes number, a boolean becomes boolean, null becomes null, an object becomes
              a named declaration, and an array becomes an array type inferred from its items.
            </p>
            <p>
              A single JSON sample cannot reveal every possible value an API may return. Optional
              fields, conditionally present fields, null values that may later hold another type,
              heterogeneous arrays, and business rules often require manual review after generation.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Example" title="JSON to TypeScript Example" />
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold">JSON input</h3>
              <pre className="mt-3 overflow-x-auto rounded-[1.1rem] bg-[var(--page-cream)] p-4 text-xs leading-6">
{`{
  "id": 123,
  "name": "Alice",
  "active": true,
  "tags": ["developer", "designer"]
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">Interface output with root name User</h3>
              <pre className="mt-3 overflow-x-auto rounded-[1.1rem] bg-[var(--page-cream)] p-4 text-xs leading-6">
{`export interface User {
  id: number;
  name: string;
  active: boolean;
  tags: string[];
}`}
              </pre>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Concepts" title="Understanding JSON and TypeScript Types" />
          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold">JSON</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                JSON is a data interchange format. It stores values such as objects, arrays,
                strings, numbers, booleans, and null at runtime.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">TypeScript</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                TypeScript adds type syntax and compile-time checking on top of JavaScript. Types
                help describe expected object, array, and primitive shapes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Declarations</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Interfaces and type aliases can name object-shaped structures. This page can output
                either style for generated object declarations.
              </p>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Comparison" title="JSON Types vs TypeScript Types" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10">
                  <th className="py-3 pr-4 font-semibold">Topic</th>
                  <th className="py-3 pr-4 font-semibold">JSON</th>
                  <th className="py-3 pr-4 font-semibold">TypeScript</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["Purpose", "Runtime data interchange", "Development-time type checking"],
                  ["Objects", "Name/value data", "Object types, interfaces, or type aliases"],
                  ["Arrays", "Ordered runtime values", "Array types such as string[]"],
                  ["Null", "A runtime value", "A type when represented in declarations"],
                  ["Validation", "Parsed as data", "Types do not validate runtime JSON by themselves"],
                  ["Schema", "Not JSON Schema", "Not a complete API contract by default"],
                ].map(([topic, json, ts]) => (
                  <tr key={topic} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-semibold text-[var(--ink-900)]">{topic}</td>
                    <td className="py-3 pr-4">{json}</td>
                    <td className="py-3 pr-4">{ts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common JSON to TypeScript Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["API responses", "Generate starting interfaces from sample REST API response JSON."],
              ["Front-end development", "Create declarations for JSON used in browser applications."],
              ["Documentation", "Turn sample response data into readable TypeScript structures."],
              ["TypeScript migration", "Create initial types while moving JavaScript code toward TypeScript."],
              ["Development fixtures", "Generate types for mock JSON data used during testing."],
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
              <li>Creates a quick starting point for TypeScript declarations.</li>
              <li>Reduces repetitive manual typing for sample JSON structures.</li>
              <li>Supports interface or type alias output from the same JSON input.</li>
              <li>Handles nested objects, arrays, readonly properties, and copied output.</li>
              <li>Runs in the browser using the page&apos;s current implementation.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Generated types are based only on the provided JSON sample.</li>
              <li>File upload, download, JSON Schema, and runtime validation are not implemented.</li>
              <li>Missing properties across array objects are not inferred as optional.</li>
              <li>Duplicate generated type names can replace earlier declarations.</li>
              <li>Business rules and full API contracts still require developer review.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use representative JSON samples with realistic fields and values.</li>
              <li>Include several array objects when the API can return varied records.</li>
              <li>Review null-valued fields and optional-property behavior carefully.</li>
              <li>Check generated names for nested objects and unusual property names.</li>
              <li>Run copied output through your project&apos;s TypeScript tooling before production use.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Providing invalid JSON rather than a valid JSON value.</li>
              <li>Assuming one sample contains every possible API field.</li>
              <li>Treating null as the same thing as an absent property.</li>
              <li>Assuming generated declarations perform runtime validation.</li>
              <li>Confusing JSON data with JSON Schema or TypeScript source code.</li>
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
              ["JSON", "JavaScript Object Notation, a text format for structured data."],
              ["TypeScript", "A language that adds static type checking to JavaScript."],
              ["Type", "A description of expected values in TypeScript."],
              ["Interface", "A named object-shaped TypeScript declaration."],
              ["Type Alias", "A named TypeScript type declaration."],
              ["Type Inference", "Deriving a type from observed values."],
              ["Primitive Type", "A basic type such as string, number, boolean, or null."],
              ["Array Type", "A TypeScript type for ordered values, such as string[]."],
              ["Union Type", "A type that allows more than one possible member type."],
              ["Optional Property", "A property marked with ? in TypeScript."],
              ["Readonly Property", "A property marked readonly in TypeScript."],
              ["Nested Object", "An object inside another object or array."],
              ["Property", "A named member of an object."],
              ["JSON Parsing", "Reading JSON text and turning it into runtime data."],
              ["Runtime Validation", "Checking actual data while code runs."],
              ["Compile-Time Checking", "TypeScript analysis performed during development or builds."],
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
              <a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                TypeScript Handbook: Everyday Types
              </a>
            </li>
            <li>
              <a href="https://www.typescriptlang.org/docs/handbook/2/objects.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                TypeScript Handbook: Object Types
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
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: JSON.parse
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This tool generates TypeScript according to its implemented JSON
          parsing and type-generation rules. Generated declarations are based on the provided JSON
          sample and may not represent every possible API response or business rule. Different
          tools may generate different valid TypeScript. Review and adapt generated types to your
          application&apos;s actual data contract, and remember that TypeScript declarations do not
          perform runtime validation of JSON data by themselves.
        </InfoBox>
      </section>
    </main>
  )
}
