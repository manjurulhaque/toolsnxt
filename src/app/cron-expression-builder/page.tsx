"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type ScheduleMode = "every-minute" | "hourly" | "daily" | "weekly" | "monthly" | "custom"
type Weekday = "0" | "1" | "2" | "3" | "4" | "5" | "6"

const weekdays: Array<{ value: Weekday; label: string }> = [
  { value: "0", label: "Sun" },
  { value: "1", label: "Mon" },
  { value: "2", label: "Tue" },
  { value: "3", label: "Wed" },
  { value: "4", label: "Thu" },
  { value: "5", label: "Fri" },
  { value: "6", label: "Sat" },
]

export default function CronExpressionBuilderPage() {
  const [mode, setMode] = useState<ScheduleMode>("daily")
  const [minute, setMinute] = useState("30")
  const [hour, setHour] = useState("9")
  const [dayOfMonth, setDayOfMonth] = useState("1")
  const [weekday, setWeekday] = useState<Weekday>("1")
  const [customExpression, setCustomExpression] = useState("*/15 9-17 * * 1-5")
  const [message, setMessage] = useState("Build a cron expression from common schedule controls.")

  const cron = useMemo(
    () => buildCron({ mode, minute, hour, dayOfMonth, weekday, customExpression }),
    [customExpression, dayOfMonth, hour, minute, mode, weekday],
  )
  const description = useMemo(() => describeCron(cron), [cron])
  const nextRuns = useMemo(() => getNextRuns(cron, 5), [cron])

  async function copyCron() {
    if (!cron.isValid) {
      setMessage("Fix the cron expression before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(cron.expression)
      setMessage("Cron expression copied.")
    } catch {
      setMessage("Copy failed. Select the expression and copy it manually.")
    }
  }

  function loadSample() {
    setMode("daily")
    setMinute("30")
    setHour("9")
    setDayOfMonth("1")
    setWeekday("1")
    setCustomExpression("*/15 9-17 * * 1-5")
    setMessage("Sample schedule loaded.")
  }

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
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Cron Expression Builder</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Create standard five-field cron expressions for jobs, automations, and scheduled
            scripts, then preview the next matching run times.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(["every-minute", "hourly", "daily", "weekly", "monthly", "custom"] as ScheduleMode[]).map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setMode(option)
                    setMessage(`${formatMode(option)} selected.`)
                  }}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    mode === option
                      ? "bg-[var(--ink-900)] text-white"
                      : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                  }`}
                >
                  {formatMode(option)}
                </button>
              ),
            )}
          </div>

          {mode === "custom" ? (
            <label htmlFor="custom-cron" className="mt-6 block">
              <span className="text-sm font-medium">Custom expression</span>
              <input
                id="custom-cron"
                value={customExpression}
                onChange={(event) => {
                  setCustomExpression(event.target.value)
                  setMessage("Custom expression updated.")
                }}
                spellCheck={false}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm outline-none transition focus:border-[var(--accent-rust)]"
                placeholder="*/15 9-17 * * 1-5"
              />
            </label>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {mode !== "every-minute" ? (
                <NumberInput
                  id="cron-minute"
                  label="Minute"
                  min="0"
                  max="59"
                  value={minute}
                  onChange={setMinute}
                />
              ) : null}
              {mode === "daily" || mode === "weekly" || mode === "monthly" ? (
                <NumberInput id="cron-hour" label="Hour" min="0" max="23" value={hour} onChange={setHour} />
              ) : null}
              {mode === "monthly" ? (
                <NumberInput
                  id="cron-day"
                  label="Day of month"
                  min="1"
                  max="31"
                  value={dayOfMonth}
                  onChange={setDayOfMonth}
                />
              ) : null}
              {mode === "weekly" ? (
                <label htmlFor="cron-weekday" className="block">
                  <span className="text-sm font-medium">Weekday</span>
                  <select
                    id="cron-weekday"
                    value={weekday}
                    onChange={(event) => {
                      setWeekday(event.target.value as Weekday)
                      setMessage("Weekday updated.")
                    }}
                    className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
                  >
                    {weekdays.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>
          )}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={copyCron}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Cron
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Schedule
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Generated Expression</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                cron.isValid ? "bg-[var(--page-cream)] text-[var(--ink-700)]" : "bg-red-50 text-red-700"
              }`}
            >
              {cron.isValid ? "Valid cron" : "Check fields"}
            </p>
          </div>

          <div className="mt-6 rounded-[1.3rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <code className="block break-all font-mono text-3xl font-semibold">{cron.expression}</code>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Next Runs
            </h3>
            <div className="mt-3 grid gap-2">
              {nextRuns.map((run) => (
                <div
                  key={run}
                  className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm text-[var(--ink-800)]"
                >
                  {run}
                </div>
              ))}
              {nextRuns.length === 0 ? (
                <div className="rounded-[1.1rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  Upcoming run preview appears for supported simple expressions.
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {cron.error ?? message}
          </div>
        </div>
      </section>
    </main>
  )
}

function NumberInput({
  id,
  label,
  min,
  max,
  value,
  onChange,
}: {
  id: string
  label: string
  min: string
  max: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function buildCron({
  mode,
  minute,
  hour,
  dayOfMonth,
  weekday,
  customExpression,
}: {
  mode: ScheduleMode
  minute: string
  hour: string
  dayOfMonth: string
  weekday: Weekday
  customExpression: string
}) {
  const safeMinute = clampField(minute, 0, 59)
  const safeHour = clampField(hour, 0, 23)
  const safeDay = clampField(dayOfMonth, 1, 31)
  const expression =
    mode === "every-minute"
      ? "* * * * *"
      : mode === "hourly"
        ? `${safeMinute} * * * *`
        : mode === "daily"
          ? `${safeMinute} ${safeHour} * * *`
          : mode === "weekly"
            ? `${safeMinute} ${safeHour} * * ${weekday}`
            : mode === "monthly"
              ? `${safeMinute} ${safeHour} ${safeDay} * *`
              : customExpression.trim()
  const error = validateCron(expression)

  return {
    expression,
    isValid: !error,
    error,
  }
}

function validateCron(expression: string) {
  const parts = expression.trim().split(/\s+/)

  if (parts.length !== 5) {
    return "Use a standard five-field cron expression."
  }

  const ranges = [
    [0, 59],
    [0, 23],
    [1, 31],
    [1, 12],
    [0, 7],
  ]

  for (let index = 0; index < parts.length; index += 1) {
    if (!isValidCronField(parts[index], ranges[index][0], ranges[index][1])) {
      return `Field ${index + 1} is out of range or unsupported.`
    }
  }

  return null
}

function isValidCronField(field: string, min: number, max: number): boolean {
  return field.split(",").every((part) => {
    if (part === "*") {
      return true
    }

    const [rangePart, stepPart] = part.split("/")
    if (stepPart && !isInRange(stepPart, 1, max)) {
      return false
    }

    if (rangePart === "*") {
      return true
    }

    if (rangePart.includes("-")) {
      const [start, end] = rangePart.split("-")
      return isInRange(start, min, max) && isInRange(end, min, max) && Number(start) <= Number(end)
    }

    return isInRange(rangePart, min, max)
  })
}

function isInRange(value: string, min: number, max: number) {
  const numberValue = Number(value)
  return Number.isInteger(numberValue) && numberValue >= min && numberValue <= max
}

function describeCron(cron: { expression: string; isValid: boolean; error: string | null }) {
  if (!cron.isValid) {
    return cron.error ?? "Invalid cron expression."
  }

  const [minute, hour, day, month, weekday] = cron.expression.split(/\s+/)
  const time = hour === "*" ? `minute ${minute}` : `${pad(hour)}:${pad(minute)}`

  if (cron.expression === "* * * * *") {
    return "Runs every minute."
  }

  if (hour === "*" && day === "*" && month === "*" && weekday === "*") {
    return `Runs hourly at minute ${minute}.`
  }

  if (day === "*" && month === "*" && weekday === "*") {
    return `Runs every day at ${time}.`
  }

  if (day === "*" && month === "*") {
    return `Runs every ${weekdayLabel(weekday)} at ${time}.`
  }

  if (month === "*" && weekday === "*") {
    return `Runs every month on day ${day} at ${time}.`
  }

  return "Runs on the schedule described by the cron fields."
}

function getNextRuns(cron: { expression: string; isValid: boolean }, count: number) {
  if (!cron.isValid) {
    return []
  }

  const [minute, hour, day, month, weekday] = cron.expression.split(/\s+/)
  if ([minute, hour, day, month, weekday].some((field) => /[,/\-]/.test(field))) {
    return []
  }

  const runs: string[] = []
  const cursor = new Date()
  cursor.setSeconds(0, 0)
  cursor.setMinutes(cursor.getMinutes() + 1)

  for (let attempts = 0; attempts < 525600 && runs.length < count; attempts += 1) {
    if (matchesField(cursor.getMinutes(), minute) && matchesField(cursor.getHours(), hour)) {
      const cronWeekday = cursor.getDay()
      const cronDay = cursor.getDate()
      const cronMonth = cursor.getMonth() + 1

      if (matchesField(cronDay, day) && matchesField(cronMonth, month) && matchesField(cronWeekday, weekday)) {
        runs.push(
          new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(cursor),
        )
      }
    }

    cursor.setMinutes(cursor.getMinutes() + 1)
  }

  return runs
}

function matchesField(value: number, field: string) {
  if (field === "*") {
    return true
  }

  if (field === "7" && value === 0) {
    return true
  }

  return Number(field) === value
}

function clampField(value: string, min: number, max: number) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return min
  }

  return Math.min(Math.max(Math.floor(numberValue), min), max)
}

function pad(value: string) {
  return value.padStart(2, "0")
}

function weekdayLabel(value: string) {
  return weekdays.find((day) => day.value === value)?.label ?? `weekday ${value}`
}

function formatMode(value: ScheduleMode) {
  return value
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}
