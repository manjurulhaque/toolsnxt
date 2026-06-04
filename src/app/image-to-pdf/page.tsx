"use client"

import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type ImageItem = {
  id: string
  file: File
  url: string
}

type PageData = {
  width: number
  height: number
  bytes: Uint8Array
}

const encoder = new TextEncoder()

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [message, setMessage] = useState("Select JPG, PNG, WebP, or GIF images to build a PDF.")
  const [quality, setQuality] = useState(0.92)

  const totalSize = useMemo(
    () => images.reduce((sum, image) => sum + image.file.size, 0),
    [images],
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
  }

  function moveImage(id: string, direction: -1 | 1) {
    setImages((currentImages) => {
      const index = currentImages.findIndex((item) => item.id === id)
      const nextIndex = index + direction

      if (index < 0 || nextIndex < 0 || nextIndex >= currentImages.length) {
        return currentImages
      }

      const reorderedImages = [...currentImages]
      const [image] = reorderedImages.splice(index, 1)
      reorderedImages.splice(nextIndex, 0, image)
      return reorderedImages
    })
  }

  function clearImages() {
    images.forEach((image) => URL.revokeObjectURL(image.url))
    setImages([])
    setMessage("Selection cleared.")
  }

  async function convertToPdf() {
    if (images.length === 0) {
      setMessage("Add images before converting.")
      return
    }

    setIsConverting(true)
    setMessage("Converting images into a PDF...")

    try {
      const pages = await Promise.all(
        images.map((image) => fileToPdfPage(image.file, quality)),
      )
      const pdfBytes = createPdf(pages)
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = images.length === 1 ? `${stripExtension(images[0].file.name)}.pdf` : "images.pdf"
      link.click()
      URL.revokeObjectURL(downloadUrl)
      setMessage(`PDF created with ${images.length} page${images.length === 1 ? "" : "s"}.`)
    } catch (error) {
      console.error("Image to PDF conversion failed", error)
      setMessage("Something went wrong while converting. Try different image files.")
    } finally {
      setIsConverting(false)
    }
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
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Image to PDF Converter</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Combine image files into a single PDF in your browser. The images are processed locally
            and are not uploaded anywhere.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose images</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              JPG, PNG, WebP, and GIF files are supported
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleFiles}
            />
          </label>

          <div className="mt-6 space-y-3">
            <label htmlFor="quality" className="block text-sm font-medium">
              Image quality: {Math.round(quality * 100)}%
            </label>
            <input
              id="quality"
              type="range"
              min="0.55"
              max="1"
              step="0.01"
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="w-full accent-[var(--accent-rust)]"
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={convertToPdf}
              disabled={images.length === 0 || isConverting}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isConverting ? "Converting..." : "Download PDF"}
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

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
            {message}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                PDF pages
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Selected Images</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {images.length} files / {formatBytes(totalSize)}
            </p>
          </div>

          {images.length === 0 ? (
            <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
              Your selected images will appear here in PDF page order.
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {images.map((image, index) => (
                <article
                  key={image.id}
                  className="overflow-hidden rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)]"
                >
                  <div className="aspect-[4/3] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.file.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <p className="truncate text-sm font-semibold">{index + 1}. {image.file.name}</p>
                      <p className="mt-1 text-xs text-[var(--ink-700)]/75">{formatBytes(image.file.size)}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => moveImage(image.id, -1)}
                        disabled={index === 0 || isConverting}
                        className="rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(image.id, 1)}
                        disabled={index === images.length - 1 || isConverting}
                        className="rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        disabled={isConverting}
                        className="rounded-full border border-[var(--accent-rust)]/25 bg-white px-3 py-2 text-xs font-semibold text-[var(--accent-rust)] disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

async function fileToPdfPage(file: File, quality: number): Promise<PageData> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement("canvas")
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("Canvas is unavailable")
  }

  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(bitmap, 0, 0)
  bitmap.close()

  const dataUrl = canvas.toDataURL("image/jpeg", quality)
  return {
    width: canvas.width,
    height: canvas.height,
    bytes: base64ToBytes(dataUrl.split(",")[1] ?? ""),
  }
}

function createPdf(pages: PageData[]) {
  const chunks: Uint8Array[] = []
  const offsets: number[] = [0]
  let byteLength = 0
  let objectNumber = 1

  function append(chunk: string | Uint8Array) {
    const bytes = typeof chunk === "string" ? encoder.encode(chunk) : chunk
    chunks.push(bytes)
    byteLength += bytes.length
  }

  function writeObject(content: string | Uint8Array, prefix = "", suffix = "") {
    offsets[objectNumber] = byteLength
    append(`${objectNumber} 0 obj\n`)
    if (prefix) append(prefix)
    append(content)
    if (suffix) append(suffix)
    append("\nendobj\n")
    objectNumber += 1
  }

  append("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n")
  writeObject("<< /Type /Catalog /Pages 2 0 R >>")

  const pageObjectNumbers = pages.map((_, index) => 3 + index * 3)
  writeObject(`<< /Type /Pages /Kids [${pageObjectNumbers.map((number) => `${number} 0 R`).join(" ")}] /Count ${pages.length} >>`)

  pages.forEach((page, index) => {
    const pageObject = 3 + index * 3
    const imageObject = pageObject + 1
    const contentObject = pageObject + 2
    const imageName = `Im${index + 1}`
    const drawCommand = `q\n${page.width} 0 0 ${page.height} 0 0 cm\n/${imageName} Do\nQ\n`

    writeObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /XObject << /${imageName} ${imageObject} 0 R >> >> /Contents ${contentObject} 0 R >>`)
    writeObject(
      page.bytes,
      `<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.bytes.length} >>\nstream\n`,
      "\nendstream",
    )
    writeObject(drawCommand, `<< /Length ${encoder.encode(drawCommand).length} >>\nstream\n`, "endstream")
  })

  const xrefOffset = byteLength
  append(`xref\n0 ${objectNumber}\n0000000000 65535 f \n`)

  for (let index = 1; index < objectNumber; index += 1) {
    append(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`)
  }

  append(`trailer\n<< /Size ${objectNumber} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

  const pdf = new Uint8Array(byteLength)
  let offset = 0
  chunks.forEach((chunk) => {
    pdf.set(chunk, offset)
    offset += chunk.length
  })

  return pdf
}

function base64ToBytes(base64: string) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
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
