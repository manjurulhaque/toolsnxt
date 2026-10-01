import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ScientificTool } from "./scientific-tool"

const pagePath = "/scientific-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Scientific Calculator | Trigonometry, Logarithms and Exponents"
const pageDescription =
  "Use this online scientific calculator for arithmetic, parentheses, powers, roots, logs, trig functions, constants, factorials, memory, and degree or radian mode."

const faqs = [
  {
    question: "What is a scientific calculator?",
    answer:
      "A scientific calculator evaluates advanced math expressions beyond basic arithmetic, including powers, roots, logarithms, trigonometric functions, constants, and factorials.",
  },
  {
    question: "How does this scientific calculator work?",
    answer:
      "It parses the expression you enter, applies its operator precedence rules, evaluates supported functions, and displays a formatted numeric result.",
  },
  {
    question: "What is the difference between a basic and scientific calculator?",
    answer:
      "A basic calculator usually handles arithmetic only. A scientific calculator adds functions such as trig, logs, exponents, roots, constants, parentheses, and memory.",
  },
  {
    question: "Does this calculator follow PEMDAS or BODMAS?",
    answer:
      "Yes, with its implemented parser: parentheses, functions and postfix factorial, unary signs, right-associative powers, multiplication/division/modulus, then addition/subtraction.",
  },
  {
    question: "Can I use parentheses?",
    answer:
      "Yes. Parentheses group sub-expressions and can be nested to control the evaluation order.",
  },
  {
    question: "Should I use degrees or radians?",
    answer:
      "Use degrees for degree-based angle measures such as sin(30). Use radians for calculus, many STEM formulas, and expressions where angles are already in radians.",
  },
  {
    question: "What are logarithms?",
    answer:
      "A logarithm answers the exponent question: for a given base, what power produces the input? This calculator supports log for base 10 and ln for base e.",
  },
  {
    question: "What does ln mean?",
    answer:
      "ln means natural logarithm, the logarithm with base e.",
  },
  {
    question: "What does e represent?",
    answer:
      "e is the mathematical constant approximately equal to 2.71828 and is used in exponential and logarithmic functions.",
  },
  {
    question: "What are trigonometric functions?",
    answer:
      "Trigonometric functions such as sine, cosine, and tangent relate angles to ratios and are widely used in geometry, physics, engineering, and waves.",
  },
  {
    question: "Can I use inverse trigonometric functions?",
    answer:
      "Yes. Type asin(...), acos(...), or atan(...). Their outputs follow the selected degree or radian mode.",
  },
  {
    question: "What is scientific notation?",
    answer:
      "Scientific notation writes very large or small numbers using powers of 10, such as 1.2e6 for 1,200,000. This calculator accepts e notation in numeric inputs.",
  },
  {
    question: "How are exponents calculated?",
    answer:
      "Use ^ for powers, such as 2^8. Chained powers are evaluated right-associatively by the parser.",
  },
  {
    question: "Can I calculate factorials?",
    answer:
      "Yes. Use ! after a non-negative integer. Values above 170 are rejected because the result is too large for finite JavaScript number output.",
  },
  {
    question: "Can I solve algebra equations?",
    answer:
      "No. This page evaluates numeric expressions; it does not symbolically solve equations or isolate variables.",
  },
  {
    question: "Why am I getting an error?",
    answer:
      "Common causes include missing parentheses, unknown functions, division by zero, invalid logarithm or square-root inputs, or factorials of negative or non-integer values.",
  },
  {
    question: "Is this calculator accurate?",
    answer:
      "It uses JavaScript numeric math and formats results for display. Verify critical academic, engineering, scientific, or professional calculations independently.",
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
    about: ["Scientific Calculator", "Online Scientific Calculator", "Math Calculator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Scientific Calculator",
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
    name: "Scientific Calculator",
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
        name: "Scientific Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the online scientific calculator",
    description: "Evaluate an advanced mathematical expression with functions, constants, and angle mode.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter an expression",
        text: "Type a mathematical expression or use the keypad buttons.",
      },
      {
        "@type": "HowToStep",
        name: "Choose angle mode",
        text: "Select DEG or RAD before using trigonometric functions.",
      },
      {
        "@type": "HowToStep",
        name: "Use grouping",
        text: "Add parentheses where needed to control order of operations.",
      },
      {
        "@type": "HowToStep",
        name: "Calculate",
        text: "Review the live preview and press Calculate to store the result in history.",
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

export default function ScientificCalculatorPage() {
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
          <ScientificTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Scientific Calculator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A scientific calculator is an advanced math calculator for expressions that go
                beyond basic addition, subtraction, multiplication, and division. It is useful for
                students, teachers, engineers, scientists, analysts, and anyone working with
                functions, exponents, logarithms, or angle-based calculations.
              </p>
              <p>
                This online scientific calculator supports common STEM workflows in algebra,
                trigonometry, physics, chemistry, computer science, statistics, finance, and
                engineering-style calculations. It evaluates numeric expressions, not symbolic
                equations or graphs.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Expression input", "Type numbers, operators, functions, constants, parentheses, and scientific notation."],
                ["Live preview", "The page previews valid expressions before you press Calculate."],
                ["Calculate", "The result replaces the expression and is saved to a short history tape."],
                ["Angle mode", "DEG and RAD affect sin, cos, tan, asin, acos, and atan."],
                ["Memory", "M+ and M- add or subtract the current valid value, MR recalls memory, and MC clears it."],
                ["Errors", "Invalid syntax, unsupported functions, non-finite results, and restricted factorial values show messages."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Functions" title="Supported Mathematical Functions" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Arithmetic", "Addition (+), subtraction (-), multiplication (*), division (/), unary plus and minus, and modulus (%)."],
                ["Grouping", "Parentheses can be nested and are evaluated before the surrounding expression."],
                ["Powers and roots", "Use ^ for x to the y power and sqrt(x) for square roots."],
                ["Trigonometry", "sin(x), cos(x), and tan(x), interpreted using the selected DEG or RAD mode."],
                ["Inverse trigonometry", "Type asin(x), acos(x), or atan(x); output uses the selected angle mode."],
                ["Logarithms", "log(x) is base 10 and ln(x) is the natural logarithm."],
                ["Exponential", "Type exp(x) for e raised to x."],
                ["Constants", "pi and e are supported constants."],
                ["Factorial and absolute value", "Use n! for non-negative integers and abs(x) for absolute value."],
                ["Scientific notation", "Number inputs can use e notation, such as 1.2e6 or 3e-4."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Precedence" title="Order of Operations" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The parser follows the implemented expression hierarchy: parentheses first, then
                function calls and constants, postfix factorial, unary plus or minus, powers,
                multiplication/division/modulus, and finally addition/subtraction.
              </p>
              <InfoBox>
                Powers are right-associative, so 2^3^2 is evaluated as 2^(3^2). Multiplication,
                division, and modulus are evaluated left to right, as are addition and subtraction.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Example Calculations" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["(25 * 4) + sqrt(144)", "Result: 112"],
                ["sin(30) in DEG mode", "Result: 0.5"],
                ["log(1000)", "Result: 3"],
                ["2^8", "Result: 256"],
              ].map(([expression, result]) => (
                <InfoBox key={expression}>
                  <strong className="block font-mono text-[var(--ink-900)]">{expression}</strong>
                  <span>{result}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Scientific Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter a mathematical expression or insert values with the keypad.</li>
              <li>Use parentheses to make grouping explicit.</li>
              <li>Select DEG or RAD before evaluating trigonometric expressions.</li>
              <li>Review the live preview for valid expressions.</li>
              <li>Press Calculate to save the result in history.</li>
              <li>Use M+, M-, MR, and MC when you need the memory register.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Calculated value", "The final numeric result from the parser."],
                ["Scientific notation", "Very large or very small results may be displayed with exponential notation."],
                ["Decimal result", "Most finite values are rounded through the display formatter."],
                ["Angle interpretation", "Trig inputs and inverse trig outputs depend on DEG or RAD mode."],
                ["Error messages", "Messages identify invalid syntax, unsupported operations, or non-finite results."],
                ["History and memory", "History stores recent completed calculations; memory stores a numeric register for reuse."],
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
                ["Algebra", "Evaluate grouped expressions, powers, roots, and constants."],
                ["Geometry and trigonometry", "Calculate angle-based sine, cosine, tangent, and inverse trig values."],
                ["Calculus preparation", "Work with exponentials, natural logarithms, and radian-based trig expressions."],
                ["Physics and chemistry", "Handle formulas with scientific notation, logs, exponents, and constants."],
                ["Engineering", "Check numeric expressions involving angles, powers, and orders of magnitude."],
                ["Computer science", "Evaluate modulus, powers, exponential notation, and numeric test cases."],
                ["Statistics", "Compute numeric transformations that use logs, absolute values, and exponents."],
                ["Everyday advanced math", "Check tips, growth, decay, ratios, and calculator-style homework steps."],
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
                  <li>Performs advanced mathematical calculations quickly.</li>
                  <li>Supports STEM education and engineering-style numeric checks.</li>
                  <li>Handles grouped expressions, functions, constants, memory, and history.</li>
                  <li>Offers degree and radian modes for trigonometry.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Results depend on correct input syntax.</li>
                  <li>Floating-point rounding can occur.</li>
                  <li>Functions have domain restrictions.</li>
                  <li>The calculator only supports the implemented operations listed above.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Accurate Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use parentheses around complex sub-expressions.</li>
                  <li>Select the correct degree or radian mode before using trig functions.</li>
                  <li>Check decimal placement and scientific notation.</li>
                  <li>Review operator precedence before calculating long expressions.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Mixing degrees and radians.</li>
                  <li>Missing closing parentheses.</li>
                  <li>Expecting a different precedence for chained exponents.</li>
                  <li>Using logarithms, square roots, or factorials outside their supported domains.</li>
                  <li>Dividing by zero or entering unsupported function names.</li>
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
                href="/percentage-calculator"
              >
                Percentage Calculator
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
            <PanelHeader eyebrow="Glossary" title="Scientific Calculator Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Arithmetic", "Basic operations such as addition, subtraction, multiplication, and division."],
                ["Exponent", "A power that indicates repeated multiplication."],
                ["Logarithm", "The inverse idea of exponentiation for a chosen base."],
                ["Natural Logarithm", "A logarithm with base e, written ln."],
                ["Trigonometric Function", "A function such as sine, cosine, or tangent that relates angles and ratios."],
                ["Radian", "An angle unit based on arc length relative to radius."],
                ["Degree", "An angle unit where a full turn is 360 degrees."],
                ["Scientific Notation", "A compact way to write very large or small numbers with powers of 10."],
                ["Factorial", "For a non-negative integer n, the product n x (n - 1) x ... x 1."],
                ["Constant", "A value such as pi or e that does not change."],
                ["Expression", "A combination of numbers, operators, functions, and grouping symbols."],
                ["Order of Operations", "Rules that determine which parts of an expression are evaluated first."],
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
                  href="https://openstax.org/books/prealgebra-2e/pages/2-1-use-the-language-of-algebra"
                >
                  OpenStax. Prealgebra 2e: Use the Language of Algebra.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://mathworld.wolfram.com/TrigonometricFunctions.html"
                >
                  Wolfram MathWorld. Trigonometric Functions.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://mathworld.wolfram.com/Logarithm.html"
                >
                  Wolfram MathWorld. Logarithm.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://mathworld.wolfram.com/Factorial.html"
                >
                  Wolfram MathWorld. Factorial.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://mathworld.wolfram.com/ScientificNotation.html"
                >
                  Wolfram MathWorld. Scientific Notation.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This scientific calculator performs mathematical computations based on user inputs.
              Results are for educational and informational purposes only. Independently verify
              critical academic, engineering, scientific, financial, or professional calculations.
              This tool does not replace professional analysis or domain-specific validation.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
