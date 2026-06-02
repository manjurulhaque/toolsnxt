"use client"

import { PDFDocument, ParseSpeeds } from "pdf-lib"
import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type LoadedPdf = {
  file: File
  pageCount: number
}

type CompressionMode = "balanced" | "smallest"

type CompressionResult = {
  originalSize: number
  compressedSize: number
}

export default function PdfCompressPage() {
  const [pdfFile, setPdfFile] = useState<LoadedPdf | null>(null)
  const [mode, setMode] = useState<CompressionMode>("balanced")
  const [isWorking, setIsWorking] = useState(false)
  const [message, setMessage] = useState("Select a PDF file to optimize it locally.")
  const [result, setResult] = useState<CompressionResult | null>(null)

  const savings = useMemo(() => {
    if (!result) {
      return null
    }

    const savedBytes = result.originalSize - result.compressedSize
    const savedPercent = result.originalSize === 0 ? 0 : (savedBytes / result.originalSize) * 100

    return {
      bytes: savedBytes,
      percent: savedPercent,
    }
  }, [result])

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file || (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf"))) {
      setMessage("Choose a PDF file.")
      return
    }

    setIsWorking(true)
    setResult(null)
    setMessage("Reading PDF details...")

    try {
      const pdf = await PDFDocument.load(await file.arrayBuffer(), {
        ignoreEncryption: true,
        parseSpeed: ParseSpeeds.Fastest,
        updateMetadata: false,
      })
      const pageCount = pdf.getPageCount()

      setPdfFile({ file, pageCount })
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
    setResult(null)
    setMessage("Selection cleared.")
  }

  async function compressPdf() {
    if (!pdfFile) {
      setMessage("Choose a PDF before compressing.")
      return
    }

    setIsWorking(true)
    setResult(null)
    setMessage("Optimizing PDF structure...")

    try {
      const pdf = await PDFDocument.load(await pdfFile.file.arrayBuffer(), {
        ignoreEncryption: true,
        parseSpeed: ParseSpeeds.Fastest,
        updateMetadata: false,
      })

      if (mode === "smallest") {
        stripDocumentInfo(pdf)
      } else {
        pdf.setProducer("Web Tools")
        pdf.setModificationDate(new Date())
      }

      const compressedBytes = await pdf.save({
        addDefaultPage: false,
        objectsPerTick: 80,
        updateFieldAppearances: false,
        useObjectStreams: true,
      })
      const compressedBuffer = toArrayBuffer(compressedBytes)
      const compressedSize = compressedBuffer.byteLength
      const originalSize = pdfFile.file.size

      downloadBlob(
        new Blob([compressedBuffer], { type: "application/pdf" }),
        `${stripExtension(pdfFile.file.name)}-compressed.pdf`,
      )

      setResult({ originalSize, compressedSize })
      const savedBytes = originalSize - compressedSize
      const savedPercent = originalSize === 0 ? 0 : (savedBytes / originalSize) * 100

      if (savedBytes > 0) {
        setMessage(`Compressed PDF saved ${formatBytes(savedBytes)} (${savedPercent.toFixed(1)}%).`)
      } else {
        setMessage("Downloaded an optimized copy, but this PDF was already tightly compressed.")
      }
    } catch (error) {
      console.error("PDF compression failed", error)
      setMessage("Something went wrong while compressing the PDF.")
    } finally {
      setIsWorking(false)
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Local PDF tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">PDF Compress</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Optimize a PDF into a smaller downloadable copy when its structure can be compacted.
            The file is processed in your browser and is not uploaded anywhere.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose PDF</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              Select one document to compress
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
              onClick={compressPdf}
              disabled={!pdfFile || isWorking}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isWorking ? "Working..." : "Download Compressed PDF"}
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
                Compression settings
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Output</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {pdfFile ? `${pdfFile.pageCount} pages / ${formatBytes(pdfFile.file.size)}` : "No file"}
            </p>
          </div>

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode("balanced")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === "balanced"
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                Balanced
              </button>
              <button
                type="button"
                onClick={() => setMode("smallest")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === "smallest"
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                Smallest
              </button>
            </div>
          </div>

          {pdfFile ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <p className="truncate text-sm font-semibold">{pdfFile.file.name}</p>
                <p className="mt-1 text-xs text-[var(--ink-700)]/75">
                  {pdfFile.pageCount} page{pdfFile.pageCount === 1 ? "" : "s"} /{" "}
                  {formatBytes(pdfFile.file.size)}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Original" value={formatBytes(result?.originalSize ?? pdfFile.file.size)} />
                <Stat label="Compressed" value={result ? formatBytes(result.compressedSize) : "-"} />
                <Stat
                  label="Saved"
                  value={
                    savings
                      ? `${savings.percent > 0 ? savings.percent.toFixed(1) : "0.0"}%`
                      : "-"
                  }
                />
              </div>

              <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
                {mode === "balanced"
                  ? "Balanced keeps document info and rewrites the file with compact object streams."
                  : "Smallest also clears common document metadata before writing the optimized copy."}
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
              Choose a PDF to see compression settings.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function stripDocumentInfo(pdf: PDFDocument) {
  pdf.setTitle("")
  pdf.setAuthor("")
  pdf.setSubject("")
  pdf.setKeywords([])
  pdf.setCreator("")
  pdf.setProducer("Web Tools")
  pdf.setCreationDate(new Date(0))
  pdf.setModificationDate(new Date())
}

function downloadBlob(blob: Blob, fileName: string) {
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = downloadUrl
  link.download = fileName
  link.click()
  URL.revokeObjectURL(downloadUrl)
}

function toArrayBuffer(bytes: Uint8Array) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  )
}
