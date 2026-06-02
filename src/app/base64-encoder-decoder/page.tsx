"use client"

import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type Mode = "encode" | "decode"
type OutputMode = "plain" | "data-url"

const sampleText = "Fast browser utilities"

export default function Base64EncoderDecoderPage() {
  const [mode, setMode] = useState<Mode>("encode")
  const [inputText, setInputText] = useState(sampleText)
  const [fileName, setFileName] = useState("")
  const [fileType, setFileType] = useState("")
  const [outputMode, setOutputMode] = useState<OutputMode>("plain")
  const [message, setMessage] = useState("Encode text, decode Base64, or convert a file locally.")

  const result = useMemo(
    () => transformBase64(inputText, mode, outputMode, fileType),
    [fileType, inputText, mode, outputMode],
  )
  const inputStats = useMemo(() => getTextStats(inputText), [inputText])
  const outputStats = useMemo(() => getTextStats(result.output), [result.output])

  function handleTextChange(value: string) {
    setInputText(value)
    setFileName("")
    setFileType("")
    setMessage("Input updated.")
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setMessage("Choose a file.")
      return
    }

    try {
      const base64 = await fileToBase64(file)
      setMode("encode")
      setInputText(base64)
      setFileName(file.name)
      setFileType(file.type || "application/octet-stream")
      setOutputMode("plain")
      setMessage(`${file.name} converted to Base64.`)
    } catch (error) {
      console.error("Base64 file conversion failed", error)
      setMessage("That file could not be converted.")
    } finally {
      event.target.value = ""
    }
  }

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Add input before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("Result copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function swapResultToInput() {
    if (!result.output || result.error) {
      setMessage("Create a valid result before swapping.")
      return
    }

    setInputText(result.output)
    setFileName("")
    setFileType("")
    setMode(mode === "encode" ? "decode" : "encode")
    setOutputMode("plain")
    setMessage("Result moved to input.")
  }

  function clearAll() {
    setInputText("")
    setFileName("")
    setFileType("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setMode("encode")
    setInputText(sampleText)
    setFileName("")
    setFileType("")
    setOutputMode("plain")
    setMessage("Sample text loaded.")
  }

  function downloadDecodedFile() {
    const decoded = decodeBase64ToBytes(inputText)

    if (!decoded) {
      setMessage("Paste valid Base64 before downloading decoded bytes.")
      return
    }

    const blob = new Blob([decoded], { type: fileType || "application/octet-stream" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = fileName ? `decoded-${fileName}` : "decoded-file"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("Decoded file downloaded.")
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
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Base64 Encoder / Decoder</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Encode text, decode Base64, or turn a file into a Base64 string in your browser.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
            {(["encode", "decode"] as Mode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setMode(option)
                  setOutputMode("plain")
                  setMessage(`${option === "encode" ? "Encode" : "Decode"} mode selected.`)
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  mode === option
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <label htmlFor="base64-input" className="mt-6 block text-sm font-medium">
            Input
          </label>
          <textarea
            id="base64-input"
            value={inputText}
            onChange={(event) => handleTextChange(event.target.value)}
            rows={12}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder={mode === "encode" ? "Paste text to encode..." : "Paste Base64 to decode..."}
          />

          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-4 py-5 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose file</span>
            <span className="mt-1 text-xs text-[var(--ink-700)]/75">
              Convert file bytes into Base64 text
            </span>
            <input type="file" className="sr-only" onChange={handleFile} />
          </label>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={inputStats.characters} />
            <Stat label="Lines" value={inputStats.lines} />
            <Stat label="Bytes" value={inputStats.bytes} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Transform
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Output</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.error ? "bg-red-50 text-red-700" : "bg-[var(--page-cream)] text-[var(--ink-700)]"
              }`}
            >
              {result.error ? "Check input" : `${outputStats.characters} chars`}
            </p>
          </div>

          {mode === "encode" ? (
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
              {(["plain", "data-url"] as OutputMode[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setOutputMode(option)
                    setMessage(`${option === "plain" ? "Plain Base64" : "Data URL"} output selected.`)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    outputMode === option
                      ? "bg-[var(--ink-900)] text-white"
                      : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                  }`}
                >
                  {option === "plain" ? "Plain" : "Data URL"}
                </button>
              ))}
            </div>
          ) : null}

          <label htmlFor="base64-output" className="mt-6 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="base64-output"
            value={result.output}
            readOnly
            rows={12}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Transformed text will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Result
            </button>
            <button
              type="button"
              onClick={swapResultToInput}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Swap
            </button>
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

          <button
            type="button"
            onClick={downloadDecodedFile}
            disabled={mode !== "decode" || !inputText.trim()}
            className="mt-3 w-full rounded-full border border-[var(--accent-rust)]/25 bg-white px-5 py-3 text-sm font-semibold text-[var(--accent-rust)] transition hover:border-[var(--accent-rust)]/45 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Download Decoded Bytes
          </button>

          <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {result.error ?? message}
          </div>
        </div>
      </section>
    </main>
  )
}

function transformBase64(value: string, mode: Mode, outputMode: OutputMode, fileType: string) {
  if (!value.trim()) {
    return { output: "", error: null }
  }

  try {
    if (mode === "encode") {
      const base64 = isLikelyBase64(value) ? cleanBase64(value) : encodeText(value)
      return {
        output: outputMode === "data-url" ? `data:${fileType || "text/plain"};base64,${base64}` : base64,
        error: null,
      }
    }

    return { output: decodeText(value), error: null }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Could not transform this input.",
    }
  }
}

function encodeText(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeText(value: string) {
  const bytes = decodeBase64ToBytes(value)
  if (!bytes) {
    throw new Error("Input is not valid Base64.")
  }

  return new TextDecoder().decode(bytes)
}

function decodeBase64ToBytes(value: string) {
  try {
    const base64 = cleanBase64(value)
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index)
    }

    return bytes
  } catch {
    return null
  }
}

function cleanBase64(value: string) {
  const trimmed = value.trim()
  const dataUrlSeparator = trimmed.startsWith("data:") ? trimmed.indexOf(",") : -1
  const base64 = dataUrlSeparator >= 0 ? trimmed.slice(dataUrlSeparator + 1) : trimmed
  return base64.replace(/\s/g, "")
}

function isLikelyBase64(value: string) {
  const cleaned = cleanBase64(value)
  return cleaned.length > 0 && cleaned.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      resolve(result.split(",")[1] ?? "")
    }
    reader.onerror = () => reject(reader.error ?? new Error("File reading failed"))
    reader.readAsDataURL(file)
  })
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    bytes: new Blob([value]).size,
  }
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
