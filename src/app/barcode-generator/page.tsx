"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const presets = [
  { label: "Product", value: "WT-2026-001" },
  { label: "URL", value: "https://example.com/order/12345" },
  { label: "Asset", value: "ASSET-LAPTOP-0482" },
  { label: "Ticket", value: "TICKET-9F7A-2026" },
]

const code128Patterns = [
  "212222",
  "222122",
  "222221",
  "121223",
  "121322",
  "131222",
  "122213",
  "122312",
  "132212",
  "221213",
  "221312",
  "231212",
  "112232",
  "122132",
  "122231",
  "113222",
  "123122",
  "123221",
  "223211",
  "221132",
  "221231",
  "213212",
  "223112",
  "312131",
  "311222",
  "321122",
  "321221",
  "312212",
  "322112",
  "322211",
  "212123",
  "212321",
  "232121",
  "111323",
  "131123",
  "131321",
  "112313",
  "132113",
  "132311",
  "211313",
  "231113",
  "231311",
  "112133",
  "112331",
  "132131",
  "113123",
  "113321",
  "133121",
  "313121",
  "211331",
  "231131",
  "213113",
  "213311",
  "213131",
  "311123",
  "311321",
  "331121",
  "312113",
  "312311",
  "332111",
  "314111",
  "221411",
  "431111",
  "111224",
  "111422",
  "121124",
  "121421",
  "141122",
  "141221",
  "112214",
  "112412",
  "122114",
  "122411",
  "142112",
  "142211",
  "241211",
  "221114",
  "413111",
  "241112",
  "134111",
  "111242",
  "121142",
  "121241",
  "114212",
  "124112",
  "124211",
  "411212",
  "421112",
  "421211",
  "212141",
  "214121",
  "412121",
  "111143",
  "111341",
  "131141",
  "114113",
  "114311",
  "411113",
  "411311",
  "113141",
  "114131",
  "311141",
  "411131",
  "211412",
  "211214",
  "211232",
  "2331112",
]

export default function BarcodeGeneratorPage() {
  const [value, setValue] = useState("WT-2026-001")
  const [foreground, setForeground] = useState("#212529")
  const [background, setBackground] = useState("#ffffff")
  const [moduleWidth, setModuleWidth] = useState("2")
  const [barHeight, setBarHeight] = useState("120")
  const [quietZone, setQuietZone] = useState("16")
  const [showLabel, setShowLabel] = useState(true)
  const [message, setMessage] = useState("Enter text to generate a Code 128 barcode.")

  const barcodeResult = useMemo(() => {
    try {
      const bars = createCode128Bars(value)
      return { bars, error: "" }
    } catch (error) {
      return {
        bars: [],
        error: error instanceof Error ? error.message : "Could not create barcode.",
      }
    }
  }, [value])

  const safeModuleWidth = clampNumber(moduleWidth, 1, 6, 2)
  const safeBarHeight = clampNumber(barHeight, 60, 240, 120)
  const safeQuietZone = clampNumber(quietZone, 8, 48, 16)
  const svgMarkup = barcodeResult.error
    ? ""
    : renderBarcodeSvg({
        bars: barcodeResult.bars,
        value,
        foreground,
        background,
        moduleWidth: safeModuleWidth,
        barHeight: safeBarHeight,
        quietZone: safeQuietZone,
        showLabel,
      })

  async function copySvg() {
    if (!svgMarkup) {
      setMessage(barcodeResult.error || "Add content before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(svgMarkup)
      setMessage("Barcode SVG copied.")
    } catch {
      setMessage("Copy failed. Select the SVG markup and copy it manually.")
    }
  }

  function downloadSvg() {
    if (!svgMarkup) {
      setMessage(barcodeResult.error || "Add content before downloading.")
      return
    }

    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "barcode.svg"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("Barcode SVG downloaded.")
  }

  function loadPreset(nextValue: string) {
    setValue(nextValue)
    setMessage("Preset loaded.")
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Utility tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Barcode Generator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Create a scannable Code 128 barcode for product IDs, URLs, asset tags, and ticket
            numbers. The SVG is generated locally in your browser.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => loadPreset(preset.value)}
                className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:bg-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <label htmlFor="barcode-value" className="mt-6 block text-sm font-medium">
            Barcode value
          </label>
          <input
            id="barcode-value"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setMessage("Barcode value updated.")
            }}
            className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="WT-2026-001"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ColorField id="foreground" label="Foreground" value={foreground} onChange={setForeground} />
            <ColorField id="background" label="Background" value={background} onChange={setBackground} />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <NumberField id="module-width" label="Bar width" value={moduleWidth} onChange={setModuleWidth} />
            <NumberField id="bar-height" label="Bar height" value={barHeight} onChange={setBarHeight} />
            <NumberField id="quiet-zone" label="Quiet zone" value={quietZone} onChange={setQuietZone} />
          </div>

          <label className="mt-5 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={showLabel}
              onChange={(event) => setShowLabel(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent-rust)]"
            />
            Show readable label
          </label>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {barcodeResult.error || message}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Output
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Barcode Preview</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                Code 128
              </p>
            </div>

            <div className="mt-6 flex min-h-[280px] items-center justify-center rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-6">
              {svgMarkup ? (
                <div
                  className="max-w-full overflow-auto rounded-[1rem] bg-white p-4"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
              ) : (
                <p className="text-center text-sm text-[var(--ink-700)]">
                  Enter printable ASCII text to generate a barcode.
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copySvg}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Copy SVG
              </button>
              <button
                type="button"
                onClick={downloadSvg}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Download SVG
              </button>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Markup
                </p>
                <h2 className="mt-2 text-2xl font-semibold">SVG Source</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {svgMarkup.length} chars
              </p>
            </div>

            <textarea
              value={svgMarkup}
              readOnly
              rows={8}
              spellCheck={false}
              className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none"
              placeholder="SVG markup will appear here..."
            />
          </section>
        </div>
      </section>
    </main>
  )
}

function ColorField({
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
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
      <span className="mt-2 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-white px-3 py-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <span className="font-mono text-sm text-[var(--ink-700)]">{value}</span>
      </span>
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
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
      <input
        id={id}
        type="number"
        min="1"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function createCode128Bars(value: string) {
  if (!value.trim()) {
    throw new Error("Enter a barcode value.")
  }

  const codes = Array.from(value).map((character) => {
    const charCode = character.charCodeAt(0)

    if (charCode < 32 || charCode > 126) {
      throw new Error("Code 128-B supports printable ASCII characters only.")
    }

    return charCode - 32
  })

  const startCodeB = 104
  const checksum =
    (startCodeB + codes.reduce((sum, code, index) => sum + code * (index + 1), 0)) % 103
  const fullCodes = [startCodeB, ...codes, checksum, 106]

  return fullCodes.flatMap((code) => {
    const pattern = code128Patterns[code]

    if (!pattern) {
      throw new Error("Barcode pattern is unavailable.")
    }

    return Array.from(pattern, Number)
  })
}

function renderBarcodeSvg({
  bars,
  value,
  foreground,
  background,
  moduleWidth,
  barHeight,
  quietZone,
  showLabel,
}: {
  bars: number[]
  value: string
  foreground: string
  background: string
  moduleWidth: number
  barHeight: number
  quietZone: number
  showLabel: boolean
}) {
  const labelHeight = showLabel ? 34 : 0
  const barcodeWidth = bars.reduce((sum, width) => sum + width, 0) * moduleWidth
  const width = barcodeWidth + quietZone * 2
  const height = barHeight + labelHeight + quietZone * 2
  let x = quietZone

  const rects = bars
    .map((barWidth, index) => {
      const rectWidth = barWidth * moduleWidth
      const rect =
        index % 2 === 0
          ? `<rect x="${x}" y="${quietZone}" width="${rectWidth}" height="${barHeight}" fill="${escapeAttribute(
              foreground,
            )}"/>`
          : ""
      x += rectWidth
      return rect
    })
    .join("")

  const label = showLabel
    ? `<text x="${width / 2}" y="${height - quietZone}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="${escapeAttribute(
        foreground,
      )}">${escapeText(value)}</text>`
    : ""

  return `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Barcode for ${escapeAttribute(
    value,
  )}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${escapeAttribute(
    background,
  )}"/>${rects}${label}</svg>`
}

function clampNumber(value: string, min: number, max: number, fallback: number) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return fallback
  }

  return Math.min(Math.max(numberValue, min), max)
}

function escapeText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttribute(value: string) {
  return escapeText(value).replace(/"/g, "&quot;")
}
