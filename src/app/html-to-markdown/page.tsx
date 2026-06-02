"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const sampleHtml = `<article>
  <h1>Launch Notes</h1>
  <p>This <strong>HTML to Markdown</strong> tool keeps common formatting intact.</p>
  <h2>Highlights</h2>
  <ul>
    <li>Converts headings, links, images, and lists.</li>
    <li>Handles <em>inline emphasis</em> and code snippets.</li>
  </ul>
  <blockquote>Paste HTML, copy Markdown, keep moving.</blockquote>
  <p><a href="https://example.com">Read the docs</a></p>
</article>`

export default function HtmlToMarkdownPage() {
  const [html, setHtml] = useState(sampleHtml)
  const [message, setMessage] = useState("Paste HTML to convert it into Markdown.")

  const markdown = useMemo(() => htmlToMarkdown(html), [html])
  const inputStats = useMemo(() => getTextStats(html), [html])
  const outputStats = useMemo(() => getTextStats(markdown), [markdown])

  async function copyMarkdown() {
    if (!markdown.trim()) {
      setMessage("Add HTML before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(markdown)
      setMessage("Markdown copied.")
    } catch {
      setMessage("Copy failed. Select the Markdown and copy it manually.")
    }
  }

  function clearAll() {
    setHtml("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setHtml(sampleHtml)
    setMessage("Sample HTML loaded.")
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
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">HTML to Markdown</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Convert pasted HTML into clean Markdown locally in your browser, including common
            headings, paragraphs, links, lists, quotes, code blocks, images, and tables.
          </p>

          <label htmlFor="html-input" className="mt-6 block text-sm font-medium">
            HTML input
          </label>
          <textarea
            id="html-input"
            value={html}
            onChange={(event) => {
              setHtml(event.target.value)
              setMessage("HTML updated.")
            }}
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="<h1>Paste HTML here</h1>"
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={inputStats.characters} />
            <Stat label="Tags" value={inputStats.tags} />
            <Stat label="Lines" value={inputStats.lines} />
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
                Conversion
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Markdown Output</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {outputStats.words} words
            </p>
          </div>

          <label htmlFor="markdown-output" className="mt-6 block text-sm font-medium">
            Markdown
          </label>
          <textarea
            id="markdown-output"
            value={markdown}
            readOnly
            rows={16}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Converted Markdown will appear here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Characters" value={outputStats.characters} />
            <Stat label="Words" value={outputStats.words} />
            <Stat label="Lines" value={outputStats.lines} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={copyMarkdown}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Copy Markdown
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

function htmlToMarkdown(value: string) {
  if (!value.trim() || typeof window === "undefined") {
    return ""
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(value, "text/html")

  return normalizeMarkdown(convertChildren(document.body, 0))
}

function convertChildren(parent: Node, depth: number) {
  return Array.from(parent.childNodes)
    .map((node) => convertNode(node, depth))
    .join("")
}

function convertNode(node: Node, depth: number): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return normalizeInline(node.textContent ?? "")
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return ""
  }

  const element = node as HTMLElement
  const tagName = element.tagName.toLowerCase()
  const content = convertChildren(element, depth).trim()

  if (/^h[1-6]$/.test(tagName)) {
    return block(`${"#".repeat(Number(tagName.charAt(1)))} ${content}`)
  }

  switch (tagName) {
    case "p":
    case "article":
    case "section":
    case "main":
    case "header":
    case "footer":
    case "div":
      return block(content)
    case "br":
      return "  \n"
    case "strong":
    case "b":
      return content ? `**${content}**` : ""
    case "em":
    case "i":
      return content ? `_${content}_` : ""
    case "s":
    case "del":
      return content ? `~~${content}~~` : ""
    case "code":
      return `\`${(element.textContent ?? "").replace(/`/g, "\\`")}\``
    case "pre":
      return block(`\`\`\`\n${element.textContent?.trim() ?? ""}\n\`\`\``)
    case "a":
      return convertLink(element, content)
    case "img":
      return convertImage(element)
    case "blockquote":
      return block(content.split("\n").map((line) => `> ${line}`).join("\n"))
    case "ul":
      return block(convertList(element, depth, false))
    case "ol":
      return block(convertList(element, depth, true))
    case "li":
      return content
    case "table":
      return block(convertTable(element))
    case "thead":
    case "tbody":
    case "tfoot":
    case "tr":
    case "th":
    case "td":
      return content
    default:
      return content
  }
}

function convertList(list: HTMLElement, depth: number, ordered: boolean) {
  return Array.from(list.children)
    .filter((child) => child.tagName.toLowerCase() === "li")
    .map((child, index) => {
      const marker = ordered ? `${index + 1}.` : "-"
      const indent = "  ".repeat(depth)
      const item = convertChildren(child, depth + 1).trim()
      const lines = item.split("\n")
      const [firstLine = "", ...restLines] = lines

      return `${indent}${marker} ${firstLine}${restLines
        .map((line) => `\n${indent}  ${line}`)
        .join("")}`
    })
    .join("\n")
}

function convertLink(element: HTMLElement, content: string) {
  const href = element.getAttribute("href")?.trim()

  if (!href) {
    return content
  }

  return `[${content || href}](${href})`
}

function convertImage(element: HTMLElement) {
  const src = element.getAttribute("src")?.trim()

  if (!src) {
    return ""
  }

  const alt = element.getAttribute("alt")?.trim() ?? ""
  return `![${alt}](${src})`
}

function convertTable(table: HTMLElement) {
  const rows = Array.from(table.querySelectorAll("tr")).map((row) =>
    Array.from(row.children).map((cell) => escapeTableCell(convertChildren(cell, 0).trim())),
  )

  if (rows.length === 0) {
    return ""
  }

  const columnCount = Math.max(...rows.map((row) => row.length))
  const normalizedRows = rows.map((row) => [
    ...row,
    ...Array.from({ length: columnCount - row.length }, () => ""),
  ])
  const [header, ...body] = normalizedRows
  const separator = Array.from({ length: columnCount }, () => "---")

  return [header, separator, ...body].map((row) => `| ${row.join(" | ")} |`).join("\n")
}

function escapeTableCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, "<br>")
}

function block(value: string) {
  return value.trim() ? `${value.trim()}\n\n` : ""
}

function normalizeInline(value: string) {
  return value.replace(/\s+/g, " ")
}

function normalizeMarkdown(value: string) {
  return value
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    tags: (value.match(/<\/?[a-z][\s\S]*?>/gi) ?? []).length,
  }
}
