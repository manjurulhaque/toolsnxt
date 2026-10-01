import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { UrlEncoderDecoderTool } from "./url-encoder-decoder-tool"

const pagePath = "/url-encoder-decoder"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "URL Encoder / Decoder | Encode, Decode URLs & URI Components Online"
const pageDescription =
  "Encode and decode URLs, URI components, query parameters, and Base64 text online in your browser. Inspect query parameters, count statistics, and copy formatted outputs instantly with zero server uploads."

const faqs = [
  {
    question: "What is URL encoding (percent-encoding)?",
    answer:
      "URL encoding converts reserved, unprintable, or non-ASCII characters in a web address into a percent sign followed by two hexadecimal digits (RFC 3986). This ensures URLs remain valid, interoperable, and transmissible across diverse network protocols and web servers.",
  },
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI is designed for complete URLs and leaves structural characters intact (such as :, /, ?, #, and &). encodeURIComponent encodes all reserved punctuation, making it suitable for individual query string values, path parameters, or form data so they don't break the enclosing URL structure.",
  },
  {
    question: "Why do spaces become %20 or + in URLs?",
    answer:
      "Under RFC 3986 percent-encoding, spaces are encoded as '%20'. In query strings adhering to the 'application/x-www-form-urlencoded' format historically used by HTML forms, spaces may also be replaced by a plus sign (+). Both represent the same space character when properly decoded.",
  },
  {
    question: "Which characters are considered 'reserved' in URLs?",
    answer:
      "RFC 3986 categorizes characters into unreserved (letters A-Z, a-z, digits 0-9, hyphen -, underscore _, period ., and tilde ~) and reserved characters (delimiters like :, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, and =). Reserved characters have structural meaning in URIs.",
  },
  {
    question: "Is this URL decoder safe for sensitive links and API tokens?",
    answer:
      "Yes. All parsing, encoding, and decoding occur 100% locally in your web browser using client-side JavaScript. Your text and query parameters are never transmitted across the network or saved to any external database.",
  },
  {
    question: "Can I decode Base64 strings with this tool?",
    answer:
      "Yes. The tool includes dedicated Base64 Encode and Base64 Decode modes supporting full UTF-8 text, making it easy to inspect Base64-encoded URL parameters, tokens, or configuration payloads.",
  },
  {
    question: "How does the query parameter inspector work?",
    answer:
      "When a URL containing a query string is entered, the tool identifies the '?' delimiter and uses the browser's native URLSearchParams API to parse and display all keys and values in an organized, copyable table.",
  },
  {
    question: "Does this tool support Unicode and emoji characters in URLs?",
    answer:
      "Yes. JavaScript's native encodeURIComponent converts characters to their UTF-8 byte representation first, then encodes each byte as %XX. For example, the emoji 🚀 is encoded as %F0%9F%9A%80.",
  },
  {
    question: "What happens if I double-encode a URL?",
    answer:
      "Double encoding occurs when an already percent-encoded string is encoded again. For instance, '%20' becomes '%2520' because the percent sign itself is encoded as %25. This frequently causes 404 or invalid parameter errors on web servers.",
  },
  {
    question: "Can I decode partial or malformed percent-encoded strings?",
    answer:
      "The tool uses standard decodeURIComponent wrapped in safe error handling. If a sequence is malformed (e.g., a percent sign followed by invalid hexadecimal characters like %ZZ), the tool displays a clear syntax error.",
  },
  {
    question: "Does URL encoding compress the data?",
    answer:
      "No. URL encoding increases payload size. Every encoded byte takes three ASCII characters (%XX) instead of one, meaning multi-byte Unicode characters can become up to 12 characters long.",
  },
  {
    question: "What is the maximum URL length supported by modern browsers?",
    answer:
      "While the HTTP specification doesn't impose a strict limit, modern browsers and servers generally support URLs up to 2,048 characters reliably. Excessively long URLs should be sent via HTTP POST requests instead.",
  },
  {
    question: "Does this tool work completely offline?",
    answer:
      "Yes. Once loaded, this Progressive Web App utility operates with zero internet dependency and functions seamlessly even when offline.",
  },
  {
    question: "Is the URL Encoder / Decoder free to use?",
    answer:
      "Yes. The tool is 100% free with no registration, no advertisements, and no rate limits.",
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
      "URL Encoder",
      "URL Decoder",
      "Percent Encoding",
      "URI Component",
      "Query Parameter Inspector",
      "Base64 URL",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "URL Encoder / Decoder",
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
      "URL component encoding (encodeURIComponent)",
      "Full URL encoding (encodeURI)",
      "URL decoding (decodeURIComponent)",
      "Base64 text encoding and decoding",
      "Interactive query parameter table inspector",
      "Character, line, and byte counter",
      "Instant copy to clipboard",
      "100% private in-browser execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "URL Encoder / Decoder",
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
        name: "URL Encoder / Decoder",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to encode or decode a URL online",
    description: "Step-by-step guide to percent-encoding web links or decoding query parameters.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select encoding mode",
        text: "Choose between Component Encode, Full URL Encode, Decode, Base64 Encode, or Base64 Decode.",
      },
      {
        "@type": "HowToStep",
        name: "Paste URL or text",
        text: "Input the text, link, or query string into the input workspace.",
      },
      {
        "@type": "HowToStep",
        name: "Inspect query parameters",
        text: "Review the automated query parameter breakdown if a query string is present.",
      },
      {
        "@type": "HowToStep",
        name: "Copy formatted output",
        text: "Click Copy Output to place the result on your clipboard for use in your application.",
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

export default function UrlEncoderDecoderPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <UrlEncoderDecoderTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is URL Encoding & Percent-Encoding?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Uniform Resource Identifiers (URIs) must adhere to a strict character set defined by
              Internet Standard <strong>RFC 3986</strong>. Characters outside the standard US-ASCII
              unreserved set—including spaces, non-English scripts, punctuation, and emojis—cannot
              be transmitted safely in a raw format without causing parsing ambiguity or transmission errors.
            </p>
            <p>
              <strong>URL Encoding</strong> (often called percent-encoding) replaces these characters with a
              percent sign (<code>%</code>) followed by two hexadecimal digits representing the character&apos;s
              byte value in UTF-8. This web utility runs entirely in your browser to give developers, SEO specialists,
              and QA engineers an immediate, private way to format, inspect, and debug URLs.
            </p>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Processing Modes" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Component Encoding (encodeURIComponent)",
                "Encodes every reserved delimiter, ensuring strings are safe for use as query parameter values.",
              ],
              [
                "Full URL Encoding (encodeURI)",
                "Encodes spaces and special characters while preserving protocol, domain, port, and path slashes.",
              ],
              [
                "Percent Decoding (decodeURIComponent)",
                "Converts %XX escape sequences back into readable UTF-8 strings, Unicode symbols, and plain text.",
              ],
              [
                "Query Parameter Inspector",
                "Automatically parses query strings into a clean key-value breakdown using URLSearchParams.",
              ],
              [
                "Base64 Encode & Decode",
                "Seamlessly convert URL payloads to and from standard Base64 format for token inspection.",
              ],
              [
                "Real-Time Statistics",
                "Live character counts, line counts, and total byte measurements for input and output.",
              ],
              [
                "One-Click Copy & Clear",
                "Quickly copy the processed output to your clipboard or reset the workspace with one click.",
              ],
              [
                "100% Client-Side Privacy",
                "No server requests or tracking. Sensitive API keys and internal URLs stay completely inside your browser.",
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

        {/* Technical Method */}
        <ToolPanel>
          <PanelHeader eyebrow="Specification" title="How URL Encoding Works Under RFC 3986" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Under RFC 3986, characters are classified into two main categories:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Unreserved Characters:</strong> Letters (<code>A-Z</code>, <code>a-z</code>), digits (<code>0-9</code>),
                hyphen (<code>-</code>), underscore (<code>_</code>), period (<code>.</code>), and tilde (<code>~</code>).
                These are never encoded.
              </li>
              <li>
                <strong>Reserved Characters:</strong> Structural characters such as <code>:</code>, <code>/</code>,
                <code>?</code>, <code>#</code>, <code>[</code>, <code>]</code>, <code>@</code>, <code>!</code>,
                <code>$</code>, <code>&amp;</code>, <code>&apos;</code>, <code>(</code>, <code>)</code>, <code>*</code>,
                <code>+</code>, <code>,</code>, <code>;</code>, and <code>=</code>. These act as delimiters for URL schemes,
                authority, path, query, and fragments.
              </li>
            </ul>
            <p>
              When a character is encoded, its UTF-8 representation (1 to 4 bytes) is converted into hexadecimal
              pairs preceded by <code>%</code>. For example, the space character (byte 0x20) becomes <code>%20</code>,
              and the copyright symbol © (bytes 0xC2 0xA9) becomes <code>%C2%A9</code>.
            </p>
          </div>
        </ToolPanel>

        {/* Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the URL Encoder & Decoder" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Choose your mode:</strong> Select <em>Component Encode</em> for query parameter values,
              <em>Full URL Encode</em> for entire web links, or <em>Decode</em> to read percent-encoded strings.
            </li>
            <li>
              <strong>Enter or paste your text:</strong> Paste the target URL, query string, or plain text into the input field.
            </li>
            <li>
              <strong>Inspect query parameters:</strong> If your URL contains a query string (after <code>?</code>), review
              the automatically parsed key-value table.
            </li>
            <li>
              <strong>Verify text stats:</strong> Observe the character, line, and byte counter to ensure your link stays within
              target length limits.
            </li>
            <li>
              <strong>Copy the result:</strong> Click <em>Copy Output</em> to place the processed URL directly onto your clipboard.
            </li>
          </ol>
        </ToolPanel>

        {/* Common Scenarios */}
        <ToolPanel>
          <PanelHeader eyebrow="Applications" title="Common Developer & SEO Scenarios" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Constructing API Query Parameters",
                "Ensuring search queries with spaces, ampersands (&), or foreign language characters don't split API requests prematurely.",
              ],
              [
                "Redirect & Callback URLs (OAuth / SSO)",
                "Encoding return URLs like redirect_uri=https%3A%2F%2Fapp.com%2Fcallback inside authentication flows.",
              ],
              [
                "Debugging Web Server Logs & Access Logs",
                "Decoding confusing access log entries like %2Fapi%2Fv1%2Fusers%3Fname%3DJohn%2BJack into human-readable text.",
              ],
              [
                "Social Sharing & Web Intent Links",
                "Generating pre-filled text and title parameters for WhatsApp, Twitter/X, LinkedIn, or Email sharing links.",
              ],
              [
                "Tracking & UTM Campaign Parameters",
                "Safely embedding tracking codes, campaign names, and UTM tags containing special punctuation into links.",
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

        {/* Benefits vs Limitations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits of URL Encoding" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Guarantees cross-browser and server compatibility for complex URLs.</li>
              <li>Prevents query parameters from being misinterpreted as URL delimiters.</li>
              <li>Supports all international UTF-8 characters and emojis safely.</li>
              <li>Standardizes form data transmission across the web.</li>
              <li>Reduces 400 Bad Request errors caused by illegal URL characters.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Increases character count, which can exceed older 2,048-character URL limits.</li>
              <li>Reduces visual readability for human end-users when displayed raw.</li>
              <li>Does not provide encryption; encoded values are easily decoded by anyone.</li>
              <li>Accidental double-encoding (%2520) can break server route parsing.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for URL Handling" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Always encode individual parameter values rather than the entire completed URL.</li>
              <li>Use the browser&apos;s native <code>URLSearchParams</code> API in modern JavaScript projects.</li>
              <li>Keep URL lengths under 2,000 characters for universal proxy and browser compatibility.</li>
              <li>Remember that <code>+</code> in query strings often denotes a space character.</li>
              <li>Validate and sanitize decoded parameters before using them in database queries.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Pitfalls to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Encoding an entire URL with <code>encodeURIComponent</code>, which breaks <code>https://</code>.</li>
              <li>Double-encoding URLs by repeatedly running encoding passes on previously encoded text.</li>
              <li>Treating URL encoding as a security or obfuscation mechanism.</li>
              <li>Forgetting that hash fragments (<code>#section</code>) are never sent to the web server.</li>
              <li>Assuming all servers decode <code>+</code> and <code>%20</code> identically outside query strings.</li>
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
          <PanelHeader eyebrow="More Tools" title="Related Web & Developer Tools" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
              ["Meta Tag Generator", "/meta-tag-generator"],
              ["JSON Formatter", "/json-formatter"],
              ["HTML to Markdown", "/html-to-markdown"],
              ["JWT Decoder", "/jwt-decoder"],
              ["Regex Tester", "/regex-tester"],
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
          <PanelHeader eyebrow="Terms" title="URL & Encoding Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["URI", "Uniform Resource Identifier, the overarching standard identifying a web resource."],
              ["URL", "Uniform Resource Locator, a specific URI that also specifies the mechanism for accessing the resource."],
              ["Percent-Encoding", "Mechanism of encoding characters in a URI using % followed by two hexadecimal digits."],
              ["Query String", "The part of a URL following the '?' symbol containing key-value data."],
              ["URLSearchParams", "Modern web API interface for working with the query string of a URL."],
              ["Reserved Characters", "Characters with defined structural syntax in a URI (such as ?, &, =, /)."],
              ["Unreserved Characters", "Characters that can always be used without encoding (letters, digits, -, _, ., ~)."],
              ["UTF-8", "Variable-width character encoding standard used to convert characters to byte sequences."],
              ["Base64", "Binary-to-text encoding scheme representing byte data in an ASCII string format."],
              ["Path Segment", "Portions of a URL separated by forward slashes representing server routing paths."],
              ["Hash Fragment", "The portion of a URL following the '#' symbol used for client-side routing and anchors."],
              ["Double Encoding", "Accidental multiple encoding passes turning %20 into %2520."],
              ["RFC 3986", "The IETF standard specification governing Uniform Resource Identifiers."],
              ["x-www-form-urlencoded", "MIME type used by HTML form submissions where spaces are encoded as '+'."],
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
          <PanelHeader eyebrow="Sources" title="Official Standards & References" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <a
                href="https://www.rfc-editor.org/rfc/rfc3986"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                IETF RFC 3986: Uniform Resource Identifier (URI): Generic Syntax
              </a>
            </li>
            <li>
              <a
                href="https://url.spec.whatwg.org/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                WHATWG URL Living Standard
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                MDN Web Docs: encodeURIComponent() Reference
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                MDN Web Docs: URLSearchParams API
              </a>
            </li>
          </ul>
        </ToolPanel>

                <EducationalDisclaimerCard type="educational">
          <p>
            This URL Encoder and Decoder operates exclusively via your web browser&apos;s
            native JavaScript engine (<code>encodeURIComponent</code>, <code>encodeURI</code>, and <code>URLSearchParams</code>).
            It does not validate whether a URL destination is active, reachable, or safe. Always verify links and
            test encoded URLs in your staging environment before deploying in production systems.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
