"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type Preset = {
  label: string
  seconds: number
}

const presets: Preset[] = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "30 min", seconds: 30 * 60 },
]

export default function CountdownTimerPage() {
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("10")
  const [seconds, setSeconds] = useState("0")
  const [totalSeconds, setTotalSeconds] = useState(10 * 60)
  const [secondsLeft, setSecondsLeft] = useState(10 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)

  const progress = useMemo(() => {
    if (totalSeconds <= 0) {
      return 0
    }

    return Math.max(0, Math.min(1, (totalSeconds - secondsLeft) / totalSeconds))
  }, [secondsLeft, totalSeconds])

  const currentInputSeconds = useMemo(
    () => parseDuration(hours, minutes, seconds),
    [hours, minutes, seconds],
  )
  const isComplete = totalSeconds > 0 && secondsLeft === 0

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(interval)
          setIsRunning(false)
          setCompletedCount((currentCount) => currentCount + 1)
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    document.title = `${formatTime(secondsLeft)} - Countdown Timer`

    return () => {
      document.title = "Web Tools | Fast Browser Utilities"
    }
  }, [secondsLeft])

  function applyDuration(nextSeconds = currentInputSeconds) {
    const safeSeconds = Math.max(0, nextSeconds)
    setTotalSeconds(safeSeconds)
    setSecondsLeft(safeSeconds)
    setIsRunning(false)
  }

  function applyPreset(preset: Preset) {
    const parts = splitDuration(preset.seconds)
    setHours(String(parts.hours))
    setMinutes(String(parts.minutes))
    setSeconds(String(parts.seconds))
    applyDuration(preset.seconds)
  }

  function toggleTimer() {
    if (secondsLeft <= 0) {
      applyDuration()
      return
    }

    setIsRunning((current) => !current)
  }

  function resetTimer() {
    setSecondsLeft(totalSeconds)
    setIsRunning(false)
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
            Time tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Countdown Timer</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Set a custom countdown for breaks, cooking, study blocks, or any small deadline that
            needs a clear clock.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-2 text-sm font-semibold text-[var(--ink-700)] transition hover:bg-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <NumberField id="timer-hours" label="Hours" value={hours} onChange={setHours} />
            <NumberField id="timer-minutes" label="Minutes" value={minutes} onChange={setMinutes} />
            <NumberField id="timer-seconds" label="Seconds" value={seconds} onChange={setSeconds} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => applyDuration()}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Set Countdown
            </button>
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              Duration: <span className="font-semibold text-[var(--ink-900)]">{formatTime(currentInputSeconds)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 text-center shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="mx-auto flex max-w-md flex-col items-center">
            <div
              className="relative grid aspect-square w-full max-w-[22rem] place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--accent-rust) ${progress * 360}deg, rgba(33,37,41,0.08) 0deg)`,
              }}
            >
              <div className="absolute inset-4 rounded-full bg-[var(--page-cream)]" />
              <div className="relative px-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink-700)]">
                  {isComplete ? "Finished" : isRunning ? "Running" : "Ready"}
                </p>
                <p className="mt-3 text-6xl font-semibold tabular-nums sm:text-7xl">
                  {formatTime(secondsLeft)}
                </p>
              </div>
            </div>

            <div className="mt-7 grid w-full gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={toggleTimer}
                disabled={currentInputSeconds <= 0 && secondsLeft <= 0}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45 sm:col-span-2"
              >
                {isRunning ? "Pause" : secondsLeft <= 0 ? "Start Again" : "Start"}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 grid w-full gap-3 sm:grid-cols-3">
              <Stat label="Set For" value={formatTime(totalSeconds)} />
              <Stat label="Elapsed" value={formatTime(totalSeconds - secondsLeft)} />
              <Stat label="Done" value={String(completedCount)} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function NumberField({
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
        type="number"
        min="0"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}

function parseDuration(hours: string, minutes: string, seconds: string) {
  return parseUnit(hours) * 3600 + parseUnit(minutes) * 60 + parseUnit(seconds)
}

function parseUnit(value: string) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) && numericValue > 0 ? Math.floor(numericValue) : 0
}

function splitDuration(totalSeconds: number) {
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
