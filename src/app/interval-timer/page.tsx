"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

type Phase = "work" | "rest"

type Preset = {
  label: string
  workSeconds: number
  restSeconds: number
  rounds: number
}

const presets: Preset[] = [
  { label: "Tabata", workSeconds: 20, restSeconds: 10, rounds: 8 },
  { label: "HIIT", workSeconds: 45, restSeconds: 15, rounds: 10 },
  { label: "Stretch", workSeconds: 30, restSeconds: 10, rounds: 6 },
  { label: "Boxing", workSeconds: 180, restSeconds: 60, rounds: 3 },
]

export default function IntervalTimerPage() {
  const [workMinutes, setWorkMinutes] = useState("0")
  const [workSecondsInput, setWorkSecondsInput] = useState("45")
  const [restMinutes, setRestMinutes] = useState("0")
  const [restSecondsInput, setRestSecondsInput] = useState("15")
  const [roundsInput, setRoundsInput] = useState("10")
  const [phase, setPhase] = useState<Phase>("work")
  const [round, setRound] = useState(1)
  const [secondsLeft, setSecondsLeft] = useState(45)
  const [isRunning, setIsRunning] = useState(false)
  const [completedRounds, setCompletedRounds] = useState(0)

  const workSeconds = useMemo(
    () => parseDuration(workMinutes, workSecondsInput),
    [workMinutes, workSecondsInput],
  )
  const restSeconds = useMemo(
    () => parseDuration(restMinutes, restSecondsInput),
    [restMinutes, restSecondsInput],
  )
  const totalRounds = Math.max(1, parseUnit(roundsInput))
  const currentPhaseTotal = phase === "work" ? workSeconds : restSeconds
  const progress = currentPhaseTotal > 0 ? (currentPhaseTotal - secondsLeft) / currentPhaseTotal : 0
  const isComplete = completedRounds >= totalRounds && secondsLeft === 0

  const advancePhase = useCallback(() => {
    if (phase === "work" && restSeconds > 0) {
      setPhase("rest")
      setSecondsLeft(restSeconds)
      return
    }

    if (round >= totalRounds) {
      setCompletedRounds(totalRounds)
      setSecondsLeft(0)
      setIsRunning(false)
      return
    }

    setCompletedRounds((current) => Math.min(totalRounds, current + 1))
    setRound((currentRound) => currentRound + 1)
    setPhase("work")
    setSecondsLeft(workSeconds)
  }, [phase, restSeconds, round, totalRounds, workSeconds])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds > 1) {
          return currentSeconds - 1
        }

        advancePhase()
        return 0
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [advancePhase, isRunning])

  useEffect(() => {
    document.title = `${formatTime(secondsLeft)} - Interval Timer`

    return () => {
      document.title = "Web Tools | Fast Browser Utilities"
    }
  }, [secondsLeft])

  function applySettings() {
    setIsRunning(false)
    setPhase("work")
    setRound(1)
    setCompletedRounds(0)
    setSecondsLeft(workSeconds)
  }

  function applyPreset(preset: Preset) {
    const workParts = splitDuration(preset.workSeconds)
    const restParts = splitDuration(preset.restSeconds)

    setWorkMinutes(String(workParts.minutes))
    setWorkSecondsInput(String(workParts.seconds))
    setRestMinutes(String(restParts.minutes))
    setRestSecondsInput(String(restParts.seconds))
    setRoundsInput(String(preset.rounds))
    setIsRunning(false)
    setPhase("work")
    setRound(1)
    setCompletedRounds(0)
    setSecondsLeft(preset.workSeconds)
  }

  function toggleTimer() {
    if (isComplete) {
      applySettings()
      setIsRunning(true)
      return
    }

    if (secondsLeft <= 0) {
      setSecondsLeft(workSeconds)
      setPhase("work")
      setRound(1)
      setCompletedRounds(0)
    }

    setIsRunning((current) => !current)
  }

  function resetTimer() {
    setIsRunning(false)
    setPhase("work")
    setRound(1)
    setCompletedRounds(0)
    setSecondsLeft(workSeconds)
  }

  function skipPhase() {
    if (isComplete) {
      return
    }

    advancePhase()
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Time tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Interval Timer</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Alternate work and rest intervals for training sessions, mobility routines, rehearsals,
            or repeated focus blocks.
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DurationFields
              label="Work"
              minutesId="work-minutes"
              secondsId="work-seconds"
              minutes={workMinutes}
              seconds={workSecondsInput}
              onMinutesChange={setWorkMinutes}
              onSecondsChange={setWorkSecondsInput}
            />
            <DurationFields
              label="Rest"
              minutesId="rest-minutes"
              secondsId="rest-seconds"
              minutes={restMinutes}
              seconds={restSecondsInput}
              onMinutesChange={setRestMinutes}
              onSecondsChange={setRestSecondsInput}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.1fr]">
            <NumberField id="interval-rounds" label="Rounds" value={roundsInput} onChange={setRoundsInput} />
            <button
              type="button"
              onClick={applySettings}
              disabled={workSeconds <= 0}
              className="self-end rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Set Intervals
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat label="Work" value={formatTime(workSeconds)} />
            <Stat label="Rest" value={formatTime(restSeconds)} />
            <Stat label="Rounds" value={totalRounds} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 text-center shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="mx-auto flex max-w-md flex-col items-center">
            <div
              className="relative grid aspect-square w-full max-w-[22rem] place-items-center rounded-full"
              style={{
                background: `conic-gradient(${
                  phase === "work" ? "var(--accent-rust)" : "var(--accent-gold)"
                } ${Math.max(0, Math.min(1, progress)) * 360}deg, rgba(33,37,41,0.08) 0deg)`,
              }}
            >
              <div className="absolute inset-4 rounded-full bg-[var(--page-cream)]" />
              <div className="relative px-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink-700)]">
                  {isComplete ? "Finished" : phase === "work" ? "Work" : "Rest"}
                </p>
                <p className="mt-3 text-6xl font-semibold tabular-nums sm:text-7xl">
                  {formatTime(secondsLeft)}
                </p>
                <p className="mt-3 text-sm font-semibold text-[var(--ink-700)]">
                  Round {Math.min(round, totalRounds)} of {totalRounds}
                </p>
              </div>
            </div>

            <div className="mt-7 grid w-full gap-3 sm:grid-cols-4">
              <button
                type="button"
                onClick={toggleTimer}
                disabled={workSeconds <= 0}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45 sm:col-span-2"
              >
                {isRunning ? "Pause" : isComplete ? "Start Again" : "Start"}
              </button>
              <button
                type="button"
                onClick={skipPhase}
                disabled={isComplete || workSeconds <= 0}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Skip
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
              <Stat label="Completed" value={completedRounds} />
              <Stat label="Remaining" value={Math.max(0, totalRounds - completedRounds)} />
              <Stat label="Status" value={isRunning ? "Running" : isComplete ? "Done" : "Ready"} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DurationFields({
  label,
  minutesId,
  secondsId,
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
}: {
  label: string
  minutesId: string
  secondsId: string
  minutes: string
  seconds: string
  onMinutesChange: (value: string) => void
  onSecondsChange: (value: string) => void
}) {
  return (
    <fieldset className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <legend className="px-1 text-sm font-semibold">{label}</legend>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <NumberField id={minutesId} label="Minutes" value={minutes} onChange={onMinutesChange} />
        <NumberField id={secondsId} label="Seconds" value={seconds} onChange={onSecondsChange} />
      </div>
    </fieldset>
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
        className="mt-2 w-full rounded-[1rem] border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}

function parseDuration(minutes: string, seconds: string) {
  return parseUnit(minutes) * 60 + parseUnit(seconds)
}

function parseUnit(value: string) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) && numericValue > 0 ? Math.floor(numericValue) : 0
}

function splitDuration(totalSeconds: number) {
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  }
}

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
