"use client"

import { ChangeEvent, useMemo, useState } from "react"
import { ToolIntro, ToolPage, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"

type OutputFormat = "image/png" | "image/jpeg" | "image/webp"

type ImageItem = {
  id: string
  file: File
  url: string
}

type ConvertedImage = {
  id: string
  fileName: string
  url: string
  size: number
}

const formatOptions: Array<{ label: string; value: OutputFormat; extension: string }> = [
  { label: "PNG", value: "image/png", extension: "png" },
  { label: "JPG", value: "image/jpeg", extension: "jpg" },
  { label: "WebP", value: "image/webp", extension: "webp" },
]

export default function ImageConverterPage() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/webp")
  const [quality, setQuality] = useState(0.88)
  const [maxWidth, setMaxWidth] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [message, setMessage] = useState("Choose images, pick a format, then convert them locally.")

  const selectedSize = useMemo(
    () => images.reduce((sum, image) => sum + image.file.size, 0),
    [images],
  )

  const convertedSize = useMemo(
    () => convertedImages.reduce((sum, image) => sum + image.size, 0),
    [convertedImages],
  )

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    )

    if (selectedFiles.length === 0) {
      setMessage("Choose at least one image file.")
      return
    }

    const nextImages = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      url: URL.createObjectURL(file),
    }))

    setImages((currentImages) => [...currentImages, ...nextImages])
    clearConvertedImages()
    setMessage(`${selectedFiles.length} image${selectedFiles.length === 1 ? "" : "s"} added.`)
    event.target.value = ""
  }

  function removeImage(id: string) {
    setImages((currentImages) => {
      const image = currentImages.find((item) => item.id === id)
      if (image) {
        URL.revokeObjectURL(image.url)
      }

      return currentImages.filter((item) => item.id !== id)
    })
    clearConvertedImages()
  }

  function clearImages() {
    images.forEach((image) => URL.revokeObjectURL(image.url))
    setImages([])
    clearConvertedImages()
    setMessage("Selection cleared.")
  }

  function clearConvertedImages() {
    setConvertedImages((currentImages) => {
      currentImages.forEach((image) => URL.revokeObjectURL(image.url))
      return []
    })
  }

  async function convertImages() {
    if (images.length === 0) {
      setMessage("Add images before converting.")
      return
    }

    setIsConverting(true)
    setMessage("Converting images...")
    clearConvertedImages()

    try {
      const widthLimit = Number(maxWidth)
      const normalizedWidthLimit = Number.isFinite(widthLimit) && widthLimit > 0 ? widthLimit : null
      const selectedFormat = formatOptions.find((format) => format.value === outputFormat) ?? formatOptions[0]
      const nextConvertedImages = await Promise.all(
        images.map((image) =>
          convertImage(image.file, selectedFormat.value, selectedFormat.extension, quality, normalizedWidthLimit),
        ),
      )

      setConvertedImages(nextConvertedImages)
      setMessage(`${nextConvertedImages.length} image${nextConvertedImages.length === 1 ? "" : "s"} converted.`)
    } catch (error) {
      console.error("Image conversion failed", error)
      setMessage("Something went wrong while converting. Try a different image file.")
    } finally {
      setIsConverting(false)
    }
  }

  function downloadImage(image: ConvertedImage) {
    const link = document.createElement("a")
    link.href = image.url
    link.download = image.fileName
    link.click()
  }

  function downloadAll() {
    convertedImages.forEach((image) => downloadImage(image))
  }

  return (
    <ToolPage gridClassName="lg:grid-cols-[0.88fr_1.12fr]">
        <ToolPanel>
          <ToolIntro eyebrow="Local tool" title="Image Converter">
            Convert images to PNG, JPG, or WebP in your browser. Files stay on this device, with
            optional quality and width controls.
          </ToolIntro>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose images</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              JPG, PNG, WebP, GIF, BMP, and other browser-readable images
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleFiles}
            />
          </label>

          <div className="mt-6">
            <label htmlFor="format" className="block text-sm font-medium">
              Output format
            </label>
            <select
              id="format"
              value={outputFormat}
              onChange={(event) => {
                setOutputFormat(event.target.value as OutputFormat)
                clearConvertedImages()
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
            >
              {formatOptions.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 space-y-3">
            <label htmlFor="quality" className="block text-sm font-medium">
              Quality: {Math.round(quality * 100)}%
            </label>
            <input
              id="quality"
              type="range"
              min="0.45"
              max="1"
              step="0.01"
              value={quality}
              disabled={outputFormat === "image/png"}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="w-full accent-[var(--accent-rust)] disabled:opacity-40"
            />
            {outputFormat === "image/png" ? (
              <p className="text-xs text-[var(--ink-700)]/72">PNG output ignores quality because it is lossless.</p>
            ) : null}
          </div>

          <div className="mt-6">
            <label htmlFor="max-width" className="block text-sm font-medium">
              Max width
            </label>
            <input
              id="max-width"
              type="number"
              min="1"
              inputMode="numeric"
              value={maxWidth}
              onChange={(event) => {
                setMaxWidth(event.target.value)
                clearConvertedImages()
              }}
              placeholder="Keep original"
              className="mt-2 w-full rounded-2xl border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={convertImages}
              disabled={images.length === 0 || isConverting}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isConverting ? "Converting..." : "Convert Images"}
            </button>
            <button
              type="button"
              onClick={clearImages}
              disabled={images.length === 0 || isConverting}
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
            <PanelHeader eyebrow="Input" title="Selected Images" badge={`${images.length} files / ${formatBytes(selectedSize)}`} />

            {images.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Your selected images will appear here before conversion.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {images.map((image) => (
                  <ImageCard
                    key={image.id}
                    imageUrl={image.url}
                    title={image.file.name}
                    subtitle={formatBytes(image.file.size)}
                    actionLabel="Remove"
                    onAction={() => removeImage(image.id)}
                    disabled={isConverting}
                  />
                ))}
              </div>
            )}
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Converted Images" badge={`${convertedImages.length} files / ${formatBytes(convertedSize)}`} />

            {convertedImages.length > 1 ? (
              <button
                type="button"
                onClick={downloadAll}
                className="mt-5 rounded-full bg-[var(--accent-gold)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--accent-sand)]"
              >
                Download All
              </button>
            ) : null}

            {convertedImages.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Converted files will appear here with download buttons.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {convertedImages.map((image) => (
                  <ImageCard
                    key={image.id}
                    imageUrl={image.url}
                    title={image.fileName}
                    subtitle={formatBytes(image.size)}
                    actionLabel="Download"
                    onAction={() => downloadImage(image)}
                  />
                ))}
              </div>
            )}
          </ToolPanel>
        </div>
    </ToolPage>
  )
}

function ImageCard({
  imageUrl,
  title,
  subtitle,
  actionLabel,
  onAction,
  disabled = false,
}: {
  imageUrl: string
  title: string
  subtitle: string
  actionLabel: string
  onAction: () => void
  disabled?: boolean
}) {
  return (
    <article className="overflow-hidden rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)]">
      <div className="aspect-[4/3] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={title} className="h-full w-full object-contain" />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-[var(--ink-700)]/75">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onAction}
          disabled={disabled}
          className="w-full rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:opacity-40"
        >
          {actionLabel}
        </button>
      </div>
    </article>
  )
}

async function convertImage(
  file: File,
  outputFormat: OutputFormat,
  extension: string,
  quality: number,
  maxWidth: number | null,
): Promise<ConvertedImage> {
  const bitmap = await createImageBitmap(file)
  const scale = maxWidth && bitmap.width > maxWidth ? maxWidth / bitmap.width : 1
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Canvas is unavailable")
  }

  if (outputFormat === "image/jpeg") {
    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, width, height)
  }

  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await canvasToBlob(canvas, outputFormat, quality)
  return {
    id: `${file.name}-${Date.now()}-${crypto.randomUUID()}`,
    fileName: `${stripExtension(file.name)}.${extension}`,
    url: URL.createObjectURL(blob),
    size: blob.size,
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: OutputFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
          return
        }

        reject(new Error("Browser could not create an image file"))
      },
      type,
      type === "image/png" ? undefined : quality,
    )
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

function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "")
}
