import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { JwtDecoderTool } from "./jwt-decoder-tool"

const pagePath = "/jwt-decoder"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "JWT Decoder | Decode JSON Web Tokens Online"
const pageDescription =
  "Decode JSON Web Token headers and payloads online. Inspect Base64URL-encoded claims, signature presence, common timestamps, and copy decoded JSON in your browser. No signature verification is performed."

const faqs = [
  { question: "What is a JWT Decoder?", answer: "A JWT Decoder reads the Base64URL-encoded header and payload sections of a compact three-part JSON Web Token and displays their JSON content." },
  { question: "Does decoding a JWT verify it?", answer: "No. This tool only decodes and parses the header and payload. It does not verify the signature, validate a key, or prove that a token is authentic." },
  { question: "What parts of a JWT does this tool decode?", answer: "It decodes the first two dot-separated parts as JSON: the header and payload. It shows whether the third signature segment is present, but does not decode or verify it." },
  { question: "Why does a JWT have three parts?", answer: "The compact JWS form has a protected header, payload, and signature separated by periods. This implementation accepts that three-part form." },
  { question: "Can this tool decrypt an encrypted JWT?", answer: "No. A compact JWE has five parts and requires decryption keys. This tool accepts only three dot-separated parts." },
  { question: "What is Base64URL?", answer: "Base64URL is a URL-safe Base64 variant used for compact JWT parts. This implementation converts its URL-safe characters, applies padding when needed, then decodes the header and payload text." },
  { question: "What does the algorithm field mean?", answer: "The header may contain an alg value that identifies the declared cryptographic algorithm. Displaying it does not validate that the algorithm or signature is trustworthy." },
  { question: "What are JWT claims?", answer: "Claims are name/value pairs in the JSON payload. This tool summarizes alg, typ, iss, sub, aud, iat, nbf, and exp when they are present." },
  { question: "What does the expiry status mean?", answer: "When exp and nbf are numeric, the page compares them with the current browser clock to show Expired, Not active, Not expired, or No expiry. This is an unverified display only." },
  { question: "Are exp, nbf, and iat converted to dates?", answer: "Yes, when each claim is a number. The tool treats it as seconds since the Unix epoch and formats it using the browser locale." },
  { question: "Why does my JWT show an error?", answer: "It may not have exactly three parts, may contain invalid Base64URL data, or its decoded header or payload may not be valid JSON." },
  { question: "Can I copy the decoded header or payload?", answer: "Yes. Each decoded JSON panel has a Copy button when valid decoded JSON is available." },
  { question: "Does the decoder support JWKs or JWKS endpoints?", answer: "No. It does not request keys, connect to JWKS endpoints, or verify JSON Web Keys." },
  { question: "Does the decoder validate issuer or audience?", answer: "No. The tool only displays issuer and audience values when present; it does not compare them with an expected value." },
  { question: "Is my token uploaded to a server?", answer: "The decoder runs in your browser and does not intentionally upload the pasted token." },
  { question: "Is the JWT Decoder free?", answer: "Yes. This is a free browser-based JWT decoding tool." },
  { question: "Does it work on mobile devices?", answer: "Yes. It uses browser text input, buttons, and scrollable decoded JSON panels, so the experience depends on the mobile browser." },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: ["JWT Decoder", "JSON Web Token", "JWS Compact Serialization", "Base64URL"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JWT Decoder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Three-part JWT input",
      "Base64URL header decoding",
      "Base64URL payload decoding",
      "Header and payload JSON display",
      "Signature segment presence indicator",
      "Common claim summary",
      "Browser-locale date display for numeric time claims",
      "Header and payload copy controls",
      "Clear and sample controls",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JWT Decoder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "JWT Decoder", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to decode a JSON Web Token",
    description: "Paste a compact three-part JWT, inspect the decoded header and payload, then copy either JSON value when needed.",
    step: [
      { "@type": "HowToStep", name: "Paste token", text: "Paste a three-part token into the Token input." },
      { "@type": "HowToStep", name: "Inspect summary", text: "Review common header and payload claims and the time-claim summary." },
      { "@type": "HowToStep", name: "Review JSON", text: "Read the decoded header and payload panels or copy them for development work." },
      { "@type": "HowToStep", name: "Verify elsewhere", text: "Use a trusted JWT validation process with the expected key, issuer, audience, and algorithm before trusting a token." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: { title: pageTitle, description: pageDescription, url: pageUrl, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary", title: pageTitle, description: pageDescription },
}

export default function JwtDecoderPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12"><JwtDecoderTool /></section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a JWT Decoder?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>A JSON Web Token, or JWT, is a compact, URL-safe representation of claims. A three-part compact JWS token places a Base64URL-encoded header, payload, and signature segment between period characters. A decoder makes the first two JSON values readable for development, debugging, and interoperability work.</p>
            <p>This page parses the header and payload locally, displays selected claims, formats numeric time claims using the browser locale, and lets you copy decoded JSON. It does not authenticate the token, decrypt data, fetch keys, or validate an issuer, audience, or application rules.</p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Format" title="JWT Parts" />
          <div className="mt-6 grid gap-5 md:grid-cols-3 text-sm leading-7 text-[var(--ink-700)]">
            <div><h3 className="font-semibold text-[var(--ink-900)]">Header</h3><p className="mt-2">A JSON object that can identify a declared type and cryptographic algorithm. This tool displays <code>alg</code> and <code>typ</code> when available.</p></div>
            <div><h3 className="font-semibold text-[var(--ink-900)]">Payload</h3><p className="mt-2">A JSON claims set. This tool displays issuer, subject, audience, and common time claims when present.</p></div>
            <div><h3 className="font-semibold text-[var(--ink-900)]">Signature</h3><p className="mt-2">The third compact JWS segment. This page reports whether it exists but does not decode or verify it.</p></div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Features" title="JWT Decoder Features" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">{[
            ["Three-part input", "Accepts a token with header, payload, and signature segments separated by periods."],
            ["Base64URL decoding", "Converts URL-safe Base64 characters and applies padding before decoding the header and payload."],
            ["JSON parsing", "Parses decoded header and payload text as JSON and reports parser errors."],
            ["Claim summary", "Displays alg, typ, iss, sub, aud, iat, nbf, and exp when those values are present."],
            ["Time summary", "Compares numeric exp and nbf claims with the browser clock for a display-only status."],
            ["Copy controls", "Copies the available formatted header or payload JSON."],
            ["Clear and sample", "Clears the input or reloads the built-in sample token."],
            ["Local operation", "Runs decoding in the browser without intentionally uploading the pasted token."],
          ].map(([title, text]) => <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p></div>)}</div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Security" title="Decoding Is Not Verification" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]"><p>Base64URL decoding makes header and payload content readable; it does not prove who created the token, whether the token changed, or whether it is acceptable for a particular application. A token can be decoded even when it is forged, expired, signed with an unexpected key, or intended for another audience.</p><p>Production JWT validation requires an application-specific process that validates the expected algorithm, verifies the signature with a trusted key, and checks applicable claims such as issuer, audience, expiry, and not-before. This tool intentionally does none of those steps.</p></div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Claims" title="Common JWT Claims" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">{[
            ["iss", "Issuer: identifies the principal that issued the token."],
            ["sub", "Subject: identifies the principal the claims are about."],
            ["aud", "Audience: identifies intended token recipients; it can be a string or array."],
            ["exp", "Expiration time: a NumericDate after which the token must not be accepted."],
            ["nbf", "Not before: a NumericDate before which the token must not be accepted."],
            ["iat", "Issued at: a NumericDate that identifies when the token was issued."],
          ].map(([claim, description]) => <div key={claim} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><h3 className="font-mono font-semibold">{claim}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{description}</p></div>)}</div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the JWT Decoder" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Paste a compact token with three dot-separated parts.</li><li>Review the status message if the header or payload cannot be parsed.</li><li>Inspect the claim summary and the decoded JSON panels.</li><li>Copy header or payload JSON when needed for development or debugging.</li><li>Use an appropriate verification process before making security decisions based on a token.</li></ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common Uses" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">{[
            ["API debugging", "Inspect a token header and payload while troubleshooting a development integration."],
            ["Claim review", "Check which issuer, subject, audience, and time claims a test token contains."],
            ["Documentation", "Copy a redacted decoded payload into technical notes or test documentation."],
            ["Interoperability", "Compare token contents produced by different development environments."],
            ["Time-claim inspection", "Review a numeric expiry or not-before value in the browser's locale."],
          ].map(([title, text]) => <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p></div>)}</div>
        </ToolPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel><PanelHeader eyebrow="Advantages" title="Benefits" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Makes compact header and payload JSON easier to inspect.</li><li>Shows commonly used claim values without manual Base64URL decoding.</li><li>Formats numeric JWT time claims for quick local review.</li><li>Provides separate copy controls for decoded header and payload JSON.</li><li>Runs directly in a browser-based workflow.</li></ul></ToolPanel>
          <ToolPanel><PanelHeader eyebrow="Boundaries" title="Limitations" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Decoding does not verify authenticity, signature integrity, algorithm suitability, or key trust.</li><li>The tool accepts only the compact three-part form; it does not decrypt five-part JWE tokens.</li><li>Issuer, audience, and application claims are displayed but not validated.</li><li>Expiry and not-before labels depend on numeric claims and the local browser clock.</li><li>Malformed Base64URL data or non-JSON header/payload values cannot be decoded.</li></ul></ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel><PanelHeader eyebrow="Guidance" title="Tips for Best Results" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Use test or redacted tokens whenever practical; decoded payloads can contain sensitive claims.</li><li>Confirm that a token has exactly three dot-separated parts before decoding.</li><li>Review the declared algorithm but do not treat it as a verified security property.</li><li>Compare time claims with the source system when timing is security-critical.</li><li>Use a production verifier configured with the expected key, algorithm, issuer, and audience.</li></ul></ToolPanel>
          <ToolPanel><PanelHeader eyebrow="Avoid" title="Common Mistakes" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Treating readable payload text as evidence that a token is genuine.</li><li>Assuming an existing signature segment means the signature is valid.</li><li>Using a decoder to make authorization decisions.</li><li>Confusing an encrypted five-part JWE with a three-part signed JWS.</li><li>Assuming an expiry display validates the issuer, audience, or application policy.</li></ul></ToolPanel>
        </div>

        <ToolPanel><PanelHeader eyebrow="Questions" title="FAQ" /><div className="mt-6 grid gap-4">{faqs.map((faq) => <details key={faq.question} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{faq.answer}</p></details>)}</div></ToolPanel>

        <ToolPanel><PanelHeader eyebrow="More Tools" title="Related Tools" /><nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">{[["Base64 Encoder / Decoder", "/base64-encoder-decoder"], ["JSON Formatter", "/json-formatter"], ["Hash Generator", "/hash-generator"], ["URL Encoder / Decoder", "/url-encoder-decoder"], ["Regex Tester", "/regex-tester"], ["UUID Generator", "/uuid-generator"]].map(([label, href]) => <Link key={href} href={href} className="rounded-[1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 transition hover:border-[var(--accent-rust)]/40">{label}</Link>)}</nav></ToolPanel>

        <ToolPanel><PanelHeader eyebrow="Terms" title="Glossary" /><div className="mt-6 grid gap-4 md:grid-cols-2">{[["JWT", "A compact, URL-safe claims representation format."], ["JWS", "A JSON Web Signature structure that provides integrity protection or a digital signature."], ["JWE", "A JSON Web Encryption structure that protects content through encryption."], ["JOSE Header", "The header JSON object describing operations applied to a JWT."], ["Claim", "A name/value assertion in a JWT payload."], ["Base64URL", "A URL-safe Base64 encoding used by compact JWT parts."], ["Signature", "The JWS compact segment used in integrity verification."], ["Issuer", "The principal identified by the iss claim."], ["Audience", "The intended recipients identified by the aud claim."], ["NumericDate", "Seconds from 1970-01-01T00:00:00Z UTC, ignoring leap seconds."], ["Token Validation", "The application-specific process of verifying a JWT and required claims."], ["Token Decoding", "Reading encoded token parts without establishing their authenticity."]].map(([term, definition]) => <div key={term}><h3 className="font-semibold">{term}</h3><p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">{definition}</p></div>)}</div></ToolPanel>

        <ToolPanel><PanelHeader eyebrow="Sources" title="References" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li><a href="https://www.rfc-editor.org/rfc/rfc7519.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">RFC 7519: JSON Web Token</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc7515.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">RFC 7515: JSON Web Signature</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc8725.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">RFC 8725: JSON Web Token Best Current Practices</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/atob" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: Window.atob()</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: TextDecoder</a></li></ul></ToolPanel>

        <InfoBox>Security disclaimer: This tool decodes JWT header and payload text using its implemented Base64URL and JSON parsing logic. It does not verify signatures, keys, algorithms, issuers, audiences, or application claims, and it does not decrypt JWE tokens. Do not use decoded output alone to make authentication, authorization, or trust decisions.</InfoBox>
      </section>
    </main>
  )
}
