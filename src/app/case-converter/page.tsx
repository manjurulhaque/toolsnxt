"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type CaseMode =
  | "sentence"
  | "lower"
  | "upper"
  | "title"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"

const caseModes: Array<{ key: CaseMode; label: string }> = [
  { key: "sentence", label: "Sentence" },
  { key: "lower", label: "lowercase" },
  { key: "upper", label: "UPPERCASE" },
  { key: "title", label: "Title Case" },
  { key: "camel", label: "camelCase" },
  { key: "pascal", label: "PascalCase" },
  { key: "snake", label: "snake_case" },
  { key: "kebab", label: "kebab-case" },
  { key: "constant", label: "CONSTANT_CASE" },
]

const sampleText = "Make every word land in the right shape."

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState(sampleText)
  const [mode, setMode] = useState<CaseMode>("title")
  const [message, setMessage] = useState("Choose a case style to transform your text.")

  const outputText = useMemo(() => convertCase(inputText, mode), [inputText, mode])
  const wordCount = useMemo(() => getWords(inputText).length, [inputText])
  const characterCount = inputText.length

  async function copyOutput() {
    if (!outputText) {
      setMessage("Add text before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(outputText)
      setMessage("Converted text copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function clearText() {
    setInputText("")
    setMessage("Text cleared.")
  }

  function loadSample() {
    setInputText(sampleText)
    setMessage("Sample text loaded.")
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
            Text tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Case Converter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Paste text once, then reshape it for headings, code identifiers, filenames, constants,
            and quick formatting cleanup.
          </p>

          <label htmlFor="case-input" className="mt-6 block text-sm font-medium">
            Input text
          </label>
          <textarea
            id="case-input"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value)
              setMessage("Text updated.")
            }}
            rows={9}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="Type or paste text here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={characterCount} />
            <Stat label="Words" value={wordCount} />
            <Stat label="Lines" value={inputText ? inputText.split(/\r\n|\r|\n/).length : 0} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearText}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Conversion
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Output</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {caseModes.find((caseMode) => caseMode.key === mode)?.label}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {caseModes.map((caseMode) => (
              <button
                key={caseMode.key}
                type="button"
                onClick={() => setMode(caseMode.key)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  mode === caseMode.key
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {caseMode.label}
              </button>
            ))}
          </div>

          <label htmlFor="case-output" className="mt-6 block text-sm font-medium">
            Converted text
          </label>
          <textarea
            id="case-output"
            value={outputText}
            readOnly
            rows={9}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none"
            placeholder="Converted text will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Result
            </button>
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

function convertCase(value: string, mode: CaseMode) {
  switch (mode) {
    case "sentence":
      return toSentenceCase(value)
    case "lower":
      return value.toLowerCase()
    case "upper":
      return value.toUpperCase()
    case "title":
      return getWords(value)
        .map(capitalize)
        .join(" ")
    case "camel":
      return getWords(value)
        .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
        .join("")
    case "pascal":
      return getWords(value).map(capitalize).join("")
    case "snake":
      return getWords(value).join("_").toLowerCase()
    case "kebab":
      return getWords(value).join("-").toLowerCase()
    case "constant":
      return getWords(value).join("_").toUpperCase()
  }
}

function toSentenceCase(value: string) {
  const lowerText = value.toLowerCase()

  return lowerText.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (match) => match.toUpperCase())
}

function getWords(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .match(/[A-Za-z0-9]+/g) ?? []
}

function capitalize(value: string) {
  const lowerValue = value.toLowerCase()
  return `${lowerValue.charAt(0).toUpperCase()}${lowerValue.slice(1)}`
}
