import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { WordCharacterCounterTool } from "./word-character-counter-tool"

const pagePath = "/word-character-counter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Word Character Counter | Count Words and Characters Online"
const pageDescription =
  "Count words and characters online with live text statistics for essays, SEO copy, social posts, emails, paragraphs, sentences, lines, reading time, and keywords."

const faqs = [
  {
    question: "What is a Word & Character Counter?",
    answer:
      "It is a text analysis tool that calculates live word count, character count, sentences, paragraphs, lines, reading time, and top keywords from entered text.",
  },
  {
    question: "How are words counted?",
    answer:
      "This page counts word-like matches made from letters, numbers, and apostrophes. Different software may use different word-boundary rules.",
  },
  {
    question: "How are characters counted?",
    answer:
      "The main character count uses the text value length in JavaScript. That corresponds to UTF-16 code units, so some emoji or symbols may count differently than user-perceived characters.",
  },
  {
    question: "Are spaces included?",
    answer:
      "By default the Characters tile includes spaces and line breaks. Enabling the exclude-spaces option makes that tile ignore whitespace, and the No Spaces tile always excludes whitespace.",
  },
  {
    question: "Can I count sentences?",
    answer:
      "Yes. The tool estimates sentences from punctuation marks such as periods, question marks, and exclamation marks.",
  },
  {
    question: "Can I count paragraphs?",
    answer:
      "Yes. Paragraphs are counted from blocks of text separated by blank lines.",
  },
  {
    question: "Does it count lines?",
    answer:
      "Yes. The tool reports line count based on line breaks in the text.",
  },
  {
    question: "Is reading time accurate?",
    answer:
      "Reading time is an estimate based on 200 words per minute and is rounded up to at least one minute.",
  },
  {
    question: "Does it show speaking time?",
    answer:
      "No. This implementation shows reading time, not a separate speaking-time estimate.",
  },
  {
    question: "Does it show keyword density?",
    answer:
      "Yes. The Top Keywords panel lists up to 10 repeated terms of at least three characters with counts and percentage of total words.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The tool uses standard browser text input and buttons, so it works on modern mobile browsers.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This is a free browser-based word and character counter.",
  },
  {
    question: "Does the tool upload my text to a server?",
    answer:
      "The text analysis runs in your browser. The tool does not intentionally upload entered text for counting.",
  },
  {
    question: "Does it support multiple languages?",
    answer:
      "The text box accepts Unicode text, but the implemented word and keyword matching is primarily ASCII letter, number, and apostrophe based.",
  },
  {
    question: "Why is my word count different from Microsoft Word or Google Docs?",
    answer:
      "Applications use different tokenization, punctuation, Unicode, and formatting rules, so counts can differ.",
  },
  {
    question: "Can I use it for SEO?",
    answer:
      "Yes. It can help check draft length, character limits, and repeated terms, but SEO decisions should consider context, intent, and content quality too.",
  },
  {
    question: "Is there a text size limit?",
    answer:
      "No explicit page limit is shown, but very large text can be constrained by browser memory and rendering performance.",
  },
  {
    question: "Are emojis counted as characters?",
    answer:
      "They are included in the character count, but JavaScript length may count some emoji as more than one unit.",
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
    about: ["Word Character Counter", "Word Counter", "Character Counter", "Text Statistics"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Word & Character Counter",
    applicationCategory: "UtilitiesApplication",
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
    name: "Word & Character Counter",
    applicationCategory: "UtilitiesApplication",
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
        name: "Word & Character Counter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to count words and characters online",
    description: "Analyze text with live word count, character count, and writing statistics.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter text",
        text: "Type or paste text into the input box.",
      },
      {
        "@type": "HowToStep",
        name: "Review statistics",
        text: "Check the live words, characters, no-spaces characters, sentences, paragraphs, lines, reading time, and keyword panel.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust character mode",
        text: "Enable Exclude spaces from character count when that matches your requirement.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or clear",
        text: "Copy the summary, clear the text, or load the sample text as needed.",
      },
      {
        "@type": "HowToStep",
        name: "Verify requirements",
        text: "Compare counts against the rules for your assignment, platform, or submission system.",
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

export default function WordCharacterCounterPage() {
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
          <WordCharacterCounterTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Word & Character Counter?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A Word & Character Counter measures the length and structure of entered text. It
                helps students, writers, bloggers, journalists, authors, SEO professionals,
                marketers, and business teams check essays, articles, captions, emails, product
                copy, proposals, and other writing against length requirements.
              </p>
              <p>
                Words are language units used for word-count targets. Characters are the individual
                string units counted by the implementation. Character counts with spaces include
                whitespace, while no-spaces counts remove whitespace before measuring length.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Counter Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Type or paste text", "The text area accepts draft copy, essays, posts, notes, and other plain text."],
                ["Live calculation", "Statistics update automatically as the text or character-count option changes."],
                ["Word matching", "Words are counted with the implemented letter, number, and apostrophe pattern."],
                ["Structure counts", "Sentences, paragraphs, and lines are estimated from punctuation and line breaks."],
                ["Reading estimate", "Reading time is calculated from word count at 200 words per minute."],
                ["Keyword table", "Repeated terms of at least three characters are ranked by count and percentage."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Statistics" title="Available Text Statistics" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Word count", "Total number of matched word-like tokens."],
                ["Characters", "Either full JavaScript string length or no-spaces length when the checkbox is enabled."],
                ["No Spaces", "Character count after removing whitespace."],
                ["Sentence count", "Estimated from sentence-ending punctuation."],
                ["Paragraph count", "Estimated from text blocks separated by blank lines."],
                ["Line count", "Calculated from line break characters."],
                ["Reading time", "Estimated minutes based on 200 words per minute."],
                ["Top keywords", "Up to 10 repeated terms with count and percentage."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Counting Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Direct input", "Statistics are calculated from the current text in the input box."],
                ["Automatic updates", "Counts refresh when text changes, when the sample loads, or when the space option changes."],
                ["Implementation rules", "Results depend on the regex, whitespace, punctuation, and JavaScript string-length rules used here."],
                ["Unicode text", "Unicode text is accepted, but JavaScript length counts UTF-16 code units rather than grapheme clusters."],
                ["Estimates", "Reading time, sentence count, and paragraph count are useful estimates, not editorial guarantees."],
                ["Software differences", "Other editors may count punctuation, emoji, hyphenation, and formatted text differently."],
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
                ["Essay submission", "Check the word count of an essay before submitting it."],
                ["Social post", "Verify character limits for a caption or profile update."],
                ["SEO article", "Measure article length and repeated keywords before editing."],
                ["Business proposal", "Review proposal length before sending a draft."],
                ["Book chapter", "Track writing progress by words, paragraphs, and lines."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Implemented Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Live counting", "Statistics update while you type or paste."],
                ["Copy Stats", "Copies a summary of words, characters, sentences, paragraphs, and reading time."],
                ["Clear", "Removes the current text."],
                ["Load Sample", "Restores the built-in example text and default character option."],
                ["Exclude spaces", "Changes the main Characters tile to ignore whitespace."],
                ["Browser-based operation", "Counting runs in the browser without extra dependencies."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Counter" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Type or paste text into the text input.</li>
              <li>Review the live words, characters, no-spaces characters, sentences, paragraphs, lines, and reading time.</li>
              <li>Use Exclude spaces from character count if your requirement ignores whitespace.</li>
              <li>Check Top Keywords for repeated terms and density.</li>
              <li>Use Copy Stats, Clear, or Load Sample as needed.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Words", "The number of matched word-like tokens in the text."],
                ["Characters", "The main character count, with or without whitespace depending on the checkbox."],
                ["No Spaces", "The whitespace-excluded character count."],
                ["Sentences", "A punctuation-based sentence estimate."],
                ["Paragraphs", "The number of non-empty paragraph blocks separated by blank lines."],
                ["Lines", "The number of line-separated rows in the entered text."],
                ["Reading time", "A rounded minute estimate from word count."],
                ["Top Keywords", "Repeated terms ranked by frequency and percentage of total words."],
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
                ["Academic writing", "Check essays, homework, abstracts, and assignments."],
                ["Blog posts and articles", "Track draft length and keyword repetition."],
                ["SEO optimization", "Review page copy, meta drafts, headings, and product descriptions."],
                ["Social media", "Check captions, bios, and short-form copy against character limits."],
                ["Email and business writing", "Keep proposals, updates, and announcements concise."],
                ["Creative writing", "Monitor chapter progress, paragraphs, and writing targets."],
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
                  <li>Analyze text instantly while writing or editing.</li>
                  <li>Check word, character, sentence, paragraph, line, and keyword statistics in one place.</li>
                  <li>Use browser-based counting without installing writing software.</li>
                  <li>Copy a compact summary for notes or review workflows.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Counts depend on the implemented matching and whitespace rules.</li>
                  <li>Different applications may count words, emoji, punctuation, and formatting differently.</li>
                  <li>Reading time is an estimate, not a measurement of individual reading pace.</li>
                  <li>Very large text may take more browser resources to render and update.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Paste plain text when possible.</li>
                  <li>Check whether your target platform includes or excludes spaces.</li>
                  <li>Use reading time as guidance rather than an exact promise.</li>
                  <li>Proofread and verify formatting after copying text elsewhere.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Assuming every editor counts words identically.</li>
                  <li>Confusing characters with words.</li>
                  <li>Ignoring spaces when a platform limit includes them.</li>
                  <li>Relying only on keyword frequency instead of overall writing quality.</li>
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
                ["Case Converter", "/case-converter"],
                ["Text Diff Checker", "/text-diff-checker"],
                ["Markdown Previewer", "/markdown-previewer"],
                ["HTML to Markdown", "/html-to-markdown"],
                ["JSON Formatter", "/json-formatter"],
                ["Base64 Encoder/Decoder", "/base64-encoder-decoder"],
                ["QR Code Generator", "/qr-code-generator"],
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
            <PanelHeader eyebrow="Glossary" title="Text Analysis Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Word", "A text token counted by the implemented word-matching rule."],
                ["Character", "A unit of text length; in JavaScript string length, this means UTF-16 code units."],
                ["Unicode", "A standard for representing text from many writing systems."],
                ["Grapheme Cluster", "A user-perceived character that may contain multiple Unicode code points."],
                ["Whitespace", "Spaces, tabs, and line breaks used to separate or format text."],
                ["Sentence", "A text unit that this tool estimates from sentence-ending punctuation."],
                ["Paragraph", "A block of text separated from another block by a blank line."],
                ["Reading Time", "An estimated time to read text based on word count."],
                ["Keyword", "A repeated term shown in the Top Keywords panel."],
                ["Text Statistics", "Measurements such as words, characters, sentences, paragraphs, lines, and reading time."],
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
                  href="https://www.unicode.org/reports/tr29/"
                  rel="noreferrer"
                >
                  Unicode Standard Annex #29. Unicode Text Segmentation.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length"
                  rel="noreferrer"
                >
                  MDN. JavaScript String length.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Glossary/UTF-16"
                  rel="noreferrer"
                >
                  MDN. UTF-16.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/TR/charmod/"
                  rel="noreferrer"
                >
                  W3C. Character Model for the World Wide Web.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://tc39.es/ecma262/#sec-properties-of-string-instances-length"
                  rel="noreferrer"
                >
                  ECMAScript Language Specification. String length.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This Word & Character Counter calculates statistics using the implemented counting
              logic. Results are intended for educational, informational, writing, and productivity
              purposes. Different applications may use different word, character, sentence,
              paragraph, Unicode, and formatting rules. Verify counts against assignment,
              publishing, SEO, platform, legal, or submission requirements when exact limits are
              critical.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
