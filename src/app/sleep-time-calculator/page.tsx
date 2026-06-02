"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type Mode = "wake" | "bed"

type SleepOption = {
  cycles: number
  sleepMinutes: number
  clockTime: string
  label: string
}

const cycleMinutes = 90
const recommendedCycles = [3, 4, 5, 6]

export default function SleepTimeCalculatorPage() {
  const [mode, setMode] = useState<Mode>("wake")
  const [targetTime, setTargetTime] = useState("07:00")
  const [fallAsleepMinutes, setFallAsleepMinutes] = useState("15")

  const fallAsleep = useMemo(() => parseMinutes(fallAsleepMinutes), [fallAsleepMinutes])
  const options = useMemo(
    () => getSleepOptions(mode, targetTime, fallAsleep),
    [fallAsleep, mode, targetTime],
  )
  const bestOption = options.find((option) => option.cycles === 5) ?? options[0]

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
            Sleep tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Sleep Time Calculator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Plan sleep around 90-minute cycles. Choose when you want to wake up or when you want to
            go to bed, then compare practical timing options.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
            {(["wake", "bed"] as Mode[]).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                onClick={() => setMode(nextMode)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === nextMode
                    ? "bg-[var(--ink-900)] text-white"
                    : "text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {nextMode === "wake" ? "Wake Up At" : "Sleep At"}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label htmlFor="target-time" className="block">
              <span className="text-sm font-medium">
                {mode === "wake" ? "Wake-up time" : "Bedtime"}
              </span>
              <input
                id="target-time"
                type="time"
                value={targetTime}
                onChange={(event) => setTargetTime(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
              />
            </label>

            <label htmlFor="fall-asleep" className="block">
              <span className="text-sm font-medium">Minutes to fall asleep</span>
              <input
                id="fall-asleep"
                type="number"
                min="0"
                inputMode="numeric"
                value={fallAsleepMinutes}
                onChange={(event) => setFallAsleepMinutes(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
              />
            </label>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
            Most adults need about 7 to 9 hours of sleep. This is a planning aid, not medical
            advice.
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Result
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {mode === "wake" ? "Suggested Bedtimes" : "Suggested Wake Times"}
              </h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              90 min cycles
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">
              {mode === "wake" ? "Best bedtime to try" : "Best wake time to try"}
            </p>
            <p className="mt-3 text-6xl font-semibold tabular-nums text-[var(--ink-900)]">
              {bestOption?.clockTime ?? "--:--"}
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--ink-700)]">
              {bestOption ? `${bestOption.cycles} cycles / ${formatDuration(bestOption.sleepMinutes)} asleep` : ""}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Target" value={targetTime || "--:--"} />
            <SummaryTile label="Wind-down" value={`${fallAsleep} min`} />
            <SummaryTile label="Cycle" value={`${cycleMinutes} min`} />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Sleep Cycle Options
            </h3>
            <div className="mt-3 grid gap-2">
              {options.map((option) => (
                <div
                  key={option.cycles}
                  className={`flex items-center justify-between gap-4 rounded-[1.1rem] border px-4 py-3 text-sm ${
                    option.cycles === 5
                      ? "border-[var(--accent-rust)]/35 bg-[var(--accent-rust)]/8"
                      : "border-[var(--ink-900)]/8 bg-white"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-right font-semibold tabular-nums text-[var(--ink-800)]">
                    {option.clockTime}
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

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}

function getSleepOptions(mode: Mode, targetTime: string, fallAsleepMinutes: number): SleepOption[] {
  const targetMinutes = parseClockTime(targetTime)

  return recommendedCycles.map((cycles) => {
    const sleepMinutes = cycles * cycleMinutes
    const offset = sleepMinutes + fallAsleepMinutes
    const clockMinutes = mode === "wake" ? targetMinutes - offset : targetMinutes + offset

    return {
      cycles,
      sleepMinutes,
      clockTime: formatClockTime(clockMinutes),
      label: `${cycles} cycles / ${formatDuration(sleepMinutes)}`,
    }
  })
}

function parseClockTime(value: string) {
  const [hours = "0", minutes = "0"] = value.split(":")
  return parseMinutes(hours) * 60 + parseMinutes(minutes)
}

function parseMinutes(value: string) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) && numericValue > 0 ? Math.floor(numericValue) : 0
}

function formatClockTime(totalMinutes: number) {
  const dayMinutes = 24 * 60
  const normalizedMinutes = ((totalMinutes % dayMinutes) + dayMinutes) % dayMinutes
  const hours = Math.floor(normalizedMinutes / 60)
  const minutes = normalizedMinutes % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
}
