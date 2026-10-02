"use client"

import { useMemo, useState } from "react"
import { NumberField } from "@/components/form-controls"
import {
  ActionButton,
  CheckboxOption,
  InfoBox,
  PanelHeader,
  ToolIntro,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

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

export function PasswordTool() {
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

  function applyPreset(presetName: "standard" | "high-security" | "passphrase" | "pin") {
    if (presetName === "standard") {
      setMode("password")
      setLength("16")
      setUseLowercase(true)
      setUseUppercase(true)
      setUseNumbers(true)
      setUseSymbols(true)
      setAvoidAmbiguous(true)
      const val = generatePassword(16, true, true, true, true, true)
      setGeneratedValue(val)
      setHistory((c) => [val, ...c.filter((i) => i !== val)].slice(0, 6))
      setMessage("Standard (16 chars) preset applied.")
    } else if (presetName === "high-security") {
      setMode("password")
      setLength("24")
      setUseLowercase(true)
      setUseUppercase(true)
      setUseNumbers(true)
      setUseSymbols(true)
      setAvoidAmbiguous(false)
      const val = generatePassword(24, true, true, true, true, false)
      setGeneratedValue(val)
      setHistory((c) => [val, ...c.filter((i) => i !== val)].slice(0, 6))
      setMessage("High Security (24 chars) preset applied.")
    } else if (presetName === "passphrase") {
      setMode("passphrase")
      setWordCount("4")
      setSeparator("-")
      const val = generatePassphrase(4, "-")
      setGeneratedValue(val)
      setHistory((c) => [val, ...c.filter((i) => i !== val)].slice(0, 6))
      setMessage("4-Word Passphrase preset applied.")
    } else if (presetName === "pin") {
      setMode("password")
      setLength("6")
      setUseLowercase(false)
      setUseUppercase(false)
      setUseNumbers(true)
      setUseSymbols(false)
      setAvoidAmbiguous(false)
      const val = generatePassword(6, false, false, true, false, false)
      setGeneratedValue(val)
      setHistory((c) => [val, ...c.filter((i) => i !== val)].slice(0, 6))
      setMessage("6-Digit PIN preset applied.")
    }
  }

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
      await copyToClipboard(value)
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
    <>
      <ToolPanel>
        <ToolIntro eyebrow="Security tool" title="Password Generator">
          Create strong random passwords or memorable passphrases locally for personal, business,
          developer, and enterprise accounts. Nothing is uploaded or stored outside this page.
        </ToolIntro>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
          {(["password", "passphrase"] as Mode[]).map((nextMode) => (
            <button
              key={nextMode}
              type="button"
              aria-pressed={mode === nextMode}
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

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-700)]/60">
            Presets:
          </span>
          <button
            type="button"
            onClick={() => applyPreset("standard")}
            className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-900)] shadow-2xs hover:border-[var(--accent-rust)] hover:bg-white transition"
          >
            16 Chars
          </button>
          <button
            type="button"
            onClick={() => applyPreset("high-security")}
            className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-900)] shadow-2xs hover:border-[var(--accent-rust)] hover:bg-white transition"
          >
            24 Chars (Max)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("passphrase")}
            className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-900)] shadow-2xs hover:border-[var(--accent-rust)] hover:bg-white transition"
          >
            4-Word Phrase
          </button>
          <button
            type="button"
            onClick={() => applyPreset("pin")}
            className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-2.5 py-1 text-xs font-semibold text-[var(--ink-900)] shadow-2xs hover:border-[var(--accent-rust)] hover:bg-white transition"
          >
            6-Digit PIN
          </button>
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
              <CheckboxOption label="Lowercase" checked={useLowercase} onChange={setUseLowercase} />
              <CheckboxOption label="Uppercase" checked={useUppercase} onChange={setUseUppercase} />
              <CheckboxOption label="Numbers" checked={useNumbers} onChange={setUseNumbers} />
              <CheckboxOption label="Symbols" checked={useSymbols} onChange={setUseSymbols} />
              <CheckboxOption label="Avoid ambiguous" checked={avoidAmbiguous} onChange={setAvoidAmbiguous} />
            </div>
          </>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <NumberField
              id="word-count"
              label="Words"
              min="3"
              max="10"
              value={wordCount}
              onChange={setWordCount}
            />
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

        <ActionButton onClick={generateNext} className="mt-6 w-full">
          Generate
        </ActionButton>

        <InfoBox className="mt-6 leading-normal">
          <span aria-live="polite">{message}</span>
        </InfoBox>
      </ToolPanel>

      <div className="space-y-6">
        <ToolPanel>
          <PanelHeader eyebrow="Output" title="Generated Value" badge={strength.label} />

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p
              className="break-all font-mono text-3xl font-semibold leading-tight text-[var(--ink-900)]"
              aria-live="polite"
            >
              {generatedValue}
            </p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
              <div className={`h-full ${strength.color}`} style={{ width: `${strength.score}%` }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{strength.description}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={() => copyValue()} variant="secondary">
              Copy
            </ActionButton>
            <ActionButton onClick={generateNext} variant="accent">
              Regenerate
            </ActionButton>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Recent" title="Session History" />

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

          <ActionButton onClick={clearHistory} variant="secondary" className="mt-5">
            Clear History
          </ActionButton>
        </ToolPanel>
      </div>
    </>
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
