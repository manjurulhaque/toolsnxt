"use client"

import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type LoadedPdf = {
  file: File
  pageCount: number
}

type ImageFormat = "png" | "jpeg"

type RenderedImage = {
  pageNumber: number
  url: string
  size: number
  width: number
  height: number
  fileName: string
}

export default function PdfToImagesPage() {
  const [pdfFile, setPdfFile] = useState<LoadedPdf | null>(null)
  const [format, setFormat] = useState<ImageFormat>("png")
  const [quality, setQuality] = useState(0.9)
  const [scale, setScale] = useState(2)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [images, setImages] = useState<RenderedImage[]>([])
  const [isWorking, setIsWorking] = useState(false)
  const [message, setMessage] = useState("Select a PDF file to convert pages into images locally.")

  const selectedPageCount = useMemo(() => {
    if (!pdfFile) {
      return 0
    }

    const start = clampPage(startPage, pdfFile.pageCount)
    const end = clampPage(endPage, pdfFile.pageCount)
    return Math.max(0, end - start + 1)
  }, [endPage, pdfFile, startPage])

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file || (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf"))) {
      setMessage("Choose a PDF file.")
      return
    }

    setIsWorking(true)
    setMessage("Reading PDF details...")
    clearRenderedImages()

    try {
      const pdfjs = await loadPdfJs()
      const pdf = await pdfjs.getDocument({
        data: new Uint8Array(await file.arrayBuffer()),
      }).promise
      const pageCount = pdf.numPages

      setPdfFile({ file, pageCount })
      setStartPage(1)
      setEndPage(pageCount)
      setMessage(`${file.name} loaded with ${pageCount} page${pageCount === 1 ? "" : "s"}.`)
    } catch (error) {
      console.error("PDF load failed", error)
      setPdfFile(null)
      setMessage("That PDF could not be read. Password-protected PDFs may not be supported.")
    } finally {
      setIsWorking(false)
      event.target.value = ""
    }
  }

  function clearFile() {
    setPdfFile(null)
    setStartPage(1)
    setEndPage(1)
    clearRenderedImages()
    setMessage("Selection cleared.")
  }

  function clearRenderedImages() {
    setImages((currentImages) => {
      currentImages.forEach((image) => URL.revokeObjectURL(image.url))
      return []
    })
  }

  async function renderImages() {
    if (!pdfFile) {
      setMessage("Choose a PDF before converting.")
      return
    }

    const start = clampPage(startPage, pdfFile.pageCount)
    const end = clampPage(endPage, pdfFile.pageCount)

    if (start > end) {
      setMessage("Start page must be before or equal to end page.")
      return
    }

    setIsWorking(true)
    clearRenderedImages()
    setMessage(`Rendering ${end - start + 1} page${end === start ? "" : "s"}...`)

    try {
      const pdfjs = await loadPdfJs()
      const pdf = await pdfjs.getDocument({
        data: new Uint8Array(await pdfFile.file.arrayBuffer()),
      }).promise
      const nextImages: RenderedImage[] = []

      for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        if (!context) {
          throw new Error("Canvas is unavailable")
        }

        canvas.width = Math.ceil(viewport.width)
        canvas.height = Math.ceil(viewport.height)

        if (format === "jpeg") {
          context.fillStyle = "#ffffff"
          context.fillRect(0, 0, canvas.width, canvas.height)
        }

        await page.render({ canvas, canvasContext: context, viewport }).promise

        const blob = await canvasToBlob(canvas, format, quality)
        const extension = format === "jpeg" ? "jpg" : "png"
        const fileName = `${stripExtension(pdfFile.file.name)}-page-${String(pageNumber).padStart(2, "0")}.${extension}`

        nextImages.push({
          pageNumber,
          url: URL.createObjectURL(blob),
          size: blob.size,
          width: canvas.width,
          height: canvas.height,
          fileName,
        })
      }

      setImages(nextImages)
      setMessage(`Rendered ${nextImages.length} image${nextImages.length === 1 ? "" : "s"}.`)
    } catch (error) {
      console.error("PDF render failed", error)
      setMessage("Something went wrong while rendering the PDF pages.")
    } finally {
      setIsWorking(false)
    }
  }

  function downloadImage(image: RenderedImage) {
    const link = document.createElement("a")
    link.href = image.url
    link.download = image.fileName
    link.click()
  }

  function downloadAllImages() {
    if (images.length === 0) {
      setMessage("Render pages before downloading.")
      return
    }

    images.forEach((image, index) => {
      window.setTimeout(() => downloadImage(image), index * 180)
    })
    setMessage(`Started ${images.length} image download${images.length === 1 ? "" : "s"}.`)
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
            Local PDF tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">PDF to Images</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert PDF pages into PNG or JPEG images in your browser. Your document stays on your
            device.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose PDF</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              Select one document to render
            </span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              onChange={handleFile}
            />
          </label>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={renderImages}
              disabled={!pdfFile || isWorking}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isWorking ? "Rendering..." : "Render Images"}
            </button>
            <button
              type="button"
              onClick={clearFile}
              disabled={!pdfFile || isWorking}
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
                Render settings
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Output</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {pdfFile ? `${pdfFile.pageCount} pages / ${formatBytes(pdfFile.file.size)}` : "No file"}
            </p>
          </div>

          {pdfFile ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <p className="truncate text-sm font-semibold">{pdfFile.file.name}</p>
                <p className="mt-1 text-xs text-[var(--ink-700)]/75">
                  {selectedPageCount} selected page{selectedPageCount === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">Start page</span>
                  <input
                    type="number"
                    min="1"
                    max={pdfFile.pageCount}
                    value={startPage}
                    onChange={(event) => setStartPage(Number(event.target.value))}
                    className="mt-2 w-full rounded-[1rem] border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent-rust)]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">End page</span>
                  <input
                    type="number"
                    min="1"
                    max={pdfFile.pageCount}
                    value={endPage}
                    onChange={(event) => setEndPage(Number(event.target.value))}
                    className="mt-2 w-full rounded-[1rem] border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent-rust)]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">Format</span>
                  <select
                    value={format}
                    onChange={(event) => setFormat(event.target.value as ImageFormat)}
                    className="mt-2 w-full rounded-[1rem] border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent-rust)]"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Scale</span>
                  <select
                    value={scale}
                    onChange={(event) => setScale(Number(event.target.value))}
                    className="mt-2 w-full rounded-[1rem] border border-[var(--ink-900)]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent-rust)]"
                  >
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                  </select>
                </label>
              </div>

              {format === "jpeg" ? (
                <label className="block">
                  <span className="text-sm font-medium">JPEG quality: {Math.round(quality * 100)}%</span>
                  <input
                    type="range"
                    min="0.55"
                    max="1"
                    step="0.01"
                    value={quality}
                    onChange={(event) => setQuality(Number(event.target.value))}
                    className="mt-3 w-full accent-[var(--accent-rust)]"
                  />
                </label>
              ) : null}

              <button
                type="button"
                onClick={downloadAllImages}
                disabled={images.length === 0 || isWorking}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Download All Images
              </button>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
              Choose a PDF to see render settings.
            </div>
          )}
        </div>
      </section>

      {images.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Rendered pages
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Images</h2>
            </div>
            <p className="rounded-full bg-white px-4 py-2 text-sm text-[var(--ink-700)]">
              {images.length} image{images.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.url}
                className="overflow-hidden rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-white shadow-[0_14px_36px_rgba(33,37,41,0.06)]"
              >
                <div className="aspect-[4/3] bg-[var(--page-cream)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={`Page ${image.pageNumber}`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <p className="truncate text-sm font-semibold">{image.fileName}</p>
                    <p className="mt-1 text-xs text-[var(--ink-700)]/75">
                      {image.width} x {image.height} / {formatBytes(image.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadImage(image)}
                    className="w-full rounded-full bg-[var(--ink-900)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--ink-800)]"
                  >
                    Download
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

function canvasToBlob(canvas: HTMLCanvasElement, format: ImageFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error("Image export failed"))
        }
      },
      format === "jpeg" ? "image/jpeg" : "image/png",
      format === "jpeg" ? quality : undefined,
    )
  })
}

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist")
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString()
  return pdfjs
}

function clampPage(page: number, pageCount: number) {
  if (!Number.isFinite(page)) {
    return 1
  }

  return Math.min(Math.max(Math.trunc(page), 1), pageCount)
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
