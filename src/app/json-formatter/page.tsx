"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type IndentMode = "2" | "4" | "tab" | "min"

const sampleJson = `{
  "project": "Web Tools",
  "local": true,
  "tools": [
    {
      "name": "JSON Formatter",
      "category": "Developer"
    },
    {
      "name": "Case Converter",
      "category": "Text"
    }
  ],
  "stats": {
    "fast": true,
    "filesUploaded": 0
  }
}`

const indentModes: Array<{ key: IndentMode; label: string }> = [
  { key: "2", label: "2 spaces" },
  { key: "4", label: "4 spaces" },
  { key: "tab", label: "Tabs" },
  { key: "min", label: "Minify" },
]

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(sampleJson)
  const [indentMode, setIndentMode] = useState<IndentMode>("2")
  const [sortKeys, setSortKeys] = useState(false)
  const [message, setMessage] = useState("Paste JSON to validate and format it locally.")

  const result = useMemo(
    () => formatJson(inputJson, indentMode, sortKeys),
    [inputJson, indentMode, sortKeys],
  )
  const inputStats = useMemo(() => getJsonTextStats(inputJson), [inputJson])
  const outputStats = useMemo(() => getJsonTextStats(result.output), [result.output])

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Add valid JSON before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("Formatted JSON copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function clearAll() {
    setInputJson("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setInputJson(sampleJson)
    setMessage("Sample JSON loaded.")
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">JSON Formatter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Validate, pretty-print, minify, and sort JSON in your browser before pasting it into
            code, docs, APIs, or configuration files.
          </p>

          <label htmlFor="json-input" className="mt-6 block text-sm font-medium">
            JSON input
          </label>
          <textarea
            id="json-input"
            value={inputJson}
            onChange={(event) => {
              setInputJson(event.target.value)
              setMessage("JSON updated.")
            }}
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder='{ "hello": "world" }'
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
                Validation
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Formatted Output</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.isValid
                  ? "bg-[var(--page-cream)] text-[var(--ink-700)]"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {result.isValid ? "Valid JSON" : "Invalid JSON"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {indentModes.map((mode) => (
              <button
                key={mode.key}
                type="button"
                onClick={() => setIndentMode(mode.key)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  indentMode === mode.key
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <label className="mt-4 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(event) => setSortKeys(event.target.checked)}
              className="h-4 w-4 accent-[var(--ink-900)]"
            />
            Sort object keys
          </label>

          <label htmlFor="json-output" className="mt-6 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="json-output"
            value={result.output}
            readOnly
            rows={13}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Formatted JSON will appear here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Objects" value={result.stats.objects} />
            <Stat label="Arrays" value={result.stats.arrays} />
            <Stat label="Keys" value={result.stats.keys} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {result.error ?? `${message} Output is ${outputStats.characters} characters.`}
            </div>
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy JSON
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

function formatJson(value: string, indentMode: IndentMode, sortKeys: boolean) {
  if (!value.trim()) {
    return {
      isValid: false,
      output: "",
      error: "Paste JSON to begin.",
      stats: { objects: 0, arrays: 0, keys: 0 },
    }
  }

  try {
    const parsedJson: unknown = JSON.parse(value)
    const normalizedJson = sortKeys ? sortJsonKeys(parsedJson) : parsedJson
    const indentation = indentMode === "min" ? 0 : indentMode === "tab" ? "\t" : Number(indentMode)

    return {
      isValid: true,
      output: JSON.stringify(normalizedJson, null, indentation),
      error: null,
      stats: getJsonValueStats(normalizedJson),
    }
  } catch (error) {
    return {
      isValid: false,
      output: "",
      error: error instanceof Error ? error.message : "Invalid JSON.",
      stats: { objects: 0, arrays: 0, keys: 0 },
    }
  }
}

function sortJsonKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys)
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((leftKey, rightKey) => leftKey.localeCompare(rightKey))
      .reduce<Record<string, unknown>>((sortedObject, key) => {
        sortedObject[key] = sortJsonKeys((value as Record<string, unknown>)[key])
        return sortedObject
      }, {})
  }

  return value
}

function getJsonValueStats(value: unknown) {
  if (Array.isArray(value)) {
    return value.reduce(
      (stats, item) => {
        const itemStats = getJsonValueStats(item)
        return {
          objects: stats.objects + itemStats.objects,
          arrays: stats.arrays + itemStats.arrays,
          keys: stats.keys + itemStats.keys,
        }
      },
      { objects: 0, arrays: 1, keys: 0 },
    )
  }

  if (value && typeof value === "object") {
    return Object.values(value).reduce(
      (stats, item) => {
        const itemStats = getJsonValueStats(item)
        return {
          objects: stats.objects + itemStats.objects,
          arrays: stats.arrays + itemStats.arrays,
          keys: stats.keys + itemStats.keys,
        }
      },
      { objects: 1, arrays: 0, keys: Object.keys(value).length },
    )
  }

  return { objects: 0, arrays: 0, keys: 0 }
}

function getJsonTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    bytes: new Blob([value]).size,
  }
}
