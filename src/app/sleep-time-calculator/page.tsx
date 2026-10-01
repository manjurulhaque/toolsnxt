import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { SleepTimeTool } from "./sleep-time-tool"

const pagePath = "/sleep-time-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Sleep Time Calculator | Bedtime and Wake-Up Times"
const pageDescription =
  "Plan bedtimes or wake-up times from 90-minute sleep cycles with adjustable minutes to fall asleep and 3 to 6 cycle options."

const faqs = [
  {
    question: "What is a sleep cycle?",
    answer:
      "A sleep cycle is a repeating pattern of non-REM and REM sleep stages that occurs several times during a night's sleep.",
  },
  {
    question: "How long is one sleep cycle?",
    answer:
      "This calculator uses 90 minutes per cycle. Sleep cycles vary between people, and NIH notes that cycles often restart every 80 to 100 minutes.",
  },
  {
    question: "How many sleep cycles do adults need?",
    answer:
      "Many adults feel best with enough sleep for about 5 to 6 cycles, but individual needs vary and total sleep duration matters too.",
  },
  {
    question: "What is the best time to go to bed?",
    answer:
      "The best bedtime depends on your wake-up time, how long you take to fall asleep, and how much sleep your body needs.",
  },
  {
    question: "What is the best time to wake up?",
    answer:
      "A practical wake-up time is one that allows enough sleep and fits your schedule. This tool estimates wake times from bedtime and cycle length.",
  },
  {
    question: "Does everyone have 90-minute sleep cycles?",
    answer:
      "No. Ninety minutes is a useful planning estimate, but real cycles can be shorter or longer and change through the night.",
  },
  {
    question: "Why do I still feel tired after sleeping?",
    answer:
      "Sleep quality, sleep debt, stress, caffeine, illness, sleep disorders, and waking during deep sleep can all affect how rested you feel.",
  },
  {
    question: "How much sleep do adults need?",
    answer:
      "CDC guidance says adults generally need at least 7 hours, with many adults needing around 7 to 9 hours.",
  },
  {
    question: "Does age affect sleep requirements?",
    answer:
      "Yes. Sleep needs change by age; children and teens generally need more sleep than adults.",
  },
  {
    question: "Is sleeping more always better?",
    answer:
      "Not necessarily. More time in bed does not always mean better sleep, and persistent fatigue should be discussed with a healthcare professional.",
  },
  {
    question: "Can this calculator improve sleep quality?",
    answer:
      "It can help plan timing, but sleep quality also depends on consistency, environment, habits, health, and possible sleep disorders.",
  },
  {
    question: "What if I cannot fall asleep quickly?",
    answer:
      "Increase the minutes-to-fall-asleep value to better match your usual sleep latency, and consider sleep hygiene habits if delays are frequent.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "It is accurate to its assumptions: 90-minute cycles, your entered latency, and clock-time arithmetic. It cannot measure your actual sleep stages.",
  },
  {
    question: "Should I consult a doctor about sleep problems?",
    answer:
      "Yes, if sleep problems persist, affect daytime functioning, or include symptoms such as loud snoring, breathing pauses, or severe sleepiness.",
  },
  {
    question: "Does the calculator include time to fall asleep?",
    answer:
      "Yes. The minutes-to-fall-asleep field is added when calculating wake times and subtracted when calculating bedtimes.",
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
    name: "Sleep Time Calculator",
    applicationCategory: "HealthApplication",
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
    name: "Sleep Time Calculator",
    applicationCategory: "HealthApplication",
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
        name: "Sleep Time Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate sleep time",
    description: "Estimate bedtimes or wake-up times from sleep cycles.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose direction",
        text: "Select Wake Up At to calculate bedtimes, or Sleep At to calculate wake-up times.",
      },
      {
        "@type": "HowToStep",
        name: "Enter target time",
        text: "Enter the wake-up time or bedtime you want to plan around.",
      },
      {
        "@type": "HowToStep",
        name: "Enter sleep latency",
        text: "Enter how many minutes you usually take to fall asleep.",
      },
      {
        "@type": "HowToStep",
        name: "Review options",
        text: "Compare 3, 4, 5, and 6 sleep-cycle options and the highlighted 5-cycle option.",
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

export default function SleepTimeCalculatorPage() {
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
          <SleepTimeTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Are Sleep Cycles?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A sleep cycle is a repeating pattern of non-REM and REM sleep. Non-REM sleep includes
                lighter sleep and deep sleep, while REM sleep is a more active stage when dreaming
                often occurs.
              </p>
              <p>
                Sleep cycles are often approximated as about 90 minutes for planning, though NIH
                describes typical cycles as restarting every 80 to 100 minutes. Waking closer to the
                end of a cycle may feel easier for some people, but sleep quality and total duration
                matter too.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Mode", "Wake Up At calculates suggested bedtimes. Sleep At calculates suggested wake-up times."],
                ["Sleep latency", "Minutes to fall asleep are included in every timing option."],
                ["Cycles", "The calculator shows 3, 4, 5, and 6 cycles using 90 minutes per cycle."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Calculation" title="Sleep Time Calculation Method" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The calculator uses a fixed 90-minute sleep cycle. For each option, sleep duration is
                cycles x 90 minutes. The displayed options are 3 cycles, 4 cycles, 5 cycles, and 6
                cycles.
              </p>
              <p>
                In Wake Up At mode, the calculator subtracts sleep duration plus minutes to fall
                asleep from the target wake-up time. In Sleep At mode, it adds sleep duration plus
                minutes to fall asleep to the target bedtime. Times wrap across midnight when needed.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Calculation" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>Desired wake-up time: 07:00. Minutes to fall asleep: 15.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Six cycles: 6 x 90 minutes = 9 hours asleep. Bedtime is 21:45.</li>
                <li>Five cycles: 5 x 90 minutes = 7 hours 30 minutes asleep. Bedtime is 23:15.</li>
                <li>Four cycles: 4 x 90 minutes = 6 hours asleep. Bedtime is 00:45.</li>
                <li>Three cycles: 3 x 90 minutes = 4 hours 30 minutes asleep. Bedtime is 02:15.</li>
              </ol>
              <InfoBox>
                The calculator highlights the 5-cycle option when available, but the right choice
                depends on your schedule, sleep need, and sleep quality.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Sleep Time Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose Wake Up At to calculate bedtimes, or Sleep At to calculate wake-up times.</li>
              <li>Enter your desired target time.</li>
              <li>Enter how many minutes you usually take to fall asleep.</li>
              <li>Review the best time to try and the 3 to 6 cycle options.</li>
              <li>Compare the sleep duration with general age-based sleep recommendations.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Suggested bedtime</strong>
                In Wake Up At mode, this is the time to get into bed before your target wake-up time.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Suggested wake time</strong>
                In Sleep At mode, this is the clock time after sleep latency and full cycles.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Cycle count</strong>
                Each option shows 3, 4, 5, or 6 cycles and the matching asleep duration.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Wind-down</strong>
                The displayed wind-down value is the entered minutes to fall asleep.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Recommended Sleep Duration" />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-[var(--page-cream)] text-[var(--ink-900)]">
                  <tr>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Age group</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Recommended sleep</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-700)]">
                  {[
                    ["Newborns, 0-3 months", "14-17 hours"],
                    ["Infants, 4-12 months", "12-16 hours including naps"],
                    ["Toddlers, 1-2 years", "11-14 hours including naps"],
                    ["Preschool, 3-5 years", "10-13 hours including naps"],
                    ["School age, 6-12 years", "9-12 hours"],
                    ["Teenagers, 13-17 years", "8-10 hours"],
                    ["Adults, 18-60 years", "7 or more hours"],
                    ["Adults, 61-64 years", "7-9 hours"],
                    ["Adults, 65 years and older", "7-8 hours"],
                  ].map(([age, sleep]) => (
                    <tr key={age}>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{age}</td>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{sleep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
              These are general CDC sleep-duration recommendations. Individual sleep needs vary, and
              sleep quality can be as important as time in bed.
            </p>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, and Better Sleep Tips" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Benefits</strong>
                Helps plan bedtimes, align schedules with sleep cycles, compare sleep durations, and
                build a more consistent routine.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Limitations</strong>
                Estimates cannot measure actual sleep stages, sleep disorders, sleep quality, or
                your real nightly sleep latency.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Sleep hygiene</strong>
                Keep a consistent schedule, limit caffeine later in the day, reduce screens before
                bed, keep the room quiet and cool, and avoid heavy meals close to bedtime.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Mistakes" title="Common Mistakes to Avoid" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Entering AM instead of PM, or PM instead of AM.</li>
              <li>Ignoring how long it usually takes to fall asleep.</li>
              <li>Assuming every person has exactly 90-minute cycles.</li>
              <li>Focusing only on sleep duration while ignoring sleep quality.</li>
              <li>Using inconsistent bedtimes and wake-up times.</li>
              <li>Using the calculator to evaluate persistent insomnia or sleep apnea symptoms.</li>
            </ul>
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
            <PanelHeader eyebrow="More Tools" title="Related Calculators" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/age-calculator">
                Age Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/bmi-calculator">
                BMI Calculator
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
                ["Sleep Cycle", "A repeating sequence of non-REM and REM sleep stages."],
                ["REM Sleep", "A sleep stage with active brain patterns where dreaming often occurs."],
                ["Deep Sleep", "A restorative non-REM stage also called slow-wave sleep."],
                ["Light Sleep", "Earlier non-REM sleep stages that are easier to wake from."],
                ["Sleep Latency", "The time it takes to fall asleep after going to bed."],
                ["Circadian Rhythm", "The body's roughly 24-hour sleep-wake timing system."],
                ["Bedtime", "The time you plan to get into bed to sleep."],
                ["Wake-up Time", "The time you plan to wake for the day."],
                ["Sleep Hygiene", "Habits and environment choices that support healthy sleep."],
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
                  href="https://www.cdc.gov/sleep/about/"
                >
                  Centers for Disease Control and Prevention. About Sleep.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep"
                >
                  National Heart, Lung, and Blood Institute. How Sleep Works: Sleep Phases and Stages.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379"
                >
                  Mayo Clinic. Sleep tips: 6 steps to better sleep.
                </a>
              </li>
              <li>
                Watson NF, Badr MS, Belenky G, et al. Recommended amount of sleep for a healthy
                adult: a joint consensus statement of the American Academy of Sleep Medicine and
                Sleep Research Society. <em>Sleep.</em> 2015;38(6):843-844.
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="medical">
          <p>
            This sleep time calculator provides general timing estimates for informational and
            educational purposes only. It does not diagnose, treat, or evaluate sleep disorders.
            Persistent insomnia, loud snoring, breathing pauses, excessive daytime sleepiness, or
            ongoing sleep problems should be discussed with a qualified healthcare professional.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
