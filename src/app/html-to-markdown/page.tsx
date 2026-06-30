"use client"

import { useMemo, useState } from "react"
import { TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, getTextStats } from "@/lib/browser-actions"
import { SITE_URL } from "@/lib/site"

const sampleHtml = `<article>
  <h1>Launch Notes</h1>
  <p>This <strong>HTML to Markdown</strong> tool keeps common formatting intact.</p>
  <h2>Highlights</h2>
  <ul>
    <li>Converts headings, links, images, and lists.</li>
    <li>Handles <em>inline emphasis</em> and code snippets.</li>
  </ul>
  <blockquote>Paste HTML, copy Markdown, keep moving.</blockquote>
  <p><a href="${SITE_URL}">Read the docs</a></p>
</article>`

export default function HtmlToMarkdownPage() {
  const [html, setHtml] = useState(sampleHtml)
  const [message, setMessage] = useState("Paste HTML to convert it into Markdown.")

  const markdown = useMemo(() => htmlToMarkdown(html), [html])
  const inputStats = useMemo(() => getDocumentStats(html), [html])
  const outputStats = useMemo(() => getDocumentStats(markdown), [markdown])

  async function copyMarkdown() {
    if (!markdown.trim()) {
      setMessage("Add HTML before copying.")
      return
    }

    try {
      await copyToClipboard(markdown)
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
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Text tool" title="HTML to Markdown">
            Convert pasted HTML into clean Markdown locally in your browser, including common
            headings, paragraphs, links, lists, quotes, code blocks, images, and tables.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
              id="html-input"
              label="HTML input"
              value={html}
              onChange={(value) => {
                setHtml(value)
                setMessage("HTML updated.")
              }}
              rows={16}
              placeholder="<h1>Paste HTML here</h1>"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={inputStats.characters} />
            <SummaryTile label="Tags" value={inputStats.tags} />
            <SummaryTile label="Lines" value={inputStats.lines} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={clearAll} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
          </div>
      </ToolPanel>

      <ToolPanel>
          <PanelHeader eyebrow="Conversion" title="Markdown Output" badge={`${outputStats.words} words`} />

          <div className="mt-6">
            <TextAreaField
              id="markdown-output"
              label="Markdown"
              value={markdown}
              readOnly
              rows={16}
              placeholder="Converted Markdown will appear here..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={outputStats.characters} />
            <SummaryTile label="Words" value={outputStats.words} />
            <SummaryTile label="Lines" value={outputStats.lines} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InfoBox className="leading-normal">
              {message}
            </InfoBox>
            <ActionButton onClick={copyMarkdown}>
              Copy Markdown
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
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

function getDocumentStats(value: string) {
  const trimmedValue = value.trim()
  const textStats = getTextStats(value)

  return {
    ...textStats,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    tags: (value.match(/<\/?[a-z][\s\S]*?>/gi) ?? []).length,
  }
}
