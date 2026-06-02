"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const defaultCount = "10"

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(defaultCount)
  const [uppercase, setUppercase] = useState(false)
  const [withoutHyphens, setWithoutHyphens] = useState(false)
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(Number(defaultCount), false, false))
  const [message, setMessage] = useState("Generate UUID v4 values locally in your browser.")

  const stats = useMemo(
    () => ({
      count: uuids.length,
      characters: uuids.join("\n").length,
      length: uuids[0]?.length ?? 0,
    }),
    [uuids],
  )

  function generate() {
    const safeCount = clampCount(count)
    setCount(String(safeCount))
    setUuids(generateUuids(safeCount, uppercase, withoutHyphens))
    setMessage(`${safeCount} UUID${safeCount === 1 ? "" : "s"} generated.`)
  }

  function updateUppercase(value: boolean) {
    setUppercase(value)
    setUuids((currentUuids) => formatUuids(currentUuids, value, withoutHyphens))
    setMessage("Letter case updated.")
  }

  function updateHyphens(value: boolean) {
    setWithoutHyphens(value)
    setUuids((currentUuids) => formatUuids(currentUuids, uppercase, value))
    setMessage("Hyphen format updated.")
  }

  async function copyUuids() {
    if (uuids.length === 0) {
      setMessage("Generate UUIDs before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(uuids.join("\n"))
      setMessage("UUIDs copied.")
    } catch {
      setMessage("Copy failed. Select the UUIDs and copy them manually.")
    }
  }

  function downloadUuids() {
    if (uuids.length === 0) {
      setMessage("Generate UUIDs before downloading.")
      return
    }

    const blob = new Blob([uuids.join("\n")], { type: "text/plain;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "uuids.txt"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("uuids.txt downloaded.")
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
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">UUID Generator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Generate UUID v4 identifiers for fixtures, database rows, request IDs, and test data
            without leaving your browser.
          </p>

          <label htmlFor="uuid-count" className="mt-6 block text-sm font-medium">
            Quantity
          </label>
          <input
            id="uuid-count"
            type="number"
            min="1"
            max="500"
            value={count}
            onChange={(event) => {
              setCount(event.target.value)
              setMessage("Quantity updated.")
            }}
            className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
          />

          <div className="mt-5 grid gap-3">
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(event) => updateUppercase(event.target.checked)}
                className="h-4 w-4 accent-[var(--ink-900)]"
              />
              Uppercase letters
            </label>
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
              <input
                type="checkbox"
                checked={withoutHyphens}
                onChange={(event) => updateHyphens(event.target.checked)}
                className="h-4 w-4 accent-[var(--ink-900)]"
              />
              Remove hyphens
            </label>
          </div>

          <button
            type="button"
            onClick={generate}
            className="mt-6 w-full rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
          >
            Generate UUIDs
          </button>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Count" value={stats.count} />
            <Stat label="Length" value={stats.length} />
            <Stat label="Chars" value={stats.characters} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Output
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Generated IDs</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              UUID v4
            </p>
          </div>

          <textarea
            value={uuids.join("\n")}
            readOnly
            rows={20}
            spellCheck={false}
            className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Generated UUIDs will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={copyUuids}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={downloadUuids}
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

function generateUuids(count: number, uppercase: boolean, withoutHyphens: boolean) {
  return Array.from({ length: clampCount(String(count)) }, () =>
    formatUuid(crypto.randomUUID(), uppercase, withoutHyphens),
  )
}

function formatUuids(values: string[], uppercase: boolean, withoutHyphens: boolean) {
  return values.map((value) => formatUuid(value, uppercase, withoutHyphens))
}

function formatUuid(value: string, uppercase: boolean, withoutHyphens: boolean) {
  const normalizedValue = value.toLowerCase().replace(/-/g, "")
  const withHyphens = [
    normalizedValue.slice(0, 8),
    normalizedValue.slice(8, 12),
    normalizedValue.slice(12, 16),
    normalizedValue.slice(16, 20),
    normalizedValue.slice(20),
  ].join("-")
  const formattedValue = withoutHyphens ? normalizedValue : withHyphens

  return uppercase ? formattedValue.toUpperCase() : formattedValue
}

function clampCount(value: string) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return 1
  }

  return Math.min(Math.max(Math.floor(numberValue), 1), 500)
}
