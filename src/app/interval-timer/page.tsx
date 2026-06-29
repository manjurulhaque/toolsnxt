"use client"

import { NumberField } from "@/components/form-controls"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ToolIntro, ToolPage, SummaryTile, ToolPanel } from "@/components/tool-page"

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
    <ToolPage gridClassName="lg:grid-cols-[0.95fr_1.05fr]">
        <ToolPanel>
          <ToolIntro eyebrow="Time tool" title="Interval Timer">
            Alternate work and rest intervals for training sessions, mobility routines, rehearsals,
            or repeated focus blocks.
          </ToolIntro>

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
            <SummaryTile label="Work" value={formatTime(workSeconds)} />
            <SummaryTile label="Rest" value={formatTime(restSeconds)} />
            <SummaryTile label="Rounds" value={totalRounds} />
          </div>
        </ToolPanel>

        <ToolPanel className="text-center">
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
              <SummaryTile label="Completed" value={completedRounds} />
              <SummaryTile label="Remaining" value={Math.max(0, totalRounds - completedRounds)} />
              <SummaryTile label="Status" value={isRunning ? "Running" : isComplete ? "Done" : "Ready"} />
            </div>
          </div>
        </ToolPanel>
    </ToolPage>
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
