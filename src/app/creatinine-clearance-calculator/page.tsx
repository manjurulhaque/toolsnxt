"use client"

import { useMemo, useState } from "react"
import { NumberField, SegmentedControl } from "@/components/form-controls"
import { InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"

type Sex = "male" | "female"
type WeightUnit = "kg" | "lb"
type CreatinineUnit = "mgdl" | "umol"

const sexOptions: Array<{ key: Sex; label: string }> = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
]

const weightUnitOptions: Array<{ key: WeightUnit; label: string }> = [
  { key: "kg", label: "kg" },
  { key: "lb", label: "lb" },
]

const creatinineUnitOptions: Array<{ key: CreatinineUnit; label: string }> = [
  { key: "mgdl", label: "mg/dL" },
  { key: "umol", label: "µmol/L" },
]

export default function CreatinineClearanceCalculatorPage() {
  const [sex, setSex] = useState<Sex>("male")
  const [age, setAge] = useState("55")
  const [weight, setWeight] = useState("80")
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg")
  const [creatinine, setCreatinine] = useState("1.1")
  const [creatinineUnit, setCreatinineUnit] = useState<CreatinineUnit>("mgdl")

  const result = useMemo(
    () => calculateCreatinineClearance({ age, creatinine, creatinineUnit, sex, weight, weightUnit }),
    [age, creatinine, creatinineUnit, sex, weight, weightUnit],
  )

  function loadExample() {
    setSex("male")
    setAge("55")
    setWeight("80")
    setWeightUnit("kg")
    setCreatinine("1.1")
    setCreatinineUnit("mgdl")
  }

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Health tool" title="Creatinine Clearance Calculator">
          Estimate adult creatinine clearance using the Cockcroft-Gault equation with common weight
          and serum creatinine units.
        </ToolIntro>

        <div className="mt-6 grid gap-5">
          <SegmentedControl value={sex} options={sexOptions} onChange={setSex} />

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id="age" label="Age" value={age} onChange={setAge} min="18" suffix="years" />
            <NumberField
              id="weight"
              label="Body weight"
              value={weight}
              onChange={setWeight}
              min="0"
              suffix={weightUnit}
            />
          </div>

          <SegmentedControl value={weightUnit} options={weightUnitOptions} onChange={setWeightUnit} />

          <NumberField
            id="creatinine"
            label="Serum creatinine"
            value={creatinine}
            onChange={setCreatinine}
            min="0"
            suffix={creatinineUnit === "mgdl" ? "mg/dL" : "µmol/L"}
          />

          <SegmentedControl
            value={creatinineUnit}
            options={creatinineUnitOptions}
            onChange={setCreatinineUnit}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={loadExample}
            className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
          >
            Load Example
          </button>
        </div>

        <InfoBox className="mt-6">
          This estimate is for adult educational use and is not a diagnosis. Clinical decisions,
          medication dosing, pregnancy, acute kidney injury, extremes of body size, or unusual muscle
          mass should be reviewed with a qualified clinician.
        </InfoBox>
      </ToolPanel>

      <div className="space-y-6">
        <ToolPanel>
          <PanelHeader
            eyebrow="Result"
            title="Estimated Creatinine Clearance"
            badge={result.isValid ? "Cockcroft-Gault" : "Check input"}
          />

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">Creatinine clearance</p>
            <p className="mt-3 break-words text-5xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-6xl">
              {result.isValid ? `${formatNumber(result.clearance)} mL/min` : "--"}
            </p>
            <p className="mt-3 text-sm font-medium leading-6 text-[var(--ink-700)]">
              {result.message}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <SummaryTile label="Weight Used" value={result.isValid ? `${formatNumber(result.weightKg)} kg` : "--"} />
            <SummaryTile
              label="Creatinine Used"
              value={result.isValid ? `${formatNumber(result.creatinineMgDl)} mg/dL` : "--"}
            />
            <SummaryTile label="Sex Factor" value={sex === "female" ? "0.85" : "1.00"} />
            <SummaryTile label="Formula" value="(140 - age) x kg x factor / (72 x SCr)" />
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Details" title="Calculation Notes" badge="mL/min" />

          <div className="mt-6 space-y-4">
            <InfoBox>
              Cockcroft-Gault estimates creatinine clearance from age, body weight, sex, and serum
              creatinine. It uses serum creatinine in mg/dL and body weight in kilograms.
            </InfoBox>
            <InfoBox>
              If serum creatinine is entered in µmol/L, this tool converts it to mg/dL by dividing
              by 88.4 before applying the equation.
            </InfoBox>
            <InfoBox>
              The equation is commonly used for creatinine clearance estimates, but estimated GFR
              equations and measured clearance may be preferred depending on the clinical question.
            </InfoBox>
          </div>
        </ToolPanel>
      </div>
    </ToolPage>
  )
}

function calculateCreatinineClearance(input: {
  age: string
  creatinine: string
  creatinineUnit: CreatinineUnit
  sex: Sex
  weight: string
  weightUnit: WeightUnit
}) {
  const age = Number(input.age)
  const weight = Number(input.weight)
  const creatinine = Number(input.creatinine)

  if (
    !Number.isFinite(age) ||
    !Number.isFinite(weight) ||
    !Number.isFinite(creatinine) ||
    age <= 0 ||
    weight <= 0 ||
    creatinine <= 0
  ) {
    return {
      isValid: false,
      clearance: 0,
      weightKg: 0,
      creatinineMgDl: 0,
      message: "Enter age, weight, and serum creatinine values greater than zero.",
    }
  }

  const weightKg = input.weightUnit === "kg" ? weight : weight / 2.2046226218
  const creatinineMgDl = input.creatinineUnit === "mgdl" ? creatinine : creatinine / 88.4
  const sexFactor = input.sex === "female" ? 0.85 : 1
  const clearance = ((140 - age) * weightKg * sexFactor) / (72 * creatinineMgDl)

  return {
    isValid: Number.isFinite(clearance) && clearance > 0,
    clearance,
    weightKg,
    creatinineMgDl,
    message:
      clearance > 0
        ? `Using ${formatNumber(weightKg)} kg and ${formatNumber(creatinineMgDl)} mg/dL serum creatinine.`
        : "The Cockcroft-Gault equation is not valid for these inputs.",
  }
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "--"
  }

  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(value)
}
