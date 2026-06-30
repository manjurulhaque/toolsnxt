"use client"

import { useMemo, useState } from "react"
import { TextAreaField } from "@/components/form-controls"
import { ActionButton, InfoBox, PanelHeader, SummaryTile, ToolIntro, ToolPage, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, getTextStats } from "@/lib/browser-actions"
import { SITE_NAME, SITE_URL } from "@/lib/site"

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

Visit [${SITE_NAME}](${SITE_URL}) for a sample link.`

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
      await copyToClipboard(markdown)
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
      await copyToClipboard(html)
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
    <ToolPage columns="equal">
      <ToolPanel>
        <ToolIntro eyebrow="Text tool" title="Markdown Previewer">
            Draft Markdown and inspect the rendered HTML instantly, with source stats and quick
            copy actions for notes, docs, and README snippets.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
              id="markdown-input"
              label="Markdown input"
              value={markdown}
              onChange={(value) => {
                setMarkdown(value)
                setMessage("Markdown updated.")
              }}
              rows={18}
              placeholder="# Heading&#10;&#10;Write Markdown here..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Characters" value={stats.characters} />
            <SummaryTile label="Words" value={stats.words} />
            <SummaryTile label="Lines" value={stats.lines} />
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
          <PanelHeader eyebrow="Preview" title="Rendered Output" badge={`${stats.blocks} blocks`} />

          <div
            className="mt-6 min-h-[30rem] overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-5 py-4 text-sm leading-7 text-[var(--ink-800)] [&_a]:font-semibold [&_a]:text-[var(--accent-rust)] [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--accent-rust)]/45 [&_blockquote]:pl-4 [&_blockquote]:text-[var(--ink-700)] [&_code]:rounded-md [&_code]:bg-white [&_code]:px-1.5 [&_code]:py-0.5 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_hr]:my-5 [&_hr]:border-[var(--ink-900)]/10 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_pre]:mb-4 [&_pre]:overflow-auto [&_pre]:rounded-[1rem] [&_pre]:bg-white [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_ul]:list-disc"
            dangerouslySetInnerHTML={{ __html: html || "<p>Preview will appear here...</p>" }}
          />

          <div className="mt-6">
            <TextAreaField
              id="html-output"
              label="Generated HTML"
              value={html}
              readOnly
              rows={7}
              placeholder="Generated HTML will appear here..."
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <InfoBox className="leading-normal">
              {message}
            </InfoBox>
            <ActionButton onClick={copyMarkdown} variant="secondary">
              Copy MD
            </ActionButton>
            <ActionButton onClick={copyHtml}>
              Copy HTML
            </ActionButton>
          </div>
      </ToolPanel>
    </ToolPage>
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
  const textStats = getTextStats(value)

  return {
    ...textStats,
    words: trimmedValue ? trimmedValue.split(/\s+/).length : 0,
    blocks: trimmedValue ? trimmedValue.split(/\n\s*\n/).length : 0,
  }
}
