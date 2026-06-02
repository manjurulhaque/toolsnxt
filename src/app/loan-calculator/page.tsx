"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type ScheduleRow = {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("250000")
  const [annualRate, setAnnualRate] = useState("6.5")
  const [loanTermYears, setLoanTermYears] = useState("30")
  const [extraPayment, setExtraPayment] = useState("0")

  const result = useMemo(
    () => calculateLoan(loanAmount, annualRate, loanTermYears, extraPayment),
    [annualRate, extraPayment, loanAmount, loanTermYears],
  )

  const schedulePreview = result.schedule.filter(
    (row) => row.month <= 12 || row.month === result.schedule.length,
  )

  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            Web Tools
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm font-medium text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
          >
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Finance tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Loan Calculator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Estimate monthly loan payments, total interest, payoff timing, and the effect of extra
            monthly principal payments.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <NumberField
              id="loan-amount"
              label="Loan Amount"
              prefix="$"
              value={loanAmount}
              onChange={setLoanAmount}
            />
            <NumberField
              id="annual-rate"
              label="Interest Rate"
              suffix="%"
              value={annualRate}
              onChange={setAnnualRate}
            />
            <NumberField
              id="loan-term"
              label="Loan Term"
              suffix="years"
              value={loanTermYears}
              onChange={setLoanTermYears}
            />
            <NumberField
              id="extra-payment"
              label="Extra Monthly"
              prefix="$"
              value={extraPayment}
              onChange={setExtraPayment}
            />
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
            This estimate assumes fixed-rate monthly compounding and does not include taxes,
            insurance, fees, or rate changes.
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Result
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Monthly Payment</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                Fixed rate
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
              <p className="text-sm text-[var(--ink-700)]">Required monthly payment</p>
              <p className="mt-3 text-5xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-6xl">
                {result.monthlyPayment == null ? "--" : formatCurrency(result.monthlyPayment)}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--ink-700)]">
                {result.monthlyPayment == null
                  ? "Enter a loan amount, interest rate, and term."
                  : result.extraPayment > 0
                    ? `${formatCurrency(result.extraPayment)} extra is applied to principal each month.`
                    : "Payment is principal and interest only."}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <SummaryTile label="Total Interest" value={formatNullableCurrency(result.totalInterest)} />
              <SummaryTile label="Total Paid" value={formatNullableCurrency(result.totalPaid)} />
              <SummaryTile label="Payoff Time" value={result.payoffLabel} />
              <SummaryTile label="Interest Saved" value={formatNullableCurrency(result.interestSaved)} />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Schedule
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Amortization Preview</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                First year
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/8">
              <div className="grid grid-cols-4 bg-[var(--page-cream)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                <span>Month</span>
                <span className="text-right">Principal</span>
                <span className="text-right">Interest</span>
                <span className="text-right">Balance</span>
              </div>
              {schedulePreview.length === 0 ? (
                <div className="bg-white px-4 py-8 text-center text-sm text-[var(--ink-700)]">
                  Schedule rows will appear after valid loan details are entered.
                </div>
              ) : (
                schedulePreview.map((row, index) => (
                  <div
                    key={row.month}
                    className={`grid grid-cols-4 gap-2 px-4 py-3 text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-[var(--page-cream)]/55"
                    }`}
                  >
                    <span className="font-medium tabular-nums">{row.month}</span>
                    <span className="text-right tabular-nums">{formatCurrency(row.principal)}</span>
                    <span className="text-right tabular-nums">{formatCurrency(row.interest)}</span>
                    <span className="text-right tabular-nums">{formatCurrency(row.balance)}</span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function NumberField({
  id,
  label,
  prefix,
  suffix,
  value,
  onChange,
}: {
  id: string
  label: string
  prefix?: string
  suffix?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2 flex overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] transition focus-within:border-[var(--accent-rust)]">
        {prefix ? (
          <span className="flex items-center border-r border-[var(--ink-900)]/10 px-4 text-sm font-semibold text-[var(--ink-700)]">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          min="0"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-2xl font-semibold outline-none"
        />
        {suffix ? (
          <span className="flex items-center border-l border-[var(--ink-900)]/10 px-4 text-sm font-semibold text-[var(--ink-700)]">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  )
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  )
}

function calculateLoan(loanAmountValue: string, annualRateValue: string, termYearsValue: string, extraPaymentValue: string) {
  const principal = Number(loanAmountValue)
  const annualRate = Number(annualRateValue)
  const termYears = Number(termYearsValue)
  const extraPayment = Math.max(0, Number(extraPaymentValue) || 0)
  const termMonths = Math.round(termYears * 12)

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(termYears) ||
    principal <= 0 ||
    annualRate < 0 ||
    termMonths <= 0
  ) {
    return emptyLoanResult(extraPayment)
  }

  const monthlyRate = annualRate / 100 / 12
  const monthlyPayment =
    monthlyRate === 0
      ? principal / termMonths
      : (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -termMonths)

  const baseSchedule = buildSchedule(principal, monthlyRate, monthlyPayment, 0)
  const schedule = buildSchedule(principal, monthlyRate, monthlyPayment, extraPayment)
  const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0)
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0)
  const baseInterest = baseSchedule.reduce((sum, row) => sum + row.interest, 0)

  return {
    monthlyPayment,
    extraPayment,
    totalPaid,
    totalInterest,
    interestSaved: Math.max(0, baseInterest - totalInterest),
    payoffLabel: formatPayoff(schedule.length),
    schedule,
  }
}

function buildSchedule(principal: number, monthlyRate: number, monthlyPayment: number, extraPayment: number) {
  const schedule: ScheduleRow[] = []
  let balance = principal
  let month = 1

  while (balance > 0.005 && month <= 1200) {
    const interest = balance * monthlyRate
    const principalPayment = Math.min(balance, monthlyPayment - interest + extraPayment)
    const payment = principalPayment + interest
    balance = Math.max(0, balance - principalPayment)

    schedule.push({
      month,
      payment,
      principal: principalPayment,
      interest,
      balance,
    })

    month += 1
  }

  return schedule
}

function emptyLoanResult(extraPayment: number) {
  return {
    monthlyPayment: null,
    extraPayment,
    totalPaid: null,
    totalInterest: null,
    interestSaved: null,
    payoffLabel: "Not calculated",
    schedule: [],
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNullableCurrency(value: number | null) {
  return value == null ? "--" : formatCurrency(value)
}

function formatPayoff(months: number) {
  if (months <= 0) {
    return "Not calculated"
  }

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) {
    return `${remainingMonths} mo`
  }

  if (remainingMonths === 0) {
    return `${years} yr`
  }

  return `${years} yr ${remainingMonths} mo`
}
