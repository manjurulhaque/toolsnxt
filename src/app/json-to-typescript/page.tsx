"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type TypeMode = "interface" | "type"

const sampleJson = `{
  "id": "tool_123",
  "title": "JSON to TypeScript",
  "published": true,
  "stats": {
    "views": 1280,
    "rating": 4.8
  },
  "tags": ["developer", "json", "typescript"],
  "authors": [
    {
      "name": "Ada Lovelace",
      "role": "Editor"
    }
  ],
  "updatedAt": null
}`

export default function JsonToTypeScriptPage() {
  const [jsonText, setJsonText] = useState(sampleJson)
  const [rootName, setRootName] = useState("Root")
  const [typeMode, setTypeMode] = useState<TypeMode>("interface")
  const [readonlyFields, setReadonlyFields] = useState(false)
  const [message, setMessage] = useState("Paste JSON to infer TypeScript types.")

  const result = useMemo(
    () => generateTypes(jsonText, sanitizeTypeName(rootName) || "Root", typeMode, readonlyFields),
    [jsonText, readonlyFields, rootName, typeMode],
  )

  async function copyTypes() {
    if (!result.output.trim()) {
      setMessage("Add valid JSON before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(result.output)
      setMessage("TypeScript copied.")
    } catch {
      setMessage("Copy failed. Select the output and copy it manually.")
    }
  }

  function clearAll() {
    setJsonText("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setJsonText(sampleJson)
    setRootName("Root")
    setTypeMode("interface")
    setReadonlyFields(false)
    setMessage("Sample JSON loaded.")
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">JSON to TypeScript</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Infer TypeScript interfaces or type aliases from JSON, including nested objects, arrays,
            nullable values, and safe property names.
          </p>

          <label htmlFor="json-types-input" className="mt-6 block text-sm font-medium">
            JSON input
          </label>
          <textarea
            id="json-types-input"
            value={jsonText}
            onChange={(event) => {
              setJsonText(event.target.value)
              setMessage("JSON updated.")
            }}
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder='{ "id": 1, "name": "Ada" }'
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Types
              </p>
              <h2 className="mt-2 text-2xl font-semibold">TypeScript Output</h2>
            </div>
            <p
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                result.error ? "bg-red-50 text-red-700" : "bg-[var(--page-cream)] text-[var(--ink-700)]"
              }`}
            >
              {result.error ? "Invalid JSON" : `${result.typeCount} types`}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label htmlFor="root-name" className="block">
              <span className="text-sm font-medium">Root type name</span>
              <input
                id="root-name"
                value={rootName}
                onChange={(event) => {
                  setRootName(event.target.value)
                  setMessage("Root type name updated.")
                }}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
              />
            </label>
            <label htmlFor="type-mode" className="block">
              <span className="text-sm font-medium">Declaration</span>
              <select
                id="type-mode"
                value={typeMode}
                onChange={(event) => {
                  setTypeMode(event.target.value as TypeMode)
                  setMessage("Declaration style updated.")
                }}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
              >
                <option value="interface">interface</option>
                <option value="type">type</option>
              </select>
            </label>
          </div>

          <label className="mt-4 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium text-[var(--ink-800)]">
            <input
              type="checkbox"
              checked={readonlyFields}
              onChange={(event) => {
                setReadonlyFields(event.target.checked)
                setMessage("Readonly setting updated.")
              }}
              className="h-4 w-4 accent-[var(--ink-900)]"
            />
            Use readonly properties
          </label>

          <textarea
            value={result.output}
            readOnly
            rows={17}
            spellCheck={false}
            className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Generated TypeScript will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {result.error ?? message}
            </div>
            <button
              type="button"
              onClick={copyTypes}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Types
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function generateTypes(value: string, rootName: string, typeMode: TypeMode, readonlyFields: boolean) {
  if (!value.trim()) {
    return { output: "", error: null, typeCount: 0 }
  }

  try {
    const parsedJson: unknown = JSON.parse(value)
    const declarations = new Map<string, string>()
    const rootType = inferType(parsedJson, rootName, declarations, typeMode, readonlyFields)

    if (!declarations.has(rootName)) {
      declarations.set(rootName, `export type ${rootName} = ${rootType}`)
    }

    return {
      output: Array.from(declarations.values()).join("\n\n"),
      error: null,
      typeCount: declarations.size,
    }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Invalid JSON.",
      typeCount: 0,
    }
  }
}

function inferType(
  value: unknown,
  typeName: string,
  declarations: Map<string, string>,
  typeMode: TypeMode,
  readonlyFields: boolean,
): string {
  if (value === null) {
    return "null"
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "unknown[]"
    }

    const itemTypes = Array.from(
      new Set(value.map((item) => inferType(item, singularize(typeName), declarations, typeMode, readonlyFields))),
    )
    const union = itemTypes.length === 1 ? itemTypes[0] : `(${itemTypes.join(" | ")})`
    return `${union}[]`
  }

  if (typeof value === "object") {
    const safeTypeName = sanitizeTypeName(typeName)
    const entries = Object.entries(value as Record<string, unknown>)
    const lines = entries.map(([key, item]) => {
      const childTypeName = sanitizeTypeName(`${safeTypeName}${toPascalCase(key)}`)
      const optional = item === null ? "?" : ""
      const propertyName = isValidIdentifier(key) ? key : JSON.stringify(key)
      const itemType = inferType(item, childTypeName, declarations, typeMode, readonlyFields)
      return `  ${readonlyFields ? "readonly " : ""}${propertyName}${optional}: ${itemType};`
    })

    const body = lines.length > 0 ? lines.join("\n") : "  [key: string]: unknown;"
    const declaration =
      typeMode === "interface"
        ? `export interface ${safeTypeName} {\n${body}\n}`
        : `export type ${safeTypeName} = {\n${body}\n}`
    declarations.set(safeTypeName, declaration)

    return safeTypeName
  }

  if (typeof value === "string") {
    return "string"
  }

  if (typeof value === "number") {
    return "number"
  }

  if (typeof value === "boolean") {
    return "boolean"
  }

  return "unknown"
}

function sanitizeTypeName(value: string) {
  const name = toPascalCase(value).replace(/^[^A-Z]+/i, "")
  return name || "Root"
}

function toPascalCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("")
}

function singularize(value: string) {
  return value.endsWith("s") ? value.slice(0, -1) : `${value}Item`
}

function isValidIdentifier(value: string) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)
}
