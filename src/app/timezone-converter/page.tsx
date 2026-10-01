import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { TimezoneTool } from "./timezone-tool"

const pagePath = "/timezone-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Time Zone Converter | World Clock and UTC Converter"
const pageDescription =
  "Convert time between time zones, compare city times, check UTC offsets, and account for daylight saving time using browser time zone data."

const faqs = [
  {
    question: "What is a time zone?",
    answer:
      "A time zone is a region that uses the same local civil time, usually defined by an offset from Coordinated Universal Time.",
  },
  {
    question: "What is UTC?",
    answer:
      "UTC, or Coordinated Universal Time, is the internationally agreed reference time used for civil timekeeping and time zone offsets.",
  },
  {
    question: "What is GMT?",
    answer:
      "GMT means Greenwich Mean Time. In everyday scheduling it is often treated like UTC, but UTC is the modern time standard used for offsets.",
  },
  {
    question: "How does the converter work?",
    answer:
      "It interprets the source date and time in the selected source zone, converts that instant through UTC, then formats it in the destination zone.",
  },
  {
    question: "Does it account for Daylight Saving Time?",
    answer:
      "Yes, when the browser's time zone database includes the relevant DST rules for the selected zone and date.",
  },
  {
    question: "Why did my converted date change?",
    answer:
      "The destination time may cross midnight relative to the source time, so the local calendar date can move forward or backward.",
  },
  {
    question: "Why are UTC offsets different?",
    answer:
      "Regions choose different standard offsets, and some regions change offsets during daylight saving time.",
  },
  {
    question: "Is UTC the same as GMT?",
    answer:
      "They are often close enough for civil scheduling, but UTC is the precise international standard used by this converter's offset labels.",
  },
  {
    question: "How often are time zone databases updated?",
    answer:
      "The IANA Time Zone Database is updated periodically when governments or maintainers record time zone and DST rule changes.",
  },
  {
    question: "Can governments change time zones?",
    answer:
      "Yes. Governments can change time zone boundaries, UTC offsets, and daylight saving rules, sometimes with limited notice.",
  },
  {
    question: "Why do some countries not observe DST?",
    answer:
      "Daylight saving time is a policy choice. Some regions use it seasonally, some have abandoned it, and others never observe it.",
  },
  {
    question: "Is the converter accurate?",
    answer:
      "It is accurate to the browser's implemented time zone data and JavaScript date handling for the selected zone and date.",
  },
  {
    question: "Can I convert future dates?",
    answer:
      "Yes, but future results depend on current time zone rules. Government changes can affect future conversions.",
  },
  {
    question: "Can I convert historical dates?",
    answer:
      "Yes, but historical accuracy depends on the time zone data available in the browser and how it represents past rules.",
  },
  {
    question: "What does the city comparison show?",
    answer:
      "It shows the same instant formatted in a fixed list of common city time zones for quick comparison.",
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
    name: "Time Zone Converter",
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
    "@type": "SoftwareApplication",
    name: "Time Zone Converter",
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
        name: "Time Zone Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert time zones",
    description: "Convert a date and time from one time zone to another.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter source time",
        text: "Choose the source date and time.",
      },
      {
        "@type": "HowToStep",
        name: "Select zones",
        text: "Select the source time zone and destination time zone.",
      },
      {
        "@type": "HowToStep",
        name: "Review conversion",
        text: "Read the converted time, UTC offsets, difference, UTC value, and city comparison.",
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

export default function TimezoneConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-12">
          <TimezoneTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Time Zone?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A time zone is a region that keeps the same local civil time. Time zones make local
                clocks practical by linking them to Coordinated Universal Time, or UTC, with an
                offset such as UTC+05:30 or UTC-04:00.
              </p>
              <p>
                Different regions use different offsets because of geography, law, daylight saving
                policy, and local convention. A time zone converter helps coordinate meetings,
                travel, support schedules, trading hours, and online events across those differences.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Converter Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Source input", "Enter a source date and time, then choose the From time zone."],
                ["Destination", "Choose the To time zone to format the same instant in another location."],
                ["Comparison", "Review the converted result, UTC time, offset difference, and common city rows."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Calculation" title="Time Conversion Method" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The converter treats UTC as the reference instant. It interprets the entered local
                source time in the selected source zone, converts that moment to an underlying UTC
                instant, and then formats the same instant in the destination zone.
              </p>
              <p>
                UTC offsets and daylight saving changes come from the browser&apos;s built-in
                internationalization time zone data. The date can roll forward or backward when the
                destination time crosses midnight, including conversions near the International Date
                Line.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Conversion" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>Input: America/New_York, 3:00 PM, 15 July 2026. Destination: Europe/London.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>New York is typically UTC-04:00 in mid-July because daylight saving time is active.</li>
                <li>London is typically UTC+01:00 in mid-July because British Summer Time is active.</li>
                <li>The offset difference is 5 hours.</li>
                <li>3:00 PM in New York converts to 8:00 PM in London on the same date.</li>
              </ol>
              <InfoBox>
                Exact offsets are read from the browser time zone data for the selected date and
                named zones rather than from fixed abbreviations like EST or BST.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Time Zone Converter" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter the source date and time.</li>
              <li>Select the source time zone in the From field.</li>
              <li>Select the destination time zone in the To field.</li>
              <li>Use Swap if you want to reverse the conversion direction.</li>
              <li>Review the converted time, offset difference, UTC value, and city comparison.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Converted time</strong>
                The same instant shown in the selected destination time zone.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">UTC offsets</strong>
                Source and target offsets such as UTC+01:00 or UTC-04:00 for the selected instant.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Difference</strong>
                The hour and minute difference between the destination zone and source zone.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">UTC value</strong>
                The source instant formatted in UTC for a neutral reference.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">City comparison</strong>
                A fixed list of common zones showing the same instant in each location.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Day and date</strong>
                Results include weekday and date when formatting the converted local time.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="DST" title="Daylight Saving Time" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Daylight Saving Time is a seasonal clock change used by some regions. It changes the
                UTC offset for part of the year, which means the same city can have different offsets
                in winter and summer.
              </p>
              <p>
                This converter does not ask you to choose DST manually. It relies on the selected
                IANA-style time zone name and the browser&apos;s time zone database for the selected
                date. If a government changes DST rules, a browser or operating system update may be
                needed before future conversions reflect the change.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Uses" title="Common Uses and Accuracy Tips" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Common uses</strong>
                International meetings, remote work, travel planning, webinars, customer support,
                trading hours, and calls across countries.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Benefits</strong>
                Saves time, reduces scheduling mistakes, handles UTC offsets, and shows date changes
                across midnight.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Tips</strong>
                Select the correct city-style zone, verify the date, check AM/PM carefully, and
                confirm critical events with official local sources.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Mistakes" title="Common Mistakes to Avoid" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Selecting a nearby city with different daylight saving rules.</li>
              <li>Mixing AM and PM when entering the source time.</li>
              <li>Assuming an offset is fixed for the whole year.</li>
              <li>Confusing UTC with GMT in official or technical contexts.</li>
              <li>Forgetting that the converted date can change across midnight.</li>
              <li>Using abbreviations like CST without checking which region they mean.</li>
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/sleep-time-calculator">
                Sleep Time Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/countdown-timer">
                Countdown Timer
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Key Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["UTC", "Coordinated Universal Time, the reference used for civil time offsets."],
                ["GMT", "Greenwich Mean Time, a historical time term often used informally near UTC."],
                ["Time Zone", "A named region with local time rules and UTC offset history."],
                ["UTC Offset", "The difference between local time and UTC, such as UTC+05:30."],
                ["Daylight Saving Time", "A seasonal change that shifts local clocks in some regions."],
                ["Local Time", "The clock time observed in a selected time zone."],
                ["Coordinated Universal Time", "The full name of UTC."],
                ["International Date Line", "A rough boundary where local calendar dates can differ by a day."],
                ["Time Difference", "The gap in hours and minutes between two zones at an instant."],
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
                  href="https://www.iana.org/time-zones"
                >
                  Internet Assigned Numbers Authority. Time Zone Database.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.nist.gov/pml/time-and-frequency-division/time-realization/utcnist-time-scale"
                >
                  National Institute of Standards and Technology. UTC(NIST) Time Scale.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.iso.org/iso-8601-date-and-time-format.html"
                >
                  International Organization for Standardization. ISO 8601 Date and time format.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.iers.org/IERS/EN/Science/EarthRotation/UT1LOD.html"
                >
                  International Earth Rotation and Reference Systems Service. Earth rotation and UT1.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This time zone converter is provided for informational planning. Results depend on the
              browser&apos;s implemented time zone database and date handling. Government changes to
              time zones or daylight saving rules may affect future conversions. Verify official
              local times for legal, aviation, financial, medical, or governmental applications.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
