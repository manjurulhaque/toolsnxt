"use client"

import { ChangeEvent, useMemo, useState } from "react"
import { FilePicker, SegmentedControl, TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, downloadBlob, getTextStats } from "@/lib/browser-actions"

type Mode = "encode" | "decode"
type OutputMode = "plain" | "data-url"

const sampleText = "Fast browser utilities"

const modeOptions: Array<{ key: Mode; label: string }> = [
  { key: "encode", label: "Encode" },
  { key: "decode", label: "Decode" },
]

const outputOptions: Array<{ key: OutputMode; label: string }> = [
  { key: "plain", label: "Plain" },
  { key: "data-url", label: "Data URL" },
]

export default function Base64EncoderDecoderPage() {
  const [mode, setMode] = useState<Mode>("encode")
  const [inputText, setInputText] = useState(sampleText)
  const [fileName, setFileName] = useState("")
  const [fileType, setFileType] = useState("")
  const [outputMode, setOutputMode] = useState<OutputMode>("plain")
  const [message, setMessage] = useState("Encode text, decode Base64, or convert a file locally.")

  const result = useMemo(
    () => transformBase64(inputText, mode, outputMode, fileType),
    [fileType, inputText, mode, outputMode],
  )
  const inputStats = useMemo(() => getTextStats(inputText), [inputText])
  const outputStats = useMemo(() => getTextStats(result.output), [result.output])

  function handleTextChange(value: string) {
    setInputText(value)
    setFileName("")
    setFileType("")
    setMessage("Input updated.")
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setMessage("Choose a file.")
      return
    }

    try {
      const base64 = await fileToBase64(file)
      setMode("encode")
      setInputText(base64)
      setFileName(file.name)
      setFileType(file.type || "application/octet-stream")
      setOutputMode("plain")
      setMessage(`${file.name} converted to Base64.`)
    } catch (error) {
      console.error("Base64 file conversion failed", error)
      setMessage("That file could not be converted.")
    } finally {
      event.target.value = ""
    }
  }

  async function copyOutput() {
    if (!result.output.trim()) {
      setMessage("Add input before copying.")
      return
    }

    try {
      await copyToClipboard(result.output)
      setMessage("Result copied.")
    } catch {
      setMessage("Copy failed. Select the result and copy it manually.")
    }
  }

  function swapResultToInput() {
    if (!result.output || result.error) {
      setMessage("Create a valid result before swapping.")
      return
    }

    setInputText(result.output)
    setFileName("")
    setFileType("")
    setMode(mode === "encode" ? "decode" : "encode")
    setOutputMode("plain")
    setMessage("Result moved to input.")
  }

  function clearAll() {
    setInputText("")
    setFileName("")
    setFileType("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setMode("encode")
    setInputText(sampleText)
    setFileName("")
    setFileType("")
    setOutputMode("plain")
    setMessage("Sample text loaded.")
  }

  function downloadDecodedFile() {
    const decoded = decodeBase64ToBytes(inputText)

    if (!decoded) {
      setMessage("Paste valid Base64 before downloading decoded bytes.")
      return
    }

    const blob = new Blob([decoded], { type: fileType || "application/octet-stream" })
    downloadBlob(blob, fileName ? `decoded-${fileName}` : "decoded-file")
    setMessage("Decoded file downloaded.")
  }

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="Base64 Encoder / Decoder">
            Encode text, decode Base64, or turn a file into a Base64 string in your browser.
        </ToolIntro>

          <div className="mt-6">
            <SegmentedControl
              value={mode}
              options={modeOptions}
              onChange={(nextMode) => {
                setMode(nextMode)
                setOutputMode("plain")
                setMessage(`${nextMode === "encode" ? "Encode" : "Decode"} mode selected.`)
              }}
            />
          </div>

          <div className="mt-6">
            <TextAreaField
              id="base64-input"
              label="Input"
              value={inputText}
              onChange={handleTextChange}
              rows={12}
              placeholder={mode === "encode" ? "Paste text to encode..." : "Paste Base64 to decode..."}
            />
          </div>

          <div className="mt-4">
            <FilePicker
              label="Choose file"
              description="Convert file bytes into Base64 text"
              onChange={handleFile}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={inputStats.characters} />
            <SummaryTile label="Lines" value={inputStats.lines} />
            <SummaryTile label="Bytes" value={inputStats.bytes} />
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader
            eyebrow="Transform"
            title="Output"
            badge={result.error ? "Check input" : `${outputStats.characters} chars`}
          />

          {mode === "encode" ? (
            <div className="mt-6">
              <SegmentedControl
                value={outputMode}
                options={outputOptions}
                onChange={(nextMode) => {
                  setOutputMode(nextMode)
                  setMessage(`${nextMode === "plain" ? "Plain Base64" : "Data URL"} output selected.`)
                }}
              />
            </div>
          ) : null}

          <div className="mt-6">
            <TextAreaField
              id="base64-output"
              label="Result"
              value={result.output}
              readOnly
              rows={12}
              placeholder="Transformed text will appear here..."
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={copyOutput}>
              Copy Result
            </ActionButton>
            <ActionButton onClick={swapResultToInput} variant="secondary">
              Swap
            </ActionButton>
            <ActionButton onClick={clearAll} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
          </div>

          <ActionButton
            onClick={downloadDecodedFile}
            variant="secondary"
            disabled={mode !== "decode" || !inputText.trim()}
            className="mt-3 w-full border-[var(--accent-rust)]/25 text-[var(--accent-rust)] hover:border-[var(--accent-rust)]/45"
          >
            Download Decoded Bytes
          </ActionButton>

          <InfoBox className="mt-5 leading-normal">
            {result.error ?? message}
          </InfoBox>
      </ToolPanel>
    </ToolPage>
  )
}

function transformBase64(value: string, mode: Mode, outputMode: OutputMode, fileType: string) {
  if (!value.trim()) {
    return { output: "", error: null }
  }

  try {
    if (mode === "encode") {
      const base64 = isLikelyBase64(value) ? cleanBase64(value) : encodeText(value)
      return {
        output: outputMode === "data-url" ? `data:${fileType || "text/plain"};base64,${base64}` : base64,
        error: null,
      }
    }

    return { output: decodeText(value), error: null }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Could not transform this input.",
    }
  }
}

function encodeText(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeText(value: string) {
  const bytes = decodeBase64ToBytes(value)
  if (!bytes) {
    throw new Error("Input is not valid Base64.")
  }

  return new TextDecoder().decode(bytes)
}

function decodeBase64ToBytes(value: string) {
  try {
    const base64 = cleanBase64(value)
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index)
    }

    return bytes
  } catch {
    return null
  }
}

function cleanBase64(value: string) {
  const trimmed = value.trim()
  const dataUrlSeparator = trimmed.startsWith("data:") ? trimmed.indexOf(",") : -1
  const base64 = dataUrlSeparator >= 0 ? trimmed.slice(dataUrlSeparator + 1) : trimmed
  return base64.replace(/\s/g, "")
}

function isLikelyBase64(value: string) {
  const cleaned = cleanBase64(value)
  return cleaned.length > 0 && cleaned.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      resolve(result.split(",")[1] ?? "")
    }
    reader.onerror = () => reject(reader.error ?? new Error("File reading failed"))
    reader.readAsDataURL(file)
  })
}
