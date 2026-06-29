"use client"

import { ChangeEvent, useMemo, useState } from "react"
import { ToolIntro, ToolPage, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"

type SourceImage = {
  file: File
  url: string
}

type GeneratedIcon = {
  size: number
  url: string
  bytes: number
}

const iconSizes = [16, 32, 48, 180, 192, 512]
const icoSizes = [16, 32, 48]

export default function ImageToFaviconPage() {
  const [sourceImage, setSourceImage] = useState<SourceImage | null>(null)
  const [generatedIcons, setGeneratedIcons] = useState<GeneratedIcon[]>([])
  const [faviconUrl, setFaviconUrl] = useState("")
  const [faviconBytes, setFaviconBytes] = useState(0)
  const [padding, setPadding] = useState(8)
  const [background, setBackground] = useState("#ffffff")
  const [transparentBackground, setTransparentBackground] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [message, setMessage] = useState("Choose a square-ish image, then generate favicon files locally.")

  const totalOutputSize = useMemo(
    () => generatedIcons.reduce((sum, icon) => sum + icon.bytes, faviconBytes),
    [faviconBytes, generatedIcons],
  )

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setMessage("Choose an image file first.")
      return
    }

    clearOutput()
    if (sourceImage) {
      URL.revokeObjectURL(sourceImage.url)
    }

    setSourceImage({
      file: selectedFile,
      url: URL.createObjectURL(selectedFile),
    })
    setMessage(`${selectedFile.name} selected.`)
    event.target.value = ""
  }

  function clearAll() {
    if (sourceImage) {
      URL.revokeObjectURL(sourceImage.url)
    }

    clearOutput()
    setSourceImage(null)
    setMessage("Selection cleared.")
  }

  function clearOutput() {
    generatedIcons.forEach((icon) => URL.revokeObjectURL(icon.url))
    if (faviconUrl) {
      URL.revokeObjectURL(faviconUrl)
    }

    setGeneratedIcons([])
    setFaviconUrl("")
    setFaviconBytes(0)
  }

  async function generateFavicons() {
    if (!sourceImage) {
      setMessage("Add an image before generating favicons.")
      return
    }

    setIsGenerating(true)
    setMessage("Generating favicon files...")
    clearOutput()

    try {
      const bitmap = await createImageBitmap(sourceImage.file)
      const nextIcons = await Promise.all(
        iconSizes.map(async (size) => {
          const blob = await renderPng(bitmap, size, padding, transparentBackground ? null : background)

          return {
            size,
            url: URL.createObjectURL(blob),
            bytes: blob.size,
          }
        }),
      )
      const icoPngs = await Promise.all(
        icoSizes.map((size) => renderPng(bitmap, size, padding, transparentBackground ? null : background)),
      )
      const icoBlob = await createIco(icoPngs)

      bitmap.close()
      setGeneratedIcons(nextIcons)
      setFaviconUrl(URL.createObjectURL(icoBlob))
      setFaviconBytes(icoBlob.size)
      setMessage("Favicon files are ready.")
    } catch (error) {
      console.error("Favicon generation failed", error)
      setMessage("Something went wrong while generating favicons. Try a different image.")
    } finally {
      setIsGenerating(false)
    }
  }

  function downloadUrl(url: string, fileName: string) {
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()
  }

  function downloadAll() {
    if (faviconUrl) {
      downloadUrl(faviconUrl, "favicon.ico")
    }

    generatedIcons.forEach((icon) => {
      downloadUrl(icon.url, icon.size === 180 ? "apple-touch-icon.png" : `icon-${icon.size}.png`)
    })
  }

  return (
    <ToolPage gridClassName="lg:grid-cols-[0.88fr_1.12fr]">
        <ToolPanel>
          <ToolIntro eyebrow="Local tool" title="Image to Favicon Generator">
            Convert a logo or image into favicon.ico and common PNG icon sizes in your browser.
            Nothing is uploaded.
          </ToolIntro>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose image</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              PNG, JPG, WebP, SVG, and other browser-readable images
            </span>
            <input type="file" accept="image/*" className="sr-only" onChange={handleFile} />
          </label>

          <div className="mt-6 space-y-3">
            <label htmlFor="padding" className="block text-sm font-medium">
              Icon padding: {padding}%
            </label>
            <input
              id="padding"
              type="range"
              min="0"
              max="30"
              step="1"
              value={padding}
              onChange={(event) => {
                setPadding(Number(event.target.value))
                clearOutput()
              }}
              className="w-full accent-[var(--accent-rust)]"
            />
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={transparentBackground}
                onChange={(event) => {
                  setTransparentBackground(event.target.checked)
                  clearOutput()
                }}
                className="h-4 w-4 accent-[var(--accent-rust)]"
              />
              Transparent background
            </label>

            {!transparentBackground ? (
              <label htmlFor="background" className="mt-4 block text-sm font-medium">
                Background color
                <input
                  id="background"
                  type="color"
                  value={background}
                  onChange={(event) => {
                    setBackground(event.target.value)
                    clearOutput()
                  }}
                  className="mt-2 h-11 w-full rounded-xl border border-[var(--ink-900)]/10 bg-white p-1"
                />
              </label>
            ) : null}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={generateFavicons}
              disabled={!sourceImage || isGenerating}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isGenerating ? "Generating..." : "Generate Favicons"}
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={!sourceImage || isGenerating}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Clear
            </button>
          </div>

          <InfoBox className="mt-6">
            {message}
          </InfoBox>
        </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Preview" title="Source Image" badge={sourceImage ? formatBytes(sourceImage.file.size) : "No file"} />

            {sourceImage ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_0.8fr]">
                <div className="grid aspect-square place-items-center rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sourceImage.url}
                    alt={sourceImage.file.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
                  <p className="truncate text-sm font-semibold">{sourceImage.file.name}</p>
                  <p className="mt-2 text-sm text-[var(--ink-700)]">{formatBytes(sourceImage.file.size)}</p>
                  <div className="mt-5 flex items-center gap-4">
                    <IconPreview imageUrl={sourceImage.url} sizeClass="h-8 w-8" />
                    <IconPreview imageUrl={sourceImage.url} sizeClass="h-12 w-12" />
                    <IconPreview imageUrl={sourceImage.url} sizeClass="h-16 w-16" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Your source image preview will appear here.
              </div>
            )}
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Favicon Files" badge={formatBytes(totalOutputSize)} />

            {faviconUrl ? (
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => downloadUrl(faviconUrl, "favicon.ico")}
                  className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
                >
                  Download favicon.ico
                </button>
                <button
                  type="button"
                  onClick={downloadAll}
                  className="rounded-full bg-[var(--accent-gold)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--accent-sand)]"
                >
                  Download All
                </button>
              </div>
            ) : null}

            {generatedIcons.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Generated favicon and PNG icon files will appear here.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {generatedIcons.map((icon) => (
                  <article
                    key={icon.size}
                    className="rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                  >
                    <div className="grid aspect-square place-items-center rounded-[1rem] bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.url}
                        alt={`${icon.size}px favicon preview`}
                        width={Math.min(icon.size, 96)}
                        height={Math.min(icon.size, 96)}
                        className="image-render-auto"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-semibold">
                        {icon.size} x {icon.size} PNG
                      </p>
                      <p className="mt-1 text-xs text-[var(--ink-700)]/75">{formatBytes(icon.bytes)}</p>
                      <button
                        type="button"
                        onClick={() =>
                          downloadUrl(
                            icon.url,
                            icon.size === 180 ? "apple-touch-icon.png" : `icon-${icon.size}.png`,
                          )
                        }
                        className="mt-3 w-full rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
                      >
                        Download
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </ToolPanel>
        </div>
    </ToolPage>
  )
}

function IconPreview({ imageUrl, sizeClass }: { imageUrl: string; sizeClass: string }) {
  return (
    <span className={`grid place-items-center rounded-md bg-white p-1 shadow-inner ${sizeClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" className="h-full w-full object-contain" />
    </span>
  )
}

async function renderPng(
  bitmap: ImageBitmap,
  size: number,
  paddingPercent: number,
  background: string | null,
) {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Canvas is unavailable")
  }

  if (background) {
    context.fillStyle = background
    context.fillRect(0, 0, size, size)
  } else {
    context.clearRect(0, 0, size, size)
  }

  const padding = Math.round(size * (paddingPercent / 100))
  const availableSize = Math.max(1, size - padding * 2)
  const scale = Math.min(availableSize / bitmap.width, availableSize / bitmap.height)
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const x = Math.round((size - width) / 2)
  const y = Math.round((size - height) / 2)

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = "high"
  context.drawImage(bitmap, x, y, width, height)

  return canvasToBlob(canvas, "image/png")
}

async function createIco(pngBlobs: Blob[]) {
  const pngBytes = await Promise.all(pngBlobs.map((blob) => blob.arrayBuffer()))
  const directorySize = 6 + pngBytes.length * 16
  const totalSize = pngBytes.reduce((sum, bytes) => sum + bytes.byteLength, directorySize)
  const icoBytes = new Uint8Array(totalSize)
  const view = new DataView(icoBytes.buffer)

  view.setUint16(0, 0, true)
  view.setUint16(2, 1, true)
  view.setUint16(4, pngBytes.length, true)

  let imageOffset = directorySize

  pngBytes.forEach((bytes, index) => {
    const size = icoSizes[index]
    const entryOffset = 6 + index * 16

    view.setUint8(entryOffset, size >= 256 ? 0 : size)
    view.setUint8(entryOffset + 1, size >= 256 ? 0 : size)
    view.setUint8(entryOffset + 2, 0)
    view.setUint8(entryOffset + 3, 0)
    view.setUint16(entryOffset + 4, 1, true)
    view.setUint16(entryOffset + 6, 32, true)
    view.setUint32(entryOffset + 8, bytes.byteLength, true)
    view.setUint32(entryOffset + 12, imageOffset, true)
    icoBytes.set(new Uint8Array(bytes), imageOffset)
    imageOffset += bytes.byteLength
  })

  return new Blob([icoBytes], { type: "image/x-icon" })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: "image/png") {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
        return
      }

      reject(new Error("Browser could not create an image file"))
    }, type)
  })
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B"
  }

  const units = ["B", "KB", "MB", "GB"]
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** unitIndex
  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}
