"use client"

import { PDFDocument } from "pdf-lib"
import Link from "next/link"
import { ChangeEvent, useMemo, useState } from "react"

type LoadedPdf = {
  file: File
  pageCount: number
}

type SplitMode = "range" | "pages"

export default function PdfSplitPage() {
  const [pdfFile, setPdfFile] = useState<LoadedPdf | null>(null)
  const [mode, setMode] = useState<SplitMode>("range")
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [isWorking, setIsWorking] = useState(false)
  const [message, setMessage] = useState("Select a PDF file to split or extract pages locally.")

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

    try {
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true })
      const pageCount = pdf.getPageCount()

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
    setMessage("Selection cleared.")
  }

  async function downloadRange() {
    if (!pdfFile) {
      setMessage("Choose a PDF before splitting.")
      return
    }

    const start = clampPage(startPage, pdfFile.pageCount)
    const end = clampPage(endPage, pdfFile.pageCount)

    if (start > end) {
      setMessage("Start page must be before or equal to end page.")
      return
    }

    setIsWorking(true)
    setMessage("Extracting selected pages...")

    try {
      const sourcePdf = await PDFDocument.load(await pdfFile.file.arrayBuffer(), {
        ignoreEncryption: true,
      })
      const outputPdf = await PDFDocument.create()
      const pageIndexes = Array.from({ length: end - start + 1 }, (_, index) => start + index - 1)
      const copiedPages = await outputPdf.copyPages(sourcePdf, pageIndexes)
      copiedPages.forEach((page) => outputPdf.addPage(page))

      await downloadPdf(outputPdf, `${stripExtension(pdfFile.file.name)}-pages-${start}-${end}.pdf`)
      setMessage(`Downloaded ${selectedPageCount} selected page${selectedPageCount === 1 ? "" : "s"}.`)
    } catch (error) {
      console.error("PDF range split failed", error)
      setMessage("Something went wrong while extracting those pages.")
    } finally {
      setIsWorking(false)
    }
  }

  async function downloadEveryPage() {
    if (!pdfFile) {
      setMessage("Choose a PDF before splitting.")
      return
    }

    setIsWorking(true)
    setMessage("Splitting PDF into individual pages...")

    try {
      const sourcePdf = await PDFDocument.load(await pdfFile.file.arrayBuffer(), {
        ignoreEncryption: true,
      })

      for (let pageIndex = 0; pageIndex < sourcePdf.getPageCount(); pageIndex += 1) {
        const outputPdf = await PDFDocument.create()
        const [page] = await outputPdf.copyPages(sourcePdf, [pageIndex])
        outputPdf.addPage(page)
        await downloadPdf(
          outputPdf,
          `${stripExtension(pdfFile.file.name)}-page-${String(pageIndex + 1).padStart(2, "0")}.pdf`,
        )
      }

      setMessage(`Downloaded ${sourcePdf.getPageCount()} individual page PDFs.`)
    } catch (error) {
      console.error("PDF page split failed", error)
      setMessage("Something went wrong while splitting the PDF into pages.")
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
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">PDF Split</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Extract a page range or split one PDF into separate page files. Everything runs in your
            browser, so your PDF stays on your device.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose PDF</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              Select one document to split
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
              onClick={mode === "range" ? downloadRange : downloadEveryPage}
              disabled={!pdfFile || isWorking}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isWorking ? "Working..." : mode === "range" ? "Download Range" : "Download Pages"}
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
                Split settings
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
                onClick={() => setMode("range")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === "range"
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                Page range
              </button>
              <button
                type="button"
                onClick={() => setMode("pages")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === "pages"
                    ? "bg-[var(--ink-900)] text-white"
                    : "bg-white text-[var(--ink-800)] hover:bg-white/70"
                }`}
              >
                Every page
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

              {mode === "range" ? (
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
                  <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)] sm:col-span-2">
                    Output will contain {selectedPageCount} page{selectedPageCount === 1 ? "" : "s"}.
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
                  This will create one PDF per page. Your browser may ask for permission to download
                  multiple files.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
              Choose a PDF to see split options.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

async function downloadPdf(pdf: PDFDocument, fileName: string) {
  const bytes = await pdf.save()
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
  const blob = new Blob([buffer], { type: "application/pdf" })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = downloadUrl
  link.download = fileName
  link.click()
  URL.revokeObjectURL(downloadUrl)
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
