import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { BodyWeightTool } from "./body-weight-tool"

const pagePath = "/body-weight-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Body Weight Calculator | Ideal and Healthy Weight"
const pageDescription =
  "Estimate adult ideal body weight from height with Devine, Robinson, Miller, and Hamwi formulas plus a BMI-based healthy weight range."

const formulas = [
  {
    name: "Devine",
    female: "45.5 kg + 2.3 kg x inches over 5 ft",
    male: "50 kg + 2.3 kg x inches over 5 ft",
  },
  {
    name: "Robinson",
    female: "49 kg + 1.7 kg x inches over 5 ft",
    male: "52 kg + 1.7 kg x inches over 5 ft",
  },
  {
    name: "Miller",
    female: "53.1 kg + 1.36 kg x inches over 5 ft",
    male: "56.2 kg + 1.36 kg x inches over 5 ft",
  },
  {
    name: "Hamwi",
    female: "45.5 kg + 2.7 kg x inches over 5 ft",
    male: "48 kg + 2.7 kg x inches over 5 ft",
  },
]

const faqs = [
  {
    question: "What is a healthy body weight?",
    answer:
      "A healthy body weight is a range that supports health for a person's height and context. This calculator shows a BMI-based range and ideal weight estimates.",
  },
  {
    question: "How is body weight calculated here?",
    answer:
      "The tool converts height to total inches, calculates Devine, Robinson, Miller, and Hamwi ideal weight estimates, and averages those estimates.",
  },
  {
    question: "What is ideal body weight?",
    answer:
      "Ideal body weight is an estimated reference weight based mainly on height and sex. It is not a required target for every person.",
  },
  {
    question: "Which formulas does this calculator use?",
    answer:
      "It uses the Devine, Robinson, Miller, and Hamwi adult ideal body weight formulas, then displays their average.",
  },
  {
    question: "Is body weight the same as BMI?",
    answer:
      "No. Body weight is mass measured in kilograms or pounds. BMI relates weight to height and is used as a screening measure.",
  },
  {
    question: "Is ideal body weight accurate?",
    answer:
      "Ideal body weight formulas are estimates. They can be useful references but do not measure body fat, fitness, or overall health.",
  },
  {
    question: "Does muscle affect body weight?",
    answer:
      "Yes. Muscle, bone, water, and fat all contribute to body weight. Formula estimates do not distinguish between these tissues.",
  },
  {
    question: "Does age affect healthy weight?",
    answer:
      "Age can affect body composition, muscle mass, and health needs, but this calculator's ideal weight formulas do not include age.",
  },
  {
    question: "Can I use this calculator during pregnancy?",
    answer:
      "No. Pregnancy has specific weight-gain guidance and should be discussed with a qualified healthcare professional.",
  },
  {
    question: "Is this calculator suitable for children?",
    answer:
      "No. The formulas and BMI-based range shown here are adult estimates, not pediatric growth assessments.",
  },
  {
    question: "Why are there different ideal weight formulas?",
    answer:
      "Different formulas were developed from different assumptions and use cases, so they can give slightly different estimates.",
  },
  {
    question: "How often should I check my body weight?",
    answer:
      "Occasional checks can help track trends, but day-to-day weight changes often reflect fluid, food, and normal variation.",
  },
  {
    question: "What should I do if my weight is outside the recommended range?",
    answer:
      "Use the result as a prompt for context, not a diagnosis. A clinician can review medical history, body composition, and health markers.",
  },
  {
    question: "Does the calculator use metric and imperial units?",
    answer:
      "Yes. Metric height is entered in centimeters. U.S. height is entered in feet and inches, then converted internally.",
  },
  {
    question: "Why does the calculator show a BMI-based healthy range?",
    answer:
      "The range is calculated from adult BMI values 18.5 to 24.9 for the entered height, giving a broad reference interval.",
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
    name: "Body Weight Calculator",
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
    name: "Body Weight Calculator",
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
        name: "Body Weight Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate ideal body weight",
    description: "Estimate adult ideal body weight from height and sex.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select units",
        text: "Choose Metric or U.S. units.",
      },
      {
        "@type": "HowToStep",
        name: "Select sex",
        text: "Choose female or male as used by the implemented formulas.",
      },
      {
        "@type": "HowToStep",
        name: "Enter height",
        text: "Enter height in centimeters, or feet and inches.",
      },
      {
        "@type": "HowToStep",
        name: "Review estimates",
        text: "Read the formula average, healthy BMI range, and individual formula comparison.",
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

export default function BodyWeightCalculatorPage() {
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
          <BodyWeightTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is Body Weight?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Body weight is the total mass of the body, usually measured in kilograms or pounds.
                A healthy body weight is broader than one number: it depends on height, body
                composition, age, sex, genetics, lifestyle, and medical context.
              </p>
              <p>
                Healthcare professionals assess body weight because changes in weight can help
                guide nutrition, fitness, medication dosing, and general health discussions. This
                calculator gives adult reference estimates, not a personalized diagnosis.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Height input", "Enter centimeters in Metric mode, or feet and inches in U.S. mode."],
                ["Sex selection", "Choose female or male because the implemented formulas use different base values."],
                ["Final result", "The tool shows the average of four formulas plus a BMI-based healthy weight range."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formulas" title="Body Weight Formulas Used" />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-[var(--page-cream)] text-[var(--ink-900)]">
                  <tr>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Formula</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Female</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Male</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-700)]">
                  {formulas.map((formula) => (
                    <tr key={formula.name}>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3 font-semibold text-[var(--ink-900)]">
                        {formula.name}
                      </td>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{formula.female}</td>
                      <td className="border border-[var(--ink-900)]/10 px-4 py-3">{formula.male}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                In each equation, inches over 5 ft means total height in inches minus 60, with a
                minimum of zero. Metric height is converted to inches before formulas are applied.
              </p>
              <p>
                The healthy range shown by the calculator uses BMI 18.5 to 24.9 multiplied by height
                in meters squared, then converts the range to pounds when U.S. units are selected.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Calculation" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>Example inputs: female, 170 cm tall. The calculator converts 170 cm to 66.93 in.</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Inches over 5 ft: 66.93 - 60 = 6.93.</li>
                <li>Devine: 45.5 + 2.3 x 6.93 = 61.4 kg.</li>
                <li>Robinson: 49 + 1.7 x 6.93 = 60.8 kg.</li>
                <li>Miller: 53.1 + 1.36 x 6.93 = 62.5 kg.</li>
                <li>Hamwi: 45.5 + 2.7 x 6.93 = 64.2 kg.</li>
                <li>Average: about 62.2 kg.</li>
              </ol>
              <InfoBox>
                Interpretation: this is an adult ideal body weight estimate from height-based
                formulas. It should be compared with body composition, health history, and clinician
                guidance when medical decisions are involved.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select Metric or U.S. units.</li>
              <li>Select female or male as used by the implemented adult formulas.</li>
              <li>Enter height in centimeters, or feet and inches.</li>
              <li>Review the automatically updated formula average.</li>
              <li>Compare the individual formulas and BMI-based healthy weight range.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Formula average</strong>
                A combined reference value from Devine, Robinson, Miller, and Hamwi estimates.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Healthy BMI range</strong>
                A broad adult weight range based on BMI 18.5 to 24.9 for the entered height.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Individual formulas</strong>
                Separate estimates that show how formula assumptions can change the result.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Clinical context</strong>
                Medical interpretation should include body composition, symptoms, labs, and history.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Context" title="Factors Affecting Healthy Body Weight" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Height affects the reference range used by every formula here.</li>
              <li>Age can change muscle mass, bone density, and health priorities.</li>
              <li>Sex is included because the formulas use different base values.</li>
              <li>Muscle mass and body composition can make formula estimates misleading.</li>
              <li>Genetics, lifestyle, sleep, nutrition, and activity influence weight over time.</li>
              <li>Medical conditions and medications can affect body weight and fluid balance.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, and Accuracy Tips" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Benefits</strong>
                Quick estimation, easy screening context, fitness planning support, goal tracking,
                and education about formula differences.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Limitations</strong>
                Estimates do not measure body fat or overall health and may not fit athletes,
                pregnancy, children, or people with unusual body composition.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Accuracy tips</strong>
                Measure height carefully, select the correct unit system, and double-check values
                before interpreting the result.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Mistakes" title="Common Mistakes to Avoid" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Mixing metric and U.S. height units.</li>
              <li>Entering total inches in the feet field.</li>
              <li>Using outdated or guessed height measurements.</li>
              <li>Treating ideal weight as a required target.</li>
              <li>Ignoring body composition, muscle mass, or medical context.</li>
              <li>Using adult formulas for children or pregnancy.</li>
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/bmi-calculator">
                BMI Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/creatinine-clearance-calculator">
                Creatinine Clearance Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/age-calculator">
                Age Calculator
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Key Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Body Weight", "Total body mass measured in kilograms or pounds."],
                ["Healthy Weight", "A broad weight range that may support health for a given height and context."],
                ["Ideal Body Weight", "A formula-based reference estimate, usually based on height and sex."],
                ["BMI", "Body mass index, calculated from weight relative to height."],
                ["Body Composition", "The body's mix of fat, muscle, bone, water, and other tissues."],
                ["Lean Body Mass", "Body mass excluding fat mass, including muscle, bone, organs, and water."],
                ["Metric Units", "Centimeters and kilograms in this calculator."],
                ["Imperial Units", "Feet, inches, and pounds in common U.S. usage."],
                ["Weight Range", "A lower-to-upper interval rather than a single target number."],
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
              <li>
                Pai MP. The origin of the ideal body weight equations. <em>Ann Pharmacother.</em>{" "}
                2000;34(9):1066-1069.
              </li>
              <li>
                McCarron MM, Devine BJ. Clinical Pharmacy: Case Studies: Case Number 25 Gentamicin
                Therapy. <em>Drug Intell Clin Pharm.</em> 1974;8:650-655.
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="medical">
          <p>
            This body weight calculator provides estimates for informational and educational
            purposes only. Results are not intended to diagnose, treat, or replace professional
            medical advice. Consult a qualified healthcare professional for personalized guidance,
            especially for children, pregnancy, eating concerns, chronic disease, medication
            dosing, or major weight changes.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
