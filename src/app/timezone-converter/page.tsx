"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const fallbackTimeZones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
]

const cityRows = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
]

export default function TimezoneConverterPage() {
  const [dateTime, setDateTime] = useState("")
  const [fromZone, setFromZone] = useState("UTC")
  const [toZone, setToZone] = useState("Asia/Kolkata")

  const timeZones = useMemo(() => getSupportedTimeZones(), [])
  const sourceDate = useMemo(() => parseZonedDateTime(dateTime, fromZone), [dateTime, fromZone])
  const hasValidDate = sourceDate != null

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
      const supportedLocalZone = timeZones.includes(localZone) ? localZone : "UTC"

      setFromZone(supportedLocalZone)
      setToZone(supportedLocalZone === "UTC" ? "Asia/Kolkata" : "UTC")
      setDateTime(formatInputDateTime(new Date(), supportedLocalZone))
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [timeZones])

  const convertedTime = sourceDate ? formatDateTime(sourceDate, toZone) : null
  const sourceOffset = sourceDate ? formatOffset(sourceDate, fromZone) : "--"
  const targetOffset = sourceDate ? formatOffset(sourceDate, toZone) : "--"
  const difference = sourceDate ? getOffsetDifference(sourceDate, fromZone, toZone) : "--"

  function swapZones() {
    if (sourceDate) {
      setDateTime(formatInputDateTime(sourceDate, toZone))
    }

    setFromZone(toZone)
    setToZone(fromZone)
  }

  function setNow() {
    setDateTime(formatInputDateTime(new Date(), fromZone))
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Time tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Timezone Converter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Compare meeting times across cities with daylight saving handled by your browser&apos;s
            built-in time zone data.
          </p>

          <div className="mt-6 space-y-4">
            <label htmlFor="source-time" className="block">
              <span className="text-sm font-medium">Source date and time</span>
              <input
                id="source-time"
                type="datetime-local"
                value={dateTime}
                onChange={(event) => setDateTime(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-lg font-semibold outline-none transition focus:border-[var(--accent-rust)]"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <TimeZoneSelect id="from-zone" label="From" value={fromZone} zones={timeZones} onChange={setFromZone} />
              <button
                type="button"
                onClick={swapZones}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Swap
              </button>
              <TimeZoneSelect id="to-zone" label="To" value={toZone} zones={timeZones} onChange={setToZone} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={setNow}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Use Current Time
              </button>
              <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
                Difference: <span className="font-semibold text-[var(--ink-900)]">{difference}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Result
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Converted Time</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {targetOffset}
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">{formatZoneName(toZone)}</p>
            <p className="mt-3 break-words text-4xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-5xl">
              {convertedTime ?? "Pick a valid time"}
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--ink-700)]">
              Source offset: {sourceOffset}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="From" value={formatZoneName(fromZone)} />
            <SummaryTile label="To" value={formatZoneName(toZone)} />
            <SummaryTile label="UTC" value={sourceDate ? formatDateTime(sourceDate, "UTC") : "--"} />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              City Comparison
            </h3>
            <div className="mt-3 grid gap-2">
              {cityRows.map((zone) => (
                <div
                  key={zone}
                  className={`flex items-center justify-between gap-4 rounded-[1.1rem] border px-4 py-3 text-sm ${
                    zone === toZone
                      ? "border-[var(--accent-rust)]/35 bg-[var(--accent-rust)]/8"
                      : "border-[var(--ink-900)]/8 bg-white"
                  }`}
                >
                  <span className="font-medium">{formatZoneName(zone)}</span>
                  <span className="text-right font-semibold tabular-nums text-[var(--ink-800)]">
                    {hasValidDate && sourceDate ? formatDateTime(sourceDate, zone) : "--"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function TimeZoneSelect({
  id,
  label,
  value,
  zones,
  onChange,
}: {
  id: string
  label: string
  value: string
  zones: string[]
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      >
        {zones.map((zone) => (
          <option key={zone} value={zone}>
            {formatZoneName(zone)}
          </option>
        ))}
      </select>
    </label>
  )
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 break-words text-base font-semibold">{value}</p>
    </div>
  )
}

function getSupportedTimeZones() {
  const supportedValuesOf = (Intl as typeof Intl & { supportedValuesOf?: (key: "timeZone") => string[] })
    .supportedValuesOf
  const zones = supportedValuesOf?.("timeZone") ?? fallbackTimeZones
  return Array.from(new Set(["UTC", ...zones])).sort((first, second) => first.localeCompare(second))
}

function parseZonedDateTime(value: string, timeZone: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/)

  if (!match) {
    return null
  }

  const [, year, month, day, hour, minute] = match
  const targetUtc = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))

  if (!Number.isFinite(targetUtc)) {
    return null
  }

  let instant = targetUtc - getTimeZoneOffsetMs(new Date(targetUtc), timeZone)
  instant = targetUtc - getTimeZoneOffsetMs(new Date(instant), timeZone)

  return new Date(instant)
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = getDateTimeParts(date, timeZone)
  const zonedTimeAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)
  return zonedTimeAsUtc - date.getTime()
}

function getDateTimeParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  })

  const entries = formatter.formatToParts(date).map((part) => [part.type, part.value])
  const parts = Object.fromEntries(entries) as Record<string, string>

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  }
}

function formatInputDateTime(date: Date, timeZone: string) {
  const parts = getDateTimeParts(date, timeZone)
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}T${pad(parts.hour)}:${pad(parts.minute)}`
}

function formatDateTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

function formatOffset(date: Date, timeZone: string) {
  const offsetMinutes = getTimeZoneOffsetMs(date, timeZone) / 60000
  const sign = offsetMinutes >= 0 ? "+" : "-"
  const absoluteMinutes = Math.abs(offsetMinutes)
  const hours = Math.floor(absoluteMinutes / 60)
  const minutes = absoluteMinutes % 60

  return `UTC${sign}${pad(hours)}:${pad(minutes)}`
}

function getOffsetDifference(date: Date, fromZone: string, toZone: string) {
  const differenceMinutes = (getTimeZoneOffsetMs(date, toZone) - getTimeZoneOffsetMs(date, fromZone)) / 60000
  const sign = differenceMinutes >= 0 ? "+" : "-"
  const absoluteMinutes = Math.abs(differenceMinutes)
  const hours = Math.floor(absoluteMinutes / 60)
  const minutes = absoluteMinutes % 60
  const minuteLabel = minutes > 0 ? ` ${minutes}m` : ""

  return `${sign}${hours}h${minuteLabel}`
}

function formatZoneName(zone: string) {
  return zone.replaceAll("_", " ")
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}
