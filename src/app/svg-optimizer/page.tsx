"use client"

import { optimize } from "svgo/browser"
import type { Config } from "svgo/browser"
import { useMemo, useState } from "react"
import { FilePicker, TextAreaField } from "@/components/form-controls"
import { ActionButton, CheckboxOption, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, downloadTextFile, getTextStats } from "@/lib/browser-actions"

type OptimizeResult = {
  output: string
  error: string | null
}

const sampleSvg = `<svg width="240" height="160" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <!-- Sample SVG for optimization -->
  <title>Web Tools Mark</title>
  <desc>A simple layered icon</desc>
  <rect id="background" x="12" y="12" width="216" height="136" rx="18" fill="#f5efe6"/>
  <circle id="accent" cx="82" cy="80" r="34" fill="#c76b3e"/>
  <path id="spark" d="M130 48 L174 80 L130 112 Z" fill="#212529"/>
  <path d="M75.000 80.000 C75.000 65.000 89.000 65.000 89.000 80.000 C89.000 95.000 75.000 95.000 75.000 80.000 Z" fill="#ffffff"/>
</svg>`

export default function SvgOptimizerPage() {
  const [inputSvg, setInputSvg] = useState(sampleSvg)
  const [result, setResult] = useState<OptimizeResult>({ output: "", error: null })
  const [message, setMessage] = useState("Paste SVG markup or upload an SVG file to optimize it locally.")
  const [multipass, setMultipass] = useState(true)
  const [preserveIds, setPreserveIds] = useState(false)
  const [removeDimensions, setRemoveDimensions] = useState(false)
  const [prefixIds, setPrefixIds] = useState(false)

  const inputStats = useMemo(() => getSvgStats(inputSvg), [inputSvg])
  const outputStats = useMemo(() => getSvgStats(result.output), [result.output])
  const previewSvg = result.output || inputSvg
  const previewUrl = useMemo(() => svgToDataUrl(previewSvg), [previewSvg])
  const dataUri = useMemo(() => svgToDataUrl(result.output), [result.output])
  const savings = useMemo(() => {
    if (!result.output || inputStats.bytes === 0) {
      return 0
    }

    return Math.max(0, ((inputStats.bytes - outputStats.bytes) / inputStats.bytes) * 100)
  }, [inputStats.bytes, outputStats.bytes, result.output])

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setMessage("Choose an SVG file.")
      return
    }

    try {
      const text = await file.text()
      setInputSvg(text)
      setResult({ output: "", error: null })
      setMessage(`${file.name} loaded.`)
    } catch {
      setMessage("That SVG file could not be read.")
    } finally {
      event.target.value = ""
    }
  }

  function optimizeSvg() {
    if (!inputSvg.trim()) {
      setResult({ output: "", error: "Paste SVG markup before optimizing." })
      setMessage("Paste SVG markup before optimizing.")
      return
    }

    try {
      const plugins: NonNullable<Config["plugins"]> = [
        {
          name: "preset-default",
          params: {
            overrides: {
              cleanupIds: preserveIds ? false : undefined,
              removeViewBox: false,
            },
          },
        },
        "sortAttrs",
      ]

      if (removeDimensions) {
        plugins.push("removeDimensions")
      }

      if (prefixIds) {
        plugins.push({ name: "prefixIds", params: { prefix: "svg" } })
      }

      const optimized = optimize(inputSvg, {
        multipass,
        plugins,
      })

      setResult({ output: optimized.data, error: null })
      const nextOutputBytes = getTextStats(optimized.data).bytes
      const nextSavings =
        inputStats.bytes > 0 ? Math.max(0, ((inputStats.bytes - nextOutputBytes) / inputStats.bytes) * 100) : 0
      setMessage(`Optimized SVG with ${nextSavings.toFixed(1)}% estimated savings.`)
    } catch (error) {
      setResult({
        output: "",
        error: error instanceof Error ? error.message : "Could not optimize this SVG.",
      })
      setMessage("SVG optimization failed.")
    }
  }

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Optimize valid SVG before copying.")
      return
    }

    try {
      await copyToClipboard(result.output)
      setMessage("Optimized SVG copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  async function copyDataUri() {
    if (!dataUri) {
      setMessage("Optimize valid SVG before copying a data URI.")
      return
    }

    try {
      await copyToClipboard(dataUri)
      setMessage("Data URI copied.")
    } catch {
      setMessage("Copy failed. Select the data URI and copy it manually.")
    }
  }

  function downloadOutput() {
    if (!result.output.trim()) {
      setMessage("Optimize valid SVG before downloading.")
      return
    }

    downloadTextFile(result.output, "optimized.svg", "image/svg+xml;charset=utf-8")
    setMessage("Downloaded optimized.svg.")
  }

  function clearAll() {
    setInputSvg("")
    setResult({ output: "", error: null })
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setInputSvg(sampleSvg)
    setResult({ output: "", error: null })
    setMessage("Sample SVG loaded.")
  }

  return (
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Design tool" title="SVG Optimizer / Viewer">
          Optimize SVG markup, preview it, copy clean code, or export a compact SVG file in your
          browser.
        </ToolIntro>

        <div className="mt-6">
          <TextAreaField
            id="svg-input"
            label="SVG input"
            value={inputSvg}
            onChange={(value) => {
              setInputSvg(value)
              setResult({ output: "", error: null })
              setMessage("SVG input updated.")
            }}
            rows={16}
            placeholder="<svg>...</svg>"
          />
        </div>

        <div className="mt-4">
          <FilePicker
            label="Choose SVG"
            description="Load an .svg file from your device"
            accept="image/svg+xml,.svg"
            onChange={handleFile}
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryTile label="Characters" value={inputStats.characters} />
          <SummaryTile label="Elements" value={inputStats.elements} />
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

      <div className="space-y-6">
        <ToolPanel>
          <PanelHeader
            eyebrow="Optimization"
            title="Output"
            badge={result.error ? "Check input" : `${savings.toFixed(1)}% saved`}
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <CheckboxOption label="Multipass optimization" checked={multipass} onChange={setMultipass} />
            <CheckboxOption label="Preserve IDs" checked={preserveIds} onChange={setPreserveIds} />
            <CheckboxOption label="Remove width and height" checked={removeDimensions} onChange={setRemoveDimensions} />
            <CheckboxOption label="Prefix IDs" checked={prefixIds} onChange={setPrefixIds} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InfoBox className={result.error ? "border-red-100 bg-red-50 text-red-700" : ""}>
              {result.error ?? message}
            </InfoBox>
            <ActionButton onClick={optimizeSvg}>Optimize</ActionButton>
          </div>

          <div className="mt-6">
            <TextAreaField
              id="svg-output"
              label="Optimized SVG"
              value={result.output}
              readOnly
              rows={10}
              placeholder="Optimized SVG will appear here..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={outputStats.characters} />
            <SummaryTile label="Elements" value={outputStats.elements} />
            <SummaryTile label="Bytes" value={outputStats.bytes} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ActionButton onClick={copyOutput}>Copy SVG</ActionButton>
            <ActionButton onClick={copyDataUri} variant="secondary">
              Copy Data URI
            </ActionButton>
            <ActionButton onClick={downloadOutput} variant="secondary">
              Download
            </ActionButton>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Preview" title="Rendered SVG" badge={previewUrl ? "Ready" : "No SVG"} />

          <div className="mt-6 grid min-h-64 place-items-center rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-6">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="SVG preview"
                className="max-h-80 w-full max-w-full object-contain"
              />
            ) : (
              <p className="text-sm text-[var(--ink-700)]">SVG preview will appear here.</p>
            )}
          </div>

          <div className="mt-5">
            <TextAreaField
              id="svg-data-uri"
              label="Data URI"
              value={dataUri}
              readOnly
              rows={4}
              placeholder="Data URI will appear after optimization..."
            />
          </div>
        </ToolPanel>
      </div>
    </ToolPage>
  )
}

function getSvgStats(value: string) {
  const textStats = getTextStats(value)

  if (!value.trim() || typeof window === "undefined") {
    return { ...textStats, elements: 0, attributes: 0 }
  }

  const document = new DOMParser().parseFromString(value, "image/svg+xml")
  const parserError = document.querySelector("parsererror")

  if (parserError) {
    return { ...textStats, elements: 0, attributes: 0 }
  }

  const elements = Array.from(document.querySelectorAll("*"))
  const attributes = elements.reduce((sum, element) => sum + element.attributes.length, 0)

  return { ...textStats, elements: elements.length, attributes }
}

function svgToDataUrl(value: string) {
  if (!value.trim() || !value.includes("<svg")) {
    return ""
  }

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(value)}`
}
