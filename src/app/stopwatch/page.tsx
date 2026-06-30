"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ToolIntro, ToolPage, SummaryTile, ToolPanel } from "@/components/tool-page"
import { SITE_TITLE } from "@/lib/site"

type Lap = {
  id: number
  elapsedMs: number
  splitMs: number
}

export default function StopwatchPage() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])
  const startedAtRef = useRef<number | null>(null)
  const savedElapsedRef = useRef(0)

  const fastestLapId = useMemo(() => {
    if (laps.length < 2) {
      return null
    }

    return laps.reduce((fastest, lap) => (lap.splitMs < fastest.splitMs ? lap : fastest), laps[0]).id
  }, [laps])

  const slowestLapId = useMemo(() => {
    if (laps.length < 2) {
      return null
    }

    return laps.reduce((slowest, lap) => (lap.splitMs > slowest.splitMs ? lap : slowest), laps[0]).id
  }, [laps])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    startedAtRef.current = performance.now()

    const frame = window.setInterval(() => {
      if (startedAtRef.current === null) {
        return
      }

      setElapsedMs(savedElapsedRef.current + performance.now() - startedAtRef.current)
    }, 33)

    return () => window.clearInterval(frame)
  }, [isRunning])

  useEffect(() => {
    document.title = `${formatStopwatch(elapsedMs)} - Stopwatch`

    return () => {
      document.title = SITE_TITLE
    }
  }, [elapsedMs])

  function toggleStopwatch() {
    if (isRunning) {
      savedElapsedRef.current = elapsedMs
      startedAtRef.current = null
      setIsRunning(false)
      return
    }

    setIsRunning(true)
  }

  function resetStopwatch() {
    setElapsedMs(0)
    setIsRunning(false)
    setLaps([])
    startedAtRef.current = null
    savedElapsedRef.current = 0
  }

  function recordLap() {
    if (elapsedMs <= 0) {
      return
    }

    setLaps((currentLaps) => {
      const previousElapsed = currentLaps[0]?.elapsedMs ?? 0

      return [
        {
          id: currentLaps.length + 1,
          elapsedMs,
          splitMs: elapsedMs - previousElapsed,
        },
        ...currentLaps,
      ]
    })
  }

  return (
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="Time tool" title="Stopwatch">
            Track elapsed time with lap splits for workouts, practice rounds, experiments, or any
            task that needs a clean running clock.
          </ToolIntro>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Status" value={isRunning ? "Running" : elapsedMs > 0 ? "Paused" : "Ready"} />
            <SummaryTile label="Laps" value={laps.length} />
            <SummaryTile label="Best Split" value={fastestLapId ? `#${fastestLapId}` : "--"} />
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 text-sm leading-6 text-[var(--ink-700)]">
            Lap records are kept in this tab only. The newest lap appears first, with fastest and
            slowest splits marked once you have at least two laps.
          </div>
        </ToolPanel>

        <ToolPanel className="text-center">
          <div className="mx-auto flex max-w-md flex-col items-center">
            <div
              className="relative grid aspect-square w-full max-w-[22rem] place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--accent-rust) ${
                  (elapsedMs % 60000) * 0.006
                }deg, rgba(33,37,41,0.08) 0deg)`,
              }}
            >
              <div className="absolute inset-4 rounded-full bg-[var(--page-cream)]" />
              <div className="relative px-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink-700)]">
                  {isRunning ? "Running" : "Stopwatch"}
                </p>
                <p className="mt-3 text-5xl font-semibold tabular-nums sm:text-6xl">
                  {formatStopwatch(elapsedMs)}
                </p>
              </div>
            </div>

            <div className="mt-7 grid w-full gap-3 sm:grid-cols-4">
              <button
                type="button"
                onClick={toggleStopwatch}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] sm:col-span-2"
              >
                {isRunning ? "Pause" : elapsedMs > 0 ? "Resume" : "Start"}
              </button>
              <button
                type="button"
                onClick={recordLap}
                disabled={elapsedMs <= 0}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Lap
              </button>
              <button
                type="button"
                onClick={resetStopwatch}
                disabled={elapsedMs <= 0 && laps.length === 0}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 w-full overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] text-left">
              <div className="grid grid-cols-[0.7fr_1fr_1fr] gap-3 border-b border-[var(--ink-900)]/8 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-700)]/72">
                <span>Lap</span>
                <span>Split</span>
                <span>Total</span>
              </div>

              {laps.length === 0 ? (
                <p className="px-4 py-5 text-sm text-[var(--ink-700)]">No laps recorded yet.</p>
              ) : (
                <ol className="max-h-72 overflow-y-auto">
                  {laps.map((lap) => (
                    <li
                      key={lap.id}
                      className="grid grid-cols-[0.7fr_1fr_1fr] gap-3 border-b border-[var(--ink-900)]/6 px-4 py-3 text-sm last:border-b-0"
                    >
                      <span className="font-semibold">#{lap.id}</span>
                      <span
                        className={`tabular-nums ${
                          lap.id === fastestLapId
                            ? "text-emerald-700"
                            : lap.id === slowestLapId
                              ? "text-[var(--accent-rust)]"
                              : "text-[var(--ink-700)]"
                        }`}
                      >
                        {formatStopwatch(lap.splitMs)}
                      </span>
                      <span className="tabular-nums text-[var(--ink-700)]">
                        {formatStopwatch(lap.elapsedMs)}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </ToolPanel>
    </ToolPage>
  )
}

function formatStopwatch(totalMs: number) {
  const safeMs = Math.max(0, Math.floor(totalMs))
  const minutes = Math.floor(safeMs / 60000)
  const seconds = Math.floor((safeMs % 60000) / 1000)
  const centiseconds = Math.floor((safeMs % 1000) / 10)

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(
    centiseconds,
  ).padStart(2, "0")}`
}
