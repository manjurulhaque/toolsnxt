"use client"

import { useMemo, useState } from "react"
import { SegmentedControl, TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, getTextStats } from "@/lib/browser-actions"

type TransformMode = "encode" | "decode" | "component" | "base64-encode" | "base64-decode"

const sampleText = "https://example.com/search?q=web tools&category=developer notes"
const transformModes: Array<{ key: TransformMode; label: string }> = [
  { key: "encode", label: "Encode URL" },
  { key: "decode", label: "Decode URL" },
  { key: "component", label: "Encode Component" },
  { key: "base64-encode", label: "Base64 Encode" },
  { key: "base64-decode", label: "Base64 Decode" },
]

export default function UrlEncoderDecoderPage() {
  const [inputText, setInputText] = useState(sampleText)
  const [mode, setMode] = useState<TransformMode>("encode")
  const [message, setMessage] = useState("Paste text or a URL to transform it locally.")

  const result = useMemo(() => transformText(inputText, mode), [inputText, mode])
  const queryParams = useMemo(() => getQueryParams(inputText), [inputText])
  const inputStats = useMemo(() => getTextStats(inputText), [inputText])
  const outputStats = useMemo(() => getTextStats(result.output), [result.output])

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Add input before copying.")
      return
    }

    try {
      await copyToClipboard(result.output)
      setMessage("Result copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function clearAll() {
    setInputText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setInputText(sampleText)
    setMode("encode")
    setMessage("Sample URL loaded.")
  }

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="URL Encoder / Decoder">
            Encode and decode URLs, query-safe components, and Base64 text in your browser, with a
            quick view of parsed query parameters.
        </ToolIntro>

        <div className="mt-6">
          <TextAreaField
            id="url-input"
            label="Input"
            value={inputText}
            onChange={(value) => {
              setInputText(value)
              setMessage("Input updated.")
            }}
            rows={12}
            placeholder="Paste a URL, text value, or Base64 string..."
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
            eyebrow="Transform"
            title="Output"
            badge={result.error ? "Check input" : `${outputStats.characters} chars`}
          />

          <div className="mt-6">
            <SegmentedControl
              value={mode}
              options={transformModes}
              onChange={(nextMode) => {
                setMode(nextMode)
                setMessage(`${transformModes.find((transformMode) => transformMode.key === nextMode)?.label} selected.`)
              }}
              columns="grid-cols-2 sm:grid-cols-3"
            />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="url-output"
              label="Result"
              value={result.output}
              readOnly
              rows={9}
              placeholder="Transformed text will appear here..."
            />
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Query Parameters
            </h3>
            <div className="mt-3 grid max-h-52 gap-2 overflow-auto pr-1">
              {queryParams.map((param) => (
                <div
                  key={`${param.key}-${param.value}`}
                  className="grid gap-2 rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm sm:grid-cols-[0.45fr_1fr]"
                >
                  <code className="break-all font-mono font-semibold">{param.key}</code>
                  <code className="break-all font-mono text-[var(--ink-700)]">{param.value}</code>
                </div>
              ))}
              {queryParams.length === 0 ? (
                <div className="rounded-[1.1rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  Query parameters will appear when the input contains a URL query string.
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InfoBox className="leading-normal">
              {result.error ?? message}
            </InfoBox>
            <ActionButton onClick={copyOutput}>
              Copy Result
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
  )
}

function transformText(value: string, mode: TransformMode) {
  if (!value.trim()) {
    return { output: "", error: null }
  }

  try {
    if (mode === "encode") {
      return { output: encodeURI(value), error: null }
    }

    if (mode === "decode") {
      return { output: decodeURI(value), error: null }
    }

    if (mode === "component") {
      return { output: encodeURIComponent(value), error: null }
    }

    if (mode === "base64-encode") {
      return { output: btoa(unescape(encodeURIComponent(value))), error: null }
    }

    return { output: decodeURIComponent(escape(atob(value.trim()))), error: null }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Could not transform this input.",
    }
  }
}

function getQueryParams(value: string) {
  const queryStart = value.indexOf("?")
  if (queryStart === -1) {
    return []
  }

  const queryString = value.slice(queryStart + 1).split("#")[0]
  const params = new URLSearchParams(queryString)

  return Array.from(params.entries()).map(([key, paramValue]) => ({
    key,
    value: paramValue,
  }))
}
