"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

type TimerMode = "focus" | "shortBreak" | "longBreak"

const modes: Record<TimerMode, { label: string; minutes: number; accent: string }> = {
  focus: { label: "Focus", minutes: 25, accent: "var(--accent-rust)" },
  shortBreak: { label: "Short Break", minutes: 5, accent: "var(--accent-gold)" },
  longBreak: { label: "Long Break", minutes: 15, accent: "var(--ink-800)" },
}

export default function PomodoroTimerPage() {
  const [mode, setMode] = useState<TimerMode>("focus")
  const [secondsLeft, setSecondsLeft] = useState(modes.focus.minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedFocus, setCompletedFocus] = useState(0)

  const totalSeconds = modes[mode].minutes * 60
  const progress = useMemo(
    () => Math.max(0, Math.min(1, (totalSeconds - secondsLeft) / totalSeconds)),
    [secondsLeft, totalSeconds],
  )

  const switchMode = useCallback((nextMode: TimerMode) => {
    setMode(nextMode)
    setSecondsLeft(modes[nextMode].minutes * 60)
    setIsRunning(false)
  }, [])

  const handleSessionComplete = useCallback(() => {
    if (mode === "focus") {
      setCompletedFocus((currentFocusCount) => {
        const nextCompletedFocus = currentFocusCount + 1
        switchMode(nextCompletedFocus % 4 === 0 ? "longBreak" : "shortBreak")
        return nextCompletedFocus
      })
      return
    }

    switchMode("focus")
  }, [mode, switchMode])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(interval)
          setIsRunning(false)
          handleSessionComplete()
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [handleSessionComplete, isRunning])

  useEffect(() => {
    document.title = `${formatTime(secondsLeft)} - ${modes[mode].label}`

    return () => {
      document.title = "Web Tools | Fast Browser Utilities"
    }
  }, [mode, secondsLeft])

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
            Focus tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Pomodoro Timer</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Work in focused intervals, then step away for a short reset. Every fourth completed
            focus session leads into a longer break.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
            {(Object.keys(modes) as TimerMode[]).map((timerMode) => (
              <button
                key={timerMode}
                type="button"
                onClick={() => switchMode(timerMode)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  mode === timerMode
                    ? "bg-[var(--ink-900)] text-white"
                    : "text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {modes[timerMode].label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Focus Done" value={completedFocus} />
            <Stat label="Round" value={(completedFocus % 4) + 1} />
            <Stat label="Next Long Break" value={4 - (completedFocus % 4)} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 text-center shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="mx-auto flex max-w-md flex-col items-center">
            <div
              className="relative grid aspect-square w-full max-w-[22rem] place-items-center rounded-full"
              style={{
                background: `conic-gradient(${modes[mode].accent} ${progress * 360}deg, rgba(33,37,41,0.08) 0deg)`,
              }}
            >
              <div className="absolute inset-4 rounded-full bg-[var(--page-cream)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink-700)]">
                  {modes[mode].label}
                </p>
                <p className="mt-3 text-6xl font-semibold tabular-nums sm:text-7xl">
                  {formatTime(secondsLeft)}
                </p>
              </div>
            </div>

            <div className="mt-7 grid w-full gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setIsRunning((current) => !current)}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] sm:col-span-2"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Reset
              </button>
            </div>

            <p className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {isRunning ? "Timer is running." : "Ready when you are."}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
