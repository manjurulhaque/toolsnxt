"use client"

import { PDFDocument } from "pdf-lib"
import { ChangeEvent, useMemo, useState } from "react"
import { ToolIntro, ToolPage, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"

type PdfItem = {
  id: string
  file: File
  pageCount: number | null
}

export default function PdfMergePage() {
  const [files, setFiles] = useState<PdfItem[]>([])
  const [isWorking, setIsWorking] = useState(false)
  const [message, setMessage] = useState("Select two or more PDF files to combine them locally.")

  const totalSize = useMemo(
    () => files.reduce((sum, item) => sum + item.file.size, 0),
    [files],
  )

  const totalPages = useMemo(() => {
    const knownPages = files.map((item) => item.pageCount).filter((count) => count !== null)
    if (knownPages.length !== files.length) {
      return null
    }

    return knownPages.reduce((sum, count) => sum + count, 0)
  }, [files])

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []).filter(
      (file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"),
    )

    if (selectedFiles.length === 0) {
      setMessage("Choose at least one PDF file.")
      return
    }

    setIsWorking(true)
    setMessage("Reading PDF details...")

    try {
      const nextFiles = await Promise.all(
        selectedFiles.map(async (file) => ({
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          pageCount: await readPageCount(file),
        })),
      )

      setFiles((currentFiles) => [...currentFiles, ...nextFiles])
      setMessage(`${selectedFiles.length} PDF${selectedFiles.length === 1 ? "" : "s"} added.`)
    } catch (error) {
      console.error("PDF selection failed", error)
      setMessage("One of those files could not be read as a PDF.")
    } finally {
      setIsWorking(false)
      event.target.value = ""
    }
  }

  function removeFile(id: string) {
    setFiles((currentFiles) => currentFiles.filter((item) => item.id !== id))
  }

  function moveFile(id: string, direction: -1 | 1) {
    setFiles((currentFiles) => {
      const index = currentFiles.findIndex((item) => item.id === id)
      const nextIndex = index + direction

      if (index < 0 || nextIndex < 0 || nextIndex >= currentFiles.length) {
        return currentFiles
      }

      const reorderedFiles = [...currentFiles]
      const [file] = reorderedFiles.splice(index, 1)
      reorderedFiles.splice(nextIndex, 0, file)
      return reorderedFiles
    })
  }

  function clearFiles() {
    setFiles([])
    setMessage("Selection cleared.")
  }

  async function mergePdfs() {
    if (files.length < 2) {
      setMessage("Add at least two PDFs before merging.")
      return
    }

    setIsWorking(true)
    setMessage("Merging PDFs...")

    try {
      const mergedPdf = await PDFDocument.create()

      for (const item of files) {
        const sourceBytes = await item.file.arrayBuffer()
        const sourcePdf = await PDFDocument.load(sourceBytes, { ignoreEncryption: true })
        const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedBytes = await mergedPdf.save()
      const mergedBuffer = mergedBytes.buffer.slice(
        mergedBytes.byteOffset,
        mergedBytes.byteOffset + mergedBytes.byteLength,
      ) as ArrayBuffer
      const blob = new Blob([mergedBuffer], { type: "application/pdf" })
      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = "merged.pdf"
      link.click()
      URL.revokeObjectURL(downloadUrl)

      setMessage(`Merged ${files.length} PDFs${totalPages ? ` into ${totalPages} pages` : ""}.`)
    } catch (error) {
      console.error("PDF merge failed", error)
      setMessage("Something went wrong while merging. Password-protected PDFs may not be supported.")
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <ToolPage gridClassName="lg:grid-cols-[0.88fr_1.12fr]">
        <ToolPanel>
          <ToolIntro eyebrow="Local PDF tool" title="PDF Merge">
            Combine multiple PDF files into one downloadable document. Files are processed in your
            browser and are not uploaded anywhere.
          </ToolIntro>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/20 bg-[var(--page-cream)] px-5 py-8 text-center transition hover:border-[var(--accent-rust)]/60 hover:bg-white">
            <span className="text-sm font-semibold">Choose PDFs</span>
            <span className="mt-2 text-xs text-[var(--ink-700)]/75">
              Add files in any order, then rearrange before merging
            </span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              multiple
              className="sr-only"
              onChange={handleFiles}
            />
          </label>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={mergePdfs}
              disabled={files.length < 2 || isWorking}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isWorking ? "Working..." : "Download Merged PDF"}
            </button>
            <button
              type="button"
              onClick={clearFiles}
              disabled={files.length === 0 || isWorking}
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
          <PanelHeader eyebrow="Merge order" title="Selected PDFs" badge={`${files.length} files / ${formatBytes(totalSize)}`} />

          {files.length === 0 ? (
            <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
              Your selected PDFs will appear here in the order they will be merged.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {files.map((item, index) => (
                <article
                  key={item.id}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {index + 1}. {item.file.name}
                      </p>
                      <p className="mt-1 text-xs text-[var(--ink-700)]/75">
                        {formatBytes(item.file.size)}
                        {item.pageCount === null ? "" : ` / ${item.pageCount} page${item.pageCount === 1 ? "" : "s"}`}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:w-64">
                      <button
                        type="button"
                        onClick={() => moveFile(item.id, -1)}
                        disabled={index === 0 || isWorking}
                        className="rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFile(item.id, 1)}
                        disabled={index === files.length - 1 || isWorking}
                        className="rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-40"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFile(item.id)}
                        disabled={isWorking}
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
        </ToolPanel>
    </ToolPage>
  )
}

async function readPageCount(file: File) {
  try {
    const bytes = await file.arrayBuffer()
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true })
    return pdf.getPageCount()
  } catch {
    return null
  }
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
