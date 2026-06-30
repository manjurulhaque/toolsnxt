"use client"

import { useMemo, useState } from "react"
import { ToolIntro, ToolPage, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

type GradientType = "linear" | "radial" | "conic"

type ColorStop = {
  id: string
  color: string
  position: number
}

const initialStops: ColorStop[] = [
  { id: "stop-1", color: "#2563eb", position: 0 },
  { id: "stop-2", color: "#14b8a6", position: 52 },
  { id: "stop-3", color: "#f97316", position: 100 },
]

const palettes = [
  { label: "Aurora", stops: ["#2563eb", "#14b8a6", "#f97316"] },
  { label: "Ember", stops: ["#7f1d1d", "#dc2626", "#facc15"] },
  { label: "Garden", stops: ["#14532d", "#22c55e", "#d9f99d"] },
  { label: "Ink", stops: ["#111827", "#4f46e5", "#ec4899"] },
]

export default function GradientGeneratorPage() {
  const [gradientType, setGradientType] = useState<GradientType>("linear")
  const [angle, setAngle] = useState("135")
  const [stops, setStops] = useState<ColorStop[]>(initialStops)
  const [message, setMessage] = useState("Adjust colors and stops to generate CSS.")

  const cssValue = useMemo(
    () => createGradientCss(gradientType, angle, stops),
    [gradientType, angle, stops],
  )
  const cssBlock = `background: ${cssValue};`

  function updateStop(id: string, changes: Partial<ColorStop>) {
    setStops((currentStops) =>
      currentStops
        .map((stop) => (stop.id === id ? { ...stop, ...changes } : stop))
        .sort((left, right) => left.position - right.position),
    )
    setMessage("Gradient updated.")
  }

  function addStop() {
    if (stops.length >= 6) {
      setMessage("You can use up to 6 color stops.")
      return
    }

    const nextPosition = findOpenPosition(stops)
    const nextStop = {
      id: `stop-${crypto.randomUUID()}`,
      color: "#ffffff",
      position: nextPosition,
    }

    setStops((currentStops) => [...currentStops, nextStop].sort((left, right) => left.position - right.position))
    setMessage("Color stop added.")
  }

  function removeStop(id: string) {
    if (stops.length <= 2) {
      setMessage("A gradient needs at least 2 color stops.")
      return
    }

    setStops((currentStops) => currentStops.filter((stop) => stop.id !== id))
    setMessage("Color stop removed.")
  }

  function loadPalette(colors: string[]) {
    setStops(
      colors.map((color, index) => ({
        id: `stop-${index + 1}-${color}`,
        color,
        position: Math.round((index / (colors.length - 1)) * 100),
      })),
    )
    setMessage("Palette loaded.")
  }

  function randomize() {
    const nextStops = stops.map((stop) => ({
      ...stop,
      color: randomColor(),
    }))

    setAngle(String(Math.floor(Math.random() * 361)))
    setStops(nextStops)
    setMessage("Gradient randomized.")
  }

  async function copyCss() {
    try {
      await copyToClipboard(cssBlock)
      setMessage("CSS copied.")
    } catch {
      setMessage("Copy failed. Select the CSS and copy it manually.")
    }
  }

  return (
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="Design tool" title="Gradient Generator">
            Build CSS gradients with editable color stops, direction controls, live preview, and
            ready-to-copy background styles.
          </ToolIntro>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setGradientType(type)
                  setMessage(`${capitalize(type)} gradient selected.`)
                }}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  gradientType === type
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {capitalize(type)}
              </button>
            ))}
          </div>

          <label htmlFor="angle" className="mt-6 block text-sm font-medium">
            {gradientType === "linear" ? "Angle" : "Rotation"}: {clampNumber(angle, 0, 360, 135)}deg
          </label>
          <input
            id="angle"
            type="range"
            min="0"
            max="360"
            value={clampNumber(angle, 0, 360, 135)}
            onChange={(event) => {
              setAngle(event.target.value)
              setMessage("Direction updated.")
            }}
            className="mt-3 w-full accent-[var(--accent-rust)]"
          />

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">Color stops</h2>
              <button
                type="button"
                onClick={addStop}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Add Stop
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {stops.map((stop, index) => (
                <div
                  key={stop.id}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                >
                  <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <label className="flex items-center gap-3 text-sm font-medium">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(event) => updateStop(stop.id, { color: event.target.value })}
                        className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                      />
                      <span className="font-mono">{stop.color}</span>
                    </label>
                    <label className="text-sm font-medium">
                      Position: {stop.position}%
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(event) =>
                          updateStop(stop.id, { position: Number(event.target.value) })
                        }
                        className="mt-2 w-full accent-[var(--accent-rust)]"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeStop(stop.id)}
                      disabled={stops.length <= 2}
                      className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Remove {index + 1}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {palettes.map((palette) => (
              <button
                key={palette.label}
                type="button"
                onClick={() => loadPalette(palette.stops)}
                className="overflow-hidden rounded-[1.1rem] border border-[var(--ink-900)]/10 bg-white text-left text-xs font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                <span
                  className="block h-10"
                  style={{ background: createGradientCss("linear", "90", paletteToStops(palette.stops)) }}
                />
                <span className="block px-3 py-2">{palette.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={randomize}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Randomize
            </button>
            <button
              type="button"
              onClick={copyCss}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy CSS
            </button>
          </div>

          <InfoBox className="mt-6">
            {message}
          </InfoBox>
        </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Preview" title="Gradient Canvas" badge={capitalize(gradientType)} />

            <div
              className="mt-6 min-h-[360px] rounded-[1.5rem] border border-[var(--ink-900)]/10"
              style={{ background: cssValue }}
            />
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Code" title="CSS Output" badge={`${stops.length} stops`} />

            <textarea
              value={cssBlock}
              readOnly
              rows={8}
              spellCheck={false}
              className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            />
          </ToolPanel>
        </div>
    </ToolPage>
  )
}

function createGradientCss(type: GradientType, angle: string, stops: ColorStop[]) {
  const stopText = [...stops]
    .sort((left, right) => left.position - right.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ")
  const safeAngle = clampNumber(angle, 0, 360, 135)

  if (type === "radial") {
    return `radial-gradient(circle at center, ${stopText})`
  }

  if (type === "conic") {
    return `conic-gradient(from ${safeAngle}deg, ${stopText})`
  }

  return `linear-gradient(${safeAngle}deg, ${stopText})`
}

function paletteToStops(colors: string[]): ColorStop[] {
  return colors.map((color, index) => ({
    id: color,
    color,
    position: Math.round((index / (colors.length - 1)) * 100),
  }))
}

function findOpenPosition(stops: ColorStop[]) {
  const sortedStops = [...stops].sort((left, right) => left.position - right.position)
  let bestPosition = 50
  let bestGap = 0

  for (let index = 0; index < sortedStops.length - 1; index += 1) {
    const gap = sortedStops[index + 1].position - sortedStops[index].position

    if (gap > bestGap) {
      bestGap = gap
      bestPosition = Math.round(sortedStops[index].position + gap / 2)
    }
  }

  return bestPosition
}

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`
}

function clampNumber(value: string, min: number, max: number, fallback: number) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return fallback
  }

  return Math.min(Math.max(numberValue, min), max)
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
