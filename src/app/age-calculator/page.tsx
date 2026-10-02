import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { AgeTool } from "./age-tool"

const pagePath = "/age-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Age Calculator | Exact Age by Date of Birth"
const pageDescription =
  "Calculate exact age from a birth date to any date in years, months, and days, with total days, weeks, months, and next birthday."

const faqs = [
  {
    question: "How is age calculated?",
    answer:
      "The calculator compares the date of birth with the selected age-on date, counts completed calendar years, then completed months, then remaining days.",
  },
  {
    question: "What is chronological age?",
    answer:
      "Chronological age is the amount of calendar time that has passed since a person's date of birth.",
  },
  {
    question: "How does the calculator handle leap years?",
    answer:
      "It uses calendar month lengths from the Gregorian calendar, so February has 29 days in leap years and 28 days in common years.",
  },
  {
    question: "Does the calculator account for leap years?",
    answer:
      "Yes. Leap years are included through the calendar date functions used to validate dates and count days.",
  },
  {
    question: "Why does my calculated age seem different?",
    answer:
      "Manual age calculations often differ because months have different lengths and birthdays or month anniversaries may not have occurred yet.",
  },
  {
    question: "Can I calculate age on a future date?",
    answer:
      "Yes. Select any future age-on date to see the age someone will be on that date.",
  },
  {
    question: "Can I calculate age on a past date?",
    answer:
      "Yes. Select a past age-on date as long as it is the same as or after the date of birth.",
  },
  {
    question: "What calendar does the calculator use?",
    answer:
      "It uses standard JavaScript Gregorian calendar dates for year, month, and day calculations.",
  },
  {
    question: "Can I calculate someone's age from their birthday?",
    answer:
      "Yes. Enter the birthday as the date of birth and choose the date you want to calculate age on.",
  },
  {
    question: "Why do months have different lengths?",
    answer:
      "Gregorian calendar months vary from 28 to 31 days, and February changes in leap years.",
  },
  {
    question: "Can I calculate the time between two dates?",
    answer:
      "Yes. Use the date of birth field as the start date and the age-on field as the end date to get a calendar difference.",
  },
  {
    question: "Is this calculator accurate?",
    answer:
      "It is accurate for standard chronological age calculations based on valid Gregorian calendar dates, but official uses should be verified.",
  },
  {
    question: "How often is today's date updated?",
    answer:
      "The default age-on date is set when the page loads, and the Use Today button refreshes it to the current local date.",
  },
  {
    question: "What happens if the birth date is after the age-on date?",
    answer:
      "The calculator shows an invalid state because chronological age cannot be calculated backward from a later birth date.",
  },
  {
    question: "Does the calculator include the birth date in total days?",
    answer:
      "No. Total days are the elapsed full-day difference between the birth date and the selected age-on date.",
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
    name: "Age Calculator",
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
    name: "Age Calculator",
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
        name: "Age Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate age",
    description: "Calculate exact chronological age between two calendar dates.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter date of birth",
        text: "Choose the starting birth date.",
      },
      {
        "@type": "HowToStep",
        name: "Select age-on date",
        text: "Choose the date to calculate age on, or use today's date.",
      },
      {
        "@type": "HowToStep",
        name: "Review exact age",
        text: "Read the years, months, days, total days, total weeks, completed months, and birthday countdown.",
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

export default function AgeCalculatorPage() {
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
          <AgeTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is an Age Calculator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                An age calculator finds chronological age from a date of birth to a selected
                calculation date. It is useful when exact years, months, and days matter more than a
                quick birth-year estimate.
              </p>
              <p>
                Exact age calculations can help with personal records, school admissions, employment
                eligibility, insurance forms, healthcare records, event planning, and other date-based
                checks. For legal or official verification, always confirm with the relevant authority.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How Age Is Calculated" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Date inputs", "Enter a date of birth and an age-on date in the browser's date picker."],
                ["Calendar age", "The calculator counts completed years, then completed months, then remaining days."],
                ["Leap years", "Month lengths come from calendar dates, so February 29 is handled when present."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
              Total days are calculated as elapsed full days between the two dates at UTC midnight.
              Total weeks are full 7-day weeks, and completed months are years x 12 plus the
              remaining completed months.
            </p>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Calculation" title="Age Calculation Method" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The calculator first validates both dates. If the date of birth is after the age-on
                date, it returns no result. Otherwise, it finds the most recent birthday anniversary,
                counts full months after that anniversary, then counts remaining days.
              </p>
              <p>
                When a target month or year does not have the original day number, the date is clamped
                to the last valid day of that month. This is how dates such as February 29 remain usable
                in non-leap years.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Calculation" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>Date of birth: 15 March 1995. Calculation date: 14 July 2026.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>The 31st birthday was on 15 March 2026.</li>
                <li>From 15 March to 15 June is 3 completed months.</li>
                <li>From 15 June to 14 July is 29 days.</li>
                <li>Result: 31 years, 3 months, and 29 days.</li>
              </ol>
              <InfoBox>
                This is a calendar-based age, so it respects actual month lengths instead of treating
                every month as the same number of days.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Age Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter the date of birth.</li>
              <li>Select the age-on date, or choose Use Today.</li>
              <li>Review the exact age in years, months, and days.</li>
              <li>Check total days, total weeks, completed months, and days until birthday.</li>
              <li>Verify official results when age affects legal, financial, or government decisions.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Years, months, days</strong>
                The exact calendar age after counting completed birthdays and month anniversaries.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Total days</strong>
                The full-day difference between the start date and end date.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Total weeks</strong>
                The number of complete 7-day weeks in the total-day count.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Completed months</strong>
                Completed years converted to months, plus remaining completed months.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Next birthday</strong>
                The next birthday date on or after the selected age-on date.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Days until birthday</strong>
                Full days from the age-on date to the next birthday; it is 0 on the birthday.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Uses" title="Common Uses of an Age Calculator" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Personal records and birthday planning.</li>
              <li>School or program eligibility checks.</li>
              <li>Employment and retirement planning.</li>
              <li>Government documents and passport applications.</li>
              <li>Insurance and healthcare record keeping.</li>
              <li>Event planning and age-based milestones.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, and Accuracy Tips" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Benefits</strong>
                Saves time, reduces manual errors, supports planning, and gives both calendar age
                and total elapsed-day summaries.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Limitations</strong>
                Results depend on accurate inputs and standard Gregorian calendar dates. Time zones,
                times of day, and historical calendar changes are not modeled.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Accuracy tips</strong>
                Verify the birth date, select the correct calculation date, use the date picker, and
                double-check the year before relying on the result.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Mistakes" title="Common Mistakes to Avoid" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Reversing day and month when reading dates from another format.</li>
              <li>Selecting the wrong birth year or calculation year.</li>
              <li>Confusing age with birth year.</li>
              <li>Assuming every month has the same number of days.</li>
              <li>Misreading total days as the same thing as years, months, and days.</li>
              <li>Using an estimate where official age verification is required.</li>
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/countdown-timer">
                Countdown Timer
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/timezone-converter">
                Timezone Converter
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/stopwatch">
                Stopwatch
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Key Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Chronological Age", "Elapsed calendar time since a date of birth."],
                ["Date of Birth", "The calendar date someone was born."],
                ["Leap Year", "A year with an added February 29 in the Gregorian calendar."],
                ["Gregorian Calendar", "The civil calendar system commonly used for modern dates."],
                ["Calendar Date", "A year, month, and day on a calendar."],
                ["Date Difference", "The elapsed time between two calendar dates."],
                ["Month", "A calendar unit with variable length from 28 to 31 days."],
                ["Year", "A 12-month calendar period, with 365 or 366 days in this context."],
                ["Day", "One calendar day between consecutive midnights."],
                ["Anniversary", "The yearly recurrence of a month and day, such as a birthday."],
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
                  href="https://www.iso.org/standard/70908.html"
                >
                  International Organization for Standardization. ISO 8601-2:2019 Date and time.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/QA/Tips/iso-date"
                >
                  World Wide Web Consortium. Use international date format.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://aa.usno.navy.mil/faq/calendars"
                >
                  United States Naval Observatory. Introduction to Calendars.
                </a>
              </li>
              <li>
                Reingold EM, Dershowitz N. <em>Calendrical Calculations.</em> Cambridge University
                Press.
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This age calculator is for informational and educational use. Results are based on the
            dates entered and standard calendar calculations. It should not replace official age
            verification for legal, financial, employment, education, insurance, medical, or
            government purposes.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
