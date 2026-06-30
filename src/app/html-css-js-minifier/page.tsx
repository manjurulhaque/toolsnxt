"use client"

import { minify as minifyCss } from "csso"
import { useMemo, useState } from "react"
import { minify as minifyJs } from "terser"
import { SegmentedControl, TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, downloadTextFile, getTextStats } from "@/lib/browser-actions"

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

const modeOptions: Array<{ key: Mode; label: string }> = [
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "js", label: "JS" },
]

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
      const nextOutputBytes = getTextStats(nextResult.output).bytes
      const nextSavings =
        nextResult.output && inputStats.bytes > 0
          ? Math.max(0, ((inputStats.bytes - nextOutputBytes) / inputStats.bytes) * 100)
          : 0
      setMessage(
        nextResult.error
          ? "Minification failed."
          : `Minified ${getModeLabel(mode)} with ${nextSavings.toFixed(1)}% estimated savings.`,
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
      await copyToClipboard(result.output)
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
    downloadTextFile(result.output, `minified.${extension}`, `${mimeType};charset=utf-8`)
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
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="HTML CSS JS Minifier">
            Minify HTML, CSS, or JavaScript locally before pasting into pages, snippets, or build
            configs.
        </ToolIntro>

          <div className="mt-6">
            <SegmentedControl
              value={mode}
              options={modeOptions}
              onChange={switchMode}
              columns="grid-cols-3"
            />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="minifier-input"
              label={`${getModeLabel(mode)} input`}
              value={inputText}
              onChange={(value) => {
                setInputText(value)
                setMessage("Input updated.")
              }}
              rows={16}
              placeholder={`Paste ${getModeLabel(mode)} here...`}
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
            eyebrow="Compression"
            title="Minified Output"
            badge={result.error ? "Check input" : `${savings.toFixed(1)}% saved`}
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InfoBox className="leading-normal">
              {result.error ?? (result.warnings.join(" ") || message)}
            </InfoBox>
            <ActionButton onClick={minifyInput} disabled={isWorking}>
              {isWorking ? "Minifying..." : "Minify"}
            </ActionButton>
          </div>

          <div className="mt-6">
            <TextAreaField
              id="minifier-output"
              label="Result"
              value={result.output}
              readOnly
              rows={13}
              placeholder="Minified output will appear here..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={outputStats.characters} />
            <SummaryTile label="Lines" value={outputStats.lines} />
            <SummaryTile label="Bytes" value={outputStats.bytes} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={copyOutput}>
              Copy Output
            </ActionButton>
            <ActionButton onClick={downloadOutput} variant="secondary">
              Download
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
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

function getModeLabel(mode: Mode) {
  if (mode === "html") {
    return "HTML"
  }

  if (mode === "css") {
    return "CSS"
  }

  return "JavaScript"
}
