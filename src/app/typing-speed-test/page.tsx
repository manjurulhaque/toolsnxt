"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { PanelHeader, ToolIntro, ToolPage, InfoBox, SummaryTile, ToolPanel } from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

type Duration = 30 | 60 | 120
type TestStatus = "idle" | "running" | "finished"

const passages = [
  "Small tools should feel quick, calm, and close at hand. A focused workspace helps everyday tasks move without friction.",
  "Clear writing is built one sentence at a time. When the interface gets out of the way, attention can stay with the work.",
  "Typing practice rewards steady rhythm more than raw speed. Accuracy first, pace second, and the numbers become useful.",
  "Browser utilities are best when they are private, immediate, and simple enough to trust during a busy day.",
]

export default function TypingSpeedTestPage() {
  const [duration, setDuration] = useState<Duration>(60)
  const [passageIndex, setPassageIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [status, setStatus] = useState<TestStatus>("idle")
  const [message, setMessage] = useState("Start typing to begin the test.")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const passage = passages[passageIndex]
  const stats = useMemo(
    () => calculateStats(passage, typedText, duration, secondsLeft, status),
    [duration, passage, secondsLeft, status, typedText],
  )
  const progress = Math.min(100, Math.round((typedText.length / passage.length) * 100))

  useEffect(() => {
    if (status !== "running") {
      return
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(interval)
          setStatus("finished")
          setMessage("Test finished.")
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [status])

  function handleTyping(value: string) {
    if (status === "finished") {
      return
    }

    const nextTypedText = value.slice(0, passage.length)

    if (status === "idle") {
      setStatus("running")
      setMessage("Test running.")
    }

    setTypedText(nextTypedText)

    if (nextTypedText.length >= passage.length) {
      setStatus("finished")
      setMessage("Passage completed.")
    }
  }

  function resetTest(nextDuration = duration, nextPassageIndex = passageIndex) {
    setDuration(nextDuration)
    setSecondsLeft(nextDuration)
    setPassageIndex(nextPassageIndex)
    setTypedText("")
    setStatus("idle")
    setMessage("Start typing to begin the test.")
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  function nextPassage() {
    resetTest(duration, (passageIndex + 1) % passages.length)
  }

  async function copyResults() {
    const summary = [
      `WPM: ${stats.wpm}`,
      `Accuracy: ${stats.accuracy}%`,
      `Correct characters: ${stats.correctCharacters}`,
      `Mistakes: ${stats.mistakes}`,
      `Duration: ${duration} seconds`,
    ].join("\n")

    try {
      await copyToClipboard(summary)
      setMessage("Results copied.")
    } catch {
      setMessage("Copy failed. Select the results and copy them manually.")
    }
  }

  return (
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="Focus tool" title="Typing Speed Test">
            Practice typing with a timed passage and track words per minute, accuracy, mistakes, and
            completion progress locally.
          </ToolIntro>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
            {([30, 60, 120] as Duration[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => resetTest(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  duration === option
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                {option}s
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Time" value={formatSeconds(secondsLeft)} />
            <SummaryTile label="WPM" value={stats.wpm} />
            <SummaryTile label="Accuracy" value={`${stats.accuracy}%`} />
            <SummaryTile label="Mistakes" value={stats.mistakes} />
            <SummaryTile label="Progress" value={`${progress}%`} />
            <SummaryTile label="Status" value={getStatusLabel(status)} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => resetTest()}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Restart
            </button>
            <button
              type="button"
              onClick={nextPassage}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              New Text
            </button>
            <button
              type="button"
              onClick={copyResults}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Results
            </button>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Test area" title="Passage" badge={"{stats.correctCharacters} correct chars"} />

          <div className="mt-6 rounded-[1.35rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5 font-mono text-lg leading-9">
            {passage.split("").map((character, index) => {
              const typedCharacter = typedText[index]
              const state =
                typedCharacter === undefined
                  ? "pending"
                  : typedCharacter === character
                    ? "correct"
                    : "wrong"

              return (
                <span
                  key={`${character}-${index}`}
                  className={
                    state === "correct"
                      ? "bg-emerald-100 text-emerald-800"
                      : state === "wrong"
                        ? "bg-red-100 text-red-800"
                        : index === typedText.length
                          ? "border-b-2 border-[var(--accent-rust)]"
                          : "text-[var(--ink-700)]"
                  }
                >
                  {character}
                </span>
              )
            })}
          </div>

          <label htmlFor="typing-input" className="mt-6 block text-sm font-medium">
            Type here
          </label>
          <textarea
            ref={inputRef}
            id="typing-input"
            value={typedText}
            onChange={(event) => handleTyping(event.target.value)}
            rows={7}
            disabled={status === "finished"}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)] disabled:cursor-not-allowed disabled:opacity-65"
            placeholder="Start typing the passage above..."
          />

          <InfoBox className="mt-5">
            {message}
          </InfoBox>
        </ToolPanel>
    </ToolPage>
  )
}

function calculateStats(
  passage: string,
  typedText: string,
  duration: Duration,
  secondsLeft: number,
  status: TestStatus,
) {
  const elapsedSeconds =
    status === "idle" ? 0 : Math.max(1, Math.min(duration, duration - secondsLeft))
  let correctCharacters = 0
  let mistakes = 0

  for (let index = 0; index < typedText.length; index += 1) {
    if (typedText[index] === passage[index]) {
      correctCharacters += 1
    } else {
      mistakes += 1
    }
  }

  const grossWords = typedText.length / 5
  const correctWords = correctCharacters / 5
  const minutes = elapsedSeconds / 60
  const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0
  const rawWpm = minutes > 0 ? Math.round(grossWords / minutes) : 0
  const accuracy = typedText.length > 0 ? Math.round((correctCharacters / typedText.length) * 100) : 100

  return {
    wpm,
    rawWpm,
    accuracy,
    mistakes,
    correctCharacters,
  }
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

function getStatusLabel(status: TestStatus) {
  if (status === "running") {
    return "Running"
  }

  if (status === "finished") {
    return "Done"
  }

  return "Ready"
}
