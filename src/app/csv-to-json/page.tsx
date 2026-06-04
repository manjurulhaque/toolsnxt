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
  ToolPage,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard, downloadTextFile } from "@/lib/browser-actions"

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
      await copyToClipboard(result.output)
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

    downloadTextFile(result.output, "data.json", "application/json;charset=utf-8")
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
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="CSV to JSON">
            Convert pasted CSV into clean JSON objects or row arrays, with quoted fields and escaped
            quotes handled in the browser.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
            id="csv-input"
            label="CSV input"
            value={csvText}
            onChange={(value) => {
              setCsvText(value)
              setMessage("CSV updated.")
            }}
            rows={16}
            placeholder="name,email&#10;Ada,ada@example.com"
          />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Rows" value={result.stats.rows} />
            <SummaryTile label="Columns" value={result.stats.columns} />
            <SummaryTile label="Cells" value={result.stats.cells} />
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
            title="JSON Output"
            badge={result.error ? "Check CSV" : `${result.stats.records} records`}
          />

          <div className="mt-6">
            <SegmentedControl
              value={outputMode}
              options={outputModes}
              onChange={setOutputMode}
              columns="grid-cols-3"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <CheckboxOption label="First row is header" checked={hasHeaders} onChange={setHasHeaders} />
            <CheckboxOption label="Trim values" checked={trimValues} onChange={setTrimValues} />
          </div>

          <div className="mt-6">
            <TextAreaField
            id="json-output"
            label="Result"
            value={result.output}
            readOnly
            rows={14}
            placeholder="Converted JSON will appear here..."
          />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <InfoBox className="leading-normal">
              {result.error ?? message}
            </InfoBox>
            <ActionButton onClick={copyJson} variant="secondary">
              Copy JSON
            </ActionButton>
            <ActionButton onClick={downloadJson}>
              Download
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
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
