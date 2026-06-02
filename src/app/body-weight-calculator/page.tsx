"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type UnitSystem = "metric" | "us"
type Sex = "female" | "male"

type FormulaResult = {
  label: string
  weightKg: number
  description: string
}

const formulas = [
  {
    label: "Devine",
    description: "Often used in clinical dosing references.",
    femaleBase: 45.5,
    maleBase: 50,
    perInch: 2.3,
  },
  {
    label: "Robinson",
    description: "A slightly lower modern adult estimate.",
    femaleBase: 49,
    maleBase: 52,
    perInch: 1.7,
  },
  {
    label: "Miller",
    description: "A moderate adult estimate from height.",
    femaleBase: 53.1,
    maleBase: 56.2,
    perInch: 1.36,
  },
  {
    label: "Hamwi",
    description: "A traditional frame-size screening formula.",
    femaleBase: 45.5,
    maleBase: 48,
    perInch: 2.7,
  },
]

export default function BodyWeightCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric")
  const [sex, setSex] = useState<Sex>("female")
  const [heightCm, setHeightCm] = useState("170")
  const [heightFeet, setHeightFeet] = useState("5")
  const [heightInches, setHeightInches] = useState("7")

  const height = useMemo(
    () => getHeight(unitSystem, heightCm, heightFeet, heightInches),
    [heightCm, heightFeet, heightInches, unitSystem],
  )

  const results = useMemo(() => {
    if (!height) {
      return []
    }

    return calculateFormulaResults(height.totalInches, sex)
  }, [height, sex])

  const averageKg = results.length
    ? results.reduce((sum, result) => sum + result.weightKg, 0) / results.length
    : null

  const healthyRange = height ? getHealthyRange(height.meters) : null
  const displayedAverage = averageKg == null ? "--" : formatWeight(averageKg, unitSystem)
  const displayedRange = healthyRange
    ? `${formatWeight(healthyRange.lowKg, unitSystem)}-${formatWeight(healthyRange.highKg, unitSystem)}`
    : "Add height"

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
            Health tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Body Weight Calculator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Estimate adult ideal body weight from height using common formulas, then compare the
            result with a BMI-based healthy weight range.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
            {(["metric", "us"] as UnitSystem[]).map((system) => (
              <button
                key={system}
                type="button"
                onClick={() => setUnitSystem(system)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  unitSystem === system
                    ? "bg-[var(--ink-900)] text-white"
                    : "text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {system === "metric" ? "Metric" : "U.S."}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
            {(["female", "male"] as Sex[]).map((sexOption) => (
              <button
                key={sexOption}
                type="button"
                onClick={() => setSex(sexOption)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  sex === sexOption
                    ? "bg-[var(--ink-900)] text-white"
                    : "text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {capitalize(sexOption)}
              </button>
            ))}
          </div>

          {unitSystem === "metric" ? (
            <div className="mt-6">
              <NumberField
                id="height-cm"
                label="Height"
                suffix="cm"
                value={heightCm}
                onChange={setHeightCm}
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <NumberField
                id="height-ft"
                label="Feet"
                suffix="ft"
                value={heightFeet}
                onChange={setHeightFeet}
              />
              <NumberField
                id="height-in"
                label="Inches"
                suffix="in"
                value={heightInches}
                onChange={setHeightInches}
              />
            </div>
          )}

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
            Ideal weight formulas are screening estimates for adults. They do not account for body
            composition, pregnancy, athletic build, age, or medical history.
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Result
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Estimated Body Weight</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                Adult estimate
              </p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
              <p className="text-sm text-[var(--ink-700)]">Formula average</p>
              <p className="mt-3 text-5xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-6xl">
                {displayedAverage}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--ink-700)]">
                {averageKg == null
                  ? "Enter a valid height."
                  : "Average of Devine, Robinson, Miller, and Hamwi estimates."}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <SummaryTile label="Healthy BMI Range" value={displayedRange} />
              <SummaryTile
                label="Height"
                value={height ? formatHeight(height.totalInches, unitSystem) : "Not calculated"}
              />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Formulas
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Comparison</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {capitalize(sex)}
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {results.length === 0 ? (
                <div className="rounded-[1.2rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-6 text-center text-sm text-[var(--ink-700)]">
                  Formula results will appear after you enter a valid height.
                </div>
              ) : (
                results.map((result) => (
                  <div
                    key={result.label}
                    className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold">{result.label}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">
                          {result.description}
                        </p>
                      </div>
                      <p className="text-2xl font-semibold tabular-nums">
                        {formatWeight(result.weightKg, unitSystem)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

function NumberField({
  id,
  label,
  suffix,
  value,
  onChange,
}: {
  id: string
  label: string
  suffix: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2 flex overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] transition focus-within:border-[var(--accent-rust)]">
        <input
          id={id}
          type="number"
          min="0"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-2xl font-semibold outline-none"
        />
        <span className="flex items-center border-l border-[var(--ink-900)]/10 px-4 text-sm font-semibold text-[var(--ink-700)]">
          {suffix}
        </span>
      </div>
    </label>
  )
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  )
}

function getHeight(unitSystem: UnitSystem, heightCm: string, heightFeet: string, heightInches: string) {
  if (unitSystem === "metric") {
    const centimeters = Number(heightCm)

    if (!Number.isFinite(centimeters) || centimeters <= 0) {
      return null
    }

    return {
      meters: centimeters / 100,
      totalInches: centimeters / 2.54,
    }
  }

  const feet = Number(heightFeet)
  const inches = Number(heightInches)
  const totalInches = feet * 12 + inches

  if (!Number.isFinite(totalInches) || totalInches <= 0) {
    return null
  }

  return {
    meters: totalInches * 0.0254,
    totalInches,
  }
}

function calculateFormulaResults(totalInches: number, sex: Sex): FormulaResult[] {
  const inchesOverFiveFeet = Math.max(0, totalInches - 60)

  return formulas.map((formula) => {
    const base = sex === "female" ? formula.femaleBase : formula.maleBase

    return {
      label: formula.label,
      description: formula.description,
      weightKg: base + formula.perInch * inchesOverFiveFeet,
    }
  })
}

function getHealthyRange(heightMeters: number) {
  return {
    lowKg: 18.5 * heightMeters ** 2,
    highKg: 24.9 * heightMeters ** 2,
  }
}

function formatHeight(totalInches: number, unitSystem: UnitSystem) {
  if (unitSystem === "metric") {
    return `${formatNumber(totalInches * 2.54, 0)} cm`
  }

  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches - feet * 12)
  return `${feet} ft ${inches} in`
}

function formatWeight(weightKg: number, unitSystem: UnitSystem) {
  if (unitSystem === "us") {
    return `${formatNumber(weightKg / 0.45359237, 0)} lb`
  }

  return `${formatNumber(weightKg, 1)} kg`
}

function formatNumber(value: number, digits: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
