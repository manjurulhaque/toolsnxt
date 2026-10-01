import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { IntervalTimerTool } from "./interval-timer-tool"

const pagePath = "/interval-timer"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Interval Timer | Free Work and Rest Timer"
const pageDescription =
  "Use a free online interval timer for work and rest rounds. Set custom durations, choose Tabata, HIIT, Stretch, or Boxing presets, track progress, and start, pause, skip, or reset your session."

const faqs = [
  { question: "What is an interval timer?", answer: "An interval timer alternates timed phases. This tool alternates work and rest phases for a chosen number of rounds." },
  { question: "How does this Interval Timer work?", answer: "Set work and rest minutes and seconds, set the number of rounds, apply the intervals, and start the timer. After a work phase, the timer moves to rest when a rest duration is greater than zero." },
  { question: "Can I set custom work and rest intervals?", answer: "Yes. Enter whole-number minute and second values for both work and rest, then select Set Intervals." },
  { question: "Which presets are available?", answer: "The available presets are Tabata (20/10 for 8 rounds), HIIT (45/15 for 10 rounds), Stretch (30/10 for 6 rounds), and Boxing (180/60 for 3 rounds)." },
  { question: "Can I pause and resume the timer?", answer: "Yes. The Start button becomes Pause while the timer is running, and Start resumes the current timer state." },
  { question: "What does Skip do?", answer: "Skip advances the current phase using the same transition rules as the timer. It is disabled after the full session finishes." },
  { question: "What does Reset do?", answer: "Reset stops the timer and returns it to the first work round with the current configured work duration." },
  { question: "Can I use an interval timer without rest periods?", answer: "Yes. Set the rest duration to zero. After each work phase, the timer proceeds to the next work round until the session is complete." },
  { question: "How are completed and remaining rounds counted?", answer: "The page updates completed rounds as work/rest cycles advance and displays the remaining count from the configured total." },
  { question: "Does the timer play a sound or send notifications?", answer: "No. The implementation shows the phase, countdown, progress, and status on the page and updates the browser page title, but it has no sound or notification controls." },
  { question: "Will the timer stay exact in a background tab?", answer: "The page uses a browser interval with a one-second delay. Browsers can delay timer callbacks, especially in background tabs, so the visible countdown may not update at an exact one-second cadence." },
  { question: "Does the timer use my time zone?", answer: "No. This is a duration timer, not a date or time-zone converter. It counts the configured work and rest durations." },
  { question: "Can I use the Interval Timer on mobile?", answer: "Yes. The controls use standard browser inputs and buttons, though browser timing behavior can vary by device and browser state." },
  { question: "Is the Interval Timer free?", answer: "Yes. This is a free browser-based interval timer." },
  { question: "Are my intervals saved after I leave the page?", answer: "No persistence or saved-session feature is implemented. Reloading or leaving the page resets the current in-memory session." },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: ["Interval Timer", "Work Rest Timer", "HIIT Timer", "Tabata Timer"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Interval Timer",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Custom work duration",
      "Custom rest duration",
      "Custom round count",
      "Tabata, HIIT, Stretch, and Boxing presets",
      "Start and pause controls",
      "Skip phase control",
      "Reset control",
      "Work and rest progress display",
      "Completed and remaining round counts",
      "Page title countdown updates",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Interval Timer",
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
      { "@type": "ListItem", position: 2, name: "Interval Timer", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use an interval timer",
    description: "Set work, rest, and round values, then start the timer and monitor the current phase.",
    step: [
      { "@type": "HowToStep", name: "Set durations", text: "Enter work and rest minutes and seconds, or load a preset." },
      { "@type": "HowToStep", name: "Set rounds", text: "Enter the number of rounds and select Set Intervals." },
      { "@type": "HowToStep", name: "Start", text: "Use Start to begin the current work phase." },
      { "@type": "HowToStep", name: "Monitor", text: "Use Pause, Skip, or Reset as needed while checking the displayed phase and round." },
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

export default function IntervalTimerPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
        <IntervalTimerTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is an Interval Timer?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>An interval timer alternates between timed phases. This page uses work and rest phases, letting you set each duration, repeat them for a selected number of rounds, and follow the remaining time with a circular progress display.</p>
            <p>It can support exercise intervals, mobility breaks, rehearsals, classroom activities, and focused work routines. The timer is a scheduling aid; it does not provide training plans, medical guidance, sound cues, notifications, or saved sessions.</p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Features" title="Interval Timer Features" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Custom work duration", "Set whole-number work minutes and seconds."],
              ["Custom rest duration", "Set whole-number rest minutes and seconds, including zero rest."],
              ["Custom rounds", "Set the number of work rounds for the session."],
              ["Four presets", "Load Tabata, HIIT, Stretch, or Boxing durations and round counts."],
              ["Start and pause", "Start, pause, and resume the active interval."],
              ["Skip and reset", "Advance the current phase or return to the first work round."],
              ["Progress display", "View the current phase, remaining time, and circular progress indicator."],
              ["Session counts", "View completed rounds, remaining rounds, and a simple status."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p></div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How the Interval Timer Works" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>The page converts the entered whole-number minutes and seconds into durations. While running, it uses a browser interval with a one-second delay to reduce the remaining time. At the end of a work phase, a configured rest phase begins; when rest is zero, the next work round begins immediately.</p>
            <p>When the final configured round finishes, the timer stops at zero and shows Finished. The current countdown is also written into the browser page title while this tool is mounted.</p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Presets" title="Available Interval Presets" />
          <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr className="border-b border-[var(--ink-900)]/10"><th className="py-3 pr-4 font-semibold">Preset</th><th className="py-3 pr-4 font-semibold">Work</th><th className="py-3 pr-4 font-semibold">Rest</th><th className="py-3 font-semibold">Rounds</th></tr></thead><tbody className="text-[var(--ink-700)]">{[["Tabata", "00:20", "00:10", "8"], ["HIIT", "00:45", "00:15", "10"], ["Stretch", "00:30", "00:10", "6"], ["Boxing", "03:00", "01:00", "3"]].map(([preset, work, rest, rounds]) => <tr key={preset} className="border-b border-[var(--ink-900)]/8"><td className="py-3 pr-4 font-semibold text-[var(--ink-900)]">{preset}</td><td className="py-3 pr-4">{work}</td><td className="py-3 pr-4">{rest}</td><td className="py-3">{rounds}</td></tr>)}</tbody></table></div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the Interval Timer" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Enter work and rest minutes and seconds, or select a preset.</li><li>Set the number of rounds.</li><li>Select Set Intervals to apply the values and return to round one.</li><li>Use Start to begin the work phase.</li><li>Pause, skip, or reset the session when needed.</li></ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common Uses" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">{[
            ["Interval training", "Alternate exercise and recovery blocks using a duration that suits the session plan."],
            ["Mobility routine", "Use short work and rest intervals to structure a repeated stretching routine."],
            ["Rehearsal", "Time repeated practice blocks with planned pauses for review or reset."],
            ["Study breaks", "Create a short focus-and-break cycle when you prefer custom lengths to a fixed Pomodoro session."],
            ["Classroom activity", "Keep a repeated timed activity visible for students or participants."],
          ].map(([title, text]) => <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p></div>)}</div>
        </ToolPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel><PanelHeader eyebrow="Advantages" title="Benefits" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Customizes work, rest, and round values without a separate app.</li><li>Shows a clear active phase and remaining time.</li><li>Includes practical presets that can be adjusted after loading.</li><li>Provides pause, skip, and reset controls for changing sessions.</li><li>Uses a responsive browser interface.</li></ul></ToolPanel>
          <ToolPanel><PanelHeader eyebrow="Boundaries" title="Limitations" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Timer updates depend on browser interval callbacks and can be delayed in inactive tabs.</li><li>No audible alarm, browser notification, vibration, or fullscreen mode is implemented.</li><li>Sessions are not saved after a reload or navigation.</li><li>Inputs use non-negative whole-number values; fractional durations are not supported.</li><li>The tool provides timing only, not training, health, or productivity advice.</li></ul></ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel><PanelHeader eyebrow="Guidance" title="Tips for Best Results" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Set intervals before starting so the first work phase matches the intended routine.</li><li>Use a zero rest duration only when you want work rounds to follow one another.</li><li>Keep the timer visible during sessions where timing matters.</li><li>Test a preset before using it in a group, class, or training setting.</li><li>Plan any needed audio or accessibility cues outside this implementation.</li></ul></ToolPanel>
          <ToolPanel><PanelHeader eyebrow="Avoid" title="Common Mistakes" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li>Expecting a background browser tab to visibly update every second.</li><li>Changing input values without selecting Set Intervals to reset the current session.</li><li>Assuming a rest duration is required; zero rest proceeds to the next work round.</li><li>Using the timer as a replacement for a professionally designed exercise or medical plan.</li><li>Leaving the page and expecting the session state to persist.</li></ul></ToolPanel>
        </div>

        <ToolPanel><PanelHeader eyebrow="Questions" title="FAQ" /><div className="mt-6 grid gap-4">{faqs.map((faq) => <details key={faq.question} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{faq.answer}</p></details>)}</div></ToolPanel>

        <ToolPanel><PanelHeader eyebrow="More Tools" title="Related Tools" /><nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">{[["Stopwatch", "/stopwatch"], ["Countdown Timer", "/countdown-timer"], ["Pomodoro Timer", "/pomodoro-timer"], ["Time Zone Converter", "/timezone-converter"], ["Sleep Time Calculator", "/sleep-time-calculator"], ["QR Code Generator", "/qr-code-generator"]].map(([label, href]) => <Link key={href} href={href} className="rounded-[1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 transition hover:border-[var(--accent-rust)]/40">{label}</Link>)}</nav></ToolPanel>

        <ToolPanel><PanelHeader eyebrow="Terms" title="Glossary" /><div className="mt-6 grid gap-4 md:grid-cols-2">{[["Interval", "A timed period within a session."], ["Work Phase", "The active interval that begins each round in this tool."], ["Rest Phase", "The optional recovery interval after work."], ["Round", "One configured work phase and, when present, its following rest phase."], ["Duration", "The length of an interval, expressed here in minutes and seconds."], ["Countdown", "A display that decreases from a starting duration to zero."], ["Progress", "The portion of the active interval shown by the circular indicator."], ["Preset", "A stored combination of work, rest, and round values."], ["Pause", "Temporarily stops the countdown while retaining its current remaining time."], ["Browser Timer", "A scheduled callback, such as setInterval(), used to update a page over time."]].map(([term, definition]) => <div key={term}><h3 className="font-semibold">{term}</h3><p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">{definition}</p></div>)}</div></ToolPanel>

        <ToolPanel><PanelHeader eyebrow="Sources" title="References" /><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]"><li><a href="https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">WHATWG HTML Standard: Timers</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: Window.setInterval()</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: Page Visibility API</a></li></ul></ToolPanel>

                <EducationalDisclaimerCard type="educational">
          <p>
            This tool counts down work and rest durations using its implemented browser timer logic. Results can depend on browser scheduling and tab visibility. It is intended for general planning, study, rehearsal, and activity timing, and does not provide medical, fitness, or professional advice.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
