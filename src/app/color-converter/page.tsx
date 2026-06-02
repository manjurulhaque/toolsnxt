"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type Color = {
  r: number
  g: number
  b: number
}

const sampleColor = "#2563eb"
const swatches = ["#2563eb", "#14b8a6", "#f97316", "#c026d3", "#111827", "#facc15"]

export default function ColorConverterPage() {
  const [hexInput, setHexInput] = useState(sampleColor)
  const [message, setMessage] = useState("Pick or paste a color to convert it.")

  const result = useMemo(() => parseHexColor(hexInput), [hexInput])
  const color = result.color
  const formats = useMemo(() => (color ? getColorFormats(color) : null), [color])

  async function copyValue(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      setMessage(`${label} copied.`)
    } catch {
      setMessage("Copy failed. Select a value and copy it manually.")
    }
  }

  function updateFromRgb(channel: keyof Color, value: string) {
    if (!color) {
      return
    }

    setHexInput(rgbToHex({ ...color, [channel]: clampNumber(value, 0, 255, color[channel]) }))
    setMessage("RGB updated.")
  }

  function updateFromHsl(channel: "h" | "s" | "l", value: string) {
    if (!formats) {
      return
    }

    const nextHsl = {
      ...formats.hslValues,
      [channel]: clampNumber(value, channel === "h" ? 0 : 0, channel === "h" ? 360 : 100, formats.hslValues[channel]),
    }
    setHexInput(rgbToHex(hslToRgb(nextHsl.h, nextHsl.s, nextHsl.l)))
    setMessage("HSL updated.")
  }

  function loadSample() {
    setHexInput(sampleColor)
    setMessage("Sample color loaded.")
  }

  function randomize() {
    setHexInput(randomColor())
    setMessage("Random color loaded.")
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
            Design tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Color Converter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert colors between HEX, RGB, HSL, and CSS-friendly formats with a live swatch,
            editable channels, and quick copy buttons.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <label htmlFor="color-picker" className="block">
              <span className="text-sm font-medium">Picker</span>
              <input
                id="color-picker"
                type="color"
                value={color ? formats?.hex ?? sampleColor : sampleColor}
                onChange={(event) => {
                  setHexInput(event.target.value)
                  setMessage("Color picked.")
                }}
                className="mt-2 h-14 w-20 cursor-pointer rounded-xl border-0 bg-transparent p-0"
              />
            </label>

            <label htmlFor="hex-input" className="block">
              <span className="text-sm font-medium">HEX</span>
              <input
                id="hex-input"
                value={hexInput}
                onChange={(event) => {
                  setHexInput(event.target.value)
                  setMessage("HEX updated.")
                }}
                spellCheck={false}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm outline-none transition focus:border-[var(--accent-rust)]"
                placeholder="#2563eb"
              />
            </label>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {(["r", "g", "b"] as Array<keyof Color>).map((channel) => (
              <label key={channel} htmlFor={`rgb-${channel}`} className="block">
                <span className="text-sm font-medium uppercase">{channel}</span>
                <input
                  id={`rgb-${channel}`}
                  type="number"
                  min="0"
                  max="255"
                  value={color?.[channel] ?? 0}
                  disabled={!color}
                  onChange={(event) => updateFromRgb(channel, event.target.value)}
                  className="mt-2 w-full rounded-[1.1rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-3 text-sm font-semibold outline-none transition focus:border-[var(--accent-rust)] disabled:opacity-50"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {(["h", "s", "l"] as const).map((channel) => (
              <label key={channel} htmlFor={`hsl-${channel}`} className="block">
                <span className="text-sm font-medium uppercase">{channel}</span>
                <input
                  id={`hsl-${channel}`}
                  type="number"
                  min="0"
                  max={channel === "h" ? "360" : "100"}
                  value={formats?.hslValues[channel] ?? 0}
                  disabled={!formats}
                  onChange={(event) => updateFromHsl(channel, event.target.value)}
                  className="mt-2 w-full rounded-[1.1rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-3 text-sm font-semibold outline-none transition focus:border-[var(--accent-rust)] disabled:opacity-50"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {swatches.map((swatch) => (
              <button
                key={swatch}
                type="button"
                onClick={() => {
                  setHexInput(swatch)
                  setMessage(`${swatch.toUpperCase()} selected.`)
                }}
                className="h-12 rounded-[1rem] border border-[var(--ink-900)]/10 transition hover:scale-[1.03]"
                style={{ backgroundColor: swatch }}
                aria-label={`Use ${swatch}`}
              />
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={randomize}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Randomize
            </button>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {result.error ?? message}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Color Swatch</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {formats?.contrastLabel ?? "No color"}
              </p>
            </div>

            <div
              className="mt-6 flex min-h-[300px] items-end rounded-[1.5rem] border border-[var(--ink-900)]/10 p-6"
              style={{ backgroundColor: formats?.hex ?? "#f5efe6" }}
            >
              <div
                className="rounded-[1.2rem] bg-white/92 px-5 py-4 shadow-[0_16px_40px_rgba(33,37,41,0.12)]"
                style={{ color: formats?.textColor ?? "#212529" }}
              >
                <p className="font-mono text-2xl font-semibold">{formats?.hex ?? "Invalid color"}</p>
                <p className="mt-1 text-sm opacity-80">{formats?.rgb ?? "Adjust the HEX value"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Formats
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Copy Values</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                CSS ready
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {formats
                ? [
                    ["HEX", formats.hex],
                    ["RGB", formats.rgb],
                    ["RGBA", formats.rgba],
                    ["HSL", formats.hsl],
                    ["HSLA", formats.hsla],
                    ["CSS Variable", `--color-brand: ${formats.hex};`],
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => copyValue(value, label)}
                      className="grid gap-2 rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-left text-sm transition hover:border-[var(--accent-rust)]/35 sm:grid-cols-[8rem_1fr]"
                    >
                      <span className="font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)]">
                        {label}
                      </span>
                      <code className="break-all font-mono text-[var(--ink-900)]">{value}</code>
                    </button>
                  ))
                : null}
              {!formats ? (
                <div className="rounded-[1.1rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  Enter a valid 3-digit or 6-digit HEX color to see converted values.
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function parseHexColor(value: string): { color: Color | null; error: string | null } {
  const normalizedValue = value.trim().replace(/^#/, "")

  if (!normalizedValue) {
    return { color: null, error: null }
  }

  if (!/^([a-f0-9]{3}|[a-f0-9]{6})$/i.test(normalizedValue)) {
    return { color: null, error: "Enter a valid 3-digit or 6-digit HEX color." }
  }

  const hex =
    normalizedValue.length === 3
      ? normalizedValue
          .split("")
          .map((character) => character + character)
          .join("")
      : normalizedValue

  return {
    color: {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    },
    error: null,
  }
}

function getColorFormats(color: Color) {
  const hex = rgbToHex(color)
  const hslValues = rgbToHsl(color.r, color.g, color.b)
  const luminance = getRelativeLuminance(color)

  return {
    hex,
    rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
    rgba: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
    hsl: `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`,
    hsla: `hsla(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%, 1)`,
    hslValues,
    textColor: luminance > 0.48 ? "#212529" : "#ffffff",
    contrastLabel: luminance > 0.48 ? "Dark text" : "Light text",
  }
}

function rgbToHex(color: Color) {
  return `#${[color.r, color.g, color.b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number) {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const lightness = (max + min) / 2

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) }
  }

  const delta = max - min
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
  let hue = 0

  if (max === red) {
    hue = (green - blue) / delta + (green < blue ? 6 : 0)
  } else if (max === green) {
    hue = (blue - red) / delta + 2
  } else {
    hue = (red - green) / delta + 4
  }

  return {
    h: Math.round(hue * 60),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  }
}

function hslToRgb(h: number, s: number, l: number): Color {
  const saturation = s / 100
  const lightness = l / 100
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const huePrime = h / 60
  const second = chroma * (1 - Math.abs((huePrime % 2) - 1))
  const match = lightness - chroma / 2
  let red = 0
  let green = 0
  let blue = 0

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma
    green = second
  } else if (huePrime < 2) {
    red = second
    green = chroma
  } else if (huePrime < 3) {
    green = chroma
    blue = second
  } else if (huePrime < 4) {
    green = second
    blue = chroma
  } else if (huePrime < 5) {
    red = second
    blue = chroma
  } else {
    red = chroma
    blue = second
  }

  return {
    r: Math.round((red + match) * 255),
    g: Math.round((green + match) * 255),
    b: Math.round((blue + match) * 255),
  }
}

function getRelativeLuminance(color: Color) {
  const [red, green, blue] = [color.r, color.g, color.b].map((channel) => {
    const normalizedChannel = channel / 255
    return normalizedChannel <= 0.03928
      ? normalizedChannel / 12.92
      : ((normalizedChannel + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function clampNumber(value: string, min: number, max: number, fallback: number) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return fallback
  }

  return Math.min(Math.max(numberValue, min), max)
}

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`
}
