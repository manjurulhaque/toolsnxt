"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type OutputMode = "paragraphs" | "sentences" | "words"
type WordSet = "classic" | "product" | "editorial"

const wordSets: Record<WordSet, string[]> = {
  classic: [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "labore",
    "dolore",
    "magna",
    "aliqua",
    "ut",
    "enim",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "commodo",
    "consequat",
  ],
  product: [
    "dashboard",
    "workflow",
    "insight",
    "metric",
    "customer",
    "pipeline",
    "report",
    "automation",
    "workspace",
    "integration",
    "launch",
    "conversion",
    "segment",
    "journey",
    "feature",
    "platform",
    "strategy",
    "growth",
    "signal",
    "profile",
    "campaign",
    "team",
    "review",
    "release",
  ],
  editorial: [
    "story",
    "archive",
    "culture",
    "essay",
    "chapter",
    "voice",
    "journal",
    "context",
    "dispatch",
    "reader",
    "column",
    "notebook",
    "portrait",
    "season",
    "memory",
    "scene",
    "detail",
    "letter",
    "record",
    "volume",
    "edition",
    "passage",
    "feature",
    "review",
  ],
}

export default function LoremIpsumGeneratorPage() {
  const [mode, setMode] = useState<OutputMode>("paragraphs")
  const [wordSet, setWordSet] = useState<WordSet>("classic")
  const [count, setCount] = useState("4")
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [message, setMessage] = useState("Generate placeholder copy for layouts and mockups.")

  const output = useMemo(
    () => generateLorem({ mode, wordSet, count: clampCount(count, mode), startWithLorem }),
    [count, mode, startWithLorem, wordSet],
  )
  const stats = useMemo(() => getTextStats(output), [output])

  async function copyOutput() {
    if (!output.trim()) {
      setMessage("Generate text before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      setMessage("Placeholder text copied.")
    } catch {
      setMessage("Copy failed. Select the text and copy it manually.")
    }
  }

  function downloadOutput() {
    if (!output.trim()) {
      setMessage("Generate text before downloading.")
      return
    }

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "lorem-ipsum.txt"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("lorem-ipsum.txt downloaded.")
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Text tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Lorem Ipsum Generator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Create placeholder words, sentences, or paragraphs for UI mockups, content tests, and
            design reviews.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {(["paragraphs", "sentences", "words"] as OutputMode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setMode(option)
                  setMessage(`${capitalize(option)} mode selected.`)
                }}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  mode === option
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {capitalize(option)}
              </button>
            ))}
          </div>

          <label htmlFor="lorem-count" className="mt-6 block text-sm font-medium">
            Quantity
          </label>
          <input
            id="lorem-count"
            type="number"
            min="1"
            max={mode === "words" ? "500" : "50"}
            value={count}
            onChange={(event) => {
              setCount(event.target.value)
              setMessage("Quantity updated.")
            }}
            className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
          />

          <label htmlFor="word-set" className="mt-5 block text-sm font-medium">
            Word set
          </label>
          <select
            id="word-set"
            value={wordSet}
            onChange={(event) => {
              setWordSet(event.target.value as WordSet)
              setMessage("Word set updated.")
            }}
            className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[var(--accent-rust)]"
          >
            <option value="classic">Classic lorem</option>
            <option value="product">Product UI</option>
            <option value="editorial">Editorial</option>
          </select>

          <label className="mt-5 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(event) => {
                setStartWithLorem(event.target.checked)
                setMessage("Opening phrase updated.")
              }}
              className="h-4 w-4 accent-[var(--ink-900)]"
            />
            Start with lorem ipsum
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Copy Text
            </button>
            <button
              type="button"
              onClick={downloadOutput}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Download
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Output
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Generated Text</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {stats.words} words
            </p>
          </div>

          <textarea
            value={output}
            readOnly
            rows={20}
            className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none"
            placeholder="Generated placeholder text will appear here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={stats.characters} />
            <Stat label="Sentences" value={stats.sentences} />
            <Stat label="Paragraphs" value={stats.paragraphs} />
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {message}
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

function generateLorem({
  mode,
  wordSet,
  count,
  startWithLorem,
}: {
  mode: OutputMode
  wordSet: WordSet
  count: number
  startWithLorem: boolean
}) {
  const words = wordSets[wordSet]

  if (mode === "words") {
    return buildWords(words, count, startWithLorem).join(" ")
  }

  if (mode === "sentences") {
    return Array.from({ length: count }, (_, index) =>
      buildSentence(words, index === 0 && startWithLorem),
    ).join(" ")
  }

  return Array.from({ length: count }, (_, paragraphIndex) => {
    const sentenceCount = 3 + (paragraphIndex % 3)
    return Array.from({ length: sentenceCount }, (_, sentenceIndex) =>
      buildSentence(words, paragraphIndex === 0 && sentenceIndex === 0 && startWithLorem),
    ).join(" ")
  }).join("\n\n")
}

function buildSentence(words: string[], startWithLorem: boolean) {
  const count = 8 + Math.floor(Math.random() * 8)
  const sentenceWords = buildWords(words, count, startWithLorem)
  sentenceWords[0] = capitalize(sentenceWords[0])

  return `${sentenceWords.join(" ")}.`
}

function buildWords(words: string[], count: number, startWithLorem: boolean) {
  const output = Array.from({ length: count }, (_, index) => words[(index * 7 + count * 3) % words.length])

  if (startWithLorem && words === wordSets.classic && count >= 2) {
    output[0] = "lorem"
    output[1] = "ipsum"
  }

  return output
}

function clampCount(value: string, mode: OutputMode) {
  const numberValue = Number(value)
  const max = mode === "words" ? 500 : 50

  if (!Number.isFinite(numberValue)) {
    return 1
  }

  return Math.min(Math.max(Math.floor(numberValue), 1), max)
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    sentences: (value.match(/[.!?]/g) ?? []).length,
    paragraphs: trimmedValue ? trimmedValue.split(/\n\s*\n/).length : 0,
  }
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
