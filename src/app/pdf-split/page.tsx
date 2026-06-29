"use client"

import { PDFDocument } from "pdf-lib"
import { ChangeEvent, useMemo, useState } from "react"
import { ToolIntro, ToolPage, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"

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
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="Local PDF tool" title="PDF Split">
            Extract a page range or split one PDF into separate page files. Everything runs in your
            browser, so your PDF stays on your device.
          </ToolIntro>

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

          <InfoBox className="mt-6">
            {message}
          </InfoBox>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Split settings" title="Output" badge={pdfFile ? `${pdfFile.pageCount} pages / ${formatBytes(pdfFile.file.size)}` : "No file"} />

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
                  <InfoBox className="sm:col-span-2">
                    Output will contain {selectedPageCount} page{selectedPageCount === 1 ? "" : "s"}.
                  </InfoBox>
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
        </ToolPanel>
    </ToolPage>
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
