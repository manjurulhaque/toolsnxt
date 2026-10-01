import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { TypingSpeedTestTool } from "./typing-speed-test-tool"

const pagePath = "/typing-speed-test"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Typing Speed Test | Test WPM, CPM & Accuracy Online"
const pageDescription =
  "Test your typing speed and accuracy with real-time WPM, CPM, and error metrics online in your browser. Practice with 30s, 60s, or 120s sessions with zero ads, registration, or tracking."

const faqs = [
  {
    question: "How is WPM (Words Per Minute) calculated?",
    answer:
      "In standard typing metrics, one word is defined as exactly 5 keystrokes (including letters, spaces, and punctuation). Gross WPM is calculated as (Total Keystrokes / 5) divided by time in minutes. Net WPM subtracts uncorrected errors to reflect true usable typing speed.",
  },
  {
    question: "What is the difference between Gross WPM and Net WPM?",
    answer:
      "Gross WPM measures raw typing speed regardless of mistakes. Net WPM subtracts the number of errors from the calculation: Net WPM = Gross WPM - (Errors / Minutes). Net WPM is the standard metric used in professional typing assessments.",
  },
  {
    question: "What is CPM (Characters Per Minute)?",
    answer:
      "CPM measures the total number of characters typed in one minute. Because it counts raw characters rather than standardized 5-letter words, it provides an exact keystroke frequency measurement.",
  },
  {
    question: "What is considered an average typing speed?",
    answer:
      "The average casual typing speed is approximately 38 to 42 WPM with 92% accuracy. Office professionals typically type between 50 and 70 WPM, while software engineers and transcriptionists frequently exceed 80 to 100+ WPM.",
  },
  {
    question: "What test durations are available in this tool?",
    answer:
      "You can choose between 30-second quick sprints, 60-second standard benchmarks (1 minute), and 120-second endurance tests (2 minutes) to practice sustained focus.",
  },
  {
    question: "Are my keystrokes recorded or sent to a server?",
    answer:
      "No. All keystroke timing and error calculations occur 100% locally in your browser memory. Nothing is ever recorded, logged, or transmitted across the network.",
  },
  {
    question: "How can I improve my typing speed quickly?",
    answer:
      "Master touch typing on the home row (ASDF JKL;) without looking at the keyboard, focus first on 98%+ accuracy rather than raw speed, maintain ergonomic wrist alignment, and practice in short daily sessions of 10-15 minutes.",
  },
  {
    question: "Does using the Backspace key lower my WPM?",
    answer:
      "Yes. Correcting errors requires extra keystrokes and halts your typing cadence. That is why maintaining high accuracy (over 96%) yields faster overall WPM than typing fast and constantly backspacing.",
  },
  {
    question: "What is the Home Row in touch typing?",
    answer:
      "The home row is the central horizontal line of letters on a QWERTY keyboard (A, S, D, F for the left hand; J, K, L, ; for the right hand). The index fingers rest on the F and J keys, which feature physical tactile bumps.",
  },
  {
    question: "Does keyboard type affect typing speed?",
    answer:
      "Yes. Mechanical switches with tactile feedback, scissor-switch laptop keyboards, and low-profile ergonomic boards can reduce finger fatigue and accidental keystrokes compared to mushy membrane keys.",
  },
  {
    question: "Can I use alternative keyboard layouts like Dvorak or Colemak?",
    answer:
      "Yes. The tool listens to standard browser input events, so if your operating system is configured for Dvorak, Colemak, or international layouts (AZERTY, QWERTZ), it works seamlessly.",
  },
  {
    question: "Does the typing speed test work on mobile devices?",
    answer:
      "Yes. While virtual on-screen touch keyboards result in slower WPM than physical keyboards, the tool fully supports mobile and tablet devices with external Bluetooth keyboards.",
  },
  {
    question: "Does this tool work completely offline?",
    answer:
      "Yes. As an installable Progressive Web App utility, the typing test operates with zero network connectivity once loaded in your browser.",
  },
  {
    question: "Is the Typing Speed Test free to use?",
    answer:
      "Yes. It is completely free with no registration, no paywalls, and no advertisements.",
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
      "Typing Speed Test",
      "WPM Test",
      "Words Per Minute",
      "Typing Accuracy",
      "Touch Typing Practice",
      "Keyboard Speed",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Typing Speed Test",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time Words Per Minute (WPM) calculation",
      "Characters Per Minute (CPM) metric",
      "Instant accuracy percentage indicator",
      "30-second, 60-second, and 120-second session timers",
      "Visual character-by-character highlight feedback",
      "Copy test summary to clipboard",
      "Zero keystroke logging or server storage",
      "100% private in-browser client execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Typing Speed Test",
    applicationCategory: "UtilityApplication",
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
        name: "Typing Speed Test",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to test your typing speed online",
    description: "Step-by-step instructions to benchmark your WPM and typing accuracy.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select session duration",
        text: "Choose 30 seconds for a quick sprint, 60 seconds for standard benchmark, or 120 seconds for endurance.",
      },
      {
        "@type": "HowToStep",
        name: "Begin typing",
        text: "Focus on the input field and begin typing the displayed prompt passage. The timer starts automatically upon your first keystroke.",
      },
      {
        "@type": "HowToStep",
        name: "Follow character highlights",
        text: "Observe the green highlights for correct letters and red for errors to maintain optimal accuracy.",
      },
      {
        "@type": "HowToStep",
        name: "Review results and share",
        text: "When time expires, review your WPM, accuracy %, and CPM score, or copy the summary.",
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

export default function TypingSpeedTestPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <TypingSpeedTestTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a Typing Speed Test?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A <strong>Typing Speed Test</strong> measures how rapidly and accurately you can translate
              visual text into physical keystrokes. In our digital-first economy, typing efficiency is directly
              correlated with personal productivity for programmers, writers, journalists, data entry specialists,
              and customer support agents.
            </p>
            <p>
              This browser-based typing trainer evaluates both your <strong>Words Per Minute (WPM)</strong> and
              <strong>Accuracy Percentage</strong> in real time. Because tests execute client-side with zero
              external tracking or ads, you can practice in a distraction-free, privacy-preserving environment.
            </p>
          </div>
        </ToolPanel>

        {/* Typing Benchmarks Table */}
        <ToolPanel>
          <PanelHeader eyebrow="Benchmarks" title="Typing Speed Tier Breakdown" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10 text-[var(--ink-900)]">
                  <th className="py-3 pr-4 font-semibold">Speed Tier</th>
                  <th className="py-3 pr-4 font-semibold">WPM Range</th>
                  <th className="py-3 pr-4 font-semibold">Accuracy Target</th>
                  <th className="py-3 font-semibold">Typical Profile</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["Beginner / Hunt & Peck", "10 - 25 WPM", "85% - 90%", "Casual computer users searching for keys visually."],
                  ["Average Typist", "35 - 45 WPM", "92% - 95%", "Most adults; sufficient for daily email and casual messaging."],
                  ["Productive Professional", "50 - 70 WPM", "95% - 98%", "Office workers, software engineers, and digital writers."],
                  ["Advanced / Touch Typist", "75 - 90 WPM", "98%+", "Professional typists, medical transcriptionists, paralegals."],
                  ["Elite Competitive", "100+ WPM", "99%+", "Competitive typists and stenographers in top 1% globally."],
                ].map(([tier, wpm, acc, desc]) => (
                  <tr key={tier} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-semibold text-[var(--ink-900)]">{tier}</td>
                    <td className="py-3 pr-4 font-mono font-medium">{wpm}</td>
                    <td className="py-3 pr-4 font-mono">{acc}</td>
                    <td className="py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Metrics" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Words Per Minute (WPM)",
                "Standardized 5-character word calculation updating continuously as you type.",
              ],
              [
                "Characters Per Minute (CPM)",
                "Precise raw keystroke throughput measurement for fine-grained progress tracking.",
              ],
              [
                "Real-Time Visual Highlighting",
                "Green characters confirm correct input while red highlights alert you to typos immediately.",
              ],
              [
                "Flexible Session Timers",
                "Choose 30-second rapid sprints, 60-second standard tests, or 120-second stamina tests.",
              ],
              [
                "Automatic Timer Activation",
                "The countdown starts automatically upon your very first keystroke—no awkward start buttons.",
              ],
              [
                "One-Click Results Sharing",
                "Easily copy your final WPM, accuracy, and error counts to challenge friends or colleagues.",
              ],
              [
                "Realistic Literary Prompts",
                "Diverse prose passages featuring real-world punctuation, capital letters, and sentence rhythm.",
              ],
              [
                "100% Client-Side Privacy",
                "Zero keystroke logging, analytics tracking, or external database storage of your text.",
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

        {/* Scientific Method */}
        <ToolPanel>
          <PanelHeader eyebrow="Measurement" title="How Typing Speed Is Measured Scientifically" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Since words vary dramatically in length (compare <em>&quot;a&quot;</em> to <em>&quot;internationalization&quot;</em>),
              standard typing tests normalize word count by defining <strong>1 word = 5 keystrokes</strong>
              (including spaces and punctuation).
            </p>
            <p>
              The formula for Gross WPM is:
            </p>
            <div className="rounded-xl border border-[var(--ink-900)]/10 bg-white p-4 font-mono text-sm text-[var(--ink-900)]">
              Gross WPM = (Total Typed Characters / 5) / (Elapsed Seconds / 60)
            </div>
            <p>
              Accuracy represents the ratio of correct keystrokes to total attempted keystrokes:
            </p>
            <div className="rounded-xl border border-[var(--ink-900)]/10 bg-white p-4 font-mono text-sm text-[var(--ink-900)]">
              Accuracy % = (Correct Characters / Total Typed Characters) * 100
            </div>
          </div>
        </ToolPanel>

        {/* Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="Step-by-Step Testing Guide" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Select duration:</strong> Choose 30, 60, or 120 seconds based on your training goal.
            </li>
            <li>
              <strong>Position your hands:</strong> Place your left fingers on A-S-D-F and right fingers on J-K-L-;
              with index fingers feeling the bumps on F and J.
            </li>
            <li>
              <strong>Start typing:</strong> Click into the input box and begin typing. The timer triggers automatically.
            </li>
            <li>
              <strong>Focus on flow:</strong> Keep your eyes on the prompt text and maintain a steady, continuous rhythm.
            </li>
            <li>
              <strong>Review your stats:</strong> When time expires, review your WPM, accuracy, and copy your score.
            </li>
          </ol>
        </ToolPanel>

        {/* Benefits vs Limitations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits of High Typing Speed" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Saves hours of work each week for writers, coders, and administrators.</li>
              <li>Allows you to keep up with your internal thoughts without mental buffering.</li>
              <li>Reduces physical neck strain by eliminating constant keyboard looking.</li>
              <li>Improves real-time communication speed in team chats (Slack, Teams).</li>
              <li>Boosts confidence during live technical interviews and pair programming.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Typing speed on synthetic passages does not guarantee writing quality.</li>
              <li>Programming involves syntax symbols that may require specialized symbol practice.</li>
              <li>Virtual mobile touchscreens yield significantly lower WPM than physical keyboards.</li>
              <li>Over-practicing without proper wrist ergonomics can cause repetitive strain injury (RSI).</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips to Increase WPM" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Prioritize 98% accuracy first; speed naturally accelerates as muscle memory solidifies.</li>
              <li>Never look down at your fingers—force your brain to build spatial key awareness.</li>
              <li>Keep your wrists elevated and float your hands above the keyboard.</li>
              <li>Use the correct finger for each key rather than reaching with favored fingers.</li>
              <li>Practice consistently for 10 minutes every day rather than 2 hours once a week.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Pitfalls to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Rushing through words and generating bursts of errors that require backspacing.</li>
              <li>Resting wrists on hard desk surfaces, which compresses carpal nerves.</li>
              <li>Using only 2 or 3 fingers (&quot;hunt and peck&quot;) which imposes a hard 50 WPM ceiling.</li>
              <li>Tensing shoulder and forearm muscles during high-speed typing bursts.</li>
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
          <PanelHeader eyebrow="More Tools" title="Related Focus & Text Utilities" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["Word & Character Counter", "/word-character-counter"],
              ["Pomodoro Timer", "/pomodoro-timer"],
              ["Stopwatch", "/stopwatch"],
              ["Interval Timer", "/interval-timer"],
              ["Case Converter", "/case-converter"],
              ["Lorem Ipsum Generator", "/lorem-ipsum-generator"],
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
          <PanelHeader eyebrow="Terms" title="Typing Terminology Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["WPM", "Words Per Minute, calculated as (Characters / 5) / Minutes."],
              ["Gross WPM", "Total raw typing speed without deductions for errors."],
              ["Net WPM", "Effective typing speed taking uncorrected errors into account."],
              ["CPM", "Characters Per Minute, the total number of characters entered per minute."],
              ["Touch Typing", "Typing without using the sense of sight, relying purely on muscle memory."],
              ["Home Row", "The base row of keys (ASDF JKL;) where fingers rest."],
              ["QWERTY", "The standard typewriter keyboard layout developed in the 1870s by Christopher Sholes."],
              ["Dvorak", "An ergonomic keyboard layout designed by August Dvorak to minimize finger movement."],
              ["Colemak", "A modern ergonomic keyboard layout maintaining common shortcuts like Ctrl+C and Ctrl+V."],
              ["Tactile Bump", "Small physical ridges on F and J keys allowing blind finger orientation."],
              ["Cadence", "The steady, rhythmic interval between consecutive keystrokes."],
              ["RSI", "Repetitive Strain Injury, pain in tendons or muscles from repetitive awkward motions."],
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
          <PanelHeader eyebrow="Sources" title="Ergonomics & Typing References" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <a
                href="https://www.osha.gov/etools/computer-workstations/components/keyboards"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                OSHA: Computer Workstations - Keyboards &amp; Ergonomics
              </a>
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Words_per_minute"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Wikipedia: Words Per Minute Measurement Standardization
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/niosh/topics/ergonomics/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                CDC / NIOSH: Ergonomics and Musculoskeletal Disorders
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This Typing Speed Test is intended for personal skill benchmarking and practice.
          Results reflect typing performance on general prose passages using your current browser and keyboard hardware.
          Do not continue typing if you experience wrist or hand pain; practice healthy workstation ergonomics.
        </InfoBox>
      </section>
    </main>
  )
}
