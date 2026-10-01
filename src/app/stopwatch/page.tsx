import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { StopwatchTool } from "./stopwatch-tool"

const pagePath = "/stopwatch"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Online Stopwatch | Free Stopwatch with Laps"
const pageDescription =
  "Use a free online stopwatch with start, pause, resume, reset, centisecond display, and lap splits. Measures elapsed time in your browser with performance.now()."

const faqs = [
  { question: "What is a stopwatch?", answer: "A stopwatch measures elapsed time from a starting point until it is paused, stopped, or reset." },
  { question: "How does this online stopwatch work?", answer: "It stores accumulated elapsed time, uses performance.now() while running, and refreshes the display with a 33 ms interval." },
  { question: "How do I use this stopwatch?", answer: "Press Start, pause when needed, resume to continue, use Lap for intermediate measurements, and Reset to return to zero." },
  { question: "Can I pause the stopwatch?", answer: "Yes. The main button changes to Pause while running and preserves the accumulated elapsed time." },
  { question: "Can I resume the stopwatch?", answer: "Yes. After pausing, the main button changes to Resume and continues from the saved elapsed time." },
  { question: "Can I reset the stopwatch?", answer: "Yes. Reset returns elapsed time to zero, stops the stopwatch, and clears recorded laps." },
  { question: "Does the stopwatch show milliseconds?", answer: "It displays minutes, seconds, and centiseconds in MM:SS.cc format. Display precision is not the same as guaranteed timing accuracy." },
  { question: "Does the stopwatch support laps?", answer: "Yes. The Lap button records the current total elapsed time and a split duration since the previous lap." },
  { question: "What is the difference between a lap and a split?", answer: "In this implementation, Total shows cumulative elapsed time and Split shows the duration since the previous recorded lap." },
  { question: "How accurate is an online stopwatch?", answer: "Browser stopwatches are useful for everyday timing, but browser scheduling, device load, and display updates prevent hard real-time guarantees." },
  { question: "Does it work in a background tab?", answer: "The page does not add special background-tab handling. Browsers may throttle timer callbacks in inactive tabs." },
  { question: "Why can browser timers drift?", answer: "Timer callbacks can run later than requested because of event-loop work, browser scheduling, operating-system scheduling, and background throttling." },
  { question: "Does displaying centiseconds mean centisecond accuracy?", answer: "No. The display format shows centiseconds, but display precision does not guarantee equivalent measurement accuracy." },
  { question: "Is an online stopwatch suitable for scientific measurements?", answer: "Use certified timing equipment for strict scientific, industrial, safety, legal, or competition timing requirements." },
  { question: "What is the difference between a stopwatch and a timer?", answer: "A stopwatch measures elapsed time from zero. A timer counts toward or away from a configured duration." },
  { question: "Does the stopwatch store my timing data?", answer: "Lap records are kept in the current tab state only. The page does not intentionally upload or persist lap data." },
  { question: "Is this stopwatch free?", answer: "Yes. This is a free browser-based stopwatch." },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: ["Stopwatch", "Online Stopwatch", "Elapsed Time", "Lap Timing"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stopwatch",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Start stopwatch",
      "Pause stopwatch",
      "Resume stopwatch",
      "Reset stopwatch",
      "Lap recording",
      "Split duration display",
      "Centisecond display",
      "Fastest and slowest split labels",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stopwatch",
    applicationCategory: "UtilitiesApplication",
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
      { "@type": "ListItem", position: 2, name: "Stopwatch", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the online stopwatch",
    description: "Measure elapsed time with start, pause, resume, reset, and lap controls.",
    step: [
      { "@type": "HowToStep", name: "Start", text: "Press Start to begin measuring elapsed time." },
      { "@type": "HowToStep", name: "Pause or resume", text: "Press Pause to stop active timing or Resume to continue from the saved elapsed time." },
      { "@type": "HowToStep", name: "Record laps", text: "Press Lap to record the current total elapsed time and split duration." },
      { "@type": "HowToStep", name: "Reset", text: "Press Reset to return to zero and clear lap records." },
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

export default function StopwatchPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <StopwatchTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a Stopwatch?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A stopwatch measures elapsed time from a starting event to a stopping or paused
              state. This online stopwatch provides a browser-based running clock with start,
              pause, resume, reset, and lap controls. It is useful for workouts, practice rounds,
              classroom activities, debugging tasks, cooking prep, and everyday timing.
            </p>
            <p>
              The stopwatch separates elapsed-time measurement from display updates. The UI refreshes
              periodically, but elapsed time is calculated from timestamps rather than by assuming
              every refresh callback arrives exactly on schedule.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Timing" title="Stopwatch Accuracy and Implementation" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              This implementation uses performance.now() when the stopwatch is running. On start or
              resume, it stores a start timestamp; on pause, it saves the accumulated elapsed time.
              A 33 ms setInterval callback updates the visible display using saved elapsed time plus
              the current performance.now() difference.
            </p>
            <p>
              The display format is MM:SS.cc, where cc is centiseconds. That precision describes
              the displayed value, not a guarantee that the browser can provide certified
              centisecond measurement accuracy under all conditions.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Controls" title="How the Stopwatch Works" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Start", "Begins elapsed-time measurement from zero or from the saved paused duration."],
              ["Pause", "Stops active timing while preserving the current accumulated elapsed time."],
              ["Resume", "Continues timing from the preserved elapsed time after a pause."],
              ["Reset", "Stops the stopwatch, returns elapsed time to 00:00.00, and clears laps."],
              ["Lap", "Records the current total elapsed time and a split from the previous recorded lap."],
              ["Laps list", "Shows newest laps first, with fastest and slowest split colors after at least two laps."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the Stopwatch" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Press Start to begin measuring elapsed time.</li>
            <li>Press Lap to record an intermediate total and split duration.</li>
            <li>Press Pause when you want to stop active timing without clearing the time.</li>
            <li>Press Resume to continue from the saved elapsed time.</li>
            <li>Press Reset to return to zero and clear lap records.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Concepts" title="Stopwatch vs Timer vs Clock" />
          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold">Stopwatch</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Measures elapsed duration from a starting point. This page is a stopwatch.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Timer</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Counts toward or away from a configured duration. A countdown timer is a different
                timing tool.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Clock</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Shows time of day. A stopwatch measures a duration instead of displaying wall-clock
                time.
              </p>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Browser Behavior" title="Timing, Drift, and Background Tabs" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Browser timers such as setInterval request callbacks after a delay, but callbacks can
              run later than requested because of the JavaScript event loop, main-thread work,
              operating-system scheduling, browser policies, and device performance. This is why
              display refresh frequency should not be treated as timing accuracy.
            </p>
            <p>
              The page does not register Page Visibility handlers or special background-tab
              synchronization. Browsers may throttle inactive tabs, so visual updates may become
              less frequent when the tab is hidden or the device is conserving power.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common Stopwatch Use Cases" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Exercise and training", "Measure running segments, repetitions, rest periods, or practice rounds."],
              ["Study and focus", "Track how long a study session, writing session, or task actually takes."],
              ["Experiments", "Measure elapsed duration during simple classroom or hobby experiments."],
              ["Development and testing", "Time manual workflows, demos, QA checks, or rough debugging steps."],
              ["Everyday tasks", "Measure cooking prep, chores, meetings, games, or personal routines."],
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
              <li>Immediate browser access with no physical stopwatch required.</li>
              <li>Simple start, pause, resume, reset, and lap workflow.</li>
              <li>Centisecond display for everyday timing readability.</li>
              <li>Lap splits help compare intermediate segments.</li>
              <li>Responsive layout works across supported desktop and mobile browsers.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Browser scheduling is not hard real-time timing.</li>
              <li>Background tabs may update less frequently because browsers throttle timers.</li>
              <li>Display precision does not guarantee certified centisecond accuracy.</li>
              <li>Lap data is not copied, downloaded, or persisted by this implementation.</li>
              <li>Use certified equipment for strict scientific, industrial, legal, or competition timing.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Accurate Timing" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Keep the tab active when continuous visual updates matter.</li>
              <li>Avoid heavy browser work during precision-sensitive timing.</li>
              <li>Use Lap for intermediate measurements rather than pausing the stopwatch.</li>
              <li>Reset before starting a separate timing session.</li>
              <li>Use dedicated timing equipment when certified precision is required.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Assuming a 33 ms update interval means guaranteed 33 ms accuracy.</li>
              <li>Confusing displayed centiseconds with guaranteed centisecond accuracy.</li>
              <li>Leaving the stopwatch running unintentionally.</li>
              <li>Confusing a stopwatch with a countdown timer or clock.</li>
              <li>Expecting background tabs to refresh as often as active tabs.</li>
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
              ["Countdown Timer", "/countdown-timer"],
              ["Pomodoro Timer", "/pomodoro-timer"],
              ["Interval Timer", "/interval-timer"],
              ["Time Zone Converter", "/timezone-converter"],
              ["Age Calculator", "/age-calculator"],
              ["Unit Converter", "/unit-converter"],
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
              ["Stopwatch", "A tool that measures elapsed time from a starting point."],
              ["Elapsed Time", "The duration that has passed since timing began, excluding paused time in this implementation."],
              ["Timer", "A tool that counts toward or away from a configured duration."],
              ["Clock", "A tool that displays the current time of day."],
              ["Lap", "A recorded intermediate measurement in the stopwatch session."],
              ["Split", "The duration between the previous recorded lap and the current lap on this page."],
              ["Precision", "The granularity shown by the display, such as centiseconds."],
              ["Accuracy", "How close the measured duration is to the actual elapsed duration."],
              ["Timer Drift", "Timing error that can occur when callbacks run later than expected."],
              ["setInterval", "A browser API that repeatedly schedules callbacks after a requested delay."],
              ["performance.now", "A browser timing API that returns a monotonic high-resolution timestamp."],
              ["Background Tab", "A browser tab that is inactive or hidden and may receive fewer timer callbacks."],
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
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: performance.now()
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/High_precision_timing" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: High precision timing
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: setInterval()
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: Page Visibility API
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This stopwatch measures elapsed time using its implemented
          browser-based timing mechanism. Display precision does not guarantee certified
          measurement accuracy. Browser scheduling, background-tab behavior, operating-system
          scheduling, device performance, and main-thread workload can affect visual updates and
          timing behavior. Use certified timing equipment where strict precision is required.
        </InfoBox>
      </section>
    </main>
  )
}
