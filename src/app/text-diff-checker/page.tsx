"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type DiffRow = {
  type: "same" | "added" | "removed" | "changed"
  left: string
  right: string
  index: number
}

const sampleLeft = `Web Tools

Fast browser utilities for everyday work.
- JSON Formatter
- CSV to JSON
- Regex Tester`

const sampleRight = `Web Tools

Fast local browser utilities for everyday work.
- JSON Formatter
- CSV to JSON Converter
- Regex Tester
- Text Diff Checker`

export default function TextDiffCheckerPage() {
  const [leftText, setLeftText] = useState(sampleLeft)
  const [rightText, setRightText] = useState(sampleRight)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [message, setMessage] = useState("Paste two text blocks to compare them line by line.")

  const diff = useMemo(
    () => buildLineDiff(leftText, rightText, { ignoreWhitespace, ignoreCase }),
    [ignoreCase, ignoreWhitespace, leftText, rightText],
  )
  const summary = useMemo(() => getDiffSummary(diff), [diff])
  const patchText = useMemo(() => createPatchText(diff), [diff])

  async function copyDiff() {
    if (!patchText.trim()) {
      setMessage("Add text before copying a diff.")
      return
    }

    try {
      await navigator.clipboard.writeText(patchText)
      setMessage("Diff copied.")
    } catch {
      setMessage("Copy failed. Select the diff and copy it manually.")
    }
  }

  function clearAll() {
    setLeftText("")
    setRightText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setLeftText(sampleLeft)
    setRightText(sampleRight)
    setIgnoreWhitespace(false)
    setIgnoreCase(false)
    setMessage("Sample diff loaded.")
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

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Text tool
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Text Diff Checker</h1>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
                Compare two text blocks locally, inspect added, removed, and changed lines, then
                copy a compact plain-text diff.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:min-w-96">
              <Stat label="Added" value={summary.added} />
              <Stat label="Removed" value={summary.removed} />
              <Stat label="Changed" value={summary.changed} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <EditorPanel
            id="left-text"
            label="Original text"
            value={leftText}
            onChange={(value) => {
              setLeftText(value)
              setMessage("Original text updated.")
            }}
          />
          <EditorPanel
            id="right-text"
            label="Changed text"
            value={rightText}
            onChange={(value) => {
              setRightText(value)
              setMessage("Changed text updated.")
            }}
          />
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Comparison
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Diff Output</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {summary.same} unchanged
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[auto_auto_1fr_auto_auto_auto] sm:items-center">
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
              <input
                type="checkbox"
                checked={ignoreWhitespace}
                onChange={(event) => {
                  setIgnoreWhitespace(event.target.checked)
                  setMessage("Whitespace setting updated.")
                }}
                className="h-4 w-4 accent-[var(--ink-900)]"
              />
              Ignore whitespace
            </label>
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
              <input
                type="checkbox"
                checked={ignoreCase}
                onChange={(event) => {
                  setIgnoreCase(event.target.checked)
                  setMessage("Case setting updated.")
                }}
                className="h-4 w-4 accent-[var(--ink-900)]"
              />
              Ignore case
            </label>
            <div className="hidden sm:block" />
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
            <button
              type="button"
              onClick={copyDiff}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Diff
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/10">
            <div className="grid grid-cols-[4rem_1fr_1fr] border-b border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              <div className="px-3 py-3">Line</div>
              <div className="border-l border-[var(--ink-900)]/10 px-3 py-3">Original</div>
              <div className="border-l border-[var(--ink-900)]/10 px-3 py-3">Changed</div>
            </div>
            <div className="max-h-[34rem] overflow-auto bg-white">
              {diff.map((row) => (
                <DiffLine key={`${row.index}-${row.type}-${row.left}-${row.right}`} row={row} />
              ))}
              {diff.length === 0 ? (
                <div className="p-5 text-sm text-[var(--ink-700)]">Diff output will appear here.</div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {message}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorPanel({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={15}
        spellCheck={false}
        className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
        placeholder="Paste text here..."
      />
    </section>
  )
}

function DiffLine({ row }: { row: DiffRow }) {
  const style =
    row.type === "added"
      ? "bg-emerald-50"
      : row.type === "removed"
        ? "bg-red-50"
        : row.type === "changed"
          ? "bg-amber-50"
          : "bg-white"

  return (
    <div className={`grid grid-cols-[4rem_1fr_1fr] border-b border-[var(--ink-900)]/6 text-sm ${style}`}>
      <div className="px-3 py-3 font-mono text-xs text-[var(--ink-700)]">{row.index + 1}</div>
      <pre className="min-w-0 whitespace-pre-wrap break-words border-l border-[var(--ink-900)]/8 px-3 py-3 font-mono text-sm">
        {row.left || " "}
      </pre>
      <pre className="min-w-0 whitespace-pre-wrap break-words border-l border-[var(--ink-900)]/8 px-3 py-3 font-mono text-sm">
        {row.right || " "}
      </pre>
    </div>
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

function buildLineDiff(
  leftText: string,
  rightText: string,
  options: { ignoreWhitespace: boolean; ignoreCase: boolean },
): DiffRow[] {
  const leftLines = leftText ? leftText.split(/\r\n|\r|\n/) : []
  const rightLines = rightText ? rightText.split(/\r\n|\r|\n/) : []
  const maxLength = Math.max(leftLines.length, rightLines.length)

  return Array.from({ length: maxLength }, (_, index) => {
    const left = leftLines[index] ?? ""
    const right = rightLines[index] ?? ""
    const hasLeft = index < leftLines.length
    const hasRight = index < rightLines.length

    if (!hasLeft && hasRight) {
      return { type: "added", left, right, index }
    }

    if (hasLeft && !hasRight) {
      return { type: "removed", left, right, index }
    }

    if (normalizeLine(left, options) === normalizeLine(right, options)) {
      return { type: "same", left, right, index }
    }

    return { type: "changed", left, right, index }
  })
}

function normalizeLine(value: string, options: { ignoreWhitespace: boolean; ignoreCase: boolean }) {
  let normalizedValue = value

  if (options.ignoreWhitespace) {
    normalizedValue = normalizedValue.replace(/\s+/g, " ").trim()
  }

  if (options.ignoreCase) {
    normalizedValue = normalizedValue.toLowerCase()
  }

  return normalizedValue
}

function getDiffSummary(diff: DiffRow[]) {
  return diff.reduce(
    (summary, row) => ({
      ...summary,
      [row.type]: summary[row.type] + 1,
    }),
    { same: 0, added: 0, removed: 0, changed: 0 },
  )
}

function createPatchText(diff: DiffRow[]) {
  return diff
    .filter((row) => row.type !== "same")
    .map((row) => {
      if (row.type === "added") {
        return `+ ${row.right}`
      }

      if (row.type === "removed") {
        return `- ${row.left}`
      }

      return [`- ${row.left}`, `+ ${row.right}`].join("\n")
    })
    .join("\n")
}
