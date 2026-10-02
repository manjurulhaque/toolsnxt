import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { TextDiffCheckerTool } from "./text-diff-checker-tool"

const pagePath = "/text-diff-checker"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Text Diff Checker | Compare Text & Code Differences Online"
const pageDescription =
  "Compare two text blocks line by line online in your browser. Inspect added, removed, and changed lines, ignore whitespace and case differences, and copy unified diff patches with zero server uploads."

const faqs = [
  {
    question: "What is a text diff checker?",
    answer:
      "A text diff checker is a comparison utility that examines two versions of a document, script, or configuration file line by line to detect and highlight what was added, removed, modified, or preserved.",
  },
  {
    question: "How does the comparison algorithm work?",
    answer:
      "The tool analyzes input strings by splitting them into line arrays, computing matching segments, and highlighting insertions, deletions, and substitutions. It generates structured line-by-line metrics and unified diff patches in real time.",
  },
  {
    question: "Can I ignore whitespace differences like tabs or spaces?",
    answer:
      "Yes. Enabling 'Ignore whitespace' strips leading and trailing spaces before comparing lines, preventing false diff positives caused merely by indentation reformatting.",
  },
  {
    question: "Can I compare text in a case-insensitive manner?",
    answer:
      "Yes. Enabling 'Ignore case' converts characters to lowercase during line comparison, which is helpful when checking content where capitalization conventions vary.",
  },
  {
    question: "What does the unified diff patch format look like?",
    answer:
      "The generated patch adheres to the classic Unix unified diff convention: lines preceded by '+' represent additions, lines with '-' represent deletions, and lines marked with '~' indicate inline modifications.",
  },
  {
    question: "Is my text data private and secure?",
    answer:
      "Yes. All diff computations are executed 100% locally in your web browser using client-side JavaScript. No text, source code, or legal documents are ever sent to external servers or logged in any database.",
  },
  {
    question: "How does the tool handle Windows (CRLF) vs Unix (LF) line breaks?",
    answer:
      "The tool normalizes carriage return line feeds (\\r\\n) and raw line feeds (\\n) into uniform line breaks before computation, preventing entire files from appearing changed due to operating system line ending discrepancies.",
  },
  {
    question: "Can I copy the diff patch to apply with the 'patch' command?",
    answer:
      "Yes. Clicking 'Copy Diff' copies the formatted diff text directly to your clipboard, making it ready to share in pull requests, bug trackers, or paste into terminal patch utilities.",
  },
  {
    question: "Can I use this tool to compare programming code?",
    answer:
      "Yes. It works with any programming language (JavaScript, Python, Rust, HTML, CSS, SQL, C++, etc.), configuration files (JSON, YAML, TOML), and plain English documents.",
  },
  {
    question: "Can I compare legal contracts and agreements?",
    answer:
      "Yes. Legal professionals and contracts teams frequently use this tool to spot unannounced clause modifications, changed figures, or deleted terms between draft revisions.",
  },
  {
    question: "What is the maximum text size supported?",
    answer:
      "Because processing occurs in the browser, the tool comfortably handles documents with thousands of lines. Extremely large files (&gt;100,000 lines) may experience brief calculation latency depending on your device's memory.",
  },
  {
    question: "Does the diff checker work offline?",
    answer:
      "Yes. As part of this PWA suite, the diff checker runs with zero external network connectivity once loaded in your browser.",
  },
  {
    question: "What is the difference between a two-way and three-way diff?",
    answer:
      "A two-way diff compares an original file directly against a revised file. A three-way diff (common in Git merge conflict resolution) compares two modified files against their common ancestor to determine non-conflicting merges.",
  },
  {
    question: "Is the Text Diff Checker free to use?",
    answer:
      "Yes. It is completely free with no registration, no file limits, and no advertising.",
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
      "Text Diff Checker",
      "Code Diff Tool",
      "File Comparison",
      "Unified Diff",
      "Patch Generator",
      "Line by Line Compare",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text Diff Checker",
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
      "Side-by-side line comparison",
      "Unified diff patch generation",
      "Ignore whitespace toggle",
      "Ignore case sensitivity toggle",
      "Real-time change, addition, and removal counters",
      "Copy diff patch to clipboard",
      "Line number alignment",
      "100% private in-browser execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Text Diff Checker",
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
        name: "Text Diff Checker",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compare two text documents online",
    description: "Step-by-step instructions for comparing text and code differences in your browser.",
    step: [
      {
        "@type": "HowToStep",
        name: "Paste original text",
        text: "Paste the baseline or original version of the text into the left input pane.",
      },
      {
        "@type": "HowToStep",
        name: "Paste modified text",
        text: "Paste the revised or edited version into the right input pane.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust comparison rules",
        text: "Optionally toggle 'Ignore whitespace' or 'Ignore case' to eliminate superficial formatting differences.",
      },
      {
        "@type": "HowToStep",
        name: "Review highlighted differences",
        text: "Inspect the side-by-side visual breakdown showing added, removed, and changed lines.",
      },
      {
        "@type": "HowToStep",
        name: "Copy diff patch",
        text: "Click 'Copy Diff' to copy the unified diff patch text to your clipboard.",
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

export default function TextDiffCheckerPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <TextDiffCheckerTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a Text Diff Checker?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A <strong>Text Diff Checker</strong> is an essential developer and editorial tool designed
              to calculate the exact differences between two versions of text. First pioneered in computer
              science by the Unix <code>diff</code> utility in the early 1970s, text diffing is fundamental
              to modern version control systems (like Git), code review workflows, document redlining,
              and content audits.
            </p>
            <p>
              By breaking documents down into discrete lines and comparing their sequence, this tool
              identifies precisely what content was inserted (green), deleted (red), or substituted (amber).
              All computation happens strictly inside your browser, guaranteeing that sensitive legal
              agreements, proprietary source code, and confidential notes remain 100% private.
            </p>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Analysis Options" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Side-by-Side Visual Comparison",
                "Color-coded highlights show additions, removals, and modifications with synchronized line numbers.",
              ],
              [
                "Unified Diff Patch Generation",
                "Produce standard Unix-style patch text ready for export, bug tickets, and patch utilities.",
              ],
              [
                "Ignore Whitespace Toggle",
                "Trim leading and trailing spaces to prevent trivial indentation edits from cluttering your review.",
              ],
              [
                "Case-Insensitive Mode",
                "Compare text without regard to uppercase or lowercase differences when reviewing raw copy.",
              ],
              [
                "Granular Line Statistics",
                "Instant summary counters displaying total added, removed, changed, and identical line counts.",
              ],
              [
                "Automatic Line Ending Normalization",
                "Seamlessly handles mixed Windows (CRLF) and Unix (LF) line breaks without false mismatches.",
              ],
              [
                "One-Click Sample Loader",
                "Quickly load realistic source code and text revision samples to test features immediately.",
              ],
              [
                "Confidential Client Processing",
                "No cloud transmissions or telemetry. Proprietary code and private documents never leave your machine.",
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
          <PanelHeader eyebrow="Algorithm" title="How Text Diff Algorithms Work" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Most modern diff tools are based on the <strong>Longest Common Subsequence (LCS)</strong> problem
              and the seminal 1986 algorithm published by computer scientist Eugene W. Myers (<em>An O(ND)
              Difference Algorithm and Its Variations</em>). The algorithm models the comparison as a graph
              traversal where diagonal moves represent identical lines, vertical moves represent insertions,
              and horizontal moves represent deletions.
            </p>
            <p>
              The algorithm discovers the shortest edit script that transforms the original text into the
              modified text. By computing the minimal number of edits required, the diff output remains as
              concise and human-readable as possible.
            </p>
          </div>
        </ToolPanel>

        {/* Step-by-Step Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Compare Texts Effectively" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Input baseline text:</strong> Paste the original, unedited version of your document into the left pane.
            </li>
            <li>
              <strong>Input modified text:</strong> Paste the revised, updated version into the right pane.
            </li>
            <li>
              <strong>Configure filters:</strong> Toggle <em>Ignore whitespace</em> or <em>Ignore case</em> depending on
              whether indentation and capitalization are relevant to your audit.
            </li>
            <li>
              <strong>Inspect the visual diff:</strong> Review the color-coded output: green indicates new lines,
              red marks deleted lines, and amber indicates altered lines.
            </li>
            <li>
              <strong>Copy diff patch:</strong> Click <em>Copy Diff</em> to copy the standard unified diff output to your clipboard.
            </li>
          </ol>
        </ToolPanel>

        {/* Use Cases */}
        <ToolPanel>
          <PanelHeader eyebrow="Applications" title="Common Real-World Use Cases" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Source Code Reviews",
                "Review code snippets, configuration files, and script edits before staging or committing changes to Git repositories.",
              ],
              [
                "Legal & Contract Redlining",
                "Identify sneaky modifications, altered clause numbers, or removed obligations between successive contract drafts.",
              ],
              [
                "Content Editing & Copywriting",
                "Compare revised marketing copy, article drafts, or translations against the original publication to check editorial edits.",
              ],
              [
                "Configuration Drift Detection",
                "Compare staging and production environment variables (.env), Nginx configs, or server settings to locate discrepancies.",
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
            <PanelHeader eyebrow="Advantages" title="Benefits of This Diff Checker" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Instant real-time calculation without waiting for server responses.</li>
              <li>High-contrast visual indicators simplify spotting subtle line changes.</li>
              <li>Complete data privacy for proprietary code and sensitive legal contracts.</li>
              <li>Produces copyable unified diff patches compatible with Git and Unix.</li>
              <li>Eliminates false differences caused by Windows CRLF line endings.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Line-based diffing may not highlight sub-character shifts within long single-line files.</li>
              <li>Very large multi-megabyte files may take several seconds to compute in the browser.</li>
              <li>Does not support three-way merge resolution with common ancestor tracking.</li>
              <li>Does not parse binary files (images, compiled binaries, or PDFs).</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for Comparing Text" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Format minified code (like JSON or JS) before comparing to get meaningful line diffs.</li>
              <li>Use &quot;Ignore whitespace&quot; when reviewing re-indented code to focus on logic changes.</li>
              <li>Always verify line counts to ensure complete files were pasted without truncation.</li>
              <li>Save a copy of the generated diff patch for your audit trail or change logs.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Comparing single-line minified files where a single change alters 100% of the line.</li>
              <li>Forgetting that trailing spaces can cause lines to be marked as modified.</li>
              <li>Assuming text diff checkers evaluate semantic equivalence (e.g. <code>var a</code> vs <code>let a</code>).</li>
              <li>Pasting confidential text into third-party cloud tools when this local tool exists.</li>
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
          <PanelHeader eyebrow="More Tools" title="Related Text & Code Tools" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["Word & Character Counter", "/word-character-counter"],
              ["Case Converter", "/case-converter"],
              ["JSON Formatter", "/json-formatter"],
              ["YAML to JSON Converter", "/yaml-json-converter"],
              ["HTML to Markdown", "/html-to-markdown"],
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
          <PanelHeader eyebrow="Terms" title="Diff & Comparison Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Diff", "A display of data differences between two computer files or texts."],
              ["Unified Diff", "A standard format displaying contextual lines with + and - markers."],
              ["Patch", "A file containing a list of differences that can be applied to an original file."],
              ["Hunk", "A contiguous block of differing lines and their surrounding context."],
              ["LCS", "Longest Common Subsequence, the mathematical basis for diff algorithms."],
              ["Myers Algorithm", "The standard greedy O(ND) difference algorithm used by Git and diff utilities."],
              ["Insertion", "A line present in the modified text that did not exist in the original."],
              ["Deletion", "A line present in the original text that was removed in the modified version."],
              ["Substitution", "A line whose content was altered between the original and modified versions."],
              ["Context Lines", "Unchanged lines included before and after a change to locate where it belongs."],
              ["Line Ending", "Control characters marking the end of a line (CRLF on Windows, LF on Unix)."],
              ["Three-Way Diff", "A comparison between two modified files and their common ancestor."],
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
                href="https://www.gnu.org/software/diffutils/manual/diffutils.html"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                GNU Diffutils Manual: Comparing and Merging Files
              </a>
            </li>
            <li>
              <a
                href="https://git-scm.com/docs/git-diff"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Git SCM Documentation: git-diff
              </a>
            </li>
            <li>
              <a
                href="http://www.xmailserver.org/diff2.pdf"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Eugene W. Myers: An O(ND) Difference Algorithm and Its Variations (1986)
              </a>
            </li>
          </ul>
        </ToolPanel>

                <EducationalDisclaimerCard type="educational">
          <p>
            This Text Diff Checker performs line-level comparisons entirely in your web browser.
            While it identifies line insertions, deletions, and modifications accurately, it does not analyze programming
            language semantics, AST structures, or legal contract implications. Always review critical code changes and legal
            amendments carefully before publishing or executing.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
