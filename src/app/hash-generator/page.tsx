import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { HashTool } from "./hash-tool"

const pagePath = "/hash-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Hash Generator | MD5, SHA-1, SHA-256, SHA-384 and SHA-512"
const pageDescription =
  "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text or text-file contents with lowercase hexadecimal output and copy support."

const faqs = [
  {
    question: "What is a hash generator?",
    answer:
      "A hash generator applies a hash algorithm to input data and returns a fixed-format digest, usually shown as hexadecimal text.",
  },
  {
    question: "What is SHA-256?",
    answer:
      "SHA-256 is a SHA-2 hash algorithm that produces a 256-bit digest, commonly displayed as 64 hexadecimal characters.",
  },
  {
    question: "What is MD5?",
    answer:
      "MD5 is an older 128-bit message-digest algorithm. It remains useful for legacy compatibility and non-security checks, but not for modern collision-resistant security uses.",
  },
  {
    question: "Is MD5 secure?",
    answer:
      "No for modern security-sensitive collision resistance. Use SHA-256, SHA-384, or SHA-512 for new integrity and security-sensitive applications when appropriate.",
  },
  {
    question: "What is SHA-512?",
    answer:
      "SHA-512 is a SHA-2 algorithm that produces a 512-bit digest, commonly displayed as 128 hexadecimal characters.",
  },
  {
    question: "What is the difference between hashing and encryption?",
    answer:
      "Hashing is one-way and produces a digest. Encryption is designed to be reversible with the correct key.",
  },
  {
    question: "Can a hash be reversed?",
    answer:
      "A cryptographic hash is designed to be one-way, so the original input cannot normally be recovered from the digest.",
  },
  {
    question: "Why do identical inputs generate identical hashes?",
    answer:
      "Hash functions are deterministic: the same algorithm and identical input bytes produce the same digest.",
  },
  {
    question: "Why do different inputs produce different hashes?",
    answer:
      "Good hash functions are designed so small input changes produce very different digests, though collisions are theoretically possible.",
  },
  {
    question: "What is collision resistance?",
    answer:
      "Collision resistance means it should be difficult to find two different inputs with the same hash digest.",
  },
  {
    question: "Can I hash files?",
    answer:
      "This page can load a text file and hash its text contents. It does not perform binary byte-for-byte file hashing.",
  },
  {
    question: "What is HMAC?",
    answer:
      "HMAC is a keyed message authentication code based on a hash function. This page does not implement HMAC.",
  },
  {
    question: "Which algorithm should I use?",
    answer:
      "For new integrity checks, prefer SHA-256, SHA-384, or SHA-512. Use MD5 or SHA-1 only when compatibility or non-security workflows require them.",
  },
  {
    question: "Is SHA-256 secure?",
    answer:
      "SHA-256 remains widely used for modern integrity and cryptographic applications, subject to correct protocol design and current policy requirements.",
  },
  {
    question: "Can I verify downloaded files?",
    answer:
      "You can compare a published checksum with a hash you generate from identical text content. This page is not a binary file checksum tool.",
  },
  {
    question: "Why are my hashes different?",
    answer:
      "Different algorithms, whitespace, line endings, capitalization, Unicode normalization, or text encoding can produce different digests.",
  },
  {
    question: "What encoding is used?",
    answer:
      "The tool encodes text with the browser TextEncoder API before hashing, which uses UTF-8.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. This is a free browser-based hash calculator.",
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
    about: ["Hash Generator", "SHA-256 Generator", "MD5 Generator", "Hash Calculator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hash Generator",
    applicationCategory: "SecurityApplication",
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
    name: "Hash Generator",
    applicationCategory: "SecurityApplication",
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
        name: "Hash Generator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate a hash",
    description: "Generate lowercase hexadecimal hashes from text or text-file contents.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter text",
        text: "Type or paste text into the input field, or choose a text file.",
      },
      {
        "@type": "HowToStep",
        name: "Choose visible algorithms",
        text: "Toggle MD5, SHA-1, SHA-256, SHA-384, or SHA-512 in the output panel.",
      },
      {
        "@type": "HowToStep",
        name: "Generate hashes",
        text: "Press Generate to calculate the selected hash results.",
      },
      {
        "@type": "HowToStep",
        name: "Copy a digest",
        text: "Click a generated hash result to copy it to the clipboard.",
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

export default function HashGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
          <HashTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Hash Generator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A hash generator calculates a message digest from text or text-file contents.
                Cryptographic hash functions are deterministic one-way functions used in
                cybersecurity, software development, digital forensics, data integrity checks, and
                file verification workflows.
              </p>
              <p>
                Identical input bytes and the same algorithm produce the same hash, while small
                input changes should produce a very different digest. Hashes are useful for
                comparison and integrity checks, but hashing is not encryption.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Hash Generator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Text hashing", "Type or paste text into the input field and generate hashes locally."],
                ["Text-file hashing", "Choose a text file; the page reads file.text() and hashes that text content."],
                ["Algorithm visibility", "Toggle MD5, SHA-1, SHA-256, SHA-384, and SHA-512 in the output panel."],
                ["Lowercase hex output", "Generated digests are displayed as lowercase hexadecimal strings."],
                ["Copy hash", "Click a generated hash card to copy that digest."],
                ["Input stats", "The page shows character, line, and byte counts for the current text input."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Algorithms" title="Supported Hash Algorithms" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["MD5", "Produces a 128-bit digest. Included for compatibility and non-security checks."],
                ["SHA-1", "Produces a 160-bit digest. Included for compatibility and legacy comparison workflows."],
                ["SHA-256", "SHA-2 algorithm with a 256-bit digest, commonly used for modern integrity checks."],
                ["SHA-384", "SHA-2 algorithm with a 384-bit digest."],
                ["SHA-512", "SHA-2 algorithm with a 512-bit digest."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Comparison" title="Hash Algorithm Comparison" />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead className="bg-[var(--page-cream)] text-[var(--ink-900)]">
                  <tr>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Algorithm</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Digest length</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Best fit on this page</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Security note</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-700)]">
                  {[
                    ["MD5", "128 bits", "Legacy checksums and compatibility", "Avoid for new collision-resistant security uses."],
                    ["SHA-1", "160 bits", "Legacy comparisons", "Avoid for new collision-resistant security uses."],
                    ["SHA-256", "256 bits", "Modern integrity checks", "Preferred over MD5/SHA-1 for new security-sensitive hashing."],
                    ["SHA-384", "384 bits", "Longer SHA-2 digest needs", "Modern SHA-2 option."],
                    ["SHA-512", "512 bits", "Longer SHA-2 digest needs", "Modern SHA-2 option."],
                  ].map(([algorithm, length, use, note]) => (
                    <tr key={algorithm}>
                      <th scope="row" className="border border-[var(--ink-900)]/10 px-4 py-3 text-[var(--ink-900)]">
                        {algorithm}
                      </th>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{length}</td>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{use}</td>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Example Hashes" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Hello World with SHA-256</strong>
                Enter the exact text, generate SHA-256, and compare the fixed-length hexadecimal
                digest. Letter case and spacing matter.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">OpenAI with SHA-512</strong>
                SHA-512 returns a longer lowercase hexadecimal digest than SHA-256 for the same
                input.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">example.txt with SHA-256</strong>
                Load a text file and compare the digest with another hash generated from identical
                text content.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Hash Generator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter text, paste text, or choose a text file.</li>
              <li>Select which supported algorithms should be visible in the output panel.</li>
              <li>Click Generate to calculate MD5 and SHA digests for the current text.</li>
              <li>Click a hash card to copy that lowercase hexadecimal digest.</li>
              <li>Compare hashes exactly when checking integrity.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Hexadecimal hash", "Each digest is shown as lowercase hexadecimal characters."],
                ["Selected algorithm", "The label above each result identifies MD5, SHA-1, SHA-256, SHA-384, or SHA-512."],
                ["Hash length", "Longer digest algorithms produce longer hexadecimal strings."],
                ["Text-file result", "File input is interpreted as text before hashing, so binary-file checksums are outside this tool's scope."],
                ["Encoding", "Text is encoded with UTF-8 through TextEncoder before hashing."],
                ["Copy status", "The message area reports when a hash is copied or when generation is required first."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Uses" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["File integrity verification", "Compare known digests with hashes from identical text content."],
                ["Software development", "Create deterministic identifiers for fixtures, tests, and sample data."],
                ["Digital forensics", "Record digests for repeatable comparisons when the workflow matches this tool's text handling."],
                ["Data integrity", "Detect accidental changes in text by comparing before-and-after hashes."],
                ["Version control and audits", "Use hashes as compact fingerprints in logs or documentation."],
                ["Security education", "Demonstrate determinism, one-way digests, and avalanche-style changes."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Safety" title="Benefits, Limits, Tips and Common Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Quickly generates deterministic hashes from text.</li>
                  <li>Supports multiple MD5 and SHA algorithms for compatibility testing.</li>
                  <li>Helps detect text modifications through exact digest comparison.</li>
                  <li>Useful for development, testing, and security education.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Hashing is not encryption and cannot normally be reversed.</li>
                  <li>MD5 and SHA-1 are not recommended for new collision-resistant security uses.</li>
                  <li>Password storage should use Argon2, bcrypt, scrypt, or PBKDF2, not a fast hash alone.</li>
                  <li>Results depend on identical input data, line endings, and encoding.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Accurate Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Verify that you selected the intended algorithm.</li>
                  <li>Compare every hexadecimal character exactly.</li>
                  <li>Check whitespace, line endings, and Unicode characters.</li>
                  <li>Use SHA-256 or stronger SHA-2 options for new security-sensitive workflows.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Confusing hashing with encryption.</li>
                  <li>Comparing hashes from different algorithms.</li>
                  <li>Using MD5 for password storage or new security-sensitive signatures.</li>
                  <li>Changing invisible whitespace or text encoding without noticing.</li>
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
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/password-generator"
              >
                Password Generator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/base64-encoder-decoder"
              >
                Base64 Encoder / Decoder
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/uuid-generator"
              >
                UUID Generator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/url-encoder-decoder"
              >
                URL Encoder / Decoder
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/jwt-decoder"
              >
                JWT Decoder
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/json-formatter"
              >
                JSON Formatter
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Hashing Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Hash Function", "A function that maps input data to a fixed-format digest."],
                ["Cryptographic Hash", "A hash function designed for properties such as preimage and collision resistance."],
                ["Digest", "The hash output generated from input data."],
                ["Collision", "Two different inputs that produce the same digest."],
                ["Collision Resistance", "Difficulty of finding two different inputs with the same digest."],
                ["Preimage Resistance", "Difficulty of finding an input that matches a given digest."],
                ["HMAC", "A keyed hash-based message authentication code; not implemented on this page."],
                ["Checksum", "A value used to check data integrity, sometimes with non-cryptographic algorithms."],
                ["Integrity", "Confidence that data has not changed unexpectedly."],
                ["Encoding", "The way text is converted into bytes before hashing."],
                ["Salt", "Random data added before password hashing; not a feature of this tool."],
                ["One-Way Function", "A function designed to be hard to reverse."],
                ["Hexadecimal", "Base-16 notation using 0-9 and a-f in this tool's output."],
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
                  href="https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
                >
                  NIST FIPS 180-4. Secure Hash Standard.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://csrc.nist.gov/pubs/sp/800/131/a/r2/final"
                >
                  NIST SP 800-131A Rev. 2. Transitioning the Use of Cryptographic Algorithms and Key Lengths.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://datatracker.ietf.org/doc/html/rfc1321"
                >
                  IETF RFC 1321. The MD5 Message-Digest Algorithm.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://csrc.nist.gov/glossary/term/hash_function"
                >
                  NIST CSRC Glossary. Hash function.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
                >
                  OWASP Password Storage Cheat Sheet.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Security Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This tool generates hashes based on the selected algorithm and current text input.
              Hashing is not encryption, and generated hashes should be interpreted according to
              the selected algorithm and use case. Older algorithms may not be appropriate for
              modern security-sensitive applications. Follow current cryptographic best practices
              for production systems. This tool is intended for educational, development, testing,
              and text integrity verification purposes.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
