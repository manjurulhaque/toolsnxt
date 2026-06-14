"use client"

import { useMemo, useState } from "react"
import { SelectField, TextAreaField, TextField } from "@/components/form-controls"
import {
  ActionButton,
  CheckboxOption,
  InfoBox,
  PanelHeader,
  ToolIntro,
  ToolPage,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

type TypeMode = "interface" | "type"

const typeModeOptions: Array<{ value: TypeMode; label: string }> = [
  { value: "interface", label: "interface" },
  { value: "type", label: "type" },
]

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
      await copyToClipboard(result.output)
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
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="JSON to TypeScript">
            Infer TypeScript interfaces or type aliases from JSON, including nested objects, arrays,
            nullable values, and safe property names.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
              id="json-types-input"
              label="JSON input"
              value={jsonText}
              onChange={(value) => {
                setJsonText(value)
                setMessage("JSON updated.")
              }}
              rows={16}
              placeholder='{ "id": 1, "name": "Ada" }'
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={clearAll} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader
            eyebrow="Types"
            title="TypeScript Output"
            badge={result.error ? "Invalid JSON" : `${result.typeCount} types`}
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <TextField
              id="root-name"
              label="Root type name"
              value={rootName}
              onChange={(value) => {
                setRootName(value)
                setMessage("Root type name updated.")
              }}
            />
            <SelectField
              id="type-mode"
              label="Declaration"
              value={typeMode}
              options={typeModeOptions}
              onChange={(value) => {
                setTypeMode(value)
                setMessage("Declaration style updated.")
              }}
            />
          </div>

          <div className="mt-4">
            <CheckboxOption
              label="Use readonly properties"
              checked={readonlyFields}
              onChange={(checked) => {
                setReadonlyFields(checked)
                setMessage("Readonly setting updated.")
              }}
            />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="typescript-output"
              label="Generated TypeScript"
              value={result.output}
              readOnly
              rows={17}
              placeholder="Generated TypeScript will appear here..."
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InfoBox className="leading-normal">
              {result.error ?? message}
            </InfoBox>
            <ActionButton onClick={copyTypes}>
              Copy Types
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
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
