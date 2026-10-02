import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { LoanTool } from "./loan-tool"

const pagePath = "/loan-calculator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Loan Calculator | Monthly Payment, Interest and Amortization"
const pageDescription =
  "Use this loan calculator to estimate monthly payments, total interest, payoff time, extra-payment savings, and an amortization schedule preview."

const faqs = [
  {
    question: "How does this loan calculator work?",
    answer:
      "It uses the standard fixed-rate amortized loan formula to estimate the required monthly principal-and-interest payment from the loan amount, annual interest rate, and loan term.",
  },
  {
    question: "What is an EMI?",
    answer:
      "EMI means equated monthly installment. It is the fixed monthly payment used to repay an amortized loan over the selected term.",
  },
  {
    question: "How is the monthly payment calculated?",
    answer:
      "For loans with interest, the calculator converts the annual rate to a monthly rate and applies the amortized payment formula. For a 0% loan, it divides principal by the number of months.",
  },
  {
    question: "What is amortization?",
    answer:
      "Amortization is the process of paying down a loan with regular payments over time, with part of each payment going to interest and the rest reducing principal.",
  },
  {
    question: "How does interest affect loan payments?",
    answer:
      "A higher interest rate increases the monthly payment and total interest paid because interest is charged on the outstanding balance each month.",
  },
  {
    question: "Can I include extra payments?",
    answer:
      "Yes. The Extra Monthly field applies an added amount to principal each month, which may shorten payoff time and reduce total interest.",
  },
  {
    question: "What is the difference between fixed and variable interest rates?",
    answer:
      "A fixed rate stays the same for the loan period being calculated. A variable or adjustable rate can change, so future payments may be higher or lower than this estimate.",
  },
  {
    question: "Does this calculator include taxes or fees?",
    answer:
      "No. It estimates principal and interest only. It does not include taxes, insurance, origination fees, closing costs, late fees, or other lender charges.",
  },
  {
    question: "Can I calculate mortgage payments?",
    answer:
      "You can estimate the principal-and-interest portion of a fixed-rate mortgage, but this page does not include property taxes, homeowners insurance, mortgage insurance, or escrow items.",
  },
  {
    question: "Can I calculate auto loans?",
    answer:
      "Yes, if the auto loan uses fixed monthly principal-and-interest payments. Enter the financed amount, annual rate, and term in years.",
  },
  {
    question: "Is this calculator accurate?",
    answer:
      "The math is accurate for the assumptions shown, but lender quotes can differ because of fees, rounding, payment dates, APR rules, and loan-specific terms.",
  },
  {
    question: "Why is my lender's payment different?",
    answer:
      "A lender may include fees, insurance, taxes, payment timing, daily interest, escrow, or a different compounding and rounding method.",
  },
  {
    question: "What loan term should I choose?",
    answer:
      "Shorter terms usually cost less total interest but require higher monthly payments. Longer terms lower the payment but often increase total interest.",
  },
  {
    question: "Can I compare different loans?",
    answer:
      "Yes. Change the loan amount, rate, term, or extra monthly amount and compare the monthly payment, total paid, total interest, payoff time, and interest saved.",
  },
  {
    question: "What is total interest?",
    answer:
      "Total interest is the sum of all interest portions in the generated payment schedule, excluding taxes, fees, and insurance.",
  },
  {
    question: "What does interest saved mean?",
    answer:
      "Interest saved compares the regular schedule with the schedule that includes your extra monthly principal payment.",
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
    about: ["Loan Calculator", "Monthly Payment Calculator", "Amortization Calculator"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan Calculator",
    applicationCategory: "FinanceApplication",
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
    name: "Loan Calculator",
    applicationCategory: "FinanceApplication",
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
        name: "Loan Calculator",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate monthly loan payments",
    description: "Estimate a fixed-rate loan payment and amortization preview.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter loan amount",
        text: "Enter the amount borrowed in the Loan Amount field.",
      },
      {
        "@type": "HowToStep",
        name: "Enter annual interest rate",
        text: "Enter the annual interest rate as a percentage.",
      },
      {
        "@type": "HowToStep",
        name: "Enter loan term",
        text: "Enter the repayment term in years.",
      },
      {
        "@type": "HowToStep",
        name: "Add extra monthly payment",
        text: "Optionally enter an extra monthly principal payment.",
      },
      {
        "@type": "HowToStep",
        name: "Review results",
        text: "Review the monthly payment, total interest, total paid, payoff time, interest saved, and amortization preview.",
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

export default function LoanCalculatorPage() {
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
          <LoanTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a Loan Calculator?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A loan calculator estimates repayment amounts for installment loans. Enter the
                principal, annual interest rate, and loan term to calculate monthly loan payments,
                total repayment, and total interest before comparing loan offers or planning a
                budget.
              </p>
              <p>
                Borrowers use an online loan calculator for personal loans, auto loans, fixed-rate
                mortgage principal-and-interest estimates, refinancing comparisons, and payoff
                planning. The relationship is straightforward: a larger principal, a higher rate, or
                a longer term usually increases total borrowing cost.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Calculator Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Loan amount", "The principal balance used as the starting amount borrowed."],
                ["Interest rate", "The annual rate is divided by 100 and then by 12 to estimate a monthly rate."],
                ["Loan term", "Years are converted to months by multiplying by 12 and rounding to whole months."],
                ["Extra monthly", "An optional extra amount is added to each month's principal payment."],
                ["Payment summary", "The result shows monthly payment, total interest, total paid, payoff time, and interest saved."],
                ["Schedule preview", "The table shows principal, interest, and remaining balance for the first year and final month."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formula" title="Loan Payment Formula" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <InfoBox>
                <strong className="block text-[var(--ink-900)]">Monthly payment (EMI)</strong>
                <p className="mt-2 text-base font-semibold text-[var(--ink-900)]">
                  M = P x r(1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1)
                </p>
              </InfoBox>
              <p>
                M is the monthly payment, P is the loan principal, r is the monthly interest rate,
                and n is the total number of monthly payments. The calculator uses this equivalent
                form in code: payment = principal x monthlyRate / (1 - (1 + monthlyRate)<sup>-termMonths</sup>).
              </p>
              <p>
                If the interest rate is 0%, the calculator uses the simple formula M = P / n. Extra
                monthly payments are not used to compute the required monthly payment; they are
                applied afterward in the amortization schedule as extra principal.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Example" title="Example Calculation" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Example inputs: loan amount $25,000, annual interest rate 6%, and loan term 5 years
                with no extra monthly payment.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Monthly rate: 6% / 100 / 12 = 0.005.</li>
                <li>Total payments: 5 x 12 = 60 monthly payments.</li>
                <li>Monthly payment: about $483.32.</li>
                <li>Total payments: about $28,999.20.</li>
                <li>Total interest: about $3,999.20.</li>
              </ul>
              <InfoBox>
                The displayed calculator rounds currency to whole dollars, while the underlying
                formula uses the calculated decimal values.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Loan Calculator" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Enter the loan amount, or principal.</li>
              <li>Enter the annual interest rate as a percentage.</li>
              <li>Enter the loan term in years.</li>
              <li>Optionally enter an extra monthly principal payment.</li>
              <li>Review the automatically updated payment summary.</li>
              <li>Read the amortization preview to see principal, interest, and balance changes.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Results" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Monthly payment", "The required fixed principal-and-interest payment before any extra monthly principal."],
                ["Total interest", "The sum of interest charged across the generated amortization schedule."],
                ["Total paid", "The sum of all scheduled payments, including extra monthly principal when entered."],
                ["Payoff time", "The number of months needed to reduce the balance to zero, shown as years and months."],
                ["Interest saved", "The estimated difference between the regular schedule and the extra-payment schedule."],
                ["Amortization preview", "A month-by-month view of principal paid, interest charged, and remaining balance for selected rows."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Planning" title="Factors That Affect Loan Payments" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Loan amount", "A larger principal increases both the payment and the interest base."],
                ["Interest rate", "A higher annual rate increases monthly interest and total borrowing cost."],
                ["Loan term", "A longer term can lower the monthly payment but often raises total interest."],
                ["Extra payments", "Extra monthly principal can shorten payoff time and reduce interest in this calculator."],
                ["Fixed rates", "A fixed rate supports predictable monthly payment estimates."],
                ["Variable rates", "Variable-rate loans may change over time, so this fixed-rate estimate may not reflect future payments."],
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
                  <li>Simplifies budgeting with a monthly payment estimate.</li>
                  <li>Helps compare loan options and repayment terms.</li>
                  <li>Estimates total repayment cost and interest cost.</li>
                  <li>Shows how extra principal may affect payoff time.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Results are estimates, not lender offers.</li>
                  <li>Taxes, insurance, closing costs, and fees are not included.</li>
                  <li>Variable-rate loans may have different future payments.</li>
                  <li>Final approval and exact terms depend on the lender.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Accurate Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Enter the correct annual interest rate, not a monthly rate.</li>
                  <li>Verify the financed amount after down payments or trade-ins.</li>
                  <li>Use the correct repayment term in years.</li>
                  <li>Compare several rates, terms, and extra-payment scenarios.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Confusing annual and monthly interest rates.</li>
                  <li>Entering months in the loan term field instead of years.</li>
                  <li>Ignoring lender fees or insurance costs outside the calculator.</li>
                  <li>Comparing loans with different repayment periods as if they are identical.</li>
                  <li>Assuming an estimate is the same as a lender-approved payment.</li>
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
                href="/scientific-calculator"
              >
                Scientific Calculator
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
            <PanelHeader eyebrow="Glossary" title="Loan Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["Principal", "The amount borrowed before interest is added."],
                ["Interest Rate", "The cost of borrowing expressed as a percentage rate."],
                ["Annual Percentage Rate (APR)", "A broader yearly borrowing-cost measure that can include interest and certain fees."],
                ["EMI", "Equated monthly installment, or the fixed monthly loan payment."],
                ["Monthly Payment", "The recurring payment due each month for principal and interest in this calculator."],
                ["Amortization", "Paying off a loan through regular payments over time."],
                ["Loan Term", "The length of time scheduled to repay the loan."],
                ["Fixed Interest Rate", "An interest rate that does not change during the period being calculated."],
                ["Variable Interest Rate", "An interest rate that can change based on an index, lender terms, or market conditions."],
                ["Outstanding Balance", "The remaining principal owed after payments are applied."],
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
                  href="https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms/"
                >
                  Consumer Financial Protection Bureau. Mortgage key terms, including amortization and APR.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-fixed-rate-and-adjustable-rate-mortgage-arm-loan-en-100/"
                >
                  Consumer Financial Protection Bureau. Fixed-rate and adjustable-rate mortgage explanation.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/"
                >
                  Consumer Financial Protection Bureau. Interest rate and APR comparison.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://files.consumerfinance.gov/f/201204_CFPB_ARMs-brochure.pdf"
                >
                  CFPB and Federal Reserve Board. Consumer Handbook on Adjustable-Rate Mortgages.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="financial">
          <p>
            This loan calculator provides estimates for informational and educational purposes
            only. It does not constitute financial, legal, tax, investment, or lending advice.
            Actual loan terms, payments, fees, interest charges, approval decisions, and payoff
            amounts may vary by lender and borrower profile. Consult qualified financial
            professionals before making borrowing decisions.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
