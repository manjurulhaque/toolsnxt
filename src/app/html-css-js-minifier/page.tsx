"use client"

import { minify as minifyCss } from "csso"
import Link from "next/link"
import { useMemo, useState } from "react"
import { minify as minifyJs } from "terser"

type Mode = "html" | "css" | "js"

type MinifyResult = {
  output: string
  error: string | null
  warnings: string[]
}

const samples: Record<Mode, string> = {
  html: `<main class="page">
  <section>
    <h1>Web Tools</h1>
    <p>Fast browser utilities for everyday work.</p>
    <script>
      const label = "Minify me";
      console.log(label);
    </script>
  </section>
</main>`,
  css: `.card {
  border: 1px solid rgba(33, 37, 41, 0.12);
  background: #ffffff;
  padding: 24px;
}

.card:hover {
  transform: translateY(-2px);
}`,
  js: `function greetUser(name) {
  const fallback = "friend";
  const displayName = name || fallback;
  console.log("Hello, " + displayName + "!");
}

greetUser("Web Tools");`,
}

export default function HtmlCssJsMinifierPage() {
  const [mode, setMode] = useState<Mode>("html")
  const [inputText, setInputText] = useState(samples.html)
  const [result, setResult] = useState<MinifyResult>({ output: "", error: null, warnings: [] })
  const [message, setMessage] = useState("Paste HTML, CSS, or JavaScript to minify it locally.")
  const [isWorking, setIsWorking] = useState(false)

  const inputStats = useMemo(() => getTextStats(inputText), [inputText])
  const outputStats = useMemo(() => getTextStats(result.output), [result.output])
  const savings = useMemo(() => {
    if (!result.output || inputStats.bytes === 0) {
      return 0
    }

    return Math.max(0, ((inputStats.bytes - outputStats.bytes) / inputStats.bytes) * 100)
  }, [inputStats.bytes, outputStats.bytes, result.output])

  function switchMode(nextMode: Mode) {
    setMode(nextMode)
    setInputText(samples[nextMode])
    setResult({ output: "", error: null, warnings: [] })
    setMessage(`${getModeLabel(nextMode)} sample loaded.`)
  }

  async function minifyInput() {
    if (!inputText.trim()) {
      setResult({ output: "", error: "Paste code before minifying.", warnings: [] })
      setMessage("Paste code before minifying.")
      return
    }

    setIsWorking(true)
    setMessage("Minifying...")

    try {
      const nextResult = await minifyCode(inputText, mode)
      setResult(nextResult)
      setMessage(
        nextResult.error
          ? "Minification failed."
          : `Minified ${getModeLabel(mode)} with ${savings.toFixed(1)}% estimated savings.`,
      )
    } catch (error) {
      setResult({
        output: "",
        error: error instanceof Error ? error.message : "Could not minify this input.",
        warnings: [],
      })
      setMessage("Minification failed.")
    } finally {
      setIsWorking(false)
    }
  }

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Minify valid code before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("Minified output copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function downloadOutput() {
    if (!result.output.trim()) {
      setMessage("Minify valid code before downloading.")
      return
    }

    const extension = mode === "html" ? "html" : mode
    const mimeType =
      mode === "html" ? "text/html" : mode === "css" ? "text/css" : "text/javascript"
    const blob = new Blob([result.output], { type: `${mimeType};charset=utf-8` })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `minified.${extension}`
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage(`Downloaded minified.${extension}.`)
  }

  function clearAll() {
    setInputText("")
    setResult({ output: "", error: null, warnings: [] })
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setInputText(samples[mode])
    setResult({ output: "", error: null, warnings: [] })
    setMessage(`${getModeLabel(mode)} sample loaded.`)
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">HTML CSS JS Minifier</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Minify HTML, CSS, or JavaScript locally before pasting into pages, snippets, or build
            configs.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
            {(["html", "css", "js"] as Mode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => switchMode(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase transition ${
                  mode === option
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <label htmlFor="minifier-input" className="mt-6 block text-sm font-medium">
            {getModeLabel(mode)} input
          </label>
          <textarea
            id="minifier-input"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value)
              setMessage("Input updated.")
            }}
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder={`Paste ${getModeLabel(mode)} here...`}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={inputStats.characters} />
            <Stat label="Lines" value={inputStats.lines} />
            <Stat label="Bytes" value={inputStats.bytes} />
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
                Compression
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Minified Output</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.error ? "bg-red-50 text-red-700" : "bg-[var(--page-cream)] text-[var(--ink-700)]"
              }`}
            >
              {result.error ? "Check input" : `${savings.toFixed(1)}% saved`}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {result.error ?? (result.warnings.join(" ") || message)}
            </div>
            <button
              type="button"
              onClick={minifyInput}
              disabled={isWorking}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isWorking ? "Minifying..." : "Minify"}
            </button>
          </div>

          <label htmlFor="minifier-output" className="mt-6 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="minifier-output"
            value={result.output}
            readOnly
            rows={13}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Minified output will appear here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={outputStats.characters} />
            <Stat label="Lines" value={outputStats.lines} />
            <Stat label="Bytes" value={outputStats.bytes} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={copyOutput}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Output
            </button>
            <button
              type="button"
              onClick={downloadOutput}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

async function minifyCode(value: string, mode: Mode): Promise<MinifyResult> {
  if (mode === "html") {
    const { minify: minifyHtml } = await import(
      "html-minifier-terser/dist/htmlminifier.esm.bundle"
    )
    const output = await minifyHtml(value, {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: false,
      sortAttributes: true,
      sortClassName: true,
    })

    return { output, error: null, warnings: [] }
  }

  if (mode === "css") {
    const result = minifyCss(value, { restructure: true })
    return { output: result.css, error: null, warnings: [] }
  }

  const result = await minifyJs(value, {
    compress: true,
    format: {
      comments: false,
    },
    mangle: true,
  })

  return {
    output: result.code ?? "",
    error: result.code ? null : "JavaScript minifier did not return output.",
    warnings: [],
  }
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    bytes: new Blob([value]).size,
  }
}

function getModeLabel(mode: Mode) {
  if (mode === "html") {
    return "HTML"
  }

  if (mode === "css") {
    return "CSS"
  }

  return "JavaScript"
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
