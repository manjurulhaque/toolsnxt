"use client"

import { NumberField } from "@/components/form-controls"
import { useMemo, useState } from "react"
import { ToolIntro, ToolPage, PanelHeader, SummaryTile, ToolPanel } from "@/components/tool-page"

type Mode = "of" | "change" | "ratio" | "adjust"
type AdjustDirection = "increase" | "decrease"

const modeLabels: Record<Mode, string> = {
  of: "Percent Of",
  change: "Percent Change",
  ratio: "What Percent",
  adjust: "Increase / Decrease",
}

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("of")
  const [percent, setPercent] = useState("15")
  const [value, setValue] = useState("200")
  const [startValue, setStartValue] = useState("80")
  const [endValue, setEndValue] = useState("100")
  const [partValue, setPartValue] = useState("25")
  const [wholeValue, setWholeValue] = useState("200")
  const [adjustBase, setAdjustBase] = useState("120")
  const [adjustPercent, setAdjustPercent] = useState("10")
  const [adjustDirection, setAdjustDirection] = useState<AdjustDirection>("increase")

  const result = useMemo(
    () =>
      calculatePercentage({
        adjustBase,
        adjustDirection,
        adjustPercent,
        endValue,
        mode,
        partValue,
        percent,
        startValue,
        value,
        wholeValue,
      }),
    [
      adjustBase,
      adjustDirection,
      adjustPercent,
      endValue,
      mode,
      partValue,
      percent,
      startValue,
      value,
      wholeValue,
    ],
  )

  function loadExample(nextMode: Mode) {
    setMode(nextMode)

    if (nextMode === "of") {
      setPercent("15")
      setValue("200")
    } else if (nextMode === "change") {
      setStartValue("80")
      setEndValue("100")
    } else if (nextMode === "ratio") {
      setPartValue("25")
      setWholeValue("200")
    } else {
      setAdjustBase("120")
      setAdjustPercent("10")
      setAdjustDirection("increase")
    }
  }

  return (
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="Math tool" title="Percentage Calculator">
            Calculate percentages, percent change, ratios, and price-style increases or decreases.
          </ToolIntro>

          <div className="mt-6 grid gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2 sm:grid-cols-2">
            {(Object.keys(modeLabels) as Mode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => loadExample(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === option
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                {modeLabels[option]}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">{renderInputs()}</div>

          {mode === "adjust" ? (
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
              {(["increase", "decrease"] as AdjustDirection[]).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => setAdjustDirection(direction)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                    adjustDirection === direction
                      ? "bg-[var(--ink-900)] text-white"
                      : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                  }`}
                >
                  {direction}
                </button>
              ))}
            </div>
          ) : null}
        </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Result" title={modeLabels[mode]} badge="Live" />

            <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
              <p className="text-sm text-[var(--ink-700)]">{result.label}</p>
              <p className="mt-3 break-words text-5xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-6xl">
                {result.value}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-[var(--ink-700)]">
                {result.summary}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <SummaryTile label="Difference" value={result.difference} />
              <SummaryTile label="Multiplier" value={result.multiplier} />
              <SummaryTile label="Formula" value={result.formula} />
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Quick examples" title="Common Uses" />
            <div className="mt-5 grid gap-3">
              <ExampleButton label="15% of 200" onClick={() => loadExample("of")} />
              <ExampleButton label="80 to 100 percent change" onClick={() => loadExample("change")} />
              <ExampleButton label="25 is what percent of 200" onClick={() => loadExample("ratio")} />
              <ExampleButton label="Increase 120 by 10%" onClick={() => loadExample("adjust")} />
            </div>
          </ToolPanel>
        </div>
    </ToolPage>
  )

  function renderInputs() {
    if (mode === "of") {
      return (
        <>
          <NumberField id="percent" label="Percent" suffix="%" value={percent} onChange={setPercent} />
          <NumberField id="value" label="Of value" value={value} onChange={setValue} />
        </>
      )
    }

    if (mode === "change") {
      return (
        <>
          <NumberField id="start-value" label="Starting value" value={startValue} onChange={setStartValue} />
          <NumberField id="end-value" label="Ending value" value={endValue} onChange={setEndValue} />
        </>
      )
    }

    if (mode === "ratio") {
      return (
        <>
          <NumberField id="part-value" label="Part value" value={partValue} onChange={setPartValue} />
          <NumberField id="whole-value" label="Whole value" value={wholeValue} onChange={setWholeValue} />
        </>
      )
    }

    return (
      <>
        <NumberField id="adjust-base" label="Base value" value={adjustBase} onChange={setAdjustBase} />
        <NumberField
          id="adjust-percent"
          label="Percent"
          suffix="%"
          value={adjustPercent}
          onChange={setAdjustPercent}
        />
      </>
    )
  }
}

function ExampleButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-left text-sm font-semibold text-[var(--ink-800)] transition hover:bg-white"
    >
      {label}
    </button>
  )
}

function calculatePercentage(input: {
  adjustBase: string
  adjustDirection: AdjustDirection
  adjustPercent: string
  endValue: string
  mode: Mode
  partValue: string
  percent: string
  startValue: string
  value: string
  wholeValue: string
}) {
  if (input.mode === "of") {
    const percent = toNumber(input.percent)
    const value = toNumber(input.value)
    const result = (percent / 100) * value

    return buildResult({
      label: `${formatNumber(percent)}% of ${formatNumber(value)}`,
      value: formatNumber(result),
      summary: `${formatNumber(percent)} percent of ${formatNumber(value)} is ${formatNumber(result)}.`,
      difference: formatNumber(value - result),
      multiplier: formatNumber(percent / 100),
      formula: "p / 100 x value",
    })
  }

  if (input.mode === "change") {
    const start = toNumber(input.startValue)
    const end = toNumber(input.endValue)
    const difference = end - start
    const percentChange = start === 0 ? null : (difference / Math.abs(start)) * 100

    return buildResult({
      label: "Percent change",
      value: percentChange === null ? "--" : `${formatNumber(percentChange)}%`,
      summary:
        percentChange === null
          ? "Starting value cannot be zero for percent change."
          : `${formatNumber(start)} to ${formatNumber(end)} is a ${formatNumber(percentChange)}% change.`,
      difference: formatNumber(difference),
      multiplier: start === 0 ? "--" : formatNumber(end / start),
      formula: "(new - old) / |old| x 100",
    })
  }

  if (input.mode === "ratio") {
    const part = toNumber(input.partValue)
    const whole = toNumber(input.wholeValue)
    const percent = whole === 0 ? null : (part / whole) * 100

    return buildResult({
      label: "Part as percent",
      value: percent === null ? "--" : `${formatNumber(percent)}%`,
      summary:
        percent === null
          ? "Whole value cannot be zero."
          : `${formatNumber(part)} is ${formatNumber(percent)}% of ${formatNumber(whole)}.`,
      difference: formatNumber(whole - part),
      multiplier: whole === 0 ? "--" : formatNumber(part / whole),
      formula: "part / whole x 100",
    })
  }

  const base = toNumber(input.adjustBase)
  const percent = toNumber(input.adjustPercent)
  const amount = (base * percent) / 100
  const adjusted = input.adjustDirection === "increase" ? base + amount : base - amount

  return buildResult({
    label: `${input.adjustDirection === "increase" ? "Increased" : "Decreased"} value`,
    value: formatNumber(adjusted),
    summary: `${formatNumber(base)} ${input.adjustDirection === "increase" ? "increased" : "decreased"} by ${formatNumber(percent)}% is ${formatNumber(adjusted)}.`,
    difference: formatNumber(amount),
    multiplier: formatNumber(input.adjustDirection === "increase" ? 1 + percent / 100 : 1 - percent / 100),
    formula: `value ${input.adjustDirection === "increase" ? "+" : "-"} value x p / 100`,
  })
}

function buildResult(result: {
  difference: string
  formula: string
  label: string
  multiplier: string
  summary: string
  value: string
}) {
  return result
}

function toNumber(value: string) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "--"
  }

  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 6,
  }).format(Number(value.toPrecision(12)))
}
