"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type RegexFlag = "g" | "i" | "m" | "s" | "u" | "y"

const samplePattern = "\\b[A-Z][a-z]+\\b"
const sampleText = `Ada Lovelace wrote notes on the Analytical Engine.
Grace Hopper helped popularize the term debugging.
Katherine Johnson calculated orbital mechanics for NASA.`
const regexFlags: Array<{ key: RegexFlag; label: string }> = [
  { key: "g", label: "Global" },
  { key: "i", label: "Ignore case" },
  { key: "m", label: "Multiline" },
  { key: "s", label: "Dot all" },
  { key: "u", label: "Unicode" },
  { key: "y", label: "Sticky" },
]

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState(samplePattern)
  const [testText, setTestText] = useState(sampleText)
  const [selectedFlags, setSelectedFlags] = useState<RegexFlag[]>(["g"])
  const [message, setMessage] = useState("Enter a pattern to test it against your text.")

  const flags = selectedFlags.join("")
  const result = useMemo(() => testRegex(pattern, flags, testText), [flags, pattern, testText])
  const stats = useMemo(() => getTextStats(testText), [testText])

  async function copyMatches() {
    if (result.matches.length === 0) {
      setMessage("No matches to copy.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.matches.map((match) => match.value).join("\n"))
      setMessage("Matches copied.")
    } catch {
      setMessage("Copy failed. Select the matches and copy them manually.")
    }
  }

  function toggleFlag(flag: RegexFlag) {
    setSelectedFlags((currentFlags) =>
      currentFlags.includes(flag)
        ? currentFlags.filter((currentFlag) => currentFlag !== flag)
        : [...currentFlags, flag].sort(),
    )
    setMessage("Flags updated.")
  }

  function clearAll() {
    setPattern("")
    setTestText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setPattern(samplePattern)
    setTestText(sampleText)
    setSelectedFlags(["g"])
    setMessage("Sample regex loaded.")
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
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Regex Tester</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Test JavaScript regular expressions against sample text, inspect capture groups, and
            copy every match without sending your text anywhere.
          </p>

          <label htmlFor="regex-pattern" className="mt-6 block text-sm font-medium">
            Pattern
          </label>
          <div className="mt-2 flex rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm transition-within:border-[var(--accent-rust)]">
            <span className="text-[var(--ink-700)]">/</span>
            <input
              id="regex-pattern"
              value={pattern}
              onChange={(event) => {
                setPattern(event.target.value)
                setMessage("Pattern updated.")
              }}
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent px-1 outline-none"
              placeholder="\\w+"
            />
            <span className="text-[var(--ink-700)]">/{flags}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {regexFlags.map((flag) => (
              <button
                key={flag.key}
                type="button"
                onClick={() => toggleFlag(flag.key)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  selectedFlags.includes(flag.key)
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {flag.key}: {flag.label}
              </button>
            ))}
          </div>

          <label htmlFor="regex-text" className="mt-6 block text-sm font-medium">
            Test text
          </label>
          <textarea
            id="regex-text"
            value={testText}
            onChange={(event) => {
              setTestText(event.target.value)
              setMessage("Text updated.")
            }}
            rows={13}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="Paste text to test..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={stats.characters} />
            <Stat label="Words" value={stats.words} />
            <Stat label="Lines" value={stats.lines} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearAll}
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
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Matches
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Results</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.error ? "bg-red-50 text-red-700" : "bg-[var(--page-cream)] text-[var(--ink-700)]"
              }`}
            >
              {result.error ? "Invalid regex" : `${result.matches.length} matches`}
            </p>
          </div>

          <div className="mt-6 min-h-[13rem] whitespace-pre-wrap break-words rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 text-[var(--ink-800)]">
            {result.error ? (
              <span className="text-red-700">{result.error}</span>
            ) : result.segments.length > 0 ? (
              result.segments.map((segment, index) =>
                segment.isMatch ? (
                  <mark
                    key={`${segment.value}-${index}`}
                    className="rounded-md bg-[var(--accent-gold)]/70 px-1 py-0.5 text-[var(--ink-900)]"
                  >
                    {segment.value}
                  </mark>
                ) : (
                  <span key={`${segment.value}-${index}`}>{segment.value}</span>
                ),
              )
            ) : (
              <span className="text-[var(--ink-700)]">Highlighted matches will appear here...</span>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Match Details
            </h3>
            <div className="mt-3 grid max-h-[21rem] gap-2 overflow-auto pr-1">
              {result.matches.map((match, index) => (
                <div
                  key={`${match.index}-${match.value}-${index}`}
                  className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <code className="break-all font-mono font-semibold">{match.value}</code>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                      index {match.index}
                    </span>
                  </div>
                  {match.groups.length > 0 ? (
                    <div className="mt-3 grid gap-2">
                      {match.groups.map((group, groupIndex) => (
                        <div
                          key={`${group}-${groupIndex}`}
                          className="rounded-lg bg-white px-3 py-2 font-mono text-xs text-[var(--ink-700)]"
                        >
                          ${groupIndex + 1}: {group || "(empty)"}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {!result.error && result.matches.length === 0 ? (
                <div className="rounded-[1.1rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  No matches found.
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={copyMatches}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Matches
            </button>
          </div>
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

function testRegex(pattern: string, flags: string, text: string) {
  if (!pattern.trim() || !text) {
    return { error: null, matches: [], segments: [] }
  }

  try {
    const safeFlags = flags.includes("g") ? flags : `${flags}g`
    const regex = new RegExp(pattern, safeFlags)
    const matches: Array<{ value: string; index: number; groups: string[] }> = []
    const segments: Array<{ value: string; isMatch: boolean }> = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const value = match[0]
      const index = match.index

      if (index > lastIndex) {
        segments.push({ value: text.slice(lastIndex, index), isMatch: false })
      }

      segments.push({ value, isMatch: true })
      matches.push({ value, index, groups: match.slice(1) })
      lastIndex = index + value.length

      if (value.length === 0) {
        regex.lastIndex += 1
      }
    }

    if (lastIndex < text.length) {
      segments.push({ value: text.slice(lastIndex), isMatch: false })
    }

    return { error: null, matches, segments }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Invalid regular expression.",
      matches: [],
      segments: [],
    }
  }
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
  }
}
