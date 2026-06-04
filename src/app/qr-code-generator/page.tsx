"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type QrPreset = "url" | "text" | "email" | "phone" | "wifi"

type QrConfig = {
  version: number
  dataCodewords: number
  ecCodewords: number
  blocks: number
}

const qrConfigs: QrConfig[] = [
  { version: 1, dataCodewords: 19, ecCodewords: 7, blocks: 1 },
  { version: 2, dataCodewords: 34, ecCodewords: 10, blocks: 1 },
  { version: 3, dataCodewords: 55, ecCodewords: 15, blocks: 1 },
  { version: 4, dataCodewords: 80, ecCodewords: 20, blocks: 1 },
  { version: 5, dataCodewords: 108, ecCodewords: 26, blocks: 1 },
  { version: 6, dataCodewords: 136, ecCodewords: 18, blocks: 2 },
  { version: 7, dataCodewords: 156, ecCodewords: 20, blocks: 2 },
  { version: 8, dataCodewords: 194, ecCodewords: 24, blocks: 2 },
  { version: 9, dataCodewords: 232, ecCodewords: 30, blocks: 2 },
]

const alignmentPositions: Record<number, number[]> = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
}

const presets: Array<{ key: QrPreset; label: string; value: string }> = [
  { key: "url", label: "URL", value: "https://example.com" },
  { key: "text", label: "Text", value: "Hello from Quotations Archive" },
  { key: "email", label: "Email", value: "mailto:hello@example.com?subject=Hello" },
  { key: "phone", label: "Phone", value: "tel:+15551234567" },
  { key: "wifi", label: "Wi-Fi", value: "WIFI:T:WPA;S:NetworkName;P:password123;;" },
]

const encoder = new TextEncoder()

export default function QrCodeGeneratorPage() {
  const [content, setContent] = useState("https://example.com")
  const [foreground, setForeground] = useState("#212529")
  const [background, setBackground] = useState("#ffffff")
  const [quietZone, setQuietZone] = useState("4")
  const [moduleSize, setModuleSize] = useState("10")
  const [message, setMessage] = useState("Enter content to generate a scannable QR code.")

  const qrResult = useMemo(() => {
    try {
      const qr = createQrCode(content)
      return { qr, error: "" }
    } catch (error) {
      return {
        qr: null,
        error: error instanceof Error ? error.message : "Could not create QR code.",
      }
    }
  }, [content])

  const safeQuietZone = clampInteger(quietZone, 0, 10, 4)
  const safeModuleSize = clampInteger(moduleSize, 4, 24, 10)
  const svgMarkup = qrResult.qr
    ? renderQrSvg(qrResult.qr, foreground, background, safeQuietZone, safeModuleSize)
    : ""

  async function copySvg() {
    if (!svgMarkup) {
      setMessage(qrResult.error || "Add content before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(svgMarkup)
      setMessage("SVG markup copied.")
    } catch {
      setMessage("Copy failed. Select the SVG markup and copy it manually.")
    }
  }

  function downloadSvg() {
    if (!svgMarkup) {
      setMessage(qrResult.error || "Add content before downloading.")
      return
    }

    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "qr-code.svg"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("QR SVG downloaded.")
  }

  function loadPreset(value: string) {
    setContent(value)
    setMessage("Preset loaded.")
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Utility tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">QR Code Generator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Create a scannable QR code for links, text, email, phone numbers, or Wi-Fi credentials.
            The SVG is generated locally in your browser.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {presets.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => loadPreset(preset.value)}
                className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:bg-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <label htmlFor="qr-content" className="mt-6 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="qr-content"
            value={content}
            onChange={(event) => {
              setContent(event.target.value)
              setMessage("Content updated.")
            }}
            rows={7}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="https://example.com"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ColorField id="foreground" label="Foreground" value={foreground} onChange={setForeground} />
            <ColorField id="background" label="Background" value={background} onChange={setBackground} />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <NumberField id="quiet-zone" label="Quiet zone" value={quietZone} onChange={setQuietZone} />
            <NumberField id="module-size" label="Module size" value={moduleSize} onChange={setModuleSize} />
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {qrResult.error || message}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Output
                </p>
                <h2 className="mt-2 text-2xl font-semibold">QR Preview</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {qrResult.qr ? `v${qrResult.qr.version} / ${qrResult.qr.size}x${qrResult.qr.size}` : "No code"}
              </p>
            </div>

            <div className="mt-6 flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-6">
              {svgMarkup ? (
                <div
                  className="max-w-full overflow-auto rounded-[1rem] bg-white p-4"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />
              ) : (
                <p className="text-center text-sm text-[var(--ink-700)]">
                  Add shorter content to generate a QR code.
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copySvg}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Copy SVG
              </button>
              <button
                type="button"
                onClick={downloadSvg}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Download SVG
              </button>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Markup
                </p>
                <h2 className="mt-2 text-2xl font-semibold">SVG Source</h2>
              </div>
            </div>

            <textarea
              value={svgMarkup}
              readOnly
              rows={9}
              className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none"
              aria-label="QR code SVG markup"
              placeholder="SVG markup will appear here..."
            />
          </section>
        </div>
      </section>
    </main>
  )
}

function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2 flex overflow-hidden rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] transition focus-within:border-[var(--accent-rust)]">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-14 border-0 bg-transparent p-2"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-sm outline-none"
        />
      </div>
    </label>
  )
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        type="number"
        min="0"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function createQrCode(content: string) {
  const bytes = encoder.encode(content)

  if (bytes.length === 0) {
    throw new Error("Add content before generating.")
  }

  const config = qrConfigs.find((candidate) => getBitLength(bytes.length) <= candidate.dataCodewords * 8)
  if (!config) {
    throw new Error("Content is too long for this generator. Try 232 bytes or fewer.")
  }

  const dataCodewords = createDataCodewords(bytes, config)
  const finalCodewords = createFinalCodewords(dataCodewords, config)
  const best = Array.from({ length: 8 }, (_, mask) => buildMatrix(config.version, finalCodewords, mask))
    .sort((a, b) => getPenalty(a.modules) - getPenalty(b.modules))[0]

  return {
    version: config.version,
    size: best.modules.length,
    modules: best.modules,
  }
}

function getBitLength(byteLength: number) {
  return 4 + 8 + byteLength * 8
}

function createDataCodewords(bytes: Uint8Array, config: QrConfig) {
  const bits: number[] = []
  appendBits(bits, 0b0100, 4)
  appendBits(bits, bytes.length, 8)
  bytes.forEach((byte) => appendBits(bits, byte, 8))

  const capacityBits = config.dataCodewords * 8
  appendBits(bits, 0, Math.min(4, capacityBits - bits.length))

  while (bits.length % 8 !== 0) {
    bits.push(0)
  }

  const codewords: number[] = []
  for (let index = 0; index < bits.length; index += 8) {
    codewords.push(bits.slice(index, index + 8).reduce((value, bit) => (value << 1) | bit, 0))
  }

  for (let index = 0; codewords.length < config.dataCodewords; index += 1) {
    codewords.push(index % 2 === 0 ? 0xec : 0x11)
  }

  return codewords
}

function createFinalCodewords(dataCodewords: number[], config: QrConfig) {
  const dataPerBlock = config.dataCodewords / config.blocks
  const blocks = Array.from({ length: config.blocks }, (_, blockIndex) => {
    const data = dataCodewords.slice(blockIndex * dataPerBlock, (blockIndex + 1) * dataPerBlock)
    return { data, ec: createErrorCorrection(data, config.ecCodewords) }
  })

  const finalCodewords: number[] = []

  for (let index = 0; index < dataPerBlock; index += 1) {
    blocks.forEach((block) => finalCodewords.push(block.data[index]))
  }

  for (let index = 0; index < config.ecCodewords; index += 1) {
    blocks.forEach((block) => finalCodewords.push(block.ec[index]))
  }

  return finalCodewords
}

function buildMatrix(version: number, codewords: number[], mask: number) {
  const size = 21 + (version - 1) * 4
  const modules = createMatrix<boolean | null>(size, null)
  const reserved = createMatrix(size, false)

  placeFinder(modules, reserved, 0, 0)
  placeFinder(modules, reserved, size - 7, 0)
  placeFinder(modules, reserved, 0, size - 7)
  placeTiming(modules, reserved)
  placeAlignment(modules, reserved, version)
  placeDarkModule(modules, reserved, version)
  reserveFormatAreas(reserved)
  placeData(modules, reserved, codewords, mask)
  applyFormatInfo(modules, reserved, mask)

  return { modules: modules.map((row) => row.map(Boolean)) }
}

function createMatrix<T>(size: number, value: T) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => value))
}

function placeFinder(modules: Array<Array<boolean | null>>, reserved: boolean[][], x: number, y: number) {
  const size = modules.length

  for (let row = -1; row <= 7; row += 1) {
    for (let col = -1; col <= 7; col += 1) {
      const xx = x + col
      const yy = y + row

      if (xx < 0 || yy < 0 || xx >= size || yy >= size) {
        continue
      }

      const inPattern = row >= 0 && row <= 6 && col >= 0 && col <= 6
      const dark = inPattern && (row === 0 || row === 6 || col === 0 || col === 6 || (row >= 2 && row <= 4 && col >= 2 && col <= 4))
      modules[yy][xx] = dark
      reserved[yy][xx] = true
    }
  }
}

function placeTiming(modules: Array<Array<boolean | null>>, reserved: boolean[][]) {
  const size = modules.length

  for (let index = 8; index < size - 8; index += 1) {
    const dark = index % 2 === 0
    modules[6][index] = dark
    modules[index][6] = dark
    reserved[6][index] = true
    reserved[index][6] = true
  }
}

function placeAlignment(modules: Array<Array<boolean | null>>, reserved: boolean[][], version: number) {
  const positions = alignmentPositions[version] ?? []

  positions.forEach((centerY) => {
    positions.forEach((centerX) => {
      if (reserved[centerY][centerX]) {
        return
      }

      for (let row = -2; row <= 2; row += 1) {
        for (let col = -2; col <= 2; col += 1) {
          const distance = Math.max(Math.abs(row), Math.abs(col))
          modules[centerY + row][centerX + col] = distance !== 1
          reserved[centerY + row][centerX + col] = true
        }
      }
    })
  })
}

function placeDarkModule(modules: Array<Array<boolean | null>>, reserved: boolean[][], version: number) {
  const row = 4 * version + 9
  modules[row][8] = true
  reserved[row][8] = true
}

function reserveFormatAreas(reserved: boolean[][]) {
  const size = reserved.length

  for (let index = 0; index <= 8; index += 1) {
    reserved[8][index] = true
    reserved[index][8] = true
    reserved[8][size - 1 - index] = true
    reserved[size - 1 - index][8] = true
  }
}

function placeData(
  modules: Array<Array<boolean | null>>,
  reserved: boolean[][],
  codewords: number[],
  mask: number,
) {
  const bits = codewords.flatMap((codeword) =>
    Array.from({ length: 8 }, (_, index) => (codeword >> (7 - index)) & 1),
  )
  const size = modules.length
  let bitIndex = 0
  let direction = -1

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) {
      right -= 1
    }

    for (let vertical = 0; vertical < size; vertical += 1) {
      const row = direction === -1 ? size - 1 - vertical : vertical

      for (let colOffset = 0; colOffset < 2; colOffset += 1) {
        const col = right - colOffset

        if (reserved[row][col]) {
          continue
        }

        const bit = bitIndex < bits.length ? bits[bitIndex] === 1 : false
        modules[row][col] = bit !== getMask(mask, row, col)
        bitIndex += 1
      }
    }

    direction *= -1
  }
}

function applyFormatInfo(modules: Array<Array<boolean | null>>, reserved: boolean[][], mask: number) {
  const size = modules.length
  const bits = getFormatBits(mask)
  const first = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ]
  const second = [
    [size - 1, 8],
    [size - 2, 8],
    [size - 3, 8],
    [size - 4, 8],
    [size - 5, 8],
    [size - 6, 8],
    [size - 7, 8],
    [8, size - 8],
    [8, size - 7],
    [8, size - 6],
    [8, size - 5],
    [8, size - 4],
    [8, size - 3],
    [8, size - 2],
    [8, size - 1],
  ]

  first.forEach(([row, col], index) => {
    modules[row][col] = ((bits >> index) & 1) === 1
    reserved[row][col] = true
  })
  second.forEach(([row, col], index) => {
    modules[row][col] = ((bits >> index) & 1) === 1
    reserved[row][col] = true
  })
}

function getFormatBits(mask: number) {
  const data = (0b01 << 3) | mask
  let bits = data << 10

  for (let index = 14; index >= 10; index -= 1) {
    if (((bits >> index) & 1) === 1) {
      bits ^= 0x537 << (index - 10)
    }
  }

  return ((data << 10) | bits) ^ 0x5412
}

function getMask(mask: number, row: number, col: number) {
  switch (mask) {
    case 0:
      return (row + col) % 2 === 0
    case 1:
      return row % 2 === 0
    case 2:
      return col % 3 === 0
    case 3:
      return (row + col) % 3 === 0
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0
    default:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0
  }
}

function getPenalty(modules: boolean[][]) {
  const size = modules.length
  let penalty = 0

  for (let row = 0; row < size; row += 1) {
    penalty += getRunPenalty(modules[row])
  }

  for (let col = 0; col < size; col += 1) {
    penalty += getRunPenalty(modules.map((row) => row[col]))
  }

  for (let row = 0; row < size - 1; row += 1) {
    for (let col = 0; col < size - 1; col += 1) {
      const color = modules[row][col]
      if (modules[row][col + 1] === color && modules[row + 1][col] === color && modules[row + 1][col + 1] === color) {
        penalty += 3
      }
    }
  }

  const darkCount = modules.flat().filter(Boolean).length
  const percent = (darkCount * 100) / (size * size)
  penalty += Math.floor(Math.abs(percent - 50) / 5) * 10

  return penalty
}

function getRunPenalty(values: boolean[]) {
  let penalty = 0
  let runColor = values[0]
  let runLength = 1

  for (let index = 1; index <= values.length; index += 1) {
    if (values[index] === runColor) {
      runLength += 1
    } else {
      if (runLength >= 5) {
        penalty += 3 + (runLength - 5)
      }
      runColor = values[index]
      runLength = 1
    }
  }

  return penalty
}

function createErrorCorrection(data: number[], degree: number) {
  const generator = createGenerator(degree)
  const result = [...data, ...Array.from({ length: degree }, () => 0)]

  data.forEach((_, index) => {
    const factor = result[index]
    if (factor === 0) {
      return
    }

    generator.forEach((coefficient, generatorIndex) => {
      result[index + generatorIndex] ^= gfMultiply(coefficient, factor)
    })
  })

  return result.slice(result.length - degree)
}

function createGenerator(degree: number) {
  let result = [1]

  for (let index = 0; index < degree; index += 1) {
    result = multiplyPolynomials(result, [1, gfPow(index)])
  }

  return result
}

function multiplyPolynomials(left: number[], right: number[]) {
  const result = Array.from({ length: left.length + right.length - 1 }, () => 0)

  left.forEach((leftValue, leftIndex) => {
    right.forEach((rightValue, rightIndex) => {
      result[leftIndex + rightIndex] ^= gfMultiply(leftValue, rightValue)
    })
  })

  return result
}

function gfPow(power: number) {
  let value = 1

  for (let index = 0; index < power; index += 1) {
    value = gfMultiply(value, 2)
  }

  return value
}

function gfMultiply(left: number, right: number) {
  let result = 0
  let a = left
  let b = right

  while (b > 0) {
    if ((b & 1) !== 0) {
      result ^= a
    }
    a <<= 1
    if ((a & 0x100) !== 0) {
      a ^= 0x11d
    }
    b >>= 1
  }

  return result
}

function appendBits(bits: number[], value: number, length: number) {
  for (let index = length - 1; index >= 0; index -= 1) {
    bits.push((value >> index) & 1)
  }
}

function renderQrSvg(qr: { modules: boolean[][]; size: number }, foreground: string, background: string, quietZone: number, moduleSize: number) {
  const totalModules = qr.size + quietZone * 2
  const pixelSize = totalModules * moduleSize
  const rects = qr.modules
    .flatMap((row, y) =>
      row.map((dark, x) =>
        dark
          ? `<rect x="${(x + quietZone) * moduleSize}" y="${(y + quietZone) * moduleSize}" width="${moduleSize}" height="${moduleSize}" />`
          : "",
      ),
    )
    .filter(Boolean)
    .join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pixelSize}" height="${pixelSize}" viewBox="0 0 ${pixelSize} ${pixelSize}" role="img" aria-label="QR code"><rect width="100%" height="100%" fill="${escapeAttribute(background)}" /><g fill="${escapeAttribute(foreground)}">${rects}</g></svg>`
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}

function clampInteger(value: string, min: number, max: number, fallback: number) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  return Math.min(Math.max(Math.floor(numericValue), min), max)
}
