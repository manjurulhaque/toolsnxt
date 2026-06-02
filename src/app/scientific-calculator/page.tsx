"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type AngleMode = "deg" | "rad"

type HistoryItem = {
  expression: string
  result: string
}

type ButtonConfig = {
  label: string
  value: string
  tone?: "primary" | "accent" | "muted"
}

const buttons: ButtonConfig[] = [
  { label: "sin", value: "sin(", tone: "muted" },
  { label: "cos", value: "cos(", tone: "muted" },
  { label: "tan", value: "tan(", tone: "muted" },
  { label: "sqrt", value: "sqrt(", tone: "muted" },
  { label: "C", value: "clear", tone: "accent" },
  { label: "ln", value: "ln(", tone: "muted" },
  { label: "log", value: "log(", tone: "muted" },
  { label: "abs", value: "abs(", tone: "muted" },
  { label: "x^y", value: "^", tone: "muted" },
  { label: "Back", value: "backspace", tone: "accent" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "/", value: "/" },
  { label: "pi", value: "pi" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "*", value: "*" },
  { label: "e", value: "e" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "-", value: "-" },
  { label: "!", value: "!" },
  { label: "0", value: "0" },
  { label: ".", value: "." },
  { label: "(", value: "(" },
  { label: ")", value: ")" },
  { label: "+", value: "+" },
]

export default function ScientificCalculatorPage() {
  const [expression, setExpression] = useState("sin(30)+sqrt(144)")
  const [angleMode, setAngleMode] = useState<AngleMode>("deg")
  const [memory, setMemory] = useState(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [message, setMessage] = useState("Enter an expression or use the calculator keys.")

  const preview = useMemo(() => {
    if (!expression.trim()) {
      return ""
    }

    try {
      return formatResult(evaluateExpression(expression, angleMode))
    } catch {
      return ""
    }
  }, [angleMode, expression])

  function handleButton(button: ButtonConfig) {
    if (button.value === "clear") {
      setExpression("")
      setMessage("Expression cleared.")
      return
    }

    if (button.value === "backspace") {
      setExpression((current) => current.slice(0, -1))
      setMessage("Removed last character.")
      return
    }

    setExpression((current) => `${current}${button.value}`)
    setMessage(`${button.label} added.`)
  }

  function calculate() {
    if (!expression.trim()) {
      setMessage("Enter an expression before calculating.")
      return
    }

    try {
      const result = formatResult(evaluateExpression(expression, angleMode))
      setHistory((current) => [{ expression, result }, ...current].slice(0, 6))
      setExpression(result)
      setMessage("Calculated.")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not evaluate that expression.")
    }
  }

  function useResult(value: string) {
    setExpression(value)
    setMessage("Result loaded.")
  }

  function clearHistory() {
    setHistory([])
    setMessage("History cleared.")
  }

  function memoryAdd() {
    const value = getCurrentValue(expression, angleMode)
    if (value == null) {
      setMessage("Calculate a valid value before using memory.")
      return
    }

    setMemory((current) => current + value)
    setMessage("Added to memory.")
  }

  function memorySubtract() {
    const value = getCurrentValue(expression, angleMode)
    if (value == null) {
      setMessage("Calculate a valid value before using memory.")
      return
    }

    setMemory((current) => current - value)
    setMessage("Subtracted from memory.")
  }

  function memoryRecall() {
    setExpression((current) => `${current}${formatResult(memory)}`)
    setMessage("Memory recalled.")
  }

  function memoryClear() {
    setMemory(0)
    setMessage("Memory cleared.")
  }

  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            Quotations Archive
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
            Math tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Scientific Calculator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Evaluate scientific expressions with trig, logarithms, powers, roots, constants,
            factorials, memory, and degree or radian mode.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-1">
            {(["deg", "rad"] as AngleMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setAngleMode(mode)
                  setMessage(`${mode.toUpperCase()} mode selected.`)
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase transition ${
                  angleMode === mode
                    ? "bg-[var(--ink-900)] text-white"
                    : "text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <label htmlFor="expression" className="mt-6 block text-sm font-medium">
            Expression
          </label>
          <textarea
            id="expression"
            value={expression}
            onChange={(event) => {
              setExpression(event.target.value)
              setMessage("Expression updated.")
            }}
            rows={4}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xl leading-8 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="Example: sin(30)+sqrt(144)"
          />

          <div className="mt-5 rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
            <p className="text-sm text-[var(--ink-700)]">Live preview</p>
            <p className="mt-3 min-h-12 break-words font-mono text-4xl font-semibold text-[var(--ink-900)]">
              {preview || "--"}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={calculate}
              className="rounded-full bg-[var(--ink-900)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Calculate
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Keypad
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Functions</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {angleMode.toUpperCase()}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {buttons.map((button) => (
                <button
                  key={`${button.label}-${button.value}`}
                  type="button"
                  onClick={() => handleButton(button)}
                  className={`min-h-12 rounded-[1rem] px-2 py-3 text-sm font-semibold transition ${
                    button.tone === "primary"
                      ? "bg-[var(--ink-900)] text-white hover:bg-[var(--ink-800)]"
                      : button.tone === "accent"
                      ? "border border-[var(--accent-rust)]/25 bg-white text-[var(--accent-rust)] hover:border-[var(--accent-rust)]/45"
                      : button.tone === "muted"
                      ? "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-800)] hover:bg-white"
                      : "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-900)] hover:border-[var(--ink-900)]/25"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2">
              <MemoryButton label="M+" onClick={memoryAdd} />
              <MemoryButton label="M-" onClick={memorySubtract} />
              <MemoryButton label="MR" onClick={memoryRecall} />
              <MemoryButton label="MC" onClick={memoryClear} />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Tape
                </p>
                <h2 className="mt-2 text-2xl font-semibold">History</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                M = {formatResult(memory)}
              </p>
            </div>

            {history.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Completed calculations will appear here.
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {history.map((item, index) => (
                  <button
                    key={`${item.expression}-${index}`}
                    type="button"
                    onClick={() => useResult(item.result)}
                    className="w-full rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 text-left transition hover:bg-white"
                  >
                    <p className="truncate font-mono text-xs text-[var(--ink-700)]">{item.expression}</p>
                    <p className="mt-2 break-words font-mono text-xl font-semibold text-[var(--ink-900)]">
                      {item.result}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={clearHistory}
              className="mt-5 rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear History
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}

function MemoryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:bg-white"
    >
      {label}
    </button>
  )
}

function getCurrentValue(expression: string, angleMode: AngleMode) {
  try {
    return evaluateExpression(expression, angleMode)
  } catch {
    return null
  }
}

function evaluateExpression(expression: string, angleMode: AngleMode) {
  const parser = new ExpressionParser(expression, angleMode)
  const value = parser.parse()

  if (!Number.isFinite(value)) {
    throw new Error("Result is not a finite number.")
  }

  return value
}

class ExpressionParser {
  private index = 0

  constructor(private readonly input: string, private readonly angleMode: AngleMode) {}

  parse(): number {
    const value = this.parseExpression()
    this.skipSpaces()

    if (this.index < this.input.length) {
      throw new Error(`Unexpected "${this.input[this.index]}".`)
    }

    return value
  }

  private parseExpression(): number {
    let value = this.parseTerm()

    while (true) {
      this.skipSpaces()

      if (this.match("+")) {
        value += this.parseTerm()
      } else if (this.match("-")) {
        value -= this.parseTerm()
      } else {
        return value
      }
    }
  }

  private parseTerm(): number {
    let value = this.parsePower()

    while (true) {
      this.skipSpaces()

      if (this.match("*")) {
        value *= this.parsePower()
      } else if (this.match("/")) {
        value /= this.parsePower()
      } else if (this.match("%")) {
        value %= this.parsePower()
      } else {
        return value
      }
    }
  }

  private parsePower(): number {
    let value = this.parseUnary()
    this.skipSpaces()

    if (this.match("^")) {
      value = value ** this.parsePower()
    }

    return value
  }

  private parseUnary(): number {
    this.skipSpaces()

    if (this.match("+")) {
      return this.parseUnary()
    }

    if (this.match("-")) {
      return -this.parseUnary()
    }

    return this.parsePostfix()
  }

  private parsePostfix(): number {
    let value = this.parsePrimary()

    while (true) {
      this.skipSpaces()

      if (!this.match("!")) {
        return value
      }

      value = factorial(value)
    }
  }

  private parsePrimary(): number {
    this.skipSpaces()

    if (this.match("(")) {
      const value = this.parseExpression()
      this.expect(")")
      return value
    }

    if (this.isNumberStart()) {
      return this.parseNumber()
    }

    if (this.isIdentifierStart()) {
      const identifier = this.parseIdentifier().toLowerCase()

      if (identifier === "pi") {
        return Math.PI
      }

      if (identifier === "e") {
        return Math.E
      }

      this.expect("(")
      const value = this.parseExpression()
      this.expect(")")
      return this.applyFunction(identifier, value)
    }

    throw new Error("Expected a number, constant, function, or parenthesis.")
  }

  private applyFunction(name: string, value: number): number {
    switch (name) {
      case "sin":
        return Math.sin(this.toRadians(value))
      case "cos":
        return Math.cos(this.toRadians(value))
      case "tan":
        return Math.tan(this.toRadians(value))
      case "asin":
        return this.fromRadians(Math.asin(value))
      case "acos":
        return this.fromRadians(Math.acos(value))
      case "atan":
        return this.fromRadians(Math.atan(value))
      case "sqrt":
        return Math.sqrt(value)
      case "ln":
        return Math.log(value)
      case "log":
        return Math.log10(value)
      case "abs":
        return Math.abs(value)
      case "exp":
        return Math.exp(value)
      default:
        throw new Error(`Unknown function "${name}".`)
    }
  }

  private toRadians(value: number): number {
    return this.angleMode === "deg" ? (value * Math.PI) / 180 : value
  }

  private fromRadians(value: number): number {
    return this.angleMode === "deg" ? (value * 180) / Math.PI : value
  }

  private parseNumber(): number {
    const start = this.index

    while (/[0-9.]/.test(this.input[this.index] ?? "")) {
      this.index += 1
    }

    if (/[eE]/.test(this.input[this.index] ?? "")) {
      this.index += 1
      if (/[+-]/.test(this.input[this.index] ?? "")) {
        this.index += 1
      }
      while (/[0-9]/.test(this.input[this.index] ?? "")) {
        this.index += 1
      }
    }

    const value = Number(this.input.slice(start, this.index))
    if (!Number.isFinite(value)) {
      throw new Error("Invalid number.")
    }

    return value
  }

  private parseIdentifier(): string {
    const start = this.index

    while (/[A-Za-z]/.test(this.input[this.index] ?? "")) {
      this.index += 1
    }

    return this.input.slice(start, this.index)
  }

  private isNumberStart(): boolean {
    return /[0-9.]/.test(this.input[this.index] ?? "")
  }

  private isIdentifierStart(): boolean {
    return /[A-Za-z]/.test(this.input[this.index] ?? "")
  }

  private match(value: string): boolean {
    if (this.input.startsWith(value, this.index)) {
      this.index += value.length
      return true
    }

    return false
  }

  private expect(value: string) {
    this.skipSpaces()

    if (!this.match(value)) {
      throw new Error(`Expected "${value}".`)
    }
  }

  private skipSpaces() {
    while (/\s/.test(this.input[this.index] ?? "")) {
      this.index += 1
    }
  }
}

function factorial(value: number) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Factorial only works with non-negative integers.")
  }

  if (value > 170) {
    throw new Error("Factorial is too large.")
  }

  let result = 1
  for (let index = 2; index <= value; index += 1) {
    result *= index
  }

  return result
}

function formatResult(value: number) {
  if (Math.abs(value) >= 1e12 || (Math.abs(value) > 0 && Math.abs(value) < 1e-8)) {
    return value.toExponential(10).replace(/\.?0+e/, "e")
  }

  return Number(value.toPrecision(12)).toString()
}
