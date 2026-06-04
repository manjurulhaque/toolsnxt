"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type CategoryKey = "length" | "mass" | "temperature" | "volume" | "area" | "speed"

type LinearUnit = {
  key: string
  label: string
  symbol: string
  toBase: number
}

type TemperatureUnit = {
  key: "celsius" | "fahrenheit" | "kelvin"
  label: string
  symbol: string
}

type Unit = LinearUnit | TemperatureUnit

type Category = {
  label: string
  baseLabel: string
  units: Unit[]
}

const categories: Record<CategoryKey, Category> = {
  length: {
    label: "Length",
    baseLabel: "meters",
    units: [
      { key: "millimeter", label: "Millimeter", symbol: "mm", toBase: 0.001 },
      { key: "centimeter", label: "Centimeter", symbol: "cm", toBase: 0.01 },
      { key: "meter", label: "Meter", symbol: "m", toBase: 1 },
      { key: "kilometer", label: "Kilometer", symbol: "km", toBase: 1000 },
      { key: "inch", label: "Inch", symbol: "in", toBase: 0.0254 },
      { key: "foot", label: "Foot", symbol: "ft", toBase: 0.3048 },
      { key: "yard", label: "Yard", symbol: "yd", toBase: 0.9144 },
      { key: "mile", label: "Mile", symbol: "mi", toBase: 1609.344 },
    ],
  },
  mass: {
    label: "Weight",
    baseLabel: "grams",
    units: [
      { key: "milligram", label: "Milligram", symbol: "mg", toBase: 0.001 },
      { key: "gram", label: "Gram", symbol: "g", toBase: 1 },
      { key: "kilogram", label: "Kilogram", symbol: "kg", toBase: 1000 },
      { key: "ounce", label: "Ounce", symbol: "oz", toBase: 28.349523125 },
      { key: "pound", label: "Pound", symbol: "lb", toBase: 453.59237 },
      { key: "stone", label: "Stone", symbol: "st", toBase: 6350.29318 },
    ],
  },
  temperature: {
    label: "Temperature",
    baseLabel: "celsius",
    units: [
      { key: "celsius", label: "Celsius", symbol: "C" },
      { key: "fahrenheit", label: "Fahrenheit", symbol: "F" },
      { key: "kelvin", label: "Kelvin", symbol: "K" },
    ],
  },
  volume: {
    label: "Volume",
    baseLabel: "liters",
    units: [
      { key: "milliliter", label: "Milliliter", symbol: "ml", toBase: 0.001 },
      { key: "liter", label: "Liter", symbol: "L", toBase: 1 },
      { key: "cubic-meter", label: "Cubic Meter", symbol: "m3", toBase: 1000 },
      { key: "teaspoon", label: "Teaspoon", symbol: "tsp", toBase: 0.00492892159 },
      { key: "tablespoon", label: "Tablespoon", symbol: "tbsp", toBase: 0.0147867648 },
      { key: "cup", label: "Cup", symbol: "cup", toBase: 0.2365882365 },
      { key: "pint", label: "Pint", symbol: "pt", toBase: 0.473176473 },
      { key: "gallon", label: "Gallon", symbol: "gal", toBase: 3.785411784 },
    ],
  },
  area: {
    label: "Area",
    baseLabel: "square meters",
    units: [
      { key: "square-meter", label: "Square Meter", symbol: "m2", toBase: 1 },
      { key: "square-kilometer", label: "Square Kilometer", symbol: "km2", toBase: 1_000_000 },
      { key: "square-foot", label: "Square Foot", symbol: "ft2", toBase: 0.09290304 },
      { key: "square-yard", label: "Square Yard", symbol: "yd2", toBase: 0.83612736 },
      { key: "acre", label: "Acre", symbol: "ac", toBase: 4046.8564224 },
      { key: "hectare", label: "Hectare", symbol: "ha", toBase: 10000 },
    ],
  },
  speed: {
    label: "Speed",
    baseLabel: "meters per second",
    units: [
      { key: "meter-second", label: "Meter per Second", symbol: "m/s", toBase: 1 },
      { key: "kilometer-hour", label: "Kilometer per Hour", symbol: "km/h", toBase: 0.2777777778 },
      { key: "mile-hour", label: "Mile per Hour", symbol: "mph", toBase: 0.44704 },
      { key: "foot-second", label: "Foot per Second", symbol: "ft/s", toBase: 0.3048 },
      { key: "knot", label: "Knot", symbol: "kn", toBase: 0.5144444444 },
    ],
  },
}

const categoryKeys = Object.keys(categories) as CategoryKey[]

export default function UnitConverterPage() {
  const [categoryKey, setCategoryKey] = useState<CategoryKey>("length")
  const [fromUnitKey, setFromUnitKey] = useState(categories.length.units[2].key)
  const [toUnitKey, setToUnitKey] = useState(categories.length.units[5].key)
  const [inputValue, setInputValue] = useState("1")

  const category = categories[categoryKey]
  const fromUnit = category.units.find((unit) => unit.key === fromUnitKey) ?? category.units[0]
  const toUnit = category.units.find((unit) => unit.key === toUnitKey) ?? category.units[1] ?? category.units[0]
  const numericValue = Number(inputValue)
  const hasValidInput = inputValue.trim() !== "" && Number.isFinite(numericValue)

  const convertedValue = useMemo(() => {
    if (!hasValidInput) {
      return null
    }

    return convertValue(numericValue, fromUnit, toUnit, categoryKey)
  }, [categoryKey, fromUnit, hasValidInput, numericValue, toUnit])

  const comparisonRows = useMemo(() => {
    if (!hasValidInput) {
      return []
    }

    return category.units.map((unit) => ({
      unit,
      value: convertValue(numericValue, fromUnit, unit, categoryKey),
    }))
  }, [category.units, categoryKey, fromUnit, hasValidInput, numericValue])

  function selectCategory(nextCategoryKey: CategoryKey) {
    const nextCategory = categories[nextCategoryKey]
    setCategoryKey(nextCategoryKey)
    setFromUnitKey(nextCategory.units[0].key)
    setToUnitKey(nextCategory.units[1]?.key ?? nextCategory.units[0].key)
  }

  function swapUnits() {
    setFromUnitKey(toUnit.key)
    setToUnitKey(fromUnit.key)
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Everyday tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Unit Converter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert common measurements across length, weight, temperature, volume, area, and speed
            with quick side-by-side results.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categoryKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectCategory(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  categoryKey === key
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {categories[key].label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <label htmlFor="converter-value" className="block text-sm font-medium">
              Value
            </label>
            <input
              id="converter-value"
              type="number"
              inputMode="decimal"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <UnitSelect
              id="from-unit"
              label="From"
              units={category.units}
              value={fromUnit.key}
              onChange={setFromUnitKey}
            />
            <button
              type="button"
              onClick={swapUnits}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Swap
            </button>
            <UnitSelect
              id="to-unit"
              label="To"
              units={category.units}
              value={toUnit.key}
              onChange={setToUnitKey}
            />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Result
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{category.label} Conversion</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              Base: {category.baseLabel}
            </p>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">
              {formatInput(inputValue)} {fromUnit.symbol} equals
            </p>
            <p className="mt-3 break-words text-4xl font-semibold tabular-nums text-[var(--ink-900)] sm:text-5xl">
              {convertedValue == null ? "Enter a number" : formatNumber(convertedValue)}
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--ink-700)]">{toUnit.label}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              All {category.label} Units
            </h3>
            <div className="mt-3 grid gap-2">
              {comparisonRows.map((row) => (
                <div
                  key={row.unit.key}
                  className={`flex items-center justify-between gap-4 rounded-[1.1rem] border px-4 py-3 text-sm ${
                    row.unit.key === toUnit.key
                      ? "border-[var(--accent-rust)]/35 bg-[var(--accent-rust)]/8"
                      : "border-[var(--ink-900)]/8 bg-white"
                  }`}
                >
                  <span className="font-medium">{row.unit.label}</span>
                  <span className="text-right font-semibold tabular-nums text-[var(--ink-800)]">
                    {formatNumber(row.value)} {row.unit.symbol}
                  </span>
                </div>
              ))}
              {!hasValidInput ? (
                <div className="rounded-[1.2rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-5 text-sm text-[var(--ink-700)]">
                  Enter a number to see every matching unit.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function UnitSelect({
  id,
  label,
  units,
  value,
  onChange,
}: {
  id: string
  label: string
  units: Unit[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      >
        {units.map((unit) => (
          <option key={unit.key} value={unit.key}>
            {unit.label} ({unit.symbol})
          </option>
        ))}
      </select>
    </label>
  )
}

function convertValue(value: number, fromUnit: Unit, toUnit: Unit, categoryKey: CategoryKey) {
  if (categoryKey === "temperature") {
    return celsiusToTemperature(temperatureToCelsius(value, fromUnit.key), toUnit.key)
  }

  return (value * (fromUnit as LinearUnit).toBase) / (toUnit as LinearUnit).toBase
}

function temperatureToCelsius(value: number, unitKey: Unit["key"]) {
  if (unitKey === "fahrenheit") {
    return (value - 32) * (5 / 9)
  }

  if (unitKey === "kelvin") {
    return value - 273.15
  }

  return value
}

function celsiusToTemperature(value: number, unitKey: Unit["key"]) {
  if (unitKey === "fahrenheit") {
    return value * (9 / 5) + 32
  }

  if (unitKey === "kelvin") {
    return value + 273.15
  }

  return value
}

function formatNumber(value: number) {
  if (Math.abs(value) >= 1_000_000 || (Math.abs(value) > 0 && Math.abs(value) < 0.0001)) {
    return value.toExponential(6)
  }

  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 8,
  }).format(value)
}

function formatInput(value: string) {
  return value.trim() === "" ? "0" : value
}
