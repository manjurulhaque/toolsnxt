import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { Base64EncoderDecoderTool } from "./base64-encoder-decoder-tool"

const pagePath = "/base64-encoder-decoder"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Base64 Encoder Decoder | Encode and Decode Base64 Online"
const pageDescription =
  "Encode text to Base64, decode Base64 to text, convert files to Base64, create Data URL output, copy results, and download decoded bytes in your browser."

const faqs = [
  {
    question: "What is Base64?",
    answer:
      "Base64 is a binary-to-text encoding that represents bytes using a limited set of printable characters.",
  },
  {
    question: "Why is Base64 used?",
    answer:
      "It helps binary or Unicode-derived byte data travel through text-oriented systems such as JSON, XML, email, APIs, and data URLs.",
  },
  {
    question: "Is Base64 encryption?",
    answer:
      "No. Base64 is encoding, not encryption. Anyone with the encoded text can decode it.",
  },
  {
    question: "Is Base64 reversible?",
    answer:
      "Yes, valid Base64 can be decoded back to the original bytes. Text decoding depends on the expected character encoding.",
  },
  {
    question: "What is Base64 padding?",
    answer:
      "Padding uses equals signs at the end of some Base64 strings so the encoded length aligns with Base64 grouping rules.",
  },
  {
    question: "What is URL-safe Base64?",
    answer:
      "URL-safe Base64 is a variant from RFC 4648 that replaces plus and slash with URL-friendly characters. This page does not provide a separate URL-safe mode.",
  },
  {
    question: "Does this tool support Unicode?",
    answer:
      "Yes. Text encoding uses TextEncoder to convert input text to UTF-8 bytes before Base64 encoding, and TextDecoder for decoded text output.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes. It uses standard browser text fields, file input, and download behavior, so support depends on the mobile browser.",
  },
  {
    question: "Is my data uploaded?",
    answer:
      "The tool runs in your browser and does not intentionally upload text or selected files for conversion.",
  },
  {
    question: "Can I encode files?",
    answer:
      "Yes. Choose one file to convert its bytes into Base64 text.",
  },
  {
    question: "Can I download decoded data?",
    answer:
      "Yes. In Decode mode, the Download Decoded Bytes button saves decoded bytes when the input is valid Base64.",
  },
  {
    question: "Why is my output larger?",
    answer:
      "Base64 represents every three bytes as four encoded characters, so encoded data is commonly about one-third larger than the source bytes.",
  },
  {
    question: "Why will my Base64 not decode?",
    answer:
      "The input may contain invalid characters, missing or incorrect padding, the wrong variant, or data that is not valid text after decoding.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. This is a free browser-based Base64 encoder and decoder.",
  },
  {
    question: "Does it work offline?",
    answer:
      "After the page is loaded, the conversion code runs in the browser. Offline availability depends on how the site is cached by your browser.",
  },
  {
    question: "Can Base64 contain emojis?",
    answer:
      "Base64 output itself uses ASCII characters. Emojis in input text are encoded to UTF-8 bytes before being represented as Base64.",
  },
  {
    question: "Is Base64 secure?",
    answer:
      "Base64 does not provide confidentiality. Use encryption and proper key management when sensitive information must be protected.",
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
    about: ["Base64 Encoder Decoder", "Base64 Encoder", "Base64 Decoder", "Base64 Converter"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Base64 Encoder / Decoder",
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
    name: "Base64 Encoder / Decoder",
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
        name: "Base64 Encoder / Decoder",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to encode and decode Base64 online",
    description: "Convert text or files with the browser-based Base64 Encoder / Decoder.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose mode",
        text: "Select Encode or Decode.",
      },
      {
        "@type": "HowToStep",
        name: "Enter input",
        text: "Paste text, paste Base64, or choose a file for Base64 file encoding.",
      },
      {
        "@type": "HowToStep",
        name: "Select output format",
        text: "In Encode mode, choose Plain or Data URL output.",
      },
      {
        "@type": "HowToStep",
        name: "Review result",
        text: "Check the generated output and character, line, and byte counts.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download",
        text: "Copy the result, swap it back into the input, clear the workspace, or download decoded bytes in Decode mode.",
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

export default function Base64EncoderDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
          <Base64EncoderDecoderTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is Base64?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Base64 is a binary-to-text encoding scheme used to represent bytes with printable
                ASCII characters. It exists because many systems are built around text transport,
                including APIs, email, JSON, XML, web forms, configuration files, authentication
                debugging, and data URLs.
              </p>
              <p>
                Encoding is not encryption. Base64 improves interoperability by making data easier
                to move through text-only channels, but encoded data can be decoded by anyone who
                has the string. Use real encryption when confidentiality matters.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How Base64 Encoding Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Choose mode", "Encode turns text or file bytes into Base64; Decode turns valid Base64 back into text."],
                ["Text input", "Type or paste text and the result updates from the implemented transform."],
                ["UTF-8 text", "Text is converted with TextEncoder before encoding and TextDecoder after decoding."],
                ["File input", "Choose one file and FileReader converts it through a Data URL before the Base64 payload is used."],
                ["Output format", "Encode mode supports Plain Base64 or a data:<type>;base64,... Data URL."],
                ["Actions", "Copy Result, Swap, Clear, Load Sample, and Download Decoded Bytes are available."],
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
                ["Base64 encoding", "Encode typed or pasted text into Base64."],
                ["Base64 decoding", "Decode valid Base64 into text."],
                ["Unicode input", "Encode Unicode text through UTF-8 bytes."],
                ["File to Base64", "Convert one selected file into Base64 text."],
                ["Data URL output", "Create a Base64 Data URL with the selected file type or text/plain."],
                ["Decoded-byte download", "Download decoded bytes from Decode mode."],
                ["Copy and swap", "Copy output or move the current result back to the input."],
                ["Input stats", "Show input characters, lines, and bytes."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Encoding Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Standard Base64", "The browser btoa and atob APIs are used on byte strings after the implemented cleanup and UTF-8 conversion steps."],
                ["Whitespace cleanup", "Decode mode removes whitespace from the input before calling the browser decoder."],
                ["Data URL handling", "A leading data: URL header is removed before Base64 decoding."],
                ["Validation", "Invalid Base64 produces the implemented error message instead of decoded text."],
                ["No URL-safe mode", "The page does not replace URL-safe characters or expose a separate Base64URL option."],
                ["File behavior", "File encoding uses the browser FileReader Data URL result and keeps only the Base64 payload."],
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
                ["API request", "Encode a short UTF-8 value before placing it in a test JSON payload."],
                ["Debug token content", "Decode a standard Base64 string when inspecting development data."],
                ["Data URL", "Convert a small file into a Base64 Data URL for browser testing."],
                ["Configuration value", "Encode or decode configuration strings during integration work."],
                ["Development testing", "Check whether a Base64 string decodes to readable UTF-8 text."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use Base64 Encoder / Decoder" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select Encode or Decode.</li>
              <li>Paste text or Base64 into the input, or choose a file for file-to-Base64 conversion.</li>
              <li>In Encode mode, choose Plain or Data URL output.</li>
              <li>Review the transformed result and the character, line, and byte counts.</li>
              <li>Use Copy Result, Swap, Clear, Load Sample, or Download Decoded Bytes when available.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding Base64" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Base64 represents binary data with a 64-character alphabet. The standard alphabet
                uses uppercase letters, lowercase letters, digits, plus, and slash. Equals signs are
                used as padding in standard Base64 when the input byte length does not divide
                evenly into Base64 groups.
              </p>
              <p>
                JavaScript strings are not raw bytes, so this tool converts text to UTF-8 bytes
                before encoding. Decoding reverses the Base64 bytes through UTF-8 text decoding for
                display. Base64 usually makes data about 33% larger because three input bytes are
                represented by four encoded characters.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Security" title="Security Considerations" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Not encryption", "Base64 is reversible encoding and should not be used alone to hide secrets."],
                ["Sensitive data", "Encrypt confidential information before encoding it for transport or storage."],
                ["Debug carefully", "Tokens, keys, and credentials may still be sensitive after Base64 encoding."],
                ["Variant mismatch", "Some systems require URL-safe Base64, which this page does not generate as a separate option."],
                ["Invalid input", "Incorrect padding, characters, or copied whitespace can prevent successful decoding."],
                ["Local processing", "Conversion runs in the browser, but you remain responsible for how you handle input and output."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["REST APIs", "Prepare or inspect Base64 text in test requests and responses."],
                ["JSON and XML", "Represent byte-oriented values inside text document formats."],
                ["Email and MIME", "Understand Base64 used for text-safe attachment transport."],
                ["Data URLs", "Embed small file data in browser-compatible URL strings."],
                ["JWT debugging", "Pair this with a JWT tool when inspecting encoded token segments."],
                ["Software debugging", "Check logs, configuration values, and encoded fixtures during development."],
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
                  <li>Convert text instantly between UTF-8 and Base64.</li>
                  <li>Use Base64 in text-based protocols, APIs, JSON, XML, and debugging workflows.</li>
                  <li>Create plain Base64 or Data URL output in Encode mode.</li>
                  <li>Work in the browser without installing a separate utility.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Base64 is not encryption or compression.</li>
                  <li>Encoded data is usually larger than the original bytes.</li>
                  <li>URL-safe Base64 is not exposed as a separate mode.</li>
                  <li>Large files may require more browser memory and processing time.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Confirm whether your system expects standard Base64, a Data URL, or URL-safe Base64.</li>
                  <li>Use UTF-8 consistently when exchanging text across systems.</li>
                  <li>Keep original data backed up before decoding or downloading bytes.</li>
                  <li>Encrypt sensitive information before Base64 encoding when confidentiality is required.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Confusing Base64 encoding with encryption.</li>
                  <li>Using URL-safe Base64 where standard Base64 is expected, or the reverse.</li>
                  <li>Encoding data that was already Base64 encoded.</li>
                  <li>Forgetting that padding may be required by some decoders.</li>
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
                ["URL Encoder / Decoder", "/url-encoder-decoder"],
                ["JSON Formatter", "/json-formatter"],
                ["JWT Decoder", "/jwt-decoder"],
                ["Hash Generator", "/hash-generator"],
                ["QR Code Generator", "/qr-code-generator"],
                ["Text Diff Checker", "/text-diff-checker"],
                ["Case Converter", "/case-converter"],
                ["Regex Tester", "/regex-tester"],
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
            <PanelHeader eyebrow="Glossary" title="Base64 Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Base64", "A binary-to-text encoding that represents bytes with 64 printable characters."],
                ["Binary", "Data represented as bytes rather than readable text."],
                ["ASCII", "A character set commonly associated with basic English letters, digits, and symbols."],
                ["UTF-8", "A Unicode encoding used for text interchange and by this tool before Base64 text encoding."],
                ["Unicode", "A standard for representing text from many writing systems."],
                ["Encoding", "Transforming data into another representation for transport or storage."],
                ["Decoding", "Reversing an encoded representation back into bytes or text."],
                ["URL-safe Base64", "A Base64 variant using URL- and filename-friendly characters."],
                ["Padding", "Equals signs added to some Base64 strings to complete the final encoded group."],
                ["Data URL", "A URL that embeds data directly, often including a media type and Base64 payload."],
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
                  href="https://www.rfc-editor.org/info/rfc4648/"
                  rel="noreferrer"
                >
                  RFC 4648. The Base16, Base32, and Base64 Data Encodings.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/docs/Web/API/Window/btoa"
                  rel="noreferrer"
                >
                  MDN. Window btoa method and Base64 encoding.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Window/atob"
                  rel="noreferrer"
                >
                  MDN. Window atob method.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://encoding.spec.whatwg.org/"
                  rel="noreferrer"
                >
                  WHATWG. Encoding Standard.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL"
                  rel="noreferrer"
                >
                  MDN. FileReader readAsDataURL.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This Base64 Encoder / Decoder performs Base64 encoding and decoding using the
              implemented browser-based logic. Base64 is a binary-to-text encoding scheme, not
              encryption or compression. Results are intended for educational, development,
              debugging, and interoperability purposes. Sensitive information should be protected
              with appropriate encryption and access controls before it is Base64 encoded or shared.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
