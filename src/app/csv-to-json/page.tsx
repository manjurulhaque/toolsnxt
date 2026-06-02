"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type OutputMode = "array" | "objects" | "min"

const sampleCsv = `name,role,active,score
Ada Lovelace,Mathematician,true,98
Grace Hopper,Computer scientist,true,95
"Katherine Johnson","NASA mathematician",true,100
"Alan Turing","Computer scientist",false,99`

const outputModes: Array<{ key: OutputMode; label: string }> = [
  { key: "objects", label: "Objects" },
  { key: "array", label: "Rows" },
  { key: "min", label: "Minify" },
]

export default function CsvToJsonPage() {
  const [csvText, setCsvText] = useState(sampleCsv)
  const [outputMode, setOutputMode] = useState<OutputMode>("objects")
  const [hasHeaders, setHasHeaders] = useState(true)
  const [trimValues, setTrimValues] = useState(true)
  const [message, setMessage] = useState("Paste CSV to convert it into JSON locally.")

  const result = useMemo(
    () => convertCsvToJson(csvText, { hasHeaders, outputMode, trimValues }),
    [csvText, hasHeaders, outputMode, trimValues],
  )

  async function copyJson() {
    if (!result.output.trim()) {
      setMessage("Add CSV before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("JSON copied.")
    } catch {
      setMessage("Copy failed. Select the JSON and copy it manually.")
    }
  }

  function downloadJson() {
    if (!result.output.trim()) {
      setMessage("Add CSV before downloading.")
      return
    }

    const blob = new Blob([result.output], { type: "application/json;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "data.json"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("data.json downloaded.")
  }

  function clearAll() {
    setCsvText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setCsvText(sampleCsv)
    setHasHeaders(true)
    setTrimValues(true)
    setOutputMode("objects")
    setMessage("Sample CSV loaded.")
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
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">CSV to JSON</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert pasted CSV into clean JSON objects or row arrays, with quoted fields and escaped
            quotes handled in the browser.
          </p>

          <label htmlFor="csv-input" className="mt-6 block text-sm font-medium">
            CSV input
          </label>
          <textarea
            id="csv-input"
            value={csvText}
            onChange={(event) => {
              setCsvText(event.target.value)
              setMessage("CSV updated.")
            }}
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="name,email&#10;Ada,ada@example.com"
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Rows" value={result.stats.rows} />
            <Stat label="Columns" value={result.stats.columns} />
            <Stat label="Cells" value={result.stats.cells} />
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
              <h2 className="mt-2 text-2xl font-semibold">JSON Output</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.error ? "bg-red-50 text-red-700" : "bg-[var(--page-cream)] text-[var(--ink-700)]"
              }`}
            >
              {result.error ? "Check CSV" : `${result.stats.records} records`}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {outputModes.map((mode) => (
              <button
                key={mode.key}
                type="button"
                onClick={() => setOutputMode(mode.key)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  outputMode === mode.key
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
              <input
                type="checkbox"
                checked={hasHeaders}
                onChange={(event) => setHasHeaders(event.target.checked)}
                className="h-4 w-4 accent-[var(--ink-900)]"
              />
              First row is header
            </label>
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
              <input
                type="checkbox"
                checked={trimValues}
                onChange={(event) => setTrimValues(event.target.checked)}
                className="h-4 w-4 accent-[var(--ink-900)]"
              />
              Trim values
            </label>
          </div>

          <label htmlFor="json-output" className="mt-6 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="json-output"
            value={result.output}
            readOnly
            rows={14}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Converted JSON will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {result.error ?? message}
            </div>
            <button
              type="button"
              onClick={copyJson}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Copy JSON
            </button>
            <button
              type="button"
              onClick={downloadJson}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Download
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

function convertCsvToJson(
  value: string,
  options: { hasHeaders: boolean; outputMode: OutputMode; trimValues: boolean },
) {
  const rows = parseCsv(value, options.trimValues).filter((row) => row.some((cell) => cell !== ""))
  const columnCount = rows.reduce((count, row) => Math.max(count, row.length), 0)
  const stats = {
    rows: rows.length,
    columns: columnCount,
    cells: rows.reduce((count, row) => count + row.length, 0),
    records: options.hasHeaders ? Math.max(rows.length - 1, 0) : rows.length,
  }

  if (!value.trim()) {
    return { output: "", error: null, stats }
  }

  if (rows.length === 0) {
    return { output: "", error: "No CSV rows found.", stats }
  }

  const data = options.hasHeaders ? rowsToObjects(rows) : rows
  const indentation = options.outputMode === "min" ? 0 : 2

  return {
    output: JSON.stringify(data, null, indentation),
    error: null,
    stats,
  }
}

function rowsToObjects(rows: string[][]) {
  const [headerRow = [], ...bodyRows] = rows
  const headers = headerRow.map((header, index) => header || `column_${index + 1}`)

  return bodyRows.map((row) =>
    headers.reduce<Record<string, string>>((record, header, index) => {
      record[header] = row[index] ?? ""
      return record
    }, {}),
  )
}

function parseCsv(value: string, trimValues: boolean) {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let isQuoted = false

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index]
    const nextCharacter = value[index + 1]

    if (character === '"') {
      if (isQuoted && nextCharacter === '"') {
        field += '"'
        index += 1
      } else {
        isQuoted = !isQuoted
      }
      continue
    }

    if (character === "," && !isQuoted) {
      row.push(normalizeField(field, trimValues))
      field = ""
      continue
    }

    if ((character === "\n" || character === "\r") && !isQuoted) {
      row.push(normalizeField(field, trimValues))
      rows.push(row)
      row = []
      field = ""

      if (character === "\r" && nextCharacter === "\n") {
        index += 1
      }
      continue
    }

    field += character
  }

  row.push(normalizeField(field, trimValues))
  rows.push(row)

  return rows
}

function normalizeField(value: string, trimValues: boolean) {
  return trimValues ? value.trim() : value
}
