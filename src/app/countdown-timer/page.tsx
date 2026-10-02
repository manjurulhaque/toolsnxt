import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { CountdownTimerTool } from "./countdown-timer-tool"

const pagePath = "/countdown-timer"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Countdown Timer | Free Online Duration Timer"
const pageDescription =
  "Use a free online countdown timer for breaks, study sessions, meetings, cooking, events, and deadlines. Set hours, minutes, seconds, presets, pause, resume, and reset."

const faqs = [
  {
    question: "What is a countdown timer?",
    answer:
      "A countdown timer measures remaining time from a chosen duration down to zero.",
  },
  {
    question: "How does this countdown work?",
    answer:
      "This page stores a duration in seconds and uses a browser interval to subtract one second while the timer is running.",
  },
  {
    question: "Does it count down to a calendar date?",
    answer:
      "No. This implementation is a duration timer with hours, minutes, and seconds, not a calendar date countdown.",
  },
  {
    question: "Does it work offline?",
    answer:
      "After the page loads, the timer logic runs in the browser. Offline availability depends on browser caching and site setup.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. It uses standard browser inputs and buttons, so support depends on the mobile browser.",
  },
  {
    question: "Can I pause the timer?",
    answer:
      "Yes. When the timer is running, the main button changes to Pause.",
  },
  {
    question: "Can I resume the timer?",
    answer:
      "Yes. After pausing, press Start again to continue from the remaining time.",
  },
  {
    question: "What happens when the timer reaches zero?",
    answer:
      "The timer stops at 00:00:00, shows Finished, and increases the Done count.",
  },
  {
    question: "Does the timer use my local time?",
    answer:
      "It does not use a date or time zone. It counts down a duration using browser timer callbacks.",
  },
  {
    question: "Is the timer accurate?",
    answer:
      "The display updates with a one-second interval, but browser scheduling, inactive tabs, and device load can affect visual update timing.",
  },
  {
    question: "Can I share my countdown?",
    answer:
      "No. This page does not implement URL sharing or copy/share controls.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. This is a free browser-based countdown timer.",
  },
  {
    question: "Why is my countdown different from another website?",
    answer:
      "Different tools may use different timing strategies, display rounding, target types, and background-tab behavior.",
  },
  {
    question: "Does daylight saving time affect this timer?",
    answer:
      "Not directly. This tool counts down a duration in seconds rather than calculating a target calendar date across time zones.",
  },
  {
    question: "Can I use it for events?",
    answer:
      "Yes, for duration-based event segments such as breaks, sessions, cooking periods, presentations, and timed activities.",
  },
  {
    question: "Is there a maximum countdown duration?",
    answer:
      "The UI accepts non-negative hour, minute, and second numbers. Extremely large values may be impractical in a browser tab.",
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
    about: ["Countdown Timer", "Online Countdown Timer", "Timer Online", "Live Countdown"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Countdown Timer",
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
    name: "Countdown Timer",
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
        name: "Countdown Timer",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the Countdown Timer",
    description: "Set and run a browser-based duration countdown.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose a duration",
        text: "Select a preset or enter hours, minutes, and seconds.",
      },
      {
        "@type": "HowToStep",
        name: "Set countdown",
        text: "Click Set Countdown to apply the current duration inputs.",
      },
      {
        "@type": "HowToStep",
        name: "Start timer",
        text: "Click Start to begin the countdown.",
      },
      {
        "@type": "HowToStep",
        name: "Pause or resume",
        text: "Use the same main button to pause and resume while time remains.",
      },
      {
        "@type": "HowToStep",
        name: "Reset",
        text: "Click Reset to return to the set duration.",
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

export default function CountdownTimerPage() {
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
          <CountdownTimerTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Countdown Timer?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A countdown timer measures the remaining time in a set duration and updates the
                display until it reaches zero. Students, professionals, event organizers, teachers,
                project managers, developers, and content creators use countdowns for breaks,
                focused work, meetings, presentations, cooking, live streams, and timed activities.
              </p>
              <p>
                This page is a duration-based countdown timer. It differs from a stopwatch, which
                counts elapsed time upward, and from a calendar countdown, which targets a specific
                date and time. Here, hours, minutes, and seconds are converted to total seconds.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How Countdown Timers Work" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Set duration", "Enter hours, minutes, and seconds or choose a 5, 10, 15, or 30 minute preset."],
                ["Apply countdown", "Set Countdown stores the current duration and resets the remaining time."],
                ["Start and pause", "The main button starts the timer, pauses while running, and resumes after a pause."],
                ["Update interval", "The implementation uses window.setInterval with a 1000 ms interval while running."],
                ["Reach zero", "At zero the timer stops, displays Finished, and increments the Done counter."],
                ["Reset", "Reset returns the remaining time to the stored Set For duration."],
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
                ["Browser-based countdown", "The timer runs in the browser with React state and browser timing callbacks."],
                ["Duration inputs", "Set hours, minutes, and seconds with number fields."],
                ["Preset buttons", "Quickly set 5, 10, 15, or 30 minute durations."],
                ["Live display", "Show remaining time as HH:MM:SS."],
                ["Progress ring", "A circular visual indicator fills based on elapsed fraction."],
                ["Pause and resume", "Pause while running and press Start to continue."],
                ["Reset", "Return to the stored duration."],
                ["Summary tiles", "Show Set For, Elapsed, and Done counts."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Countdown Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Duration-based", "Remaining time is calculated from stored seconds left, not from a selected calendar date."],
                ["Browser interval", "The countdown decrements by one second on each 1000 ms interval callback."],
                ["Visual timing", "Browser throttling, inactive tabs, device sleep, and busy main-thread work may delay visible updates."],
                ["No time zones", "Because this is not a date-target timer, time zones and daylight saving transitions are not directly calculated."],
                ["Document title", "The browser tab title updates with the current formatted time while the component is mounted."],
                ["Different tools", "Other countdown applications may use timestamps, Date objects, or high-resolution timing and display different rounding."],
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
                ["Study block", "Set 30 minutes for focused homework or exam practice."],
                ["Presentation", "Track a 10 minute talk or classroom activity."],
                ["Cooking", "Use a short duration for recipe steps that need timing."],
                ["Meeting break", "Run a 5 minute countdown before a meeting resumes."],
                ["Content workflow", "Time a recording segment, live-stream break, or production task."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use Countdown Timer" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose a preset or enter hours, minutes, and seconds.</li>
              <li>Click Set Countdown to apply the duration.</li>
              <li>Press Start to begin the countdown.</li>
              <li>Use Pause and Start to pause or resume while time remains.</li>
              <li>Use Reset to return to the stored duration, or Start Again after completion.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding Countdown Timers" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Countdown timers measure remaining time. Elapsed time is how much of the set
                duration has already passed; remaining time is how much is left. This page displays
                both concepts through the main clock, progress ring, and Elapsed summary tile.
              </p>
              <p>
                Browser timing APIs schedule callbacks, but they do not guarantee exact real-time
                execution every millisecond. Background tabs and busy pages may be throttled by the
                browser, which is why important events should be tested in advance.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Education", "Time classroom activities, quiz rounds, and study sessions."],
                ["Meetings", "Keep breaks, agenda sections, and presentations on schedule."],
                ["Personal productivity", "Run short focus blocks or reminders."],
                ["Sports and practice", "Time drills, rest periods, and training intervals."],
                ["Live streams", "Show a simple countdown during breaks or preparation periods."],
                ["Project work", "Create visible time boxes for small tasks and deadlines."],
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
                  <li>Use a simple browser-based timer without installing an app.</li>
                  <li>Start from presets or custom hours, minutes, and seconds.</li>
                  <li>Pause, resume, reset, and track completed countdowns.</li>
                  <li>Use the visual progress ring for quick status checks.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Browser timer callbacks can be delayed in inactive tabs or under heavy load.</li>
                  <li>Date picker, time picker, time zone conversion, sound, fullscreen, and sharing are not implemented.</li>
                  <li>Device sleep or closing the page interrupts the visible countdown.</li>
                  <li>Very long durations may be impractical to keep open in a browser tab.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Double-check the hours, minutes, and seconds before pressing Set Countdown.</li>
                  <li>Keep the page visible for the most reliable visual updates.</li>
                  <li>Test important countdown workflows in advance.</li>
                  <li>Use a dedicated alarm or calendar reminder for critical events.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Forgetting to click Set Countdown after changing inputs.</li>
                  <li>Entering minutes when hours were intended, or the reverse.</li>
                  <li>Expecting a duration timer to count down to a calendar date.</li>
                  <li>Expecting background tabs to update visually every second.</li>
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
                ["Stopwatch", "/stopwatch"],
                ["Pomodoro Timer", "/pomodoro-timer"],
                ["Interval Timer", "/interval-timer"],
                ["Time Zone Converter", "/timezone-converter"],
                ["Age Calculator", "/age-calculator"],
                ["Unit Converter", "/unit-converter"],
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
            <PanelHeader eyebrow="Glossary" title="Countdown Timer Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Countdown", "A timer that counts remaining time down toward zero."],
                ["Timer", "A tool that measures a set amount of time."],
                ["Stopwatch", "A tool that counts elapsed time upward from zero."],
                ["Time Zone", "A region or rule set for local civil time; not directly used by this duration timer."],
                ["UTC", "Coordinated Universal Time, a common reference for timekeeping."],
                ["Local Time", "The time shown by a device or location."],
                ["Duration", "An amount of time, such as 10 minutes or 1 hour."],
                ["Date", "A calendar day; this page does not target calendar dates."],
                ["Timestamp", "A numeric or textual representation of a specific instant in time."],
                ["Interval", "A repeated scheduled callback or a span between events."],
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
                  href="https://html.spec.whatwg.org/multipage/timers.html"
                  rel="noreferrer"
                >
                  WHATWG HTML Living Standard. Timers.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval"
                  rel="noreferrer"
                >
                  MDN Web Docs. Window setInterval.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout"
                  rel="noreferrer"
                >
                  MDN Web Docs. Window setTimeout.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://tc39.es/ecma262/#sec-date-objects"
                  rel="noreferrer"
                >
                  ECMAScript Language Specification. Date objects.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/TR/hr-time-3/"
                  rel="noreferrer"
                >
                  W3C. High Resolution Time.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This Countdown Timer calculates remaining time using the implemented duration-based
            countdown algorithm. Results depend on browser timer scheduling, page visibility,
            device behavior, and selected settings. Different applications may calculate or
            display countdowns differently. This tool is intended for educational, productivity,
            and planning purposes, not for safety-critical timing.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
