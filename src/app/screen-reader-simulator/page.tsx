"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type ReadingItem = {
  id: string
  type: string
  announcement: string
}

const sampleMarkup = `<main>
  <header>
    <h1>Quarterly Report</h1>
    <nav aria-label="Report sections">
      <a href="#summary">Summary</a>
      <a href="#details">Details</a>
    </nav>
  </header>

  <section aria-labelledby="summary">
    <h2 id="summary">Executive summary</h2>
    <p>Revenue grew across three product lines.</p>
    <button>Download report</button>
  </section>

  <img src="chart.png" alt="Bar chart showing steady revenue growth" />
</main>`

export default function ScreenReaderSimulatorPage() {
  const [markup, setMarkup] = useState(sampleMarkup)
  const [message, setMessage] = useState("Paste HTML to inspect its likely reading order.")

  const readingItems = useMemo(() => parseReadingOrder(markup), [markup])
  const transcript = useMemo(
    () => readingItems.map((item, index) => `${index + 1}. ${item.announcement}`).join("\n"),
    [readingItems],
  )
  const stats = useMemo(() => getStats(readingItems), [readingItems])

  async function copyTranscript() {
    if (!transcript) {
      setMessage("Add content before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(transcript)
      setMessage("Reading transcript copied.")
    } catch {
      setMessage("Copy failed. Select the transcript and copy it manually.")
    }
  }

  function speakTranscript() {
    if (!transcript) {
      setMessage("Add content before playing.")
      return
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setMessage("Speech playback is not available in this browser.")
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(
      readingItems.map((item) => item.announcement).join(". "),
    )
    utterance.rate = 0.92
    window.speechSynthesis.speak(utterance)
    setMessage("Playing simulated screen reader output.")
  }

  function stopSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }

    setMessage("Playback stopped.")
  }

  function clearMarkup() {
    setMarkup("")
    setMessage("Markup cleared.")
  }

  function loadSample() {
    setMarkup(sampleMarkup)
    setMessage("Sample markup loaded.")
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
            Accessibility tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Screen Reader Simulator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Paste HTML to preview a simplified reading order with headings, landmarks, links,
            buttons, images, fields, and text content.
          </p>

          <label htmlFor="markup" className="mt-6 block text-sm font-medium">
            HTML markup
          </label>
          <textarea
            id="markup"
            value={markup}
            onChange={(event) => {
              setMarkup(event.target.value)
              setMessage("Markup updated.")
            }}
            rows={17}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="<main><h1>Page title</h1><p>Intro text</p></main>"
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearMarkup}
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

          <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm leading-6 text-[var(--ink-700)]">
            This is a planning aid for reading order and labels. Always test important interfaces
            with real assistive technology.
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Simulation
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Reading Order</h2>
              </div>
              <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
                {readingItems.length} stops
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <Stat label="Headings" value={stats.headings} />
              <Stat label="Links" value={stats.links} />
              <Stat label="Controls" value={stats.controls} />
              <Stat label="Images" value={stats.images} />
            </div>

            {readingItems.length === 0 ? (
              <div className="mt-6 rounded-[1.4rem] border border-dashed border-[var(--ink-900)]/12 bg-[var(--page-cream)] p-8 text-center text-sm text-[var(--ink-700)]">
                Simulated announcements will appear here.
              </div>
            ) : (
              <ol className="mt-6 space-y-3">
                {readingItems.map((item, index) => (
                  <li
                    key={item.id}
                    className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-rust)]">
                        {index + 1} / {item.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[var(--ink-800)]">{item.announcement}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Transcript
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Simulated Speech</h2>
              </div>
            </div>

            <textarea
              value={transcript}
              readOnly
              rows={8}
              className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none"
              aria-label="Simulated screen reader transcript"
              placeholder="Transcript will appear here..."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
              <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
                {message}
              </div>
              <button
                type="button"
                onClick={copyTranscript}
                className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={speakTranscript}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Play
              </button>
              <button
                type="button"
                onClick={stopSpeech}
                className="rounded-full border border-[var(--accent-rust)]/25 bg-white px-5 py-3 text-sm font-semibold text-[var(--accent-rust)] transition hover:border-[var(--accent-rust)]/45"
              >
                Stop
              </button>
            </div>
          </section>
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

function parseReadingOrder(markup: string): ReadingItem[] {
  if (!markup.trim()) {
    return []
  }

  if (typeof window === "undefined") {
    return textFallback(markup)
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(markup, "text/html")
  const items: ReadingItem[] = []
  let index = 0

  function add(type: string, announcement: string) {
    const normalizedAnnouncement = normalizeWhitespace(announcement)
    if (!normalizedAnnouncement) {
      return
    }

    items.push({
      id: `${type}-${index}`,
      type,
      announcement: normalizedAnnouncement,
    })
    index += 1
  }

  function walk(element: Element) {
    if (isHidden(element)) {
      return
    }

    const tagName = element.tagName.toLowerCase()
    const role = element.getAttribute("role")

    if (tagName === "nav" || tagName === "main" || tagName === "aside" || tagName === "header" || tagName === "footer" || tagName === "section" || role) {
      const landmarkName = getAccessibleName(element)
      const landmarkType = role ?? tagName
      if (["nav", "main", "aside", "header", "footer", "section", "banner", "contentinfo", "search", "region"].includes(landmarkType)) {
        add("landmark", `${landmarkType}${landmarkName ? `, ${landmarkName}` : ""}`)
      }
    }

    if (/^h[1-6]$/.test(tagName)) {
      add("heading", `Heading level ${tagName.slice(1)}, ${getText(element)}`)
      return
    }

    if (tagName === "a") {
      add("link", `Link, ${getAccessibleName(element) || getText(element) || "unlabeled link"}`)
      return
    }

    if (tagName === "button") {
      add("button", `Button, ${getAccessibleName(element) || getText(element) || "unlabeled button"}`)
      return
    }

    if (tagName === "img") {
      const alt = element.getAttribute("alt")
      add("image", alt === "" ? "Decorative image" : `Image, ${alt || "missing alt text"}`)
      return
    }

    if (["input", "textarea", "select"].includes(tagName)) {
      add("control", describeControl(element))
      return
    }

    if (tagName === "li") {
      add("list item", `List item, ${getDirectText(element) || getText(element)}`)
    } else if (["p", "blockquote", "figcaption", "dt", "dd"].includes(tagName)) {
      add("text", getDirectText(element) || getText(element))
    }

    Array.from(element.children).forEach(walk)
  }

  Array.from(document.body.children).forEach(walk)
  return items.length > 0 ? items : textFallback(document.body.textContent || markup)
}

function textFallback(value: string): ReadingItem[] {
  return normalizeWhitespace(value)
    .split(/\n+/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .map((line, index) => ({
      id: `text-${index}`,
      type: "text",
      announcement: line,
    }))
}

function getStats(items: ReadingItem[]) {
  return {
    headings: items.filter((item) => item.type === "heading").length,
    links: items.filter((item) => item.type === "link").length,
    controls: items.filter((item) => item.type === "button" || item.type === "control").length,
    images: items.filter((item) => item.type === "image").length,
  }
}

function describeControl(element: Element) {
  const tagName = element.tagName.toLowerCase()
  const inputType = element.getAttribute("type") || (tagName === "select" ? "select" : "text")
  const name = getAccessibleName(element) || "unlabeled field"

  if (tagName === "textarea") {
    return `Text area, ${name}`
  }

  if (tagName === "select") {
    return `Select, ${name}`
  }

  return `${inputType} input, ${name}`
}

function getAccessibleName(element: Element) {
  const ariaLabel = element.getAttribute("aria-label")
  if (ariaLabel) {
    return ariaLabel
  }

  const title = element.getAttribute("title")
  if (title) {
    return title
  }

  const id = element.getAttribute("id")
  if (id) {
    const label = element.ownerDocument.querySelector(`label[for="${CSS.escape(id)}"]`)
    if (label?.textContent) {
      return normalizeWhitespace(label.textContent)
    }
  }

  return ""
}

function getText(element: Element) {
  return normalizeWhitespace(element.textContent || "")
}

function getDirectText(element: Element) {
  const text = Array.from(element.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent || "")
    .join(" ")

  return normalizeWhitespace(text)
}

function isHidden(element: Element) {
  return (
    element.getAttribute("aria-hidden") === "true" ||
    element.hasAttribute("hidden") ||
    element.getAttribute("style")?.toLowerCase().includes("display: none") === true
  )
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim()
}
