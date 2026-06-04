"use client"

import { useMemo, useState } from "react"
import { NumberField, SegmentedControl } from "@/components/form-controls"
import { InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { formatNumber } from "@/lib/numbers"

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

const unitOptions: Array<{ key: UnitSystem; label: string }> = [
  { key: "metric", label: "Metric" },
  { key: "us", label: "U.S." },
]

const sexOptions: Array<{ key: Sex; label: string }> = [
  { key: "female", label: "Female" },
  { key: "male", label: "Male" },
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
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Health tool" title="Body Weight Calculator">
            Estimate adult ideal body weight from height using common formulas, then compare the
            result with a BMI-based healthy weight range.
        </ToolIntro>

          <div className="mt-6">
            <SegmentedControl value={unitSystem} options={unitOptions} onChange={setUnitSystem} />
          </div>

          <div className="mt-5">
            <SegmentedControl value={sex} options={sexOptions} onChange={setSex} />
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

          <InfoBox className="mt-6">
            Ideal weight formulas are screening estimates for adults. They do not account for body
            composition, pregnancy, athletic build, age, or medical history.
          </InfoBox>
      </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Result" title="Estimated Body Weight" badge="Adult estimate" />

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
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formulas" title="Comparison" badge={capitalize(sex)} />

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
          </ToolPanel>
        </div>
    </ToolPage>
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

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
