"use client"

import yaml from "js-yaml"
import { useMemo, useState } from "react"
import { SegmentedControl, TextAreaField } from "@/components/form-controls"
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
import { copyToClipboard, downloadTextFile, getTextStats } from "@/lib/browser-actions"
import { SITE_NAME } from "@/lib/site"

type Mode = "yaml-to-json" | "json-to-yaml"
type JsonIndent = "2" | "4" | "tab" | "min"

const modeOptions: Array<{ key: Mode; label: string }> = [
  { key: "yaml-to-json", label: "YAML to JSON" },
  { key: "json-to-yaml", label: "JSON to YAML" },
]

const jsonIndentOptions: Array<{ key: JsonIndent; label: string }> = [
  { key: "2", label: "2 spaces" },
  { key: "4", label: "4 spaces" },
  { key: "tab", label: "Tabs" },
  { key: "min", label: "Minify" },
]

const sampleYaml = `project: ${SITE_NAME}
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
      await copyToClipboard(result.output)
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
    downloadTextFile(result.output, `converted.${extension}`, `${mimeType};charset=utf-8`)
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
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="YAML JSON Converter">
            Convert YAML to JSON or JSON to YAML in your browser for configs, API samples, and docs.
        </ToolIntro>

          <div className="mt-6">
            <SegmentedControl value={mode} options={modeOptions} onChange={switchMode} />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="yaml-json-input"
              label={mode === "yaml-to-json" ? "YAML input" : "JSON input"}
              value={inputText}
              onChange={(value) => {
                setInputText(value)
                setMessage("Input updated.")
              }}
              rows={16}
              placeholder={mode === "yaml-to-json" ? `name: ${SITE_NAME}` : `{ "name": "${SITE_NAME}" }`}
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
            eyebrow="Conversion"
            title={mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
            badge={result.isValid ? "Valid input" : "Check input"}
          />

          {mode === "yaml-to-json" ? (
            <div className="mt-6">
              <SegmentedControl
                value={jsonIndent}
                options={jsonIndentOptions}
                onChange={setJsonIndent}
                columns="grid-cols-2 sm:grid-cols-4"
              />
            </div>
          ) : null}

          <div className="mt-4">
            <CheckboxOption label="Sort object keys" checked={sortKeys} onChange={setSortKeys} />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="yaml-json-output"
              label="Result"
              value={result.output}
              readOnly
              rows={13}
              placeholder="Converted output will appear here..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Objects" value={result.stats.objects} />
            <SummaryTile label="Arrays" value={result.stats.arrays} />
            <SummaryTile label="Keys" value={result.stats.keys} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={copyOutput}>
              Copy Output
            </ActionButton>
            <ActionButton onClick={downloadOutput} variant="secondary">
              Download
            </ActionButton>
          </div>

          <InfoBox className={result.error ? "mt-5 border-red-100 bg-red-50 text-red-700" : "mt-5 leading-normal"}>
            {result.error ?? `${message} Output is ${outputStats.characters} characters.`}
          </InfoBox>
      </ToolPanel>
    </ToolPage>
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
