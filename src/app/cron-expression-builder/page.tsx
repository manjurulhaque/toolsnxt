import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { CronExpressionBuilderTool } from "./cron-expression-builder-tool"

const pagePath = "/cron-expression-builder"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Cron Expression Builder | Create Five-Field Cron Schedules"
const pageDescription =
  "Build numeric five-field cron expressions online. Choose common schedules, enter custom cron fields, validate supported syntax, preview simple next runs, and copy the expression."

const faqs = [
  {
    question: "What is a cron expression?",
    answer:
      "A cron expression is a text schedule that a cron-compatible scheduler can use to decide when to run a job.",
  },
  {
    question: "What is a Cron Expression Builder?",
    answer:
      "It helps create cron schedule text from controls or a supported custom expression. This page does not execute jobs.",
  },
  {
    question: "Which cron format does this builder support?",
    answer:
      "This implementation supports a numeric five-field format: minute hour day-of-month month day-of-week.",
  },
  {
    question: "Does this builder support seconds or years?",
    answer:
      "No. Seconds and year fields are not implemented.",
  },
  {
    question: "What do the five cron fields mean?",
    answer:
      "The fields represent minute, hour, day of month, month, and day of week in that order.",
  },
  {
    question: "What does * mean in cron?",
    answer:
      "In this builder, * matches every allowed value for that field.",
  },
  {
    question: "What does / mean in cron?",
    answer:
      "A slash defines a step value, such as */15 for every 15 units within that field.",
  },
  {
    question: "What does - mean in cron?",
    answer:
      "A hyphen defines an inclusive numeric range, such as 9-17 in the hour field.",
  },
  {
    question: "What does , mean in cron?",
    answer:
      "A comma separates multiple numeric values or ranges in one field.",
  },
  {
    question: "Does the builder support month or weekday names?",
    answer:
      "No. Custom expressions are validated with numeric fields only. The weekly preset uses a weekday select that outputs numbers.",
  },
  {
    question: "Does the builder support Quartz cron?",
    answer:
      "No. Quartz-specific seconds, years, ?, L, W, and # syntax are not implemented.",
  },
  {
    question: "Can I validate a cron expression?",
    answer:
      "Yes. Custom input is checked for five fields, numeric ranges, wildcards, lists, ranges, and steps supported by this tool.",
  },
  {
    question: "Can I preview next run times?",
    answer:
      "Yes, but only for valid simple expressions that do not contain lists, ranges, or steps.",
  },
  {
    question: "Does the builder support time zones?",
    answer:
      "No time-zone selector is implemented. The simple next-run preview uses the browser's local date and time formatting.",
  },
  {
    question: "How are day-of-month and day-of-week handled?",
    answer:
      "The preview logic requires both fields to match. Some Unix cron schedulers use different OR-style behavior when both are restricted, so test in your target scheduler.",
  },
  {
    question: "Can I copy the generated expression?",
    answer:
      "Yes. Use Copy Cron to copy a valid generated expression.",
  },
  {
    question: "Is the Cron Expression Builder free?",
    answer: "Yes. This is a free browser-based cron expression builder.",
  },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: ["Cron Expression Builder", "Cron Expression Generator", "Cron Schedule Builder"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cron Expression Builder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Five-field cron expression generation",
      "Common schedule presets",
      "Custom expression input",
      "Numeric field validation",
      "Wildcard, list, range, and step validation",
      "Human-readable schedule description",
      "Simple next-run preview",
      "Copy cron expression",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cron Expression Builder",
    applicationCategory: "DeveloperApplication",
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
      { "@type": "ListItem", position: 2, name: "Cron Expression Builder", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to build a cron expression",
    description: "Create a supported five-field cron expression with presets or custom input.",
    step: [
      { "@type": "HowToStep", name: "Choose a schedule", text: "Select every minute, hourly, daily, weekly, monthly, or custom." },
      { "@type": "HowToStep", name: "Set fields", text: "Enter the available minute, hour, day, or weekday values for the selected preset." },
      { "@type": "HowToStep", name: "Review output", text: "Check the generated expression, validation message, and supported next-run preview." },
      { "@type": "HowToStep", name: "Copy cron", text: "Use Copy Cron to copy a valid expression." },
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

export default function CronExpressionBuilderPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <CronExpressionBuilderTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a Cron Expression Builder?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A Cron Expression Builder helps create schedule text for recurring jobs. This page
              generates a numeric five-field expression in the order minute, hour, day of month,
              month, and day of week. Developers and system administrators can use it for scripts,
              reports, backups, monitoring jobs, API calls, and recurring automation planning.
            </p>
            <p>
              The builder creates expressions and previews some simple next run times, but it does
              not execute jobs. A cron scheduler, platform, container, or cloud service must
              interpret the expression and run the associated command or task.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Format" title="Cron Expression Format" />
          <pre className="mt-5 overflow-x-auto rounded-[1.1rem] bg-[var(--page-cream)] p-4 text-sm leading-7">
{`minute hour day-of-month month day-of-week
*      *    *            *     *`}
          </pre>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["Minute", "0-59"],
              ["Hour", "0-23"],
              ["Day of month", "1-31"],
              ["Month", "1-12"],
              ["Day of week", "0-7, where 0 and 7 can represent Sunday"],
            ].map(([field, range]) => (
              <div key={field} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{field}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">Supported numeric range: {range}.</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Syntax" title="Cron Operators Explained" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["*", "Wildcard. Matches every allowed value in the field."],
              [",", "List. Allows multiple values or ranges in a field."],
              ["-", "Range. Matches an inclusive numeric range."],
              ["/", "Step. Applies a numeric interval to a wildcard or range."],
            ].map(([operator, text]) => (
              <div key={operator} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-mono text-lg font-semibold">{operator}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
          <InfoBox className="mt-5">
            This custom validator supports numeric values, wildcards, comma lists, hyphen ranges,
            and slash steps. It does not support names, macros, seconds, years, ?, L, W, #, or
            Quartz-specific syntax.
          </InfoBox>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Behavior" title="Validation, Descriptions, and Next Runs" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Validation requires exactly five whitespace-separated fields. Each field is checked
              against the implemented numeric range and the supported operators. The human-readable
              description is specific for every minute, hourly, daily, weekly, and monthly patterns;
              complex valid expressions receive a generic field-based description.
            </p>
            <p>
              The next-run preview uses the browser&apos;s current local Date and displays up to five
              matches for valid simple expressions that contain only numbers or wildcards. It does
              not preview expressions containing lists, ranges, or steps, and it does not provide a
              time-zone selector.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Dialects" title="Cron Dialect Differences" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Cron syntax varies. Traditional user crontabs commonly use five time fields before a
              command, while Quartz and some cloud schedulers use additional fields or special
              operators. This builder intentionally targets its own numeric five-field subset and
              should not be treated as a universal cron validator.
            </p>
            <p>
              Day-of-month and day-of-week semantics are especially important. This page&apos;s simple
              preview requires both fields to match. Some Unix cron implementations run when either
              restricted day field matches, so always check the target scheduler&apos;s documentation.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Build a Cron Expression" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Select a preset: Every Minute, Hourly, Daily, Weekly, Monthly, or Custom.</li>
            <li>Enter the displayed minute, hour, day-of-month, or weekday values where available.</li>
            <li>Use Custom for supported five-field numeric expressions such as */15 9-17 * * 1-5.</li>
            <li>Review the generated expression, validation badge, and description.</li>
            <li>Check the next-run preview when the expression is simple enough to be previewed.</li>
            <li>Copy the expression and test it in the scheduler that will execute the job.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common Cron Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Every minute", "* * * * *"],
              ["Every 15 minutes during work hours on weekdays", "*/15 9-17 * * 1-5"],
              ["Hourly at minute 30", "30 * * * *"],
              ["Daily at 09:30", "30 9 * * *"],
              ["Every Monday at 09:30", "30 9 * * 1"],
              ["Monthly on day 1 at 09:30", "30 9 1 * *"],
            ].map(([label, expression]) => (
              <div key={label} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{label}</h3>
                <code className="mt-2 block break-all font-mono text-sm text-[var(--ink-800)]">{expression}</code>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Use Cases" title="Common Uses" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Backups", "Prepare a recurring schedule for database or file backups."],
              ["Reports", "Schedule report generation or email summaries."],
              ["Maintenance", "Plan cleanup jobs, log rotation, or server maintenance tasks."],
              ["Monitoring", "Run periodic checks or data synchronization jobs."],
              ["Development", "Draft schedules for CI/CD, batch jobs, and automation testing."],
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
              <li>Creates common numeric five-field cron expressions quickly.</li>
              <li>Supports presets plus custom expressions for simple scheduling work.</li>
              <li>Validates the supported field count, ranges, lists, ranges, and steps.</li>
              <li>Provides a description and simple next-run preview where implemented.</li>
              <li>Lets you copy a valid expression for testing in your target scheduler.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Only a numeric five-field subset is supported.</li>
              <li>Month and weekday names, macros, seconds, years, and Quartz operators are not supported.</li>
              <li>Next-run previews are only shown for simple numeric or wildcard fields.</li>
              <li>Generated expressions do not execute jobs by themselves.</li>
              <li>Time-zone and daylight-saving behavior depends on the scheduler that runs the job.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Confirm which cron dialect your target system supports.</li>
              <li>Test copied expressions in the scheduler that will execute them.</li>
              <li>Be careful with day-of-month and day-of-week combinations.</li>
              <li>Consider time-zone and daylight-saving rules in the runtime environment.</li>
              <li>Document production schedules alongside the command or job they trigger.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Assuming all cron implementations use the same fields or operators.</li>
              <li>Using Quartz syntax in a five-field Unix-style scheduler.</li>
              <li>Confusing a cron expression with the scheduler that executes a job.</li>
              <li>Assuming */5 and 5 mean the same thing.</li>
              <li>Copying an expression without checking the target environment.</li>
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
              ["Time Zone Converter", "/timezone-converter"],
              ["Countdown Timer", "/countdown-timer"],
              ["Stopwatch", "/stopwatch"],
              ["JSON Formatter", "/json-formatter"],
              ["Regex Tester", "/regex-tester"],
              ["URL Encoder / Decoder", "/url-encoder-decoder"],
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
              ["Cron", "A scheduling system concept used to run recurring jobs."],
              ["Cron Expression", "Text fields that describe a recurring schedule."],
              ["Cron Scheduler", "Software that interprets a cron expression and runs a command or job."],
              ["Cron Field", "One position in a cron expression, such as minute or hour."],
              ["Wildcard", "The * operator, which matches every allowed value in a field."],
              ["List", "Comma-separated values or ranges in one field."],
              ["Range", "An inclusive numeric span written with a hyphen."],
              ["Step", "A slash interval such as */15."],
              ["Day of Month", "The calendar day field in this five-field format."],
              ["Day of Week", "The weekday field, where this implementation accepts numeric values 0-7."],
              ["Next Run", "A previewed future time calculated by this page for simple expressions."],
              ["Cron Dialect", "A specific cron syntax supported by a scheduler or tool."],
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
              <a href="https://man7.org/linux/man-pages/man5/crontab.5.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                Linux man-pages: crontab(5)
              </a>
            </li>
            <li>
              <a href="https://manpages.debian.org/trixie/cron/crontab.5.en.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                Debian manpages: crontab(5)
              </a>
            </li>
            <li>
              <a href="https://man.openbsd.org/crontab.5" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                OpenBSD manual: crontab(5)
              </a>
            </li>
            <li>
              <a href="https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                Kubernetes CronJob documentation
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Technical disclaimer: This builder generates expressions according to the numeric
          five-field syntax supported by this page. Cron syntax varies between schedulers, and a
          generated expression should be checked in the environment that will execute it. Time-zone
          and daylight-saving behavior depends on the scheduler and runtime configuration. This
          tool builds schedule expressions; it does not execute cron jobs.
        </InfoBox>
      </section>
    </main>
  )
}
