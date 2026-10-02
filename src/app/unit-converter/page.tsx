import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { UnitTool } from "./unit-tool"

const pagePath = "/unit-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Unit Converter | Metric, Imperial, Temperature, Volume and Speed"
const pageDescription =
  "Convert length, weight, temperature, volume, area, and speed units online with side-by-side results and scientific notation for very large or small values."

const faqs = [
  {
    question: "What is a unit converter?",
    answer:
      "A unit converter changes a value from one measurement unit to another within the same category, such as meters to feet or Celsius to Fahrenheit.",
  },
  {
    question: "How does this unit converter work?",
    answer:
      "For most categories it converts through a base unit. Temperature uses formulas because Celsius, Fahrenheit, and Kelvin do not share a simple zero point.",
  },
  {
    question: "What is the metric system?",
    answer:
      "The metric system is a decimal measurement system. The modern international form is the SI, used widely in science, engineering, and commerce.",
  },
  {
    question: "What is the imperial system?",
    answer:
      "Imperial and U.S. customary units include units such as inch, foot, yard, mile, ounce, pound, pint, and gallon.",
  },
  {
    question: "Which units are supported?",
    answer:
      "This page supports length, weight, temperature, volume, area, and speed units listed in the converter.",
  },
  {
    question: "How accurate are the conversions?",
    answer:
      "The converter uses the constants implemented in the page and formats results for display. Critical work should be independently verified.",
  },
  {
    question: "How are temperature conversions calculated?",
    answer:
      "Temperature is converted through Celsius using formulas for Fahrenheit and Kelvin instead of fixed multipliers.",
  },
  {
    question: "Why are some values rounded?",
    answer:
      "Display formatting limits ordinary decimal output to a maximum number of fractional digits.",
  },
  {
    question: "Can I convert engineering units?",
    answer:
      "You can convert the supported engineering-adjacent units for length, mass, area, volume, temperature, and speed.",
  },
  {
    question: "Can I convert scientific units?",
    answer:
      "The converter includes SI-related units such as meter, kilogram, gram, liter, square meter, meter per second, and kelvin.",
  },
  {
    question: "Does the converter support SI units?",
    answer:
      "Yes, for the implemented categories. It includes meters, kilograms or grams, kelvin, square meters, cubic meters, and meters per second.",
  },
  {
    question: "What is scientific notation?",
    answer:
      "Scientific notation writes very large or small values with powers of 10, such as 1.23e+6.",
  },
  {
    question: "Why is my result different from another calculator?",
    answer:
      "Differences can come from rounding, unit definitions, display precision, or selecting a different unit such as U.S. gallon versus another gallon type.",
  },
  {
    question: "Can I convert very large numbers?",
    answer:
      "Yes, if the browser can represent the number as a finite JavaScript number. Very large or tiny results may be shown in scientific notation.",
  },
  {
    question: "Is this converter free?",
    answer:
      "Yes. This unit conversion calculator is a free browser tool.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The page is responsive and uses standard form controls for mobile and desktop browsers.",
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
    about: ["Unit Converter", "Metric Converter", "Measurement Converter", "Conversion Calculator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Unit Converter",
    applicationCategory: "UtilitiesApplication",
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
    name: "Unit Converter",
    applicationCategory: "UtilitiesApplication",
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
        name: "Unit Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert units online",
    description: "Convert values between supported measurement units.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select a category",
        text: "Choose length, weight, temperature, volume, area, or speed.",
      },
      {
        "@type": "HowToStep",
        name: "Enter a value",
        text: "Type the source measurement value.",
      },
      {
        "@type": "HowToStep",
        name: "Choose units",
        text: "Select the From and To units.",
      },
      {
        "@type": "HowToStep",
        name: "Review result",
        text: "Read the converted value and the side-by-side unit list.",
      },
      {
        "@type": "HowToStep",
        name: "Swap if needed",
        text: "Use Swap to reverse the selected units.",
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

export default function UnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
          <UnitTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Unit Converter?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A unit converter changes a measurement from one unit to another while preserving
                the same physical quantity. Unit conversion matters in education, engineering,
                science, construction, manufacturing, healthcare, travel, cooking, and everyday
                planning because people often work across metric and imperial systems.
              </p>
              <p>
                Standardized units reduce ambiguity. The metric system, including SI units, is
                decimal-based and widely used internationally, while imperial and U.S. customary
                units remain common in some everyday and industry contexts.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Unit Converter Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Category selection", "Choose length, weight, temperature, volume, area, or speed."],
                ["From and To units", "Select the source and destination units from the active category."],
                ["Instant result", "The result updates as the value or selected units change."],
                ["Swap units", "Swap reverses the current From and To selections."],
                ["Comparison list", "The result panel also shows the entered value converted to every unit in the category."],
                ["Scientific notation", "Very large or very small values may be displayed with exponential notation."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Categories" title="Supported Unit Categories" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Length", "Millimeter, centimeter, meter, kilometer, inch, foot, yard, mile."],
                ["Weight", "Milligram, gram, kilogram, ounce, pound, stone."],
                ["Temperature", "Celsius, Fahrenheit, kelvin."],
                ["Volume", "Milliliter, liter, cubic meter, teaspoon, tablespoon, cup, pint, gallon."],
                ["Area", "Square meter, square kilometer, square foot, square yard, acre, hectare."],
                ["Speed", "Meter per second, kilometer per hour, mile per hour, foot per second, knot."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Conversion Accuracy" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Most categories use fixed conversion factors to and from a base unit for that
                category. Temperature conversions use formulas because the scales have different
                zero points. Display precision is controlled by the page formatter: ordinary
                numbers show up to 8 fractional digits, while very large or very small results use
                scientific notation.
              </p>
              <InfoBox>
                For critical engineering, scientific, medical, legal, or commercial work, verify
                the result against the applicable standard, specification, or professional workflow.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Common Conversion Examples" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Length", "10 kilometers to miles."],
                ["Weight", "5 kilograms to pounds."],
                ["Temperature", "25 C to F."],
                ["Volume", "2 liters to gallons."],
                ["Speed", "100 km/h to mph."],
                ["Area", "1 acre to square meters."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Unit Converter" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Select a measurement category.</li>
              <li>Enter the value you want to convert.</li>
              <li>Choose the source unit in the From selector.</li>
              <li>Choose the destination unit in the To selector.</li>
              <li>View the converted result and all matching units.</li>
              <li>Use Swap when you need to reverse the conversion direction.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Converted value", "The main result shows the entered value converted into the selected To unit."],
                ["Selected units", "The From and To selectors define the conversion direction."],
                ["All units list", "Every unit in the active category is shown for quick comparison."],
                ["Rounded values", "Displayed decimal values may be rounded by the formatter."],
                ["Scientific notation", "Extremely large or small results may appear in e notation."],
                ["Invalid input", "If the input is empty or not finite, the result asks for a number."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Uses" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Engineering and physics", "Check length, area, volume, speed, mass, and temperature values."],
                ["Construction and manufacturing", "Move between metric and imperial measurements used in plans, materials, and specifications."],
                ["Education", "Practice metric, imperial, temperature, area, and speed conversions."],
                ["Cooking and travel", "Convert cups, pints, gallons, liters, miles, kilometers, and temperatures."],
                ["Healthcare and science", "Convert supported mass, volume, and temperature values for general learning."],
                ["International trade", "Compare measurements across systems when reviewing product dimensions or quantities."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limits, Tips and Common Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Fast conversions across multiple measurement systems.</li>
                  <li>Reduces manual calculation errors.</li>
                  <li>Useful for students, professionals, and everyday tasks.</li>
                  <li>Shows side-by-side values across the whole category.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only the implemented categories and units are supported.</li>
                  <li>Displayed values may be rounded.</li>
                  <li>Very large or small values may use scientific notation.</li>
                  <li>Critical calculations should be independently verified.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Accurate Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Select the correct measurement category first.</li>
                  <li>Verify source and destination units before using the result.</li>
                  <li>Check decimal placement carefully.</li>
                  <li>Use enough precision for the task at hand.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Selecting the wrong category.</li>
                  <li>Confusing weight and mass terminology.</li>
                  <li>Mixing metric and imperial unit abbreviations.</li>
                  <li>Confusing Celsius, Fahrenheit, and kelvin.</li>
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
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/scientific-calculator"
              >
                Scientific Calculator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/percentage-calculator"
              >
                Percentage Calculator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/bmi-calculator"
              >
                BMI Calculator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/age-calculator"
              >
                Age Calculator
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/timezone-converter"
              >
                Timezone Converter
              </Link>
              <Link
                className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                href="/loan-calculator"
              >
                Loan Calculator
              </Link>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="Measurement Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Unit", "A defined quantity used to express a measurement."],
                ["SI Unit", "A unit from the International System of Units."],
                ["Metric System", "A decimal measurement system used internationally."],
                ["Imperial System", "A measurement system using units such as inch, foot, yard, and mile."],
                ["Conversion Factor", "A number used to convert from one unit to another."],
                ["Base Unit", "A reference unit used as the foundation for conversions in a category."],
                ["Derived Unit", "A unit formed from other units, such as square meters or meters per second."],
                ["Scientific Notation", "A compact way to display very large or very small numbers."],
                ["Precision", "How many digits are shown or used in a result."],
                ["Accuracy", "How close a value is to the intended or accepted value."],
                ["Temperature Scale", "A system for expressing temperature, such as Celsius, Fahrenheit, or kelvin."],
                ["Measurement", "The process of assigning a number and unit to a quantity."],
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
                  href="https://www.nist.gov/pml/owm/metric-si/si-units"
                >
                  NIST. SI Units.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.nist.gov/pml/owm/metric-si/unit-conversion"
                >
                  NIST. Unit Conversion.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.bipm.org/en/measurement-units"
                >
                  International Bureau of Weights and Measures. The International System of Units.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This converter performs calculations using the conversion factors implemented in this
            page. Results are intended for educational, informational, and general-purpose use.
            Independently verify critical engineering, scientific, medical, legal, or commercial
            calculations. This tool does not replace professional engineering, scientific,
            metrology, or regulatory standards.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
