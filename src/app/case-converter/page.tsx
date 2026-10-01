import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { CaseConverterTool } from "./case-converter-tool"

const pagePath = "/case-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Case Converter | Free Online Text Case Changer"
const pageDescription =
  "Convert text case online with a free browser-based Case Converter for uppercase, lowercase, sentence case, title case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE."

const faqs = [
  {
    question: "What is a Case Converter?",
    answer:
      "A Case Converter changes text capitalization or word separators according to the selected conversion mode.",
  },
  {
    question: "How does this Case Converter work?",
    answer:
      "The page applies the selected conversion function to the input text and updates the output in the browser.",
  },
  {
    question: "What is uppercase?",
    answer:
      "Uppercase converts applicable letters to capital forms using JavaScript string case conversion.",
  },
  {
    question: "What is lowercase?",
    answer:
      "Lowercase converts applicable letters to small-letter forms using JavaScript string case conversion.",
  },
  {
    question: "What is Title Case?",
    answer:
      "In this tool, Title Case extracts word-like tokens, lowercases each token, capitalizes the first character, and joins words with spaces.",
  },
  {
    question: "What is Sentence Case?",
    answer:
      "In this tool, Sentence Case lowercases the text and uppercases the first ASCII letter at the start or after sentence-ending punctuation plus spaces.",
  },
  {
    question: "What is the difference between Title Case and Sentence Case?",
    answer:
      "Title Case capitalizes each extracted word, while Sentence Case capitalizes sentence starts according to the implemented punctuation rule.",
  },
  {
    question: "Can I convert lowercase text to uppercase?",
    answer:
      "Yes. Choose UPPERCASE to convert applicable letters to uppercase.",
  },
  {
    question: "Can I convert uppercase text to lowercase?",
    answer:
      "Yes. Choose lowercase to convert applicable letters to lowercase.",
  },
  {
    question: "Does the tool support camelCase?",
    answer:
      "Yes. camelCase is implemented from extracted word-like tokens.",
  },
  {
    question: "Does the tool support PascalCase?",
    answer:
      "Yes. PascalCase capitalizes each extracted token and removes separators.",
  },
  {
    question: "Does the tool support snake_case?",
    answer:
      "Yes. snake_case joins extracted tokens with underscores and lowercases the result.",
  },
  {
    question: "Does the tool support kebab-case?",
    answer:
      "Yes. kebab-case joins extracted tokens with hyphens and lowercases the result.",
  },
  {
    question: "Can I convert text on a mobile device?",
    answer:
      "Yes. The converter uses standard browser text areas and buttons, so support depends on the mobile browser.",
  },
  {
    question: "Is my text uploaded to a server?",
    answer:
      "The conversion runs in your browser. The tool does not intentionally upload entered text for conversion.",
  },
  {
    question: "Is the Case Converter free?",
    answer: "Yes. This is a free browser-based text case converter.",
  },
  {
    question: "Can I copy the converted text?",
    answer:
      "Yes. Use Copy Result to copy the converted output to the clipboard.",
  },
  {
    question: "Can I download the converted text?",
    answer:
      "No. This implementation provides copy, clear, and sample actions, but not a download button.",
  },
  {
    question: "Why did some words not change?",
    answer:
      "Some characters have no uppercase or lowercase form, and identifier-style modes only use the implemented ASCII letter and digit token matching.",
  },
  {
    question: "Why does my converted text differ from another case converter?",
    answer:
      "Converters may use different Unicode handling, word tokenization, title-case rules, sentence rules, punctuation handling, and separator behavior.",
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
    about: ["Case Converter", "Text Case Converter", "Uppercase Converter", "Lowercase Converter"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Case Converter",
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
    name: "Case Converter",
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
        name: "Case Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert text case online",
    description: "Change text capitalization with the browser-based Case Converter.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter text",
        text: "Type or paste text into the input area.",
      },
      {
        "@type": "HowToStep",
        name: "Choose case",
        text: "Select Sentence, lowercase, UPPERCASE, Title Case, camelCase, PascalCase, snake_case, kebab-case, or CONSTANT_CASE.",
      },
      {
        "@type": "HowToStep",
        name: "Review output",
        text: "Check the converted text and the character, word, and line counts.",
      },
      {
        "@type": "HowToStep",
        name: "Copy result",
        text: "Use Copy Result to copy the converted text.",
      },
      {
        "@type": "HowToStep",
        name: "Verify text",
        text: "Review proper nouns, acronyms, identifiers, and Unicode text before publishing or using the result.",
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

export default function CaseConverterPage() {
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
          <CaseConverterTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Case Converter?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A Case Converter changes capitalization and word separators in text. Writers,
                students, developers, editors, designers, marketers, content creators, researchers,
                and business users use it to normalize headings, prepare identifiers, adjust
                filenames, format constants, clean imported copy, and quickly compare case styles.
              </p>
              <p>
                Text case means how letters are capitalized. Case conversion is different from
                grammar correction, spelling correction, translation, or semantic rewriting. This
                page applies the selected transformation rules to the input string and shows the
                converted output immediately.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Modes" title="Supported Case Types" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Sentence", "Lowercases the text, then uppercases sentence starts matched by the implementation."],
                ["lowercase", "Converts applicable letters to lowercase with JavaScript toLowerCase."],
                ["UPPERCASE", "Converts applicable letters to uppercase with JavaScript toUpperCase."],
                ["Title Case", "Extracts word-like tokens, capitalizes each token, and joins them with spaces."],
                ["camelCase", "Lowercases the first extracted token, capitalizes following tokens, and removes separators."],
                ["PascalCase", "Capitalizes each extracted token and removes separators."],
                ["snake_case", "Joins extracted tokens with underscores and lowercases the result."],
                ["kebab-case", "Joins extracted tokens with hyphens and lowercases the result."],
                ["CONSTANT_CASE", "Joins extracted tokens with underscores and uppercases the result."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How Case Conversion Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Enter text", "Type or paste text into the input area."],
                ["Choose mode", "Select one of the implemented case modes."],
                ["Live output", "The converted output updates from React memoized conversion when input or mode changes."],
                ["Token modes", "Title, camel, pascal, snake, kebab, and constant modes use extracted ASCII letters and digits."],
                ["Review stats", "The input panel shows characters, words, and lines."],
                ["Copy or clear", "Copy Result copies the output; Clear removes input; Load Sample restores the sample text."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Conversion Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Implemented rules", "Case conversion follows the existing transformation functions in this page."],
                ["Upper and lower", "Lowercase and uppercase modes rely on JavaScript string case mapping behavior."],
                ["Sentence mode", "Sentence mode uses an ASCII-letter punctuation pattern after lowercasing the whole input."],
                ["Identifier modes", "Developer-oriented naming modes discard punctuation and whitespace by rebuilding from extracted tokens."],
                ["Unicode caveats", "Unicode characters can have language-specific or character-specific case behavior, and some scripts have no case."],
                ["Tool differences", "Different converters may produce different results because title, sentence, and tokenization rules vary."],
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
                ["Writing", "Convert a mixed-case heading into a consistent Title Case or Sentence style."],
                ["Development", "Convert a phrase into camelCase, PascalCase, snake_case, kebab-case, or CONSTANT_CASE."],
                ["Content editing", "Convert imported text to lowercase or uppercase before editing."],
                ["Marketing", "Normalize short promotional headings or product snippets."],
                ["Data preparation", "Standardize labels before using them in filenames, spreadsheets, or simple code examples."],
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
                ["Text input", "Enter or paste text into an accessible textarea."],
                ["Multiple case modes", "Nine case conversion options are available."],
                ["Live conversion", "Output updates as text or mode changes."],
                ["Stats", "Input characters, words, and lines are shown."],
                ["Copy Result", "Copy converted output to the clipboard."],
                ["Clear", "Remove the current input text."],
                ["Load Sample", "Restore the built-in sample sentence."],
                ["Browser-based processing", "Conversion runs in the browser without new dependencies."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use Case Converter" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter or paste text into the Input text field.</li>
              <li>Select the desired case format from the conversion buttons.</li>
              <li>Review the converted text and input statistics.</li>
              <li>Use Copy Result to copy the output.</li>
              <li>Use Clear or Load Sample when you want to reset the workspace.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding Text Case" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Uppercase and lowercase are letter forms used by scripts with case distinctions.
                Title Case commonly capitalizes words in headings, while Sentence case commonly
                capitalizes sentence starts. This implementation uses its own simple rules for Title
                Case and Sentence mode rather than a full grammar-aware editor.
              </p>
              <p>
                Naming conventions such as camelCase, PascalCase, snake_case, kebab-case, and
                CONSTANT_CASE are often used in software development, filenames, URLs, and
                configuration. The right case style depends on the destination, project conventions,
                language, and reader expectations.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Writing and editing", "Clean up headings, notes, imported text, and draft copy."],
                ["Academic work", "Normalize short titles, labels, and citations before review."],
                ["Software development", "Create identifiers, filenames, constants, and simple labels."],
                ["Marketing", "Prepare campaign headings, product descriptions, and social copy."],
                ["Documentation", "Format headings, UI labels, code examples, and glossary terms."],
                ["Data preparation", "Make text labels consistent before moving them into another system."],
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
                  <li>Change text capitalization quickly without manual retyping.</li>
                  <li>Use writing-focused and developer-focused case formats in one tool.</li>
                  <li>Copy converted text for reuse in documents, code, filenames, and UI copy.</li>
                  <li>Run conversions locally in the browser with no installation.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Case conversion does not correct grammar, spelling, or meaning.</li>
                  <li>Acronyms, brand names, and proper nouns may need manual review.</li>
                  <li>Some Unicode characters and scripts have special or no case mappings.</li>
                  <li>Download, paste button, toggle case, alternating case, and inverse case are not implemented.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Review output before publishing or committing code.</li>
                  <li>Preserve intentional capitalization in names, brands, and acronyms.</li>
                  <li>Use the case style required by the target language, platform, or project.</li>
                  <li>Keep a copy of the original text when capitalization is important.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Converting the wrong text or losing intentional capitalization.</li>
                  <li>Expecting case conversion to fix grammar or spelling.</li>
                  <li>Using Title Case when Sentence case is required.</li>
                  <li>Assuming every converter follows the same Unicode and tokenization rules.</li>
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
                ["Word & Character Counter", "/word-character-counter"],
                ["Text Diff Checker", "/text-diff-checker"],
                ["Lorem Ipsum Generator", "/lorem-ipsum-generator"],
                ["Markdown Previewer", "/markdown-previewer"],
                ["HTML to Markdown", "/html-to-markdown"],
                ["JSON Formatter", "/json-formatter"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["URL Encoder / Decoder", "/url-encoder-decoder"],
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
            <PanelHeader eyebrow="Glossary" title="Case Conversion Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Case", "The uppercase, lowercase, or titlecase form of letters in scripts that support casing."],
                ["Uppercase", "Capital letter forms, such as A, B, and C."],
                ["Lowercase", "Small letter forms, such as a, b, and c."],
                ["Title Case", "A capitalization style where words are capitalized according to a chosen rule."],
                ["Sentence Case", "A capitalization style where sentence starts are capitalized according to a chosen rule."],
                ["Capitalization", "The use of uppercase and lowercase letters in text."],
                ["Character", "A unit of written text, though software may count or map characters differently."],
                ["Unicode", "A standard for representing text from many writing systems."],
                ["ASCII", "A basic character set containing English letters, digits, and common symbols."],
                ["Acronym", "A shortened form made from initial letters, such as HTML."],
                ["Abbreviation", "A shortened form of a word or phrase."],
                ["camelCase", "A style where the first word is lowercase and later words are capitalized without spaces."],
                ["PascalCase", "A style where each word is capitalized and separators are removed."],
                ["snake_case", "A style where lowercase words are joined by underscores."],
                ["kebab-case", "A style where lowercase words are joined by hyphens."],
                ["CONSTANT_CASE", "An uppercase underscore-separated style often used for constants."],
                ["Text Transformation", "Changing text from one representation to another."],
                ["String", "A sequence of characters handled as text by software."],
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
                  href="https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-4/"
                  rel="noreferrer"
                >
                  Unicode Standard. Chapter 4, Character Properties, Case.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-3/"
                  rel="noreferrer"
                >
                  Unicode Standard. Chapter 3, Default Case Conversion.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.unicode.org/reports/tr44/"
                  rel="noreferrer"
                >
                  Unicode Standard Annex #44. Unicode Character Database.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://tc39.es/ecma262/#sec-string.prototype.tolowercase"
                  rel="noreferrer"
                >
                  ECMAScript Language Specification. String.prototype.toLowerCase.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://tc39.es/ecma262/#sec-string.prototype.touppercase"
                  rel="noreferrer"
                >
                  ECMAScript Language Specification. String.prototype.toUpperCase.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase"
                  rel="noreferrer"
                >
                  MDN Web Docs. String.prototype.toLowerCase.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This Case Converter converts text according to its implemented case-conversion rules.
            Results depend on the input text and selected conversion mode. Case conversion does
            not necessarily perform grammar or spelling correction. Unicode characters may have
            different case-mapping behavior, and different case-conversion tools may produce
            different results. The tool is intended for writing, editing, development,
            educational, and general text-formatting purposes.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
