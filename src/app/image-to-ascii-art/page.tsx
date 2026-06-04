"use client"

import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type Tone = "standard" | "dense" | "blocks"

const toneMaps: Record<Tone, string> = {
  standard: " .:-=+*#%@",
  dense: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  blocks: " ░▒▓█",
}

type ImageItem = {
  name: string
  url: string
}

export default function ImageToAsciiArtPage() {
  const [image, setImage] = useState<ImageItem | null>(null)
  const [asciiArt, setAsciiArt] = useState("")
  const [width, setWidth] = useState("100")
  const [tone, setTone] = useState<Tone>("standard")
  const [invert, setInvert] = useState(false)
  const [contrast, setContrast] = useState("1")
  const [isConverting, setIsConverting] = useState(false)
  const [message, setMessage] = useState("Choose an image to turn it into ASCII art.")

  const stats = useMemo(() => {
    const lines = asciiArt ? asciiArt.split("\n").length : 0
    return {
      lines,
      characters: asciiArt.length,
    }
  }, [asciiArt])

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file || !file.type.startsWith("image/")) {
      setMessage("Choose a valid image file.")
      return
    }

    if (image) {
      URL.revokeObjectURL(image.url)
    }

    const nextImage = {
      name: file.name,
      url: URL.createObjectURL(file),
    }

    setImage(nextImage)
    setAsciiArt("")
    setMessage(`${file.name} loaded.`)
    event.target.value = ""
  }

  async function convertImage() {
    if (!image) {
      setMessage("Choose an image before converting.")
      return
    }

    setIsConverting(true)
    setMessage("Converting image...")

    try {
      const nextAsciiArt = await imageUrlToAscii(image.url, {
        width: clampNumber(width, 24, 220, 100),
        toneMap: toneMaps[tone],
        invert,
        contrast: clampFloat(contrast, 0.4, 2.6, 1),
      })

      setAsciiArt(nextAsciiArt)
      setMessage("ASCII art generated.")
    } catch (error) {
      console.error("Image to ASCII conversion failed", error)
      setMessage("Could not convert that image. Try a different file.")
    } finally {
      setIsConverting(false)
    }
  }

  async function copyAsciiArt() {
    if (!asciiArt) {
      setMessage("Generate ASCII art before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(asciiArt)
      setMessage("ASCII art copied.")
    } catch {
      setMessage("Copy failed. Select the art and copy it manually.")
    }
  }

  function downloadAsciiArt() {
    if (!asciiArt) {
      setMessage("Generate ASCII art before downloading.")
      return
    }

    const blob = new Blob([asciiArt], { type: "text/plain;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "ascii-art.txt"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("ASCII art downloaded.")
  }

  function clearImage() {
    if (image) {
      URL.revokeObjectURL(image.url)
    }

    setImage(null)
    setAsciiArt("")
    setMessage("Image cleared.")
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
            Image tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Image to ASCII Art</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert an image into copyable text art in your browser. Tune width, contrast, tone
            density, and inversion for cleaner output.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose image</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              JPG, PNG, WebP, GIF, BMP, and other browser-readable images
            </span>
            <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
          </label>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label htmlFor="ascii-width" className="block">
              <span className="text-sm font-medium">Output width</span>
              <input
                id="ascii-width"
                type="number"
                min="24"
                max="220"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
              />
            </label>

            <label htmlFor="tone-map" className="block">
              <span className="text-sm font-medium">Tone map</span>
              <select
                id="tone-map"
                value={tone}
                onChange={(event) => setTone(event.target.value as Tone)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
              >
                <option value="standard">Standard</option>
                <option value="dense">Detailed</option>
                <option value="blocks">Block shade</option>
              </select>
            </label>
          </div>

          <div className="mt-6 space-y-3">
            <label htmlFor="contrast" className="block text-sm font-medium">
              Contrast: {clampFloat(contrast, 0.4, 2.6, 1).toFixed(1)}x
            </label>
            <input
              id="contrast"
              type="range"
              min="0.4"
              max="2.6"
              step="0.1"
              value={clampFloat(contrast, 0.4, 2.6, 1)}
              onChange={(event) => setContrast(event.target.value)}
              className="w-full accent-[var(--accent-rust)]"
            />
          </div>

          <label className="mt-5 flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={invert}
              onChange={(event) => setInvert(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent-rust)]"
            />
            Invert brightness
          </label>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={convertImage}
              disabled={!image || isConverting}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isConverting ? "Converting..." : "Generate ASCII"}
            </button>
            <button
              type="button"
              onClick={clearImage}
              disabled={!image || isConverting}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Clear
            </button>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {message}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Source Image</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {image ? image.name : "No file"}
              </p>
            </div>

            <div className="mt-6 flex min-h-[260px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.url} alt={image.name} className="max-h-[420px] w-full object-contain" />
              ) : (
                <p className="text-center text-sm text-[var(--ink-700)]">
                  Your selected image will appear here.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Output
                </p>
                <h2 className="mt-2 text-2xl font-semibold">ASCII Art</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {stats.lines} lines / {stats.characters} chars
              </p>
            </div>

            <textarea
              value={asciiArt}
              readOnly
              rows={18}
              className="mt-6 w-full resize-y whitespace-pre overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-[8px] leading-[8px] outline-none sm:text-[10px] sm:leading-[10px]"
              aria-label="Generated ASCII art"
              placeholder="ASCII art will appear here..."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copyAsciiArt}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Copy Art
              </button>
              <button
                type="button"
                onClick={downloadAsciiArt}
                className="rounded-full bg-[var(--accent-gold)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--accent-sand)]"
              >
                Download TXT
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

async function imageUrlToAscii(
  url: string,
  options: {
    width: number
    toneMap: string
    invert: boolean
    contrast: number
  },
) {
  const image = await loadImage(url)
  const aspectRatio = image.naturalHeight / image.naturalWidth
  const outputWidth = options.width
  const outputHeight = Math.max(1, Math.round(outputWidth * aspectRatio * 0.48))
  const canvas = document.createElement("canvas")
  canvas.width = outputWidth
  canvas.height = outputHeight

  const context = canvas.getContext("2d", { willReadFrequently: true })
  if (!context) {
    throw new Error("Canvas is unavailable")
  }

  context.drawImage(image, 0, 0, outputWidth, outputHeight)
  const pixels = context.getImageData(0, 0, outputWidth, outputHeight).data
  const lines: string[] = []

  for (let y = 0; y < outputHeight; y += 1) {
    let line = ""

    for (let x = 0; x < outputWidth; x += 1) {
      const index = (y * outputWidth + x) * 4
      const alpha = pixels[index + 3] / 255
      const red = pixels[index]
      const green = pixels[index + 1]
      const blue = pixels[index + 2]
      const brightness = (0.2126 * red + 0.7152 * green + 0.0722 * blue) * alpha + 255 * (1 - alpha)
      const adjusted = adjustContrast(options.invert ? 255 - brightness : brightness, options.contrast)
      const toneIndex = Math.round((adjusted / 255) * (options.toneMap.length - 1))
      line += options.toneMap[toneIndex]
    }

    lines.push(line.trimEnd())
  }

  return lines.join("\n")
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Image could not load"))
    image.src = url
  })
}

function adjustContrast(value: number, contrast: number) {
  return Math.min(Math.max((value - 128) * contrast + 128, 0), 255)
}

function clampNumber(value: string, min: number, max: number, fallback: number) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  return Math.min(Math.max(Math.floor(numericValue), min), max)
}

function clampFloat(value: string, min: number, max: number, fallback: number) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  return Math.min(Math.max(numericValue, min), max)
}
