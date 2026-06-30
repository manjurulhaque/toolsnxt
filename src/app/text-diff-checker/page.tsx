"use client"

import { useMemo, useState } from "react"
import { TextAreaField } from "@/components/form-controls"
import {
  ActionButton,
  CheckboxOption,
  InfoBox,
  PanelHeader,
  SummaryTile,
  ToolIntro,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

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
      await copyToClipboard(patchText)
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
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
        <ToolPanel>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <ToolIntro eyebrow="Text tool" title="Text Diff Checker">
                Compare two text blocks locally, inspect added, removed, and changed lines, then
                copy a compact plain-text diff.
              </ToolIntro>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:min-w-96">
              <SummaryTile label="Added" value={summary.added} />
              <SummaryTile label="Removed" value={summary.removed} />
              <SummaryTile label="Changed" value={summary.changed} />
            </div>
          </div>
        </ToolPanel>

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

        <ToolPanel className="mt-6">
          <PanelHeader eyebrow="Comparison" title="Diff Output" badge={`${summary.same} unchanged`} />

          <div className="mt-5 grid gap-3 sm:grid-cols-[auto_auto_1fr_auto_auto_auto] sm:items-center">
            <CheckboxOption
              label="Ignore whitespace"
              checked={ignoreWhitespace}
              onChange={(checked) => {
                setIgnoreWhitespace(checked)
                  setMessage("Whitespace setting updated.")
              }}
            />
            <CheckboxOption
              label="Ignore case"
              checked={ignoreCase}
              onChange={(checked) => {
                setIgnoreCase(checked)
                  setMessage("Case setting updated.")
              }}
            />
            <div className="hidden sm:block" />
            <ActionButton onClick={clearAll} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
            <ActionButton onClick={copyDiff}>
              Copy Diff
            </ActionButton>
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

          <InfoBox className="mt-5 leading-normal">
            {message}
          </InfoBox>
        </ToolPanel>
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
    <ToolPanel>
      <TextAreaField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        rows={15}
        placeholder="Paste text here..."
      />
    </ToolPanel>
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
