"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type TransformMode = "encode" | "decode" | "component" | "base64-encode" | "base64-decode"

const sampleText = "https://example.com/search?q=web tools&category=developer notes"
const transformModes: Array<{ key: TransformMode; label: string }> = [
  { key: "encode", label: "Encode URL" },
  { key: "decode", label: "Decode URL" },
  { key: "component", label: "Encode Component" },
  { key: "base64-encode", label: "Base64 Encode" },
  { key: "base64-decode", label: "Base64 Decode" },
]

export default function UrlEncoderDecoderPage() {
  const [inputText, setInputText] = useState(sampleText)
  const [mode, setMode] = useState<TransformMode>("encode")
  const [message, setMessage] = useState("Paste text or a URL to transform it locally.")

  const result = useMemo(() => transformText(inputText, mode), [inputText, mode])
  const queryParams = useMemo(() => getQueryParams(inputText), [inputText])
  const inputStats = useMemo(() => getTextStats(inputText), [inputText])
  const outputStats = useMemo(() => getTextStats(result.output), [result.output])

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Add input before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("Result copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function clearAll() {
    setInputText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setInputText(sampleText)
    setMode("encode")
    setMessage("Sample URL loaded.")
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
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">URL Encoder / Decoder</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Encode and decode URLs, query-safe components, and Base64 text in your browser, with a
            quick view of parsed query parameters.
          </p>

          <label htmlFor="url-input" className="mt-6 block text-sm font-medium">
            Input
          </label>
          <textarea
            id="url-input"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value)
              setMessage("Input updated.")
            }}
            rows={12}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="Paste a URL, text value, or Base64 string..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={inputStats.characters} />
            <Stat label="Lines" value={inputStats.lines} />
            <Stat label="Bytes" value={inputStats.bytes} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearAll}
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
                Transform
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Output</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.error ? "bg-red-50 text-red-700" : "bg-[var(--page-cream)] text-[var(--ink-700)]"
              }`}
            >
              {result.error ? "Check input" : `${outputStats.characters} chars`}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {transformModes.map((transformMode) => (
              <button
                key={transformMode.key}
                type="button"
                onClick={() => {
                  setMode(transformMode.key)
                  setMessage(`${transformMode.label} selected.`)
                }}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  mode === transformMode.key
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {transformMode.label}
              </button>
            ))}
          </div>

          <label htmlFor="url-output" className="mt-6 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="url-output"
            value={result.output}
            readOnly
            rows={9}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Transformed text will appear here..."
          />

          <div className="mt-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Query Parameters
            </h3>
            <div className="mt-3 grid max-h-52 gap-2 overflow-auto pr-1">
              {queryParams.map((param) => (
                <div
                  key={`${param.key}-${param.value}`}
                  className="grid gap-2 rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm sm:grid-cols-[0.45fr_1fr]"
                >
                  <code className="break-all font-mono font-semibold">{param.key}</code>
                  <code className="break-all font-mono text-[var(--ink-700)]">{param.value}</code>
                </div>
              ))}
              {queryParams.length === 0 ? (
                <div className="rounded-[1.1rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  Query parameters will appear when the input contains a URL query string.
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {result.error ?? message}
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

function transformText(value: string, mode: TransformMode) {
  if (!value.trim()) {
    return { output: "", error: null }
  }

  try {
    if (mode === "encode") {
      return { output: encodeURI(value), error: null }
    }

    if (mode === "decode") {
      return { output: decodeURI(value), error: null }
    }

    if (mode === "component") {
      return { output: encodeURIComponent(value), error: null }
    }

    if (mode === "base64-encode") {
      return { output: btoa(unescape(encodeURIComponent(value))), error: null }
    }

    return { output: decodeURIComponent(escape(atob(value.trim()))), error: null }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Could not transform this input.",
    }
  }
}

function getQueryParams(value: string) {
  const queryStart = value.indexOf("?")
  if (queryStart === -1) {
    return []
  }

  const queryString = value.slice(queryStart + 1).split("#")[0]
  const params = new URLSearchParams(queryString)

  return Array.from(params.entries()).map(([key, paramValue]) => ({
    key,
    value: paramValue,
  }))
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    bytes: new Blob([value]).size,
  }
}
