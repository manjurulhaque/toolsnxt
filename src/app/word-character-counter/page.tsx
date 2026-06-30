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
  ToolPage,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"
import { SITE_NAME } from "@/lib/site"

const sampleText = `${SITE_NAME} keeps small browser utilities close at hand.

Paste text here to count words, characters, sentences, paragraphs, and reading time. The keyword table helps spot repeated terms quickly.`

export default function WordCharacterCounterPage() {
  const [text, setText] = useState(sampleText)
  const [excludeSpaces, setExcludeSpaces] = useState(false)
  const [message, setMessage] = useState("Paste text to analyze it locally.")

  const stats = useMemo(() => analyzeText(text, excludeSpaces), [excludeSpaces, text])

  async function copySummary() {
    const summary = [
      `Words: ${stats.words}`,
      `Characters: ${stats.characters}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Reading time: ${stats.readingTime} min`,
    ].join("\n")

    try {
      await copyToClipboard(summary)
      setMessage("Summary copied.")
    } catch {
      setMessage("Copy failed. Select the stats and copy them manually.")
    }
  }

  function clearText() {
    setText("")
    setMessage("Text cleared.")
  }

  function loadSample() {
    setText(sampleText)
    setExcludeSpaces(false)
    setMessage("Sample text loaded.")
  }

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Text tool" title="Word / Character Counter">
            Count words, characters, lines, sentences, paragraphs, reading time, and repeated
            keywords from pasted text.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
              id="counter-input"
              label="Text input"
              value={text}
              onChange={(value) => {
                setText(value)
                setMessage("Text updated.")
              }}
              rows={17}
              mono={false}
              placeholder="Type or paste text here..."
            />
          </div>

          <div className="mt-4">
            <CheckboxOption
              label="Exclude spaces from character count"
              checked={excludeSpaces}
              onChange={(checked) => {
                setExcludeSpaces(checked)
                setMessage("Character counting updated.")
              }}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ActionButton onClick={clearText} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
            <ActionButton onClick={copySummary}>
              Copy Stats
            </ActionButton>
          </div>
      </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Counts" title="Text Stats" badge={`${stats.readingTime} min read`} />

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <SummaryTile label="Words" value={stats.words} />
              <SummaryTile label="Characters" value={stats.characters} />
              <SummaryTile label="No Spaces" value={stats.charactersNoSpaces} />
              <SummaryTile label="Sentences" value={stats.sentences} />
              <SummaryTile label="Paragraphs" value={stats.paragraphs} />
              <SummaryTile label="Lines" value={stats.lines} />
            </div>

            <InfoBox className="mt-5 leading-normal">
              {message}
            </InfoBox>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Density" title="Top Keywords" badge="Top 10" />

            <div className="mt-6 grid gap-2">
              {stats.keywords.map((keyword) => (
                <div
                  key={keyword.word}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm"
                >
                  <span className="break-all font-semibold">{keyword.word}</span>
                  <span className="font-mono text-[var(--ink-700)]">{keyword.count}</span>
                  <span className="font-mono text-[var(--ink-700)]">{keyword.percent}%</span>
                </div>
              ))}
              {stats.keywords.length === 0 ? (
                <div className="rounded-[1.1rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  Keyword density appears after you add words.
                </div>
              ) : null}
            </div>
          </ToolPanel>
        </div>
    </ToolPage>
  )
}

function analyzeText(value: string, excludeSpaces: boolean) {
  const trimmedValue = value.trim()
  const words = trimmedValue.match(/[A-Za-z0-9']+/g) ?? []
  const keywordCounts = words.reduce<Record<string, number>>((counts, word) => {
    const normalizedWord = word.toLowerCase().replace(/^'+|'+$/g, "")
    if (normalizedWord.length < 3) {
      return counts
    }

    counts[normalizedWord] = (counts[normalizedWord] ?? 0) + 1
    return counts
  }, {})
  const keywords = Object.entries(keywordCounts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      percent: words.length ? ((count / words.length) * 100).toFixed(1) : "0.0",
    }))

  return {
    words: words.length,
    characters: excludeSpaces ? value.replace(/\s/g, "").length : value.length,
    charactersNoSpaces: value.replace(/\s/g, "").length,
    sentences: trimmedValue ? (trimmedValue.match(/[.!?]+(?:\s|$)/g) ?? [trimmedValue]).length : 0,
    paragraphs: trimmedValue ? trimmedValue.split(/\n\s*\n/).length : 0,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    readingTime: Math.max(1, Math.ceil(words.length / 200)),
    keywords,
  }
}
