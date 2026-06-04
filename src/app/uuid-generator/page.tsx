"use client"

import { useMemo, useState } from "react"
import {
  ActionButton,
  CheckboxOption,
  InfoBox,
  PanelHeader,
  SummaryTile,
  ToolIntro,
  ToolPage,
  ToolPanel,
} from "@/components/tool-page"

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
    <ToolPage columns="wide-output">
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="UUID Generator">
            Generate UUID v4 identifiers for fixtures, database rows, request IDs, and test data
            without leaving your browser.
        </ToolIntro>

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
            <CheckboxOption label="Uppercase letters" checked={uppercase} onChange={updateUppercase} />
            <CheckboxOption label="Remove hyphens" checked={withoutHyphens} onChange={updateHyphens} />
          </div>

          <ActionButton onClick={generate} className="mt-6 w-full">
            Generate UUIDs
          </ActionButton>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Count" value={stats.count} />
            <SummaryTile label="Length" value={stats.length} />
            <SummaryTile label="Chars" value={stats.characters} />
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Output" title="Generated IDs" badge="UUID v4" />

          <textarea
            value={uuids.join("\n")}
            readOnly
            rows={20}
            spellCheck={false}
            className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Generated UUIDs will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <InfoBox className="leading-normal">
              {message}
            </InfoBox>
            <ActionButton onClick={copyUuids} variant="secondary">
              Copy
            </ActionButton>
            <ActionButton onClick={downloadUuids}>
              Download
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
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
