"use client"

import yaml from "js-yaml"
import Link from "next/link"
import { useMemo, useState } from "react"

type Mode = "yaml-to-json" | "json-to-yaml"
type JsonIndent = "2" | "4" | "tab" | "min"

const sampleYaml = `project: Web Tools
local: true
tools:
  - name: YAML JSON Converter
    category: Developer
  - name: JSON Formatter
    category: Developer
stats:
  fast: true
  filesUploaded: 0
`

export default function YamlJsonConverterPage() {
  const [mode, setMode] = useState<Mode>("yaml-to-json")
  const [inputText, setInputText] = useState(sampleYaml)
  const [jsonIndent, setJsonIndent] = useState<JsonIndent>("2")
  const [sortKeys, setSortKeys] = useState(false)
  const [message, setMessage] = useState("Paste YAML or JSON to convert it locally.")

  const result = useMemo(
    () => convertData(inputText, mode, jsonIndent, sortKeys),
    [inputText, jsonIndent, mode, sortKeys],
  )
  const inputStats = useMemo(() => getTextStats(inputText), [inputText])
  const outputStats = useMemo(() => getTextStats(result.output), [result.output])

  function switchMode(nextMode: Mode) {
    if (nextMode === mode) {
      return
    }

    setMode(nextMode)
    setInputText(result.output || "")
    setMessage(`${nextMode === "yaml-to-json" ? "YAML to JSON" : "JSON to YAML"} selected.`)
  }

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Create valid output before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("Converted output copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function downloadOutput() {
    if (!result.output.trim()) {
      setMessage("Create valid output before downloading.")
      return
    }

    const extension = mode === "yaml-to-json" ? "json" : "yaml"
    const mimeType = mode === "yaml-to-json" ? "application/json" : "application/yaml"
    const blob = new Blob([result.output], { type: `${mimeType};charset=utf-8` })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `converted.${extension}`
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage(`Downloaded converted.${extension}.`)
  }

  function clearAll() {
    setInputText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setMode("yaml-to-json")
    setInputText(sampleYaml)
    setMessage("Sample YAML loaded.")
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
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">YAML JSON Converter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert YAML to JSON or JSON to YAML in your browser for configs, API samples, and docs.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
            {([
              ["yaml-to-json", "YAML to JSON"],
              ["json-to-yaml", "JSON to YAML"],
            ] as Array<[Mode, string]>).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === key
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label htmlFor="yaml-json-input" className="mt-6 block text-sm font-medium">
            {mode === "yaml-to-json" ? "YAML input" : "JSON input"}
          </label>
          <textarea
            id="yaml-json-input"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value)
              setMessage("Input updated.")
            }}
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder={mode === "yaml-to-json" ? "name: Web Tools" : '{ "name": "Web Tools" }'}
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
                Conversion
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
              </h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.isValid
                  ? "bg-[var(--page-cream)] text-[var(--ink-700)]"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {result.isValid ? "Valid input" : "Check input"}
            </p>
          </div>

          {mode === "yaml-to-json" ? (
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                ["2", "2 spaces"],
                ["4", "4 spaces"],
                ["tab", "Tabs"],
                ["min", "Minify"],
              ] as Array<[JsonIndent, string]>).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setJsonIndent(key)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    jsonIndent === key
                      ? "bg-[var(--ink-900)] text-white"
                      : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

          <label className="mt-4 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(event) => setSortKeys(event.target.checked)}
              className="h-4 w-4 accent-[var(--ink-900)]"
            />
            Sort object keys
          </label>

          <label htmlFor="yaml-json-output" className="mt-6 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="yaml-json-output"
            value={result.output}
            readOnly
            rows={13}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Converted output will appear here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Objects" value={result.stats.objects} />
            <Stat label="Arrays" value={result.stats.arrays} />
            <Stat label="Keys" value={result.stats.keys} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Output
            </button>
            <button
              type="button"
              onClick={downloadOutput}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Download
            </button>
          </div>

          <div
            className={`mt-5 rounded-[1.2rem] border px-4 py-3 text-sm ${
              result.error
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-[var(--ink-900)]/8 bg-[var(--page-cream)] text-[var(--ink-700)]"
            }`}
          >
            {result.error ?? `${message} Output is ${outputStats.characters} characters.`}
          </div>
        </div>
      </section>
    </main>
  )
}

function convertData(value: string, mode: Mode, jsonIndent: JsonIndent, sortKeys: boolean) {
  if (!value.trim()) {
    return {
      isValid: false,
      output: "",
      error: "Paste input to begin.",
      stats: { objects: 0, arrays: 0, keys: 0 },
    }
  }

  try {
    const parsedValue = mode === "yaml-to-json" ? yaml.load(value) : JSON.parse(value)
    const normalizedValue = sortKeys ? sortObjectKeys(parsedValue) : parsedValue
    const indentation = jsonIndent === "min" ? 0 : jsonIndent === "tab" ? "\t" : Number(jsonIndent)
    const output =
      mode === "yaml-to-json"
        ? JSON.stringify(normalizedValue, null, indentation)
        : yaml.dump(normalizedValue, {
            lineWidth: 100,
            noRefs: true,
            sortKeys,
          })

    return {
      isValid: true,
      output,
      error: null,
      stats: getValueStats(normalizedValue),
    }
  } catch (error) {
    return {
      isValid: false,
      output: "",
      error: error instanceof Error ? error.message : "Could not convert this input.",
      stats: { objects: 0, arrays: 0, keys: 0 },
    }
  }
}

function sortObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys)
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((leftKey, rightKey) => leftKey.localeCompare(rightKey))
      .reduce<Record<string, unknown>>((sortedObject, key) => {
        sortedObject[key] = sortObjectKeys((value as Record<string, unknown>)[key])
        return sortedObject
      }, {})
  }

  return value
}

function getValueStats(value: unknown) {
  if (Array.isArray(value)) {
    return value.reduce(
      (stats, item) => {
        const itemStats = getValueStats(item)
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
        const itemStats = getValueStats(item)
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

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    bytes: new Blob([value]).size,
  }
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
