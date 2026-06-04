"use client"

import { useMemo, useState } from "react"
import { SegmentedControl, TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, getTextStats } from "@/lib/browser-actions"

type CaseMode =
  | "sentence"
  | "lower"
  | "upper"
  | "title"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"

const caseModes: Array<{ key: CaseMode; label: string }> = [
  { key: "sentence", label: "Sentence" },
  { key: "lower", label: "lowercase" },
  { key: "upper", label: "UPPERCASE" },
  { key: "title", label: "Title Case" },
  { key: "camel", label: "camelCase" },
  { key: "pascal", label: "PascalCase" },
  { key: "snake", label: "snake_case" },
  { key: "kebab", label: "kebab-case" },
  { key: "constant", label: "CONSTANT_CASE" },
]

const sampleText = "Make every word land in the right shape."

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState(sampleText)
  const [mode, setMode] = useState<CaseMode>("title")
  const [message, setMessage] = useState("Choose a case style to transform your text.")

  const outputText = useMemo(() => convertCase(inputText, mode), [inputText, mode])
  const wordCount = useMemo(() => getWords(inputText).length, [inputText])
  const inputStats = useMemo(() => getTextStats(inputText), [inputText])

  async function copyOutput() {
    if (!outputText) {
      setMessage("Add text before copying.")
      return
    }

    try {
      await copyToClipboard(outputText)
      setMessage("Converted text copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function clearText() {
    setInputText("")
    setMessage("Text cleared.")
  }

  function loadSample() {
    setInputText(sampleText)
    setMessage("Sample text loaded.")
  }

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Text tool" title="Case Converter">
            Paste text once, then reshape it for headings, code identifiers, filenames, constants,
            and quick formatting cleanup.
        </ToolIntro>

        <div className="mt-6">
          <TextAreaField
            id="case-input"
            label="Input text"
            value={inputText}
            onChange={(value) => {
              setInputText(value)
              setMessage("Text updated.")
            }}
            rows={9}
            mono={false}
            placeholder="Type or paste text here..."
          />
        </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={inputStats.characters} />
            <SummaryTile label="Words" value={wordCount} />
            <SummaryTile label="Lines" value={inputStats.lines} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={clearText} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Conversion" title="Output" badge={caseModes.find((caseMode) => caseMode.key === mode)?.label} />

          <div className="mt-6">
            <SegmentedControl value={mode} options={caseModes} onChange={setMode} columns="grid-cols-2 sm:grid-cols-3" />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="case-output"
              label="Converted text"
              value={outputText}
              readOnly
              rows={9}
              mono={false}
              placeholder="Converted text will appear here..."
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InfoBox className="leading-normal">
              {message}
            </InfoBox>
            <ActionButton onClick={copyOutput}>
              Copy Result
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
  )
}

function convertCase(value: string, mode: CaseMode) {
  switch (mode) {
    case "sentence":
      return toSentenceCase(value)
    case "lower":
      return value.toLowerCase()
    case "upper":
      return value.toUpperCase()
    case "title":
      return getWords(value)
        .map(capitalize)
        .join(" ")
    case "camel":
      return getWords(value)
        .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
        .join("")
    case "pascal":
      return getWords(value).map(capitalize).join("")
    case "snake":
      return getWords(value).join("_").toLowerCase()
    case "kebab":
      return getWords(value).join("-").toLowerCase()
    case "constant":
      return getWords(value).join("_").toUpperCase()
  }
}

function toSentenceCase(value: string) {
  const lowerText = value.toLowerCase()

  return lowerText.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (match) => match.toUpperCase())
}

function getWords(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .match(/[A-Za-z0-9]+/g) ?? []
}

function capitalize(value: string) {
  const lowerValue = value.toLowerCase()
  return `${lowerValue.charAt(0).toUpperCase()}${lowerValue.slice(1)}`
}
