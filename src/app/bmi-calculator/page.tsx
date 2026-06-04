"use client"

import { useMemo, useState } from "react"
import { NumberField } from "@/components/form-controls"
import { InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { formatNumber } from "@/lib/numbers"

type UnitSystem = "metric" | "us"

type BmiCategory = {
  label: string
  range: string
  tone: string
  description: string
}

const bmiCategories: BmiCategory[] = [
  {
    label: "Underweight",
    range: "Below 18.5",
    tone: "bg-sky-500",
    description: "Below the adult healthy weight range.",
  },
  {
    label: "Healthy Weight",
    range: "18.5 to less than 25",
    tone: "bg-emerald-500",
    description: "Within the adult healthy weight range.",
  },
  {
    label: "Overweight",
    range: "25 to less than 30",
    tone: "bg-[var(--accent-gold)]",
    description: "Above the adult healthy weight range.",
  },
  {
    label: "Obesity",
    range: "30 or greater",
    tone: "bg-[var(--accent-rust)]",
    description: "In the adult obesity BMI range.",
  },
]

export default function BmiCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric")
  const [heightCm, setHeightCm] = useState("170")
  const [weightKg, setWeightKg] = useState("70")
  const [heightFeet, setHeightFeet] = useState("5")
  const [heightInches, setHeightInches] = useState("9")
  const [weightPounds, setWeightPounds] = useState("165")

  const bmi = useMemo(() => {
    const heightMeters = getHeightMeters(unitSystem, heightCm, heightFeet, heightInches)
    const weightKilograms = getWeightKilograms(unitSystem, weightKg, weightPounds)

    if (!heightMeters || !weightKilograms) {
      return null
    }

    return weightKilograms / heightMeters ** 2
  }, [heightCm, heightFeet, heightInches, unitSystem, weightKg, weightPounds])

  const activeCategory = bmi == null ? null : getBmiCategory(bmi)
  const healthyRange = useMemo(() => {
    const heightMeters = getHeightMeters(unitSystem, heightCm, heightFeet, heightInches)

    if (!heightMeters) {
      return null
    }

    const lowKg = 18.5 * heightMeters ** 2
    const highKg = 24.9 * heightMeters ** 2

    if (unitSystem === "us") {
      return `${formatNumber(kgToPounds(lowKg), 0)}-${formatNumber(kgToPounds(highKg), 0)} lb`
    }

    return `${formatNumber(lowKg, 1)}-${formatNumber(highKg, 1)} kg`
  }, [heightCm, heightFeet, heightInches, unitSystem])

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Health tool" title="BMI Calculator">
            Estimate adult body mass index from height and weight. BMI is a screening measure and
            works best when considered alongside other health factors.
        </ToolIntro>

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

          {unitSystem === "metric" ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <NumberField
                id="height-cm"
                label="Height"
                suffix="cm"
                value={heightCm}
                onChange={setHeightCm}
              />
              <NumberField
                id="weight-kg"
                label="Weight"
                suffix="kg"
                value={weightKg}
                onChange={setWeightKg}
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
              <NumberField
                id="weight-lb"
                label="Weight"
                suffix="lb"
                value={weightPounds}
                onChange={setWeightPounds}
              />
            </div>
          )}

          <InfoBox className="mt-6">
            Adult categories follow CDC BMI ranges. For children and teens, BMI is interpreted by
            age and sex percentiles.
          </InfoBox>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Result" title="Your BMI" badge="Adult screening" />

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">BMI score</p>
            <p className="mt-3 text-6xl font-semibold tabular-nums text-[var(--ink-900)]">
              {bmi == null ? "--" : formatNumber(bmi, 1)}
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--ink-700)]">
              {activeCategory?.description ?? "Enter a valid height and weight."}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <SummaryTile label="Category" value={activeCategory?.label ?? "Not calculated"} />
            <SummaryTile label="Healthy Range" value={healthyRange ?? "Add height"} />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Adult BMI Categories
            </h3>
            <div className="mt-3 grid gap-2">
              {bmiCategories.map((category) => (
                <div
                  key={category.label}
                  className={`flex items-center justify-between gap-4 rounded-[1.1rem] border px-4 py-3 text-sm ${
                    activeCategory?.label === category.label
                      ? "border-[var(--accent-rust)]/35 bg-[var(--accent-rust)]/8"
                      : "border-[var(--ink-900)]/8 bg-white"
                  }`}
                >
                  <span className="flex items-center gap-3 font-medium">
                    <span className={`h-2.5 w-2.5 rounded-full ${category.tone}`} />
                    {category.label}
                  </span>
                  <span className="text-right text-[var(--ink-700)]">{category.range}</span>
                </div>
              ))}
            </div>
          </div>
      </ToolPanel>
    </ToolPage>
  )
}

function getHeightMeters(unitSystem: UnitSystem, heightCm: string, heightFeet: string, heightInches: string) {
  if (unitSystem === "metric") {
    const centimeters = Number(heightCm)
    return centimeters > 0 ? centimeters / 100 : null
  }

  const feet = Number(heightFeet)
  const inches = Number(heightInches)
  const totalInches = feet * 12 + inches
  return totalInches > 0 ? totalInches * 0.0254 : null
}

function getWeightKilograms(unitSystem: UnitSystem, weightKg: string, weightPounds: string) {
  const weight = Number(unitSystem === "metric" ? weightKg : weightPounds)

  if (!Number.isFinite(weight) || weight <= 0) {
    return null
  }

  return unitSystem === "metric" ? weight : weight * 0.45359237
}

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) {
    return bmiCategories[0]
  }

  if (bmi < 25) {
    return bmiCategories[1]
  }

  if (bmi < 30) {
    return bmiCategories[2]
  }

  return bmiCategories[3]
}

function kgToPounds(value: number) {
  return value / 0.45359237
}
