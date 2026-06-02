"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type Mode = "password" | "passphrase"

const lowercase = "abcdefghijklmnopqrstuvwxyz"
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()-_=+[]{};:,.?/|~"
const words = [
  "anchor",
  "bright",
  "cobalt",
  "drift",
  "ember",
  "forest",
  "harbor",
  "ivory",
  "juno",
  "keystone",
  "lumen",
  "meadow",
  "nova",
  "orbit",
  "prairie",
  "quartz",
  "river",
  "signal",
  "thistle",
  "violet",
  "willow",
  "zenith",
]

export default function PasswordGeneratorPage() {
  const [mode, setMode] = useState<Mode>("password")
  const [length, setLength] = useState("18")
  const [wordCount, setWordCount] = useState("4")
  const [separator, setSeparator] = useState("-")
  const [useLowercase, setUseLowercase] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true)
  const [generatedValue, setGeneratedValue] = useState(() => generatePassword(18, true, true, true, true, true))
  const [history, setHistory] = useState<string[]>([])
  const [message, setMessage] = useState("Generate a strong password locally in your browser.")

  const strength = useMemo(() => estimateStrength(generatedValue), [generatedValue])

  function generateNext() {
    try {
      const nextValue =
        mode === "password"
          ? generatePassword(
              clampNumber(length, 8, 128, 18),
              useLowercase,
              useUppercase,
              useNumbers,
              useSymbols,
              avoidAmbiguous,
            )
          : generatePassphrase(clampNumber(wordCount, 3, 10, 4), separator)

      setGeneratedValue(nextValue)
      setHistory((current) => [nextValue, ...current.filter((item) => item !== nextValue)].slice(0, 6))
      setMessage("New value generated.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not generate a password.")
    }
  }

  async function copyValue(value = generatedValue) {
    if (!value) {
      setMessage("Generate a password before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setMessage("Copied to clipboard.")
    } catch {
      setMessage("Copy failed. Select the value and copy it manually.")
    }
  }

  function clearHistory() {
    setHistory([])
    setMessage("History cleared.")
  }

  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            Quotations Archive
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm font-medium text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
          >
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Security tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Password Generator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Create strong passwords or memorable passphrases locally. Nothing is uploaded or stored
            outside this page.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
            {(["password", "passphrase"] as Mode[]).map((nextMode) => (
              <button
                key={nextMode}
                type="button"
                onClick={() => {
                  setMode(nextMode)
                  setMessage(`${nextMode === "password" ? "Password" : "Passphrase"} mode selected.`)
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === nextMode
                    ? "bg-[var(--ink-900)] text-white"
                    : "text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {nextMode === "password" ? "Password" : "Passphrase"}
              </button>
            ))}
          </div>

          {mode === "password" ? (
            <>
              <label htmlFor="password-length" className="mt-6 block text-sm font-medium">
                Length: {clampNumber(length, 8, 128, 18)}
              </label>
              <input
                id="password-length"
                type="range"
                min="8"
                max="128"
                value={clampNumber(length, 8, 128, 18)}
                onChange={(event) => setLength(event.target.value)}
                className="mt-3 w-full accent-[var(--accent-rust)]"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Option label="Lowercase" checked={useLowercase} onChange={setUseLowercase} />
                <Option label="Uppercase" checked={useUppercase} onChange={setUseUppercase} />
                <Option label="Numbers" checked={useNumbers} onChange={setUseNumbers} />
                <Option label="Symbols" checked={useSymbols} onChange={setUseSymbols} />
                <Option label="Avoid ambiguous" checked={avoidAmbiguous} onChange={setAvoidAmbiguous} />
              </div>
            </>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <NumberField id="word-count" label="Words" value={wordCount} onChange={setWordCount} />
              <label htmlFor="separator" className="block">
                <span className="text-sm font-medium">Separator</span>
                <input
                  id="separator"
                  value={separator}
                  maxLength={3}
                  onChange={(event) => setSeparator(event.target.value)}
                  className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
                />
              </label>
            </div>
          )}

          <button
            type="button"
            onClick={generateNext}
            className="mt-6 w-full rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
          >
            Generate
          </button>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {message}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Output
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Generated Value</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {strength.label}
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
              <p className="break-all font-mono text-3xl font-semibold leading-tight text-[var(--ink-900)]">
                {generatedValue}
              </p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                <div className={`h-full ${strength.color}`} style={{ width: `${strength.score}%` }} />
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{strength.description}</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => copyValue()}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={generateNext}
                className="rounded-full bg-[var(--accent-gold)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--accent-sand)]"
              >
                Regenerate
              </button>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Recent
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Session History</h2>
              </div>
            </div>

            {history.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Generated values will appear here for this session.
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {history.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => copyValue(item)}
                    className="w-full rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 text-left font-mono text-sm transition hover:bg-white"
                  >
                    <span className="break-all">{item}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={clearHistory}
              className="mt-5 rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear History
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}

function Option({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[var(--accent-rust)]"
      />
      {label}
    </label>
  )
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        type="number"
        min="3"
        max="10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function generatePassword(
  length: number,
  includeLowercase: boolean,
  includeUppercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean,
  avoidAmbiguous: boolean,
) {
  const selectedSets = [
    includeLowercase ? lowercase : "",
    includeUppercase ? uppercase : "",
    includeNumbers ? numbers : "",
    includeSymbols ? symbols : "",
  ].filter(Boolean)

  if (selectedSets.length === 0) {
    throw new Error("Choose at least one character set.")
  }

  const cleanedSets = selectedSets.map((set) => (avoidAmbiguous ? removeAmbiguous(set) : set))
  const pool = cleanedSets.join("")
  const required = cleanedSets.map((set) => randomCharacter(set))
  const remaining = Array.from({ length: Math.max(0, length - required.length) }, () => randomCharacter(pool))

  return shuffle([...required, ...remaining]).join("")
}

function generatePassphrase(count: number, separator: string) {
  const selectedWords = Array.from({ length: count }, () => words[randomInteger(words.length)])
  const joiner = separator || "-"
  const suffix = String(randomInteger(90) + 10)
  return `${selectedWords.join(joiner)}${joiner}${suffix}`
}

function estimateStrength(value: string) {
  const uniqueCharacters = new Set(value).size
  const variety = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(value)).length
  const score = Math.min(100, Math.round(value.length * 3.4 + uniqueCharacters * 1.8 + variety * 8))

  if (score >= 85) {
    return { score, label: "Very strong", color: "bg-emerald-500", description: "High length and character variety." }
  }

  if (score >= 65) {
    return { score, label: "Strong", color: "bg-lime-500", description: "Good for most everyday accounts." }
  }

  if (score >= 40) {
    return { score, label: "Moderate", color: "bg-[var(--accent-gold)]", description: "Usable, but longer is better." }
  }

  return { score, label: "Weak", color: "bg-[var(--accent-rust)]", description: "Increase length or add more variety." }
}

function removeAmbiguous(value: string) {
  return value.replace(/[Il1O0]/g, "")
}

function randomCharacter(value: string) {
  return value[randomInteger(value.length)]
}

function shuffle(values: string[]) {
  const nextValues = [...values]

  for (let index = nextValues.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(index + 1)
    ;[nextValues[index], nextValues[swapIndex]] = [nextValues[swapIndex], nextValues[index]]
  }

  return nextValues
}

function randomInteger(max: number) {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] % max
}

function clampNumber(value: string, min: number, max: number, fallback: number) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  return Math.min(Math.max(Math.floor(numericValue), min), max)
}
