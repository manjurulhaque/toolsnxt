import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { BmiTool } from "./bmi-tool"

const pagePath = "/bmi-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "BMI Calculator | Body Mass Index Calculator"
const pageDescription =
  "Calculate adult BMI with metric or U.S. units, view BMI categories, formulas, examples, limitations, and medical references."

const faqs = [
  {
    question: "What is BMI?",
    answer:
      "BMI, or body mass index, is a height-and-weight calculation used to estimate adult weight status.",
  },
  {
    question: "How is BMI calculated?",
    answer:
      "Metric BMI is weight in kilograms divided by height in meters squared. U.S. BMI is 703 times weight in pounds divided by height in inches squared.",
  },
  {
    question: "What is a healthy BMI for adults?",
    answer:
      "For most adults, a BMI from 18.5 to 24.9 is classified as healthy weight by CDC adult BMI categories.",
  },
  {
    question: "Is BMI accurate?",
    answer:
      "BMI is useful as a screening tool, but it does not directly measure body fat, fitness, or overall health.",
  },
  {
    question: "Does BMI measure body fat?",
    answer:
      "No. BMI uses height and weight only. Body fat, muscle, bone density, and fat distribution require other assessments.",
  },
  {
    question: "Does BMI work for athletes?",
    answer:
      "BMI can overestimate weight-related risk in muscular athletes because it does not distinguish muscle from fat.",
  },
  {
    question: "Is BMI different for men and women?",
    answer:
      "The adult BMI formula and standard categories are the same for men and women, but body composition can differ.",
  },
  {
    question: "Is BMI different for children?",
    answer:
      "Yes. Children and teens use BMI-for-age percentiles based on age and sex, not fixed adult BMI ranges.",
  },
  {
    question: "Why is BMI important?",
    answer:
      "BMI is quick, inexpensive, and widely used for screening weight status and monitoring population health trends.",
  },
  {
    question: "Can BMI predict disease?",
    answer:
      "BMI can be associated with health risks at a population level, but it cannot diagnose disease or predict an individual's future health by itself.",
  },
  {
    question: "What are BMI limitations?",
    answer:
      "BMI may be misleading for athletes, older adults, pregnant people, children, and some ethnic populations.",
  },
  {
    question: "How often should I calculate BMI?",
    answer:
      "Occasional checks can help monitor weight trends, but frequent BMI checks are usually less useful than long-term patterns and clinical context.",
  },
  {
    question: "What should I do if my BMI is high?",
    answer:
      "Consider discussing the result with a qualified healthcare professional, especially if you have symptoms, medical conditions, or medication questions.",
  },
  {
    question: "What should I do if my BMI is low?",
    answer:
      "A low BMI can have many causes. A healthcare professional can help review nutrition, medical history, and any concerning symptoms.",
  },
  {
    question: "Can I use this BMI calculator during pregnancy?",
    answer:
      "Adult BMI categories are not designed to interpret pregnancy weight changes. Use pregnancy-specific guidance from a clinician.",
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
    name: "BMI Calculator",
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
    name: "BMI Calculator",
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
        name: "BMI Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate BMI",
    description: "Calculate adult body mass index with metric or U.S. units.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select units",
        text: "Choose Metric or U.S. units.",
      },
      {
        "@type": "HowToStep",
        name: "Enter height",
        text: "Enter height in centimeters, or feet and inches.",
      },
      {
        "@type": "HowToStep",
        name: "Enter weight",
        text: "Enter weight in kilograms or pounds.",
      },
      {
        "@type": "HowToStep",
        name: "Review BMI",
        text: "Read the BMI score, category, and healthy range shown by the calculator.",
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

export default function BmiCalculatorPage() {
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
          <BmiTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is BMI?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Body mass index is a calculated measure of body weight relative to height. Healthcare
                professionals commonly use BMI as a quick adult screening tool because it is simple,
                inexpensive, and standardized across metric and U.S. units.
              </p>
              <p>
                BMI is not a diagnosis and does not directly measure body fat. It is best used as one
                piece of context alongside medical history, physical exam findings, waist
                circumference, lab results, and body composition when those details are available.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formula" title="BMI Formula" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Metric formula</strong>
                <p className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                  BMI = weight (kg) / height<sup>2</sup> (m<sup>2</sup>)
                </p>
                <span>Weight is kilograms and height is meters squared.</span>
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">U.S. formula</strong>
                <p className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                  BMI = 703 x weight (lb) / height<sup>2</sup> (in<sup>2</sup>)
                </p>
                <span>Weight is pounds and height is total inches squared.</span>
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Height", "Enter centimeters in Metric mode, or feet and inches in U.S. mode."],
                ["Weight", "Enter kilograms in Metric mode, or pounds in U.S. mode."],
                ["Category", "The calculator assigns the adult BMI category from the calculated BMI score."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Chart" title="Adult BMI Categories" />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead className="bg-[var(--page-cream)] text-[var(--ink-900)]">
                  <tr>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">BMI</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Classification</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-700)]">
                  {[
                    ["Below 18.5", "Underweight"],
                    ["18.5-24.9", "Healthy Weight"],
                    ["25.0-29.9", "Overweight"],
                    ["30.0-34.9", "Obesity Class I"],
                    ["35.0-39.9", "Obesity Class II"],
                    ["40 or higher", "Obesity Class III"],
                  ].map(([range, classification]) => (
                    <tr key={range}>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{range}</td>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{classification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
              Adult BMI classifications may vary slightly between organizations and populations.
              Children and teens use age- and sex-specific BMI percentiles rather than this adult
              chart.
            </p>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Calculation" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>Example inputs: height 175 cm and weight 70 kg.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Convert height to meters: 175 cm = 1.75 m.</li>
                <li>Substitute the values: BMI = 70 / (1.75 x 1.75).</li>
                <li>Square height: 1.75 x 1.75 = 3.0625.</li>
                <li>Divide weight by height squared: 70 / 3.0625 = 22.9.</li>
              </ol>
              <InfoBox>
                Interpretation: a BMI of 22.9 is in the adult Healthy Weight category. This is a
                screening result, not a diagnosis of health or fitness.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the BMI Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select Metric or U.S. units.</li>
              <li>Enter your height in the visible height fields.</li>
              <li>Enter your weight in the visible weight field.</li>
              <li>Review the automatically updated BMI score and category.</li>
              <li>Read the healthy range, category chart, and interpretation notes.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding Your Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Underweight</strong>
                May indicate body weight is below the adult reference range for height.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Healthy Weight</strong>
                Falls within the standard adult BMI reference range.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Overweight</strong>
                Falls above the standard adult healthy weight BMI range.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Obesity Classes</strong>
                BMI of 30 or higher is subdivided into Class I, Class II, and Class III.
              </InfoBox>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--ink-700)]">
              BMI does not directly measure body fat. Muscle mass, age, ethnicity, pregnancy, body
              composition, and waist circumference can all affect interpretation.
            </p>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits and Limitations" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Benefits</strong>
                BMI is quick, easy to calculate, widely accepted, useful for adult screening, and
                helpful for monitoring broad weight trends over time.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Limitations</strong>
                BMI may be less informative for athletes, bodybuilders, older adults, pregnant
                individuals, children, adolescents, and some ethnic populations.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Tips and Common Mistakes" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Tips for Accurate Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Measure height without shoes.</li>
                  <li>Weigh yourself under consistent conditions.</li>
                  <li>Select the correct unit system before entering values.</li>
                  <li>Double-check height and weight entries.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Mixing metric and U.S. units.</li>
                  <li>Entering inches as feet or centimeters as meters.</li>
                  <li>Using outdated height or weight measurements.</li>
                  <li>Treating BMI as a diagnosis.</li>
                  <li>Applying adult BMI categories to children.</li>
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/body-weight-calculator">
                Body Weight Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/age-calculator">
                Age Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/percentage-calculator">
                Percentage Calculator
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Key Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["BMI", "A number calculated from height and weight to estimate adult weight status."],
                ["Body Mass Index", "The full name for BMI."],
                ["Underweight", "An adult BMI below 18.5."],
                ["Healthy Weight", "An adult BMI from 18.5 to 24.9."],
                ["Overweight", "An adult BMI from 25.0 to 29.9."],
                ["Obesity", "An adult BMI of 30.0 or higher."],
                ["Metric Units", "Centimeters and kilograms in this calculator."],
                ["Imperial Units", "Feet, inches, and pounds in this calculator."],
                ["Body Composition", "The body's mix of fat, muscle, bone, and other tissues."],
                ["Screening Tool", "A quick check that may indicate whether more assessment is useful."],
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
                  href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"
                >
                  Centers for Disease Control and Prevention. Adult BMI Categories.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.cdc.gov/bmi/adult-calculator/index.html"
                >
                  Centers for Disease Control and Prevention. Adult BMI Calculator.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.nhlbi.nih.gov/calculate-your-bmi"
                >
                  National Heart, Lung, and Blood Institute. Calculate Your BMI.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"
                >
                  World Health Organization. Obesity and overweight.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Medical Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This BMI calculator is for informational and educational purposes only. BMI is a
              screening tool, not a diagnosis of disease, body fat, or individual health. Speak with
              a qualified healthcare professional for personalized medical advice, especially for
              children, pregnancy, eating concerns, chronic disease, or major weight changes.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
