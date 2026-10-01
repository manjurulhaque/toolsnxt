import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { UuidGeneratorTool } from "./uuid-generator-tool"

const pagePath = "/uuid-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "UUID Generator | Free Online UUID v4 Generator"
const pageDescription =
  "Generate UUID v4 identifiers online with browser Web Crypto randomness. Create 1 to 500 UUIDs, uppercase output, remove hyphens, copy results, or download uuids.txt."

const faqs = [
  {
    question: "What is a UUID?",
    answer:
      "A UUID is a Universally Unique Identifier, a standardized 128-bit identifier commonly written as hexadecimal characters with hyphens.",
  },
  {
    question: "What does UUID stand for?",
    answer: "UUID stands for Universally Unique Identifier.",
  },
  {
    question: "What is a UUID Generator?",
    answer:
      "A UUID Generator creates identifiers using a specific UUID version and generation method. This page generates UUID v4 values.",
  },
  {
    question: "What is UUID v4?",
    answer:
      "UUID v4 is the randomly or pseudorandomly generated UUID version defined by the UUID specification.",
  },
  {
    question: "Does this tool support UUID v7?",
    answer:
      "No. This implementation supports UUID v4 generation only.",
  },
  {
    question: "Is a UUID the same as a GUID?",
    answer:
      "In many software contexts, GUID and UUID refer to the same general 128-bit identifier concept, though terminology and platform behavior can differ.",
  },
  {
    question: "Are UUIDs guaranteed to be unique?",
    answer:
      "No. Random UUID uniqueness is probabilistic. With appropriate generation, collisions are designed to be extremely unlikely, not impossible.",
  },
  {
    question: "Can two UUIDs be the same?",
    answer:
      "Yes, a collision is possible in theory. Expected collision probability depends on the UUID version, randomness quality, and number generated.",
  },
  {
    question: "Does the generator use cryptographically secure randomness?",
    answer:
      "Yes. The implementation calls crypto.randomUUID(), which MDN describes as generating v4 UUIDs with a cryptographically secure random number generator.",
  },
  {
    question: "Can I use a UUID as a password or API key?",
    answer:
      "No. UUIDs are identifiers, not passwords, authentication tokens, API keys, or secrets by default.",
  },
  {
    question: "Can I generate multiple UUIDs at once?",
    answer:
      "Yes. Enter a quantity from 1 to 500 and generate newline-separated UUIDs.",
  },
  {
    question: "Can I validate a UUID?",
    answer:
      "No. This page generates UUIDs but does not include a UUID validation input.",
  },
  {
    question: "Can I copy generated UUIDs?",
    answer: "Yes. Use the Copy button to copy the generated UUID list.",
  },
  {
    question: "Can I download generated UUIDs?",
    answer: "Yes. Use Download to save the generated UUID list as uuids.txt.",
  },
  {
    question: "Can I remove hyphens or use uppercase?",
    answer:
      "Yes. The page includes options for uppercase letters and removing hyphens from the displayed UUID strings.",
  },
  {
    question: "Is the UUID Generator free?",
    answer: "Yes. This is a free browser-based UUID v4 generator.",
  },
  {
    question: "Does the UUID Generator work on mobile devices?",
    answer:
      "Yes, when the browser supports the required Web Crypto API behavior used by crypto.randomUUID().",
  },
  {
    question: "Are generated UUIDs stored on a server?",
    answer:
      "Generation runs in your browser and this tool does not intentionally upload or store generated UUIDs.",
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
    about: ["UUID Generator", "UUID v4 Generator", "GUID Generator", "Random UUID"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UUID Generator",
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
      "UUID v4 generation",
      "Browser crypto.randomUUID generation",
      "Bulk generation from 1 to 500 UUIDs",
      "Uppercase output option",
      "Remove hyphens option",
      "Copy generated UUIDs",
      "Download uuids.txt",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UUID Generator",
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
      { "@type": "ListItem", position: 2, name: "UUID Generator", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate UUID v4 identifiers",
    description: "Generate one or more UUID v4 values with the available quantity and formatting options.",
    step: [
      { "@type": "HowToStep", name: "Choose quantity", text: "Enter a quantity from 1 to 500." },
      { "@type": "HowToStep", name: "Choose formatting", text: "Optionally enable uppercase letters or remove hyphens." },
      { "@type": "HowToStep", name: "Generate UUIDs", text: "Use Generate UUIDs to create a new UUID v4 list." },
      { "@type": "HowToStep", name: "Copy or download", text: "Copy the generated identifiers or download them as uuids.txt." },
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

export default function UuidGeneratorPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-12">
        <UuidGeneratorTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a UUID?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              UUID stands for Universally Unique Identifier. A UUID is a standardized 128-bit
              identifier commonly displayed as hexadecimal characters separated by hyphens.
              Developers use UUIDs for API resources, database records, distributed systems, test
              fixtures, request IDs, and other cases where independently generated identifiers are
              useful.
            </p>
            <p>
              This UUID Generator creates UUID v4 values with the browser&apos;s crypto.randomUUID()
              method. It can generate between 1 and 500 identifiers at a time, preserve canonical
              hyphenated lowercase output, or reformat the displayed strings as uppercase or
              hyphen-free values.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Format" title="UUID Format Explained" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The common canonical UUID representation follows the pattern
              xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx. The M position indicates the UUID version. For
              UUID v4, that version digit is 4. The N position indicates the RFC-compatible variant
              family and is commonly one of 8, 9, a, or b in lowercase output.
            </p>
            <p>
              This page can remove hyphens or uppercase the displayed text, but those options are
              presentation changes. The generated source UUIDs come from UUID v4 output produced by
              the browser API.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Versions" title="Supported UUID Versions" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
              <h3 className="font-semibold">UUID v4</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Supported. UUID v4 is the randomly or pseudorandomly generated UUID version defined
                by the UUID specification. This implementation uses crypto.randomUUID().
              </p>
            </div>
            <div className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
              <h3 className="font-semibold">Other UUID versions</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                UUID v1, v3, v5, v6, v7, v8, nil UUIDs, namespace inputs, name inputs, and timestamp
                controls are not implemented on this page.
              </p>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How UUID Generation Works" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Enter a quantity from 1 to 500.</li>
            <li>Choose whether the displayed UUIDs should use uppercase letters.</li>
            <li>Choose whether to remove hyphens from the displayed UUID strings.</li>
            <li>Use Generate UUIDs to create a new newline-separated UUID v4 list.</li>
            <li>Copy the list or download it as uuids.txt.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Randomness" title="Randomness, Uniqueness, and Collisions" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The page calls crypto.randomUUID(), which MDN documents as generating v4 UUIDs with a
              cryptographically secure random number generator. Random UUID uniqueness is still
              probabilistic: collisions are designed to be extremely unlikely when generation is
              correct, but not mathematically impossible.
            </p>
            <p>
              A UUID is an identifier, not encryption and not a secret. Do not treat generated UUIDs
              as passwords, API keys, authentication tokens, or authorization proof simply because
              they are hard to guess.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Terminology" title="UUID vs GUID and Variant" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              UUID is the term used by the IETF specifications. GUID is historically associated with
              Microsoft ecosystems, and many practical tools use UUID and GUID to refer to the same
              general 128-bit identifier concept.
            </p>
            <p>
              UUID version and UUID variant are different concepts. The version identifies the
              generation layout, such as v4 random UUIDs. The variant identifies the broader layout
              family used to interpret the UUID bits.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common UUID Generator Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Database IDs", "Generate identifiers for records when the application architecture benefits from non-sequential IDs."],
              ["API resources", "Assign identifiers to resources returned or accepted by APIs."],
              ["Distributed systems", "Create identifiers independently before data is merged across systems."],
              ["Development and testing", "Generate UUIDs for fixtures, mock records, or sample payloads."],
              ["Correlation IDs", "Use identifiers to connect related logs, events, or requests where appropriate."],
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
              <li>Generates UUID v4 identifiers without manual numbering.</li>
              <li>Supports bulk generation from 1 to 500 UUIDs.</li>
              <li>Provides uppercase and hyphen-free display options.</li>
              <li>Includes copy and download actions for quick reuse.</li>
              <li>Useful for development, testing, APIs, and distributed workflows.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Only UUID v4 generation is implemented.</li>
              <li>UUID validation and duplicate detection are not implemented.</li>
              <li>Random UUID uniqueness is probabilistic rather than absolutely guaranteed.</li>
              <li>UUIDs are larger and less human-readable than many integer IDs.</li>
              <li>UUIDs should not be used as secrets or credentials by default.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use UUID v4 when random identifiers fit the application requirements.</li>
              <li>Keep hyphenated canonical form when systems expect standard UUID strings.</li>
              <li>Validate UUIDs separately when accepting identifiers from external systems.</li>
              <li>Consider database indexing and storage implications for large UUID datasets.</li>
              <li>Do not use UUIDs as passwords, API keys, or bearer tokens.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Assuming UUIDs are guaranteed unique forever.</li>
              <li>Confusing UUID version with UUID variant.</li>
              <li>Assuming every UUID version is random.</li>
              <li>Using unsupported UUID versions on this page.</li>
              <li>Assuming uppercase and lowercase UUID strings identify different values.</li>
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
              ["Password Generator", "/password-generator"],
              ["Hash Generator", "/hash-generator"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
              ["JSON Formatter", "/json-formatter"],
              ["Random Number Generator", "/random-number-generator"],
              ["Timestamp Converter", "/timestamp-converter"],
              ["QR Code Generator", "/qr-code-generator"],
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
              ["UUID", "Universally Unique Identifier, a standardized 128-bit identifier."],
              ["GUID", "A related identifier term commonly used in Microsoft ecosystems."],
              ["UUID Version", "A field that identifies the UUID generation layout, such as v4."],
              ["UUID Variant", "A field that identifies the UUID layout family."],
              ["UUID v4", "The random or pseudorandom UUID version supported by this page."],
              ["Random UUID", "A UUID generated from random or pseudorandom bits according to the version rules."],
              ["Cryptographically Secure Randomness", "Randomness suitable for cryptographic use when provided by the platform API."],
              ["Collision", "Two generated identifiers having the same value."],
              ["Identifier", "A value used to refer to a resource, object, event, or record."],
              ["Hexadecimal", "Base-16 notation using digits 0-9 and letters a-f."],
              ["Canonical UUID Representation", "The common hyphenated textual UUID form."],
              ["UUID Validation", "Checking whether a string matches expected UUID syntax and rules."],
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
              <a href="https://www.rfc-editor.org/info/rfc9562/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                RFC 9562: Universally Unique IDentifiers
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: Crypto.randomUUID()
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: Web Crypto API
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This tool generates UUID v4 identifiers according to its
          implemented browser-based generation and formatting methods. UUID uniqueness is not an
          absolute mathematical guarantee, and UUIDs should not automatically be treated as
          passwords, authentication credentials, API keys, or secrets. Review generated identifiers
          against the requirements of the application using them.
        </InfoBox>
      </section>
    </main>
  )
}
