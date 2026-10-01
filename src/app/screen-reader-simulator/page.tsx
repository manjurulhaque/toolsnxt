import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ScreenReaderSimulatorTool } from "./screen-reader-simulator-tool"

const pagePath = "/screen-reader-simulator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Screen Reader Simulator | Test Accessibility & Reading Order Online"
const pageDescription =
  "Simulate screen reader linearized reading order, accessible names, landmark regions, and speech announcements from HTML markup online in your browser with zero server uploads."

const faqs = [
  {
    question: "What is a screen reader simulator?",
    answer:
      "A screen reader simulator models how assistive software (such as NVDA, JAWS, or VoiceOver) traverses a web page's underlying Accessibility Tree, announcing headings, landmarks, interactive buttons, form controls, and accessible names in linearized reading order.",
  },
  {
    question: "Does this simulator replace testing with real screen readers?",
    answer:
      "No. This simulator is a lightweight development aid designed to catch structural flaws, missing alt attributes, and broken accessible names during coding. Formal accessibility (WCAG) compliance audits must always be verified with genuine screen readers (such as NVDA on Windows or VoiceOver on macOS/iOS).",
  },
  {
    question: "How does the simulated speech output work?",
    answer:
      "The tool integrates with your web browser's native Web Speech API (window.speechSynthesis). It processes the linearized accessibility tokens sequentially and reads them aloud using your system's built-in text-to-speech voice engine.",
  },
  {
    question: "How are accessible names computed by this tool?",
    answer:
      "The tool uses a heuristic implementation of the W3C Accessible Name and Description Computation 1.1 specification. It prioritizes aria-labelledby, then aria-label, alt text on images, native label elements for form inputs, button text content, and title attributes.",
  },
  {
    question: "What are ARIA landmark roles and why are they important?",
    answer:
      "ARIA landmarks (such as banner, navigation, main, complementary, and contentinfo) correspond to semantic HTML5 tags (<header>, <nav>, <main>, <aside>, <footer>). Screen reader users rely on landmarks to bypass repetitive headers and jump directly to primary page content.",
  },
  {
    question: "Is my HTML markup uploaded to an external server?",
    answer:
      "No. All DOM parsing and analysis execute strictly in memory inside an isolated browser DOMParser sandbox. No HTML snippets, client data, or proprietary code are ever transmitted across the network.",
  },
  {
    question: "Why is heading hierarchy (H1 through H6) so crucial for screen readers?",
    answer:
      "Screen reader users frequently press hotkeys (like the 'H' key in NVDA or JAWS) to skim page sections by heading level. Skipping levels (e.g. jumping directly from H1 to H4) creates confusion about document structure and violates WCAG 2.2 Guideline 1.3.1.",
  },
  {
    question: "How should decorative images be coded for screen readers?",
    answer:
      "Decorative images that convey no informational content should have an empty alt attribute (alt='') or aria-hidden='true'. This explicitly instructs screen readers to skip the image rather than announcing the raw filename.",
  },
  {
    question: "What causes 'unlabeled button' announcements in screen readers?",
    answer:
      "Icon-only buttons (such as a search magnifying glass or hamburger menu icon without inner text) lack an accessible name if they don't include an aria-label, aria-labelledby, or visually hidden text span, causing screen readers to announce them as an uninformative 'button'.",
  },
  {
    question: "Can I test interactive elements like form inputs and selects?",
    answer:
      "Yes. The simulator extracts input types, placeholders, explicit label associations (<label for='id'>), aria-describedby hints, and required attributes to show how assistive tools announce forms.",
  },
  {
    question: "Can I copy the speech transcript?",
    answer:
      "Yes. Click 'Copy Transcript' to place the complete linearized announcement script onto your clipboard for documentation or accessibility bug reports.",
  },
  {
    question: "Does this tool work completely offline?",
    answer:
      "Yes. As an installable Progressive Web App utility, the simulator functions entirely offline without any active internet connection.",
  },
  {
    question: "What is the difference between visual order and DOM order?",
    answer:
      "CSS flexbox, grid, and absolute positioning can rearrange elements visually on screen while leaving their underlying DOM source code unchanged. Screen readers follow DOM order, which can cause severe disconnects if visual layout disagrees with tab order.",
  },
  {
    question: "Is the Screen Reader Simulator free to use?",
    answer:
      "Yes. It is completely free with no registration, no usage limits, and no advertising.",
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
      "Screen Reader Simulator",
      "Web Accessibility Testing",
      "WCAG 2.2",
      "ARIA Landmarks",
      "Accessible Name Computation",
      "Assistive Technology",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Screen Reader Simulator",
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
      "Linearized accessibility announcement tree generation",
      "W3C Accessible Name Computation simulation",
      "ARIA landmark and semantic HTML tag detection",
      "Integrated Web Speech API text-to-speech engine",
      "Audio playback controls (Play, Pause, Stop)",
      "Form label and input association inspection",
      "Copy transcript to clipboard",
      "100% private in-browser client execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Screen Reader Simulator",
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
        name: "Screen Reader Simulator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to simulate screen reader reading order and speech",
    description: "Step-by-step instructions for testing HTML accessibility and audio announcements.",
    step: [
      {
        "@type": "HowToStep",
        name: "Input HTML markup",
        text: "Paste your component markup, navigation menu, or page HTML into the simulator input area.",
      },
      {
        "@type": "HowToStep",
        name: "Inspect linearized reading order",
        text: "Review the sequence of parsed accessibility nodes showing role, level, and computed accessible name.",
      },
      {
        "@type": "HowToStep",
        name: "Listen to audio announcements",
        text: "Click 'Read Aloud' to listen to the synthesized speech output via the browser Web Speech API.",
      },
      {
        "@type": "HowToStep",
        name: "Identify accessibility issues",
        text: "Spot unlabeled buttons, skipped heading levels, and unassociated form inputs before deploying.",
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

export default function ScreenReaderSimulatorPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <ScreenReaderSimulatorTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a Screen Reader Simulator?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A <strong>Screen Reader Simulator</strong> models how assistive technologies—such as NVDA,
              JAWS, VoiceOver, and Orca—interpret and announce web content to visually impaired, blind,
              or neurodivergent users. Rather than relying on a visual 2D display, screen readers convert
              the browser&apos;s internal <strong>Accessibility Tree</strong> into linearized audio speech
              or refreshable Braille output.
            </p>
            <p>
              By parsing your raw HTML through a client-side DOM parser and computing accessible names
              according to W3C standards, this tool exposes the exact order in which elements are spoken.
              It empowers developers, QA testers, and accessibility auditors to rapidly catch missing alt
              text, unlabelled icon buttons, broken form labels, and disjointed reading orders before
              code reaches production.
            </p>
          </div>
        </ToolPanel>

        {/* Semantic HTML to Speech Mapping Table */}
        <ToolPanel>
          <PanelHeader eyebrow="Mapping" title="Semantic HTML to Speech Announcements" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10 text-[var(--ink-900)]">
                  <th className="py-3 pr-4 font-semibold">HTML5 Element</th>
                  <th className="py-3 pr-4 font-semibold">Implicit ARIA Role</th>
                  <th className="py-3 font-semibold">Sample Synthesized Announcement</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["<header>", "banner", "'Banner landmark'"],
                  ["<nav>", "navigation", "'Navigation landmark, Main menu'"],
                  ["<main>", "main", "'Main landmark'"],
                  ["<h1>Hello</h1>", "heading (level 1)", "'Heading level 1, Hello'"],
                  ["<button>Save</button>", "button", "'Save, button'"],
                  ["<a href='...'>Docs</a>", "link", "'Docs, link'"],
                  ["<input type='text'>", "textbox", "'Search query, edit text'"],
                  ["<img alt='Company logo'>", "img", "'Company logo, graphic'"],
                  ["<img alt=''>", "none / presentation", "[Skipped silently / decorative]"],
                  ["<aside>", "complementary", "'Complementary landmark'"],
                  ["<footer>", "contentinfo", "'Content information landmark'"],
                ].map(([elem, role, announcement]) => (
                  <tr key={elem} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-mono font-semibold text-[var(--ink-900)]">{elem}</td>
                    <td className="py-3 pr-4 font-mono text-xs">{role}</td>
                    <td className="py-3 font-mono text-xs text-[var(--accent-rust)]">{announcement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Inspection Tools" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Linearized Reading Sequence",
                "Displays the precise chronological order in which assistive tech navigates and speaks your markup.",
              ],
              [
                "Accessible Name Calculation",
                "Applies W3C precedence rules for aria-labelledby, aria-label, alt text, and element content.",
              ],
              [
                "Built-In Web Speech Synthesis",
                "Listen to realistic audio speech synthesized in real time via the browser's native window.speechSynthesis.",
              ],
              [
                "Interactive Audio Controls",
                "Play, pause, resume, and stop spoken announcements with synchronized visual highlighting.",
              ],
              [
                "ARIA Landmark Detection",
                "Validates structural page regions (<main>, <nav>, <header>, <aside>, <footer>) for keyboard navigation.",
              ],
              [
                "Copyable Speech Transcript",
                "Export clean text transcripts of spoken items for documentation, bug tracking, and compliance audits.",
              ],
              [
                "One-Click Component Presets",
                "Load realistic sample templates for navigation bars, checkout forms, dialogs, and cards.",
              ],
              [
                "100% Client-Side Sandbox",
                "Runs in an isolated in-memory DOM parser without executing external scripts or leaking code.",
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

        {/* How Accessible Name Computation Works */}
        <ToolPanel>
          <PanelHeader eyebrow="Specification" title="How W3C Accessible Name Computation Works" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Every interactive element must convey an <strong>accessible name</strong> so screen reader users
              understand what it does. The W3C specification determines accessible names using a strict hierarchy:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>aria-labelledby:</strong> Checks for IDs of other elements providing the label. Highest priority.
              </li>
              <li>
                <strong>aria-label:</strong> Reads the direct label attribute explicitly supplied on the element.
              </li>
              <li>
                <strong>Native Host Markup:</strong> Inspects associated <code>&lt;label for=&quot;id&quot;&gt;</code>,
                image <code>alt</code> attributes, or direct inner text content (for buttons and links).
              </li>
              <li>
                <strong>Fallback Attributes:</strong> Reads placeholder or title attributes if no higher-priority label exists.
              </li>
            </ol>
            <p>
              If an interactive element (such as <code>&lt;button&gt;&lt;svg&gt;...&lt;/svg&gt;&lt;/button&gt;</code>) has no
              text, no <code>aria-label</code>, and no <code>aria-labelledby</code>, its computed name is empty, creating an
              accessibility failure.
            </p>
          </div>
        </ToolPanel>

        {/* Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Audit Components for Accessibility" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Paste target HTML:</strong> Copy the HTML markup of your component, form, or article into the input editor.
            </li>
            <li>
              <strong>Inspect reading sequence:</strong> Check the parsed cards to ensure the order of announcements makes logical sense.
            </li>
            <li>
              <strong>Audit buttons and links:</strong> Verify that every link and button displays a meaningful computed name.
            </li>
            <li>
              <strong>Listen with speech synthesis:</strong> Click <em>Read Aloud</em> to hear how the text flows phonetically.
            </li>
            <li>
              <strong>Fix issues in source code:</strong> Add missing <code>alt</code> tags, correct heading levels, or add
              <code>aria-label</code> where necessary.
            </li>
          </ol>
        </ToolPanel>

        {/* Use Cases */}
        <ToolPanel>
          <PanelHeader eyebrow="Applications" title="Common Accessibility Testing Scenarios" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Icon-Only Buttons & Toolbars",
                "Audit search, menu, close (X), and social media icon buttons to ensure they have descriptive aria-label values.",
              ],
              [
                "Complex Checkout & Signup Forms",
                "Ensure form inputs, dropdowns, and checkboxes are properly tied to their descriptive text labels via <label for>.",
              ],
              [
                "Navigation & Header Menus",
                "Verify that top-level navigation, breadcrumbs, and footer links are organized within distinct landmark containers.",
              ],
              [
                "Card Grids & Teaser Modules",
                "Confirm that 'Read More' links include contextual accessible names so users know which article they will open.",
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
            <PanelHeader eyebrow="Advantages" title="Benefits of This Simulator" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Instant feedback during component development without installing desktop software.</li>
              <li>Simulates both visual linearized order and real auditory speech synthesis.</li>
              <li>Exposes hidden accessibility defects (empty names, missing alt text) immediately.</li>
              <li>Educates developers and design teams on how non-sighted users experience the web.</li>
              <li>100% private: internal UI prototypes and confidential mockups are never uploaded.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations vs Real Screen Readers" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Does not emulate screen reader virtual cursor navigation keystrokes (H, B, F, T).</li>
              <li>Cannot test live focus traps in interactive JavaScript modals or live regions (aria-live).</li>
              <li>Browser Web Speech voices sound slightly different than specialized JAWS or NVDA synthesizers.</li>
              <li>Formal compliance audits still require manual verification with real assistive devices.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for WCAG Compliance" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use native HTML5 semantic elements (&lt;button&gt;, &lt;a&gt;) instead of clickable &lt;div&gt; tags.</li>
              <li>Always maintain a strict sequential heading order (H1 &gt; H2 &gt; H3).</li>
              <li>Give distinct <code>aria-label</code> values when multiple &lt;nav&gt; landmarks exist on the same page.</li>
              <li>Ensure decorative graphics have <code>alt=&quot;&quot;</code> so they are ignored cleanly.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Accessibility Pitfalls" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Writing repetitive link text like &quot;click here&quot; or &quot;read more&quot; without context.</li>
              <li>Using <code>tabindex</code> greater than 0, which disrupts natural tab order.</li>
              <li>Overusing ARIA roles when native semantic HTML elements already exist (&quot;First rule of ARIA&quot;).</li>
              <li>Relying exclusively on color changes to convey status or validation errors.</li>
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
          <PanelHeader eyebrow="More Tools" title="Related Developer & Text Utilities" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["Meta Tag Generator", "/meta-tag-generator"],
              ["HTML to Markdown", "/html-to-markdown"],
              ["SVG Optimizer", "/svg-optimizer"],
              ["Text Diff Checker", "/text-diff-checker"],
              ["Word & Character Counter", "/word-character-counter"],
              ["Color Converter", "/color-converter"],
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
          <PanelHeader eyebrow="Terms" title="Web Accessibility Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Accessibility Tree", "A specialized browser object model mirroring the DOM, consumed by assistive technologies."],
              ["WCAG 2.2", "Web Content Accessibility Guidelines, the international standard for web accessibility."],
              ["ARIA", "Accessible Rich Internet Applications, a W3C specification adding semantics to web elements."],
              ["Accessible Name", "The programmatic label that identifies an element to assistive technology."],
              ["Landmark", "A major structural area of a web page allowing rapid keyboard navigation."],
              ["NVDA", "NonVisual Desktop Access, a popular free open-source screen reader for Windows."],
              ["VoiceOver", "The built-in screen reader software included across Apple macOS and iOS devices."],
              ["JAWS", "Job Access With Speech, a prominent commercial screen reader for Microsoft Windows."],
              ["Linearized Order", "The single sequential stream in which content is read aloud by screen readers."],
              ["Web Speech API", "W3C browser interface providing speech synthesis (text-to-speech) capabilities."],
              ["aria-label", "Attribute defining a direct string label for an interactive element."],
              ["aria-labelledby", "Attribute referencing IDs of other elements to construct an accessible name."],
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
                href="https://www.w3.org/TR/WCAG22/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                W3C Web Content Accessibility Guidelines (WCAG) 2.2
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/TR/wai-aria-1.2/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                W3C WAI-ARIA 1.2 Specification
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/TR/accname-1.1/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                W3C Accessible Name and Description Computation 1.1
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                MDN Web Docs: Web Speech API (SpeechSynthesis)
              </a>
            </li>
          </ul>
        </ToolPanel>

                <EducationalDisclaimerCard type="educational">
          <p>
            This Screen Reader Simulator models linearized reading order and accessible
            names using client-side heuristics and the browser Web Speech API. It is an engineering development tool
            and does not substitute for formal accessibility compliance testing with native assistive devices
            (such as NVDA, JAWS, or VoiceOver) or evaluation by users with disabilities.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
