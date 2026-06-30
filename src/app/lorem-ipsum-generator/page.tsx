"use client"

import { useMemo, useState } from "react"
import { NumberField, SegmentedControl, SelectField, TextAreaField } from "@/components/form-controls"
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
import { copyToClipboard, downloadTextFile, getTextStats as getBasicTextStats } from "@/lib/browser-actions"

type OutputMode = "paragraphs" | "sentences" | "words"
type WordSet = "classic" | "product" | "editorial"

const wordSets: Record<WordSet, string[]> = {
  classic: [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "labore",
    "dolore",
    "magna",
    "aliqua",
    "ut",
    "enim",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "commodo",
    "consequat",
  ],
  product: [
    "dashboard",
    "workflow",
    "insight",
    "metric",
    "customer",
    "pipeline",
    "report",
    "automation",
    "workspace",
    "integration",
    "launch",
    "conversion",
    "segment",
    "journey",
    "feature",
    "platform",
    "strategy",
    "growth",
    "signal",
    "profile",
    "campaign",
    "team",
    "review",
    "release",
  ],
  editorial: [
    "story",
    "archive",
    "culture",
    "essay",
    "chapter",
    "voice",
    "journal",
    "context",
    "dispatch",
    "reader",
    "column",
    "notebook",
    "portrait",
    "season",
    "memory",
    "scene",
    "detail",
    "letter",
    "record",
    "volume",
    "edition",
    "passage",
    "feature",
    "review",
  ],
}

const modeOptions: Array<{ key: OutputMode; label: string }> = [
  { key: "paragraphs", label: "Paragraphs" },
  { key: "sentences", label: "Sentences" },
  { key: "words", label: "Words" },
]

const wordSetOptions: Array<{ value: WordSet; label: string }> = [
  { value: "classic", label: "Classic lorem" },
  { value: "product", label: "Product UI" },
  { value: "editorial", label: "Editorial" },
]

export default function LoremIpsumGeneratorPage() {
  const [mode, setMode] = useState<OutputMode>("paragraphs")
  const [wordSet, setWordSet] = useState<WordSet>("classic")
  const [count, setCount] = useState("4")
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [message, setMessage] = useState("Generate placeholder copy for layouts and mockups.")

  const output = useMemo(
    () => generateLorem({ mode, wordSet, count: clampCount(count, mode), startWithLorem }),
    [count, mode, startWithLorem, wordSet],
  )
  const stats = useMemo(() => getTextStats(output), [output])

  async function copyOutput() {
    if (!output.trim()) {
      setMessage("Generate text before copying.")
      return
    }

    try {
      await copyToClipboard(output)
      setMessage("Placeholder text copied.")
    } catch {
      setMessage("Copy failed. Select the text and copy it manually.")
    }
  }

  function downloadOutput() {
    if (!output.trim()) {
      setMessage("Generate text before downloading.")
      return
    }

    downloadTextFile(output, "lorem-ipsum.txt")
    setMessage("lorem-ipsum.txt downloaded.")
  }

  return (
    <ToolPage columns="wide-output">
      <ToolPanel>
        <ToolIntro eyebrow="Text tool" title="Lorem Ipsum Generator">
            Create placeholder words, sentences, or paragraphs for UI mockups, content tests, and
            design reviews.
        </ToolIntro>

          <div className="mt-6">
            <SegmentedControl
              value={mode}
              options={modeOptions}
              onChange={(nextMode) => {
                setMode(nextMode)
                setMessage(`${capitalize(nextMode)} mode selected.`)
              }}
              columns="grid-cols-3"
            />
          </div>

          <div className="mt-6">
            <NumberField
              id="lorem-count"
              label="Quantity"
              min="1"
              max={mode === "words" ? "500" : "50"}
              value={count}
              onChange={(value) => {
                setCount(value)
                setMessage("Quantity updated.")
              }}
            />
          </div>

          <div className="mt-5">
            <SelectField
              id="word-set"
              label="Word set"
              value={wordSet}
              options={wordSetOptions}
              onChange={(value) => {
                setWordSet(value)
              setMessage("Word set updated.")
              }}
            />
          </div>

          <div className="mt-5">
            <CheckboxOption
              label="Start with lorem ipsum"
              checked={startWithLorem}
              onChange={(checked) => {
                setStartWithLorem(checked)
                setMessage("Opening phrase updated.")
              }}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={copyOutput} variant="secondary">
              Copy Text
            </ActionButton>
            <ActionButton onClick={downloadOutput}>
              Download
            </ActionButton>
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Output" title="Generated Text" badge={`${stats.words} words`} />

          <div className="mt-6">
            <TextAreaField
              id="lorem-output"
              label="Generated text"
              value={output}
              readOnly
              rows={20}
              mono={false}
              placeholder="Generated placeholder text will appear here..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={stats.characters} />
            <SummaryTile label="Sentences" value={stats.sentences} />
            <SummaryTile label="Paragraphs" value={stats.paragraphs} />
          </div>

          <InfoBox className="mt-5 leading-normal">
            {message}
          </InfoBox>
      </ToolPanel>
    </ToolPage>
  )
}

function generateLorem({
  mode,
  wordSet,
  count,
  startWithLorem,
}: {
  mode: OutputMode
  wordSet: WordSet
  count: number
  startWithLorem: boolean
}) {
  const words = wordSets[wordSet]

  if (mode === "words") {
    return buildWords(words, count, startWithLorem).join(" ")
  }

  if (mode === "sentences") {
    return Array.from({ length: count }, (_, index) =>
      buildSentence(words, index === 0 && startWithLorem),
    ).join(" ")
  }

  return Array.from({ length: count }, (_, paragraphIndex) => {
    const sentenceCount = 3 + (paragraphIndex % 3)
    return Array.from({ length: sentenceCount }, (_, sentenceIndex) =>
      buildSentence(words, paragraphIndex === 0 && sentenceIndex === 0 && startWithLorem),
    ).join(" ")
  }).join("\n\n")
}

function buildSentence(words: string[], startWithLorem: boolean) {
  const count = 8 + Math.floor(Math.random() * 8)
  const sentenceWords = buildWords(words, count, startWithLorem)
  sentenceWords[0] = capitalize(sentenceWords[0])

  return `${sentenceWords.join(" ")}.`
}

function buildWords(words: string[], count: number, startWithLorem: boolean) {
  const output = Array.from({ length: count }, (_, index) => words[(index * 7 + count * 3) % words.length])

  if (startWithLorem && words === wordSets.classic && count >= 2) {
    output[0] = "lorem"
    output[1] = "ipsum"
  }

  return output
}

function clampCount(value: string, mode: OutputMode) {
  const numberValue = Number(value)
  const max = mode === "words" ? 500 : 50

  if (!Number.isFinite(numberValue)) {
    return 1
  }

  return Math.min(Math.max(Math.floor(numberValue), 1), max)
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()
  const basicStats = getBasicTextStats(value)

  return {
    ...basicStats,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    sentences: (value.match(/[.!?]/g) ?? []).length,
    paragraphs: trimmedValue ? trimmedValue.split(/\n\s*\n/).length : 0,
  }
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
