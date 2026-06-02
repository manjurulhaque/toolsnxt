"use client"

import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type OutputFormat = "image/png" | "image/jpeg" | "image/webp"
type ResizeMode = "contain" | "cover" | "stretch"

type ImageItem = {
  id: string
  file: File
  url: string
}

type ResizedImage = {
  id: string
  fileName: string
  url: string
  size: number
  width: number
  height: number
}

const formatOptions: Array<{ label: string; value: OutputFormat; extension: string }> = [
  { label: "PNG", value: "image/png", extension: "png" },
  { label: "JPG", value: "image/jpeg", extension: "jpg" },
  { label: "WebP", value: "image/webp", extension: "webp" },
]

const presets = [
  { label: "Avatar", width: 512, height: 512 },
  { label: "Social", width: 1200, height: 630 },
  { label: "HD", width: 1280, height: 720 },
  { label: "Square", width: 1080, height: 1080 },
]

export default function ImageResizerPage() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [resizedImages, setResizedImages] = useState<ResizedImage[]>([])
  const [width, setWidth] = useState("800")
  const [height, setHeight] = useState("600")
  const [lockAspectRatio, setLockAspectRatio] = useState(true)
  const [resizeMode, setResizeMode] = useState<ResizeMode>("contain")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/webp")
  const [quality, setQuality] = useState(0.9)
  const [background, setBackground] = useState("#ffffff")
  const [isResizing, setIsResizing] = useState(false)
  const [message, setMessage] = useState("Choose images, set a size, then resize them locally.")

  const selectedSize = useMemo(
    () => images.reduce((sum, image) => sum + image.file.size, 0),
    [images],
  )
  const outputSize = useMemo(
    () => resizedImages.reduce((sum, image) => sum + image.size, 0),
    [resizedImages],
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
    clearResizedImages()
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
    clearResizedImages()
  }

  function clearImages() {
    images.forEach((image) => URL.revokeObjectURL(image.url))
    setImages([])
    clearResizedImages()
    setMessage("Selection cleared.")
  }

  function clearResizedImages() {
    setResizedImages((currentImages) => {
      currentImages.forEach((image) => URL.revokeObjectURL(image.url))
      return []
    })
  }

  function applyPreset(widthValue: number, heightValue: number) {
    setWidth(String(widthValue))
    setHeight(String(heightValue))
    clearResizedImages()
  }

  function updateWidth(nextWidth: string) {
    setWidth(nextWidth)

    if (lockAspectRatio) {
      const currentWidth = parseSize(width)
      const currentHeight = parseSize(height)
      const numericWidth = parseSize(nextWidth)

      if (currentWidth && currentHeight && numericWidth) {
        setHeight(String(Math.max(1, Math.round((numericWidth * currentHeight) / currentWidth))))
      }
    }

    clearResizedImages()
  }

  function updateHeight(nextHeight: string) {
    setHeight(nextHeight)

    if (lockAspectRatio) {
      const currentWidth = parseSize(width)
      const currentHeight = parseSize(height)
      const numericHeight = parseSize(nextHeight)

      if (currentWidth && currentHeight && numericHeight) {
        setWidth(String(Math.max(1, Math.round((numericHeight * currentWidth) / currentHeight))))
      }
    }

    clearResizedImages()
  }

  async function resizeImages() {
    const targetWidth = parseSize(width)
    const targetHeight = parseSize(height)

    if (images.length === 0) {
      setMessage("Add images before resizing.")
      return
    }

    if (!targetWidth || !targetHeight) {
      setMessage("Enter a valid width and height.")
      return
    }

    setIsResizing(true)
    setMessage("Resizing images...")
    clearResizedImages()

    try {
      const selectedFormat = formatOptions.find((format) => format.value === outputFormat) ?? formatOptions[0]
      const nextImages = await Promise.all(
        images.map((image) =>
          resizeImage(
            image.file,
            targetWidth,
            targetHeight,
            resizeMode,
            selectedFormat.value,
            selectedFormat.extension,
            quality,
            background,
          ),
        ),
      )

      setResizedImages(nextImages)
      setMessage(`${nextImages.length} image${nextImages.length === 1 ? "" : "s"} resized.`)
    } catch (error) {
      console.error("Image resize failed", error)
      setMessage("Something went wrong while resizing. Try a different image file.")
    } finally {
      setIsResizing(false)
    }
  }

  function downloadImage(image: ResizedImage) {
    const link = document.createElement("a")
    link.href = image.url
    link.download = image.fileName
    link.click()
  }

  function downloadAll() {
    resizedImages.forEach((image) => downloadImage(image))
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Local tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Image Resizer</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Resize one or more images in your browser with aspect-ratio, crop, fit, quality, and
            format controls.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose images</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              JPG, PNG, WebP, GIF, BMP, and other browser-readable images
            </span>
            <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFiles} />
          </label>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset.width, preset.height)}
                className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-2 text-sm font-semibold text-[var(--ink-700)] transition hover:bg-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <NumberField id="resize-width" label="Width" value={width} onChange={updateWidth} />
            <NumberField id="resize-height" label="Height" value={height} onChange={updateHeight} />
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={lockAspectRatio}
              onChange={(event) => setLockAspectRatio(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent-rust)]"
            />
            Lock aspect ratio while editing dimensions
          </label>

          <div className="mt-6">
            <label htmlFor="resize-mode" className="block text-sm font-medium">
              Resize mode
            </label>
            <select
              id="resize-mode"
              value={resizeMode}
              onChange={(event) => {
                setResizeMode(event.target.value as ResizeMode)
                clearResizedImages()
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
            >
              <option value="contain">Fit inside canvas</option>
              <option value="cover">Fill and crop</option>
              <option value="stretch">Stretch to exact size</option>
            </select>
          </div>

          <div className="mt-6">
            <label htmlFor="format" className="block text-sm font-medium">
              Output format
            </label>
            <select
              id="format"
              value={outputFormat}
              onChange={(event) => {
                setOutputFormat(event.target.value as OutputFormat)
                clearResizedImages()
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
              onChange={(event) => {
                setQuality(Number(event.target.value))
                clearResizedImages()
              }}
              className="w-full accent-[var(--accent-rust)] disabled:opacity-40"
            />
          </div>

          {resizeMode === "contain" || outputFormat === "image/jpeg" ? (
            <label htmlFor="background" className="mt-6 block text-sm font-medium">
              Background color
              <input
                id="background"
                type="color"
                value={background}
                onChange={(event) => {
                  setBackground(event.target.value)
                  clearResizedImages()
                }}
                className="mt-2 h-11 w-full rounded-xl border border-[var(--ink-900)]/10 bg-white p-1"
              />
            </label>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={resizeImages}
              disabled={images.length === 0 || isResizing}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isResizing ? "Resizing..." : "Resize Images"}
            </button>
            <button
              type="button"
              onClick={clearImages}
              disabled={images.length === 0 || isResizing}
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
                  Input
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Selected Images</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {images.length} files / {formatBytes(selectedSize)}
              </p>
            </div>

            {images.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Your selected images will appear here before resizing.
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
                    disabled={isResizing}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Output
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Resized Images</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {resizedImages.length} files / {formatBytes(outputSize)}
              </p>
            </div>

            {resizedImages.length > 1 ? (
              <button
                type="button"
                onClick={downloadAll}
                className="mt-5 rounded-full bg-[var(--accent-gold)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--accent-sand)]"
              >
                Download All
              </button>
            ) : null}

            {resizedImages.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Resized files will appear here with download buttons.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {resizedImages.map((image) => (
                  <ImageCard
                    key={image.id}
                    imageUrl={image.url}
                    title={image.fileName}
                    subtitle={`${image.width} x ${image.height} / ${formatBytes(image.size)}`}
                    actionLabel="Download"
                    onAction={() => downloadImage(image)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
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
        min="1"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-2xl font-semibold outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
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

async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  resizeMode: ResizeMode,
  outputFormat: OutputFormat,
  extension: string,
  quality: number,
  background: string,
): Promise<ResizedImage> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight

  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Canvas is unavailable")
  }

  if (resizeMode === "contain" || outputFormat === "image/jpeg") {
    context.fillStyle = background
    context.fillRect(0, 0, targetWidth, targetHeight)
  } else {
    context.clearRect(0, 0, targetWidth, targetHeight)
  }

  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = "high"

  const drawBox = getDrawBox(bitmap.width, bitmap.height, targetWidth, targetHeight, resizeMode)
  context.drawImage(bitmap, drawBox.x, drawBox.y, drawBox.width, drawBox.height)
  bitmap.close()

  const blob = await canvasToBlob(canvas, outputFormat, quality)

  return {
    id: `${file.name}-${Date.now()}-${crypto.randomUUID()}`,
    fileName: `${stripExtension(file.name)}-${targetWidth}x${targetHeight}.${extension}`,
    url: URL.createObjectURL(blob),
    size: blob.size,
    width: targetWidth,
    height: targetHeight,
  }
}

function getDrawBox(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  resizeMode: ResizeMode,
) {
  if (resizeMode === "stretch") {
    return { x: 0, y: 0, width: targetWidth, height: targetHeight }
  }

  const scale =
    resizeMode === "cover"
      ? Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight)
      : Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight)
  const width = Math.round(sourceWidth * scale)
  const height = Math.round(sourceHeight * scale)

  return {
    x: Math.round((targetWidth - width) / 2),
    y: Math.round((targetHeight - height) / 2),
    width,
    height,
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

function parseSize(value: string) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) && numericValue > 0 ? Math.floor(numericValue) : 0
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
