"use client"

import { useMemo, useState } from "react"
import { DateField } from "@/components/form-controls"
import {
  ActionButton,
  InfoBox,
  PanelHeader,
  SummaryTile,
  ToolIntro,
  ToolPage,
  ToolPanel,
} from "@/components/tool-page"

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
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Date tool" title="Age Calculator">
            Calculate exact age in years, months, and days, then see the next birthday countdown
            and total time lived.
        </ToolIntro>

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
            <ActionButton onClick={useToday}>
              Use Today
            </ActionButton>
            <InfoBox className="leading-normal">
              {result ? "Ready" : "Choose valid dates"}
            </InfoBox>
          </div>

          <InfoBox className="mt-6">
            Leap years and month lengths are handled using calendar dates, so February and long
            months stay accurate.
          </InfoBox>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Result" title="Exact Age" badge="Calendar age" />

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
      </ToolPanel>
    </ToolPage>
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
