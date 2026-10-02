"use client"

import { useMemo, useState } from "react"
import { SegmentedControl, TextAreaField } from "@/components/form-controls"
import {
  ActionButton,
  CheckboxOption,
  InfoBox,
  PanelHeader,
  SummaryTile,
  ToolIntro,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard, getTextStats } from "@/lib/browser-actions"
import { SITE_NAME } from "@/lib/site"

type IndentMode = "2" | "4" | "tab" | "min"

const sampleJson = `{
  "project": "${SITE_NAME}",
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

export function JsonFormatterTool() {
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
      await copyToClipboard(result.output)
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
    <>
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="JSON Formatter">
          Validate, pretty-print, minify, and optionally sort pasted JSON in your browser before
          using it in code, documentation, API debugging, tests, or configuration files. Formatting
          changes whitespace and layout, while valid JSON values remain represented by the same data.
        </ToolIntro>

        <div className="mt-6">
          <TextAreaField
            id="json-input"
            label="JSON input"
            value={inputJson}
            onChange={(value) => {
              setInputJson(value)
              setMessage("JSON updated.")
            }}
            rows={16}
            placeholder='{ "hello": "world" }'
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryTile label="Characters" value={inputStats.characters} />
          <SummaryTile label="Lines" value={inputStats.lines} />
          <SummaryTile label="Bytes" value={inputStats.bytes} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ActionButton onClick={clearAll} variant="secondary">
            Clear
          </ActionButton>
          <ActionButton onClick={loadSample} variant="secondary">
            Load Sample
          </ActionButton>
        </div>
      </ToolPanel>

      <ToolPanel>
        <PanelHeader
          eyebrow="Validation"
          title="Formatted Output"
          badge={result.isValid ? "Valid JSON" : "Invalid JSON"}
        />

        <div className="mt-6">
          <SegmentedControl
            value={indentMode}
            options={indentModes}
            onChange={setIndentMode}
            columns="grid-cols-2 sm:grid-cols-4"
          />
        </div>

        <div className="mt-4">
          <CheckboxOption label="Sort object keys" checked={sortKeys} onChange={setSortKeys} />
        </div>

        <div className="mt-6">
          <TextAreaField
            id="json-output"
            label="Result"
            value={result.output}
            readOnly
            rows={13}
            placeholder="Formatted JSON will appear here..."
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryTile label="Objects" value={result.stats.objects} />
          <SummaryTile label="Arrays" value={result.stats.arrays} />
          <SummaryTile label="Keys" value={result.stats.keys} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div role="status" aria-live="polite">
            <InfoBox className="leading-normal">
              {result.error ?? `${message} Output is ${outputStats.characters} characters.`}
            </InfoBox>
          </div>
          <ActionButton onClick={copyOutput}>Copy JSON</ActionButton>
        </div>
      </ToolPanel>
    </>
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

const getJsonTextStats = getTextStats
