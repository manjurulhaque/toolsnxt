import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PomodoroTool } from "./pomodoro-tool"

const pagePath = "/pomodoro-timer"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Pomodoro Timer | Free Online Focus Timer"
const pageDescription =
  "Use a free online Pomodoro timer with 25-minute focus sessions, 5-minute short breaks, 15-minute long breaks, progress tracking, and reset controls."

const faqs = [
  {
    question: "What is the Pomodoro Technique?",
    answer:
      "The Pomodoro Technique is a time-management method created by Francesco Cirillo that uses timed focus sessions followed by planned breaks.",
  },
  {
    question: "Why is it called Pomodoro?",
    answer:
      "Pomodoro means tomato in Italian. Cirillo named the method after the tomato-shaped kitchen timer he used as a student.",
  },
  {
    question: "How long is one Pomodoro?",
    answer:
      "A traditional Pomodoro is 25 minutes of focused work. This timer uses a 25-minute Focus mode.",
  },
  {
    question: "How many Pomodoros should I complete each day?",
    answer:
      "There is no universal target. Start with a few focused sessions, track what you complete, and adjust based on workload and energy.",
  },
  {
    question: "Can I customize the timer?",
    answer:
      "This implementation uses fixed modes: 25-minute Focus, 5-minute Short Break, and 15-minute Long Break.",
  },
  {
    question: "Are 25-minute sessions required?",
    answer:
      "The traditional method uses 25 minutes, but different people adapt work intervals. This page's timer keeps the classic 25-minute focus default.",
  },
  {
    question: "Does the Pomodoro Technique improve productivity?",
    answer:
      "It can support productivity by encouraging single-task focus, planned breaks, and progress tracking, but results vary by person and task.",
  },
  {
    question: "Is it useful for studying?",
    answer:
      "Yes, many students use Pomodoro sessions to make studying more structured and to avoid long, unfocused sessions.",
  },
  {
    question: "Can I use it for programming?",
    answer:
      "Yes. It can work for coding, debugging, writing documentation, or review tasks, especially when you define a clear goal first.",
  },
  {
    question: "Should I take every break?",
    answer:
      "Taking breaks is part of the method. Breaks help separate work intervals and reduce the temptation to push through fatigue.",
  },
  {
    question: "What happens if I get interrupted?",
    answer:
      "A practical approach is to note the interruption, decide whether it must be handled now, and restart or resume your focus plan intentionally.",
  },
  {
    question: "Is this timer free?",
    answer:
      "Yes. This page provides a free browser-based Pomodoro timer.",
  },
  {
    question: "Can I use it on mobile devices?",
    answer:
      "Yes, the timer is browser-based and uses responsive page layout, though exact behavior may vary by mobile browser.",
  },
  {
    question: "Does the timer continue when the browser is minimized?",
    answer:
      "The timer uses browser interval timing. Background-tab behavior can vary because browsers may throttle timers to save power.",
  },
  {
    question: "Does this timer have sound or notifications?",
    answer:
      "No. The current implementation changes sessions automatically and updates the page title, but it does not include sound or browser notifications.",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pomodoro Timer",
    applicationCategory: "ProductivityApplication",
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
    name: "Pomodoro Timer",
    applicationCategory: "ProductivityApplication",
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
        name: "Pomodoro Timer",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use a Pomodoro timer",
    description: "Use timed focus sessions and breaks to structure work.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose a task",
        text: "Pick one clear task to work on during the focus session.",
      },
      {
        "@type": "HowToStep",
        name: "Start the focus timer",
        text: "Use the 25-minute Focus mode and press Start.",
      },
      {
        "@type": "HowToStep",
        name: "Take a break",
        text: "When a focus session ends, take the short or long break shown by the timer.",
      },
      {
        "@type": "HowToStep",
        name: "Repeat and track",
        text: "Repeat sessions and use the Focus Done, Round, and Next Long Break counters for progress.",
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

export default function PomodoroTimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
          <PomodoroTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is the Pomodoro Technique?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The Pomodoro Technique is a time-management method created by Francesco Cirillo in
                the late 1980s. It uses short, timed work intervals to make focus concrete and to
                separate work from rest.
              </p>
              <p>
                The name comes from the tomato-shaped kitchen timer Cirillo used as a student. A
                traditional workflow is simple: choose one task, work for 25 minutes, take a short
                break, repeat four times, then take a longer break.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Timer Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Focus mode", "Runs a 25-minute countdown for focused work."],
                ["Break modes", "Short Break is 5 minutes and Long Break is 15 minutes."],
                ["Session flow", "Every completed focus session increments the counter; every fourth focus leads to a long break."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
              The timer includes manual mode buttons, Start/Pause, Reset, a circular progress
              indicator, Focus Done, Round, Next Long Break, and a browser tab title that updates
              with the remaining time. It does not include sound alerts, browser notifications,
              auto-start settings, or custom durations.
            </p>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Workflow" title="Standard Pomodoro Workflow" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose a specific task.</li>
              <li>Work for 25 minutes without multitasking.</li>
              <li>Take a 5-minute short break.</li>
              <li>Repeat until you complete four Pomodoros.</li>
              <li>Take a longer break, often 15 to 30 minutes in the traditional method.</li>
            </ol>
            <InfoBox className="mt-5">
              This timer uses a 15-minute long break after every fourth completed focus session.
            </InfoBox>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Productivity Session" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>Task: write a project report.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Focus: 25 minutes.</li>
                <li>Short Break: 5 minutes.</li>
                <li>Repeat the Focus and Short Break pattern three more times.</li>
                <li>After the fourth Focus session, take the 15-minute Long Break.</li>
              </ol>
              <InfoBox>
                This structure keeps each work block small enough to start, while scheduled breaks
                give you a clear place to pause, reset, and decide what to do next.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Pomodoro Timer" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose one task before starting.</li>
              <li>Confirm Focus mode is selected, or select another mode manually.</li>
              <li>Click Start and work until the countdown ends.</li>
              <li>Use Pause if you need to stop temporarily, or Reset to restart the current mode.</li>
              <li>Take the break mode shown after a completed focus session.</li>
              <li>Repeat until your work session is complete.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Understanding the Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Remaining time</strong>
                The large countdown shows minutes and seconds left in the current mode.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Current session</strong>
                The mode label shows Focus, Short Break, or Long Break.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Session counter</strong>
                Focus Done counts completed focus sessions.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Round</strong>
                Shows where you are in the four-focus cycle before a long break.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Progress indicator</strong>
                The circular ring fills as the current timer mode progresses.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Browser title</strong>
                The page title updates with the remaining time and current mode while the page is open.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Benefits" title="Benefits of the Pomodoro Method" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Encourages single-task focus for a defined period.</li>
              <li>Makes large tasks feel smaller and easier to begin.</li>
              <li>Creates planned breaks instead of accidental distraction.</li>
              <li>Helps track effort through completed focus sessions.</li>
              <li>Supports better task estimation over repeated sessions.</li>
              <li>Can reduce procrastination by lowering the commitment needed to start.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Tips" title="Productivity Tips and Common Mistakes" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Productivity Tips</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Plan your task before starting the timer.</li>
                  <li>Silence unnecessary notifications.</li>
                  <li>Work on one task at a time.</li>
                  <li>Take breaks away from the screen when possible.</li>
                  <li>Review completed focus sessions at the end.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Skipping breaks repeatedly.</li>
                  <li>Restarting the timer whenever focus feels imperfect.</li>
                  <li>Multitasking during a focus session.</li>
                  <li>Choosing a task that is too large or vague.</li>
                  <li>Ignoring interruptions instead of recording or handling them intentionally.</li>
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/countdown-timer">
                Countdown Timer
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/stopwatch">
                Stopwatch
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/interval-timer">
                Interval Timer
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Key Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Pomodoro", "One focused work interval in the Pomodoro Technique."],
                ["Focus Session", "A timed block for one task, 25 minutes in this timer."],
                ["Short Break", "A brief 5-minute reset after a focus session."],
                ["Long Break", "A longer 15-minute break after every fourth completed focus session in this timer."],
                ["Productivity", "Making useful progress on important work with available time and attention."],
                ["Time Blocking", "Scheduling a defined block of time for a task or activity."],
                ["Deep Work", "Focused, distraction-reduced work on a cognitively demanding task."],
                ["Task Batching", "Grouping similar tasks so you switch context less often."],
                ["Session Counter", "A count of completed focus sessions."],
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
                  href="https://www.pomodorotechnique.com/"
                >
                  Francesco Cirillo. The Pomodoro Technique official resources.
                </a>
              </li>
              <li>
                Cirillo F. <em>The Pomodoro Technique.</em> Official guide by the creator of the
                method.
              </li>
              <li>
                Biwer F, Wiradhany W, oude Egbrink MGA, de Bruin ABH. Understanding effort
                regulation: Comparing Pomodoro breaks and self-regulated breaks. <em>British Journal
                of Educational Psychology.</em> 2023.
              </li>
              <li>
                Ariga A, Lleras A. Brief and rare mental breaks keep you focused: Deactivation and
                reactivation of task goals preempt vigilance decrements. <em>Cognition.</em> 2011.
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This Pomodoro timer is a productivity aid for informational and personal use. Results
              vary depending on task type, work habits, environment, energy, and preferences. It is
              not a substitute for professional medical, psychological, ergonomic, or occupational
              advice.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
