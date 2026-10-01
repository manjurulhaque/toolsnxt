import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PercentageTool } from "./percentage-tool"

const pagePath = "/percentage-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Percentage Calculator | Percent Change, Increase and Decrease"
const pageDescription =
  "Use this percentage calculator to find a percent of a number, percent change, part-as-percent ratios, and percentage increases or decreases."

const faqs = [
  {
    question: "What is a percentage?",
    answer:
      "A percentage is a ratio expressed per 100. For example, 25% means 25 out of 100, or 0.25 as a decimal.",
  },
  {
    question: "How do you calculate a percentage?",
    answer:
      "Divide the part by the whole and multiply by 100. To find a percent of a number, divide the percent by 100 and multiply by the value.",
  },
  {
    question: "How do I find X% of a number?",
    answer:
      "Use Percent Of mode. Enter the percent and the value; the calculator applies percent / 100 x value.",
  },
  {
    question: "What percentage is one number of another?",
    answer:
      "Use What Percent mode. Enter the part and whole; the calculator divides the part by the whole and multiplies by 100.",
  },
  {
    question: "What is percentage increase?",
    answer:
      "Percentage increase compares how much a value rose relative to the original value. This calculator shows it in Percent Change mode when the ending value is larger.",
  },
  {
    question: "What is percentage decrease?",
    answer:
      "Percentage decrease compares how much a value fell relative to the original value. This calculator shows it in Percent Change mode when the ending value is smaller.",
  },
  {
    question: "How is percent change calculated?",
    answer:
      "Percent Change mode uses (new - old) / |old| x 100 and requires a nonzero starting value.",
  },
  {
    question: "How is percentage difference calculated?",
    answer:
      "This calculator does not include a separate average-denominator percentage difference mode. Its Percent Change mode uses the starting value as the reference.",
  },
  {
    question: "What is reverse percentage?",
    answer:
      "Reverse percentage works backward from a final value to an original value. This page does not include a dedicated reverse percentage mode.",
  },
  {
    question: "Can I calculate discounts?",
    answer:
      "Yes. Use Increase / Decrease mode, choose decrease, and enter the original price and discount percent.",
  },
  {
    question: "Can I calculate tax percentages?",
    answer:
      "Yes. Use Increase / Decrease mode, choose increase, and enter the pre-tax amount and tax rate.",
  },
  {
    question: "Why do results differ due to rounding?",
    answer:
      "The calculator formats results to a limited number of decimal places, so repeating decimals and long results may be rounded for display.",
  },
  {
    question: "What is the difference between percentage and percentage points?",
    answer:
      "A percentage is relative to a base. A percentage point is an absolute difference between two percentages, such as 4% minus 3% equals 1 percentage point.",
  },
  {
    question: "Is this calculator accurate?",
    answer:
      "It is accurate for the displayed formulas and entered values, but critical school, finance, tax, or business calculations should be checked independently.",
  },
  {
    question: "What industries use percentage calculations?",
    answer:
      "Education, retail, finance, accounting, statistics, data analysis, science, marketing, and operations all use percentages to compare values.",
  },
  {
    question: "Can percentages be negative?",
    answer:
      "Yes. Percent Change mode can show a negative result when the ending value is lower than the starting value.",
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
    about: ["Percentage Calculator", "Percent Calculator", "Percentage Change Calculator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Percentage Calculator",
    applicationCategory: "EducationalApplication",
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
    name: "Percentage Calculator",
    applicationCategory: "EducationalApplication",
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
        name: "Percentage Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate percentages online",
    description: "Use the calculator to find percent of a value, percent change, part-as-percent, or increased and decreased values.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose a calculation type",
        text: "Select Percent Of, Percent Change, What Percent, or Increase / Decrease.",
      },
      {
        "@type": "HowToStep",
        name: "Enter values",
        text: "Fill in the visible fields for the selected calculation type.",
      },
      {
        "@type": "HowToStep",
        name: "Review the result",
        text: "Read the live result, difference, multiplier, and formula summary.",
      },
      {
        "@type": "HowToStep",
        name: "Compare scenarios",
        text: "Change the values or switch modes to compare another percentage calculation.",
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

export default function PercentageCalculatorPage() {
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
          <PercentageTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Percentage Calculator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A percentage calculator turns percent problems into quick arithmetic. Percentages
                represent ratios out of 100, so they are useful for comparing values with different
                sizes, such as exam scores, discounts, tax rates, business changes, and data trends.
              </p>
              <p>
                Students, teachers, shoppers, analysts, business owners, and finance teams can use
                this online percent calculator to find a percentage of a number, calculate
                percentage change, compare a part with a whole, or apply an increase or decrease.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Percent Of", "Finds a percent of a value, such as 15% of 200."],
                ["Percent Change", "Compares a starting value and ending value using the starting value as the reference."],
                ["What Percent", "Converts a part-to-whole ratio into a percentage."],
                ["Increase / Decrease", "Adds or subtracts a percent of the base value to calculate a final value."],
                ["Difference", "Shows the absolute amount associated with the selected calculation."],
                ["Multiplier", "Shows the decimal factor, such as 0.15, 1.10, or 0.90."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formulas" title="Percentage Formulas Used" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Percentage of a Number", "Result = (Percent / 100) x Value"],
                ["What Percent Is X of Y?", "Percentage = (Part / Whole) x 100"],
                ["Percent Change", "Percent change = ((New - Old) / |Old|) x 100"],
                ["Percentage Increase", "Final value = Base + Base x Percent / 100"],
                ["Percentage Decrease", "Final value = Base - Base x Percent / 100"],
                ["Multiplier", "Increase multiplier = 1 + p / 100; decrease multiplier = 1 - p / 100"],
              ].map(([label, formula]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{formula}</span>
                </InfoBox>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
              The page does not implement a separate reverse percentage calculator or a
              midpoint-based percentage difference calculator, so those formulas are not used here.
            </p>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Example Calculations" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">20% of 250</strong>
                Percent / 100 x value = 20 / 100 x 250 = 50.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">$80 to $100</strong>
                Percent change = (100 - 80) / |80| x 100 = 25% increase.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">500 decreased by 15%</strong>
                Final value = 500 - 500 x 15 / 100 = 425.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Percentage Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select Percent Of, Percent Change, What Percent, or Increase / Decrease.</li>
              <li>Enter the values shown for that calculation type.</li>
              <li>For Increase / Decrease, choose increase or decrease.</li>
              <li>Review the live result, difference, multiplier, and formula label.</li>
              <li>Repeat with different values to compare scenarios.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Calculated result", "The main answer for the selected mode, such as a value or percentage."],
                ["Difference", "For percent change, this is ending minus starting value. For percent-of and adjustment modes, it is the calculated amount."],
                ["Multiplier", "The decimal factor used for comparison or adjustment."],
                ["Formula", "A compact reminder of the exact formula branch used by the calculator."],
                ["Percent change", "A positive value means an increase; a negative value means a decrease."],
                ["Invalid zero reference", "Percent change and part-as-percent return -- when the required reference value is zero."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practice" title="Common Percentage Calculations" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Discounts", "Decrease a price by the discount percent to estimate a sale price."],
                ["Sales tax", "Increase a subtotal by the tax rate to estimate a total."],
                ["Tips", "Find a percent of the bill amount."],
                ["Exam scores", "Use part-as-percent to compare points earned with total points."],
                ["Profit and margins", "Compare costs, sales, and changes as percentages."],
                ["Population growth", "Use percent change to compare old and new population values."],
                ["Inflation and salary changes", "Use percent change to compare values over time."],
                ["Statistics and data analysis", "Use percentages to describe proportions and relative changes."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Benefits, Limits, Tips and Common Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Performs quick percentage calculations online.</li>
                  <li>Reduces arithmetic errors and saves time.</li>
                  <li>Supports education, business, finance, and everyday comparisons.</li>
                  <li>Makes value changes easier to compare across different sizes.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Results depend on accurate inputs.</li>
                  <li>Displayed numbers may be rounded.</li>
                  <li>Financial and statistical decisions may require more context.</li>
                  <li>Results are mathematical calculations only.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Accurate Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Double-check the values you enter.</li>
                  <li>Select the correct calculation type before comparing results.</li>
                  <li>Check decimal placement when typing percentages.</li>
                  <li>Know whether a value is a percent or an absolute number.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Confusing percentages with percentage points.</li>
                  <li>Typing 0.15 when the calculator expects 15 for 15%.</li>
                  <li>Reversing starting and ending values in percent change.</li>
                  <li>Using percent change when a part-as-percent ratio is intended.</li>
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
            <PanelHeader eyebrow="More Tools" title="Related Calculators" />
            <div className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/scientific-calculator"
              >
                Scientific Calculator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/loan-calculator"
              >
                Loan Calculator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/unit-converter"
              >
                Unit Converter
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Percentage Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Percentage", "A ratio expressed per 100."],
                ["Percent", "The word used with the % symbol; percent means per hundred."],
                ["Percentage Point", "An absolute difference between two percentages."],
                ["Percentage Increase", "A rise measured relative to the original value."],
                ["Percentage Decrease", "A fall measured relative to the original value."],
                ["Percentage Difference", "A comparison of two values often defined with an average denominator; not a separate mode here."],
                ["Ratio", "A comparison of two quantities by division."],
                ["Decimal", "A base-10 number such as 0.25, equivalent to 25%."],
                ["Fraction", "A number written as one quantity over another, such as 25/100."],
                ["Absolute Change", "The direct difference between two values."],
                ["Relative Change", "A change divided by a reference value, often expressed as a percentage."],
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
                  href="https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_%28OpenStax%29/06%3A_Percents"
                >
                  OpenStax via Mathematics LibreTexts. Prealgebra 2e, Chapter 6: Percents.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_%28OpenStax%29/06%3A_Percents/6.03%3A_Solve_General_Applications_of_Percent"
                >
                  OpenStax via Mathematics LibreTexts. Solve General Applications of Percent.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-7-rules-and-style-conventions-expressing-values"
                >
                  National Institute of Standards and Technology. Guide to the SI, Chapter 7.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This percentage calculator provides mathematical estimates based on user inputs. The
              results are for educational and informational purposes only. Verify critical
              calculations independently. This tool does not provide financial, legal, tax,
              accounting, statistical, or other professional advice.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
