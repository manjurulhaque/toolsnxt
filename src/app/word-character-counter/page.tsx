"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const sampleText = `Web Tools keeps small browser utilities close at hand.

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
      await navigator.clipboard.writeText(summary)
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Text tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Word / Character Counter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Count words, characters, lines, sentences, paragraphs, reading time, and repeated
            keywords from pasted text.
          </p>

          <label htmlFor="counter-input" className="mt-6 block text-sm font-medium">
            Text input
          </label>
          <textarea
            id="counter-input"
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              setMessage("Text updated.")
            }}
            rows={17}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="Type or paste text here..."
          />

          <label className="mt-4 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
            <input
              type="checkbox"
              checked={excludeSpaces}
              onChange={(event) => {
                setExcludeSpaces(event.target.checked)
                setMessage("Character counting updated.")
              }}
              className="h-4 w-4 accent-[var(--ink-900)]"
            />
            Exclude spaces from character count
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={clearText}
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
              onClick={copySummary}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Stats
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Counts
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Text Stats</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {stats.readingTime} min read
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat label="Words" value={stats.words} />
              <Stat label="Characters" value={stats.characters} />
              <Stat label="No Spaces" value={stats.charactersNoSpaces} />
              <Stat label="Sentences" value={stats.sentences} />
              <Stat label="Paragraphs" value={stats.paragraphs} />
              <Stat label="Lines" value={stats.lines} />
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Density
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Top Keywords</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                Top 10
              </p>
            </div>

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
          </section>
        </div>
      </section>
    </main>
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
