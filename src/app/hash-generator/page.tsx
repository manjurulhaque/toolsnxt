"use client"

import { useMemo, useState } from "react"
import { FilePicker, TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, getTextStats } from "@/lib/browser-actions"

type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"

const sampleText = "Hash this text locally in the browser."
const algorithms: HashAlgorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"]

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState(sampleText)
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    MD5: md5(sampleText),
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": "",
  })
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<HashAlgorithm[]>(["SHA-256", "SHA-512"])
  const [message, setMessage] = useState("Generate hashes from text or a file locally.")

  const stats = useMemo(() => getTextStats(inputText), [inputText])

  async function generateHashes(value = inputText) {
    if (!value) {
      setHashes(emptyHashes())
      setMessage("Add text or choose a file before hashing.")
      return
    }

    const nextHashes = emptyHashes()

    await Promise.all(
      algorithms.map(async (algorithm) => {
        if (algorithm === "MD5") {
          nextHashes.MD5 = md5(value)
          return
        }

        nextHashes[algorithm] = await createWebCryptoHash(value, algorithm)
      }),
    )

    setHashes(nextHashes)
    setMessage("Hashes generated.")
  }

  async function handleFile(file: File | undefined) {
    if (!file) {
      return
    }

    const text = await file.text()
    setInputText(text)
    await generateHashes(text)
    setMessage(`${file.name} loaded and hashed.`)
  }

  async function copyValue(value: string, label: string) {
    if (!value) {
      setMessage(`Generate ${label} before copying.`)
      return
    }

    try {
      await copyToClipboard(value)
      setMessage(`${label} copied.`)
    } catch {
      setMessage("Copy failed. Select the hash and copy it manually.")
    }
  }

  function toggleAlgorithm(algorithm: HashAlgorithm) {
    setSelectedAlgorithms((currentAlgorithms) =>
      currentAlgorithms.includes(algorithm)
        ? currentAlgorithms.filter((currentAlgorithm) => currentAlgorithm !== algorithm)
        : [...currentAlgorithms, algorithm],
    )
    setMessage("Visible hashes updated.")
  }

  function clearAll() {
    setInputText("")
    setHashes(emptyHashes())
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setInputText(sampleText)
    void generateHashes(sampleText)
    setMessage("Sample text loaded.")
  }

  return (
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Security tool" title="Hash Generator">
            Generate MD5 and SHA hashes from text or file contents in your browser for checksums,
            test data, and quick integrity checks.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
              id="hash-input"
              label="Input text"
              value={inputText}
              onChange={(value) => {
                setInputText(value)
                setMessage("Input updated.")
              }}
              rows={13}
              placeholder="Type or paste text to hash..."
            />
          </div>

          <div className="mt-4">
            <FilePicker
              label="Choose a text file"
              description="Hash the file's text contents locally"
              onChange={(event) => void handleFile(event.target.files?.[0])}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={stats.characters} />
            <SummaryTile label="Lines" value={stats.lines} />
            <SummaryTile label="Bytes" value={stats.bytes} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ActionButton onClick={clearAll} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
            <ActionButton onClick={() => void generateHashes()}>
              Generate
            </ActionButton>
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Output" title="Generated Hashes" badge={`${selectedAlgorithms.length} visible`} />

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {algorithms.map((algorithm) => (
              <button
                key={algorithm}
                type="button"
                onClick={() => toggleAlgorithm(algorithm)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  selectedAlgorithms.includes(algorithm)
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {algorithm}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {algorithms
              .filter((algorithm) => selectedAlgorithms.includes(algorithm))
              .map((algorithm) => (
                <button
                  key={algorithm}
                  type="button"
                  onClick={() => copyValue(hashes[algorithm], algorithm)}
                  className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-left transition hover:border-[var(--accent-rust)]/35"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-700)]">
                    {algorithm}
                  </span>
                  <code className="mt-2 block break-all font-mono text-sm leading-6 text-[var(--ink-900)]">
                    {hashes[algorithm] || "Generate to calculate this hash."}
                  </code>
                </button>
              ))}
          </div>

          <InfoBox className="mt-5 leading-normal">
            {message}
          </InfoBox>
      </ToolPanel>
    </ToolPage>
  )
}

function emptyHashes(): Record<HashAlgorithm, string> {
  return {
    MD5: "",
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": "",
  }
}

async function createWebCryptoHash(value: string, algorithm: Exclude<HashAlgorithm, "MD5">) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest(algorithm, data)

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

function md5(value: string) {
  const bytes = Array.from(new TextEncoder().encode(value))
  const bitLength = bytes.length * 8
  bytes.push(0x80)

  while (bytes.length % 64 !== 56) {
    bytes.push(0)
  }

  for (let index = 0; index < 8; index += 1) {
    bytes.push(Math.floor(bitLength / 2 ** (8 * index)) & 0xff)
  }

  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476
  const shifts = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5,
    9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10,
    15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ]
  const constants = Array.from({ length: 64 }, (_, index) =>
    Math.floor(Math.abs(Math.sin(index + 1)) * 2 ** 32),
  )

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const words = Array.from({ length: 16 }, (_, index) => {
      const start = offset + index * 4
      return (
        bytes[start] |
        (bytes[start + 1] << 8) |
        (bytes[start + 2] << 16) |
        (bytes[start + 3] << 24)
      )
    })
    let aa = a
    let bb = b
    let cc = c
    let dd = d

    for (let index = 0; index < 64; index += 1) {
      let f = 0
      let g = 0

      if (index < 16) {
        f = (bb & cc) | (~bb & dd)
        g = index
      } else if (index < 32) {
        f = (dd & bb) | (~dd & cc)
        g = (5 * index + 1) % 16
      } else if (index < 48) {
        f = bb ^ cc ^ dd
        g = (3 * index + 5) % 16
      } else {
        f = cc ^ (bb | ~dd)
        g = (7 * index) % 16
      }

      const next = dd
      dd = cc
      cc = bb
      bb = add32(bb, rotateLeft(add32(add32(aa, f), add32(constants[index], words[g])), shifts[index]))
      aa = next
    }

    a = add32(a, aa)
    b = add32(b, bb)
    c = add32(c, cc)
    d = add32(d, dd)
  }

  return [a, b, c, d].map(toLittleEndianHex).join("")
}

function add32(left: number, right: number) {
  return (left + right) >>> 0
}

function rotateLeft(value: number, shift: number) {
  return (value << shift) | (value >>> (32 - shift))
}

function toLittleEndianHex(value: number) {
  return [0, 8, 16, 24]
    .map((shift) => ((value >>> shift) & 0xff).toString(16).padStart(2, "0"))
    .join("")
}
