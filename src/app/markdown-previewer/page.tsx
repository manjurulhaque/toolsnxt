"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const sampleMarkdown = `# Launch Notes

Write Markdown on the left and preview it on the right.

## Highlights

- Supports headings, lists, quotes, code, links, and images.
- Escapes raw HTML before rendering the preview.
- Copies either the Markdown source or generated HTML.

> Small tools should stay fast, local, and easy to trust.

\`\`\`ts
const tool = "Markdown Previewer"
console.log(tool)
\`\`\`

Visit [Example](https://example.com) for a sample link.`

export default function MarkdownPreviewerPage() {
  const [markdown, setMarkdown] = useState(sampleMarkdown)
  const [message, setMessage] = useState("Edit Markdown to preview it as formatted HTML.")

  const html = useMemo(() => markdownToHtml(markdown), [markdown])
  const stats = useMemo(() => getMarkdownStats(markdown), [markdown])

  async function copyMarkdown() {
    if (!markdown.trim()) {
      setMessage("Add Markdown before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(markdown)
      setMessage("Markdown copied.")
    } catch {
      setMessage("Copy failed. Select the Markdown and copy it manually.")
    }
  }

  async function copyHtml() {
    if (!html.trim()) {
      setMessage("Add Markdown before copying HTML.")
      return
    }

    try {
      await navigator.clipboard.writeText(html)
      setMessage("HTML copied.")
    } catch {
      setMessage("Copy failed. Select the HTML and copy it manually.")
    }
  }

  function clearAll() {
    setMarkdown("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setMarkdown(sampleMarkdown)
    setMessage("Sample Markdown loaded.")
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

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Text tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Markdown Previewer</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Draft Markdown and inspect the rendered HTML instantly, with source stats and quick
            copy actions for notes, docs, and README snippets.
          </p>

          <label htmlFor="markdown-input" className="mt-6 block text-sm font-medium">
            Markdown input
          </label>
          <textarea
            id="markdown-input"
            value={markdown}
            onChange={(event) => {
              setMarkdown(event.target.value)
              setMessage("Markdown updated.")
            }}
            rows={18}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="# Heading&#10;&#10;Write Markdown here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={stats.characters} />
            <Stat label="Words" value={stats.words} />
            <Stat label="Lines" value={stats.lines} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Rendered Output</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {stats.blocks} blocks
            </p>
          </div>

          <div
            className="mt-6 min-h-[30rem] overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-5 py-4 text-sm leading-7 text-[var(--ink-800)] [&_a]:font-semibold [&_a]:text-[var(--accent-rust)] [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--accent-rust)]/45 [&_blockquote]:pl-4 [&_blockquote]:text-[var(--ink-700)] [&_code]:rounded-md [&_code]:bg-white [&_code]:px-1.5 [&_code]:py-0.5 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_hr]:my-5 [&_hr]:border-[var(--ink-900)]/10 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_pre]:mb-4 [&_pre]:overflow-auto [&_pre]:rounded-[1rem] [&_pre]:bg-white [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_ul]:list-disc"
            dangerouslySetInnerHTML={{ __html: html || "<p>Preview will appear here...</p>" }}
          />

          <label htmlFor="html-output" className="mt-6 block text-sm font-medium">
            Generated HTML
          </label>
          <textarea
            id="html-output"
            value={html}
            readOnly
            rows={7}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none"
            placeholder="Generated HTML will appear here..."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={copyMarkdown}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Copy MD
            </button>
            <button
              type="button"
              onClick={copyHtml}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy HTML
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}

function markdownToHtml(value: string) {
  const lines = value.replace(/\r\n/g, "\n").split("\n")
  const htmlBlocks: string[] = []
  let paragraphLines: string[] = []
  let listItems: string[] = []
  let listType: "ul" | "ol" | null = null
  let quoteLines: string[] = []
  let codeLines: string[] = []
  let inCodeBlock = false

  function flushParagraph() {
    if (paragraphLines.length > 0) {
      htmlBlocks.push(`<p>${parseInline(paragraphLines.join(" "))}</p>`)
      paragraphLines = []
    }
  }

  function flushList() {
    if (listItems.length > 0 && listType) {
      htmlBlocks.push(`<${listType}>${listItems.map((item) => `<li>${parseInline(item)}</li>`).join("")}</${listType}>`)
      listItems = []
      listType = null
    }
  }

  function flushQuote() {
    if (quoteLines.length > 0) {
      htmlBlocks.push(`<blockquote>${quoteLines.map((line) => `<p>${parseInline(line)}</p>`).join("")}</blockquote>`)
      quoteLines = []
    }
  }

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        htmlBlocks.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`)
        codeLines = []
        inCodeBlock = false
      } else {
        flushParagraph()
        flushList()
        flushQuote()
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeLines.push(line)
      return
    }

    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushParagraph()
      flushList()
      flushQuote()
      return
    }

    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()
      flushQuote()
      htmlBlocks.push(`<h${headingMatch[1].length}>${parseInline(headingMatch[2])}</h${headingMatch[1].length}>`)
      return
    }

    if (/^[-*_]{3,}$/.test(trimmedLine)) {
      flushParagraph()
      flushList()
      flushQuote()
      htmlBlocks.push("<hr>")
      return
    }

    const quoteMatch = trimmedLine.match(/^>\s?(.*)$/)
    if (quoteMatch) {
      flushParagraph()
      flushList()
      quoteLines.push(quoteMatch[1])
      return
    }

    const unorderedMatch = trimmedLine.match(/^[-*]\s+(.+)$/)
    const orderedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/)
    if (unorderedMatch || orderedMatch) {
      const nextType = unorderedMatch ? "ul" : "ol"
      flushParagraph()
      flushQuote()

      if (listType && listType !== nextType) {
        flushList()
      }

      listType = nextType
      listItems.push(unorderedMatch?.[1] ?? orderedMatch?.[1] ?? "")
      return
    }

    flushList()
    flushQuote()
    paragraphLines.push(trimmedLine)
  })

  if (inCodeBlock) {
    htmlBlocks.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`)
  }

  flushParagraph()
  flushList()
  flushQuote()

  return htmlBlocks.join("\n")
}

function parseInline(value: string) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function getMarkdownStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    blocks: trimmedValue ? trimmedValue.split(/\n\s*\n/).length : 0,
  }
}
