import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { CreatinineClearanceTool } from "./creatinine-clearance-tool"

const pagePath = "/creatinine-clearance-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Creatinine Clearance Calculator | Cockcroft-Gault CrCl"
const pageDescription =
  "Estimate adult creatinine clearance in mL/min with the Cockcroft-Gault equation using age, sex, body weight, and serum creatinine."

const faqs = [
  {
    question: "What does this creatinine clearance calculator estimate?",
    answer:
      "It estimates adult creatinine clearance, often abbreviated CrCl, in mL/min using the Cockcroft-Gault equation.",
  },
  {
    question: "What formula does the calculator use?",
    answer:
      "It uses CrCl = ((140 - age) x weight in kg x sex factor) / (72 x serum creatinine in mg/dL), with a sex factor of 0.85 for female and 1.00 for male.",
  },
  {
    question: "Is creatinine clearance the same as eGFR?",
    answer:
      "No. Creatinine clearance is reported in mL/min and is not indexed to body surface area, while many eGFR results are reported as mL/min/1.73 m2.",
  },
  {
    question: "Can this calculator be used for children?",
    answer:
      "No. The Cockcroft-Gault equation was developed for adults. Pediatric kidney function estimates usually use pediatric-specific equations and clinician review.",
  },
  {
    question: "Why does the calculator ask for body weight?",
    answer:
      "The Cockcroft-Gault equation uses body weight as a proxy for creatinine production, which is related to muscle mass.",
  },
  {
    question: "Which creatinine units can I enter?",
    answer:
      "You can enter serum creatinine in mg/dL or umol/L. The calculator converts umol/L to mg/dL before applying the equation.",
  },
  {
    question: "What does a lower creatinine clearance mean?",
    answer:
      "A lower result can suggest reduced kidney filtration, but interpretation depends on medical history, lab trends, urine testing, medications, and clinical context.",
  },
  {
    question: "Can creatinine clearance be used for medication dosing?",
    answer:
      "Many drug labels and dosing references use renal function estimates, but medication decisions should be made by a qualified clinician or pharmacist.",
  },
  {
    question: "Does the result diagnose chronic kidney disease?",
    answer:
      "No. CKD diagnosis generally depends on persistent kidney abnormalities over time, often including eGFR and urine albumin results, not one calculator result alone.",
  },
  {
    question: "Why is there a 0.85 factor for female sex?",
    answer:
      "The original Cockcroft-Gault equation applies a 0.85 multiplier for female patients to reflect lower average creatinine production in the study population.",
  },
  {
    question: "When may this estimate be less reliable?",
    answer:
      "It may be less reliable during acute kidney injury, pregnancy, very high or low muscle mass, amputations, severe malnutrition, or extremes of body size.",
  },
  {
    question: "Should I use actual, ideal, or adjusted body weight?",
    answer:
      "This calculator uses the body weight you enter. Clinical dosing references may specify actual, ideal, or adjusted weight depending on the medication and patient.",
  },
  {
    question: "Why can serum creatinine look normal when clearance is low?",
    answer:
      "Serum creatinine is influenced by age, sex, muscle mass, and creatinine production, so a single creatinine number can miss reduced clearance in some adults.",
  },
  {
    question: "Do I need a 24-hour urine collection?",
    answer:
      "This calculator does not require urine collection. Measured creatinine clearance from timed urine may be used when estimates are unreliable or more precision is needed.",
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
    name: "Creatinine Clearance Calculator",
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
        name: "Creatinine Clearance Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate creatinine clearance",
    description: "Estimate adult CrCl with the Cockcroft-Gault equation.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter sex and age",
        text: "Choose male or female and enter the adult age in years.",
      },
      {
        "@type": "HowToStep",
        name: "Enter body weight",
        text: "Enter body weight and select kilograms or pounds.",
      },
      {
        "@type": "HowToStep",
        name: "Enter serum creatinine",
        text: "Enter serum creatinine and select mg/dL or umol/L.",
      },
      {
        "@type": "HowToStep",
        name: "Review the result",
        text: "Read the estimated creatinine clearance in mL/min and review the calculation notes.",
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

export default function CreatinineClearanceCalculatorPage() {
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
          <CreatinineClearanceTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is This Calculator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                This creatinine clearance calculator estimates how much blood plasma the kidneys
                clear of creatinine each minute. It is based on the Cockcroft-Gault equation, a
                long-used adult CrCl formula that combines age, body weight, sex, and serum
                creatinine.
              </p>
              <p>
                Creatinine clearance is commonly discussed when reviewing kidney function, renal
                dosing references, and whether a creatinine value should be interpreted in the
                context of age and body size. It should be treated as an estimate, not a diagnosis.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Inputs", "Age in years, sex, body weight, serum creatinine, and selected units."],
                ["Conversions", "Pounds are converted to kilograms. Serum creatinine in umol/L is divided by 88.4."],
                ["Output", "Estimated creatinine clearance is displayed in mL/min."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formula" title="Cockcroft-Gault Equation" />
            <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--ink-700)]">
              <div className="overflow-x-auto rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <code className="whitespace-nowrap text-base font-semibold text-[var(--ink-900)]">
                  CrCl = ((140 - age) x weight kg x sex factor) / (72 x SCr)
                </code>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                <li>
                  <strong className="text-[var(--ink-900)]">CrCl:</strong> estimated creatinine
                  clearance in mL/min.
                </li>
                <li>
                  <strong className="text-[var(--ink-900)]">Age:</strong> adult age in years.
                </li>
                <li>
                  <strong className="text-[var(--ink-900)]">Weight:</strong> body weight in kilograms.
                </li>
                <li>
                  <strong className="text-[var(--ink-900)]">SCr:</strong> serum creatinine in mg/dL.
                </li>
                <li>
                  <strong className="text-[var(--ink-900)]">Sex factor:</strong> 1.00 for male and
                  0.85 for female in this equation.
                </li>
                <li>
                  <strong className="text-[var(--ink-900)]">Unit note:</strong> 1 mg/dL is commonly
                  converted from about 88.4 umol/L.
                </li>
              </ul>
              <p>
                Cockcroft-Gault estimates creatinine clearance, not body-surface-area-indexed eGFR.
                CKD-EPI and MDRD equations are different kidney function estimates and may be
                preferred for CKD staging or routine lab reporting.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Worked Example" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Example inputs: male, age 55 years, body weight 80 kg, serum creatinine 1.1 mg/dL.
              </p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Substitute the values: ((140 - 55) x 80 x 1.00) / (72 x 1.1).</li>
                <li>Calculate the numerator: 85 x 80 x 1.00 = 6,800.</li>
                <li>Calculate the denominator: 72 x 1.1 = 79.2.</li>
                <li>Divide: 6,800 / 79.2 = 85.86 mL/min.</li>
              </ol>
              <InfoBox>
                Interpretation: this example gives an estimated CrCl of about 86 mL/min. A clinician
                would interpret that number alongside trends, medication needs, urine albumin,
                symptoms, and the reason kidney function is being assessed.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select male or female as used by the Cockcroft-Gault equation.</li>
              <li>Enter adult age in years.</li>
              <li>Enter body weight and choose kg or lb.</li>
              <li>Enter serum creatinine from a blood test and choose mg/dL or umol/L.</li>
              <li>Read the estimated creatinine clearance and the converted values used.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Result" />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-[var(--page-cream)] text-[var(--ink-900)]">
                  <tr>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">CrCl range</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">General meaning</th>
                    <th className="border border-[var(--ink-900)]/10 px-4 py-3">Important note</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-700)]">
                  <tr>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">90 mL/min or higher</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Often compatible with preserved filtration.</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Kidney health also depends on urine and clinical findings.</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">60-89 mL/min</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Mildly lower estimate in many adults.</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Age, muscle mass, and body size matter.</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">30-59 mL/min</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Moderately reduced estimate.</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Medication review and follow-up testing may be needed.</td>
                  </tr>
                  <tr>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Below 30 mL/min</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Severely reduced estimate.</td>
                    <td className="border border-[var(--ink-900)]/10 px-4 py-3">Prompt clinical interpretation is important.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, and Accuracy Tips" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Benefits</strong>
                Quick CrCl estimate, supports unit conversion, and shows the values used in the
                calculation.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Limitations</strong>
                Less reliable in acute kidney injury, pregnancy, amputations, unusual muscle mass,
                severe malnutrition, and extremes of body size.
              </InfoBox>
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Accuracy tips</strong>
                Use a recent stable serum creatinine, confirm units, enter weight carefully, and
                compare with clinician-reviewed lab reports.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Mistakes" title="Common Mistakes to Avoid" />
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <li>Mixing up mg/dL and umol/L creatinine units.</li>
              <li>Entering pounds while kg is selected, or kilograms while lb is selected.</li>
              <li>Using the result as a diagnosis without urine testing or clinical review.</li>
              <li>Assuming Cockcroft-Gault CrCl is identical to lab-reported eGFR.</li>
              <li>Using the equation for children, pregnancy, or unstable acute kidney injury.</li>
              <li>Ignoring medication-specific dosing instructions about weight selection.</li>
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
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/body-weight-calculator">
                Body Weight Calculator
              </Link>
              <Link className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white" href="/unit-converter">
                Unit Converter
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Key Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              <div>
                <dt className="font-semibold text-[var(--ink-900)]">Creatinine</dt>
                <dd>A waste product from muscle metabolism measured in blood and urine.</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--ink-900)]">Creatinine clearance</dt>
                <dd>An estimate of how quickly creatinine is cleared from blood, reported in mL/min.</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--ink-900)]">Serum creatinine</dt>
                <dd>The creatinine concentration measured in a blood sample.</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--ink-900)]">eGFR</dt>
                <dd>Estimated glomerular filtration rate, often indexed to 1.73 m2 body surface area.</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--ink-900)]">Cockcroft-Gault equation</dt>
                <dd>An adult formula that estimates CrCl from age, weight, sex, and serum creatinine.</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--ink-900)]">Renal dosing</dt>
                <dd>Adjusting medication selection or dose based on kidney function and drug labeling.</dd>
              </div>
            </dl>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Sources" title="References" />
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--ink-700)]">
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://pubmed.ncbi.nlm.nih.gov/1244564/"
                >
                  Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine.
                </a>{" "}
                <em>Nephron.</em> 1976;16(1):31-41.
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://kdigo.org/guidelines/ckd-evaluation-and-management/"
                >
                  Kidney Disease: Improving Global Outcomes (KDIGO). 2024 Clinical Practice
                  Guideline for the Evaluation and Management of Chronic Kidney Disease.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.kidney.org/professionals/kdoqi/guidelines_ckd"
                >
                  National Kidney Foundation. KDOQI clinical practice guidelines for chronic kidney
                  disease: evaluation, classification, and stratification.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/pharmacokinetics-patients-impaired-renal-function-study-design-data-analysis-and-impact-dosing"
                >
                  U.S. Food and Drug Administration. Pharmacokinetics in Patients with Impaired
                  Renal Function: Study Design, Data Analysis, and Impact on Dosing.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="medical">
          <p>
            This calculator is for general education only. It does not provide medical advice,
            diagnosis, treatment, medication dosing, or emergency guidance. Kidney function
            interpretation should be reviewed with a licensed healthcare professional who can
            consider your full medical history, lab trends, medications, and current condition.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
