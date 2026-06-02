"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type DateParts = {
  year: number
  month: number
  day: number
}

type AgeResult = {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalMonths: number
  nextBirthday: DateParts
  daysUntilBirthday: number
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("2000-01-01")
  const [asOfDate, setAsOfDate] = useState(formatDateInput(new Date()))

  const result = useMemo(() => calculateAge(birthDate, asOfDate), [asOfDate, birthDate])

  function useToday() {
    setAsOfDate(formatDateInput(new Date()))
  }

  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            Quotations Archive
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
            Date tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Age Calculator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Calculate exact age in years, months, and days, then see the next birthday countdown
            and total time lived.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DateField
              id="birth-date"
              label="Date of birth"
              value={birthDate}
              onChange={setBirthDate}
            />
            <DateField
              id="as-of-date"
              label="Age on"
              value={asOfDate}
              onChange={setAsOfDate}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={useToday}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Use Today
            </button>
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {result ? "Ready" : "Choose valid dates"}
            </div>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
            Leap years and month lengths are handled using calendar dates, so February and long
            months stay accurate.
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Result
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Exact Age</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              Calendar age
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">Age</p>
            <p className="mt-3 break-words text-4xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-5xl">
              {result ? `${result.years}y ${result.months}m ${result.days}d` : "--"}
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--ink-700)]">
              {result
                ? `Next birthday: ${formatDisplayDate(result.nextBirthday)}`
                : "Birth date must be on or before the age-on date."}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Years" value={result ? String(result.years) : "--"} />
            <SummaryTile label="Months" value={result ? String(result.months) : "--"} />
            <SummaryTile label="Days" value={result ? String(result.days) : "--"} />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Time Summary
            </h3>
            <div className="mt-3 grid gap-2">
              <ResultRow label="Total days" value={result ? formatNumber(result.totalDays) : "--"} />
              <ResultRow label="Total weeks" value={result ? formatNumber(result.totalWeeks) : "--"} />
              <ResultRow label="Completed months" value={result ? formatNumber(result.totalMonths) : "--"} />
              <ResultRow
                label="Days until birthday"
                value={result ? formatNumber(result.daysUntilBirthday) : "--"}
                highlighted
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DateField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-lg font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}

function ResultRow({
  label,
  value,
  highlighted = false,
}: {
  label: string
  value: string
  highlighted?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-[1.1rem] border px-4 py-3 text-sm ${
        highlighted
          ? "border-[var(--accent-rust)]/35 bg-[var(--accent-rust)]/8"
          : "border-[var(--ink-900)]/8 bg-white"
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="text-right font-semibold tabular-nums text-[var(--ink-800)]">{value}</span>
    </div>
  )
}

function calculateAge(birthValue: string, asOfValue: string): AgeResult | null {
  const birthDate = parseDateInput(birthValue)
  const asOfDate = parseDateInput(asOfValue)

  if (!birthDate || !asOfDate || compareDates(birthDate, asOfDate) > 0) {
    return null
  }

  let years = asOfDate.year - birthDate.year
  let lastAnniversary = addYears(birthDate, years)

  if (compareDates(lastAnniversary, asOfDate) > 0) {
    years -= 1
    lastAnniversary = addYears(birthDate, years)
  }

  let months = 0
  while (compareDates(addMonths(lastAnniversary, months + 1), asOfDate) <= 0) {
    months += 1
  }

  const lastMonthDate = addMonths(lastAnniversary, months)
  const days = differenceInDays(lastMonthDate, asOfDate)
  const totalDays = differenceInDays(birthDate, asOfDate)
  const nextBirthday = getNextBirthday(birthDate, asOfDate)

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: years * 12 + months,
    nextBirthday,
    daysUntilBirthday: differenceInDays(asOfDate, nextBirthday),
  }
}

function parseDateInput(value: string): DateParts | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    return null
  }

  const date = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  }

  if (date.month < 1 || date.month > 12 || date.day < 1 || date.day > getDaysInMonth(date.year, date.month)) {
    return null
  }

  return date
}

function addYears(date: DateParts, years: number) {
  return clampDate({
    year: date.year + years,
    month: date.month,
    day: date.day,
  })
}

function addMonths(date: DateParts, months: number) {
  const monthIndex = date.month - 1 + months
  const year = date.year + Math.floor(monthIndex / 12)
  const month = (monthIndex % 12) + 1

  return clampDate({
    year,
    month,
    day: date.day,
  })
}

function clampDate(date: DateParts) {
  return {
    ...date,
    day: Math.min(date.day, getDaysInMonth(date.year, date.month)),
  }
}

function getNextBirthday(birthDate: DateParts, asOfDate: DateParts) {
  let birthday = clampDate({
    year: asOfDate.year,
    month: birthDate.month,
    day: birthDate.day,
  })

  if (compareDates(birthday, asOfDate) < 0) {
    birthday = clampDate({
      year: asOfDate.year + 1,
      month: birthDate.month,
      day: birthDate.day,
    })
  }

  return birthday
}

function compareDates(first: DateParts, second: DateParts) {
  return toUtcTime(first) - toUtcTime(second)
}

function differenceInDays(start: DateParts, end: DateParts) {
  return Math.round((toUtcTime(end) - toUtcTime(start)) / 86_400_000)
}

function toUtcTime(date: DateParts) {
  return Date.UTC(date.year, date.month - 1, date.day)
}

function getDaysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

function formatDateInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function formatDisplayDate(date: DateParts) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(toUtcTime(date)))
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value)
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}
